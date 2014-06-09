var Model = function()
{
	this.load = function(model)
	{
		var loader = new THREE.JSONLoader()
			loader.load(model, this.loaded)

		return this
	}

		this.loaded = function()
		{
			this.material = new THREE.MeshFaceMaterial(materials)
			penguin = new THREE.Mesh(geometry, material)
				penguin.scale.set(1, 1, 1)
			scene.add(penguin)

			return this
		}
}