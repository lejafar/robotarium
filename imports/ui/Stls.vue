<template>
  <div class="container">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-11">
          <!-- <router-link to="/">↩ Terug</router-link> -->
        </div>
      </div>
      <div class="header">
        <h1>Dingen</h1>
      </div>
      <div>
        <template v-if="this.userIsLoggedIn">
          <div class="row justify-content-md-center">
            <div class="col-12">
              <blaze-template
                template="loginButtons"
                tag="span"
              ></blaze-template>

              <b-form inline @submit="handleSubmit" @submit.stop.prevent>
                <b-form-file
                  squared
                  placeholder="Selecteer een bestand"
                  accept=".stl"
                  browse-text="Zoeken"
                  drop-placeholder="Sleep bestand naar hier..."
                ></b-form-file>
                <b-button type="submit" variant="outline-primary" squared
                  >Upload</b-button
                >
              </b-form>
              <!-- <a href="/alle-dingen">toon alle dingen</a> -->
              <Stl
                v-for="stl in onlyMyStls(stls)"
                v-bind:key="`${stl._id}_myOwn`"
                v-bind:stl="stl"
              />
            </div>
          </div>
          <div class="row justify-content-md-center">
            <b-button @click="showMore" style="margin: 30px" squared variant="outline-primary">Toon meer</b-button>
          </div>
        </template>
        <div v-else class="row justify-content-md-center">
          <p>
            Eerst hier inloggen<span style="margin-right: 10px" />→<span
              style="margin-right: 10px"
            />
            <blaze-template template="loginButtons" tag="span"></blaze-template>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Stl from "./Stl.vue";
import { Stls } from "../api/stls.js";

STLS_PER_PAGE = 10;
export default {
  components: {
    Stl,
  },
  data() {
    return {
      userIsLoggedIn: false,
      stlLimit: STLS_PER_PAGE,
    };
  },
  methods: {
    handleSubmit(event) {
      selectedFile = event.target[0].files[0];
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function () {
        Meteor.call("stls.insert", selectedFile.name, reader.result);
      };
    },
    onlyMyStls(stls) {
      const userId = Meteor.userId();
      return stls.filter((stl) => stl.owner == userId);
    },
    onlyReadyToPrint(stls) {
      return stls.filter((stl) => stl.readyToPrint);
    },
    showMore(){
      this.stlLimit += STLS_PER_PAGE;
	  },
  },
  meteor: {
    $subscribe: {
      stls: function () {
        // Here you can use Vue reactive properties
        return [this.stlLimit]; // Subscription params
      },
    },
    stls() {
      // var today = moment().startOf(Date());
      // var fivedaysago = moment(today).subtract(3,'w');
      // console.log(fivedaysago)
      return Stls.find({}, { sort: { createdAt: -1 } }).fetch();
    },
  },
  mounted() {
    this.userIsLoggedIn = Meteor.loggingIn();
    if (!this.userIsLoggedIn) {
      // console.log("user not logging in!")
      Accounts.onLogin(function () {
        location.reload();
      });
    }
  },
};
</script>

<style>
.custom-file {
  width: 80%;
}

.btn-outline-primary {
  color: var(--main-fg-color);
  background-color: var(--main-bg-color);
  border-color: var(--main-fg-color);
}

.btn-outline-primary:hover {
  color: var(--main-bg-color);
  background-color: var(--main-fg-color);
  border-color: var(--main-fg-color);
}
</style>
