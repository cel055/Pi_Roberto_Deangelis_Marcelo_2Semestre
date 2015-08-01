//TODO: Modify sprite to look more 3d instead of flat
//TODO: MouseFollow : find a way to do it lightweight if possible
//TODO: Animation depending of the direction of the char (create array for both direction forward & backward)

//Aqui é setado as frames de cada direção.
var uLDir = [8, 7, 6, 5, 4, 3, 2, 1, 0];
var uDir =  [17, 16, 15, 14, 13, 12, 11, 10, 9];
var uRDir = [26, 25, 24, 23, 22, 21, 20, 19, 18];
var rDir =  [35, 34, 33, 32, 31, 30, 29, 28, 27];
var lDir =  [44, 43, 42, 41, 40, 39, 38, 37, 36];
var dLDir = [53, 52, 51, 50, 49, 48, 47, 46 ,45];
var dDir =  [62, 61, 60, 59, 58, 57, 56, 55, 54];
var dRDir = [71, 70, 69, 68, 67, 66, 65, 64, 63];
//Aqui é um array, em que cada posição é um ponto cardeal.
//'n' up, 'w' left, 'e' right, 's' down, 'NW' up left, 'NE' up right, 'SW' down left, 'SE' down rigth.
var dir = ["W", "N", "E", "S", "NW", "NE", "SW", "SE"];
//Aqui o objeto player pera o parametro game(objeto com todas as propriedades do jogo), e seta novas propriedades.
Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.group = null;
	this.cursors = null;
	this.key_w = null;
	this.key_a = null;
	this.key_s = null;
	this.key_d = null;
	this.directions = ["W", "N", "E", "S", "NW", "NE", "SW", "SE"];
};
//Aqui prototype serve para adicionar a player novos metodos.
Player.prototype = { 
	preload: function() {
		//Aqui seta o caminho da sprite char.png e diz seu tamanho '55.5, 64.8'.
        this.game.load.spritesheet('char', 'assets/char.png', 55.5, 64.8);
        this.game.load.image('bullet', 'assets/purple_ball.png');
	}
	//Aqui é uma virgula que não se pode retirala.
	,
	create: function() {
		this.group = this.game.add.group();
		game.physics.enable(player, Phaser.Physics.ARCADE);
        
        this.fireRate = 50;
        this.nextFire = 0;
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(50, 'bullet');
		
		this.sprite = this.group.create(400, 300, 'char');
		this.sprite.anchor.setTo(0.5, 0.5);	
		//Aqui é setado as teclas 'a, s, d, w'.
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.key_w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.key_a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.key_s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.key_d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		//Aqui é setado as animações para player, 'lDir' é uma variavel que contém os numeros de cada frame.
		this.sprite.animations.add('left', lDir, 10, true);
		this.sprite.animations.add('right', rDir, 10, true);
		this.sprite.animations.add('up', uDir, 10, true);
		this.sprite.animations.add('down', dDir, 10, true);
		this.sprite.animations.add('upLeft', uLDir, 10, true);
		this.sprite.animations.add('upRight', uRDir, 10 , true);
		this.sprite.animations.add('downLeft', dLDir, 10, true);
		this.sprite.animations.add('downRight', dRDir, 10, true);
		//Aqui é setado as animações de 'costas' , aqui dizemos a variavel 'lDir' reverter seus numero consequentemente as frames da sprite.
		this.sprite.animations.add('rev_left', lDir.reverse(), 10, true);
		this.sprite.animations.add('rev_right', rDir.reverse(), 10, true);
		this.sprite.animations.add('rev_up', uDir.reverse(), 10, true)
		this.sprite.animations.add('rev_down', dDir.reverse(), 10, true);
		this.sprite.animations.add('rev_upLeft', uLDir.reverse(), 10, true);
		this.sprite.animations.add('rev_upRight', uRDir.reverse(), 10 , true);
		this.sprite.animations.add('rev_downLeft', dLDir.reverse(), 10, true);
		this.sprite.animations.add('rev_downRight', dRDir.reverse(), 10, true);
	}
	//Outra virgula que não se pode retirar
	,
	update: function() {
		//Aqui o update vereficará constantemente esse if, else.
		if (this.key_w.isUp && this.key_a.isUp && this.key_s.isUp && this.key_d.isUp) {
			//Aqui é a função de movimentação da direção da sprite quando a sprite estiver parada.
			this.mouseFollow();	
		} else {
			//aqui é a função de movimentação da sprite com o teclado e o mouse.
			this.charMovement();
		}
	
	},
	charMovement: function(d) {
		//Aqui o parametro, variavel 'd' é a base de tudo.
		//TODO Separate leg to upperbody for mouvement
		//Aqui 'd' é uma variavel que diz a direção do mouse. Olhar a função 'mouseDirection' linha 142.
		var d = this.mouseDirection();
		var s = this.sprite;
		var speed = 1;
		//Se a tecla w for precionada a sprite instanciada na variavel 's' diminuiará o y com a velocidade 1 setado na variavel 'speed';
		//e haverá uma verificação de onde o mouse se encontra. O mesmo se repete com as outras teclas!
		if (this.key_w.isDown) {
			s.y -= speed;
			if (d == dir[1]) { // N Up
				s.animations.play('up');
			}else if(d == dir[3]) { // S Down
				s.animations.play('rev_down');
			}else if(d == dir[0]) { // W Left
				s.animations.play('left');
			}else if(d == dir[2]) { // E Right
				s.animations.play('right');
			}else if (d == dir[4]){ // NW Up Left
				s.animations.play('upLeft');
			}else if(d == dir[5]){ // NE Up Right
				s.animations.play('upRight');
			}else if(d == dir[6]){ // SW Down Left
				s.animations.play('rev_downLeft');
			}else if(d == dir[7]){ // SE Down Right
				s.animations.play('rev_downRight');
			}
			
		} else if (this.key_s.isDown) {
			s.y += speed;
			if (d == dir[1]) { // N
				this.sprite.animations.play('rev_up');
			} else if (d == dir[3]) { // S
				this.sprite.animations.play('down');
			} else if (d == dir[0]) { // W
				s.animations.play('left');
			} else if (d == dir[2]) { // E
				s.animations.play('right');
			}else if (d == dir[4]){ // NW Up Left
				s.animations.play('rev_upLeft');
			}else if(d == dir[5]){ // NE Up Right
				s.animations.play('rev_upRight');
			}else if(d == dir[6]){ // SW Down Left
				s.animations.play('downLeft');
			}else if(d == dir[7]){ // SE Down Right
				s.animations.play('downRight');
			}

		}

		if (this.key_a.isDown) {
			s.x -= speed;
			if (d == dir[0]) { // W
				s.animations.play('left');
			} else if (d == dir[2]) { // E
				s.animations.play('rev_right');
			} else if (d == dir[1]) { // N
				s.animations.play('up');
			} else if (d == dir[3]) { // S
				s.animations.play('down');
			}else if (d == dir[4]){ // NW Up Left
				s.animations.play('upLeft');
			}else if(d == dir[5]){ // NE Up Right
				s.animations.play('rev_upRight');
			}else if(d == dir[6]){ // SW Down Left
				s.animations.play('downLeft');
			}else if(d == dir[7]){ // SE Down Right
				s.animations.play('rev_downRight');
			}

		} else if (this.key_d.isDown) {
			s.x += speed;
			if (d == dir[0]) { // W
				s.animations.play('rev_left');
			} else if (d == dir[2]) { // E
				s.animations.play('right');
			} else if (d == dir[1]) { // N
				s.animations.play('up');
			} else if (d == dir[3]) { // S
				s.animations.play('down');
			}else if (d == dir[4]){ // NW Up Left
				s.animations.play('rev_upLeft');
			}else if(d == dir[5]){ // NE Up Right
				s.animations.play('upRight');
			}else if(d == dir[6]){ // SW Down Left
				s.animations.play('rev_downLeft');
			}else if(d == dir[7]){ // SE Down Right
				s.animations.play('downRight');
			}

		}
		

	},
	mouseFollow: function() {
		//Como explicado anteriormente mas fixando: Aqui é a função de movimentação da direção da sprite quando a sprite estiver parada.
		var d = this.mouseDirection();
		var s = this.sprite;
		switch(d) {
			case dir[0]:
				this.sprite.frame = 44;
				break;
			case dir[1]:
				this.sprite.frame = 17;
				break;
			case dir[2]:
				this.sprite.frame = 35;
				break;
			case dir[3]:
				this.sprite.frame = 62;
				break;
			case dir[4]:
				this.sprite.frame = 8;
				break;
			case dir[5]:
				this.sprite.frame = 24;
				break;
			case dir[6]:
				this.sprite.frame = 52;
				break;
			case dir[7]:
				this.sprite.frame = 71;
				break;
		}
	},
	mouseDirection: function() {
		//Aqui simplismente essa função pega o x, y da sprite e o x,y do mouse e convertem em radianos para a variavel 'angle'.
		var s = this.sprite;
		var m = this.game.input.mousePointer;
		//Aqui é feito um calculo matemático convertido para js, que seriamente eu nunca vo saber 
		var angle = Math.atan2(m.y - s.y, m.x - s.x) * (180/Math.PI);	
		//Aqui angle tem a função de dizer qual a direção em que o mouse se encontra.
		//pegando o angulo e perguntando em qual grau em radianos ele está.
		
		if (angle > 157 || angle < -157){
			//left w
			return dir[0];
		} 
		else if (angle > -112 && angle < -67){
			//up n
			return dir[1];
		} 
		else if (angle > -22 && angle < 22){
			//right e
			return dir[2];
		} 
		else if (angle > 67 && angle < 112){
			//down s
			return dir[3];
		}
		else if(angle > -157 && angle < -112){
			//up left nw
			return dir[4];
		}
		else if(angle > -67 && angle < -22){
			//up left ne
			return dir[5];
		}
		else if(angle > 112 && angle < 157){
			//up left sw
			return dir[6];
		}
		else if(angle > 22 && angle < 67){
			//up left se
			return dir[7];
		}
	}
}