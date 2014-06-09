var f = new Object() // The main namespace for Ferrin functions and variables

var Ferrin = function()
{
	f.scene = new THREE.Scene()
	f.renderer = new THREE.WebGLRenderer()
	f.renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(f.renderer.domElement)

	this.setTitle = function(title)
    {
        document.title = title

        return this
    }

	this.setSize = function(width, height)
	{
		f.renderer.setSize(window.innerWidth, window.innerHeight)
		this.append()

		return this
	}

		this.append = function()
		{
			document.body.appendChild(f.renderer.domElement)

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