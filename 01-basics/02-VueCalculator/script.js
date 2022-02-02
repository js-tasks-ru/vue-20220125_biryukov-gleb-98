import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const VueCalculator = {
  data() {
    return {
      actionPicked: '',
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
    };
  },
  computed: {
    output() {
      switch (this.actionPicked) {
        case 'sum':
          this.result = this.firstNumber + this.secondNumber;
          break;
        case 'subtract':
          this.result = this.firstNumber - this.secondNumber;
          break;
        case 'multiply':
          this.result = this.firstNumber * this.secondNumber;
          break;
        case 'divide':
          this.result = this.firstNumber / this.secondNumber;
          break;
      }
      return this.result;
    },
  },
};

createApp(VueCalculator).mount('#app');
