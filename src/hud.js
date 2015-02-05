var HUD = function()
{
	this.dom = document.createElement("div")
		this.dom.style.position = 'absolute'

	this.setPosition = function(x, y)
	{
		this.dom.style.left = x
		this.dom.style.top = y

		return this
	}

	this.setSize = function(width, height)
	{
		this.dom.style.width = width
		this.dom.style.height = height

		return this
	}

	this.setImage = function(image)
	{
		this.dom.style.backgroundImage = 'url(' + image + ')'

		return this
	}

	this.add = function()
	{
		this.build()
	}

		this.build = function()
		{
			this.dom.style.zIndex = 999

			document.body.appendChild(this.dom)
		}

	this.snapTo = function(x, y)
	{
		this.setPosition(x, y)

		return this
	}

		this.healthBar = function(object, yOffset)
		{
			var tool = new Tool()

			this.snapTo(tool.getXY(object).x - this.getWidth() / 2, tool.getXY(object).y + yOffset)

			return this
		}

	this.getWidth = function()
	{
		return parseInt(this.dom.style.width)
	}

	this.getHeight = function()
	{
		return parseInt(this.dom.style.height)
	}
}