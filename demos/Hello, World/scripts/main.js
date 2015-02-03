var rotationSpeed = 0.05

var game = new Ferrin()
	game.setTitle('Hello, World')
		.setColor('#5c94fc')
		.enableShadows()

var cube1 = new Cube()
	cube1.setPosition(0, 0, 1)
		 .setSize(1, 1, 1)
		 .setTexture('textures/mario.png')
		 .castShadow()
		 .receiveShadow()
		 .add()

var cube2 = new Cube()
	cube2.setPosition(0, 0, 3)
		 .setSize(1, 1, 1)
		 .setTexture('textures/mario.png')
		 .castShadow()
		 .receiveShadow()
		 .add()

var cube3 = new Cube()
	cube3.setPosition(0, 0, 5)
		 .setSize(1, 1, 1)
		 .setTexture('textures/mario.png')
		 .castShadow()
		 .receiveShadow()
		 .add()
		   
var plane1 = new Plane()
	plane1.setPosition(0, 0, 0)
		  .setSize(5, 5)
		  .setTexture('textures/ground.png')
		  .repeatTexture()
		  .receiveShadow()
		  .add()

// var logo = new Entity()
// 	logo.setPosition(3, 0, 2)
// 		.load('models/logo.js')

var light1 = new SpotLight()
	light1.setPosition(5, -5, 15)
		  .setIntensity(2)
		  .castShadow()
		  .add()

var camera = new Camera()
	camera.setPosition(0, -10, 6)
		  .lookAtObject(cube2)

var keyboard = new Keyboard()

var render = function()
{
	cube1.spin(rotationSpeed)
	cube2.spin(-rotationSpeed)
	cube3.spin(rotationSpeed)
	// logo.spin(rotationSpeed)

	// camera.lookAtObject(cube2)

	if (keyboard.up)
	{
		camera.move('y', rotationSpeed * 2)
	}
	else if (keyboard.down)
	{
		camera.move('y', -rotationSpeed * 2)
	}

	if (keyboard.left)
	{
		camera.strafe(-rotationSpeed * 2)
	}
	else if (keyboard.right)
	{
		camera.strafe(rotationSpeed * 2)
	}

	if (keyboard.w)
	{
		camera.move('z', rotationSpeed * 2)
	}
	else if (keyboard.s)
	{
		camera.move('z', -rotationSpeed * 2)
	}

	if (keyboard.a)
	{
		camera.rotate('y', 1)
	}
	else if (keyboard.d)
	{
		camera.rotate('y', -1)
	}

	game.render()
}

render()