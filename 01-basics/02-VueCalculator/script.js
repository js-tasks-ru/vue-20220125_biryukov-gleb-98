import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const VueCalculator = {
  data() {
    return {
      actionPicked: '',
      firstNumber: 0,
      secondNumber: 0,
    };
  },
  computed: {
    output() {
      switch (this.actionPicked) {
        case 'sum':
          return this.firstNumber + this.secondNumber;
        case 'subtract':
          return this.firstNumber - this.secondNumber;
        case 'multiply':
          return this.firstNumber * this.secondNumber;
        case 'divide':
          return this.firstNumber / this.secondNumber;
      }
    },
  },
};

createApp(VueCalculator).mount('#app');
