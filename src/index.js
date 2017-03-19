var ol = require("openlayers")

      var style = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 1
        }),
        text: new ol.style.Text({
          font: '12px Calibri,sans-serif',
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
      });

      var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: './lib/countries.geojson',
          format: new ol.format.GeoJSON()
        }),
        style: function(feature, resolution) {
          style.getText().setText(resolution < 5000 ? feature.get('name') : '');
          return style;
        }
      });

      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          vectorLayer
        ],
        target: 'main',
        view: new ol.View({
          center: [0, 0],
          zoom: 1
        })
      });

var m = require("mithril")

var BayesList = require("./views/BayesList")
var BayesForm = require("./views/BayesForm")
var Layout = require("./views/Layout")

m.route(document.getElementById("aside"), "/nets", {
    "/nets": {
        render: function() {
            return m(Layout, m(BayesList))
        }
    },
    "/nets/:netid...": {
        render: function(vnode) {
            attrs = vnode.attrs
            attrs.olmap = map
            return m(Layout, m(BayesForm, attrs))
        }
    },
})


      var highlightStyleCache = {};

      var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: function(feature, resolution) {
          var text = resolution < 5000 ? feature.get('name') : '';
          if (!highlightStyleCache[text]) {
            highlightStyleCache[text] = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: '#f00',
                width: 1
              }),
              fill: new ol.style.Fill({
                color: 'rgba(255,0,0,0.1)'
              }),
              text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill({
                  color: '#000'
                }),
                stroke: new ol.style.Stroke({
                  color: '#f00',
                  width: 3
                })
              })
            });
          }
          return highlightStyleCache[text];
        }
      });

      var highlight;
      var displayFeatureInfo = function(pixel) {

        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
          map.set("highlightFeature", feature, false);
        } else if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
            highlight = null;
            map.unset("highlightFeature");
        }

      };

      map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
      });