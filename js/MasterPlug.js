(function MasterPlug(){
    var woots = new Array();
    var mehs = new Array();
    var onVote = API.on(API.VOTE_UPDATE,function(data){
        var voter = data.user.username;
        var text = voter+":";
        if(data.vote>0){
            text = text+"Woot!";
            if(!woots.indexOf(voter)>-1){
                woots.push(voter);
            }
            if(mehs.indexOf(voter)>-1){
                mehs.splice(mehs.indexOf(voter));
            }
        }else{
            text = text+"Meh!";
            if(!mehs.indexOf(voter)>-1){
                mehs.push(voter);
            }
            if(!woots.indexOf(voter)>-1){
                woots.splice(woots.indexOf(voter));
            }
        }
        API.chatLog(text);
        Console.log(text);
    })
})