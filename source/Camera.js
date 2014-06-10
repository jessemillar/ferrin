var Camera = function()
{
	var mod = 90 * Math.PI / 180

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

	/*
	this.revolve = function(speed, focus)
	{
		f.camera.position.x = 
		f.camera.position.y
		this.lookAtObject(focus)

		return this
	}
	*/

	this.lookAt = function(x, y, z)
	{
		f.camera.lookAt({x: x, y: y, z: z})

		return this
	}

		this.lookAtObject = function(object)
		{
			this.lookAt(object.x, object.y, object.z)

			return this
		}

	this.rotateTo = function(axis, angle)
	{
		if (axis == 'x')
		{
			f.camera.rotation.x = angle * Math.PI / 180 + mod
		}
		else if (axis == 'y')
		{
			f.camera.rotation.y = angle * Math.PI / 180
		}
		else if (axis == 'z')
		{
			f.camera.rotation.z = angle * Math.PI / 180
		}

		return this
	}

	this.rotate = function(axis, speed)
	{
		if (axis == 'x')
		{
			f.camera.rotation.x += speed * Math.PI / 180 + mod
		}
		else if (axis == 'y')
		{
			f.camera.rotation.y += speed * Math.PI / 180
		}
		else if (axis == 'z')
		{
			f.camera.rotation.z += speed * Math.PI / 180
		}

		return this
	}

	this.move = function(direction, speed)
	{
		if (direction == 'x')
		{
			f.camera.position.x += speed
		}
		else if (direction == 'y')
		{
			f.camera.position.y += speed
		}
		else if (direction == 'z')
		{
			f.camera.position.z += speed
		}

		return this
	}

	this.strafe = function(speed)
	{
		// this.move('x', )

		return this
	}
}