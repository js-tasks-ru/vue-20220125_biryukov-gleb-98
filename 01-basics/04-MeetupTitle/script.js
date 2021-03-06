import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const MeetupTitle = {
  data() {
    return {
      valueID: 0,
      meetupTitle: '',
    };
  },
  watch: {
    valueID(newID, oldID) {
      this.getTitle();
    },
  },

  methods: {
    getTitle() {
      fetchMeetupById(this.valueID).then((data) => {
        return (this.meetupTitle = data.title);
      });
    },
  },
};

createApp(MeetupTitle).mount('#app');
