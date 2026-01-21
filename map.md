---
layout: default
title: 足跡地圖 | Footprints
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
      desc: "與AZKi的埼玉探險。巨大的猩猩雕像「Big G」令人印象深刻，雖然等了很久眼睛才動了一下！"
    },
    {
      title: "秩父市「安田屋」",
      lat: 35.9897,
      lng: 139.0850,
      desc: "品嚐了秩父名物「草鞋豬排飯」，酥脆的外皮與特製醬汁讓人感到幸福。"
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
      desc: "在「本棚劇場」觀賞光雕投影，體驗了彷彿行走在電影中的浮世繪劇場。"
    },
    {
      title: "伊豆全景公園",
      lat: 35.0396,
      lng: 138.9304,
      desc: "「かなけん」社員旅行。搭乘纜車眺望富士山與駿河灣的絕景，實現了與夥伴一起旅行的承諾。"
    },
    {
      title: "ES CON FIELD HOKKAIDO",
      lat: 42.9897,
      lng: 141.5494,
      desc: "參加「にじホロ交流戦」。與フブキ、ぺこら一同享用美食，立食壽司的美味讓人想留在北海道！"
    },
    {
      title: "東京巨蛋",
      lat: 35.7057,
      lng: 139.7514,
      desc: "特別任務：擔任巨人隊對戰養樂多燕子隊的線上即時評述。"
    },
    {
      title: "Tower Records 澀谷店",
      lat: 35.6618,
      lng: 139.7013,
      desc: "UNKNOWN DIVA專輯發售時，這裡有天音かなた的親筆留言。"
    }
  ];

  // Add markers
  locations.forEach(function(loc) {
    L.marker([loc.lat, loc.lng]).addTo(map)
      .bindPopup("<h3>" + loc.title + "</h3><p>" + loc.desc + "</p>");
  });

</script>
