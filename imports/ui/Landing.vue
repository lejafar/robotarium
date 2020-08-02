<template>
<div>
	<div class="container vertical-center">
		<div class="container">
			<div class="header">
				<div class="typewriter">
					<h1>ROBOTARIUM</h1>
				</div>
				<h2>Programmeer atelier voor toekomstige hacker(tje)s</h2>
			</div>
			<div>
			<div class="row justify-content-md-center">
				<div class="col-8">
				<b-tabs content-class="mt-3" align="center" class="tabs">
					<b-tab title="Over" active>
					<p>Gratis ateliers rond 3D-printing, programmeren, webdesign, electronica en machine learning deze zomer in de Blikfabriek in Hoboken </p></b-tab>
					<b-tab title="Workshops">
						<ul>
							<li>
							3D Printing
							<ul>
								<li><router-link to="/slides/3d" target="_blank">Slides</router-link></li>
								<li><router-link to="/dingen">Dingen</router-link></li>
							</ul>
							</li>
							<li>Face Mapping</li>
							<li>Web Design</li>
							<li>RF Hacking</li>
						</ul>
					</b-tab>
				</b-tabs>
				</div>
			</div>
			</div>
		</div>
	</div>
	<footer class="footer mt-auto py-3">
	<div class="container">
	<span>rafael@robotatrium.be</span>
	</div>
	</footer>
</div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
	};
  },
};
</script>

<style>
h1, h2 {
	text-align: center;
}
.vertical-center {
  min-height: 100%;  /* Fallback for vh unit */
  min-height: 100vh; /* You might also want to use
                        'height' property instead.
                        Note that for percentage values of
                        'height' or 'min-height' properties,
                        the 'height' of the parent element
                        should be specified explicitly.
                        In this case the parent of '.vertical-center'
                        is the <body> element */

  /* Make it a flex container */
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex; 

  /* Align the bootstrap's container vertically */
    -webkit-box-align : center;
  -webkit-align-items : center;
       -moz-box-align : center;
       -ms-flex-align : center;
          align-items : center;

  /* In legacy web browsers such as Firefox 9
     we need to specify the width of the flex container */
  width: 100%;

  /* Also 'margin: 0 auto' doesn't have any effect on flex items in such web browsers
     hence the bootstrap's container won't be aligned to the center anymore.
     Therefore, we should use the following declarations to get it centered again */
         -webkit-box-pack : center;
            -moz-box-pack : center;
            -ms-flex-pack : center;
  -webkit-justify-content : center;
          justify-content : center;
}

.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

.header h1 {
	margin-bottom: 1rem;
}

.header h2 {
	font-size: 0.7rem;
	margin-bottom: 4rem;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}

footer {
	text-align: center;
	font-size: .7rem;
}

footer.mt-auto {
	margin-top: -51px !important;
}

a[role=tab] {
	color: #ffffff;
}

.nav-tabs .nav-link {
    border-top-left-radius: 0rem;
    border-top-right-radius: 0rem;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    border-color: #fff;
}

.tab-content{
	min-height: 150px;
}
</style>
