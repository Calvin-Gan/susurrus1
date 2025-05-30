let gpart;
let garr;
let gamount;
let gx;
let gy;
let gcol;
let gsize;
let gglow;
let gdecay; 
let grep;
let environment = 1;
let pulseAlpha = 0;
let gtext;
let particle1 = [];
let attractor = [];
let attractor2 = [];
let missiles = [];
let zones = [];
let mouseIsHeld = false;
let porbit = false;
let arep = false;
let levelhistory = [];
let gsong;
let goldsong;
let song1, song2;
let amplitude;
let showVisualizer = true;
let randomseedv;
let rumble = 0;
let flashAlpha = 255;
let flashDirection = -1;
let seeder;
let gameState = "intro"; // 'intro' or 'game'
let fireNoiseOffset = 0;

let introParticles = [];
let introTexts = [
  "Welcome, Wanderer. I see you have returned.",
  "Once more, the call of the dead and forgotten universes engulfs you.",
  "Press G to enable clump mode",
  "Press E to change repulsion mode",
  "Press Z to shift into a new dimension",
  "Press S to disable the HUD",
  "Press R to restart",
  "Press N to begin anew",
  "Good luck, Wanderer. May we meet again.",
];

let currentIntroIndex = 0;
let introTextAlpha = 0;
let introTextState = "fadeIn";
let introTextTimer = 0;

function preload() {
  song1 = loadSound("Firefly.ogg");
  song2 = loadSound("Dustcave.ogg");
  songtest = loadSound("thebigwahoo.ogg");
  song3 = loadSound("SNOW3.ogg");
  song4 = loadSound("ocean.ogg");
  song5 = loadSound("POWER_out.ogg")
}

function setup() {
  seeder = random(113);
  createCanvas(800, 400);
  amplitude = new p5.Amplitude();
  amplitude.setInput(gsong);
  amp = new p5.Amplitude();
  randomSeed(randomseedv);
  loade(environment);
  createAttractor(attractor, random(15, 20), 10, 0.8, false);
  //createZone(zones, random(15, 20), 10, 0.8, false);

  for (let i = 0; i < 150; i++) {
    introParticles.push({
      pos: createVector(random(width), random(height)),
      vel: p5.Vector.random2D().mult(0.2),
      size: random(1, 3),
      alpha: random(50, 150),
    });
  }
}

