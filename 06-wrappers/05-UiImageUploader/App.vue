<template>
  <div id="app" class="sample container">
    <ui-image-uploader
      :preview="image"
      :uploader="uploadImage"
      name="input-file"
      @remove="image = null"
      @upload="image = $event.image"
      @select="$event"
      @error="$event"
    />
  </div>
</template>

<script>
import UiImageUploader from './components/UiImageUploader';
import { uploadImage } from './ImageService';

export default {
  name: 'App',

  components: { UiImageUploader },

  data() {
    return {
      image: 'https://course-vue.javascript.ru/api/images/1',
      uploadImage,
    };
  },
};
</script>

<style>
@import '~@/assets/styles/_container.css';
</style>
