var Entity = function()
{
	var self = this

	this.three = new Object()
	this.mesh = new Object()

	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
	}

	this.setSize = function(width, height, depth)
	{
		this.width = width
		this.height = height
		this.depth = depth

		return this
	}

	this.setMesh = function(type, file)
	{
		this.mesh.type = type
		this.mesh.file = file

		return this
	}

	this.setColor = function(color)
	{
		this.color = color

		return this
	}

	this.setTexture = function(texture)
	{
		this.texture = texture

		return this
	}

	this.add = function()
	{
		this.make()
		
		f.scene.add(this.three.mesh)
	}

		this.make = function() // This is where the magic happens
		{
			if (this.mesh.type == 'cube')
			{
				this.three.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)

				// Load a texture or color, not both
				if (this.texture)
				{
					this.three.texture = new THREE.ImageUtils.loadTexture(this.texture)

					this.three.material = new THREE.MeshLambertMaterial({map: this.three.texture})
				}
				else if (this.color)
				{
					this.three.material = new THREE.MeshLambertMaterial({color: this.color})
				}

				this.three.mesh = new THREE.Mesh(this.three.geometry, this.three.material)
				this.three.mesh.position.x = this.x
				this.three.mesh.position.y = this.y
				this.three.mesh.position.z = this.z
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
			if (this.mesh.type == 'cube')
			{
				this.three.mesh.position.x = this.x
				this.three.mesh.position.y = this.y
				this.three.mesh.position.z = this.z
			}
		}
}