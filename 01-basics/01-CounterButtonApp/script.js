import { createApp } from './vendor/vue.esm-browser.js';

const CounterButtonApp = {
  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    doCount(event) {
      console.log(event.currentTarget);
      this.counter += 1;
    },
  },
};

createApp(CounterButtonApp).mount('#app');
/* задать вопрос про v-bind */
