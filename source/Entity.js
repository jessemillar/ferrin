var Entity = function()
{
	var self = this

	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
	}

	this.castShadow = function()
	{
		this.castingShadow = true

		return this
	}

	this.receiveShadow = function()
	{
		this.receivingShadow = true

		return this
	}

	this.load = function(model)
	{
		var loader = new THREE.JSONLoader();
			loader.load(model, function (geometry, materials)
			{
				self.material = new THREE.MeshFaceMaterial(materials)
				self.model = new THREE.Mesh(geometry, self.material)

				self.model.position.x = self.x
				self.model.position.y = self.y
				self.model.position.z = self.z

				f.scene.add(self.model)
			})

		return this
	}

	this.spin = function(speed)
	{
		if (this.model)
		{
			this.model.rotation.x += speed
			this.model.rotation.y += speed
		}

		return this
	}
}