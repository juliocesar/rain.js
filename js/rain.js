(function(window, undefined) {
  if (typeof Raphael == 'undefined') throw "Rain needs Raphaël.js!";
    
  Rain = function(element, speed, angle) {
    if (!(this instanceof arguments.callee)) {
      return new arguments.callee(arguments);
    };
    var self = this;
    
    self.init = function(element, speed, angle, intensity, size) {
      var elt = document.getElementById(element);
      self.stage = {
          element:  elt,
          width:    elt.getBoundingClientRect().width,
          height:   elt.getBoundingClientRect().height
        };
      self.canvas = Raphael(self.stage.element);
      self.offset = (Math.tan(angle * Math.PI / 180) * self.stage.height);
      runEngine(speed, angle, intensity, size);
      return self;
    };
    
    function runEngine(speed, angle, intensity, size) {
      setInterval(function() { createDrop(speed, angle, size); }, 100 / intensity);
    }
    
    function randomStartingPoint(angle) {
      return Math.floor(Math.random() * (self.stage.width + self.offset));
    }
    
    function createPositionMatrix(angle, size) {
      return [randomStartingPoint(angle), 0, size * 0.1, size];
    }
    
    function createDrop(speed, angle, size) {
      var positionMatrix = createPositionMatrix(angle, size),
        drop = self.canvas.ellipse.apply(self.canvas, positionMatrix),
        factor = Math.random(), 
        layer = speed * (1 + factor),
        cx = positionMatrix[0] - self.offset;
      drop
        .attr({stroke: '#fff', opacity: 1 - factor, fill: '#fff'})
        .rotate(angle)
        .animate({cy: self.stage.height, cx: cx}, layer, function() { drop.remove(); });
      return drop;
    }
    
    return self.init.apply(self, arguments);
  };
})(window);