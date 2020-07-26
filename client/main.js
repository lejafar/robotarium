import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);
import '../imports/startup/accounts-config.js';

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import "prismjs";
import "prismjs/themes/prism.css";

import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
Vue.component("prism-editor", VuePrismEditor);

import App from '../imports/ui/App.vue';

import router from '../imports/router'

Meteor.startup(() => {
      new Vue({
              el: '#app',
			  router,
              ...App,
            });
});
