<template>
  <div class="toasts">
    <ui-toast :message="message" />
    <!-- <div v-if:="success" class="toast toast_success">
      <ui-icon class="toast__icon" icon="check-circle" />
      <span>Success Toast Example</span>
    </div>

    <div class="toast toast_error">
      <ui-icon class="toast__icon" icon="alert-circle" />
      <span>Error Toast Example</span>
    </div> -->
  </div>
</template>

<script>
import UiToast from './UiToast';
export default {
  name: 'TheToaster',
  components: { UiToast },
  data() {
    return {
      message: [],
    };
  },

  methods: {
    error(message) {
      this.message.push({ message: message, class: 'toast_error', icon: 'alert-circle' });
      setTimeout(this.timer, 5000);
      return this.message;
    },
    success(message) {
      this.message.push({ message: message, class: 'toast_success', icon: 'check-circle' });
      setTimeout(this.timer, 5000);
      return this.message;
    },

    timer() {
      return (this.message = this.message.slice(1, this.message.length));
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

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
