<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/index.css">
<section class="hero">
  <div class="hero-kicker">
    Celestial Archives · 非官方粉絲檔案館
  </div>
  <h1 class="hero-title">
    獻給 <span>天音彼方</span> 的數位聖地
  </h1>
  <p class="hero-catchphrase">
    <strong>握力59.9kgアイドル💙ぎゅぎゅ💙握り潰しちゃうぞ💙</strong>
  </p>
  <p class="hero-subtitle">
    「天界檔案館」在此匯集她的片羽、音樂與重要紀錄，為所有嘿民保留六年的回憶。
  </p>
  <div class="hero-meta">
    <span class="hero-meta-badge">2019.12.27 出道 → 2025.12.27 畢業</span>
    <span class="hero-meta-badge">Hololive 四期生 · 天音かなた</span>
    <span class="hero-meta-badge">由社群驅動的數位檔案計畫</span>
  </div>
  <div class="hero-actions">
    <a class="btn-primary" href="{{ site.baseurl }}/history/">
      查看歷史時間軸
    </a>
    <a class="btn-secondary" href="{{ site.baseurl }}/music/">
      瀏覽 Discography
    </a>
  </div>
</section>

<section class="section">
  <header class="section-header">
    <div class="section-kicker">#撃ち抜けかなた</div>
    <h2 class="section-title">天使扣下扳機的瞬間</h2>
    <p class="section-lead">
      無需言語，她僅用一聲詠嘆或一次堅持，便精準地「射穿」了所有人心中最柔軟的地方。<br>
      每一次重新整理，都是與不同回憶的再次重逢。
    </p>
  </header>

  <div class="highlight-grid" id="highlight-pool">
{% for card in site.data.highlights.highlights %}
    <div class="highlight-card">
      <img src="{{ site.baseurl }}/assets/images/highlight/{{ card.image }}" alt="{{ card.title }}" class="highlight-img" onerror="this.onerror=null; this.src='{{ site.baseurl }}/assets/images/gorilla.png';" />
      <div class="highlight-body">
        <h3 class="highlight-title">{{ card.title }}</h3>
        <p class="highlight-desc">{{ card.description }}</p>
        {% if card.link %}
        <a href="{{ card.link }}" class="highlight-link">了解更多</a>
        {% endif %}
      </div>
    </div>
{% endfor %}
  </div>
  <p class="section-note">
    註：重整頁面出現隨機片羽。
  </p>
</section>
<script src="{{ site.baseurl }}/assets/js/index.js"></script>