function draw() {
  background(0);
  if (gameState === "intro") {
    for (let p of introParticles) {
      p.pos.add(p.vel);

      if (p.pos.x < 0) p.pos.x = width;
      if (p.pos.x > width) p.pos.x = 0;
      if (p.pos.y < 0) p.pos.y = height;
      if (p.pos.y > height) p.pos.y = 0;

      noStroke();
      fill(255, p.alpha);
      ellipse(p.pos.x, p.pos.y, p.size);
    }

    let fadeSpeed = 3;
    let holdDuration = 90;

    if (introTextState === "fadeIn") {
      introTextAlpha += fadeSpeed;
      if (introTextAlpha >= 255) {
        introTextAlpha = 255;
        introTextState = "hold";
        introTextTimer = holdDuration;
      }
    } else if (introTextState === "hold") {
      introTextTimer--;
      if (introTextTimer <= 0) {
        introTextState = "fadeOut";
      }
    } else if (introTextState === "fadeOut") {
      introTextAlpha -= fadeSpeed;
      if (introTextAlpha <= 0) {
        introTextAlpha = 0;
        currentIntroIndex++;
        if (currentIntroIndex >= introTexts.length) {
          currentIntroIndex = introTexts.length - 1;
        } else {
          introTextState = "fadeIn";
        }
      }
    }

    fill(255, introTextAlpha);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(introTexts[currentIntroIndex], width / 2, height / 2);

    fill(255, introTextAlpha * 0.5);
    textSize(14);
    text("Press SPACE to embark", width / 2, height / 2 + 50);
  } else if (gameState === "game") {
    textAlign(LEFT, BOTTOM);

    let level = amplitude.getLevel();
    if (level > 0.2) {
      rumble = map(level, 0.3, 1, 3, 25);
    }
    if (rumble > 0) {
      translate(random(-rumble, rumble), random(-rumble, rumble));
      rumble -= 0.2;
    }
  
    
     if(environment === 5) {
     drawWastelandEnvironment() 
    }
    if(level > 0.38 && environment === 5)
{
  


  if(typeof fallingMissiles === 'undefined') {
    window.fallingMissiles = [];
  }
  if(typeof fieryParticles === 'undefined') {
    window.fieryParticles = [];
  }
  
  if (typeof shockwaveRings === 'undefined') {
  window.shockwaveRings = [];
}
  
  if (typeof shockwaveBursts === 'undefined') {
  window.shockwaveBursts = [];
}



  if(frameCount % 30 === 0) {
    fallingMissiles.push({
      posX: random(width),
      posY: 0,
      speedY: random(3, 6),
      exploded: false
    });
  }

  
  for(let i = fallingMissiles.length - 1; i >= 0; i--) {
    let missile = fallingMissiles[i];

    if(!missile.exploded) {
      missile.posY += missile.speedY;

      

noStroke();

fill(80);
rect(missile.posX - 12, missile.posY - 36, 24, 72, 12);

fill(150);
ellipse(missile.posX, missile.posY - 28, 24, 32);


fill(60);
rect(missile.posX - 10, missile.posY - 48, 20, 16, 6);


for (let i = 0; i < 8; i++) {
  let flickerX = missile.posX + (noise(missile.posX * 0.01, frameCount * 0.1 + i) - 0.5) * 15;
  let flickerY = missile.posY - 48 - i * 10 + sin(frameCount * 0.2 + i) * 3;


  let alpha = map(i, 0, 7, 200, 0);
  

  let r = lerp(255, 200, noise(frameCount * 0.05 + i));
  let g = lerp(200, 50, noise(frameCount * 0.07 + i));
  let b = 0;

  fill(r, g, b, alpha);
  ellipse(flickerX, flickerY, 20 - i * 2, 30 - i * 4);
}
      if(missile.posY >= height - 100) {
        missile.exploded = true;
        
        createParticle(gpart, garr,20, missile.posX, missile.posY, gcol, gsize, gglow, gdecay);
        
        let particleCount = 80;
        for(let p = 0; p < particleCount; p++) {
          let angle = random(TWO_PI);
          let mspd = random(2, 8);
          fieryParticles.push({
            posX: missile.posX,
            posY: missile.posY,
            velX: cos(angle) * mspd,
            velY: sin(angle) * mspd,
            r: random(200, 255),
            g: random(50, 120),
            b: 0,
            alpha: 255,
            size: random(4, 8)
          });
        }

        fallingMissiles.splice(i, 1);
         stroke(random(200,255),random(50,120),0)
   let ampLevel = amplitude.getLevel();
let ringCount = 5; // Number of visible rings for the burst
let baseSize = ampLevel * 80;

let burst = [];
for (let j = 0; j < ringCount; j++) {
  burst.push({
    radius: baseSize + j * 15,
    opacity: 255 - j * 40,
    weight: 2 + j * 0.5
  });
}
shockwaveBursts.push({
  x: missile.posX,
  y: missile.posY,
  rings: burst
});

      }
    }
  }


  for(let i = fieryParticles.length - 1; i >= 0; i--) {
    let p = fieryParticles[i];
    p.posX += p.velX;
    p.posY += p.velY;
    p.velX *= 0.92; 
    p.velY *= 0.92;
    p.velY += 0.15; 
    p.alpha -= 5;

    noStroke();
    fill(p.r, p.g, p.b, p.alpha);
    ellipse(p.posX, p.posY, p.size);

    if(p.alpha <= 0) {
      fieryParticles.splice(i, 1);
    }
  }
  
 for (let i = shockwaveBursts.length - 1; i >= 0; i--) {
  let burst = shockwaveBursts[i];
  let rings = burst.rings;
  let removeBurst = true;

  for (let r of rings) {
    noFill();
    stroke(255, 120, 40, r.opacity);
    strokeWeight(r.weight);
    ellipse(burst.x, burst.y, r.radius);

    r.radius += 1.5;
    r.opacity -= 3;
    if (r.opacity > 0) {
      removeBurst = false;
    }
  }

  if (removeBurst) {
    shockwaveBursts.splice(i, 1);
  }
}


}

    if (frameCount % 400 == 0 || level > 0.25) {
      attractor = [];
      createAttractor(attractor, random(15, 20), 10, 0.8, false);
      if (environment === 1) {
        for (let z of zones) {
          z.fadeOut();
        }
      }
    }

    noStroke();
    if (environment === 1) {
      if (floor(random(800)) == 7) {
        for (let z of zones) {
          z.fadeOut();
        }

        createZone(zones, random(5), random(10, 40), 0.8, false);
      }

      fill(180, 240, 190, 30);
      push();
      translate(sin(frameCount * 0.002) * 3, 0);
      drawForestScene();
      pop();
    }
    if (environment === 2) {
      blendMode(ADD);
      gx = random(20, width - 20);
      fill(120, 110, 90, random(3, 5));
      rect(0, 0, width, height);
      blendMode(BLEND);
      drawCaveEnvironment();
      fill(80, 70, 60, 50);
    }
    if (environment === 4) {
      drawSnowEnvironment();
    }
   

    if (environment === 3) {
      drawPoolroomsEnvironment();
    }
    rect(0, 0, width, height);

    fill(255);
    textSize(30);
    text(gtext, 20, height - 20);
    if (showVisualizer) {
      textSize(12);
      text("Clump: " + str(porbit), width - 120, 40);
      text("Repulsion: " + str(arep), width - 120, 20);
      text("Seed: " + str(seeder), width - 120, 60);
      text("Particles: " + str(particle1.length), width - 120, 80);
      // text("Dimension " + str(ceil(seeder * 113)),width-120,100)
      text("Universe " + str(environment), width - 120, 100);
    }

    for (let a of attractor) {
      a.attract(particle1);
      a.display();
      a.visible = mouseIsHeld;
      if (porbit) a.orbit = true;
      if (arep) a.strength *= -1;
    }

    for (let z of zones) {
      z.detect(environment);
      z.display();
      z.effect(environment);
      z.visible = mouseIsHeld;
      z.updateFade();
    }

    for (let i = particle1.length - 1; i >= 0; i--) {
      let p = particle1[i];
      p.update();
      p.display();
      if (p.fade <= 0) {
        particle1.splice(i, 1);
      }
    }

    if (frameCount % ceil(225 / gdecay) === 0) {
      createParticle(gpart, garr, gamount, gx, gy, gcol, gsize, gglow, gdecay);
      for (let p of particle1) {
        let angle = random(TWO_PI);
        let force = p5.Vector.fromAngle(angle);
        force.mult(random(0.5, 2));
        p.applyForce(force);
      }
    }

    if (!gsong.isPlaying()) {
      gsong.play();
    }

    if (showVisualizer) {
      let baseRadius = map(level, 0, 0.5, 50, 150);
      let fadeAlpha = map(level, 0, 0.2, 10, 255);

      if (pulseAlpha > 0) {
        pulseAlpha -= 5;
      }

      let pulse = sin(frameCount * 0.05) * baseRadius + pulseAlpha;

      push();
      translate(width / 2, height / 2);
      noFill();
      stroke(255, fadeAlpha);
      strokeWeight(3);
      ellipse(0, 0, pulse * 2, pulse * 2);
      pop();
    }

    if (pulseAlpha > 0) {
      fill(255, pulseAlpha);
      rect(0, 0, width, height);
      pulseAlpha -= 5;
    }
  }
}

