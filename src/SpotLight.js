var SpotLight = function()
{
	this.castingShadow = true

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

	this.disableShadow = function()
	{
		this.castingShadow = false

		return this
	}

	this.add = function()
	{
		this.light = new THREE.SpotLight('#ffffff')
		this.light.position.x = this.x
		this.light.position.y = this.y
		this.light.position.z = this.z
		this.light.intensity = this.intensity

		if (this.castingShadow)
		{
			this.light.castShadow = true
			this.light.shadowMapWidth = 1024
			this.light.shadowMapHeight = 1024
			this.light.shadowCameraNear = 0.1
			this.light.shadowCameraFar = 1000
			this.light.shadowCameraFov = 45
		}

		f.scene.add(this.light)

		return this
	}
}