<template>
	<div class="container">
		<div class="container">
			<div class="header">
                <h1>Dingen</h1>
			</div>
			<div>
			<div class="row justify-content-md-center">
				<div class="col-11">
                    <blaze-template template="loginButtons" tag="span"></blaze-template>
                    <b-form-file @change="handleSubmit" squared ></b-form-file>
                    <Stl v-for="stl in stls" v-bind:key="stl._id" v-bind:stl="stl" />
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Stl from "./Stl.vue";
import { Stls } from "../api/stls.js";

export default {
  components: {
    Stl
  },
  data() {
    return {
	};
  },
  methods: {
	handleSubmit(event) {
	  selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
	  reader.onload = function () {
        Meteor.call("stls.insert", selectedFile.name, reader.result);
	  };
    },
  },
  meteor: {
    $subscribe: {
      stls: []
    },
	stls() {
	  return Stls.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  }
};
</script>
