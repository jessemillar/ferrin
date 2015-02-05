var Plane = function()
{
	this.position = new Object()
	this.size = new Object()

	this.texture = new Object()
	this.texture.tile = true // Tile textures by default

	this.shadows = new Object()
		this.shadows.receive = false

	this.three = new Object() // Sandbox three.js stuff

	this.setPosition = function(x, y, z) // Doesn't do anything currently
	{
		this.position.x = x
		this.position.y = y
		this.position.z = z

		return this
	}

	this.setSize = function(width, depth)
	{
		this.size.width = width
		this.size.depth = depth

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

		this.disableTile = function()
		{
			this.texture.tile = false

			return this
		}

	this.receiveShadows = function()
	{
		this.shadows.receive = true

		return this
	}

	this.add = function()
	{
		this.build()
	}

		this.build = function() // This is where the magic happens
		{
			this.three.geometry = new THREE.PlaneBufferGeometry(this.size.width, this.size.depth)

			if (this.texture.file) // Apply texture if we've set one
			{
				this.three.texture = new THREE.ImageUtils.loadTexture(this.texture.file)

				if (this.texture.tile) // Tile the texture if we haven't said otherwise
				{
					this.three.texture.wrapS = THREE.RepeatWrapping
					this.three.texture.wrapT = THREE.RepeatWrapping
					this.three.texture.repeat.x = this.size.width
					this.three.texture.repeat.y = this.size.depth
				}

				this.three.material = new THREE.MeshLambertMaterial({map: this.three.texture})
			}
			else if (this.color) // Apply a color if we have one
			{
				console.log('Setting plane color')
				this.three.material = new THREE.MeshLambertMaterial({color: this.color})
			}

			this.three.mesh = new THREE.Mesh(this.three.geometry, this.three.material)

			if (this.shadows.receive)
			{
				console.log('Plane shadow receiving enabled')
				this.three.mesh.receiveShadow = true
			}

			this.apply()

			f.scene.add(this.three.mesh)
		}

			this.apply = function()
			{
				this.three.mesh.position.x = this.position.x
				this.three.mesh.position.y = this.position.y
				this.three.mesh.position.z = this.position.z
			}
}