function createParticle(
  particle,
  array,
  amount,
  x,
  y,
  colour,
  size,
  glow,
  decay
) {
  for (let i = 0; i < amount; i++) {
    array.push(
      new particle(
        x + random(-100, 100),
        y + random(-100, 100),
        size * random(0.5, 2),
        colour,
        glow,
        decay
      )
    );
  }
}

function createAttractor(
  array,
  amount,
  range,
  strength,
  orbit = false,
  randomv = true
) {
  if (randomv == true) {
    for (let i = 0; i < amount; i++) {
      array.push(
        new Attractor(
          random(width),
          random(height),
          range * random(1, 4),
          strength,
          orbit
        )
      );
    }
  } else {
    for (let i = 0; i < amount; i++) {
      array.push(
        new Attractor(
          width / 2,
          height - 60,
          range * random(1, 4),
          strength,
          orbit
        )
      );
    }
  }
}

function createZone(array, amount, range, strength) {
  for (let i = 0; i < amount; i++) {
    array.push(
      new Zone(random(width), random(height), range * random(1, 4), strength)
    );
  }
}

function mousePressed() {
  mouseIsHeld = true;
}

function mouseReleased() {
  mouseIsHeld = false;
}

function keyPressed() {
  if (gameState === "intro") {
    if (key === " ") {
      gameState = "game";
      environment = 1;
      loade(environment, true);
      pulseAlpha = 255;
    }
  } else if (gameState === "game") {
    if (key === "g" || key === "G") {
      porbit = !porbit;
    }

    if (key === "e" || key === "E") {
      arep = !arep;
      pulseAlpha = 100;
    }

    if (key === "z" || key === "Z") {
      if (environment != 5) {
        environment += 1;
      } else {
        environment = 1;
      }
      loade(environment, true);
      pulseAlpha = 255;
    }

    if (key === "s" || key === "S") {
      showVisualizer = !showVisualizer;
    }

    if (key === "n" || key === "N") {
      loade(environment);
    }
    if (key === "r" || key === "R") {
      randomSeed(seeder);
      loade(environment, true);
    }
  }
}
function loade(e, keepSeed = false) {
  textSize(12);
  if (!keepSeed) {
    seeder = random();
  }
  particle1 = [];
  particle2 = [];
  goldsong = gsong;

  if (e === 1) {
    gpart = Ball;
    garr = particle1;
    gamount = 80;
    gx = width / 2 + random(-20, 20);
    gy = height / 2 + random(-20, 20);
    gcol = color(195, 234, 153);
    gsize = 0.5;
    gglow = true;
    gdecay = 0.3;
    grep = 400;
    porbit = true;
    gtext = "Quiet Glow of Memory";
    gsong = song1;
  } else if (e === 2) {
    gpart = Ball;
    garr = particle1;
    gamount = 120;
    gx = random(20, width - 20);
    gy = 20;
    gcol = color(125, 109, 64);
    gsize = 0.4;
    gglow = false;
    gdecay = 0.4;
    grep = 80;
    porbit = false;
    gtext = "At The End All That Remains Is Dust";
    gsong = song2;
  } else if (e === 3) {
    gpart = Ball;
    garr = particle1;
    gamount = 200;
    gx = width / 2 + random(-400, 400);
    gy = height / 2 + random(-100, 100);
    gcol = color(255, 253, 141);
    gsize = 0.6;
    gglow = true;
    gdecay = 0.4;
    grep = 80;
    porbit = false;
    gtext = "Deception";
    gsong = song4;
  } else if (e === 4) {
    gpart = Ball;
    garr = particle1;
    gamount = 300;
    gx = width - random(5, 200);
    gy = height / 2 + random(-100, 100);
    gcol = color(230, 240, 245);
    gsize = 0.2;
    gglow = false;
    gdecay = 0.6;
    grep = 80;
    porbit = false;
    gtext = "Desolation of Snow";
    gsong = song3;
  }
  else if (e === 5) {
    gpart = Ball;
    garr = particle1;
    gamount = 60;
    gx = random(width);
    gy = height - 100;
    gcol = color(255,90,0);
    gsize = 0.2;
    gglow = true;
    gdecay = 0.5;
    grep = 80;
    porbit = false;
    gtext = "Cataclysm";
    gsong = song5;
  }

  createParticle(gpart, garr, gamount, gx, gy, gcol, gsize, gglow, gdecay);
  for (let p of particle1) {
    let angle = random(TWO_PI);
    let force = p5.Vector.fromAngle(angle);
    force.mult(random(0.5, 2));
    p.applyForce(force);
  }
  amplitude.setInput(gsong);
  //if (goldsong && goldsong !== gsong) {
  if (goldsong) {
    goldsong.stop();
    //}
  }
  if (environment === 4) {
    createZone(zones, 1, width * 2, 0.8, false);
  }

  if (environment === 3) {
    createZone(zones, 1, width * 2, 0.8, false);
  }
  gsong.play();
}

