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

	this.shadows = new Object()
		this.shadows.cast = false
		this.shadows.receive = false
	this.outline = new Object()
		this.outline.enabled = false
		this.outline.color = 0x000000

	this.mesh = new Object() // Mesh type and file location
	this.three = new Object() // three.js objects and values go here instead of cluttering the engine
		this.three.outline = new Object()

	this.setPosition = function(x, y, z)
	{
		this.position.x = x
		this.position.y = y
		this.position.z = z

		// Set the position as both past and present so we have something to compare later on
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

	this.castShadows = function()
	{
		this.shadows.cast = true

		return this
	}

	this.receiveShadows = function()
	{
		this.shadows.receive = true

		return this
	}

	this.enableOutline = function(color)
	{
		this.outline.enabled = true

		if (color)
		{
			this.outline.color = color
		}

		return this
	}

	this.add = function()
	{
		this.build()
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

				// Load the outline shader if enabled
				if (this.outline.enabled)
				{
					this.three.outline.material = new THREE.MeshBasicMaterial({color: this.outline.color, side: THREE.BackSide})
					this.three.outline.mesh = new THREE.Mesh(this.three.geometry, this.three.outline.material)
						this.three.outline.mesh.scale.multiplyScalar(1.1)
						this.three.outline.mesh.position.x = this.position.x
						this.three.outline.mesh.position.y = this.position.y
						this.three.outline.mesh.position.z = this.position.z
					
					f.scene.add(this.three.outline.mesh)
				}

				// Load up shadow configurations if enabled
				if (this.shadows.cast)
				{
					this.three.mesh.castShadow = true
				}

				if (this.shadows.receive)
				{
					this.three.mesh.receiveShadow = true
				}

				this.apply()

				f.scene.add(this.three.mesh)
			}
		}

			this.apply = function() // Run after changing size, position, etc.
			{
				if (this.mesh.type == 'cube')
				{
					// Main mesh position
					this.three.mesh.position.x = this.position.x
					this.three.mesh.position.y = this.position.y
					this.three.mesh.position.z = this.position.z

					// Main mesh rotation
					this.three.mesh.rotation.x = this.rotation.x * Math.PI / 180
					this.three.mesh.rotation.y = this.rotation.y * Math.PI / 180
					this.three.mesh.rotation.z = this.rotation.z * Math.PI / 180

					if (this.outline)
					{
						// Outline mesh position
						this.three.outline.mesh.position.x = this.position.x
						this.three.outline.mesh.position.y = this.position.y
						this.three.outline.mesh.position.z = this.position.z

						// Outline mesh rotation
						this.three.outline.mesh.rotation.x = this.rotation.x * Math.PI / 180
						this.three.outline.mesh.rotation.y = this.rotation.y * Math.PI / 180
						this.three.outline.mesh.rotation.z = this.rotation.z * Math.PI / 180
					}
				}
			}

	this.update = function()
	{
		this.apply()

		this.logPosition() // Update past position to current position
	}

	this.move = function(axis, speed)
	{
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