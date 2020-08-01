<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="4" class="viewer">
		<model-stl :src="`${stl.content}`" :backgroundAlpha=".0"></model-stl>
      </b-col>
      <b-col md="8">
        <b-card-body :title="stl.filename">
          <b-card-text>
			<div class="stl-info">
				<p>Gemaakt op {{stl.createdAt}}</p>
				<p>door <b>{{owner && owner.username || owner && owner.services && owner.services.google.email}}</b></p>
			</div>
			<div>
				<b-button :download="stl.filename" :href="stl.content" squared variant="outline-primary">Download</b-button>
				<b-button @click="remove" squared variant="outline-primary">Verwijderen</b-button>
			</div>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { ModelStl } from 'vue-3d-model';

export default {
  props: ["stl"],
  components: { ModelStl },
  data() {
    return {};
  },
  methods: {
	remove(){
        Meteor.call("stls.remove", this.stl._id);
	}
  },
  meteor: {
    $subscribe: {
      hackers: []
    },
	owner() {
	  return Meteor.users.findOne(this.stl.owner);
    }
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

.btn-outline-primary {
    color: var(--main-bg-color);
    border-color: var(--main-bg-color);
}

.btn-outline-primary:hover {
    color: var(--main-fg-color);
    background-color: var(--main-bg-color);
    border-color: var(--main-bg-color);
}
:focus {
outline: 0;
}

.viewer {
	min-height: 200px;
}
</style>
