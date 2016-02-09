(function (){
    var header = window.outerHeight - window.innerHeight;
    var player_element = document.getElementById('playerNicoplayer');
    var player_size = {
        width: player_element.clientWidth,
        height: player_element.clientHeight + header
    };

    return JSON.stringify(player_size);
})();
