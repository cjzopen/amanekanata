const CONFIG = {
  imageUrl: window.siteBaseUrl + '/assets/images/feather.webp',
  phrases: [
"努力という名の翼で、誰よりも高く飛んだ天使。",
"その50kgの握力で、僕たちの心を最後まで離さなかったね。",
"空へ帰っても、君は僕たちにとって永遠に「一番星」です。",
"不器用な天使が描いた、最高に輝く軌跡。",
"明日はなか卯たべる",
"ココ見てたか？駆け抜けてやったぜ"
  ],
  textInterval: 8000,
  featherInterval: 1000,
};

const container = document.getElementById('memorial-bg');

// 亂數產生
const random = (min, max) => Math.random() * (max - min) + min;

// 羽毛生成
function spawnFeather() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('feather-container');

  // 1. 計算景深 (Depth) 0 ~ 1
  // 0 = 很遠 (小、慢、模糊、淡)
  // 1 = 很近 (大、快、清晰)
  const depth = Math.random(); 

  // 大小: 遠處 15px ~ 近處 60px
  const size = 15 + (depth * 45); 
  // 飄升時間: 近處較快(8s) ~ 遠處較慢(18s) (因為視覺差)
  const duration = 18 - (depth * 10);
  // 透明度: 遠處較淡(0.6) ~ 近處較清楚(1.0)
  const opacity = 0.6 + (depth * 0.4);
  // 模糊 (Blur): 遠處稍微模糊，模擬空氣感
  const blur = (1 - depth) * 1.5; 
  // Z-index: 遠處在 -2, 近處在 -1 (都在文字層 0 之下)
  const zIndex = depth > 0.5 ? -1 : -2;

  // 應用樣式
  wrapper.style.width = `${size}px`;
  wrapper.style.height = `${size}px`; // 如果是圖片，高度會被子元素撐開，這裡主要定寬
  wrapper.style.left = `${random(0, 100)}%`;
  wrapper.style.animation = `featherFloatUp ${duration}s linear forwards`;
  wrapper.style.setProperty('--target-opacity', opacity);
  wrapper.style.zIndex = zIndex;
  if (blur > 0.5) wrapper.style.filter = `blur(${blur}px)`;

  if (CONFIG.imageUrl && CONFIG.imageUrl.trim() !== '') {
    const img = new Image();
    img.src = CONFIG.imageUrl;

    // 圖片載入成功
    img.onload = () => {
      img.classList.add('feather-img-tag');
      wrapper.appendChild(img);
      container.appendChild(wrapper);
    };

    // 圖片載入失敗，執行備案
    img.onerror = () => {
      appendCssFeather(wrapper);
      container.appendChild(wrapper);
    };
  } else {
// 沒有設定路徑，直接用備案
    appendCssFeather(wrapper);
    container.appendChild(wrapper);
  }

  // 清理 DOM
  setTimeout(() => {
    wrapper.remove();
  }, duration * 1000 + 100);
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
  textEl.textContent = CONFIG.phrases[Math.floor(Math.random() * CONFIG.phrases.length)];
  
  const x = random(10, 80); 
  const y = random(20, 70); 
  textEl.style.left = `${x}%`;
  textEl.style.top = `${y}%`;
  
  const scale = random(0.9, 1.2);
  textEl.style.transform = `scale(${scale})`;

  container.appendChild(textEl);
  setTimeout(() => textEl.remove(), 8000);
}

function init() {
  spawnText();
  setInterval(spawnText, CONFIG.textInterval);
  setInterval(spawnFeather, CONFIG.featherInterval);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}