function drawForestScene() {
  drawSkyGradient();

  drawTree(
    600,
    height - 300,
    50,
    height - 20,
    color(25, 35, 20),
    140,
    5,
    160,
    5
  );
  drawTree(
    520,
    height - 240,
    40,
    height - 20,
    color(25, 35, 20),
    130,
    5,
    160,
    5
  );

  drawTree(
    220,
    height - 270,
    60,
    height - 20,
    color(25, 35, 20),
    140,
    5,
    160,
    4
  );
  drawTree(
    300,
    height - 240,
    50,
    height - 20,
    color(25, 35, 20),
    120,
    5,
    160,
    3
  );
  drawTree(
    450,
    height - 200,
    30,
    height - 20,
    color(25, 35, 20),
    110,
    5,
    160,
    3
  );

  drawTree(
    100,
    height - 360,
    70,
    height - 20,
    color(45, 45, 30),
    210,
    5,
    160,
    2
  );
  drawTree(
    width - 80,
    height - 360,
    70,
    height - 20,
    color(92, 65, 40),
    180,
    5,
    160,
    1
  );
  drawTree(30, height - 400, 100, height, color(50, 55, 40), 220, 5, 160, 0);

  drawGroundFog();
  drawTwistingRoots();
  drawAmbientDarkness();
}

function drawSkyGradient() {
  noStroke();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(15, 20, 30), color(2, 5, 10), y / height);
    fill(c);
    rect(0, y, width, 1);
  }
}

