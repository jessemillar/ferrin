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
	this.marker = new Object()
		this.marker.enabled = false

	this.texture = new Object()
		this.texture.tile = false // Don't tile textures by default

	this.mesh = new Object() // Mesh type and file location
	this.three = new Object() // three.js objects and values go here instead of cluttering the engine
		this.three.outline = new Object()
		this.three.marker = new Object()

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

	this.setSize = function(width, depth, height)
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
		this.texture.file = texture

		return this
	}

		this.enableTile = function()
		{
			this.texture.tile = true

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

	this.enableMarker = function(texture)
	{
		this.marker.enabled = true

		this.marker.texture = texture

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

	this.setOutlineColor = function(color) // Use after object instantiation
	{
		this.outline.color = color

		this.updateOutline()
	}

		this.updateOutline = function()
		{
			this.three.outline.material.color.setHex(this.outline.color)
		}

	this.add = function()
	{
		this.build()
	}

		this.build = function() // This is where the magic happens
		{
			if (this.mesh.type == 'cube')
			{
				this.three.geometry = new THREE.BoxGeometry(this.size.width, this.size.depth, this.size.height)

				// Load a texture or color, not both
				if (this.texture.file)
				{
					this.three.texture = new THREE.ImageUtils.loadTexture(this.texture.file)

					if (this.texture.tile) // Tile the texture if we haven't said otherwise
					{
						this.three.texture.wrapS = THREE.RepeatWrapping
						this.three.texture.wrapT = THREE.RepeatWrapping
						this.three.texture.repeat.x = this.size.width
						this.three.texture.repeat.y = this.size.depth
						this.three.texture.repeat.z = this.size.height
					}

					this.three.material = new THREE.MeshLambertMaterial({map: this.three.texture})
				}
				else if (this.color)
				{
					this.three.material = new THREE.MeshLambertMaterial({color: this.color})
				}

				this.three.mesh = new THREE.Mesh(this.three.geometry, this.three.material)

				// Create a marker beneath the model if enabled
				if (this.marker.enabled)
				{
					var scale = 2.5
					var size = Math.max(this.size.width, this.size.height)

					this.three.marker.geometry = new THREE.PlaneBufferGeometry(size * scale, size * scale)

					this.three.marker.texture = new THREE.ImageUtils.loadTexture(this.marker.texture)
					this.three.marker.material = new THREE.MeshLambertMaterial({map: this.three.marker.texture, transparent: true})

					this.three.marker.mesh = new THREE.Mesh(this.three.marker.geometry, this.three.marker.material)

					if (this.shadows.cast) // Make sure the shadow goes over the marker if our entity is casting a shadow
					{
						this.three.marker.mesh.receiveShadow = true
					}

					f.scene.add(this.three.marker.mesh)
				}

				// Load the outline "shader" if enabled
				if (this.outline.enabled)
				{
					this.three.outline.material = new THREE.MeshBasicMaterial({color: this.outline.color, side: THREE.BackSide})
					this.three.outline.mesh = new THREE.Mesh(this.three.geometry, this.three.outline.material)
						this.three.outline.mesh.scale.multiplyScalar(1.1)
					
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

					if (this.marker.enabled)
					{
						this.three.marker.mesh.position.x = this.position.x
						this.three.marker.mesh.position.y = this.position.y
						this.three.marker.mesh.position.z = this.position.z - this.size.height * 0.56 // Place the marker underneath the model (and the outline)
					}

					if (this.outline.enabled)
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

		this.logPosition = function()
		{
			this.previous.position.x = this.position.x
			this.previous.position.y = this.position.y
			this.previous.position.z = this.position.z
		}

	this.move = function(axis, speed, obstacle)
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

		this.checkCollision(obstacle) // Check for group and then check for and correct collisions

		this.apply()
	}

		this.checkCollision = function(obstacle)
		{
			if (obstacle.database)
			{
				for (var i = 0; i < obstacle.database.length; i++)
				{
					this.checkCollision(obstacle.database[i])
				}
			}
			else
			{
				var aX = this.position.x
				var aY = this.position.y
					aXPrevious = this.previous.position.x
					aYPrevious = this.previous.position.y
				var aWidth = this.size.width / 2
				var aDepth = this.size.depth / 2

				var bX = obstacle.position.x
				var bY = obstacle.position.y
				var bWidth = obstacle.size.width / 2
				var bDepth = obstacle.size.depth / 2

				if (aY + aDepth > bY - bDepth && aY - aDepth < bY + bDepth && aX - aWidth < bX + bWidth && aX + aWidth > bX - bWidth) // If inside box (check top, bottom, left, then right)
				{
					if (aXPrevious + aWidth > bX - bWidth && aXPrevious - aWidth < bX + bWidth) // Top or bottom
					{
						if (aYPrevious + aDepth > bY - bDepth) // Top side correction
						{
							this.position.y = obstacle.position.y + bDepth + aDepth
						}
						else if (aYPrevious - aDepth < bY + bDepth) // Bottom side correction
						{
							this.position.y = obstacle.position.y - bDepth - aDepth
						}
					}
					else if (aYPrevious - aDepth < bY + bDepth && aYPrevious + aDepth > bY - bDepth) // Left or right
					{
						if (aXPrevious + aWidth < bX - bWidth) // Left side correction
						{
							this.position.x = obstacle.position.x - bWidth - aWidth * 1.001 // Not sure why I need this hack
						}
						else if (aXPrevious - aWidth > bX + bWidth) // Right side correction
						{
							this.position.x = obstacle.position.x + bWidth + aWidth * 1.001 // Not sure why I need this hack
						}
					}
				}
			}
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