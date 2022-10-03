<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === 'LOADING' }"
      :style="`--bg-url: url(${previewComp}) `"
    >
      <span class="image-uploader__text">{{ statePreview }}</span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        v-bind="$attrs"
        class="image-uploader__input"
        @change="handleFile($event)"
        @click="clickDelete($event)"
      />
    </label>
  </div>
</template>

<script>
const States = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
};

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  States,

  props: {
    preview: {
      type: String,
      default: null,
    },
    uploader: Function,
  },
  emits: ['remove', 'select', 'upload', 'error'],

  data() {
    return {
      state: States.IDLE,
      previewComp: this.preview,
    };
  },

  computed: {
    statePreview() {
      if (this.previewComp === null && this.state === 'IDLE') return 'Загрузить изображение';
      if (this.state === 'LOADING') return 'Загрузка...';
      if (this.previewComp !== null || this.state === 'SUCCESS') return 'Удалить изображение';
      return null;
    },
  },

  methods: {
    handleFile(event) {
      const file = event.target.files[0];
      this.$emit('select', file);
      if (!this.uploader) {
        this.previewComp = URL.createObjectURL(file);
      } else {
        this.state = States.LOADING;
        this.uploader(file)
          .then((file) => {
            this.state = States.SUCCESS;
            this.previewComp = file.image;
            this.$emit('upload', file);
          })
          .catch((error) => {
            this.state = States.IDLE;
            event.target.value = '';
            this.$emit('remove');
            this.$emit('error', error);
          });
      }
    },

    clickDelete(event) {
      if (this.state === States.SUCCESS || this.previewComp) {
        event.preventDefault();
        event.target.value = '';
        this.previewComp = null;
        this.$emit('remove');
        this.state = States.IDLE;
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
