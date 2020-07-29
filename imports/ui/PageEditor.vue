<template>
  <div>
  <h1>page editor</h1>
    <prism-editor class="split left" v-model="page.content" language="html" @change="saveCode" :lineNumbers="true"></prism-editor>
	<iframe class="split right" :srcdoc="page.content"></iframe>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import PrismEditor from 'vue-prism-editor'
import { Pages } from "../api/pages.js";

export default {
  data() {
    return {
    };
  },
  components: {
    "prism-editor": PrismEditor
  },
  meteor: {
    $subscribe: {
      pages: []
    },
	page() {
	  return Pages.findOne(this.pageId());
	}
  },
  methods: {
	pageId(){
		return this.$route.params.pageId;
	},
	saveCode(){
	  Meteor.call("pages.updateContent", this.pageId(), this.page.content);
    }
  }
}
</script>

<style scoped=true>
/* Split the screen in half */
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
}

/* Control the left side */
.left {
  left: 0;
}

/* Control the right side */
.right {
  right: 0;
}

iframe {
    background-color: #fff;
}
</style>
