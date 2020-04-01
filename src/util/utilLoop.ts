import _ from 'lodash';

// `mapFunc` should return new object, eg given (v,k) return {[k]:v}.
export const mapObj = (obj: any, mapFunc: Function) => _.reduce(obj, (a: any, v: any, k: any) => (
    { ...a, ...mapFunc(v, k) }
), {});

// `mapFunc` should return value, eg given (v,k) return v.
export const mapObjValues = (obj: any, mapFunc: Function) => _.reduce(obj, (a: any, v: any, k: any) => (
    { ...a, [k]: mapFunc(v) }
), {});

// `mapFunc` should return key, eg given (k) return k.
export const mapObjKeys = (obj: any, mapFunc: Function) => _.reduce(obj, (a: any, v: any, k: any) => (
    { ...a, [mapFunc(k)]: v }
), {});

// Same as _.identity but also handles multiple args: 
// - identityArgs([1, 2]) => [1, 2]
// - identityArgs(1, 2) => [1, 2]
export const identityArgs = (...args: any[]) => args.length === 1 
    ? args[0] // Avoids returning first arg in obsolete array.
    : args;