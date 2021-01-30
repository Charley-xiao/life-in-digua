

function enter(){
    document.getElementById('logo').style.top="10%";
    document.getElementById('options').style.display="";
}
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function stdout(lbname,gstr,rest,stpoint){
    var gstrl=gstr.length;
    var elem=document.getElementById(lbname);
    elem.innerHTML="";
    for(var i=stpoint;i<gstrl;i++){
        await sleep(rest);
        elem.innerHTML+=gstr[i];
    }
}
//fadeOut
//function start
function fadeOut(ele,speed){
    var ele=document.getElementById(ele);
    var opacitynum=ele.style.opacity||1;
    var speed=(speed/100)||10;
    function opacityOff(){
        if(opacitynum>0){
            ele.style.opacity=opacitynum=(opacitynum-0.01).toFixed(2);
        }else{
            clearInterval(opacityt);
        }
    }
    var opacityt=setInterval(opacityOff,speed);
}
//function end

//fadeIn
//function start
function fadeIn(ele,speed){
    var ele=document.getElementById(ele);
    var opacitynum=ele.style.opacity||0;
    var speed=(speed/100)||10;
    function opacityAdd(){
        if(opacitynum<1){
            ele.style.opacity=opacitynum=(parseFloat(opacitynum)+0.01).toFixed(2);
        }else{
            clearInterval(opacityt);
        }
    }
    var opacityt=setInterval(opacityAdd,speed);
}
//function end
function setCookie(cname,cvalue,exdays){
    var d=new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires="expires="+d.toGMTString();
    document.cookie=cname+"="+cvalue+";"+expires+";path=/";
}
function getCookie(cname){
    var myname=cname+"=";
    var decodedCookie=decodeURIComponent(document.cookie);
    var ca=decodedCookie.split(';');
    for(var i=0;i<ca.length;i+=1) {
        var c=ca[i];
        while(c.charAt(0)==' ') c=c.substring(1);
        if (c.indexOf(myname)==0) return c.substring(myname.length,c.length);
    }
    return "";
}
function checkCookie() {
    name=getCookie("username");
    if(name!="") window.alert("成功导入存档！");
    else window.alert("未检测到可用存档，点击开始游戏创建新存档！");
}
function clearfile(){
    setCookie("username","",30000);
    window.alert("成功清除存档！");
}

function SAVE(){

}

function show_settings(){
    document.getElementById('ALL_SETTINGS').style.display="";

}

/* variables for chapter 1 */

var current_chapter=0;
var conver_id=0;
var converlist=["","0你一定是新来的侦探吧！我叫 Solokov，是地瓜星的副首长。","1是的，您好。"];//0/1+content
var is_end=[-1,0];
var chap_end=[-1,0];
var have_options=[-1,0];
var comment=[-1];//0/1+content
var st_chosen=-1;
var nxt1=[-1];
var nxt2=[-1];
var nxt3=[-1];
var start_ch=[-1];
var backgroundlist=["","solokov2.jpg@bela1.png","solokov2.jpg@bela1.png"];
var namelist=["","Solokov@我","Solokov@我"];

var output1=["在遥远的地瓜星上，生活着一群快乐的球......","地瓜领主是这个星球的首长......","一天，球们在地瓜领主的家中发现......","地瓜领主被杀害了！",
"究竟谁是幕后凶手？","爱恨情仇交织成的冲突，地瓜星上的迷雾重重......","将由你来揭开......"];

function to_end(sign){

}

function NEXT_CHAPTER(sign){

}

function PRINT_COM(sign){

}

