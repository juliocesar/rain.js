// Rain.js
// Copyright © Julio Cesar Ody
(function(window, undefined) {
  if (typeof Raphael == 'undefined') throw "Rain needs Raphaël.js!";

  Rain = function(element, speed, angle) {
    if (!(this instanceof arguments.callee)) { return new arguments.callee(arguments); };
    var self = this;

    self.init = function(element, config) {
      var defaults = {speed: 500, angle: 20, intensity: 5, size: 10, color: '#fff'};
      if (typeof config == 'undefined') {
        config = defaults;
      } else {
        for (var property in defaults) {
          if (typeof config[property] == 'undefined') config[property] = defaults[property];
        };
      }
      self.config = config;
      var elt = document.getElementById(element);
      self.stage = {
          element:  elt,
          width:    function() { return elt.getBoundingClientRect().width; },
          height:   function() { return elt.getBoundingClientRect().height; }
        };
      self.canvas = Raphael(self.stage.element);
      self.offset = (Math.tan(config.angle * Math.PI / 180) * self.stage.height());
      runEngine();
      return self;
    };

    function runEngine() {
      self.enginePid = setInterval(function() { createDrop(self.config); }, 100 / self.config.intensity);
    }

    function randomStartingPoint(angle) {
      return Math.floor(Math.random() * (self.stage.width() + self.offset));
    }

    function createPositionMatrix(angle, size) {
      return [randomStartingPoint(angle), 0, size * 0.1, size];
    }

    function createDrop(config) {
      var factor = Math.random(),
        positionMatrix = createPositionMatrix(config.angle, config.size),
        drop = self.canvas.ellipse.apply(self.canvas, positionMatrix),
        layer = config.speed * (1 + factor),
        cx = positionMatrix[0] - (Math.tan(config.angle * Math.PI / 180) * self.stage.height());
      drop
        .attr({stroke: config.color, opacity: 1 - factor, fill: config.color})
        .rotate(config.angle)
        .animate({cy: self.stage.height(), cx: cx}, layer, function() { drop.remove(); });
      return drop;
    }

    // "class" methods
    self.setIntensity = function(intensity) {
      clearInterval(self.enginePid);
      self.config.intensity = intensity;
      self.enginePid = setInterval(function() { createDrop(self.config); }, 100 / self.config.intensity);
    };

    window.onresize = function() { self.canvas.setSize(window.innerWidth, window.innerHeight); };

    return self.init.apply(self, arguments);
  };
})(window);