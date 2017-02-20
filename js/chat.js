var socket = io('82.40.249.209:8080');
socket.on('update-chat', function (msg) {
    console.log(msg);
    var chat = $('#chat-area').text();
    chat = chat+msg.message;
    $('#chat-area').text(chat);
});
socket.on('update-media-list', function (data) {
    $("#medialist").empty();
    $("#medialist").append(data.list);
});

$('#mediaRefresh').click(function(){
    socket.emit('getMedia', {});
});

$('#medialist').on('click',"li.mediaitem", function(){
    var media = "media/"+$(this).text();
    $('#videoplayer').get(0).pause();
    $('#videosource').attr("src", media);
    $('#videoplayer').get(0).load();
    console.log($('#videosource'));
});

$('#chat-input').bind("enterKey",function(e){
    var message = $('#chat-input').val();
    socket.emit('incomingMessage', { message: message});
    $('#chat-input').val("");
});
$('#chat-input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});