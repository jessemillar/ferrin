var SpotLight = function()
{
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

	this.add = function()
	{
		this.light = new THREE.SpotLight('#ffffff')
		this.light.position.x = this.x
		this.light.position.y = this.y
		this.light.position.z = this.z
		this.light.intensity = this.intensity

		f.scene.add(this.light)

		return this
	}
}