async function chp1_next(){
    //document.getElementById('leftimg').style.backgroundImage="url(\"solokov2.jpg\")";
    //document.getElementById('leftname').innerHTML="<p style=\"position: relative;top: 50%;left: 50%;font-size: 20px;transform: translate(-10%,-50%);\">Solokov</p>";
    //document.getElementById('rgtname').innerHTML="<p style=\"position: relative;top: 50%;left: 50%;font-size: 20px;transform: translate(-5%,-50%);\">我</p>";
    //document.getElementById('lconver').innerHTML="\n你一定是新来的侦探吧！\n我叫 Solokov，是地瓜星的副首长。";
    conver_id=1;
    current_chapter=1;
    while(1){
        var tmpforout=converlist[conver_id];

        var tmpleftimg="",tmprgtimg="";
        var qpos=0;
        for(qpos=0;qpos<backgroundlist[conver_id].length;qpos++){
            tmpleftimg+=backgroundlist[conver_id][qpos];
            if(backgroundlist[conver_id][qpos+1]=='@') break;
        }
        qpos+=2;
        for(;qpos<backgroundlist[conver_id].length;qpos++){
            tmprgtimg+=backgroundlist[conver_id][qpos];
        }
        document.getElementById('leftimg').style.backgroundImage="url(\""+tmpleftimg+"\")";
        document.getElementById('rgtimg').style.backgroundImage="url(\""+tmprgtimg+"\")";

        qpos=0;
        var tmpleftname="",tmprgtname="";
        for(qpos=0;qpos<namelist[conver_id].length;qpos++){
            tmpleftname+=namelist[conver_id][qpos];
            if(namelist[conver_id][qpos+1]=='@') break;
        }
        qpos+=2;
        for(;qpos<namelist[conver_id].length;qpos++){
            tmprgtname+=namelist[conver_id][qpos];
        }
        document.getElementById('leftname').innerHTML="<center><p class=\"names\">"+tmpleftname+"</p></center>";
        document.getElementById('rgtname').innerHTML="<center><p class=\"names\">"+tmprgtname+"</p></center>";

        if(tmpforout[0]=='0') stdout("lconver",tmpforout,100,1);
        else stdout("rconver",tmpforout,100,1);
        

        let fulfiller = null;

        document.addEventListener('keypress', e => {
            if ((e.keyCode == 13 || e.keyCode == 1) && fulfiller) {
                fulfiller();
                fulfiller = null;
            }
        });

        async function press_continue() {
            return new Promise((fulfill, reject) => {
                fulfiller = fulfill;
            });
        }
        await press_continue();
        if(is_end[conver_id]!=0){
            to_end(conver_id);
            break;
            // do something?
        }
        if(chap_end[conver_id]!=0){
            current_chapter++;
            SAVE();
            NEXT_CHAPTER(current_chapter);
            conver_id=start_ch[current_chapter];
            break;
            // do something?
        }
        if(have_options[conver_id]!=0){
            PRINT_COM(conver_id);
            if(st_chosen==1){
                conver_id=nxt1[conver_id];
            }
            else if(st_chosen==2){
                conver_id=nxt2[conver_id];
            }
            else if(st_chosen==3){
                conver_id=nxt3[conver_id];
            }
            else{
                window.alert("Error Code : 100 !");
                return;
            }
        }
        else conver_id++;
        
    }
}
function start_chp1(){
    var pos=0;
    var id=setInterval(showmain1,1);
    function showmain1(){
        if(pos>=7) clearInterval(id),document.getElementById('stage').style.display="none",document.getElementById('offi').style.display="block"/*,document.getElementById('sidebar').style.display="none"*/,chp1_next();
        else{
            if(pos==3) document.getElementById('stage').style.color="red";
            document.getElementById('stage').innerHTML="<h1>"+output1[pos]+"</h1>";
            pos++;
            document.getElementById('stage').style.color="black";
        }
    }
}
function startgame(){
    var tmp_cookie=getCookie("username");
    if(tmp_cookie!="") current_chapter=tmp_cookie;
    else current_chapter=1;
    document.getElementById('logo').style.display="none";
    document.getElementById('options').style.display="none";
    document.getElementById('mainpart').style.display="";
    document.getElementById('offi').style.display="none";
    if(current_chapter==0||current_chapter==1){
        start_chp1();
    }
}