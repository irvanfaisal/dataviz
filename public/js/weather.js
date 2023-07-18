
// init variable
var action = false;
var display         = [];
var markers         = [];
var locations;
var menuLayer       = false;
var menuSidebar     = false;
var menuForecast    = false;
var mapInfo         = false;
var timestep        = false;
var mq              = window.matchMedia("(min-width:768px)");
var coordinate = {};
var currentLayer;
var dateText;
var decadText;
var track;
var maxDate;
var currentDatetime;
var oldDate;
var currentDate;
var group;
var layerData;
var velocityLayer;
var customLayer;
var featureLayer = [];
var hazardLayer;
moment.locale('id');
var layerBasemap = [];
var layerOpacity = 0.7;
var pathServices = 'http://geoportal.menlhk.go.id/arcgis/rest/services';
var currentLocation = {};


var colorRGB        = {
    rain            : ['rgba(94,53,177 ,0)', 'rgba(94,53,177 ,1)', 'rgba(30,136,229 ,1)', 'rgba(0,172,193 ,1)', 'rgba(67,160,71 ,1)', 'rgba(192,202,51 ,1)', 'rgba(255,179,0 ,1)', 'rgba(244,81,30 ,1)', 'rgba(229,57,53 ,1)', 'rgba(216,27,96 ,1)'],
    wspd            : ['rgba(94,53,177 ,1)', 'rgba(30,136,229 ,1)', 'rgba(30,136,229 ,1)', 'rgba(0,172,193 ,1)', 'rgba(67,160,71 ,1)', 'rgba(192,202,51 ,1)', 'rgba(255,179,0 ,1)', 'rgba(244,81,30 ,1)', 'rgba(229,57,53 ,1)', 'rgba(216,27,96 ,1)'],
    temp            : ['rgba(94,53,177 ,0)', 'rgba(94,53,177 ,1)', 'rgba(30,136,229 ,1)', 'rgba(0,172,193 ,1)', 'rgba(67,160,71 ,1)', 'rgba(192,202,51 ,1)', 'rgba(255,179,0 ,1)', 'rgba(244,81,30 ,1)', 'rgba(229,57,53 ,1)', 'rgba(216,27,96 ,1)'],
    cloud           : ['rgba(94,53,177 ,0)','rgb(130, 0, 220)', 'rgb(34, 57, 254)', 'rgb(0, 202, 176)', 'rgb(158, 230, 49)', 'rgb(223, 221, 50)'],
    rh              : ['rgba(30,136,229 ,1)', 'rgba(0,172,193 ,1)', 'rgba(67,160,71 ,1)','rgba(192,202,51 ,1)', 'rgba(255,179,0 ,1)', 'rgba(244,81,30 ,1)','rgba(229,57,53 ,1)', 'rgba(216,27,96 ,1)'],
    iklim               : ['#2892c6', '#bfd489', '#fce55b', '#fd8430', '#e81015'],
    banjir              : ['rgba(77,182,172 ,1)','rgba(102,187,106 ,1)','rgba(174,213,129 ,1)','rgba(255,241,118 ,1)','rgba(255,183,77 ,1)','rgba(198,40,40 ,1)'],
    kekeringan          : ['rgba(77,182,172 ,1)','rgba(102,187,106 ,1)','rgba(174,213,129 ,1)','rgba(255,241,118 ,1)','rgba(255,183,77 ,1)','rgba(198,40,40 ,1)'],
    longsor             : ['rgba(77,182,172 ,1)','rgba(102,187,106 ,1)','rgba(174,213,129 ,1)','rgba(255,241,118 ,1)','rgba(255,183,77 ,1)','rgba(198,40,40 ,1)'],
    hama                : ['rgba(77,182,172 ,1)','rgba(102,187,106 ,1)','rgba(174,213,129 ,1)','rgba(255,241,118 ,1)','rgba(255,183,77 ,1)','rgba(198,40,40 ,1)'],
    irigasi                : ['rgba(77,182,172 ,1)','rgba(102,187,106 ,1)','rgba(174,213,129 ,1)','rgba(255,241,118 ,1)','rgba(255,183,77 ,1)','rgba(198,40,40 ,1)'],
    sawah               : ['rgba(26,150,65 ,1)', 'rgba(215,25,28 ,1)'],
    palawija            : ['rgba(26,150,65 ,1)', 'rgba(215,25,28 ,1)']
}



