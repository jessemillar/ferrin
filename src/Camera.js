var Camera = function()
{
	var mod = 90 * Math.PI / 180 // What is this...?

	f.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
	f.camera.up = new THREE.Vector3(0, 0, 1)
	f.camera.rotation.x = mod

	this.setPosition = function(x, y, z)
	{
		f.camera.position.x = x
		f.camera.position.y = y
		f.camera.position.z = z

		return this
	}

	this.add = function()
	{
		f.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)

		return this
	}

	this.lookAtCoordinates = function(x, y, z)
	{
		f.camera.lookAt({x: x, y: y, z: z})

		return this
	}

		this.lookAt = function(object) // This one will be used more often than lookAtCoordinates()
		{
			this.lookAtCoordinates(object.x, object.y, object.z)

			return this
		}

	this.move = function(axis, speed)
	{
		if (axis == 'x')
		{
			f.camera.position.x += speed
		}
		else if (axis == 'y')
		{
			f.camera.position.y += speed
		}
		else if (axis == 'z')
		{
			f.camera.position.z += speed
		}

		return this
	}
}