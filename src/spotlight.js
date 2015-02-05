var SpotLight = function()
{
	this.shadows = new Object()
		this.shadows.cast = false
		this.shadows.darkness = 0.5

	this.three = new Object() // Keep all the three.js stuff here

	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

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
		this.three.light = new THREE.SpotLight('#ffffff')
		this.three.light.position.x = this.x
		this.three.light.position.y = this.y
		this.three.light.position.z = this.z
		this.three.light.intensity = this.intensity

		if (this.shadows.cast)
		{
			console.log('Light shadow casting enabled')
			this.three.light.castShadow = true
			this.three.light.shadowDarkness = this.shadows.darkness
			this.three.light.shadowCameraVisible = true

			this.three.light.shadowCameraRight    =  5;
			this.three.light.shadowCameraLeft     = -5;
			this.three.light.shadowCameraTop      =  5;
			this.three.light.shadowCameraBottom   = -5;
		}

		f.scene.add(this.three.light)
	}
}