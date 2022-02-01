export type Atom = {
  /**
   * Invoke this method to notify mobx that your atom has been used somehow.
   * Returns true if there is currently a reactive context.
   */
  reportObserved(implicitObserver?: any): boolean;
  /**
   * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
   */
  reportChanged(): void;
};

let customCreateAtom: typeof createAtom | undefined;
let customReaction: ((func: () => any, effect: () => any) => any) | undefined;

let defaultReaction = (func: () => any) => func();

export function reaction(func: () => any, effect: () => any) {
  if (customReaction) {
    return customReaction(func, effect);
  } else {
    defaultReaction(func);
    return undefined;
  }
}

export function createAtom(
  _name: string,
  _onBecomeObservedHandler?: () => void,
  _onBecomeUnobservedHandler?: () => void
): Atom {
  if (customCreateAtom) {
    return customCreateAtom.apply(null, arguments as any);
  } else {
    throw new Error(
      "observable implementation not provided. Call enableReactiveBindings, enableVueBindings or enableMobxBindings."
    );
  }
}

/**
 * Enable MobX integration
 *
 * @param mobx An instance of mobx, e.g. import * as mobx from "mobx";
 */
export function enableMobxBindings(mobx: any) {
  customCreateAtom = mobx.createAtom;
  customReaction = undefined;
}

/**
 * Enable Vue3 integration
 *
 * @param vue An instance of Vue or Vue reactivity, e.g. import * as Vue from "vue";
 */
export function enableVueBindings(vue: any) {
  customCreateAtom = function (name: any, onBecomeObserved: any) {
    let id = 0;
    const data = vue.reactive({ data: id });
    const atom = {
      reportObserved() {
        return data.data as any as boolean;
      },
      reportChanged() {
        data.data = ++id;
      },
    };
    if (onBecomeObserved) {
      onBecomeObserved();
    }
    return atom;
  };
  customReaction = undefined;
}

export function enableReactiveBindings(reactive: any) {
  customCreateAtom = function (name, onBecomeObserved, onBecomeUnobserved) {
    // TMP
    const atom = reactive.createAtom(name);
    if (onBecomeObserved) {
      onBecomeObserved();
    }
    return atom;
  };
  customReaction = (func: () => void, effect: () => void) => {
    return reactive.reaction(func, effect, { fireImmediately: false });
  };
}
