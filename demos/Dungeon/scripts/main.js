var rotationSpeed = 0.05
var movementSpeed = rotationSpeed

var ferrin = new Ferrin()
	ferrin.setTitle('Dungeon')
		  .setBackgroundColor('#5c94fc')
		  .enableShadows()

var player = new Entity()
	player.setPosition(0, 0, 2)
		  .setMesh('cube')
		  .setSize(1, 1, 1)
		  .setTexture('textures/mario.png')
		  .add()
		   
var ground = new Plane()
	ground.setPosition(0, 0, 0)
		  .setSize(5, 5)
		  .setTexture('textures/ground.png')
		  .repeatTexture()
		  .receiveShadow()
		  .add()

var light = new SpotLight()
	light.setPosition(5, -5, 15)
		 .setIntensity(2)
		 .add()

var camera = new Camera()
	camera.setPosition(0, -8, 12)
		  .lookAt(player)

var keyboard = new Keyboard()

function main() // This function has to be named "main" for now
{
	if (keyboard.w)
	{
		player.move('y', movementSpeed)
	}
	else if (keyboard.s)
	{
		player.move('y', -movementSpeed)
	}

	if (keyboard.a)
	{
		player.move('x', -movementSpeed)
	}
	else if (keyboard.d)
	{
		player.move('x', movementSpeed)
	}

	ferrin.render()
}

main() // Start the rendering loop