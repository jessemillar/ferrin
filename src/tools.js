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
}