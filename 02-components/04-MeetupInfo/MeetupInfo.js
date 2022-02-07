import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      defaut: 'Организатор',
    },

    place: {
      type: String,
      default: 'Место',
    },

    date: {
      type: Number,
    },
  },

  computed: {
    convertDateTime() {
      let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      let datetime = this.convertDate().toLocaleDateString(navigator.language, options);
      let data = [
        new Date(datetime).getFullYear(),
        this.addZeroz(new Date(datetime).getMonth() + 1),
        this.addZeroz(new Date(datetime).getDate()),
      ];
      return data.join('-');
    },

    convertDataString() {
      let options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      let date = this.convertDate().toLocaleDateString(navigator.language, options);
      return date;
    },
  },

  methods: {
    convertDate() {
      const ms = this.date;
      return new Date(ms);
    },

    addZeroz(number) {
      return ('0' + number).slice(-2);
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="convertDateTime">{{ convertDataString }}</time>
      </li>
    </ul>`,
});
