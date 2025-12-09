---
layout: default
title: 小品遊戲 | 天界檔案館
description: 飛翔的天使。
permalink: /game/
---

<style>

    @property --gradient-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* --- Game Container & CRT Effect --- */
    #game-wrapper {
      --color-primary: oklch(70% 0.15 250); /* Kanata Blue */
      --color-accent: oklch(85% 0.18 90);   /* Halo Gold */
      --color-danger: oklch(60% 0.22 20);   /* Meat Red */
      --color-bg: oklch(15% 0.05 280);      /* Deep Space */
      
      --glass-surface: rgba(255, 255, 255, 0.1);
      --glass-border: rgba(255, 255, 255, 0.2);
      position: relative;
      max-width: var(--max-width);
      height: 100vh;
      background: radial-gradient(circle at center, #1e1e2e 0%, #000 100%);
      overflow: hidden;
      
      /* CRT Scanline Overlay */
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
        background-size: 100% 3px, 3px 100%;
        pointer-events: none;
        z-index: 50;
      }
    }

    canvas {
      display: block;
      /* Subtle glow around the game screen */
      filter: drop-shadow(0 0 30px var(--color-primary)); 
    }

    /* --- UI Layer (Glassmorphism) --- */
    #ui-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 20;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .hud-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .score-box {
        background: var(--glass-surface);
        backdrop-filter: blur(8px);
        border: 1px solid var(--glass-border);
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.5rem;
        font-weight: 700;
        text-shadow: 0 0 10px var(--color-primary);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        
        span {
          font-variant-numeric: tabular-nums;
        }
      }
    }

    /* --- Boss Health Bar --- */
    .boss-hud {
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      opacity: 0;
      transition: opacity 0.5s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      &.active {
        opacity: 1;
      }

      .label {
        color: var(--color-danger);
        font-weight: bold;
        text-shadow: 0 0 10px var(--color-danger);
        letter-spacing: 2px;
      }

      .bar-container {
        width: 100%;
        height: 12px;
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 6px;
        overflow: hidden;
        position: relative;
      }

      .bar-fill {
        height: 100%;
        width: 100%;
        background: linear-gradient(90deg, oklch(60% 0.22 20), oklch(65% 0.25 30));
        box-shadow: 0 0 15px var(--color-danger);
        transform-origin: left;
        transition: transform 0.1s linear;
      }
    }

    /* --- Bonus Timer --- */
    #bonus-timer {
      font-size: 4rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 5;

      &.active {
        color: var(--color-accent);
        text-shadow: 0 0 30px var(--color-accent);
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.5);
      }
    }

    /* --- Menus (Modern Card Style) --- */
    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: rgba(20, 20, 30, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 40px 60px;
      border-radius: 24px;
      text-align: center;
      z-index: 100;
      pointer-events: auto;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      &.show {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%) scale(1);
      }

      h1 {
        font-size: 3rem;
        margin: 0 0 10px;
        background: linear-gradient(135deg, #fff 0%, var(--color-primary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
      }

      p {
        color: #a1a1aa;
        margin-bottom: 30px;
        font-size: 1.1rem;
        line-height: 1.6;
      }
    }

    /* Animated Button */
    .btn-start {
      position: relative;
      background: transparent;
      border: none;
      padding: 16px 48px;
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      border-radius: 999px;
      isolation: isolate;
      overflow: hidden;
      transition: transform 0.2s;

      /* Rotating Border Effect */
      &::before {
        content: "";
        position: absolute;
        inset: -2px;
        background: conic-gradient(from var(--gradient-angle), var(--color-primary), var(--color-accent), var(--color-primary));
        z-index: -1;
        border-radius: inherit;
        animation: rotate 3s linear infinite;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 2px;
        background: #111;
        border-radius: inherit;
        z-index: -1;
      }

      &:hover {
        transform: scale(1.05);
        &::after { background: #1a1a2e; }
      }
      &:active { transform: scale(0.95); }
    }

    @keyframes rotate {
      to { --gradient-angle: 360deg; }
    }

    /* --- Mobile Controls (Touch) --- */
    #touch-layer {
      display: none; /* Auto-enabled by JS */
      position: absolute;
      inset: 0;
      z-index: 30;
      pointer-events: auto;

      .stick-area {
        position: absolute;
        bottom: 30px;
        left: 30px;
        width: 150px;
        height: 150px;
        background: rgba(255,255,255,0.05);
        border: 2px dashed rgba(255,255,255,0.1);
        border-radius: 50%;
      }

      .btn-fire {
        position: absolute;
        bottom: 40px;
        right: 40px;
        width: 100px;
        height: 100px;
        border-radius: 30px;
        background: rgba(255, 50, 50, 0.15);
        border: 2px solid rgba(255, 50, 50, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 900;
        color: rgba(255,255,255,0.8);
        font-size: 1.2rem;
        backdrop-filter: blur(4px);
        transition: background 0.1s;

        &:active {
          background: rgba(255, 50, 50, 0.4);
          transform: scale(0.95);
        }
      }
    }
  </style>

<div id="game-wrapper">
  <canvas id="gameCanvas"></canvas>
  
  <div id="ui-layer">
    <div class="hud-top">
      <div class="score-box" style="border-left: 4px solid var(--color-primary);">
        SCORE <span id="ui-score">0</span>
      </div>
      <div class="score-box" style="border-left: 4px solid var(--color-accent);">
        HI <span id="ui-high">0</span>
      </div>
    </div>
    
    <div id="bonus-timer">10.00</div>
    
    <div class="boss-hud" id="boss-hud">
      <div class="label">MEAT INTEGRITY</div>
      <div class="bar-container">
        <div class="bar-fill" id="boss-bar"></div>
      </div>
    </div>
  </div>

  <!-- Main Menu -->
  <div id="menu-start" class="modal show">
    <h1>天音かなた<br>肉肉粉碎者 demo</h1>
    <p>
      移動：方向鍵 / 搖桿<br>
      攻擊：Z / 空白鍵 / 按鈕<br>
      目標：射擊敵人，觸發加分關把肉捏爆！
    </p>
    <button class="btn-start" onclick="game.init()">START MISSION</button>
  </div>

  <!-- Game Over -->
  <div id="menu-over" class="modal">
    <h1 style="--color-primary: var(--color-danger)">MISSION FAILED</h1>
    <p>FINAL SCORE: <span id="final-score">0</span></p>
    <button class="btn-start" onclick="game.init()">RETRY</button>
  </div>

  <div id="touch-layer">
    <div class="stick-area" id="stick-base"></div>
    <div class="btn-fire" id="btn-fire">FIRE</div>
  </div>
</div>

<script>
/**
 * Modern Game Engine using ES6+ features
 */
const CFG = {
  w: 1280,
  h: 720,
  physics: {
    playerSpeed: 8,
    bulletSpeed: 18,
    friction: 0.15
  },
  colors: {
    kanata: '#7dd3fc', // Sky blue
    halo: '#fde047',   // Yellow
    meat: '#ef4444'    // Red
  }
};

class InputSystem {
  constructor() {
    this.keys = new Set();
    this.stick = { active: false, x: 0, y: 0 };
    
    // Modern Event Listeners
    window.addEventListener('keydown', e => this.keys.add(e.code));
    window.addEventListener('keyup', e => this.keys.delete(e.code));

    // Touch Handling
    const stickBase = document.getElementById('stick-base');
    const fireBtn = document.getElementById('btn-fire');

    if (window.matchMedia("(pointer: coarse)").matches) {
      document.getElementById('touch-layer').style.display = 'block';
    }

    // Joystick Logic
    stickBase.addEventListener('touchstart', e => {
      e.preventDefault();
      this.stick.active = true;
      this.stick.originX = e.touches[0].clientX;
      this.stick.originY = e.touches[0].clientY;
    }, {passive: false});

    stickBase.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!this.stick.active) return;
      const dx = e.touches[0].clientX - this.stick.originX;
      const dy = e.touches[0].clientY - this.stick.originY;
      // Normalize
      const dist = Math.hypot(dx, dy);
      const maxDist = 50; // Max stick travel
      const force = Math.min(dist, maxDist) / maxDist;
      const angle = Math.atan2(dy, dx);
      
      this.stick.x = Math.cos(angle) * force;
      this.stick.y = Math.sin(angle) * force;
    }, {passive: false});

    stickBase.addEventListener('touchend', e => {
      e.preventDefault();
      this.stick.active = false;
      this.stick.x = 0;
      this.stick.y = 0;
    }, {passive: false});

    // Fire Button
    fireBtn.addEventListener('touchstart', e => { e.preventDefault(); this.keys.add('Space'); }, {passive: false});
    fireBtn.addEventListener('touchend', e => { e.preventDefault(); this.keys.delete('Space'); }, {passive: false});
  }

  get dir() {
    let x = 0, y = 0;
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) y -= 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) y += 1;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) x += 1;
    
    if (this.stick.active) {
      x = this.stick.x;
      y = this.stick.y;
    }
    return { x, y };
  }

  get fire() { return this.keys.has('Space') || this.keys.has('KeyZ'); }
}

