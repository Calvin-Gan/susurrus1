class Zone {
  constructor(x, y, range, strength = 2) {
    this.position = createVector(x, y);
    this.range = range;
    this.strength = strength * 2;
    this.opacity = 0;
    this.fadingIn = true;
    this.fadingOut = false;
    this.fadeSpeed = 5;
    this.visible = false;
  }

  effect(e) {
    if (e == 1 && this.opacity > 0) {
      let xc = random(
        this.position.x - this.range,
        this.position.x + this.range
      );
      let distanceFromCenter = abs(xc - this.position.x);
      let alpha = map(distanceFromCenter, 0, this.range, this.opacity, 0);

      let baseColor = color(108, 128, 148);
      let randomColor = color(random(255), random(255), random(255));
      let mixedColor = lerpColor(baseColor, randomColor, 0.1);
      mixedColor.setAlpha(alpha);

      stroke(mixedColor);
      strokeWeight(1);
      line(xc, 0, xc + random(-40, 40), height);
    }
  }

  whirl(target) {
    let dir = p5.Vector.sub(this.position, target.position);
    let distance = constrain(dir.mag(), 5, 500);

    let centerDir = dir.copy().normalize();

    let forceMag = (5 * target.mass) / (distance * distance);
    let gravity = centerDir.copy().mult(forceMag);

    if (distance < this.range) {
      let tangent = createVector(-centerDir.y, centerDir.x);

      let swirlStrength = map(distance, 5, this.range, 2.5, 0.1);
      tangent.setMag(swirlStrength);

      target.applyForce(gravity);
      target.applyForce(tangent);
    } else {
      target.applyForce(gravity.copy().mult(0.6));
    }

    target.velocity.limit(3);
  }

  rain(target) {
    let rain = createVector(random(-1, 1), random(-5, 5));
    target.applyForce(rain);
  }

  snow(target) {
    let snowf = createVector(random(-50, -10), random(-2, 2));
    target.sn = true;
    target.applyForce(snowf);
    let angle = random(TWO_PI);
    let force = p5.Vector.fromAngle(angle);
    force.mult(random(0.5, 2));
    target.applyForce(force);

    target.sn = false;
  }

  detect(e) {
    for (let p of particle1) {
      let dir = abs(p.position.x - this.position.x);
      let distance = constrain(dir, 5, 500);
      if (distance < this.range) {
        if (e == 1) {
          this.rain(p);
        }
        if (e == 3 && p.position.y > 200) {
          this.whirl(p);
        }
        if (e == 4 && frameCount % 30 == 0) {
          this.snow(p);
        } else {
          p.sn = false;
        }
      }
    }
  }

  display() {
    if (this.visible == true) {
      noFill();
      stroke(108, 128, 148);
      rect(
        this.position.x - this.range,
        this.position.y,
        this.position.x + this.range,
        height
      );
      if (this.opacity == 0) {
        zones.splice(this, 1);
      }
    }
  }

  fadeOut() {
    this.fadingOut = true;
    this.fadingIn = false;
  }

  updateFade() {
    if (this.fadingIn && this.opacity < 255) {
      this.opacity = min(this.opacity + this.fadeSpeed, 255);
      if (this.opacity === 255) this.fadingIn = false;
    }

    if (this.fadingOut && this.opacity > 0) {
      this.opacity = max(this.opacity - this.fadeSpeed, 0);
    }
  }
}
