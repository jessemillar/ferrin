var Tool = function()
{
	this.random = function(min, max)
	{
		return Math.random() * (max - min) + min
	}

	this.measureX = function(a, b)
	{
		var aX = a.position.x - a.size.width / 2
		var bX = b.position.x - b.size.width / 2

		return Math.abs(aX - bX)
	}

	this.measureY = function(a, b)
	{
		var aY = a.position.y - a.size.depth / 2
		var bY = b.position.y - b.size.depth / 2

		return Math.abs(aY - bY)
	}

		this.measureDistance = function(a, b)
		{
			var x = this.measureX(a, b)
			var y = this.measureY(a, b)

			return Math.sqrt(x * x + y * y)
		}

	this.getXY = function(object)
	{
		var width = window.innerWidth
		var height = window.innerHeight

		var widthHalf = width / 2
		var heightHalf = height / 2

		var vector = new THREE.Vector3()
		var projector = new THREE.Projector()

		var theVector = vector.setFromMatrixPosition(object.three.mesh.matrixWorld)

		theVector.project(f.camera)

		vector.x = (vector.x * widthHalf) + widthHalf
		vector.y = - (vector.y * heightHalf) + heightHalf

		return vector
	}

	this.checkCollision = function(a, b)
	{
		if (b.database)
		{
			for (var i = 0; i < b.database.length; i++)
			{
				this.checkCollision(b.database[i])
			}
		}
		else
		{
			var aX = a.position.x
			var aY = a.position.y
				aXPrevious = a.previous.position.x
				aYPrevious = a.previous.position.y
			var aWidth = a.size.width / 2
			var aDepth = a.size.depth / 2

			var bX = b.position.x
			var bY = b.position.y
			var bWidth = b.size.width / 2
			var bDepth = b.size.depth / 2

			if (aY + aDepth > bY - bDepth && aY - aDepth < bY + bDepth && aX - aWidth < bX + bWidth && aX + aWidth > bX - bWidth) // If inside box (check top, bottom, left, then right)
			{
				return true
			}
			else
			{
				return false
			}
		}
	}
}