function drawTree(
  x,
  y,
  trunkW,
  trunkH,
  trunkCol,
  canopySize,
  canopyLayers,
  shadowHeight,
  depth
) {
  let dAlpha = map(depth, 0, 5, 255, 40);
  let dCol = lerpColor(trunkCol, color(0), map(depth, 0, 5, 0, 0.6));
  fill(red(dCol), green(dCol), blue(dCol), dAlpha);
  rect(x, y, trunkW, trunkH);

  noStroke();
  fill(0, 0, 0, 40);
  ellipse(x + trunkW / 2, y, trunkW * 2, trunkH);

  stroke(0, 0, 0, 40);
  strokeWeight(1);
  for (let i = 3; i < trunkW - 2; i += 4) {
    line(x + i, y, x + i, y + trunkH);
  }

  drawCanopy(x + trunkW / 2, y, canopySize, canopyLayers, trunkW, depth);
}

function drawCanopy(x, y, size, layers, col, depth = 0) {
  noStroke();
  for (let i = 0; i < layers; i++) {
    let baseAlpha = map(i, 0, layers, 180, 30);
    let fadeAlpha = map(depth, 0, 5, baseAlpha, baseAlpha * 0.4); // Was 0.3 before

    let sz = size - i * 12;
    fill(
      30 + ((i * col) / 80) * 5 - size / 10 + col / 4,
      50 + ((i * col) / 80) * 10 - size / 10 + col / 4,
      (30 * col) / 80 + col / 4.5,
      fadeAlpha
    );
    ellipse(x + i * 2 - 10, y - i * 20, sz * 1.2, sz);
    ellipse(x + i * 2 + 30, y - i * 20 + 30, sz * 1.2 - 10, sz - 30);
  }
}

function drawTwistingRoots() {
  noFill();
  stroke(30, 20, 10);
  strokeWeight(4);
  bezier(100, height, 120, height - 50, 180, height - 10, 220, height - 40);
  bezier(
    260,
    height - 10,
    300,
    height - 30,
    350,
    height - 10,
    400,
    height - 40
  );
  bezier(420, height, 450, height - 70, 500, height - 20, 580, height - 60);
}

function drawGroundFog() {
  noStroke();
  for (let i = 0; i < 80; i++) {
    let x = i * 10;
    fill(200, 220, 200, 4);
    ellipse(x, height + sin(i * 0.1) * 3, 100, 60);
  }
}

function drawAmbientDarkness() {
  noStroke();
  for (let y = height - 150; y < height; y++) {
    let a = map(y, height - 150, height, 0, 150);
    fill(0, 0, 0, a);
    rect(0, y, width, 1);
  }
}

function drawSnowEnvironment() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(170, 190, 200), color(230, 240, 245), y / height);
    if (amplitude.getLevel() > 0.7) {
      c = lerpColor(color(45, 65, 75), c, y / height);
    }
    noStroke();
    fill(c);
    rect(0, y, width, 5);
  }
  if (amplitude.getLevel() > 0.7) {
    fill(43, 50, 64, 80);
  } else {
    fill(0, 0, 0, 0);
  }
  // Body
  beginShape();
  vertex(320, 140);
  vertex(480, 140);
  vertex(500, 220);
  vertex(460, 280);
  vertex(340, 280);
  vertex(300, 220);
  endShape(CLOSE);

  // Arms
  beginShape();
  vertex(250, 100);
  vertex(220, 230);
  vertex(280, 230);
  vertex(310, 150);
  endShape(CLOSE);

  beginShape();
  vertex(550, 100);
  vertex(580, 230);
  vertex(520, 230);
  vertex(490, 150);
  endShape(CLOSE);

  // Head
  ellipse(400 + sin(frameCount * 0.02) * 10, 80, 80, 100);
  if (amplitude.getLevel() > 0.8) {
    fill(255, 50, 0, 10);
    ellipse(390, 90, 50, 55);

    fill(255, 50, 0, 25);
    ellipse(390, 90, 40, 45);

    fill(255, 50, 0, 50);
    ellipse(390, 90, 30, 35);

    fill(255, 50, 0, 80);
    ellipse(390, 90, 20, 25);

    fill(255, 100, 50, 100);
    ellipse(390, 90, 10, 15);

    stroke(255, 80, 0);
    strokeWeight(2);
    line(375, 90, 405, 90);

    stroke(255, 150, 100, 150);
    strokeWeight(1);
    line(377, 89, 403, 91);
    textSize(150);
    text("DANGER", width / 2 - 300, height / 2);
  }

  noStroke();
  fill(245, 245, 245, 60);
  for (let i = 0; i < 100; i++) {
    ellipse(random(width), random(height), random(30, 50), random(5, 20));
  }

  fill(220, 230, 240);
  noStroke();
  rect(0, height - 100, width, 100);
  fill(108, 118, 126, 150);
  quad(300, 200, 320, 200, 340, 300, 320, 300);
  fill(108, 118, 126);
  quad(62.5, 250, -17.5, 310, 152.5, 170, 182.5, 270, 2.5, 270, 212.5, 190);
  for (let i = 0; i < 50; i++) {
    fill(235, 240, 245, random(50, 100));
    ellipse(
      random(width),
      height - random(100, 150),
      random(100, 200),
      random(30, 60)
    );
  }

 
}

