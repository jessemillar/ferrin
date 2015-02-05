var rotationSpeed = 0.05
var movementSpeed = rotationSpeed

var keyboard = new Keyboard()
var tool = new Tool()

var ferrin = new Ferrin()
	ferrin.setTitle('Dungeon')
		  .setBackgroundColor('#5c94fc')

// var ambience = new Light()
// 	ambience.setType('ambient')
// 			.add()

var spotlight = new Light()
	spotlight.setPosition(20, 20, 20)
			 .setType('spotlight')
			 .setIntensity(3)
		 	 .castShadows()
		 	 .add()

var player = new Entity()
	player.setPosition(0, 0, 0.5)
		  .setMesh('cube')
		  .setSize(1, 1, 1)
		  .setTexture('textures/mario.png')
		  // .setColor(0x0aeedf)
		  .castShadows()
		  .receiveShadows()
		  .enableOutline(0x00ff00)
		  .add()

var enemy = new Entity()
	enemy.setPosition(tool.random(-5, 5), tool.random(-5, 5), 0.75)
		 .setMesh('cube')
		 .setSize(1.5, 1.5, 1.5)
		 .setTexture('textures/ground.png')
		 // .setColor(0x0aeedf)
		 .castShadows()
		 .receiveShadows()
		 .enableOutline(0xff0000)
		 .add()

var enemies = new Group()
	enemies.add(enemy)

var ground = new Plane()
	ground.setPosition(0, 0, -0.1)
		  .setSize(20, 20)
		  // .setTexture('textures/ground.png')
		  .setColor(0x0000ff)
		  .receiveShadows()
		  .add()

var cameraOffsetX = 0
var cameraOffsetY = -8
var cameraOffsetZ = 12

var camera = new Camera()
	camera.setPosition(cameraOffsetX, cameraOffsetY, cameraOffsetZ)
		  .lookAt(player)
		  .add()

function main() // This function has to be named "main" for now
{
	console.log(tool.measureDistance(player, enemy))

	if (tool.checkCollision(player, enemy))
	{
		player.setOutlineColor(0xff0000)
	}
	else
	{
		player.setOutlineColor(0x00ff00)
	}

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