var Plane = function()
{
	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
	}

	this.setSize = function(width, depth)
	{
		this.width = width
		this.depth = depth

		return this
	}

	this.setColor = function(color)
	{
		this.color = color

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
		this.geometry = new THREE.PlaneGeometry(this.width, this.depth)
		this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.DoubleSide})
		this.plane = new THREE.Mesh(this.geometry, this.material)
		
		this.plane.castShadow = this.castingShadow
		this.plane.receiveShadow = this.receivingShadow

		f.scene.add(this.plane)

		return this
	}

	this.spin = function(speed)
	{
		this.plane.rotation.z += speed

		return this
	}
}