var SI = (function() {

  function Ship(ctx, pos, DIM) {
    var self = this;

    self.x = pos.x;
    self.y = pos.y;
    self.gunPoint = { x: self.x + Ship.GUNPOINT_OFFSET, y: self.y };
    self.firedBullets = [];

    self.fire = function() {
      var bullet = new Bullet(ctx, self.gunPoint, "ship");
      self.firedBullets.push(bullet);
    };

    self.draw = function() {
      ctx.clearRect(0, 0, 900, 600);
      self.drawBackground();
      self.drawShip();
      self.drawGun();
    };

    self.drawShip = function() {
      ctx.beginPath();
      ctx.fillStyle = "#800080";

      ctx.rect(self.x, self.y, Ship.WIDTH, Ship.HEIGHT);
      ctx.fill();
    };

    self.drawGun = function() {
      ctx.beginPath();
      ctx.fillStyle = "#e6c200";

      ctx.rect(self.gunPoint.x-4, self.gunPoint.y-5, 10, 5);
      ctx.fill();
    };

    self.drawBackground = function() {
      ctx.beginPath();
      ctx.fillStyle = "#c0ed9e";

      ctx.rect(0, DIM.height-30, DIM.width, 30);
      ctx.fill();
    };

    self.update = function(val) {
      if (!self.blocked(val)){
        self.x += val;
        self.gunPoint.x += val;
      }
    };

    self.blocked = function(val) {
      var temp = self.x + val;

      if (((temp + 40) >= DIM.width) || (temp <= 0)) {
        return true;
      }

      return false;
    };

    self.keyBindings = function() {
      key("left", function() {
        self.update(-10);
      });

      key("right", function() {
        self.update(10);
      });

      key("space", function() {
        self.fire();
      });
    };
  }

  Ship.WIDTH = 40;
  Ship.HEIGHT = 20;
  Ship.GUNPOINT_OFFSET = 20;

  // Bullet class
  // bullet has direction
  // bullet#draw
  // bullet#update

  // Alien class
  // alien#fire
  // alien#isHit
  // alien#draw
  // alien#update

  // Game class
  // moves aliens from left to right
  // Moves aliens closer once they get to some area of screen
  // random alien randomly shoots
  // array of fired bullets
  // array of aliens
  // game#draw
  // game#update

  return {
    Ship: Ship,
    //Bullet: Bullet,
    //Alien: Alien,
    //Game: Game
  }

})();


(function() {
  var canvas = $("canvas")[0]
  var DIM = { width: 900, height: 600 }
  canvas.width = DIM.width;
  canvas.height = DIM.height;

  var ctx = canvas.getContext("2d");
  var shipStartPos = { x: (DIM.width/2 - 20), y: DIM.height -50 }

  var ship = new SI.Ship(ctx, shipStartPos, DIM);
  ship.keyBindings();
  ship.draw();

  setInterval(ship.draw, 1000/24);
})();
