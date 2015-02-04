var Entity = function()
{
	this.position = new Object()
	this.size = new Object()

	this.previous = new Object() // For keeping track of the past values like position
		this.previous.position = new Object()

	this.rotation = new Object()
		// Start rotation with a clean slate
		this.rotation.x = 0
		this.rotation.y = 0
		this.rotation.z = 0

	this.mesh = new Object() // Mesh type and file location
	this.three = new Object() // three.js objects and values go here instead of cluttering the engine

	this.setPosition = function(x, y, z)
	{
		this.position.x = x
		this.position.y = y
		this.position.z = z

		this.previous.position.x = x
		this.previous.position.y = y
		this.previous.position.z = z

		return this
	}

	this.setSize = function(width, height, depth)
	{
		this.size.width = width
		this.size.height = height
		this.size.depth = depth

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
		this.build()
		
		f.scene.add(this.three.mesh)
	}

		this.build = function() // This is where the magic happens
		{
			if (this.mesh.type == 'cube')
			{
				this.three.geometry = new THREE.BoxGeometry(this.size.width, this.size.height, this.size.depth)

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
				
				this.apply()
			}
		}

			this.apply = function() // Run after changing size, position, etc.
			{
				if (this.mesh.type == 'cube')
				{
					this.three.mesh.position.x = this.position.x
					this.three.mesh.position.y = this.position.y
					this.three.mesh.position.z = this.position.z

					// Make sure we feed three.js radians instead of degrees
					this.three.mesh.rotation.x = this.rotation.x * Math.PI / 180
					this.three.mesh.rotation.y = this.rotation.y * Math.PI / 180
					this.three.mesh.rotation.z = this.rotation.z * Math.PI / 180
				}
			}

	this.update = function()
	{
		this.logPosition()
		
		this.apply()

		return this
	}

	this.move = function(axis, speed)
	{
		if (axis == 'x')
		{
			this.previous.position.x = this.position.x
			this.position.x += speed
		}
		else if (axis == 'y')
		{
			this.previous.position.y = this.position.y
			this.position.y += speed
		}
		else if (axis == 'z')
		{
			this.previous.position.z = this.position.z
			this.position.z += speed
		}
	}

		this.logPosition = function()
		{
			this.previous.position.x = this.position.x
			this.previous.position.y = this.position.y
			this.previous.position.z = this.position.z
		}

	this.rotate = function(axis, degree)
	{
		if (axis == 'x')
		{
			this.rotation.x = degree
		}
		else if (axis == 'y')
		{
			this.rotation.y = degree
		}
		else if (axis == 'z')
		{
			this.rotation.z = degree
		}
	}

		this.clearRotation = function()
		{
			this.rotation.x = 0
			this.rotation.y = 0
			this.rotation.z = 0
		}

	this.autoFace = function()
	{
		this.rotation.z = Math.atan2(this.previous.position.y - this.position.y, this.previous.position.x - this.position.x) * 180 / Math.PI // this.rotation.z is a degree value
	}
}