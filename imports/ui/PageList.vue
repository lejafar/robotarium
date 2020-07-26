<template>
    <div>
    <header>
      <h1>Page List</h1>
    </header>
	<blaze-template template="loginButtons" tag="span"></blaze-template>
	<form v-if="currentUser" className="new-page" @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Type to add new page"
          v-model="newPageTitle"
        />
      </form>
    <ul>
	  <Page v-for="page in pages" v-bind:key="page._id" v-bind:page="page" />
    </ul>
    </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Page from "./Page.vue";
import { Pages } from "../api/pages.js";

export default {
  components: {
    Page
  },
  data() {
    return {
		newPageTitle: ""
	};
  },
  methods: {
	handleSubmit(event) {
	  Meteor.call("pages.insert", this.newPageTitle, "");
      // Clear form
      this.newPageTitle = "";
    },
    currentUser() {
      return Meteor.user();
    }
  },
  meteor: {
    $subscribe: {
      pages: []
    },
	pages() {
	  return Pages.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  }
};
</script>
