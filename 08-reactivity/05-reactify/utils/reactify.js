import { computed, isRef, ref, toRefs } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) =>
    computed(() => {
      if (args.length > 1) {
        const refsArgs = args.map((el) => {
          return !isRef(el) ? ref(el).value : el.value;
        });
        return func(...refsArgs);

      }
      return func(args[0].value);
    });
}
