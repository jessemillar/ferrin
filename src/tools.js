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
		if (!a.deleted)
		{
			if (b.database)
			{
				// var i = b.database.length

				// while (i--)
				// {
				// 	if (!b.database[i].deleted)
				// 	{
				// 		if (a.position.x - a.size.width / 2 < b.database[i].x + b.database[i].width && a.position.x - a.size.width / 2 + a.size.width > b.database[i].x && a.position.y - a.size.depth / 2 < b.database[i].y + b.database[i].height && a.position.y - a.size.depth / 2 + a.size.depth > b.database[i].y)
				// 		{
				// 			return b.database[i]
				// 		}
				// 	}
				// }

				// return false
			}
			else
			{
				var aX = a.position.x - a.size.width / 2
				var aY = a.position.y - a.size.depth / 2
				var aWidth = a.size.width
				var aDepth = a.size.depth

				var bX = b.position.x - b.size.width / 2
				var bY = b.position.y - b.size.depth / 2
				var bWidth = b.size.width
				var bDepth = b.size.depth

				if (aX < bX + bWidth && aX + aWidth > bX && aY < bY + bDepth && aY + aDepth > bY)
				{
					return b
				}
				else
				{
					return false
				}
			}
		}
		else
		{
			return false
		}
	}

	this.checkSolid = function(a, b)
	{
		var c = this.checkCollision(a, b)

		if (c)
		{
			// Take previous position of first object
			var aX = a.position.x
			var aY = a.position.y
			var aWidth = a.size.width
			var aDepth = a.size.depth

			// Take current position of second object/group
			var cX = c.position.x
			var cY = c.position.y
		
			if (aY + a.size.depth <= cY) // "Top" side
			{
				console.log('Top')
				// a.position.y = cY + a.size.depth
			}
			else if (aY >= cY + c.size.depth) // "Bottom" side
			{
				console.log('Bottom')
				// a.position.y = cY + c.size.depth
			}
			else if (aX + a.size.width < cX) // Left side
			{
				console.log('Left')
				// a.position.x = cX - a.size.width
			}
			else if (aX > cX && aY > cY - c.size.depth / 2 && aY < cY + c.size.depth / 2) // Right side
			{
				console.log('Right')
				a.position.x = cX + c.size.width
			}

			return true
		}

		return false
	}
}