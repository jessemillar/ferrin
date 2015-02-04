var Plane = function()
{
	this.position = new Object()
	this.size = new Object()

	this.texture = new Object()
	this.texture.tile = true // Tile textures by default

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

	this.add = function()
	{
		this.build()

		f.scene.add(this.plane)
	}

		this.build = function() // This is where the magic happens
		{

			this.geometry = new THREE.PlaneBufferGeometry(this.size.width, this.size.depth)

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

				this.material = new THREE.MeshBasicMaterial({map: this.three.texture, side: THREE.DoubleSide})
			}
			else if (this.color) // Apply a color if we have one
			{
				this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.DoubleSide})
			}

			this.plane = new THREE.Mesh(this.geometry, this.material)
		}
}