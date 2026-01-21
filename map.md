---
layout: default
title: 足跡地圖 | 天界檔案館
description: 天音かなた的旅行足跡地圖
permalink: /map/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin/>
<style>
  #map { 
    height: 600px; 
    width: 100%; 
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }
  .map-container {
    padding: 20px 0;
  }
  .leaflet-popup-content-wrapper {
    border-radius: 8px;
  }
  .leaflet-popup-content h3 {
    margin: 0 0 5px 0;
    font-size: 1.1em;
    color: #333;
  }
  .leaflet-popup-content p {
    margin: 0;
    color: #666;
  }
</style>

<div class="container map-container">
  <h1>天音かなた的足跡地圖</h1>
  <p>這裡記錄了かなた在各地留下的足跡，包含旅行與活動地點。</p>
  
  <div id="map"></div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

<script>
  // Initialize the map centered on Japan
  var map = L.map('map').setView([36.2048, 138.2529], 5); // Center roughly on Japan

  // Add OpenStreetMap tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Define locations
  var locations = [
    {
      title: "川口市「猩猩公園」",
      lat: 35.82398,
      lng: 139.68539,
      desc: "2024年《AZKi's LOCATION!》埼玉體驗之旅。巨大的猩猩雕像「Big Joe」令人印象深刻，每15分鐘眼睛會轉動。"
    },
    {
      title: "秩父市「安田屋」",
      lat: 35.9897,
      lng: 139.0850,
      desc: "品嚐了秩父名物「草鞋豬排飯」，酥脆的外皮與特製醬汁讓人感到幸福。かなた點了1枚豬排。"
    },
    {
      title: "寶登山",
      lat: 36.0931,
      lng: 139.0917,
      desc: "搭乘纜車賞楓，與小動物互動，並敲響了山頂的「綠洲之鐘」。"
    },
    {
      title: "角川武蔵野博物館",
      lat: 35.7977,
      lng: 139.5078,
      desc: "閉館後特別錄影。在「本棚劇場」觀賞光雕投影，體驗了彷彿行走在電影中的浮世繪劇場。"
    },
    {
      title: "三島車站",
      lat: 35.1272,
      lng: 138.9106,
      desc: "「かなけん」員工旅行集合點。"
    },
    {
      title: "沼津深海布丁工房",
      lat: 35.0956,
      lng: 138.8635,
      desc: "前往品嚐當地特色布丁。"
    },
    {
      title: "Sushi No Suke (すし之助)",
      lat: 35.0645,
      lng: 138.8745,
      desc: "員工旅行午餐，「預算信封」遊戲中かなた抽中了3000日圓，享用了美味壽司。"
    },
    {
      title: "伊豆全景公園",
      lat: 35.0396,
      lng: 138.9304,
      desc: "搭乘纜車前往葛城山頂的「碧テラス」，眺望富士山與駿河灣的絕景。"
    },
    {
      title: "香湯楼井川 (KOUYUROU IKAWA)",
      lat: 35.0329,
      lng: 138.9375,
      desc: "【猜測地點】員工旅行住宿。擁有百年歷史的摩登旅館，體驗了「五感バス」與「足湯」。"
    },
    {
      title: "ES CON FIELD HOKKAIDO",
      lat: 42.9897,
      lng: 141.5494,
      desc: "2024年參加「にじホロ交流戦」。與成員在球場內包廂小聚慶祝。"
    },
    {
      title: "新千歲機場",
      lat: 42.7752,
      lng: 141.6920,
      desc: "交流戰結束後，與フブキ在機場內的立食壽司店用餐，並購買了伴手禮。"
    },
    {
      title: "東京巨蛋",
      lat: 35.7057,
      lng: 139.7514,
      desc: "2023年8月1日，與こより一起播報 Hololive x GIANTS TV 職棒賽事。"
    },
    {
      title: "Tower Records 澀谷店",
      lat: 35.6618,
      lng: 139.7013,
      desc: "2024年「UNKNOWN DIVA」專輯發售時，店內展示有本人的親筆留言。"
    }
  ];

  // Add markers
  locations.forEach(function(loc) {
    L.marker([loc.lat, loc.lng]).addTo(map)
      .bindPopup("<h3>" + loc.title + "</h3><p>" + loc.desc + "</p>");
  });

</script>
