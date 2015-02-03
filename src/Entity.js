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
		this.model = new Object()

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
		this.make()
		
		f.scene.add(this.mesh)
	}

		this.make = function()
		{
			if (this.meshType == 'cube')
			{
				if (this.texture)
				{
					this.material = new THREE.MeshLambertMaterial({map: this.texture})
				}
				else if (this.color)
				{
					this.material = new THREE.MeshLambertMaterial({color: this.color})
				}

				this.mesh = new THREE.Mesh(this.geometry, this.material)
				this.mesh.position.x = this.x
				this.mesh.position.y = this.y
				this.mesh.position.z = this.z
			}
		}

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