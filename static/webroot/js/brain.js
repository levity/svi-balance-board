$(function() {
    
    window.Socket = io.connect('http://localhost:8081');

    Socket.on('message', function(d) {
        var data = eval('(' + d + ')');
        var axis = data[0], val = data[1];
        // console.log(axis);
        
        if (axis == "/x") {
          if (val < 0.48) {
            leftButtonDown = true;
            rightButtonDown = false;
          } else if (val > 0.52) {
            leftButtonDown = false;
            rightButtonDown = true;
          } else {
            leftButtonDown = false;
            rightButtonDown = false;
          }
        } else if (axis == '/y') {
          if (val < 0.48) {
            gasButtonDown = false;
            reverseButtonDown = true;
          } else if (val > 0.52) {
            gasButtonDown = true;
            reverseButtonDown = false;
          } else {
            gasButtonDown = false;
            reverseButtonDown = false;
          }
        }
        
    });
    
    // new Hand({id: 'left'});
    // new Hand({id: 'right'});
    
});