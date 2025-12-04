document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('highlight-pool');
  if (!container) return;
  
  // 取得所有卡片
  const allCards = Array.from(container.children);
  
  // 如果卡片數量少於等於 3，就不需要隱藏
  if (allCards.length <= 3) return;

  // 洗牌演算法 (Fisher-Yates Shuffle)
  // 我們創建一個索引陣列來洗牌，不動 DOM 順序直到最後
  let indices = allCards.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // 取出前 3 個索引作為「顯示組」，剩下的作為「隱藏組」
  const visibleIndices = new Set(indices.slice(0, 3));

  // 遍歷所有卡片，對不在顯示組的加上 hidden class
  allCards.forEach((card, index) => {
    if (!visibleIndices.has(index)) {
      card.classList.add('js-hidden');
    }
  });

  // 隨機順序：
  // 清空 container 並依序 append
  container.innerHTML = '';
  indices.slice(0, 3).forEach(index => {
    container.appendChild(allCards[index]);
  });
});