function drawCaveEnvironment() {
  background(15, 15, 20);

  drawCaveCeiling();

  drawFadingFloor();
}

function drawCaveCeiling() {
  noStroke();

  beginShape();
  vertex(0, height / 4);
  for (let x = 0; x < width; x += 60) {
    for (let y = 0; y < 100; y += 20) {
      fill(lerpColor(color(80, 50, 30), color(15, 15, 20), y / 100));
    }
    let yOffset = sin(x * 0.3) * 30 + cos(x * 0.05) * 20;
    vertex(x, height / 4 + yOffset);
  }
  vertex(width, height / 4);
  vertex(width, 0);
  vertex(0, 0);
  endShape(CLOSE);
}

function drawFadingFloor() {
  for (let y = height; y > 300; y -= 20) {
    fill(lerpColor(color(80, 50, 30), color(15, 15, 20), 300 / y));
    noStroke();

    beginShape();
    vertex(0, y - 50);
    for (let x = 0; x < width; x += 10) {
      let floorHeight = map(x, 0, width, y - 50, y - 150);
      vertex(x, floorHeight);
    }
    vertex(width, y - 50);
    vertex(width, y);
    vertex(0, y);
    endShape(CLOSE);
  }
}

function drawGradientRect(x1, y1, x2, y2, c1, c2, steps) {
  for (let i = 0; i < steps; i++) {
    let inter = i / steps;
    let c = lerpColor(c1, c2, inter);
    fill(c);
    noStroke();
    let yTop = lerp(y1, y2, i / steps);
    let yBot = lerp(y1, y2, (i + 1) / steps);
    quad(
      lerp(x1, x2, i / steps),
      yTop,
      lerp(x1, x2, (i + 1) / steps),
      yBot,
      lerp(x1, x2, (i + 1) / steps),
      yBot,
      lerp(x1, x2, i / steps),
      yTop
    );
  }
}

function drawPoolroomsEnvironment() {
  noStroke();

  let c1 = [172, 206, 217];
  let c2 = [255, 161, 0];

  for (let y = 0; y < height; y++) {
    let inter = y / height;
    let r = lerp(c1[0], c2[0], inter);
    let g = lerp(c1[1], c2[1], inter);
    let b = lerp(c1[2], c2[2], inter);
    stroke(r, g, b);
    line(0, y, width, y);
  }

  let sunX = width * 0.75;
  let sunY = height * 0.25;

  noStroke();

  fill(255, 140, 30, 50);
  ellipse(sunX, sunY, 90, 100);

  fill(255, 130, 20, 90);
  ellipse(sunX, sunY, 75, 80);

  fill(255, 200, 50, 120);
  ellipse(sunX, sunY, 60, 65);

  fill(255, 210, 100, 160);
  ellipse(sunX, sunY, 45, 50);

  fill(255, 240, 180, 210);
  ellipse(sunX, sunY, 35, 30);

  fill(255, 255, 240, 255);
  ellipse(sunX, sunY, 25, 20);

  noStroke();

  if (amplitude.getLevel() > 0.6) {
    fill(0, 0, 0, 220);

    stroke(0, 0, 0, 100);
    strokeWeight(1);
    for (let y = 0; y < height; y += 3) {
      line(0, y, width, y);
    }
    textSize(50);
    fill(255, 255, 255);
    text("it's not real.", 300, 100);
  }

  let oceanTop = 220;
  let oceanBottom = height;
  let t = frameCount * 0.01;

  for (let y = oceanTop; y < oceanBottom; y++) {
    let inter = (y - oceanTop) / (oceanBottom - oceanTop);
    let r = lerp(0, 70, inter);
    let g = lerp(40, 130, inter);
    let b = lerp(80, 180, inter);
    stroke(r, g, b);
    line(0, y, width, y);
  }

  for (let y = oceanTop; y < oceanBottom; y += 30) {
    for (let x = 0; x < width; x += 8) {
      let baseYOffset = (t * 100) % 30;
      let baseY = y - baseYOffset;
      let noiseVal = noise(baseY * 0.002, x * 0.0005, t * 0.2) * 30;
      let blueBrightness = map(99 - noiseVal * 4, 50, 99, 100, 255);
      blueBrightness = constrain(blueBrightness, 100, 255);
      fill(0, 0, blueBrightness, 77);
      let waveY =
        sin(x * 0.02 + t * 2 + noiseVal) * noiseVal + ((t * 100) % 30);
      ellipse(x, y + waveY, 9, 3);
    }
  }

  stroke(80, 90, 120, 50);
  strokeWeight(1);
  line(0, oceanTop, width, oceanTop);
}



