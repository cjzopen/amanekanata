---
layout: default
title: 小品遊戲 | 天界檔案館
description: 飛翔的天使。
permalink: /game/
---

<style>
  #game-container {
    width: 100%;
    max-width: 800px; /* 限制最大寬度 */
    margin: 20px auto; /* 上下留白並置中 */
    border: 4px solid #333; /* 復古像素邊框 */
    background-color: #87CEEB; /* 暫時的天空背景色 */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  /* Canvas 畫布設定 */
  canvas#gameCanvas {
    display: block;
    width: 100%;
    height: auto;

    /* 強制像素化渲染，不進行模糊平滑處理 */
    image-rendering: pixelated; /* Chrome, Safari 新版 */
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: crisp-edges;
  }
</style>


<section id="game-container">
  <canvas id="gameCanvas" width="320" height="180"></canvas>
</section>


<script>
  (() => {
    console.log("🎮 天界肉塊大戰引擎啟動...");

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 遊戲解析度 (畫布的實際像素大小)
    const GAME_WIDTH = canvas.width;
    const GAME_HEIGHT = canvas.height;

    // --- 臨時素材替代 (之後會換成真正的像素圖) ---
    // 我們先用色塊代表角色和敵人
    const player = {
      x: 50,
      y: GAME_HEIGHT / 2,
      width: 16,  // 16x16 像素大小
      height: 16,
      color: '#FFD700', // 金色代表天使 Kanata
      velocityY: 0,     // 垂直速度
      gravity: 0.15,    // 重力
      jumpStrength: -2.5 // 跳躍力
    };

    const meatBlock = {
      x: GAME_WIDTH + 50,
      y: GAME_HEIGHT / 2 - 30,
      width: 60,
      height: 60,
      color: '#8B0000', // 深紅色肉塊
      active: false     // 是否進入破壞階段
    };

    // --- 遊戲狀態 ---
    let frameCount = 0;

    // --- 輸入控制 ---
    let isJumpPressed = false;

    // 支援鍵盤空白鍵和滑鼠點擊
    function handleInputDown(e) {
      // 如果是空白鍵 (Space) 或滑鼠左鍵 (button 0)
      if ((e.code === 'Space' || e.button === 0) && !meatBlock.active) {
         // 只有在飛行階段才能跳躍
         player.velocityY = player.jumpStrength;
         isJumpPressed = true;
         // 防止空白鍵捲動網頁
         if (e.code === 'Space') e.preventDefault();
      }
      // 破壞階段的點擊邏輯之後加在這裡
      if (meatBlock.active && (e.code === 'Space' || e.button === 0)) {
         console.log("👊 打擊肉塊!");
         // 這裡之後加增加握力條的邏輯
      }
    }
    
    function handleInputUp(e) {
       if (e.code === 'Space' || e.button === 0) {
         isJumpPressed = false;
       }
    }

    // 綁定事件到 canvas 上 (滑鼠) 和 window 上 (鍵盤)
    canvas.addEventListener('mousedown', handleInputDown);
    canvas.addEventListener('mouseup', handleInputUp);
    window.addEventListener('keydown', handleInputDown);
    window.addEventListener('keyup', handleInputUp);


    // --- 遊戲主迴圈 (Game Loop) ---
    function gameLoop() {
      // 1. 更新邏輯 (Update)
      frameCount++;

      if (!meatBlock.active) {
        // --- 飛行階段邏輯 ---
        // 套用重力
        player.velocityY += player.gravity;
        player.y += player.velocityY;

        // 簡單的地板和天花板碰撞
        if (player.y > GAME_HEIGHT - player.height) {
            player.y = GAME_HEIGHT - player.height;
            player.velocityY = 0;
        }
        if (player.y < 0) {
            player.y = 0;
            player.velocityY = 0;
        }

        // 模擬：每 300 fps (約5秒) 出現一次肉塊
        if (frameCount % 300 === 0) {
           meatBlock.active = true;
           meatBlock.x = GAME_WIDTH - meatBlock.width - 20; // 出現在畫面右側
           console.log("🥩 肉塊出現! 進入破壞階段!");
        }
      } else {
         // --- 破壞階段邏輯 ---
         // 角色暫停移動，BOSS 出現
         // 模擬：5秒後肉塊消失，回到飛行階段
         if (frameCount % 300 === 299) {
            meatBlock.active = false;
            console.log("✨ 肉塊擊破! 回到飛行!");
         }
      }

      // 2. 繪製畫面 (Render)
      // 清空畫布
      ctx.fillStyle = meatBlock.active ? '#FFcccb' : '#87CEEB'; // 破壞階段背景變紅
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // 畫主角 (臨時黃色方塊)
      ctx.fillStyle = player.color;
      // 簡單的像素旋轉效果 (飛行時稍微抬頭)
      ctx.save();
      ctx.translate(player.x + player.width/2, player.y + player.height/2);
      if (!meatBlock.active) ctx.rotate(player.velocityY * 0.1);
      ctx.fillRect(-player.width/2, -player.height/2, player.width, player.height);
      ctx.restore();

      // 畫肉塊 (如果啟動的話)
      if (meatBlock.active) {
          ctx.fillStyle = meatBlock.color;
          // 肉塊微微顫抖特效
          let shakeX = Math.random() * 4 - 2;
          let shakeY = Math.random() * 4 - 2;
          ctx.fillRect(meatBlock.x + shakeX, meatBlock.y + shakeY, meatBlock.width, meatBlock.height);
          
          ctx.fillStyle = 'white';
          ctx.font = '10px Arial';
          ctx.fillText("猛擊空白鍵!", meatBlock.x, meatBlock.y - 10);
      }

      // 畫一些文字提示
      ctx.fillStyle = 'black';
      ctx.font = '10px monospace';
      ctx.fillText(meatBlock.active ? "階段: 破壞肉塊 (狂按!)" : "階段: 天使飛行 (按空白鍵)", 10, 15);


      // 請求下一幀動畫
      requestAnimationFrame(gameLoop);
    }

    // 開始遊戲!
    gameLoop();
  })();
</script>