<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="localAgenda.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input v-model="localAgenda.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="localAgenda.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </ui-form-group>
      </div>
    </div>

    <template v-if="localAgenda.type === 'other'">
      <ui-form-group label="Заголовок">
        <ui-input v-model="localAgenda.title" name="title" />
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input v-model="localAgenda.description" name="description" multiline />
      </ui-form-group>
    </template>

    <template v-else-if="localAgenda.type === 'talk'">
      <ui-form-group label="Тема">
        <ui-input v-model="localAgenda.title" name="title" />
      </ui-form-group>
      <ui-form-group label="Докладчик">
        <ui-input v-model="localAgenda.speaker" name="speaker" />
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input v-model="localAgenda.description" multiline name="description" />
      </ui-form-group>
      <ui-form-group label="Язык">
        <ui-dropdown
          v-model="localAgenda.language"
          title="Язык"
          name="language"
          :options="$options.talkLanguageOptions"
        />
      </ui-form-group>
    </template>

    <template v-else>
      <ui-form-group label="Нестандартный текст (необязательно)">
        <ui-input v-model="localAgenda.title" name="title" />
      </ui-form-group>
    </template>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      localAgenda: { ...this.agendaItem },
    };
  },
  watch: {
    localAgenda: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.$emit('update:agendaItem', { ...newValue });
      },
    },

    'localAgenda.startsAt'(newValue, oldValue) {
      const timeToMin = (value) => {
        const values = value.split(':').map((el) => parseInt(el, 10));
        return values[0] * 60 + values[1];
      };

      const newTime = timeToMin(newValue);
      const oldTime = timeToMin(oldValue);
      const oldEndsAtMin = timeToMin(this.localAgenda.endsAt);

      const diffTime = newTime - oldTime;
      const newEndAtMin = (oldEndsAtMin + diffTime + 24 * 60) % (24 * 60);
      const hours = Math.floor(newEndAtMin / 60)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor(newEndAtMin % 60)
        .toString()
        .padStart(2, '0');

      // console.log(newEndAtMin, hours, minutes);
      this.localAgenda.endsAt = `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
