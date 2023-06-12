<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="4" class="viewer">
        <template v-if="viewPrinted">
          <model-stl
            v-if="content"
            :src="`${content}`"
            :backgroundAlpha="0.0"
            :rotation="{ x: -Math.PI / 4, y: 0, z: Math.PI / 8 }"
          ></model-stl>
          <b-button
            v-else
            @click="showPreview"
            squared
            variant="outline-primary"
            >Toon</b-button
          >
        </template>
        <template v-else>
          <model-stl
            :src="`${content}`"
            :backgroundAlpha="0.0"
            :rotation="{ x: -Math.PI / 4, y: 0, z: Math.PI / 8 }"
          ></model-stl>
        </template>
      </b-col>
      <b-col md="8">
        <b-card-body :title="stl.filename">
          <b-card-text>
            <div class="stl-info">
              <p>
                Mesh is opgebouwd uit <b>{{ triangleCount }}</b> driehoeken
              </p>
              <p v-if="bboxX * bboxY * bboxZ > 10000">
                Volume:
                <b style="color: red"
                  >{{
                    Math.round((bboxX * bboxY * bboxZ + Number.EPSILON) * 100) /
                    100
                  }}
                  mm³ (TE GROOT)</b
                >
                ({{ bboxX }} * {{ bboxY }} * {{ bboxZ }})
              </p>
              <p v-else>
                Volume: <b>{{ bboxX * bboxY * bboxZ }}</b> mm³ ({{ bboxX }} mm *
                {{ bboxY }} mm * {{ bboxZ }} mm)
              </p>
              <p>
                {{ stl.createdAt | formatDate }} geupload door
                <b>{{ owner | creator }}</b>
              </p>
            </div>
            <b-form inline>
			  <b-button
			    v-if="content"
                :download="stl.filename"
                :href="content"
                squared
                variant="outline-primary"
                >Download</b-button
              >
			  <b-button
			    v-else
                @click="showPreview"
                squared
                variant="outline-secondary"
                >Download</b-button
              >
              
              <b-button @click="remove" squared variant="outline-primary"
                >Verwijderen</b-button
              >
              <!-- <b-button v-if="ownedByCurrentUser()" @click="remove" squared variant="outline-primary">Verwijderen</b-button>
				<b-button v-else disabled squared variant="outline-primary">Verwijderen</b-button> -->
              <b-form-checkbox
                v-if="ownedByCurrentUser()"
                v-model="stl.readyToPrint"
                @change="setReadyToPrint"
              >
                Klaar om te printen
              </b-form-checkbox>
              <b-form-checkbox v-else v-model="stl.readyToPrint" disabled>
                Klaar om te printen
              </b-form-checkbox>
              <b-form-checkbox
                v-if="viewPrinted"
                v-model="stl.printed"
                @change="setPrinted"
              >
                Geprint
              </b-form-checkbox>
            </b-form>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { ModelStl } from "vue-3d-model";
import * as Three from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import moment from "moment";

export default {
  props: ["stl", "viewPrinted"],
  components: { ModelStl },
  data() {
    return {
      content: "",
      triangleCount: 0,
      bboxX: 0.0,
      bboxY: 0.0,
      bboxZ: 0.0,
      minX: 0.0,
      minY: 0.0,
      minZ: 0.0,
    };
  },
  methods: {
    remove() {
      Meteor.call("stls.remove", this.stl._id);
    },
    showPreview() {
      Meteor.call("stls.resolve", this.stl._id, (error, result) => {
        this.content = result.content;
        this.readTriangleCount();
        this.readBBoxVolume();
      });
    },
    ownedByCurrentUser() {
      return Meteor.user() && Meteor.user()._id == this.stl.owner;
    },
    readTriangleCount() {
      var loader = new STLLoader();
      loader.load(this.content, (geometry) => {
        this.triangleCount = geometry.attributes.position.count / 3;
      });
    },
    readBBoxVolume() {
      var loader = new STLLoader();
      const box = new Three.Box3();
      loader.load(this.content, (geometry) => {
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        this.bboxX = Math.round(box.size().x * 100) / 100;
        this.bboxY = Math.round(box.size().y * 100) / 100;
        this.bboxZ = Math.round(box.size().z * 100) / 100;
        this.minX = box.min.x;
        this.minY = box.min.y;
        this.minZ = box.min.z;
      });
    },
    setReadyToPrint(value) {
      Meteor.call("stls.updateReadyToPrint", this.stl._id, value);
    },
    setPrinted(value) {
      Meteor.call("stls.updatePrinted", this.stl._id, value);
    },
  },
  filters: {
    creator: function (owner) {
      if (owner) {
        if ("username" in owner) return owner.username;
        if ("email" in owner) return owner.email;
        if ("services" in owner) {
          if ("google" in owner.services) return owner.services.google.email;
        }
      }
    },
    formatDate: function (createdAd) {
      let created_at = moment(createdAd);
      return created_at.calendar(null, { sameElse: `LLL` });
    },
  },
  meteor: {
    $subscribe: {
      hackers: [],
    },
    owner() {
      return Meteor.users.findOne(this.stl.owner);
    },
  },
  mounted() {
    if(!this.viewPrinted) {
		this.showPreview()
	}
  },
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

.form-inline a,
.form-inline button,
.form-inline div {
  margin-right: 1rem;
}
</style>
