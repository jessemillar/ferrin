var Tool = function()
{
	this.random = function(min, max)
	{
		return Math.random() * (max - min) + min
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
				var xA = a.position.x - a.size.width / 2
				var yA = a.position.y - a.size.depth / 2
				var widthA = a.size.width
				var depthA = a.size.depth

				var xB = b.position.x - b.size.width / 2
				var yB = b.position.y - b.size.depth / 2
				var widthB = b.size.width
				var depthB = b.size.depth

				if (xA < xB + widthB && xA + widthA > xB && yA < yB + depthB && yA + depthA > yB)				{
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