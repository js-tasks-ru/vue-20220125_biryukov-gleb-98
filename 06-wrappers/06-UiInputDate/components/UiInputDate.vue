<template>
  <ui-input :model-value="modelValueProxy" :type="type" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    modelValue: Number,
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },
  },

  emits: ['update:modelValue'],

  computed: {
    // modelValueProxy: {
    //   get() {
    //     return this.modelValue;
    //   },

    //   set(value) {
    //     if (value === null) {
    //       this.$emit('update:modelValue', null);
    //     }

    //     const date = new Date(value).toISOString();
    //     if (this.type === 'date') {
    //       this.$emit('update:modelValue', date.substring(0, 10));
    //     } else if (this.type === 'datetime-local') {
    //       this.$emit('update:modelValue', date.substring(0, 16));
    //     } else if (this.type === 'time') {
    //       this.$attrs['step'] && this.$attrs['step'] % 60 !== 0
    //         ? this.$emit('update:modelValue', date.substring(11, 19))
    //         : this.$emit('update:modelValue', date.substring(11, 16));
    //     }
    //   },
    // },
    modelValueProxy() {
      if (this.modelValue === null || typeof this.modelValue === 'undefined') {
        return null;
      }

      let date = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return date.substring(0, 10);
      } else if (this.type === 'datetime-local') {
        return date.substring(0, 16);
      } else if (this.time === 'time') {
        return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0 ? date.substring(11, 19) : date.substring(11, 16);
      }

      return '';
    },
  },

  methods: {
    handleInput(event) {
      if (event.target.value === '') {
        this.$emit('update:modelValue', null);
        return;
      }

      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
