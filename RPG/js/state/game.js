/**
 * Created by knash on 15-03-12.
 */

RPG.State.Game = function(game) {};
RPG.State.Game.prototype = {
    create: function() {
        // Load the current over world map
        this.home_village_f0 = new RPG.Map.Module(this.game, 'home_village_f0');
        // Load the modules that will be used in the map.
        this.modules = {};
        this.modules['house0_f0'] = new RPG.Map.Module(this.game, 'house0_f0');

        // We manually add the over world ground for now...
        this.ground = this.home_village_f0.createLayer('ground');

        // Resize the game world to match the layer dimensions
        this.ground.resizeWorld();

        // Place the subMaps
        this.subMaps = {};
        var subMapLocations = this.home_village_f0.findObjectsByType('sub_map');
        var location, tileX, tileY;
        for (var i = 0; i < subMapLocations.length; i++) {
            location = subMapLocations[i];
            tileX = location.x / 32;
            tileY = location.y / 32;
            this.subMaps[location.name] = new RPG.Map.SubMap(
                this.modules[location.properties.sub_map], tileX, tileY);
        }
        this.subMaps['home0'].setIndoorAlpha(0);

        // Place some objects
        this.doorGroup = this.game.add.group();
        var tiledDoors = this.home_village_f0.findObjectsByType('door');
        this.doors = {};
        var doorSprite = this.home_village_f0.spriteFromObject(tiledDoors[0], this.doorGroup);
        RPG.Map.Object.Door.init(this.game);
        this.doors[doorSprite.properties.id] = new RPG.Map.Object.Door(this.game, doorSprite);

        // Collision map!
        this.isOutdoors = true;
        this.indoor_walls = this.game.add.group();
        this.outdoor_walls = this.game.add.group();
        var home0 = this.subMaps['home0'];
        this.inCollisionObjects = this.modules['house0_f0'].getCollisionSprites(
            'collision_indoors', this.indoor_walls, home0.tileX, home0.tileY);
        this.outCollisionObjects = this.modules['house0_f0'].getCollisionSprites(
            'collision_outdoors', this.outdoor_walls, home0.tileX, home0.tileY);

        // Make our player
        var spawn = this.home_village_f0.findObjectsByType('player_spawn');
        this.player = this.game.add.sprite(spawn[0].x + 4, spawn[0].y - 16, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.setSize(20, 20, 0, 20);
        this.game.camera.follow(this.player);

        // Input
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    // This is called by the physics overlap function during the update
    doorHandler: function(player, doorSprite) {
        var door = this.doors[doorSprite.properties.id];

        // This will update the doors "delta", telling us how far over the player is.
        door.overlapTrigger(player);

        var alpha = door.delta;
        this.subMaps[doorSprite.properties.parent].setIndoorAlpha(alpha);
        this.subMaps[doorSprite.properties.parent].setOutdoorAlpha(1 - alpha);
        this.isOutdoors = !door.isOpen();
    },

    update: function() {
        // Collision

        // Check if we're overlapping the door.
        this.game.physics.arcade.overlap(this.player, this.doorGroup, this.doorHandler, null, this);
        if (this.isOutdoors) {
            this.game.physics.arcade.collide(this.player, this.outdoor_walls);
        } else {
            this.game.physics.arcade.collide(this.player, this.indoor_walls);
        }

        // Player movement
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= 200;
        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += 200;
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 200;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 200;
        }
    }
};
