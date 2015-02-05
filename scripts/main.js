var rotationSpeed = 0.05
var movementSpeed = rotationSpeed

var ferrin = new Ferrin()
	ferrin.setTitle('Dungeon')
		  .setBackgroundColor('#5c94fc')

var player = new Entity()
	player.setPosition(0, 0, 0.6)
		  .setMesh('cube')
		  .setSize(1, 1, 1)
		  .setTexture('textures/mario.png')
		  .castShadows()
		  .receiveShadows()
		  .enableOutline()
		  .add()
		   
// var ground = new Plane()
// 	ground.setSize(10, 10)
// 		  // .setTexture('textures/ground.png')
// 		  .setColor('#6C6C6C')
// 		  .receiveShadows()
// 		  .add()

f.scene.add(new THREE.AmbientLight(0x666666));

var groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x6C6C6C
    });
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), groundMaterial);
    // plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;

    f.scene.add(plane);

var light = new SpotLight()
	light.setPosition(5, 5, 5)
		 .setIntensity(2)
		 .castShadows()
		 .add()

var cameraOffsetX = 0
var cameraOffsetY = -8
var cameraOffsetZ = 12

var camera = new Camera()
	camera.setPosition(cameraOffsetX, cameraOffsetY, cameraOffsetZ)
		  .lookAt(player)
		  .add()

f.camera.updateProjectionMatrix()

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