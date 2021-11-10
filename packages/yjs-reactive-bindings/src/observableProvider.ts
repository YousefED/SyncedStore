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
      "observable implementation not provided. Call useReactiveBindings, useVueBindings or useMobxBindings."
    );
  }
}

export function useMobxBindings(mobx: any) {
  customCreateAtom = mobx.createAtom;
  customReaction = undefined;
}

export function useVueBindings(vue: any) {
  customCreateAtom = function (name: any, obo: any) {
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
    if (obo) {
      obo();
    }
    return atom;
  };
  customReaction = undefined;
}

export function useReactiveBindings(reactive: any) {
  customCreateAtom = function (name, obo, obu) {
    // TMP
    const atom = reactive.createAtom(name);
    if (obo) {
      obo();
    }
    return atom;
  };
  customReaction = (func: () => void, effect: () => void) => {
    return reactive.reaction(func, effect, { fireImmediately: false });
  };
}
