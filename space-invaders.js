var SI = (function() {

  function Ship(ctx, pos, DIM) {
    var self = this;

    self.x = pos.x;
    self.y = pos.y;
    self.gunPoint = { x: self.x + 20, y: self.y };
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

      ctx.rect(self.x, self.y, 40, 20);
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
      if (self.blocked()) {
        self.x = DIM.x;
        self.gunPoint.x = DIM.x + 20;
      } else {
        self.x += val;
        self.gunPoint.x += val;
      }
    };

    self.blocked = function() {
      if ((self.x > DIM.x) || (self.x - 40 < 0)) {
        return true;
      }

      return false;
    };

    self.keyBindings = function() {
      key("left", function() {
        self.update(-30);
      });

      key("right", function() {
        self.update(30);
      });

      key("space", function() {
        self.fire();
      });
    };
  }

  Ship.GUNPOINT
  Ship.WIDTH
  Ship.HEIGHT

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
