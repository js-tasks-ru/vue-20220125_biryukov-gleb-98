import { ref, watchEffect, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([source.value]);

  watch(
    source,
    (newSource, _prevSource) => {
      history.value.push(newSource);
    },
    { flush: 'sync' },
  );
  return { history };
}
