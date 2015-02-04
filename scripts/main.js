var rotationSpeed = 0.05
var movementSpeed = rotationSpeed

var ferrin = new Ferrin()
	ferrin.setTitle('Dungeon')
		  .setBackgroundColor('#5c94fc')

var player = new Entity()
	player.setPosition(0, 0, 0.5)
		  .setMesh('cube')
		  .setSize(1, 1, 1)
		  .setTexture('textures/mario.png')
		  .add()
		   
var ground = new Plane()
	ground.setPosition(0, 0, 0)
		  .setSize(10, 10)
		  .setTexture('textures/ground.png')
		  .add()

var light = new SpotLight()
	light.setPosition(5, -5, 15)
		 .setIntensity(2)
		 .add()

var cameraOffsetX = 0
var cameraOffsetY = -8
var cameraOffsetZ = 12

var camera = new Camera()
	camera.setPosition(cameraOffsetX, cameraOffsetY, cameraOffsetZ)
		  .lookAt(player)
		  .add()

var keyboard = new Keyboard()

function main() // This function has to be named "main" for now
{
	if (keyboard.w || keyboard.a || keyboard.s || keyboard.d)
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

		player.autoFace() // Run after updating the position with movement
		player.update()
	}

	camera.follow(player, cameraOffsetX, cameraOffsetY, cameraOffsetZ)

	ferrin.render() // Must be at the bottom of the main function
}

main() // Start the rendering loop