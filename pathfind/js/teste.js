var easyStar = new EasyStar.js();
	var map = [[1,1,1,1],
			   [1,0,1,1],
			   [1,1,1,1],
			   [1,0,1,1]];

	easyStar.setGrid(map);

	easyStar.avoidAdditionalPoint(0,1);

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(0,0,0,3,onPathFound);

	easyStar.findPath(0,0,0,3,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
        easyStar.stopAvoidingAdditionalPoint(0,1);
		console.log(path);
	}