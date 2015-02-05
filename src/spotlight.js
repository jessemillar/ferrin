var SpotLight = function()
{
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
		this.three.light = new THREE.SpotLight(0xffffff)
		this.three.light.intensity = this.intensity

		if (this.shadows.cast)
		{
			console.log('Light shadow casting enabled')
			this.three.light.castShadow = true

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