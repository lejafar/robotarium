<template>
  <li><router-link :to="{ name: 'page-editor', params: { pageId: this.page._id }}"> {{ this.page.title }} </router-link><span v-if="getOwner()">(created by: {{getOwner().username}})</span></li>
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {};
  },
  methods: {
    getOwner(){
        return Meteor.users.findOne({_id: this.page.owner})
    }
  }
};
</script>
