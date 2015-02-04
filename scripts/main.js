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

var camera = new Camera()
	camera.setPosition(0, -8, 12)
		  .lookAt(player)
		  .add()

var keyboard = new Keyboard()

function main() // This function has to be named "main" for now
{
	// camera.track(player)

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

	ferrin.render() // Must be at the bottom of the main function
}

main() // Start the rendering loop