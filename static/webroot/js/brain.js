$(function() {
    
    window.Socket = io.connect('http://localhost:8081');
    
    new Hand({
        id: 'left'
    });
    
    new Hand({
        id: 'right'
    });
    
});