var colorBreak      = {
    rain            : [0,5,10,15,20,25,30,35,40],
    wspd            : [0,1,2,5,6,8,10,12,14],
    temp            : [-50+273.15,18+273.15,20+273.15,22+273.15,24+273.15,26+273.15,28+273.15,30+273.15,32+273.15,34+273.15],
    cloud           : [0,20,40,60,80,100],
    rh              : [60,70,80,85,90,95,100],
    iklim               : [0,50,100,150,200],
    banjir              : [0,1,2,3,4,5],
    kekeringan          : [0,1,2,3,4,5],
    longsor             : [0,1,2,3,4,5],
    hama                : [0,1,2,3,4,5],
    irigasi                : [0,1,2,3,4,5],
    sawah               : [0,1,2,3,4,5],
    palawija            : [0,1]
}
var colorLegend         = {
    rain            : '<i style="width: calc(100%/10);">0</i><i style="width: calc(100%/10);">5</i><i style="width: calc(100%/10);">10</i><i style="width: calc(100%/10);">15</i><i style="width: calc(100%/10);">20</i><i style="width: calc(100%/10);">25</i><i style="width: calc(100%/10);">30</i><i style="width: calc(100%/10);">35</i><i style="width: calc(100%/10);">40</i><i style="width: calc((100%/10));">mm/3 jam</i>',
    wspd            : '<i style="width: calc(100%/10);">0</i><i style="width: calc(100%/10);">1</i><i style="width: calc(100%/10);">2</i><i style="width: calc(100%/10);">5</i><i style="width: calc(100%/10);">6</i><i style="width: calc(100%/10);">8</i><i style="width: calc(100%/10);">10</i><i style="width: calc(100%/10);">12</i><i style="width: calc(100%/10);">14</i><i style="width: calc((100%/10));">m/s</i>',
    temp            : '<i style="width: calc(100%/10);">18</i><i style="width: calc(100%/10);">20</i><i style="width: calc(100%/10);">22</i><i style="width: calc(100%/10);">24</i><i style="width: calc(100%/10);">26</i><i style="width: calc(100%/10);">28</i><i style="width: calc(100%/10);">30</i><i style="width: calc(100%/10);">32</i><i style="width: calc(100%/10);">34</i><i style="width: calc((100%/10));"><sup>o</sup>C</i>',
    rh              : '<i style="width: calc(100%/8);">60</i><i style="width: calc(100%/8);">70</i><i style="width: calc(100%/8);">80</i><i style="width: calc(100%/8);">85</i><i style="width: calc(100%/8);">90</i><i style="width: calc(100%/8);">95</i><i style="width: calc(100%/8);">100</i><i style="width: calc((100%/8));">%</i>',
    iklim                : '<i style="width: calc(100%/6);">0</i><i style="width: calc(100%/6);">50</i><i style="width: calc(100%/6);">100</i><i style="width: calc(100%/6);">150</i><i style="width: calc(100%/6);">200</i><i style="width: calc((100%/6));">mm/dasarian</i>',
    banjir                : '<i style="width: calc(100%/7);background-color:rgba(77,182,172 ,1);">Aman</i><i style="width: calc(100%/7);background-color:rgba(102,187,106 ,1);">Sangat Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(174,213,129 ,1));">Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(255,241,118 ,1));">Sedang</i><i style="width: calc(100%/7);background-color:rgba(255,183,77 ,1);">Tinggi</i><i style="width: calc(100%/7);background-color:rgba(198,40,40 ,1);">Sangat Tinggi</i><i style="width: calc((100%/7));background-color:#333333;">Kerentanan</i>',
    kekeringan                : '<i style="width: calc(100%/7);background-color:rgba(77,182,172 ,1);">Aman</i><i style="width: calc(100%/7);background-color:rgba(102,187,106 ,1);">Sangat Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(174,213,129 ,1));">Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(255,241,118 ,1));">Sedang</i><i style="width: calc(100%/7);background-color:rgba(255,183,77 ,1);">Tinggi</i><i style="width: calc(100%/7);background-color:rgba(198,40,40 ,1);">Sangat Tinggi</i><i style="width: calc((100%/7));background-color:#333333;">Kerentanan</i>',
    longsor                : '<i style="width: calc(100%/7);background-color:rgba(77,182,172 ,1);">Aman</i><i style="width: calc(100%/7);background-color:rgba(102,187,106 ,1);">Sangat Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(174,213,129 ,1));">Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(255,241,118 ,1));">Sedang</i><i style="width: calc(100%/7);background-color:rgba(255,183,77 ,1);">Tinggi</i><i style="width: calc(100%/7);background-color:rgba(198,40,40 ,1);">Sangat Tinggi</i><i style="width: calc((100%/7));background-color:#333333;">Kerentanan</i>',
    hama                : '<i style="width: calc(100%/7);background-color:rgba(77,182,172 ,1);">Aman</i><i style="width: calc(100%/7);background-color:rgba(102,187,106 ,1);">Sangat Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(174,213,129 ,1));">Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(255,241,118 ,1));">Sedang</i><i style="width: calc(100%/7);background-color:rgba(255,183,77 ,1);">Tinggi</i><i style="width: calc(100%/7);background-color:rgba(198,40,40 ,1);">Sangat Tinggi</i><i style="width: calc((100%/7));background-color:#333333;">Kerentanan</i>',
    irigasi                : '<i style="width: calc(100%/7);background-color:rgba(77,182,172 ,1);">Aman</i><i style="width: calc(100%/7);background-color:rgba(102,187,106 ,1);">Sangat Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(174,213,129 ,1));">Rendah</i><i style="width: calc(100%/7);background-color:rgba(rgba(255,241,118 ,1));">Sedang</i><i style="width: calc(100%/7);background-color:rgba(255,183,77 ,1);">Tinggi</i><i style="width: calc(100%/7);background-color:rgba(198,40,40 ,1);">Sangat Tinggi</i><i style="width: calc((100%/7));background-color:#333333;">Prioritas</i>',
    sawah                : '<i style="width: calc(100%/6);background-color:rgb(139,195,74);">Tanam</i><i style="width: calc(100%/6);background-color:rgb(255,193,7);">Pemupukan I</i><i style="width: calc(100%/6);background-color:rgb(121,85,72);">Pemupukan II</i><i style="width: calc(100%/6);background-color:rgb(156,39,176);">Pestisida</i><i style="width: calc(100%/6);background-color:rgb(3,169,244);">Panen</i><i style="width: calc((100%/6));background-color:#333333;">Kegiatan</i>',
    palawija                : '<i style="width: calc(100%/3);background-color:rgba(215,25,28 ,1);">Belum Siap</i><i style="width: calc(100%/3);background-color:rgba(166,217,106 ,1);">Siap</i><i style="width: calc((100%/3));background-color:#333333;">Kesiapan Lahan</i>'

}

