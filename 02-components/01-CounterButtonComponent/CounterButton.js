import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  // Компонент должен иметь входной параметр
  emits: ['update:count'],

  methods: {
    counter(value) {
      value += 1;
      this.$emit('update:count', value);
    },
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="counter(count)">{{ count }}</button>`,
});