class Particle {
  constructor(x, y, color, type = 'spark') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1.0;
    this.decay = Math.random() * 0.03 + 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.vx *= 0.95; // Drag
    this.vy *= 0.95;
  }

  draw(ctx) {
    if (this.life <= 0) return; // FIX: Prevent drawing if life is invalid

    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    
    if (this.type === 'glow') {
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
    }
    
    ctx.beginPath();
    // FIX: Ensure radius is never negative using Math.max(0, ...)
    ctx.arc(this.x, this.y, Math.max(0, this.life * 4), 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;
  }
}

class Kanata {
  constructor(game) {
    this.game = game;
    this.x = 100;
    this.y = CFG.h / 2;
    this.w = 60;
    this.h = 50;
    this.cooldown = 0;
    this.tick = 0;
    
    // Pre-define complex paths using Path2D for performance
    this.wingPath = new Path2D("M0,0 Q30,-20 60,0 Q40,10 0,0"); 
  }

  update() {
    const dir = this.game.input.dir;
    this.x += dir.x * CFG.physics.playerSpeed;
    this.y += dir.y * CFG.physics.playerSpeed;

    // Boundaries
    this.x = Math.max(20, Math.min(CFG.w - 50, this.x));
    this.y = Math.max(20, Math.min(CFG.h - 50, this.y));

    // Shooting
    if (this.game.input.fire && this.cooldown <= 0) {
      this.game.spawnBullet(this.x + 40, this.y, 0);
      this.game.spawnBullet(this.x + 40, this.y, -0.15); // Spread
      this.game.spawnBullet(this.x + 40, this.y, 0.15);
      this.cooldown = 6;
    }
    if (this.cooldown > 0) this.cooldown--;
    this.tick++;
  }

