---
layout: default
title: 歷史軌跡 | 天界檔案館
description: 從 2019 年降臨到 2025 年畢業，整理天音彼方六年的里程碑與關鍵事件。
permalink: /history/
---

<section class="section">
  <header class="section-header">
    <div class="section-kicker">TIMELINE</div>
    <h1 class="section-title">歷史軌跡 · 2019–2025</h1>
    <p class="section-lead">
      從「天界學園」降臨，到在 LOCK ON 演唱會畫下句點——這裡整理天音彼方職業生涯的關鍵節點。
    </p>
  </header>

  {% for block in site.data.timeline %}
    <h2 class="mt-md">{{ block.period }}</h2>
    <div class="timeline">
      {% for item in block.items %}
      <article class="timeline-item">
        <div class="timeline-year">{{ item.date }}</div>
        <h3 class="timeline-title">{{ item.title }}</h3>
        <p class="timeline-body">
          {{ item.body }}
        </p>
      </article>
      {% endfor %}
    </div>
  {% endfor %}
</section>
