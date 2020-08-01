<template>
  <div className="container">
	<router-view></router-view>
  </div>
</template>

<script>
import Reveal from 'reveal.js'
export default {
	mounted () {
		Reveal.initialize()
	}
};
</script>

<style>

:root {
  --main-fg-color: #ffffff;
  --main-bg-color: #616497;
}

@font-face {
    font-family: 'PixChicago';
    src: url('/pixChicago.eot');
    src: url('/pixChicago.eot?#iefix') format('embedded-opentype'),
        url('/pixChicago.woff2') format('woff2'),
        url('/pixChicago.woff') format('woff'),
        url('/pixChicago.ttf') format('truetype'),
        url('/pixChicago.svg#pixChicago') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

h1, h2, h3, h4, h5, h6, footer {
	font-family: 'PixChicago', Fallback, sans-serif;
	font-style: normal;
}

h1 {
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
}

body {
	font-family: monospace;
	color: var(--main-fg-color);
	background-color: var(--main-bg-color);
	font-size: 1.2rem;
}
</style>

