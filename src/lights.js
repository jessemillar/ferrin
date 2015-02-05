var Light = function()
{
	this.type = 'ambient'
	this.color = 0xffffff
	this.intensity = 1

	this.position = new Object()

	this.shadows = new Object()
		this.shadows.cast = false

	this.three = new Object() // Keep all the three.js stuff here

	this.setPosition = function(x, y, z)
	{
		this.position.x = x
		this.position.y = y
		this.position.z = z

		return this
	}

	this.setType = function(type)
	{
		this.type = type

		return this
	}

	this.setColor = function(color)
	{
		this.color = color

		return this
	}

	this.setIntensity = function(intensity)
	{
		this.intensity = intensity

		return this
	}

	this.castShadows = function()
	{
		this.shadows.cast = true

		return this
	}

	this.add = function()
	{
		if (this.type == 'ambient')
		{
			this.three.light = new THREE.AmbientLight(this.color)
		}
		else if (this.type == 'spotlight')
		{
			// this.three.light = new THREE.SpotLight(this.color)
			this.three.light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1)
		}
		
		this.three.light.intensity = this.intensity

		if (this.shadows.cast)
		{
			console.log('Light shadow casting enabled')
			this.three.light.castShadow = true

			this.three.light.shadowCameraNear = 1
			this.three.light.shadowCameraFar = 50

			// this.three.light.shadowBias = 0.0001
			// this.three.light.shadowDarkness = 0.5

			this.three.light.shadowMapWidth = 512
			this.three.light.shadowMapHeight = 512

			this.three.light.shadowCameraVisible = true // Debug
		}

		this.apply()

		f.scene.add(this.three.light)
	}

		this.apply = function()
		{
			this.three.light.position.x = this.position.x
			this.three.light.position.y = this.position.y
			this.three.light.position.z = this.position.z
		}
}