(function(window, undefined) {
  if (typeof Raphael == 'undefined') throw "Rain needs Raphaël.js!";
    
  Rain = function(element, speed, angle) {
    if (!(this instanceof arguments.callee)) {
      return new arguments.callee(arguments);
    };
    var self = this;
    
    self.init = function(element, speed, angle, intensity) {
      var elt = document.getElementById(element);
      self.stage = {
          element:  elt,
          width:    elt.getBoundingClientRect().width,
          height:   elt.getBoundingClientRect().height
        };
      self.canvas = Raphael(self.stage.element);
      self.offset = (Math.tan(angle * Math.PI / 180) * self.stage.height);
      runEngine(speed, angle, intensity);
      return self;
    };
    
    function runEngine(speed, angle, intensity) {
      setInterval(function() { createDrop(speed, angle); }, 100 / intensity);
    }
    
    function randomStartingPoint(angle) {
      return Math.floor(Math.random() * (self.stage.width + self.offset));
    }
    
    function createPositionMatrix(angle) {
      return [randomStartingPoint(angle), 0, 1, 10];
    }
    
    function createDrop(speed, angle) {
      var positionMatrix = createPositionMatrix(angle),
        drop = self.canvas.ellipse.apply(self.canvas, positionMatrix),
        factor = Math.random(), 
        layer = speed * (1 + factor),
        cx = positionMatrix[0] - self.offset;
      drop
        .attr({stroke: '#fff', opacity: 1 - factor})
        .rotate(angle)
        .animate({cy: self.stage.height, cx: cx}, layer, function() { drop.remove(); });
      return drop;
    }
    
    return self.init.apply(self, arguments);
  };
})(window);