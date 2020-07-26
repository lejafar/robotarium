<template>
  <div className="container">
    <header>
      <h1>Page List</h1>
    </header>
	<form className="new-page" @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Type to add new page"
          v-model="newPage"
        />
      </form>
    <ul>
	  <Page v-for="page in pages" v-bind:key="page._id" v-bind:page="page" />
    </ul>
  </div>
</template>
 
<script>
import Vue from "vue";
import Page from "./Page.vue";
import { Pages } from "../api/pages.js";

export default {
  components: {
    Page
  },
  data() {
    return {
		newPage: ""
	};
  },
  methods: {
	handleSubmit(event) {
      Pages.insert({
        text: this.newPage,
        createdAt: new Date() // current time
      });
      // Clear form
      this.newPage = "";
    }
  },
  meteor: {
	pages() {
	  return Pages.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  }
};
</script>