function initialize() {
    var map = L.map('map',{zoomControl: false,attributionControl: false}).setView([-0.7893, 113.9213], 5);

    map.invalidateSize();
    mapDark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        maxZoom: 16,
        minZoom: 5,
    }).addTo(map);
    L.OWM.wind({appId: '6ade90aa7f156730420712da3fe4a48e'}).addTo(map)


    var mapTitle = L.control({position:'topleft'});
    var menuLayer = L.control({position:'topright'});
    var mapZoom = L.control({position:'bottomright'});

    mapTitle.onAdd = function(map){
        this._div = L.DomUtil.get('menu-title')
        return this._div
    };
    mapTitle.addTo(map);

    menuLayer.onAdd = function(map){
        this._div = L.DomUtil.get('menu-layer')
        return this._div
    }
    menuLayer.addTo(map);

    mapZoom.onAdd = function(map){
        this._div = L.DomUtil.get('map-zoom')
        return this._div
    }
    mapZoom.addTo(map);

    document.getElementById('menu-title').addEventListener('mouseover', function () {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        document.getElementById('map').style.cursor='default';
        action = true;
    });
    document.getElementById('menu-title').addEventListener('mouseout', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });

    document.getElementById('menu-title').addEventListener('mouseleave', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });

    document.getElementById('menu-layer').addEventListener('mouseover', function () {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        document.getElementById('map').style.cursor='default';
        action = true;
    });
    document.getElementById('menu-layer').addEventListener('mouseout', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });

    document.getElementById('menu-layer').addEventListener('mouseleave', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });

    document.getElementById('map-zoom').addEventListener('mouseover', function () {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        document.getElementById('map').style.cursor='default';
        action = true;
    });
    document.getElementById('map-zoom').addEventListener('mouseout', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });

    document.getElementById('map-zoom').addEventListener('mouseleave', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });

    document.getElementById("in").addEventListener("click", function() {
        if (map.getZoom() < 13) {
            map.setZoom(map.getZoom() + 1)
        }
    });
    document.getElementById("out").addEventListener("click", function() {
        if (map.getZoom() > 3) {
            map.setZoom(map.getZoom() - 1)
        }
    });

    getWeather();
}

function getWeather(){
}

