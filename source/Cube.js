var Cube = function()
{
	this.setSize = function(width, height, depth)
	{
		this.geometry = new THREE.BoxGeometry(width, height, depth)

		return this
	}

	this.setColor = function(color)
	{
		this.material = new THREE.MeshLambertMaterial({color: color})

		return this
	}

	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
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