import mcache from 'memory-cache';
import ms from 'ms';

type NoArgsFN<T> = () => T 
 
export const cacheFunction = <T>(duration: string) => (fn: NoArgsFN<T>): T => {
    const key = `__cache__${fn.name}`;
    const cacheBody: T = mcache.get(key);

    if (cacheBody) return cacheBody;

    console.log('Using Function')

    const result = fn();

    mcache.put(key, result, ms(duration));

    return result;
}