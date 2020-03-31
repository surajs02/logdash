import _ from 'lodash';

// `mapFunc` should return new object, eg given (v,k) return {[k]:v}.
export const mapObj = (obj: any, mapFunc: Function) => _.reduce(obj, (a: any, v: any, k: any) => (
    { ...a, ...mapFunc(v, k) }
), {});

// `mapFunc` should return value, eg given (v,k) return v.
export const mapObjValues = (obj: any, mapFunc: Function) => _.reduce(obj, (a: any, v: any, k: any) => (
    { ...a, [k]: mapFunc(v) }
), {});