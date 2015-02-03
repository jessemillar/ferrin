var Entity = function()
{
	var self = this

	this.position = new Object()
	this.previous = new Object() // For keeping track of past values
	this.mesh = new Object()
	this.three = new Object()

	this.setPosition = function(x, y, z)
	{
		this.position.x = x
		this.position.y = y
		this.position.z = z

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
				this.three.mesh.position.x = this.position.x
				this.three.mesh.position.y = this.position.y
				this.three.mesh.position.z = this.position.z
			}
		}

	this.move = function(axis, speed)
	{
		this.previous = this.position // Log the current position

		if (axis == 'x')
		{
			this.position.x += speed
		}
		else if (axis == 'y')
		{
			this.position.y += speed
		}
		else if (axis == 'z')
		{
			this.position.z += speed
		}

		this.applyPosition()
	}

		this.applyPosition = function() // Apply the new position to the mesh
		{
			if (this.mesh.type == 'cube')
			{
				this.three.mesh.position.x = this.position.x
				this.three.mesh.position.y = this.position.y
				this.three.mesh.position.z = this.position.z
			}
		}
}