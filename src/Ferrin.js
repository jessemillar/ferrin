var f = new Object() // The main namespace for Ferrin's functions and variables

var Ferrin = function()
{
	f.scene = new THREE.Scene()
	f.renderer = new THREE.WebGLRenderer()
	f.renderer.setSize(window.innerWidth, window.innerHeight)

	document.body.appendChild(f.renderer.domElement) // Append the renderer to the window

	window.addEventListener('resize', function() // Always resize the three.js instance to fill the whole window
	{
		f.camera.aspect = window.innerWidth / window.innerHeight
		f.camera.updateProjectionMatrix()

		f.renderer.setSize(window.innerWidth, window.innerHeight)
	})

	this.render = function()
	{
		f.renderer.render(f.scene, f.camera)
		requestAnimationFrame(main)

		return this
	}

	this.setBackgroundColor = function(color)
	{
		f.renderer.setClearColor(color, 1)

		return this
	}

	this.setTitle = function(title)
	{
		document.title = title

		return this
	}
}