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

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '../imports/ui/App.vue';

import router from '../imports/router'

Meteor.startup(() => {
      new Vue({
              el: '#app',
			  router,
              ...App,
            });
});