  draw(ctx) {
    const bob = Math.sin(this.tick * 0.1) * 5;
    const y = this.y + bob;

    ctx.save();
    ctx.translate(this.x, y);

    // 1. Wings (Back)
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.shadowBlur = 15;
    
    ctx.save();
    ctx.translate(-20, -10);
    ctx.rotate(-0.2);
    ctx.fill(this.wingPath); // Top wing
    ctx.restore();
    
    ctx.save();
    ctx.translate(-20, 10);
    ctx.scale(1, -1); // Mirror bottom wing
    ctx.fill(this.wingPath);
    ctx.restore();
    ctx.shadowBlur = 0;

    // 2. Body (Modern RoundRect)
    ctx.fillStyle = CFG.colors.kanata;
    ctx.beginPath();
    ctx.roundRect(-15, -15, 30, 30, 8);
    ctx.fill();

    // 3. Head
    ctx.fillStyle = '#ffe4c4'; // Skin
    ctx.beginPath();
    ctx.arc(0, -20, 18, 0, Math.PI*2);
    ctx.fill();

    // 4. Hair (Silver)
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(0, -22, 20, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();
    // Bangs
    ctx.beginPath();
    ctx.moveTo(-18, -20);
    ctx.quadraticCurveTo(0, -10, 18, -20);
    ctx.fill();

    // 5. Halo (Glowing Ring)
    ctx.strokeStyle = CFG.colors.halo;
    ctx.lineWidth = 3;
    ctx.shadowColor = CFG.colors.halo;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, -45, 15, 5, 0, 0, Math.PI*2);
    ctx.stroke();

    // 6. Shuriken (if shooting)
    if (this.cooldown > 3) {
      ctx.fillStyle = '#bae6fd';
      ctx.shadowColor = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(30, 5, 8, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.restore();
  }
}

class MeatBoss {
  constructor(game) {
    this.game = game;
    this.x = CFG.w / 2 - 150;
    this.y = CFG.h / 2 - 100;
    this.w = 300;
    this.h = 200;
    this.maxHp = 1000;
    this.hp = this.maxHp;
    this.shake = 0;
    this.pulse = 0;
  }

  hit() {
    this.hp -= 15;
    this.shake = 10;
    this.game.addParticles(this.x + Math.random()*this.w, this.y + Math.random()*this.h, '#ef4444', 3);
  }

  update() {
    if (this.shake > 0) this.shake--;
    this.pulse += 0.1;
  }

  draw(ctx) {
    let shakeX = 0, shakeY = 0;
    if (this.shake > 0) {
      shakeX = (Math.random() - 0.5) * 15;
      shakeY = (Math.random() - 0.5) * 15;
    }

    const scale = 1 + Math.sin(this.pulse) * 0.02;
    const cx = this.x + this.w/2 + shakeX;
    const cy = this.y + this.h/2 + shakeY;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Bone
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(-this.w/2 - 40, -20, this.w + 80, 40, 20);
    ctx.fill();
    // Bone Ends
    ctx.beginPath();
    ctx.arc(-this.w/2 - 40, 0, 30, 0, Math.PI*2);
    ctx.arc(this.w/2 + 40, 0, 30, 0, Math.PI*2);
    ctx.fill();

    // Meat Body - Advanced Gradient
    const grad = ctx.createLinearGradient(0, -this.h/2, 0, this.h/2);
    grad.addColorStop(0, '#fca5a5');
    grad.addColorStop(0.5, '#dc2626');
    grad.addColorStop(1, '#7f1d1d');
    
    ctx.fillStyle = grad;
    
    // Use RoundRect
    ctx.beginPath();
    ctx.roundRect(-this.w/2, -this.h/2, this.w, this.h, 40);
    ctx.fill();
    
    // Glaze/Shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.ellipse(-50, -40, 60, 20, -0.2, 0, Math.PI*2);
    ctx.fill();

    // Marbling (Procedural texture)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-80, -20);
    ctx.quadraticCurveTo(0, 20, 80, -40);
    ctx.moveTo(-60, 30);
    ctx.quadraticCurveTo(20, 60, 100, 10);
    ctx.stroke();

    // Hit Flash
    if (this.shake > 0) {
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.restore();
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false }); // Optimize
    this.resize();
    
    this.input = new InputSystem();
    this.state = 'MENU'; // MENU, GAME, BONUS, OVER
    this.bgOffset = 0;
    this.highScore = 0;
    
    // Assets
    this.stars = Array.from({length: 100}, () => ({
      x: Math.random() * CFG.w,
      y: Math.random() * CFG.h,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 2 + 0.5
    }));

    window.addEventListener('resize', () => this.resize());
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    // Keep internal resolution fixed, scale with CSS
    this.canvas.width = CFG.w;
    this.canvas.height = CFG.h;
    
    const aspect = CFG.w / CFG.h;
    const winAspect = window.innerWidth / window.innerHeight;
    
    if (winAspect > aspect) {
      this.canvas.style.height = '100vh';
      this.canvas.style.width = 'auto';
    } else {
      this.canvas.style.width = '100vw';
      this.canvas.style.height = 'auto';
    }
  }

  init() {
    this.score = 0;
    this.player = new Kanata(this);
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.meat = null;
    this.bonusTimer = 0;
    this.bonusTriggered = false;
    
    this.state = 'GAME';
    
    // UI Reset
    document.getElementById('menu-start').classList.remove('show');
    document.getElementById('menu-over').classList.remove('show');
    document.getElementById('boss-hud').classList.remove('active');
    document.getElementById('bonus-timer').classList.remove('active');
    this.updateUI();
  }

  spawnBullet(x, y, angleOffset) {
    this.bullets.push({
      x, y, 
      vx: Math.cos(angleOffset) * CFG.physics.bulletSpeed,
      vy: Math.sin(angleOffset) * CFG.physics.bulletSpeed,
      dead: false
    });
  }

  addParticles(x, y, color, count) {
    for(let i=0; i<count; i++) {
      this.particles.push(new Particle(x, y, color, 'glow'));
    }
  }

  loop() {
    // Clear
    this.ctx.fillStyle = '#0f172a'; // Deep Blue
    this.ctx.fillRect(0, 0, CFG.w, CFG.h);

    this.drawBackground();

    if (this.state === 'GAME') this.updateGame();
    if (this.state === 'BONUS') this.updateBonus();
    
    // Draw Entities
    if (this.state !== 'MENU') {
      if (this.player) this.player.draw(this.ctx);
      this.drawBullets();
      this.drawEnemies();
      if (this.meat) this.meat.draw(this.ctx);
      this.drawParticles();
    }

    requestAnimationFrame(this.loop);
  }

  drawBackground() {
    this.ctx.fillStyle = '#fff';
    this.stars.forEach(s => {
      s.x -= s.speed * (this.state === 'BONUS' ? 4 : 1); // Warp speed in bonus
      if (s.x < 0) s.x = CFG.w;
      
      const flicker = Math.random() > 0.9 ? 0.5 : 1;
      this.ctx.globalAlpha = flicker;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;
  }

  updateGame() {
    this.player.update();
    
    // Spawn Enemy
    if (Math.random() < 0.02) {
      this.enemies.push({
        x: CFG.w + 50,
        y: Math.random() * (CFG.h - 100) + 50,
        vx: -(Math.random() * 4 + 3),
        hp: 1,
        w: 40, h: 30
      });
    }

    // Logic
    this.updateBullets();
    this.enemies.forEach(e => {
      e.x += e.vx;
      e.y += Math.sin(e.x * 0.02) * 2;
      
      // Hit Player
      if (this.rectIntersect(this.player, e)) this.gameOver();
      
      // Hit Bullet
      this.bullets.forEach(b => {
        if (!b.dead && this.pointRect(b.x, b.y, e)) {
          b.dead = true;
          e.hp--;
          this.addParticles(b.x, b.y, '#bae6fd', 3);
          if (e.hp <= 0) {
            this.score += 100;
            this.addParticles(e.x, e.y, '#a855f7', 8);
          }
        }
      });
    });
    
    this.enemies = this.enemies.filter(e => e.x > -50 && e.hp > 0);
    
    // Trigger Bonus
    if (this.score >= 1000 && !this.bonusTriggered) {
      this.startBonus();
    }
    
    this.updateUI();
  }

  startBonus() {
    this.state = 'BONUS';
    this.bonusTriggered = true;
    this.bonusTimer = 10.0;
    this.meat = new MeatBoss(this);
    this.enemies = []; 
    this.bullets = [];
    
    // Warp Player
    this.player.x = 100;
    this.player.y = CFG.h/2;
    
    // UI Animations
    document.getElementById('boss-hud').classList.add('active');
    document.getElementById('bonus-timer').classList.add('active');
  }

  updateBonus() {
    this.player.update();
    this.meat.update();
    this.bonusTimer -= 1/60;
    
    document.getElementById('bonus-timer').innerText = this.bonusTimer.toFixed(2);
    
    this.updateBullets();
    
    // Hit Meat
    this.bullets.forEach(b => {
      if (!this.meat) return; // FIX: Safety check
      if (!b.dead && this.rectIntersect(b, {x: this.meat.x, y: this.meat.y, w: this.meat.w, h: this.meat.h})) {
        b.dead = true;
        this.meat.hit();
        this.score += 10;
        
        const pct = Math.max(0, this.meat.hp / this.meat.maxHp * 100);
        document.getElementById('boss-bar').style.transform = `scaleX(${pct/100})`;

        if (this.meat.hp <= 0) this.endBonus(true);
      }
    });

    if (this.bonusTimer <= 0) this.endBonus(false);
    this.updateUI();
  }

  endBonus(success) {
    this.state = 'GAME';
    this.meat = null;
    document.getElementById('boss-hud').classList.remove('active');
    document.getElementById('bonus-timer').classList.remove('active');
    
    if (success) {
      this.score += 5000;
      // Massive explosion
      for(let i=0; i<50; i++) this.addParticles(CFG.w/2, CFG.h/2, '#fbbf24', 1);
    }
  }

  updateBullets() {
    this.bullets.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x > CFG.w) b.dead = true;
    });
    this.bullets = this.bullets.filter(b => !b.dead);
  }

