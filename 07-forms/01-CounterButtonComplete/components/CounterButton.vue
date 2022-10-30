<template>
  <button @click="handleClick">{{ localNumber }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localNumber: this.count,
    };
  },

  watch: {
    count: {
      handler(newValue) {
        if (newValue !== this.localNumber) {
          this.localNumber = newValue;
        }
      },
    },
    localNumber: {
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
  },

  methods: {
    handleClick() {
      this.localNumber += 1;
    },
  },
};
</script>
