var Cube = function()
{
	this.color = '#ffffff' // Default color to not mess with textures

	this.setSize = function(width, height, depth)
	{
		this.geometry = new THREE.BoxGeometry(width, height, depth)

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

	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
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
			this.mesh.position.x = this.x
			this.mesh.position.y = this.y
			this.mesh.position.z = this.z
		}

	this.castShadow = function()
	{
		this.castingShadow = true

		return this
	}

	this.receiveShadow = function()
	{
		this.receivingShadow = true

		return this
	}

	this.add = function()
	{
		this.makeMesh()

		this.mesh.castShadow = this.castingShadow
		this.mesh.receiveShadow = this.receivingShadow
		
		f.scene.add(this.mesh)

		return this
	}

		this.makeMesh = function()
		{
			this.material = new THREE.MeshLambertMaterial({color: this.color, map: this.texture})
			this.mesh = new THREE.Mesh(this.geometry, this.material)
			this.mesh.position.x = this.x
			this.mesh.position.y = this.y
			this.mesh.position.z = this.z

			return this
		}

	this.spin = function(speed)
	{
		this.mesh.rotation.x += speed
		this.mesh.rotation.y += speed

		return this
	}
}