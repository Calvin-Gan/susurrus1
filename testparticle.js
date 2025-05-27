class Ball {
  constructor(x, y, mass, colour, glow,decay) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.e = environment
    this.radius = mass * 8;
    this.colour = lerpColor(
      colour,
      color(random(255), random(255), random(255)),
      0.1
    );
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    this.noiseSpeed = 0.01;
    this.glow = glow;
    this.fade = 1
    this.decay = decay
    this.fadingOut = false;
    this.sn = false
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    
    
    
  //  let angleX = noise(this.noiseOffsetX) * TWO_PI * 2;
  //  let angleY = noise(this.noiseOffsetY) * TWO_PI * 2;
  // let force = createVector(cos(angleX), sin(angleY));
 // force.mult(0.05);
    //this.applyForce(force);
    this.noiseOffsetX += this.noiseSpeed;
    this.noiseOffsetY += this.noiseSpeed;
    let arcStrength = 0.05;
let perp = createVector(-this.velocity.y, this.velocity.x).normalize();
perp.mult(noise(this.noiseOffsetX, this.noiseOffsetY) * arcStrength);
if(this.e != 4)
{
    this.applyForce(perp);
}
    this.velocity.add(this.acceleration);
    if(this.sn == false)
    {
    this.velocity.limit(2);
    }
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.x < this.radius || this.position.x > width-this.radius) this.velocity.x *= -1;
    if (this.position.y < this.radius || this.position.y > height-this.radius) this.velocity.y *= -1;
    
     if (this.fadingOut == false) {
      this.fade += 5;
      if (this.fade >= 255) {
        this.fade = 255;
        this.fadingOut = true;
      }
    } 
   
    
  }

  display() {
   
    if(this.fade > 0 && this.fadingOut == true)
    {
      this.fade -= this.decay
      //print(this.fade)
      
    }
   
 
   
    if (this.glow == true) {
      
      noStroke();
      for (let i = 10; i > 0; i--) {
        let glowSize = this.radius + i*1.5;
        let alpha = 5 * i*this.fade/300; // More intense center, fading outward
        fill(red(this.colour), green(this.colour), blue(this.colour), alpha);
        ellipse(this.position.x, this.position.y, glowSize);
      }

      fill(255, this.fade);
    } else {
      noStroke()
      //strokeWeight(2);
      fill(red(this.colour), green(this.colour), blue(this.colour), this.fade);
    }
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}
