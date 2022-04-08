<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview image-uploader__preview-loading"
      :style="`--bg-url: url(${previewImage !== undefined ? previewImage : defaultPreview}) `"
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

  props: { preview: String, uploader: Function },

  emits: ['remove', 'upload', 'select', 'error'],
  data() {
    return {
      state: States.IDLE,
      error: null,
      defaultPreview: 'https://course-vue.javascript.ru/api/images/1',
    };
  },

  computed: {
    statePreview() {
      return this.state === 'IDLE'
        ? 'Загрузить изображение'
        : this.state === 'LOADING'
        ? 'Загрузка...'
        : 'Удалить изображение';
    },
    previewImage() {
      return this.preview;
    },
  },

  methods: {
    handleFile(event) {
      this.state = States.LOADING;
      const file = event.target.files[0];
      this.$emit('select', file);
      this.uploader(file)
        .then((file) => {
          this.state = States.SUCCESS;
          this.$emit('upload', file);
        })
        .catch((error) => {
          this.state = States.IDLE;
          this.$emit('error', error);
        });
    },

    clickDelete(event) {
      if (this.state === States.SUCCESS) {
        event.preventDefault();
        event.target.value = '';
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
