let MAX_LENGTH = 6;
let NEWLINE_HTML = "<br>";
let NEWLINE_JS = "\n";
let SPACE = " ";
let BDX_LAT = 44.837788;
let BDX_LONG = -0.57918;
let ZOOM_DEFAULT = 12;
let TOILET_COLOR = "blue";
let KIDAREA_COLOR = "red";

function Placemark(long, lat, name, desc, color) {
  this.longitude = long;
  this.latitude = lat;
  this.name = name;
  this.description = desc;
  this.color = color;
}

const URL_TOILETS =
  "http://odata.bordeaux.fr/v1/databordeaux/sigsanitaire/?format=json&callback=?";

const ULR_KIDSAREAS =
  "http://odata.bordeaux.fr/v1/databordeaux/airejeux/?format=json&callback=?";

function placeMarkToilets(data, map) {
  for (let i = 0; i < data.d.length; ++i) {
    let toilet = new Placemark(
      data.d[i].x_long,
      data.d[i].y_lat,
      data.d[i].nom,
      data.d[i].num_quartier + SPACE + data.d[i].adresse,
      TOILET_COLOR
    );
    addPlaceMark(map, toilet);
  }
}

function placeMarkKidareas(data, map) {
  for (let i = 0; i < data.d.length; ++i) {
    let description =
      "Aire de jeux de " +
      data.d[i].age_min +
      " à " +
      data.d[i].age_max +
      " ans. Nombre de jeux disponibles : " +
      data.d[i].nombre_jeux;
    let kidarea = new Placemark(
      data.d[i].x_long,
      data.d[i].y_lat,
      data.d[i].nom,
      description,
      KIDAREA_COLOR
    );
    addPlaceMark(map, kidarea);
  }
}

function addPlaceMark(map, placemark) {
  let tmpPlacemark = new ymaps.Placemark(
    [placemark.latitude, placemark.longitude],
    {
      hintContent: placemark.name,
      balloonContent: placemark.description
    },
    {
      iconColor: placemark.color
    }
  );
  map.geoObjects.add(tmpPlacemark);
}

// Event listener on btn-toilets
$("#btn-toilets").on("click", () => {

  bdxMap.geoObjects.removeAll();
  $.getJSON(URL_TOILETS, function(result) {
    let data = JSON.parse(JSON.stringify(result));
    placeMarkToilets(data, bdxMap);
    let bastien = new Placemark (-0.639310, 44.870670, "SwaggCrappers", "Best crapper in da warudo", "Fuchsia");
    addPlaceMark(bdxMap, bastien);
  });
});

$("#btn-kidareas").on("click", () => {
  bdxMap.geoObjects.removeAll();
  $.getJSON(ULR_KIDSAREAS, function(result) {
    let data = JSON.parse(JSON.stringify(result));
    placeMarkKidareas(data, bdxMap);
  });
});

$("#btn-clear").on("click", () => {
  bdxMap.geoObjects.removeAll();
});

// Je sais pas comment rendre ça mieux...
ymaps.ready(init);
let bdxMap;

function init() {
  bdxMap = new ymaps.Map("map", {
    center: [BDX_LAT, BDX_LONG],
    zoom: ZOOM_DEFAULT
  });
}
