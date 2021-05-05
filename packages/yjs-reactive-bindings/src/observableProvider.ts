import { Observer } from "@reactivedata/reactive";

export type Atom = {
  /**
   * Invoke this method to notify mobx that your atom has been used somehow.
   * Returns true if there is currently a reactive context.
   */
  reportObserved(implicitObserver?: Observer): boolean;
  /**
   * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
   */
  reportChanged(): void;
};

let customCreateAtom: typeof createAtom | undefined;
let customUntracked: typeof untracked | undefined;

export function createAtom(
  name: string,
  onBecomeObservedHandler?: () => void,
  onBecomeUnobservedHandler?: () => void
): Atom {
  if (customCreateAtom) {
    return customCreateAtom.apply(null, arguments as any);
  } else {
    throw new Error("observable implementation not provided");
    // const mobx = require("mobx");
    // return mobx.createAtom.apply(null, arguments);
  }
}

export function untracked(func: () => void) {
  if (customUntracked) {
    return customUntracked.apply(null, arguments as any);
  } else {
    // try {
    //   const mobx = require("mobx");
    //   return mobx.untracked.apply(null, arguments);
    // } catch (e) {
    //   throw "undefined mobx";
    // }
    throw new Error("observable implementation not provided");
  }
}

export function setObservableFunctions(createAtomFunc: typeof createAtom, untrackedFunc: typeof untracked) {
  customCreateAtom = createAtomFunc;
  customUntracked = untrackedFunc;
}
