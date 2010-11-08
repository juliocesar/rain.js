(function(window, undefined) {
  if (typeof Raphael == 'undefined') throw "Rain needs Raphaël.js!";
    
  Rain = function(element) {
    if (!(this instanceof arguments.callee)) {
      return new arguments.callee(arguments);
    };
    var self = this;
    
    self.init = function(element) {
      var elt = document.getElementById(element);
      self.stage = {
          element:  elt,
          width:    elt.getBoundingClientRect().width,
          height:   elt.getBoundingClientRect().height
        };
      self.canvas = Raphael(self.stage.element, self.stage.width, self.stage.height);
      var drop = self.canvas.path("M100 50L90 90");
      drop.attr({
        stroke: '#FFFFFF'
      });
      
      return self;
    };
    
    function randomStartingPoint() {
      return Math.floor(Math.random * self.stage.width);
    }
    self.rand = randomStartingPoint;
    
    return self.init(element);
  };
  
  o = new Rain('canvas');
})(window);