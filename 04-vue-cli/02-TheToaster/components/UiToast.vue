<template>
  <div v-for="(toast, index) in toast_list" :key="index" class="toast" :class="`${toast.class}`">
    <ui-icon class="toast__icon" :icon="toast.icon" />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: ['message'],
  data() {
    return {
      toast_list: [],
    };
  },

  computed: {
    updateList() {
      return this.toast_list;
    },
  },

  watch: {
    message: {
      immediate: true,
      handler() {
        this.messageAdd();
      },
    },
  },

  methods: {
    messageAdd() {
      this.toast_list.push(this.message);
      setTimeout(this.timer, 5000);
      return this.toast_list;
    },

    timer() {
      return (this.toast_list = this.toast_list.slice(1, this.toast_list.length));
    },
  },
};
</script>

<style>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
