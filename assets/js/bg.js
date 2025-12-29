const CONFIG = {
  imageUrl: (window.siteBaseUrl || '') + '/assets/images/feather.webp',
  phrases: [
    "努力という名の翼で、誰よりも高く飛んだ天使。",
    "その50kgの握力で、僕たちの心を最後まで離さなかったね。",
    "空へ帰っても、君は僕たちにとって永遠に「一番星」です。",
    "不器用な天使が描いた、最高に輝く軌跡。",
    "明日はなか卯たべる",
    "ココ見てたか？駆け抜けてやったぜ"
  ],
  textInterval: 8000,
  featherInterval: 4000,
};

const container = document.getElementById('memorial-bg');

// 亂數產生器
const random = (min, max) => Math.random() * (max - min) + min;

// 羽毛生成
function spawnFeather() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('feather-container');

  // --- 基礎物理參數 ---
  const depth = Math.random(); // 0(遠) ~ 1(近)
  const size = 15 + (depth * 105);
  const duration = 30 - (depth * 8); // 近的飛比較快
  const opacity = 0.4 + (depth * 0.6); // 近的比較不透明
  const blur = (1 - depth) * 2; // 遠的模糊
  const zIndex = depth > 0.6 ? -1 : -2;

  // 搖曳動畫
  // 隨機擺動週期 (2s ~ 5s)
  const swayDuration = random(2, 5);
  // 隨機延遲 (讓擺動相位錯開)
  const swayDelay = random(0, -5); 
  
  // 角度邏輯：
  // baseAngle: 羽毛整體的傾斜傾向 (例如 -135度 ~ +135度)
  const baseAngle = random(-135, 135);
  // rangeAngle: 擺動時變化的幅度
  const rangeAngle = random(-360, 360);
  
  // 位移邏輯：左右飄移的距離
  const xDrift = random(60, 120);

  // --- 注入 CSS 變數 ---
  wrapper.style.setProperty('--target-opacity', opacity);
  wrapper.style.setProperty('--sway-duration', `${swayDuration}s`);
  wrapper.style.setProperty('--sway-delay', `${swayDelay}s`);
  
  // 設定旋轉範圍 (從 base-range 到 base+range)
  wrapper.style.setProperty('--r-from', `${baseAngle - rangeAngle}deg`);
  wrapper.style.setProperty('--r-to', `${baseAngle + rangeAngle}deg`);
  
  // 設定左右位移範圍
  wrapper.style.setProperty('--x-from', `${-xDrift}px`);
  wrapper.style.setProperty('--x-to', `${xDrift}px`);

  // --- 應用基礎樣式 ---
  wrapper.style.width = `${size}px`;
  wrapper.style.height = `${size}px`;
  wrapper.style.left = `${random(-5, 105)}%`; // 允許稍微超出邊界生成
  wrapper.style.zIndex = zIndex;
  
  // 只有 wrapper 負責向上飛
  wrapper.style.animation = `featherFloatUp ${duration}s linear forwards`;
  
  if (blur > 0.5) wrapper.style.filter = `blur(${blur}px)`;

  // --- 處理圖片或 CSS 形狀 ---
  if (CONFIG.imageUrl && CONFIG.imageUrl.trim() !== '') {
    const img = new Image();
    img.src = CONFIG.imageUrl;

    img.onload = () => {
      img.classList.add('feather-img-tag');
      wrapper.appendChild(img);
      container.appendChild(wrapper);
    };

    img.onerror = () => {
      // console.warn('Feather image failed to load, using CSS shape.');
      appendCssFeather(wrapper);
      container.appendChild(wrapper);
    };
  } else {
    appendCssFeather(wrapper);
    container.appendChild(wrapper);
  }

  // --- 垃圾回收 ---
  setTimeout(() => {
    wrapper.remove();
  }, duration * 1000 + 500);
}

// 輔助函式：插入 CSS 形狀羽毛
function appendCssFeather(parentElement) {
  const shape = document.createElement('div');
  shape.classList.add('feather-css-shape');
  parentElement.appendChild(shape);
}

// 文字生成動畫
function spawnText() {
  const textEl = document.createElement('div');
  textEl.classList.add('floating-text');
  
  // 隨機選句
  const phrase = CONFIG.phrases[Math.floor(Math.random() * CONFIG.phrases.length)];
  textEl.textContent = phrase;
  
  // 避免文字出現在太邊邊被切掉 (10% ~ 70%)
  const x = random(10, 70); 
  const y = random(20, 60); 
  
  textEl.style.left = `${x}%`;
  textEl.style.top = `${y}%`;
  
  // 隨機微調大小
  const scale = random(0.9, 1.1);
  textEl.style.transform = `scale(${scale})`;

  container.appendChild(textEl);
  
  // 動畫結束後移除
  setTimeout(() => textEl.remove(), 8000);
}

function init() {
  // 啟動定時器
  setInterval(spawnText, CONFIG.textInterval);
  setInterval(spawnFeather, CONFIG.featherInterval);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}