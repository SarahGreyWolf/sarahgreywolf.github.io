/**
 * Created by master0r0 on 09/10/2016.
 */
function writeLetter(){
    var start = 0;
    var end = 248;
    var finalised = "";
    var pattern = "\n", re = new RegExp(pattern, "g");
    var black = new RegExp("&0","g"), darkBlue = new RegExp("&1","g"), darkGreen = new RegExp("&2","g"), darkAqua = new RegExp("&3","g"), darkRed = new RegExp("&4","g"), darkPurple = new RegExp("&5","g"), gold = new RegExp("&6","g"), gray = new RegExp("&7","g"), darkGray = new RegExp("&8","g"), blue = new RegExp("&9","g"), green = new RegExp("&a","g"), aqua = new RegExp("&b","g"), red = new RegExp("&c","g"), lightPurple = new RegExp("&d","g"), yellow = new RegExp("&e","g"), reset = new RegExp("&f","g");
    var entry = document.getElementById("entry").value;
    var newString = entry.replace(re,'\\n');

    for(i = 0;i<(newString.length/256);i++){
        console.log(start+":"+end);
        if(!newString.length<82){
            var endString = "/letter ";
            var sub = newString.substr(start,end);
            endString += sub + "</span>\n";
            endString = endString.replace(/ +(?= )/g,'');
            finalised += endString;
        }else{
            var endString = "/letter ";
            var string = "";
            string += newString+"</span>\n";
            endString += string;
            finalised += endString;
        }
        start+=248;
    }

    finalised = finalised.replace(black,"<span style='color:#000000'>&0");
    finalised = finalised.replace(darkBlue,"<span style='color:#0000AA'>&1");
    finalised = finalised.replace(darkGreen,"<span style='color:#00AA00'>&2");
    finalised = finalised.replace(darkAqua,"<span style='color:#00AAAA'>&3");
    finalised = finalised.replace(darkRed,"<span style='color:#AA0000'>&4");
    finalised = finalised.replace(darkPurple,"<span style='color:#AA00AA'>&5");
    finalised = finalised.replace(gold,"<span style='color:#FFAA00'>&6");
    finalised = finalised.replace(gray,"<span style='color:#AAAAAA'>&7");
    finalised = finalised.replace(darkGray,"<span style='color:#555555'>&8");
    finalised = finalised.replace(blue,"<span style='color:#5555FF'>&9");
    finalised = finalised.replace(green,"<span style='color:#55FF55'>&a");
    finalised = finalised.replace(aqua,"<span style='color:#55FFFF'>&b");
    finalised = finalised.replace(red,"<span style='color:#FF5555'>&c");
    finalised = finalised.replace(lightPurple,"<span style='color:#FF55FF'>&d");
    finalised = finalised.replace(yellow,"<span style='color:#FFFF55'>&e");
    finalised = finalised.replace(reset,"</span>&f");

    document.getElementById("output").innerHTML = finalised;
}

