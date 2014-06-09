var rotationSpeed = 0.05

var game = new Ferrin()
	game.setColor('#ffffff')
		.enableShadows()

var cube1 = new Cube()
	cube1.setPosition(0, 0, 1)
		 .setSize(1, 1, 1)
		 .setColor('#FF4136')
		 .castShadow()
		 .receiveShadow()
		 .add()

var cube2 = new Cube()
	cube2.setPosition(0, 0, 3)
		 .setSize(1, 1, 1)
		 .setColor('#FFDC00')
		 .castShadow()
		 .receiveShadow()
		 .add()

var cube3 = new Cube()
	cube3.setPosition(0, 0, 5)
		 .setSize(1, 1, 1)
		 .setColor('#2ECC40')
		 .castShadow()
		 .receiveShadow()
		 .add()

var plane1 = new Plane()
	plane1.setPosition(0, 0, 0)
		  .setSize(10, 10)
		  .setColor('#ff0000')
		  .receiveShadow()
		  .add()

var light = new SpotLight()
	light.setPosition(5, -5, 15)
		 .setIntensity(1.5)
		 .castShadow()
		 .add()

var camera = new Camera()
	camera.setPosition(0, -10, 10)
		  .lookAtObject(cube1)

var render = function()
{
	cube1.spin(rotationSpeed)
	cube2.spin(-rotationSpeed)
	cube3.spin(rotationSpeed)

	plane1.spin(rotationSpeed / 4)

	game.render()
}

render()