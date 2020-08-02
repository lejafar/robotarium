<template>
<div class="reveal">
  <div class="slides">
    <section>
        <h1>3D</h1>
		<div class="summary">
		<p class="fragment" data-fragment-index="1">📖 beschrijven</p>
		<p class="fragment" data-fragment-index="2">🖥  weergeven</p>
		<p class="fragment" data-fragment-index="3">👨‍🎨 ontwerpen</p>
		<p class="fragment" data-fragment-index="4">🏭 printen</p>
		</div>
		</ul>
    </section>
    <section>
        <h2>3D / beschrijven</h2>
		<img src="/images/stanford-rabbit.png"></img>
    </section>
    <section>
        <h2>3D / beschrijven</h2>
		<img src="/images/stanford-rabbit-triangles.png"></img>
		<p class="fragment" data-fragment-index="1">Triangular Mesh (TriMesh)</p>
		<p class="fragment" data-fragment-index="2">💾 konijn.stl</p>
    </section>
    <section>
        <h2>3D / beschrijven</h2>
		  <p class="fragment" data-fragment-index="1">💾 konijn.stl</p>
		  <pre class="fragment" data-fragment-index="2"><code data-trim data-noescape>
  facet normal -2.497072e-01  3.351389e-01  9.084758e-01
    outer loop
      vertex   2.922699e+01  1.870715e+01  4.453949e+01
      vertex   4.615999e+01  1.662592e+01  4.996154e+01
      vertex   3.651894e+01  2.635740e+01  4.372159e+01
    endloop
  endfacet
  facet normal  5.866337e-01 -6.802353e-01 -4.394778e-01
    outer loop
      vertex   4.675091e+01 -3.368329e+01  1.030903e+01
      vertex   5.525984e+01 -2.912070e+01  1.460501e+01
      vertex   5.513577e+01 -3.381898e+01  2.171151e+01
    endloop
  endfacet
  facet normal -5.897037e-01  2.240095e-02  8.073089e-01
    outer loop
      vertex   3.111716e+01  2.649944e+01  1.124342e+02
      vertex   2.336201e+01  2.039640e+01  1.069388e+02
      vertex   2.954287e+01  1.176572e+01  1.116931e+02
    endloop
  endfacet
  facet normal -1.196800e-01 -7.797421e-01  6.145558e-01
    outer loop
      vertex   1.397730e+01 -1.752172e+01  6.543388e+01
      vertex   1.246042e+01 -2.763136e+01  5.231147e+01
      vertex   2.716111e+01 -2.021051e+01  6.458981e+01
    endloop
  endfacet
  ...
		</code></pre>
    </section>
    <section>
        <h2>3D / weergeven</h2>
		<iframe id="vs_iframe" src="https://www.viewstl.com/?embedded&orientation=bottom&bgcolor=white&color=red&clean=yes&url=https%3A%2F%2Flocalhost:3000/stls/konijn.stl" style="border:0;margin:0;width:100%;height:100%;"></iframe>
    </section>
  </div>
</div>
</template>

<script>
import Reveal from 'reveal.js'
import { ModelStl } from 'vue-3d-model';

export default {
  name: 'threed',
  components: { ModelStl },
  mounted() {
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
.reveal h2 {
    color: var(--main-bg-color);
	font-size: 1.6rem;
}

.reveal ul > li:before { content: '🚀'; margin-left: -20px; margin-right: 10px; } 

.reveal .summary > p{
	max-width: 30%;
    margin: auto;
    text-align: left;
}

.reveal img {
	max-height: 400px;
}

.reveal .model-viewer {
	min-height: 400px;
}

</style>
