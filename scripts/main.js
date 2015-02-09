var rotationSpeed = 0.05
var movementSpeed = rotationSpeed

var healthOffset = 40

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
	player.setSize(5, 5, 5)
		  .setPosition(0, 0, player.size.height / 2)
		  .setMesh('cube')
		  .setTexture('textures/mario.png')
		  // .setColor(0x0aeedf)
		  .castShadows()
		  .receiveShadows()
		  .enableOutline(0x00ff00)
		  .enableMarker('textures/marker.png', 2, 2)
		  .add()

var playerHealth = new HUD()
	playerHealth.setSize(200, 25)
			    .setImage('images/health_bar.png')
			    .add()

var enemy = new Entity()
	enemy.setSize(1.5, 1.5, 1.5)
		 .setPosition(tool.random(-5, 5), tool.random(-5, 5), enemy.size.height / 2)
		 .setMesh('cube')
		 .setTexture('textures/ground.png')
		 // .setColor(0x0aeedf)
		 .castShadows()
		 .receiveShadows()
		 .enableOutline(0xff0000)
		 .add()

var enemies = new Group()
	enemies.add(enemy)

var enemyHealth = new HUD()
	enemyHealth.setSize(200, 25)
			   .setImage('images/health_bar.png')
			   .add()

var ground = new Plane()
	ground.setPosition(0, 0, -0.1)
		  .setSize(20, 20)
		  // .setTexture('textures/ground.png')
		  .setColor(0x0000ff)
		  .receiveShadows()
		  .add()

var cameraOffsetX = 0
var cameraOffsetY = -10
var cameraOffsetZ = 20

var camera = new Camera()
	camera.setPosition(cameraOffsetX, cameraOffsetY, cameraOffsetZ)
		  .lookAt(player)
		  .add()

function main() // This function has to be named "main" for now
{
	playerHealth.healthBar(player, healthOffset)
	enemyHealth.healthBar(enemy, healthOffset)

	// if (tool.checkCollision(player, enemy))
	// {
	// 	player.setOutlineColor(0xff0000)
	// }
	// else
	// {
	// 	player.setOutlineColor(0x00ff00)
	// }

	if (keyboard.w || keyboard.a || keyboard.s || keyboard.d) // If we're using valid controls
	{
		// if (!tool.checkSolid(player, enemy))
		// {
			if (keyboard.w)
			{
				player.move('y', movementSpeed, enemy)
			}
			else if (keyboard.s)
			{
				player.move('y', -movementSpeed, enemy)
			}

			if (keyboard.a)
			{
				player.move('x', -movementSpeed, enemy)
			}
			else if (keyboard.d)
			{
				player.move('x', movementSpeed, enemy)
			}

			player.autoFace() // Run after updating the position with movement
			player.update()
		// }
	}

	camera.follow(player, cameraOffsetX, cameraOffsetY, cameraOffsetZ)

	ferrin.render() // Must be at the bottom of the main function
}

main() // Start the rendering loop