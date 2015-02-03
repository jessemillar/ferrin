var Entity = function()
{
	var self = this

	this.ferrin = new Object() // Where all the three.js variables for rendering are stored; the "human readable" ones will be naked (this.x as opposed to this.mesh.position.x)

	this.color = 'bada55' // Set the default color

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
		this.mesh = new Object()

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
		f.scene.add(this.make()) // Add to the global scene

		console.log(this.ferrin.mesh)
	}

		this.make = function()
		{
			if (this.mesh.type == 'cube')
			{
				this.ferrin.texture = new THREE.ImageUtils.loadTexture(this.texture) // We need texture in order to create the material for the mesh

				this.ferrin.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
				this.ferrin.material = new THREE.MeshLambertMaterial({color: this.color, map: this.texture})

				this.ferrin.mesh = new THREE.Mesh(this.ferrin.geometry, this.ferrin.material)

				this.ferrin.mesh.position.x = this.x
				this.ferrin.mesh.position.y = this.y
				this.ferrin.mesh.position.z = this.z
			}

			return this.ferrin.mesh
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
				this.ferrin.mesh.position.x = this.x
				this.ferrin.mesh.position.y = this.y
				this.ferrin.mesh.position.z = this.z
			}
		}
}