function drawWastelandEnvironment() {
 
  for (let y = 0; y < height / 2; y++) {
    let c = lerpColor(color(100, 50, 20), color(10, 5, 3), y / (height / 2));
    stroke(c);
    line(0, y, width, y);
  }

  let amplitudeLevel = amplitude.getLevel();
  let fireBands = 45;
  let fireWidth = width / fireBands;
  let maxFireHeight = height / 2.5;
  let baseY = height / 2 + 50;

  for (let i = 0; i < fireBands; i++) {
    let x = i * fireWidth;
    let flickerPhase = sin(frameCount * 0.2 + i * 0.5); 
    let dynamicAmp = amplitudeLevel * (1 + 0.3 * flickerPhase);
    let fireHeight = dynamicAmp * maxFireHeight;

    let turbulence = sin(frameCount * 0.15 + i * 0.3) * 12;

    let coreColor = color(255, 128, 10, random(90,160));
    noStroke();
    fill(coreColor);
    ellipse(x + fireWidth / 2, baseY - fireHeight + turbulence, fireWidth * 0.5, fireHeight * 1.2);
    
    noStroke();
    fill(color(255, 171, 10, random(90,160)));
    ellipse(x + fireWidth / 2, baseY - fireHeight + turbulence, fireWidth * 0.5, fireHeight*0.7);
    
        
    noStroke();
    fill(color(255, 217, 100, random(90,160)));
    ellipse(x + fireWidth / 2, baseY - fireHeight + turbulence + 40, fireWidth * 0.5, fireHeight*0.8);
         
    noStroke();
    fill(color(255, 242, 175, random(90,160)));
    ellipse(x + fireWidth / 2, baseY - fireHeight + turbulence + 40, fireWidth * 0.5, fireHeight*0.5);


    fill(255, 120, 40, 180);
    beginShape();
    vertex(x, baseY);
    bezierVertex(
      x + fireWidth * 0.25, baseY - fireHeight * 0.4,
      x + fireWidth * 0.75, baseY - fireHeight + turbulence * 2,
      x + fireWidth, baseY
    );
    endShape(CLOSE);

    fill(255, 60, 0, 100);
    beginShape();
    vertex(x, baseY);
    bezierVertex(
      x + fireWidth * 0.3, baseY - fireHeight * 0.3,
      x + fireWidth * 0.7, baseY - fireHeight * 1.1 + turbulence,
      x + fireWidth, baseY
    );
    endShape(CLOSE);

    if (amplitudeLevel > 0.35) {
      let glowSize = fireHeight * 1.3;
      fill(255, 100, 20, map(amplitudeLevel, 0.35, 0.9, 40, 100));
      ellipse(x + fireWidth / 2, baseY - fireHeight / 1.7, fireWidth * 2, glowSize);
    }

    // Ember pulses on peaks
    if (amplitudeLevel > 0.65 && frameCount % 4 < 2) {
      fill(255, 255, 180, 150);
      ellipse(x + fireWidth / 2, baseY - fireHeight * 0.6 + random(-10, 10), random(10, 20), random(10, 20));
    }
  }

  if (amplitudeLevel > 0.75) {
    push();
    blendMode(ADD);
    let flareAlpha = map(amplitudeLevel, 0.75, 1, 30, 100);
    let flareRadius = map(amplitudeLevel, 0.75, 1, 150, 300);

    for (let i = 0; i < 4; i++) {
      fill(255, 100 + i * 30, 10, flareAlpha / (i + 1));
      ellipse(width / 2, baseY - maxFireHeight * 0.8, flareRadius + i * 40, flareRadius + i * 30);
    }

    pop();
  }

  noStroke();
  for (let i = 0; i < 100; i++) {
    let x = (i * 53) % width;
    let y = (i * 97) % (height / 2);
    fill(255, 120, 0, 25);
    ellipse(x, y, 2, 2);
  }


  fill(35, 30, 25);
  rect(0, height / 2, width, height / 2);

  stroke(25, 20, 15, 160);
  strokeWeight(1.2);
  let cracks = [
    [[50, height * 0.65], [90, height * 0.7], [120, height * 0.68]],
    [[200, height * 0.75], [215, height * 0.73], [230, height * 0.76]],
    [[360, height * 0.58], [390, height * 0.6], [420, height * 0.63]],
    [[500, height * 0.68], [510, height * 0.7], [520, height * 0.72]],
    [[620, height * 0.72], [640, height * 0.74], [660, height * 0.73]],
    [[710, height * 0.62], [730, height * 0.6], [750, height * 0.61]],
  ];
  for (let crack of cracks) {
    for (let i = 0; i < crack.length - 1; i++) {
      let [x1, y1] = crack[i];
      let [x2, y2] = crack[i + 1];
      line(x1, y1, x2, y2);
    }
  }
  noStroke();

  let buildings = [
    { x: 80, baseY: height / 2 + 140, w: 60, h: 280, topProfile: [0, -15, -10, -20, -5, 10], brokenWindows: [[1, 2], [3, 0], [7, 1]] },
    { x: 220, baseY: height / 2 + 130, w: 55, h: 260, topProfile: [0, -10, -5, -12, 0, 8], brokenWindows: [[2, 0], [4, 2], [6, 1]] },
    { x: 370, baseY: height / 2 + 160, w: 70, h: 300, topProfile: [0, -20, -10, -25, -5, 12], brokenWindows: [[1, 1], [3, 0], [8, 2]] },
    { x: 510, baseY: height / 2 + 150, w: 50, h: 240, topProfile: [0, -12, -6, -15, 0, 5], brokenWindows: [[0, 2], [5, 0], [6, 1]] },
    { x: 650, baseY: height / 2 + 120, w: 65, h: 290, topProfile: [0, -18, -7, -22, -3, 9], brokenWindows: [[2, 1], [4, 0], [9, 2]] },
    { x: 790, baseY: height / 2 + 140, w: 60, h: 270, topProfile: [0, -14, -9, -16, -2, 6], brokenWindows: [[3, 1], [6, 0], [8, 2]] },
  ];

  for (let b of buildings) {
    // Building body
    fill(85, 85, 85);
    rect(b.x, b.baseY - b.h, b.w, b.h, 5);

    
  
    beginShape();
    let tp = b.topProfile;
    vertex(b.x, b.baseY - b.h);
    vertex(b.x + b.w * 0.2, b.baseY - b.h + tp[1]);
    vertex(b.x + b.w * 0.4, b.baseY - b.h + tp[2]);
    vertex(b.x + b.w * 0.6, b.baseY - b.h + tp[3]);
    vertex(b.x + b.w * 0.8, b.baseY - b.h + tp[4]);
    vertex(b.x + b.w, b.baseY - b.h + tp[5]);
    vertex(b.x + b.w, b.baseY - b.h);
    endShape(CLOSE);

    let rows = 10;
    let cols = 3;
    let winW = b.w / cols * 0.7;
    let winH = b.h / rows * 0.4;
    fill(20, 20, 25);
    stroke(15);
    strokeWeight(1);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
      
          let wx = b.x + c * (b.w / cols) + (b.w / cols - winW) / 2;
          let wy = b.baseY - b.h + r * (b.h / rows) + (b.h / rows - winH) / 2;
          rect(wx, wy, winW, winH, 2);
        }      }
    
    noStroke();

 
    stroke(0, 0, 0, 100);
    strokeWeight(2);
    for (let i = 1; i < cols; i++) {
      let gx = b.x + i * (b.w / cols);
      line(gx, b.baseY, gx, b.baseY - b.h);
    }
    for (let i = 1; i < rows; i++) {
      let gy = b.baseY - i * (b.h / rows);
      line(b.x, gy, b.x + b.w, gy);
    }
    noStroke();
  }


  fireNoiseOffset += 0.01;
  for (let y = 0; y < height / 4; y += 10) {
    for (let x = 0; x < width; x += 25) {
      let n = noise(x * 0.02, y * 0.04, fireNoiseOffset);
      let alphaVal = map(n, 0.2, 0.9, 40, 160);
      fill(180, 80, 20, alphaVal * 0.03);
      ellipse(x + 10, y + 20, 90 + n * 80, 50 + n * 30);
    }
  }


  for (let i = 0; i < 200; i++) {
    let x = (i * 23) % width;
    let y = (i * 37) % height;
    fill(200, 200, 180, 12); 
    ellipse(x, y, 1.5, 1.5);
  }
  
   if (amplitude.getLevel() > 0.3) {
   noStroke();
  for (let y = height - 150; y < height; y++) {
    let a = map(y, height - 150, height, 0, 150);
    fill(0, 0, 0, a);
    rect(-35, y, width + 70, 1);
  }
  }

     if (amplitude.getLevel() > 0.5) {
   noStroke();
  for (let y = height - 150; y < height; y++) {
    let a = map(y, height - 150, height, 0, 150);
    fill(random(200,255), random(40,102), 0, a);
    rect(-35, y, width + 70, 1);
  }
  }
  
}