  drawBullets() {
    this.ctx.fillStyle = '#7dd3fc';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = '#0ea5e9';
    
    this.bullets.forEach(b => {
      this.ctx.save();
      this.ctx.translate(b.x, b.y);
      this.ctx.rotate(Date.now() / 100);
      // Draw Star shape
      this.ctx.beginPath();
      for (let i=0; i<4; i++) {
        this.ctx.rotate(Math.PI/2);
        this.ctx.lineTo(10, 0);
        this.ctx.lineTo(3, 3);
      }
      this.ctx.fill();
      this.ctx.restore();
    });
    this.ctx.shadowBlur = 0;
  }

  drawEnemies() {
    this.enemies.forEach(e => {
      this.ctx.fillStyle = '#a855f7';
      this.ctx.beginPath();
      this.ctx.moveTo(e.x, e.y);
      this.ctx.lineTo(e.x + e.w, e.y + e.h/2);
      this.ctx.lineTo(e.x, e.y + e.h);
      this.ctx.fill();
      
      // Eye
      this.ctx.fillStyle = '#ef4444';
      this.ctx.beginPath();
      this.ctx.arc(e.x + 10, e.y + e.h/2, 5, 0, Math.PI*2);
      this.ctx.fill();
    });
  }

  drawParticles() {
    this.ctx.globalCompositeOperation = 'lighter'; // Additive blending
    this.particles.forEach(p => {
      p.update();
      p.draw(this.ctx);
    });
    this.particles = this.particles.filter(p => p.life > 0);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  gameOver() {
    this.state = 'OVER';
    if (this.score > this.highScore) this.highScore = this.score;
    document.getElementById('final-score').innerText = this.score;
    document.getElementById('menu-over').classList.add('show');
    document.getElementById('boss-hud').classList.remove('active');
    document.getElementById('bonus-timer').classList.remove('active');
  }

  updateUI() {
    document.getElementById('ui-score').innerText = this.score;
    document.getElementById('ui-high').innerText = this.highScore;
  }

  // Utils
  rectIntersect(r1, r2) {
    return !(r2.x > r1.x + r1.w || r2.x + r2.w < r1.x || r2.y > r1.y + r1.h || r2.y + r2.h < r1.y);
  }
  pointRect(x, y, r) {
    return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  }
}

// Start
const game = new Game();
</script>