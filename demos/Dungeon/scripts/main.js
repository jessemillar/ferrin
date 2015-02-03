var rotationSpeed = 0.05

var ferrin = new Ferrin()
	ferrin.setTitle('Dungeon')
		  .setBackgroundColor('#5c94fc')

var player = new Cube()
	player.setPosition(0, 0, 1)
		  .setSize(1, 1, 1)
		  .setTexture('textures/mario.png')
		  .castShadow()
		  .receiveShadow()
		  .add()
		   
var ground = new Plane()
	ground.setPosition(0, 0, 0)
		  .setSize(5, 5)
		  .setTexture('textures/ground.png')
		  .repeatTexture()
		  .add()

var light = new SpotLight()
	light.setPosition(5, -5, 15)
		 .setIntensity(2)
		 .castShadow()
		 .add()

var camera = new Camera()
	camera.setPosition(0, -10, 6)
		  .lookAt(player)

var keyboard = new Keyboard()

function main()
{
	player.spin(rotationSpeed)

	if (keyboard.up)
	{
		player.move('y', rotationSpeed * 2)
	}
	else if (keyboard.down)
	{
		player.move('y', -rotationSpeed * 2)
	}

	if (keyboard.left)
	{
		player.strafe(-rotationSpeed * 2)
	}
	else if (keyboard.right)
	{
		player.strafe(rotationSpeed * 2)
	}

	if (keyboard.w)
	{
		player.move('z', rotationSpeed * 2)
	}
	else if (keyboard.s)
	{
		player.move('z', -rotationSpeed * 2)
	}

	if (keyboard.a)
	{
		player.rotate('y', 1)
	}
	else if (keyboard.d)
	{
		player.rotate('y', -1)
	}

	ferrin.render()
}

main()