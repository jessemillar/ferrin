var Entity = function()
{
	this.setPosition = function(x, y, z)
	{
		this.x = x
		this.y = y
		this.z = z

		return this
	}

	this.castShadow = function()
	{
		this.castingShadow = true

		return this
	}

	this.receiveShadow = function()
	{
		this.receivingShadow = true

		return this
	}

	this.load = function(model)
	{
		var loader = new THREE.JSONLoader();
			loader.load(model, function (geometry, materials)
			{
				/*
				var material = materials[0]
				material.morphTargets = true;
				material.color.setHex( 0xffaaaa );
				material.ambient.setHex( 0x222222 );
				*/

				this.material = new THREE.MeshFaceMaterial(materials)

				this.model = new THREE.Mesh(geometry, this.material)

				f.scene.add(this.model)
			})

		/*
		var loader = new THREE.JSONLoader()
			loader.load(model, function(geometry, materials)
			{
				this.material = new THREE.MeshFaceMaterial(materials)
				this.model = new THREE.Mesh(geometry, this.material)

				this.model.position.x = this.x
				this.model.position.y = this.y
				this.model.position.z = this.z

				this.model.castShadow = this.castingShadow
				this.model.receiveShadow = this.receivingShadow

				f.scene.add(this.model)
			})
		*/

		return this
	}

	this.spin = function(speed)
	{
		this.mesh.rotation.x += speed
		this.mesh.rotation.y += speed

		return this
	}
}