/**
 * Created by master0r0 on 09/10/2016.
 */
function writeLetter(){
    var start = 0;
    var end = 93;
    var finalised = "";
    var pattern = "\n", re = new RegExp(pattern, "g");
    var black = new RegExp("&0","g"), darkBlue = new RegExp("&1","g"), darkGreen = new RegExp("&2","g"), darkAqua = new RegExp("&3","g"), darkRed = new RegExp("&4","g"), darkPurple = new RegExp("&5","g"), gold = new RegExp("&6","g"), gray = new RegExp("&7","g"), darkGray = new RegExp("&8","g"), blue = new RegExp("&9","g"), green = new RegExp("&a","g"), aqua = new RegExp("&b","g"), red = new RegExp("&c","g"), lightPurple = new RegExp("&d","g"), yellow = new RegExp("&e","g"), reset = new RegExp("&r","g");
    var entry = document.getElementById("entry").value;
    var newString = entry.replace(re,'\\n');

    var newString = newString.replace(black,"<span style='color:#000000'>&0");
    var newString = newString.replace(darkBlue,"<span style='color:#0000AA'>&1");
    var newString = newString.replace(darkGreen,"<span style='color:#00AA00'>&2");
    var newString = newString.replace(darkAqua,"<span style='color:#00AAAA'>&3");
    var newString = newString.replace(darkRed,"<span style='color:#AA0000'>&4");
    var newString = newString.replace(darkPurple,"<span style='color:#AA00AA'>&5");
    var newString = newString.replace(gold,"<span style='color:#FFAA00'>&6");
    var newString = newString.replace(gray,"<span style='color:#AAAAAA'>&7");
    var newString = newString.replace(darkGray,"<span style='color:#555555'>&8");
    var newString = newString.replace(blue,"<span style='color:#5555FF'>&9");
    var newString = newString.replace(green,"<span style='color:#55FF55'>&a");
    var newString = newString.replace(aqua,"<span style='color:#55FFFF'>&b");
    var newString = newString.replace(red,"<span style='color:#FF5555'>&c");
    var newString = newString.replace(lightPurple,"<span style='color:#FF55FF'>&d");
    var newString = newString.replace(yellow,"<span style='color:#FFFF55'>&e");
    var newString = newString.replace(reset,"</span>&r");

    for(i = 0;i<newString.length;i+=93){
        if(!newString.length<93){
            var string = "/letter ";
            var sub = newString.substr(start,end);
            string += sub+"</span>&r\n";
            finalised += string;
        }else{
            var string = "/letter ";
            console.log(i);
            string += newString+"</span>&r\n";
            finalised += string;
        }
        end+=94;
        start+=93;
    }
    document.getElementById("output").innerHTML = finalised;
}