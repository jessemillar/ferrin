var Entity = function()
{
	var self = this

	this.castingShadow = true
	this.receivingShadow = true

	this.disableShadow = function()
	{
		this.castingShadow = false
		this.receivingShadow = false

		return this
	}

	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
	}

	this.setSize = function(width, height, depth)
	{
		if (this.meshType == 'cube')
		{
			this.geometry = new THREE.BoxGeometry(width, height, depth)
		}

		return this
	}

	this.setMesh = function(type, file)
	{
		this.meshType = type
		this.meshFile = file

		return this
	}

	this.setColor = function(color)
	{
		this.color = color

		return this
	}

	this.setTexture = function(texture)
	{
		this.texture = new THREE.ImageUtils.loadTexture(texture)

		return this
	}

	this.add = function()
	{
		this.makeMesh()

		if (this.meshType == 'cube')
		{
			this.mesh.castShadow = this.castingShadow
			this.mesh.receiveShadow = this.receivingShadow
		}
		
		f.scene.add(this.mesh)

		return this
	}

		this.makeMesh = function()
		{
			if (this.meshType == 'cube')
			{
				this.material = new THREE.MeshLambertMaterial({color: this.color, map: this.texture})
				this.mesh = new THREE.Mesh(this.geometry, this.material)
				this.mesh.position.x = this.x
				this.mesh.position.y = this.y
				this.mesh.position.z = this.z
			}
			else if (this.meshType == 'model')
			{
				console.log('Loading meshes has not been implemented')

				// var loader = new THREE.JSONLoader();
				// 	loader.load(file, function (geometry, materials)
				// 	{
				// 		self.material = new THREE.MeshFaceMaterial(materials)
				// 		self.model = new THREE.Mesh(geometry, self.material)

				// 		self.model.position.x = self.x
				// 		self.model.position.y = self.y
				// 		self.model.position.z = self.z

				// 		f.scene.add(self.model)
				// 	})
			}

			return this
		}

	// this.spin = function(speed)
	// {
	// 	if (this.model)
	// 	{
	// 		this.model.rotation.x += speed
	// 		this.model.rotation.y += speed
	// 	}

	// 	return this
	// }

	this.move = function(axis, speed)
	{
		if (axis == 'x')
		{
			this.x += speed
		}
		else if (axis == 'y')
		{
			this.y += speed
		}
		else if (axis == 'z')
		{
			this.z += speed
		}

		this.applyPosition()
	}

		this.applyPosition = function() // Apply the new position to the mesh
		{
			if (this.meshType == 'cube')
			{
				this.mesh.position.x = this.x
				this.mesh.position.y = this.y
				this.mesh.position.z = this.z
			}
		}
}