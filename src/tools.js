var Tool = function()
{
	this.checkCollision = function(a, b)
	{
		if (!a.deleted)
		{
			if (b.database)
			{
				var i = b.database.length

				while (i--)
				{
					if (!b.database[i].deleted)
					{
						if (a.position.x < b.database[i].x + b.database[i].width && a.position.x + a.width > b.database[i].x && a.position.y < b.database[i].y + b.database[i].height && a.position.y + a.height > b.database[i].y)
						{
							return b.database[i]
						}
					}
				}

				return false
			}
			else
			{
				if (a.position.x < b.position.x + b.width && a.position.x + a.width > b.position.x && a.position.y < b.position.y + b.bound.height && a.position.y + a.height > b.position.y)
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