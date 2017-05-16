// INSTRUCTIONS: if you need again, download & save to root directory (~) 
// with filename ".phoenix.js"

'use strict';

/* Preferences */

Phoenix.set({
    'daemon': true,
    'openAtLogin': true
});

var keys = [];
var hyper = [ 'ctrl', 'alt', 'shift', 'cmd' ];
// var ctrlAltCmdShift = [ 'ctrl', 'alt', 'shift', 'cmd' ];
var margin = 0;
var increment = 0.1;

/* Position */

var Position = {
  central: function (frame, window) {
    return {
      x: frame.x + ((frame.width - window.width) / 2),
      y: frame.y + ((frame.height - window.height) / 2)
    };
  },

  top: function (frame, window) {
    return {
      x: window.x,
      y: frame.y
    };
  },

  bottom: function (frame, window) {
    return {
      x: window.x,
      y: (frame.y + frame.height) - window.height
    };
  },

  left: function (frame, window) {
    return {
      x: frame.x,
      y: window.y
    };
  },

  right: function (frame, window) {
    return {
      x: (frame.x + frame.width) - window.width,
      y: window.y
    };
  },

  topLeft: function (frame, window, margin) {
    return {
      x: Position.left(frame, window).x + margin,
      y: Position.top(frame, window).y + margin
    };
  },

  topRight: function (frame, window, margin) {
    return {
      x: Position.right(frame, window).x - margin,
      y: Position.top(frame, window).y + margin
    };
  },

  bottomLeft: function (frame, window, margin) {
    return {
      x: Position.left(frame, window).x + margin,
      y: Position.bottom(frame, window).y - margin
    };
  },

  bottomRight: function (frame, window, margin) {
    return {
      x: Position.right(frame, window).x - margin,
      y: Position.bottom(frame, window).y - margin
    };
  }
};

/* Grid */

var Frame = {
  width: 1,
  height: 1,

  half: {
    width: 0.5,
    height: 0.5
  },

  twoThirds: {
    width: .6666
  },

  oneThird: {
    width: .3333
  }
};

/* Window Functions */

Window.prototype.move = function (direction) {
  switch(direction) {
    case 'left':
      break;
    case 'right':
      break;
    case 'up':
      break;
    case 'down':
      break;
  }
};

Window.prototype.to = function (position) {
  this.setTopLeft(position(this.screen().visibleFrameInRectangle(),
                           this.frame(), margin));
};

Window.prototype.grid = function (x, y, origin) {
  origin = origin || 'topLeft';
  var frame = this.screen().visibleFrameInRectangle();

  var newWindowFrame = _(this.frame()).extend({
    width: (frame.width * x) - (2 * margin),
    height: (frame.height * y) - (2 * margin)
  });

  var position = Position[origin](frame, newWindowFrame, margin);

  this.setFrame(_(newWindowFrame).extend(position));
};

Window.prototype.resize = function (multiplier) {
  var frame = this.screen().visibleFrameInRectangle();
  var newSize = this.size();

  if (multiplier.x) {
    newSize.width += frame.width * multiplier.x;
  }

  if (multiplier.y) {
    newSize.height += frame.height * multiplier.y;
  }

  this.setSize(newSize);
};

Window.prototype.increaseWidth = function () {
  this.resize({ x: increment });
};

Window.prototype.decreaseWidth = function () {
  this.resize({ x: -increment });
};

Window.prototype.increaseHeight = function () {
  this.resize({ y: increment });
};

Window.prototype.decreaseHeight = function () {
  this.resize({ y: -increment });
};

/* Position Bindings */

// keys.push(Phoenix.bind('q', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().to(Position.topLeft);
// }));

// keys.push(Phoenix.bind('w', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().to(Position.topRight);
// }));

// keys.push(Phoenix.bind('a', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().to(Position.bottomLeft);
// }));

// keys.push(Phoenix.bind('s', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().to(Position.bottomRight);
// }));

// keys.push(Phoenix.bind('0', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().to(Position.central);
// }));

// /* Grid Bindings */

// keys.push(Phoenix.bind('p', hyper, function () {
//   Window.focusedWindow() &&
//     Window.focusedWindow().grid(Frame.width, Frame.height);
// }));

// keys.push(Phoenix.bind('[', hyper, function () {
//   Window.focusedWindow() &&
//     Window.focusedWindow().grid(Frame.half.width, Frame.height);
// }));

// keys.push(Phoenix.bind(']', hyper, function () {
//   Window.focusedWindow() &&
//     Window.focusedWindow().grid(Frame.half.width, Frame.height, 'topRight');
// }));

// keys.push(Phoenix.bind(';', hyper, function () {
//   Window.focusedWindow() &&
//     Window.focusedWindow().grid(Frame.twoThirds.width, Frame.height);
// }));

// keys.push(Phoenix.bind('\'', hyper, function () {
//   Window.focusedWindow() &&
//     Window.focusedWindow().grid(Frame.oneThird.width, Frame.height, 'topRight');
// }));


// /* Resize Bindings */

// // < decrease current window width
// keys.push(Phoenix.bind(',', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().decreaseWidth();
// }));

// // > increase current window width
// keys.push(Phoenix.bind('.', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().increaseWidth();
// }));

// // - decrease current window height
// keys.push(Phoenix.bind('-', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().decreaseHeight();
// }));

// // + increase current window height
// keys.push(Phoenix.bind('=', hyper, function () {
//     Window.focusedWindow() && Window.focusedWindow().increaseHeight();
// }));

// /* Application Bindings */

// keys.push(Phoenix.bind('a', hyper, function() {
//   var app = App.launch('Finder');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('space', hyper, function() {
//   var app = App.launch('Google Chrome');
//   app.focus();
//   return app;
// }));

Key.on('space', hyper, function() {
  App.get('Google Chrome').windows()[0].focus();
});

// keys.push(Phoenix.bind('d', hyper, function() {
//   var app = App.launch('iTerm');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('f', hyper, function() {
//   // var app = App.launch('Atom');
//   var app = App.launch('Visual Studio Code');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('s', hyper, function() {
//   var app = App.launch('Notes');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('x', hyper, function() {
//   var app = App.launch('Spotify');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('q', hyper, function() {
//   var app = App.launch('Adobe Photoshop CC 2014');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('e', hyper, function() {
//   var app = App.launch('Adobe Illustrator');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('k', hyper, function() {
//   var app = App.launch('Sketch');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('v', hyper, function() {
//   var app = App.launch('Preview');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('c', hyper, function() {
//   var app = App.launch('Messages');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('z', hyper, function() {
//   var app = App.launch('Filezilla');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('r', hyper, function() {
//   var app = App.launch('Robomongo');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('m', hyper, function() {
//   var app = App.launch('Postman');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('o', hyper, function() {
//   var app = App.launch('Pages');
//   app.focus();
//   return app;
// }));

// keys.push(Phoenix.bind('g', hyper, function() {
//   var app = App.launch('Simulator');
//   app.focus();
//   return app;
// }));
