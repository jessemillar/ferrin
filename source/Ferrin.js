var f = new Object() // The main namespace for Ferrin functions and variables

var Ferrin = function()
{
	f.scene = new THREE.Scene()
	f.renderer = new THREE.WebGLRenderer()
	f.renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(f.renderer.domElement)

	window.addEventListener('resize', function()
	{
	    f.camera.aspect = window.innerWidth / window.innerHeight
	    f.camera.updateProjectionMatrix()

	    f.renderer.setSize(window.innerWidth, window.innerHeight)
	})

	this.setTitle = function(title)
    {
        document.title = title

        return this
    }

	this.enableShadows = function()
	{
		f.renderer.shadowMapEnabled = true
		f.renderer.shadowMapType = THREE.BasicShadowMap

		return this
	}

	this.render = function()
	{
		f.renderer.render(f.scene, f.camera)
		requestAnimationFrame(this.render)

		return this
	}

	this.setColor = function(color)
	{
		f.renderer.setClearColor(color, 1)

		return this
	}
}