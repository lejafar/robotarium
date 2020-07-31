<template>
<div class="reveal">
  <div class="slides">
    <section>
        <h1>3D workshop</h1>
    </section>
    <section>
        <h2>3D objecten</h2>
        <ul>
            <li>een</li>
            <li>twee</li>
            <li>drie</li>
            <li>vier</li>
            <li>vijf</li>
            <li>zes</li>
        </ul>
    </section>
  </div>
</div>
</template>

<script>
import Reveal from 'reveal.js'
export default {
  name: 'threed',
  components: {
  },
  mounted() {
    console.log('mounted');
    Reveal.initialize()
  }
}
</script>

<style>
.reveal {
  height: 100vh;
}
.reveal h1, .reveal h2 {
	font-family: 'PixChicago', Fallback, sans-serif;
}

</style>
