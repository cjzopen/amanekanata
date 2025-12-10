---
layout: default
title: 小品遊戲 | 天界檔案館
description: 飛翔的天使。
permalink: /game/
---

  <style>

    /* --- Game Container --- */
    #game-wrapper {
      --color-primary: oklch(70% 0.15 250);
      --color-accent: oklch(85% 0.18 90);
      --color-danger: oklch(60% 0.22 20);
      background-color: #000;
      overflow: hidden;
      color: white;
      display: grid;
      place-items: center;
      position: relative;
      width: 100%;
      height: 600px;
      background: #000;
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
        mix-blend-mode: overlay;
      }
    }

    canvas {
      display: block;
      filter: drop-shadow(0 0 10px rgba(255,255,255,0.1)); 
    }

    /* --- UI Layer --- */
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
        width: 100%;
      }

      .info-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .right-group {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .score-box {
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255,255,255,0.3);
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.5rem;
        font-weight: 700;
        text-shadow: 0 0 5px currentColor;
        white-space: nowrap;
        
        span { font-variant-numeric: tabular-nums; }
      }
      
      .level-indicator {
        font-size: 1.2rem;
        color: #fff;
        text-shadow: 0 0 10px var(--color-primary);
        font-style: italic;
      }
      
      .btn-icon {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 1;
        transition: all 0.2s;
        backdrop-filter: blur(4px);
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        
        &:active {
          transform: scale(0.95);
        }
      }
    }

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

      &.active { opacity: 1; }

      .label {
        color: var(--color-danger);
        font-weight: bold;
        text-shadow: 0 0 10px var(--color-danger);
        letter-spacing: 2px;
        font-size: 1.2rem;
      }

      .bar-container {
        width: 100%;
        height: 16px;
        background: rgba(0,0,0,0.8);
        border: 2px solid rgba(255,255,255,0.5);
        border-radius: 99px;
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        width: 100%;
        background: linear-gradient(90deg, #f87171, #dc2626);
        box-shadow: 0 0 15px #ef4444;
        transform-origin: left;
        transition: transform 0.1s linear;
      }
    }

    #mode-flash {
      position: absolute;
      inset: 0;
      background: rgba(255, 0, 0, 0.2);
      display: grid;
      place-items: center;
      opacity: 0;
      transition: opacity 0.5s;
      z-index: 10;
      
      &.active { opacity: 1; }
      
      h2 {
        font-size: 6rem;
        color: white;
        text-transform: uppercase;
        transform: rotate(-5deg);
        text-shadow: 5px 5px 0px #ff0000;
        animation: pulse 0.5s infinite alternate;
      }
    }

    @keyframes pulse {
      from { transform: rotate(-5deg) scale(1); }
      to { transform: rotate(-5deg) scale(1.1); }
    }

    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: rgba(20, 20, 30, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 40px 60px;
      border-radius: 24px;
      text-align: center;
      z-index: 100;
      pointer-events: auto;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      min-width: 400px;

      &.show {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%) scale(1);
      }

      h1 {
        font-size: 2.5rem;
        margin: 0 0 15px;
        color: #7dd3fc;
        text-shadow: 0 0 20px rgba(125, 211, 252, 0.6);
      }

      p {
        color: #a1a1aa;
        margin-bottom: 30px;
        line-height: 1.6;
      }
    }

    .btn-start {
      background: #0ea5e9;
      border: none;
      padding: 16px 48px;
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      border-radius: 99px;
      transition: transform 0.2s, box-shadow 0.2s;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px #0ea5e9;
      }
    }

    #touch-layer {
      display: none;
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
        background: rgba(255,255,255,0.1);
        border: 2px dashed rgba(255,255,255,0.2);
        border-radius: 50%;
      }

      .btn-fire {
        position: absolute;
        bottom: 40px;
        right: 40px;
        width: 100px;
        height: 100px;
        border-radius: 30px;
        background: rgba(255, 50, 50, 0.3);
        border: 2px solid rgba(255, 50, 50, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 900;
        color: white;
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>

<div id="game-wrapper">
  <canvas id="gameCanvas"></canvas>
  
  <div id="mode-flash">
    <h2>GORILLA MODE</h2>
  </div>
  
  <div id="ui-layer">
    <div class="hud-top">
      <div class="info-group">
        <div class="score-box" style="border-left: 4px solid var(--color-primary);">
          SCORE <span id="ui-score">0</span>
        </div>
        <div class="level-indicator" id="ui-level">LEVEL 1</div>
      </div>
      
      <div class="right-group">
        <button class="btn-icon" id="btn-fullscreen" title="切換全螢幕">⛶</button>
      </div>
    </div>
    
    <div class="boss-hud" id="boss-hud">
      <div class="label" id="boss-label">MEAT INTEGRITY</div>
      <div class="bar-container">
        <div class="bar-fill" id="boss-bar"></div>
      </div>
    </div>
  </div>

  <!-- Main Menu -->
  <div id="menu-start" class="modal show">
    <h1>天音彼方<br>肉肉粉碎者 DX</h1>
    <p>
      普通關卡：射擊敵人 (Z鍵 / 點擊)<br>
      Bonus Stage：變身猩猩，歐拉歐拉打肉！<br>
    </p>
    <button class="btn-start" onclick="game.init()">MISSION START</button>
  </div>

  <!-- Game Over -->
  <div id="menu-over" class="modal">
    <h1>MISSION FAILED</h1>
    <p>FINAL SCORE: <span id="final-score">0</span></p>
    <p id="ending-hint" style="color: #f87171; font-size: 0.9rem"></p>
    <button class="btn-start" onclick="game.init()">RETRY</button>
  </div>

  <!-- Ending Screen -->
  <div id="menu-ending" class="modal">
    <h1 style="color: #f472b6; text-shadow: 0 0 20px #f472b6;">LEGENDARY REUNION</h1>
    <p>你證明了猩猩的力量。<br>與傳說之龍再次相遇...</p>
    <p style="font-size: 1.5rem; color: white;">FINAL SCORE: <span id="end-score">0</span></p>
    <button class="btn-start" onclick="game.init()">PLAY AGAIN</button>
  </div>

  <div id="touch-layer">
    <div class="stick-area" id="stick-base"></div>
    <div class="btn-fire" id="btn-fire">ORA!</div>
  </div>
</div>

<script>
const CFG = {
  w: 1280,
  h: 720,
  physics: {
    playerSpeed: 8,
    bulletSpeed: 18,
    gorillaSpeed: 12,
    friction: 0.15
  },
  colors: {
    kanata: '#7dd3fc', 
    halo: '#fde047',
    meat: '#ef4444'
  },
  endingThreshold: 250000 
};

const LEVELS = [
  {
    id: 0,
    name: 'AMONG US',
    bg: 'space',
    primaryColor: '#3b82f6',
    enemyType: 'impostor',
    duration: 1000 
  },
  {
    id: 1,
    name: 'UNDERTALE',
    bg: 'undertale',
    primaryColor: '#ffffff',
    enemyType: 'bone',
    duration: 1200
  },
  {
    id: 2,
    name: 'MUSIC MAKER',
    bg: 'daw',
    primaryColor: '#10b981',
    enemyType: 'note',
    duration: 1200
  },
  {
    id: 3,
    name: 'POWER PRO',
    bg: 'stadium',
    primaryColor: '#fbbf24',
    enemyType: 'baseball',
    duration: 1400
  },
  {
    id: 4,
    name: 'KIDNEY STONE',
    bg: 'body',
    primaryColor: '#f87171',
    enemyType: 'stone', 
    duration: 1500
  }
];

class InputSystem {
  constructor() {
    this.keys = new Set();
    this.stick = { active: false, x: 0, y: 0 };
    
    window.addEventListener('keydown', e => this.keys.add(e.code));
    window.addEventListener('keyup', e => this.keys.delete(e.code));

    const stickBase = document.getElementById('stick-base');
    const fireBtn = document.getElementById('btn-fire');

    if (window.matchMedia("(pointer: coarse)").matches) {
      document.getElementById('touch-layer').style.display = 'block';
    }

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
      const dist = Math.hypot(dx, dy);
      const maxDist = 50;
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
    this.vx *= 0.95;
    this.vy *= 0.95;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    if (this.type === 'glow') {
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
    }
    ctx.beginPath();
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
    this.w = 50;
    this.h = 50;
    this.mode = 'ANGEL'; 
    this.appearance = 'K1'; // K1, K2, K3
    this.cooldown = 0;
    this.tick = 0;
    this.wingPath = new Path2D("M0,0 Q30,-20 60,0 Q40,10 0,0"); 
  }

  updateAppearance(levelIndex) {
    if (levelIndex >= 4) this.appearance = 'K3';
    else if (levelIndex >= 2) this.appearance = 'K2';
    else this.appearance = 'K1';
  }

  setMode(mode) {
    this.mode = mode;
    this.w = mode === 'GORILLA' ? 80 : 50;
    this.h = mode === 'GORILLA' ? 80 : 50;
    for(let i=0; i<20; i++) {
        this.game.addParticles(this.x, this.y, '#fff', 1);
    }
  }

  update() {
    const dir = this.game.input.dir;
    const speed = this.mode === 'GORILLA' ? CFG.physics.gorillaSpeed : CFG.physics.playerSpeed;
    this.x += dir.x * speed;
    this.y += dir.y * speed;

    this.x = Math.max(20, Math.min(CFG.w - this.w, this.x));
    this.y = Math.max(20, Math.min(CFG.h - this.h, this.y));

    if (this.game.input.fire && this.cooldown <= 0) {
      if (this.mode === 'ANGEL') {
        // UPDATED: Projectile type based on appearance
        const type = this.appearance === 'K3' ? 'bullet' : 'shuriken';
        this.game.spawnBullet(this.x + 40, this.y, 0, type);
        this.game.spawnBullet(this.x + 40, this.y, -0.15, type); 
        this.game.spawnBullet(this.x + 40, this.y, 0.15, type);
        this.cooldown = 6;
      } else {
        this.game.spawnBullet(this.x + 60, this.y, 0, 'fist');
        this.cooldown = 10;
        this.game.shake = 5;
      }
    }
    if (this.cooldown > 0) this.cooldown--;
    this.tick++;
  }

  draw(ctx) {
    const bob = Math.sin(this.tick * 0.1) * 5;
    const y = this.y + bob;

    ctx.save();
    ctx.translate(this.x, y);

    if (this.mode === 'ANGEL') {
        if (this.appearance === 'K3') this.drawK3(ctx);
        else if (this.appearance === 'K2') this.drawK2(ctx);
        else this.drawK1(ctx);
    } else {
        this.drawGorilla(ctx);
    }

    ctx.restore();
  }

  // K1: Original Angel (Blue/White)
  drawK1(ctx) {
    // White Wings
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(255,255,255,0.8)'; ctx.shadowBlur = 15;
    ctx.save(); ctx.translate(-20, -10); ctx.rotate(-0.2); ctx.fill(this.wingPath); ctx.restore();
    ctx.save(); ctx.translate(-20, 10); ctx.scale(1, -1); ctx.fill(this.wingPath); ctx.restore();
    ctx.shadowBlur = 0;

    // Body (Classic Blue Dress)
    ctx.fillStyle = '#3b82f6'; 
    ctx.beginPath(); ctx.roundRect(-15, -15, 30, 30, 8); ctx.fill();
    // White Apron/Trim
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.roundRect(-10, -15, 20, 15, 4); ctx.fill();

    // Head
    ctx.fillStyle = '#ffe4c4'; ctx.beginPath(); ctx.arc(0, -20, 18, 0, Math.PI*2); ctx.fill();

    // Hair (Silver)
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(0, -22, 20, Math.PI * 0.8, Math.PI * 2.2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-18, -20); ctx.quadraticCurveTo(0, -10, 18, -20); ctx.fill();

    // Golden Halo
    ctx.strokeStyle = CFG.colors.halo; ctx.lineWidth = 3; ctx.shadowColor = CFG.colors.halo; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.ellipse(0, -45, 15, 5, 0, 0, Math.PI*2); ctx.stroke();
  }

  // K2: Cat Ear Hoodie (Blue/White)
  drawK2(ctx) {
    // White Wings
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(255,255,255,0.8)'; ctx.shadowBlur = 15;
    ctx.save(); ctx.translate(-20, -10); ctx.rotate(-0.2); ctx.fill(this.wingPath); ctx.restore();
    ctx.save(); ctx.translate(-20, 10); ctx.scale(1, -1); ctx.fill(this.wingPath); ctx.restore();
    ctx.shadowBlur = 0;

    // Body (Blue Hoodie)
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.roundRect(-15, -15, 30, 30, 8); ctx.fill();
    // White Inner Shirt
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.roundRect(-10, -5, 20, 15, 4); ctx.fill();

    // Head
    ctx.fillStyle = '#ffe4c4'; ctx.beginPath(); ctx.arc(0, -20, 18, 0, Math.PI*2); ctx.fill();

    // Hair
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(0, -22, 20, Math.PI * 0.8, Math.PI * 2.2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-18, -20); ctx.quadraticCurveTo(0, -10, 18, -20); ctx.fill();

    // Cat Ears (Hoodie part)
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.moveTo(-15, -40); ctx.lineTo(-5, -55); ctx.lineTo(5, -40); ctx.fill();
    ctx.beginPath(); ctx.moveTo(15, -40); ctx.lineTo(5, -55); ctx.lineTo(-5, -40); ctx.fill();

    // Golden Halo
    ctx.strokeStyle = CFG.colors.halo; ctx.lineWidth = 3; ctx.shadowColor = CFG.colors.halo; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.ellipse(0, -50, 15, 5, 0, 0, Math.PI*2); ctx.stroke();

    // Tail
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-15, 10); ctx.quadraticCurveTo(-30, 20, -20, 30); ctx.stroke();
  }

  // K3: Dark Angel (Black/Gold)
  drawK3(ctx) {
    // Black Wings
    ctx.fillStyle = '#0f172a';
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 15;
    ctx.save(); ctx.translate(-20, -10); ctx.rotate(-0.2); ctx.fill(this.wingPath); ctx.restore();
    ctx.save(); ctx.translate(-20, 10); ctx.scale(1, -1); ctx.fill(this.wingPath); ctx.restore();
    ctx.shadowBlur = 0;

    // Body (Black Goth Dress)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.roundRect(-15, -15, 30, 30, 8); ctx.fill();
    // Gold Trim/Ribbon
    ctx.fillStyle = CFG.colors.halo;
    ctx.beginPath(); ctx.roundRect(-10, -5, 20, 5, 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -5); ctx.lineTo(-5, 5); ctx.lineTo(5, 5); ctx.fill();

    // Head
    ctx.fillStyle = '#ffe4c4'; ctx.beginPath(); ctx.arc(0, -20, 18, 0, Math.PI*2); ctx.fill();

    // Hair
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(0, -22, 20, Math.PI * 0.8, Math.PI * 2.2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-18, -20); ctx.quadraticCurveTo(0, -10, 18, -20); ctx.fill();

    // Black Halo
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.shadowColor = '#0f172a'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.ellipse(0, -45, 15, 5, 0, 0, Math.PI*2); ctx.stroke();

    // Shuriken on Head (Spinning)
    ctx.save();
    ctx.translate(0, -55);
    ctx.rotate(Date.now() / 200);
    ctx.fillStyle = CFG.colors.halo;
    ctx.beginPath();
    for (let i=0; i<4; i++) { ctx.rotate(Math.PI/2); ctx.lineTo(8, 0); ctx.lineTo(2, 2); }
    ctx.fill();
    ctx.restore();
  }

  // Gorilla: Silverback with Kanata's face
  drawGorilla(ctx) {
    // Muscular Body (Silver/Grey Fur)
    ctx.fillStyle = '#475569'; 
    // Torso
    ctx.beginPath(); ctx.ellipse(0, -5, 50, 45, 0, 0, Math.PI*2); ctx.fill();
    // Silver Back Patch
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath(); ctx.ellipse(-10, -15, 30, 25, 0.2, 0, Math.PI*2); ctx.fill();
    
    ctx.fillStyle = '#475569';
    // Huge Arms
    const punchOffset = this.cooldown > 5 ? 30 : 0;
    ctx.beginPath(); ctx.ellipse(40 + punchOffset, 0, 30, 25, 0, 0, Math.PI*2); ctx.fill(); // Right arm
    ctx.beginPath(); ctx.ellipse(-40, 0, 25, 20, 0, 0, Math.PI*2); ctx.fill(); // Left arm

    // Head Area
    ctx.fillStyle = '#334155'; // Darker head fur
    ctx.beginPath(); ctx.arc(0, -30, 25, 0, Math.PI*2); ctx.fill();

    // Face (Kanata's features on Gorilla)
    ctx.fillStyle = '#ffe4c4'; // Skin
    ctx.beginPath(); ctx.ellipse(0, -25, 15, 12, 0, 0, Math.PI*2); ctx.fill();
    
    // Hair
    ctx.fillStyle = '#e2e8f0'; 
    ctx.beginPath(); ctx.arc(0, -38, 15, Math.PI * 0.8, Math.PI * 2.2); ctx.fill();
    
    // Serious Eyes
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-6, -25, 4, 2, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(6, -25, 4, 2, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#000'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-4, -20); ctx.lineTo(4, -20); ctx.stroke(); // Mouth

    // Halo (Cracked/Tilted)
    ctx.strokeStyle = CFG.colors.halo; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(10, -65, 15, 5, 0.5, 0, Math.PI*2); ctx.stroke();
  }
}

class MeatBoss {
  constructor(game) {
    this.game = game;
    this.x = CFG.w / 2 + 100;
    this.y = CFG.h / 2;
    this.w = 250;
    this.h = 180;
    this.maxHp = 2000;
    this.hp = this.maxHp;
    this.shake = 0;
  }
  hit(damage) {
    this.hp -= damage;
    this.shake = 10;
    this.game.addParticles(this.x + Math.random()*this.w - this.w/2, this.y + Math.random()*this.h - this.h/2, '#ef4444', 3);
  }
  update() { if (this.shake > 0) this.shake--; }
  draw(ctx) {
    let sx = 0, sy = 0;
    if (this.shake > 0) { sx = (Math.random()-0.5)*15; sy = (Math.random()-0.5)*15; }
    ctx.save();
    ctx.translate(this.x + sx, this.y + sy);
    
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath(); ctx.roundRect(-this.w/2 - 40, -20, this.w + 80, 40, 20); ctx.fill();
    ctx.beginPath(); ctx.arc(-this.w/2 - 40, 0, 30, 0, Math.PI*2); ctx.arc(this.w/2 + 40, 0, 30, 0, Math.PI*2); ctx.fill();

    const grad = ctx.createLinearGradient(0, -this.h/2, 0, this.h/2);
    grad.addColorStop(0, '#fca5a5'); grad.addColorStop(0.5, '#dc2626'); grad.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(-this.w/2, -this.h/2, this.w, this.h, 40); ctx.fill();
    
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-80, -20); ctx.quadraticCurveTo(0, 20, 80, -40); ctx.stroke();

    if (this.shake > 0) {
      ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = '#fff'; ctx.fill(); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();
  }
}

class CocoDragon {
  constructor(game) {
    this.game = game;
    this.x = CFG.w + 200;
    this.y = CFG.h / 2;
    this.destX = CFG.w / 2 + 100;
    this.frame = 0;
  }
  update() {
    this.frame++;
    this.x += (this.destX - this.x) * 0.02;
    this.y += Math.sin(this.frame * 0.05) * 2;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    // Body - Pink bean shape
    ctx.fillStyle = '#f9a8d4'; // Light Pink
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    
    // Tail
    ctx.beginPath();
    ctx.moveTo(-50, 40);
    ctx.quadraticCurveTo(80, 80, 150, -20); // Tail up
    ctx.lineTo(130, -30);
    ctx.quadraticCurveTo(70, 50, -30, 20);
    ctx.fill(); ctx.stroke();

    // Main Body (Round)
    ctx.beginPath();
    ctx.ellipse(0, 20, 90, 70, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

    // Legs (Stubby)
    ctx.fillStyle = '#f9a8d4';
    const leg = (x, y) => {
        ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        // Claws
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(x-5, y+10, 4, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y+12, 4, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x+5, y+10, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#f9a8d4'; // Reset
    };
    leg(-40, 80); leg(40, 80); leg(-60, 60); leg(60, 60);

    // Wings (Yellow/Orange)
    ctx.fillStyle = '#fbbf24'; // Golden
    ctx.save();
    ctx.translate(30, -30);
    ctx.rotate(-0.2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(80, -60);
    ctx.quadraticCurveTo(60, 0, 40, -10);
    ctx.lineTo(0, 0);
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // Head/Neck area
    ctx.save();
    ctx.rotate(-0.1);
    ctx.translate(-80, -40);
    
    // Neck
    ctx.fillStyle = '#f9a8d4';
    ctx.beginPath(); ctx.ellipse(20, 20, 40, 30, 0, 0, Math.PI*2); ctx.fill(); 
    // Head shape
    ctx.beginPath();
    ctx.ellipse(0, 0, 60, 50, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

    // Snout
    ctx.beginPath();
    ctx.ellipse(-40, 10, 30, 25, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Nostril
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(-55, 5, 2, 0, Math.PI*2); ctx.fill();

    // Horns (Purple, curved)
    ctx.fillStyle = '#6b21a8'; // Purple
    ctx.beginPath();
    ctx.moveTo(10, -30);
    ctx.quadraticCurveTo(40, -70, 0, -80);
    ctx.quadraticCurveTo(-10, -60, 0, -30);
    ctx.fill(); ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-20, -30);
    ctx.quadraticCurveTo(-60, -70, -80, -60);
    ctx.quadraticCurveTo(-50, -50, -30, -25);
    ctx.fill(); ctx.stroke();

    // Derpy Eyes (White with black pupils)
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(-10, -10, 15, 20, -0.2, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-35, -5, 15, 20, 0.2, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(-5, -10, 5, 0, Math.PI*2); ctx.fill(); // Left pupil
    ctx.beginPath(); ctx.arc(-40, -5, 5, 0, Math.PI*2); ctx.fill(); // Right pupil looking different way

    // Mouth
    ctx.beginPath(); ctx.arc(-40, 25, 10, 0, Math.PI, false); ctx.stroke();

    ctx.restore();
    ctx.restore();
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.resize();
    this.input = new InputSystem();
    
    this.stars = Array.from({length: 100}, () => ({
      x: Math.random() * CFG.w, y: Math.random() * CFG.h,
      size: Math.random() * 2 + 1, speed: Math.random() * 2 + 0.5
    }));
    
    this.state = 'MENU';
    this.shake = 0;

    window.addEventListener('resize', () => this.resize());
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
    
    document.getElementById('btn-fullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.getElementById('game-wrapper').requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }

  resize() {
    this.canvas.width = CFG.w;
    this.canvas.height = CFG.h;
    const aspect = CFG.w / CFG.h;
    const winAspect = window.innerWidth / window.innerHeight;
    if (winAspect > aspect) { this.canvas.style.height = '100vh'; this.canvas.style.width = 'auto'; }
    else { this.canvas.style.width = '100vw'; this.canvas.style.height = 'auto'; }
  }

  init() {
    this.score = 0;
    this.levelIndex = 0;
    this.levelTimer = 0;
    this.player = new Kanata(this);
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.meat = null;
    this.coco = null;
    this.startLevel(0);
  }

  startLevel(idx) {
    this.meat = null;

    if (idx >= LEVELS.length) {
      if (this.score >= CFG.endingThreshold) {
        this.startEnding();
      } else {
        // No loop, just end
        this.gameOver();
      }
      return;
    }
    
    this.levelIndex = idx;
    this.currentLevel = LEVELS[idx];
    this.levelTimer = this.currentLevel.duration;
    this.state = 'GAME';
    this.player.setMode('ANGEL');
    this.player.updateAppearance(idx); // UPDATED: Set appearance based on level
    
    document.getElementById('ui-level').innerText = this.currentLevel.name;
    document.getElementById('mode-flash').classList.remove('active');
    document.getElementById('boss-hud').classList.remove('active');
    document.getElementById('menu-start').classList.remove('show');
    document.getElementById('menu-over').classList.remove('show');
    document.getElementById('menu-ending').classList.remove('show');
  }

  startBonus() {
    this.state = 'BONUS';
    this.bonusTimer = 10.0;
    this.meat = new MeatBoss(this);
    this.enemies = [];
    this.bullets = [];
    this.player.x = 100;
    this.player.y = CFG.h/2;
    this.player.setMode('GORILLA');

    document.getElementById('mode-flash').classList.add('active');
    setTimeout(() => document.getElementById('mode-flash').classList.remove('active'), 1000);
    document.getElementById('boss-hud').classList.add('active');
    document.getElementById('boss-label').innerText = "SMASH THE MEAT!";
  }

  startEnding() {
    this.state = 'ENDING';
    this.enemies = [];
    this.bullets = [];
    this.meat = null;
    this.coco = new CocoDragon(this);
    this.player.setMode('ANGEL');
    this.player.x = 200;
    
    setTimeout(() => {
       document.getElementById('end-score').innerText = this.score;
       document.getElementById('menu-ending').classList.add('show');
    }, 4000);
  }

  spawnBullet(x, y, angleOffset, type) {
    const isMelee = type === 'fist';
    const speed = isMelee ? 0 : (type === 'laser' ? 25 : CFG.physics.bulletSpeed);
    const life = isMelee ? 5 : 100;
    
    // UPDATED: Bullet Color based on type/appearance
    let color = '#7dd3fc';
    if (type === 'laser') color = '#fff';
    else if (this.player && this.player.appearance === 'K1') color = '#fbbf24'; // Gold for K1
    else if (this.player && this.player.appearance === 'K3') color = '#fbbf24'; // Gold for K3 bullets

    this.bullets.push({
      x, y,
      vx: Math.cos(angleOffset) * speed,
      vy: Math.sin(angleOffset) * speed,
      type: type,
      w: isMelee ? 80 : (type === 'bullet' ? 15 : 20),
      h: isMelee ? 60 : (type === 'laser' ? 10 : (type === 'bullet' ? 10 : 20)),
      life: life,
      dead: false,
      color: color
    });
  }

  addParticles(x, y, color, count) {
    for(let i=0; i<count; i++) this.particles.push(new Particle(x, y, color, 'glow'));
  }

  loop() {
    let shakeX = 0, shakeY = 0;
    if (this.shake > 0) {
        shakeX = (Math.random()-0.5)*10;
        shakeY = (Math.random()-0.5)*10;
        this.shake--;
    }

    this.ctx.save();
    this.ctx.translate(shakeX, shakeY);

    this.drawBackground();

    if (this.state === 'GAME') this.updateGame();
    if (this.state === 'BONUS') this.updateBonus();
    if (this.state === 'ENDING') this.updateEnding();

    if (this.state !== 'MENU') {
      if (this.coco) this.coco.draw(this.ctx);
      if (this.player) this.player.draw(this.ctx);
      this.drawBullets();
      this.drawEnemies();
      if (this.meat) this.meat.draw(this.ctx);
      this.drawParticles();
    }
    
    this.ctx.restore();
    requestAnimationFrame(this.loop);
  }

  drawBackground() {
    const lvl = this.currentLevel || LEVELS[0];
    
    if (lvl.bg === 'undertale') this.ctx.fillStyle = '#000';
    else if (lvl.bg === 'daw') this.ctx.fillStyle = '#0f172a';
    else if (lvl.bg === 'stadium') this.ctx.fillStyle = '#15803d'; // Green Grass
    else if (lvl.bg === 'body') this.ctx.fillStyle = '#450a0a';
    else this.ctx.fillStyle = '#020617'; 

    this.ctx.fillRect(0, 0, CFG.w, CFG.h);

    if (lvl.bg === 'space') {
       this.drawStars();
    } else if (lvl.bg === 'undertale') {
       this.ctx.strokeStyle = '#fff';
       this.ctx.lineWidth = 4;
       this.ctx.strokeRect(50, 50, CFG.w - 100, CFG.h - 100);
    } else if (lvl.bg === 'daw') {
       this.ctx.strokeStyle = '#1e293b';
       this.ctx.lineWidth = 2;
       for(let i=0; i<CFG.w; i+=100) {
           this.ctx.beginPath(); this.ctx.moveTo(i - (this.levelTimer%100), 0); this.ctx.lineTo(i - (this.levelTimer%100), CFG.h); this.ctx.stroke();
       }
       this.ctx.fillStyle = '#334155';
       this.ctx.fillRect(0, 0, 50, CFG.h);
    } else if (lvl.bg === 'stadium') {
        this.ctx.save();
        const centerX = CFG.w / 2;
        const centerY = CFG.h / 2;
        
        this.ctx.fillStyle = '#a16207'; 
        this.ctx.beginPath(); 
        this.ctx.arc(centerX, centerY + 100, 300, 0, Math.PI*2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(centerX - 10, centerY + 250, 20, 20); 
        this.ctx.fillRect(centerX + 150, centerY + 100, 20, 20); 
        this.ctx.fillRect(centerX - 10, centerY - 50, 20, 20); 
        this.ctx.fillRect(centerX - 170, centerY + 100, 20, 20); 
        
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY + 260); this.ctx.lineTo(centerX + 500, centerY - 240); 
        this.ctx.moveTo(centerX, centerY + 260); this.ctx.lineTo(centerX - 500, centerY - 240); 
        this.ctx.stroke();

        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(centerX - 200, 20, 400, 100);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(centerX - 190, 30, 380, 80);
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.fillRect(centerX - 180, 40, 300, 5);
        this.ctx.fillRect(centerX - 180, 60, 300, 5);
        
        this.ctx.restore();
    } else if (lvl.bg === 'body') {
        this.ctx.strokeStyle = '#7f1d1d';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 100); this.ctx.bezierCurveTo(300, 50, 600, 150, CFG.w, 100);
        this.ctx.stroke();
    }
  }

  drawStars() {
    this.ctx.fillStyle = '#fff';
    this.stars.forEach(s => {
      s.x -= s.speed;
      if (s.x < 0) s.x = CFG.w;
      this.ctx.beginPath(); this.ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); this.ctx.fill();
    });
  }

  updateGame() {
    this.player.update();
    this.levelTimer--;
    
    if (this.levelTimer <= 0) {
        this.startBonus();
        return;
    }

    if (Math.random() < 0.03) {
      const y = Math.random() * (CFG.h - 100) + 50;
      let eType = this.currentLevel.enemyType;
      let subType = 0;
      let col = '#fff';

      if (eType === 'impostor') {
          const cols = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#f472b6', '#a855f7'];
          col = cols[Math.floor(Math.random() * cols.length)];
      }
      
      if (eType === 'note') subType = Math.floor(Math.random() * 4);
      
      if (this.currentLevel.id === 1 && Math.random() < 0.2) {
          eType = 'blaster';
      }
      
      if (this.currentLevel.id === 4) {
          const r = Math.random();
          if (r < 0.3) eType = 'biboo';
          else if (r < 0.6) eType = 'pebble';
      }

      this.enemies.push({
        x: CFG.w + 50, y: y,
        vx: -(Math.random() * 4 + 3),
        vy: (Math.random() - 0.5) * 2, 
        wave: Math.random() * 0.1,
        hp: eType === 'blaster' ? 5 : 2,
        w: eType === 'blaster' ? 60 : 40, 
        h: eType === 'blaster' ? 60 : 40,
        type: eType,
        subType: subType, 
        color: col,
        timer: 0
      });
    }

    this.updatePhysics();
    document.getElementById('ui-score').innerText = this.score;
  }

  updateBonus() {
    this.player.update();
    if (this.meat) this.meat.update();
    this.bonusTimer -= 1/60;
    
    if (this.bonusTimer > 0) document.getElementById('ui-level').innerText = `BONUS TIME: ${this.bonusTimer.toFixed(1)}`;
    else document.getElementById('ui-level').innerText = "TIME UP";

    this.updatePhysics();

    if (this.bonusTimer <= 0) {
        this.startLevel(this.levelIndex + 1);
    }
  }
  
  updateEnding() {
      if(this.coco) this.coco.update();
      if(this.player) {
          this.player.y += (this.coco.y - this.player.y) * 0.05;
          this.player.x += ((this.coco.x - 200) - this.player.x) * 0.05;
      }
      this.addParticles(this.coco.x, this.coco.y, '#f472b6', 1);
  }

  updatePhysics() {
    this.bullets.forEach(b => {
        if (b.type === 'fist') {
             b.x = this.player.x + 60; 
             b.y = this.player.y;
             b.life--;
        } else {
             b.x += b.vx; b.y += b.vy;
        }
        if (b.life <= 0 || b.x > CFG.w || b.x < 0) b.dead = true;
    });
    this.bullets = this.bullets.filter(b => !b.dead);

    this.enemies.forEach(e => {
        e.timer++;
        
        if (e.type === 'blaster') {
            if (e.x > CFG.w - 150) e.x += e.vx;
            else {
                if (e.timer % 100 === 50) { 
                    this.spawnBullet(e.x, e.y + e.h/2, Math.PI, 'laser');
                }
            }
        } else {
            e.x += e.vx;
            e.y += e.vy + Math.sin(e.timer * e.wave) * 2; 
        }
        
        if (e.y < 50 || e.y > CFG.h - 50) e.vy *= -1;

        if (this.state === 'GAME' && this.rectIntersect(this.player, e)) this.gameOver();
        
        this.bullets.forEach(b => {
           if (!b.dead && this.rectIntersect(b, e)) {
               if (b.type !== 'fist') b.dead = true; 
               e.hp--;
               this.addParticles(e.x, e.y, '#fff', 2);
               if (e.hp <= 0) {
                   this.score += 200;
                   this.addParticles(e.x, e.y, e.color || '#fff', 8);
               }
           }
        });
    });
    this.enemies = this.enemies.filter(e => e.x > -100 && e.hp > 0);

    if (this.state === 'BONUS' && this.meat) {
        this.bullets.forEach(b => {
            if (!b.dead && this.rectIntersect(b, {x: this.meat.x - this.meat.w/2, y: this.meat.y - this.meat.h/2, w: this.meat.w, h: this.meat.h})) {
                if (b.type !== 'fist') b.dead = true;
                this.meat.hit(b.type === 'fist' ? 50 : 10); 
                this.score += b.type === 'fist' ? 100 : 10;
                
                if(b.type === 'fist') {
                    this.shake = 5;
                }
            }
        });
        
        const pct = Math.max(0, this.meat.hp / this.meat.maxHp * 100);
        document.getElementById('boss-bar').style.transform = `scaleX(${pct/100})`;
        if (this.meat.hp <= 0) {
             this.score += 5000;
             this.meat.hp = this.meat.maxHp; 
             document.body.style.backgroundColor = 'white';
             setTimeout(() => document.body.style.backgroundColor = 'black', 50);
        }
    }
  }

  drawEnemies() {
    this.enemies.forEach(e => {
      this.ctx.fillStyle = e.color || '#fff';
      this.ctx.beginPath();
      
      if (e.type === 'impostor') {
          this.ctx.fillStyle = e.color;
          this.ctx.roundRect(e.x, e.y, 30, 40, 15);
          this.ctx.fill();
          this.ctx.fillStyle = '#bae6fd'; 
          this.ctx.beginPath(); this.ctx.ellipse(e.x+20, e.y+15, 10, 8, 0, 0, Math.PI*2); this.ctx.fill();
      } else if (e.type === 'bone') {
          this.ctx.fillRect(e.x+10, e.y, 10, 40);
          this.ctx.beginPath(); this.ctx.arc(e.x+15, e.y, 8, 0, Math.PI*2); this.ctx.fill();
          this.ctx.beginPath(); this.ctx.arc(e.x+15, e.y+40, 8, 0, Math.PI*2); this.ctx.fill();
      } else if (e.type === 'blaster') {
          this.ctx.fillStyle = '#fff';
          this.ctx.beginPath();
          this.ctx.moveTo(e.x + 40, e.y); 
          this.ctx.lineTo(e.x, e.y + 20); 
          this.ctx.lineTo(e.x + 40, e.y + 40); 
          this.ctx.lineTo(e.x + 30, e.y + 20); 
          this.ctx.fill();
          this.ctx.fillStyle = '#000';
          this.ctx.beginPath(); this.ctx.arc(e.x + 30, e.y + 15, 3, 0, Math.PI*2); this.ctx.fill();
          this.ctx.beginPath(); this.ctx.arc(e.x + 30, e.y + 25, 3, 0, Math.PI*2); this.ctx.fill();
          if (e.timer % 100 > 30 && e.timer % 100 < 50) {
              this.ctx.fillStyle = '#f00';
              this.ctx.beginPath(); this.ctx.arc(e.x, e.y + 20, (e.timer%10), 0, Math.PI*2); this.ctx.fill();
          }
      } else if (e.type === 'note') {
          const ctx = this.ctx;
          ctx.fillStyle = '#10b981';
          ctx.save();
          ctx.translate(e.x, e.y);
          if (e.subType === 0) { 
              ctx.beginPath(); ctx.ellipse(10, 30, 10, 8, -0.2, 0, Math.PI*2); ctx.fill();
              ctx.fillRect(18, 0, 4, 30);
          } else if (e.subType === 1) { 
              ctx.beginPath(); ctx.ellipse(10, 30, 10, 8, -0.2, 0, Math.PI*2); ctx.fill();
              ctx.fillRect(18, 0, 4, 30);
              ctx.beginPath(); ctx.moveTo(22, 0); ctx.quadraticCurveTo(35, 10, 35, 20); ctx.lineTo(22, 10); ctx.fill();
          } else if (e.subType === 2) { 
              ctx.beginPath(); ctx.ellipse(5, 30, 8, 6, -0.2, 0, Math.PI*2); ctx.fill();
              ctx.beginPath(); ctx.ellipse(35, 30, 8, 6, -0.2, 0, Math.PI*2); ctx.fill();
              ctx.fillRect(11, 0, 4, 30); ctx.fillRect(41, 0, 4, 30);
              ctx.fillRect(11, 0, 34, 8); 
          } else { 
               ctx.font = '30px sans-serif'; ctx.fillText('♯', 0, 30);
          }
          ctx.restore();
      } else if (e.type === 'baseball') {
          this.ctx.fillStyle = '#fff';
          this.ctx.beginPath(); this.ctx.arc(e.x+20, e.y+20, 18, 0, Math.PI*2); this.ctx.fill();
          this.ctx.strokeStyle = '#ef4444'; this.ctx.lineWidth = 2;
          this.ctx.beginPath(); this.ctx.arc(e.x+10, e.y+20, 15, -0.5, 0.5); this.ctx.stroke();
          this.ctx.beginPath(); this.ctx.arc(e.x+30, e.y+20, 15, 2.6, 3.6); this.ctx.stroke();
      } else if (e.type === 'stone') {
          this.ctx.fillStyle = '#78350f';
          this.ctx.beginPath(); 
          this.ctx.moveTo(e.x+20, e.y); this.ctx.lineTo(e.x+40, e.y+20); this.ctx.lineTo(e.x+20, e.y+40); this.ctx.lineTo(e.x, e.y+20);
          this.ctx.fill();
      } else if (e.type === 'biboo') {
          this.ctx.fillStyle = '#a855f7'; 
          this.ctx.beginPath();
          this.ctx.moveTo(e.x+20, e.y); 
          this.ctx.lineTo(e.x+40, e.y+15); 
          this.ctx.lineTo(e.x+20, e.y+40); 
          this.ctx.lineTo(e.x, e.y+15); 
          this.ctx.fill();
          this.ctx.fillStyle = '#fff'; 
          this.ctx.beginPath(); this.ctx.moveTo(e.x+20, e.y); this.ctx.lineTo(e.x+30, e.y+15); this.ctx.lineTo(e.x+20, e.y+10); this.ctx.fill();
      } else if (e.type === 'pebble') {
          this.ctx.fillStyle = '#94a3b8'; 
          this.ctx.beginPath(); this.ctx.arc(e.x+20, e.y+20, 15, 0, Math.PI*2); this.ctx.fill();
          this.ctx.fillStyle = '#000';
          this.ctx.font = '16px monospace';
          this.ctx.fillText('(:)', e.x+10, e.y+25);
      }
    });
  }

  drawBullets() {
    this.bullets.forEach(b => {
      this.ctx.fillStyle = b.color || '#7dd3fc';
      this.ctx.save();
      this.ctx.translate(b.x, b.y);
      if (b.type === 'fist') {
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          this.ctx.beginPath(); this.ctx.arc(0, 0, 40, 0, Math.PI*2); this.ctx.fill(); 
      } else if (b.type === 'laser') {
          this.ctx.fillRect(-20, -5, 40, 10);
      } else if (b.type === 'bullet') { // UPDATED: New bullet type for K3
          this.ctx.beginPath();
          this.ctx.moveTo(10, 0); this.ctx.lineTo(-5, 5); this.ctx.lineTo(-5, -5); this.ctx.fill();
      } else {
          this.ctx.rotate(Date.now() / 100);
          this.ctx.beginPath();
          for (let i=0; i<4; i++) { this.ctx.rotate(Math.PI/2); this.ctx.lineTo(10, 0); this.ctx.lineTo(3, 3); }
          this.ctx.fill();
      }
      this.ctx.restore();
    });
  }

  drawParticles() {
    this.ctx.globalCompositeOperation = 'lighter';
    this.particles.forEach(p => { p.update(); p.draw(this.ctx); });
    this.particles = this.particles.filter(p => p.life > 0);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  gameOver() {
    this.state = 'OVER';
    if (this.score > this.highScore) this.highScore = this.score;
    document.getElementById('final-score').innerText = this.score;
    
    const hints = [
      "你沒有走出2年前的Among Us聯動心魔",
      "拿出你的決心，還不能在這裡倒下",
      "mix軟體把你電腦的效能都吃光了",
      "看來你沒有抽到福留選手",
      "結石真的很痛苦 :D"
    ];
    
    const hint = hints[this.levelIndex] || "下次請堅持到最後！";
    document.getElementById('ending-hint').innerText = hint;
    
    document.getElementById('menu-over').classList.add('show');
    document.getElementById('boss-hud').classList.remove('active');
  }

  rectIntersect(r1, r2) {
    return !(r2.x > r1.x + r1.w || r2.x + r2.w < r1.x || r2.y > r1.y + r1.h || r2.y + r2.h < r1.y);
  }
}

const game = new Game();
</script>