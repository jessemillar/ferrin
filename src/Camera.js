var Camera = function()
{
	this.position = new Object()
	this.lookAt = new Object()

	this.setPosition = function(x, y, z)
	{
		this.position.x = x
		this.position.y = y
		this.position.z = z

		return this
	}

	this.add = function()
	{
		this.build()
	}

		this.build = function() // This is where the magic happens
		{
			f.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

			f.camera.up = new THREE.Vector3(0, 0, 1)
			f.camera.rotation.x = 90 * Math.PI / 180 // What is this...?

			this.apply()

			f.camera.lookAt({x: this.lookAt.x, y: this.lookAt.y, z: this.lookAt.z})
		}

			this.apply = function()
			{
				f.camera.position.x = this.position.x
				f.camera.position.y = this.position.y
				f.camera.position.z = this.position.z
			}

	this.lookAt = function(object) // This one will be used more often than lookAtCoordinates()
	{
		this.lookAt.x = object.position.x
		this.lookAt.y = object.position.y
		this.lookAt.z = object.position.z

		return this
	}

	this.move = function(direction, speed)
	{
		if (direction == 'x')
		{
			this.position.x += speed
		}
		else if (direction == 'y')
		{
			this.position.y += speed
		}
		else if (direction == 'z')
		{
			this.position.z += speed
		}

		this.apply()

		return this
	}
}