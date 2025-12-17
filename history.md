---
layout: default
title: 歷史軌跡 | 天界檔案館
description: 從 2019 年降臨到 2025 年畢業，整理天音彼方六年的里程碑與關鍵事件。
permalink: /history/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/history.css" />
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>

<div class="min-h-screen bg-[#E0F7FA] font-sans selection:bg-blue-300 selection:text-white overflow-x-hidden relative text-gray-800">
  <div aria-hidden="true" id="progress-bar" class="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 origin-left z-50 shadow-[0_0_10px_rgba(59,130,246,0.8)] w-0"></div>

  <!-- 2. 動態背景 (Parallax) -->
  <div id="parallax-bg" class="fixed inset-0 z-0 pointer-events-none transition-transform duration-75 ease-out will-change-transform">
    <div class="absolute top-20 left-10 w-32 h-16 bg-white/40 blur-xl rounded-full animate-pulse"></div>
    <div class="absolute top-1/3 right-20 w-48 h-24 bg-blue-100/50 blur-2xl rounded-full"></div>
    <div class="absolute bottom-1/4 left-1/4 w-64 h-32 bg-white/30 blur-3xl rounded-full"></div>
    <!-- 星星 -->
    <div class="absolute top-10 right-10 text-yellow-200 animate-bounce delay-700"><i data-lucide="star" width="20"></i></div>
    <div class="absolute top-1/2 left-5 text-blue-200 animate-pulse"><i data-lucide="star" width="14"></i></div>
    <div class="absolute bottom-20 right-1/3 text-cyan-200 animate-ping"><i data-lucide="star" width="16"></i></div>
  </div>

  <!-- 3. Hero Section -->
  <section class="relative h-screen flex flex-col justify-center items-center text-center z-10 px-4" id="hero-section">
    <div class="flex flex-col items-center transition-opacity duration-300" id="hero-content">
      <div class="mb-6 relative group cursor-default">
        <div class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-blue-400 to-cyan-200 p-1 shadow-[0_0_40px_rgba(34,211,238,0.6)] flex items-center justify-center text-white transition-transform duration-700 hover:rotate-180">

          <!-- 光環 SVG -->
          <svg viewBox="0 0 100 100" class="animate-spin-slow w-24 h-24 md:w-36 md:h-36 text-white">
            <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
        <div class="absolute -top-4 -right-4 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg rotate-12 animate-bounce">
          PPT
        </div>
      </div>
      <h1 class="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm mb-2">
        天音彼方
      </h1>
      <p class="text-xl md:text-2xl text-blue-400 font-light tracking-widest mb-8">
        Amane Kanata Timeline
      </p>
      <div class="absolute bottom-10 animate-bounce text-blue-400">
        <i data-lucide="arrow-down" width="32" height="32"></i>
      </div>
    </div>
  </section>

  <!-- 4. Timeline Section -->
  <section class="relative py-20 px-4 md:px-0 max-w-5xl mx-auto z-10">
    <!-- 垂直中軸線 -->
    <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-gradient-to-b from-transparent via-blue-300 to-transparent border-r-2 border-dashed border-white/50"></div>
    <div class="flex flex-col pl-8 md:pl-0 space-y-16 md:space-y-24">
      {% for item in site.data.timeline %}
        {% capture direction %}{% cycle 'right', 'left' %}{% endcapture %}
        <div class="timeline-item flex justify-between items-center w-full relative {% if direction == 'left' %}md:flex-row-reverse{% endif %}">
          <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-400 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div class="w-5/12 hidden md:block"></div>
          <div class="w-full md:w-5/12 relative group reveal-hidden {% if direction == 'left' %}reveal-left{% else %}reveal-right{% endif %}">
            <div 
              class="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-white/50 p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:bg-white/90 {% if item.video_id %}cursor-pointer ring-offset-2 hover:ring-2 ring-blue-300{% endif %}"
              {% if item.video_id %}onclick="openModal('{{ item.video_id }}')"{% endif %}
            >
              <!-- 裝飾背景 -->
              <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br {{ item.color }} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
              
              <!-- Header -->
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r {{ item.color }} shadow-sm">
                  {{ item.tag }}
                </span>
                <span class="text-blue-400 font-mono font-bold tracking-widest">{{ item.date }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                {{ item.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-gray-600 leading-relaxed text-sm md:text-base">
                {{ item.description }}
              </p>

              <!-- link Hint -->
              {% if item.link %}
              <div class="mt-4 flex items-center gap-2 text-blue-700 font-semibold text-sm group-hover:text-blue-600">
                <i class="w-5 h-5 link-2"></i>
                <span>LINK</span>
              </div>
              {% endif %}

              <!-- Video Hint -->
              {% if item.video_id %}
              <div class="mt-4 flex items-center gap-2 text-blue-500 font-semibold text-sm group-hover:text-blue-600">
                <i data-lucide="play-circle" class="w-5 h-5 animate-pulse"></i>
                <span>Watch Clip</span>
              </div>
              {% endif %}

              <!-- Corner Icon -->
              <div class="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-br {{ item.color }} shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 text-white">
                {% if item.icon_type == 'text' %}
                  <div class="font-bold text-xs">{{ item.icon }}</div>
                {% else %}
                  <i data-lucide="{{ item.icon }}" width="24" height="24"></i>
                {% endif %}
              </div>

            </div>
            
            <!-- 手機版連接線 -->
            <div class="md:hidden absolute top-6 -left-4 w-4 h-0.5 bg-blue-300"></div>
          </div>
        </div>
      {% endfor %}

    </div>
    
    <!-- 底部結尾 -->
    <div class="text-center mt-20 mb-10 reveal-hidden">
      <div class="inline-block p-4 rounded-full bg-white/50 backdrop-blur border border-blue-200 shadow-lg">
        <p class="text-blue-500 font-bold">20年後さいたまスーパーアリーナ再會</p>
      </div>
    </div>
  </section>

  <!-- 雜點紋理 -->
  <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-[60] noise-bg"></div>

</div>

<!-- 5. Video Modal (隱藏層) -->
<div id="video-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 opacity-0" onclick="closeModal()">
  <div class="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 transform scale-90 transition-transform duration-300" id="modal-content" onclick="event.stopPropagation()">
    <button onclick="closeModal()" class="absolute top-2 right-2 z-10 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors">
      <i data-lucide="x" width="24"></i>
    </button>
    <div class="aspect-video w-full">
      <iframe id="video-iframe" width="100%" height="100%" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

<script>
  // 1. 初始化 Lucide Icons
  lucide.createIcons();

  // 2. 捲動進度條 & 視差背景 & Hero 淡出
  const progressBar = document.getElementById('progress-bar');
  const parallaxBg = document.getElementById('parallax-bg');
  const heroContent = document.getElementById('hero-content');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    // 進度條
    progressBar.style.width = `${scrollPercent * 100}%`;

    // 視差背景移動 (Y軸移動量為捲動量的 50%)
    parallaxBg.style.transform = `translateY(${scrollTop * 0.5}px)`;

    // Hero Section 淡出
    if (scrollTop < 300) {
      heroContent.style.opacity = 1 - (scrollTop / 300);
      heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
  });

  // 3. 捲動進場動畫 (Scroll Reveal)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // 動畫只執行一次
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-hidden').forEach((el) => {
    observer.observe(el);
  });

  // 4. Modal 控制邏輯
  const modal = document.getElementById('video-modal');
  const modalContent = document.getElementById('modal-content');
  const iframe = document.getElementById('video-iframe');

  function openModal(videoId) {
    if(!videoId) return;
    
    // 設定影片網址
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    
    // 顯示 Modal
    modal.classList.remove('hidden');
    // 強制重繪以觸發 transition
    void modal.offsetWidth;
    
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-90');
    modalContent.classList.add('scale-100');
    
    document.body.style.overflow = 'hidden'; // 禁止背景捲動
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    
    // 等待動畫結束後隱藏
    setTimeout(() => {
      modal.classList.add('hidden');
      iframe.src = ""; // 停止影片播放
      document.body.style.overflow = '';
    }, 300);
  }
</script>
