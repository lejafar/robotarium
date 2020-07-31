<template>
  <li>
  {{stl.filename}}<span v-if="getOwner()">(created by: {{getOwner().username}})</span>
  <a :download="stl.filename" :href="stl.content">Download</a>
  <model-stl :src="`${stl.content}`" :backgroundAlpha=".5"></model-stl>
  </li>
</template>

<script>
import { ModelStl } from 'vue-3d-model';
export default {
  props: ["stl"],
  components: { ModelStl },
  data() {
    return {};
  },
  methods: {
    getOwner(){
        return Meteor.users.findOne({_id: this.stl.owner})
    }
  }
};
</script>
