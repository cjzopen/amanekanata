---
layout: default
title: 音樂作品 | 天界檔案館
description: 整理天音彼方的專輯、單曲與合作作品，作為 Discography 索引。
permalink: /music/
---

<section class="section">
  <header class="section-header">
    <div class="section-kicker">DISCOGRAPHY</div>
    <h1 class="section-title">音樂作品資料庫</h1>
    <p class="section-lead">
      音樂是天音彼方留給世界最重要的遺產之一。以下列表僅為索引，實際播放將透過 YouTube、Spotify 等官方平台完成。
    </p>
  </header>

  <div class="table-wrapper">
    <table class="discography-table">
      <thead>
        <tr>
          <th>作品名稱</th>
          <th>發行日期</th>
          <th>類型</th>
          <th>關鍵備註</th>
        </tr>
      </thead>
      <tbody>
        {% for work in site.data.discography %}
        <tr>
          <td>{{ work.title }}</td>
          <td>{{ work.date }}</td>
          <td>{{ work.type }}</td>
          <td>{{ work.note }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>

  <p class="mt-md text-muted">
    ※ 為遵守版權規範，本網站不直接託管任何音樂或影片檔案。建議使用 Spotify / YouTube 等官方嵌入元件，
    讓收聽與觀看流量仍回流至 Cover 與官方頻道。
  </p>
</section>