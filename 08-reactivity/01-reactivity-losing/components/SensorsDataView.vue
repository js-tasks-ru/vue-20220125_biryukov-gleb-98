<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    <sensors-data-row v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
  </template>
</template>

<script>
import { cloneDeep } from 'lodash-es';

import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: null,
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);
    setInterval(() => {
      this.sensorsDataController.getData();
    }, 1000);
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  methods: {
    callback(data) {
      // каждый раз приходит один и тот же мутироваший(!) объект, из-за этого вью не видит изменений.
      this.setData(cloneDeep(data));
    },

    setData(sensors) {
      // this.sensors не надо делать реактивым, в data() все уже и так реактивное.
      this.sensors = sensors;
    },
  },
};
</script>

<style scoped></style>
