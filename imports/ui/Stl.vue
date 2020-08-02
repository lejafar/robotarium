<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="3" class="viewer">
		<model-stl :src="`${stl.content}`" :backgroundAlpha=".0"></model-stl>
      </b-col>
      <b-col md="9">
        <b-card-body :title="stl.filename">
          <b-card-text>
			<div class="stl-info">
				<p>Mesh is opgebouwd uit <b>{{ triangleCount }}</b> driehoeken</p>
				<p>{{ stl.createdAt | formatDate }} door <b>{{owner | creator }}</b></p>
			</div>
			<b-form inline>
				<b-button :download="stl.filename" :href="stl.content" squared variant="outline-primary">Download</b-button>
				<b-button v-if="ownedByCurrentUser()" @click="remove" squared variant="outline-primary">Verwijderen</b-button>
				<b-button v-else disabled squared variant="outline-primary">Verwijderen</b-button>
				<b-form-checkbox v-if="ownedByCurrentUser()" v-model="stl.readyToPrint" @change="setReadyToPrint"> Klaar om te printen </b-form-checkbox>
				<b-form-checkbox v-else v-model="stl.readyToPrint" disabled> Klaar om te printen </b-form-checkbox>
			</b-form>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { ModelStl } from 'vue-3d-model';
import * as Three from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import moment from "moment";

export default {
  props: ["stl"],
  components: { ModelStl },
  data() {
    return {
		triangleCount: 0
	};
  },
  methods: {
	remove(){
        Meteor.call("stls.remove", this.stl._id);
	},
	ownedByCurrentUser(){
		return Meteor.user() && Meteor.user()._id == this.stl.owner;
	},
	readTriangleCount(){
		var loader = new STLLoader();
		loader.load(this.stl.content, ( geometry ) => {
			this.triangleCount = geometry.attributes.position.count / 3
		});
	},
	setReadyToPrint(value){
		Meteor.call("stls.updateReadyToPrint", this.stl._id, value);
	}
  },
  filters: {
	creator: function(owner){
		if (owner){
			if ('username' in owner) return owner.username;
			if ('email' in owner) return owner.email;
			if ('services' in owner){
				if ('google' in owner.services) return owner.services.google.email;
			}
		}
	},
	formatDate: function(createdAd){
		let created_at = moment(createdAd);
		return created_at.calendar(null, { sameElse: `LLL` });
	}
  },
  meteor: {
    $subscribe: {
      hackers: []
    },
	owner() {
	  return Meteor.users.findOne(this.stl.owner);
    }
  },
  mounted() {
	this.readTriangleCount();
  }
};
</script>

<style>
.card-body {
	color: var(--main-bg-color);
}

.card {
	margin-top: 1rem;
}

canvas:focus {
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
}

.card-body .btn-outline-primary {
    color: var(--main-bg-color);
    background-color: var(--main-fg-color);
    border-color: var(--main-bg-color);
}

.card-body .btn-outline-primary:hover {
    color: var(--main-fg-color);
    background-color: var(--main-bg-color);
    border-color: var(--main-bg-color);
}

.card-body .btn-outline-primary.disabled:hover {
    color: var(--main-bg-color);
    background-color: transparent;
}

:focus {
outline: 0;
}

.viewer {
	min-height: 200px;
}

.form-inline a, .form-inline button, .form-inline div {
	margin-right: 1rem;
}
</style>
