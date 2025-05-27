class Attractor {
  constructor(x, y, range, strength = 2, orbit = false) {
    this.position = createVector(x, y);
    this.range = range;
    this.strength = strength*2;
    this.orbit = orbit;
    this.visible = false;
  }

  

attract(particles) {
  for (let p of particles) {
    
    let dir = p5.Vector.sub(this.position, p.position);
    let distance = constrain(dir.mag(), 5, 500);
    let centerDir = dir.copy().normalize();
    let forceMag = (this.strength * p.mass) / (distance * distance);
    let gravity = centerDir.copy().mult(forceMag);

    
         if (this.orbit && distance < this.range) {
        let wanderingFactor = random(-2, 2);
        let oscillation = sin( 0.05 + p.position.x * 0.2) * 1.0;
        let randomForce = createVector(random(-2, 2), random(-2, 2));

        let chaseForce = centerDir.copy().mult(oscillation * 0.5);

        p.applyForce(gravity.copy().mult(0.7));
        p.velocity.add(chaseForce);
        p.velocity.add(randomForce);

        if (distance < 30) {
          p.velocity.mult(0);
        }

        if (random() < 0.1) {
          p.applyForce(randomForce.copy().mult(0.5));
        }

      }

    
    if (this.orbit == false && distance < this.range) {
      let tangent = createVector(-centerDir.y, centerDir.x);
      tangent.setMag(sqrt((abs(this.strength) * 100) / distance));
      if (this.strength < 0) tangent.mult(0.5);
      p.applyForce(gravity);
      p.applyForce(tangent);
    } else {
      p.applyForce(gravity.copy().mult(0.6));
    }

    p.velocity.limit(3);
  }
}


  display() {
    if (this.visible == true) {
      noFill();
      stroke(255, 100);
      ellipse(this.position.x, this.position.y, this.range * 2);

      noStroke();
      fill(255, 100);
      ellipse(this.position.x, this.position.y, 8, 8);
    }
  }
}
