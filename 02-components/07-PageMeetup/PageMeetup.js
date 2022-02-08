import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupDescription from '../02-MeetupDescription/MeetupDescription.js';
import MeetupCover from '../03-MeetupCover/MeetupCover.js';
import MeetupInfo from '../04-MeetupInfo/MeetupInfo.js';
import MeetupAgenda from '../05-MeetupAgenda/MeetupAgenda.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import MeetupAgendaItem from '../05-MeetupAgenda/MeetupAgendaItem.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupAgenda,
    MeetupAgendaItem,
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
    },
  },

  data() {
    return {
      meetup: '',
      loading: true,
      error: false,
    };
  },

  computed: {
    valueId() {
      return this.actualMeetup();
    },
  },

  methods: {
    async actualMeetup() {
      let data;
      try {
        this.loading = true;
        this.error = false;
        data = await fetchMeetupById(this.meetupId);
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
      return (this.meetup = data);
    },
  },

  template: `
    <div class="page-meetup">
      <ui-container v-if='loading'>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
      <ui-container v-else-if="error">
        <ui-alert>error</ui-alert>
      </ui-container>
      <meetup-view v-else :meetup="meetup"/>
    </div>`,
});
