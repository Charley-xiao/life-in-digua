

function enter(){
    document.getElementById('logo').style.top="10%";
    document.getElementById('options').style.display="";
    show_help();
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
            ele.style.opacity=opacitynum=(opacitynum-0.1).toFixed(2);
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
            ele.style.opacity=opacitynum=(parseFloat(opacitynum)+0.1).toFixed(2);
        }else{
            clearInterval(opacityt);
        }
    }
    var opacityt=setInterval(opacityAdd,speed);
}
//function end

/* variables for chapter 1 */

var current_chapter=0;
var conver_id=0;
var converlist=["","0你一定是新来的侦探吧！我叫 Solokov，是地瓜星的副首长。","1我是 Belarus 侦探，您好。",
"0希望你能尽快找到杀害地瓜的凶手，我们会将他绳之以法。","1我会尽我的全力的。","0拜托您了。","1test"];//0/1+content
var is_end=[-1,0,0,0,0,0];
var chap_end=[-1,0,0,0,0,0];
var have_options=[-1,0,0,0,0,1];
var comment=[-1,"","","","","我想......@去一趟犯罪现场@先回房间休息@",""];//0/1+content
var st_chosen=-1;
var nxt1=[-1,-1,-1,-1,-1,/*waiting*/-1.,-1];
var nxt2=[-1,-1,-1,-1,-1,6,-1];
var nxt3=[-1,-1,-1,-1,-1,-1,-1];
var start_ch=[-1,1];
var backgroundlist=["","solokov2.jpg@bela1.png","solokov2.jpg@bela1.png",
"solokov2.jpg@bela1.png","solokov2.jpg@bela1.png","solokov2.jpg@bela1.png",""];
var namelist=["","Solokov@我","Solokov@我","Solokov@我","Solokov@我","Solokov@我",""];
var audiolist=[""];


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
    setCookie("process","",30000);
    window.alert("成功清除存档！");
}

function SAVE(){
    setCookie("username",""+current_chapter,30000);
    setCookie("process",""+conver_id,30000);
}

function show_settings(){
    document.getElementById('ALL_SETTINGS').style.display="";
    document.getElementById('ALL_SETTINGS').style.opacity="0";
    fadeIn("ALL_SETTINGS",1000);
}
function offsettings(){
    //fadeOut("ALL_SETTINGS",1000);
    document.getElementById('ALL_SETTINGS').style.display="none";
}
function show_help(){
    document.getElementById('HELP').style.display="";
    document.getElementById('HELP').style.opacity="0";
    fadeIn("HELP",1000);
}
function offhelp(){
    document.getElementById('HELP').style.display="none";
}
var audio_set=1;
function changeaudio(){
    if(audio_set==1) audio_set=0,document.getElementById('aud').value="音频：关";
    else audio_set=1,document.getElementById('aud').value="音频：开";
}

function to_end(sign){

}

function NEXT_CHAPTER(sign){

}
function choose_st(oppp){
    st_chosen=oppp;
}
async function PRINT_COM(sign){
    var target=comment[sign];
    var header="",option1="",option2="",option3="";
    var curpos=0;
    for(;curpos<target.length;curpos++){
        if(target[curpos]=='@') break;
        header+=target[curpos];
    }
    for(curpos++;curpos<target.length;curpos++){
        if(target[curpos]=='@') break;
        option1+=target[curpos];
    }
    for(curpos++;curpos<target.length;curpos++){
        if(target[curpos]=='@') break;
        option2+=target[curpos];
    }
    for(curpos++;curpos<target.length;curpos++){
        option3+=target[curpos];
    }
    document.getElementById('comlead').innerHTML="<h2>"+header+"</h2>";
    document.getElementById('opa').innerHTML="<button onclick=\"choose_st(1)\">"+option1+"</button>";
    document.getElementById('opb').innerHTML="<button onclick=\"choose_st(2)\">"+option2+"</button>";
    document.getElementById('opc').innerHTML="<button onclick=\"choose_st(3)\">"+option3+"</button>";
    st_chosen=-1;
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
    //window.alert('p');
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
    document.getElementById('comlead').innerHTML="";
    document.getElementById('opa').innerHTML="";
    document.getElementById('opb').innerHTML="";
    document.getElementById('opc').innerHTML="";
}

function start_chp1(){
    var pos=0;
    var id=setInterval(showmain1,1);
    function showmain1(){
        if(pos>=7) clearInterval(id),document.getElementById('stage').style.display="none",document.getElementById('offi').style.display="block";
        else{
            if(pos==3) document.getElementById('stage').style.color="red";
            document.getElementById('stage').innerHTML="<h1>"+output1[pos]+"</h1>";
            pos++;
            document.getElementById('stage').style.color="black";
        }
    }
}

async function chp(){
    //document.getElementById('leftimg').style.backgroundImage="url(\"solokov2.jpg\")";
    //document.getElementById('leftname').innerHTML="<p style=\"position: relative;top: 50%;left: 50%;font-size: 20px;transform: translate(-10%,-50%);\">Solokov</p>";
    //document.getElementById('rgtname').innerHTML="<p style=\"position: relative;top: 50%;left: 50%;font-size: 20px;transform: translate(-5%,-50%);\">我</p>";
    //document.getElementById('lconver').innerHTML="\n你一定是新来的侦探吧！\n我叫 Solokov，是地瓜星的副首长。";
    var tmpconverid=getCookie("process");
    if(tmpconverid=="") conver_id=1;
    else conver_id=tmpconverid;
    //conver_id=1;
    while(1){
        //window.alert("new turn");
        var tmpforout=converlist[conver_id];
        SAVE();
        //获取对话人物头像
        var tmpleftimg="",tmprgtimg="";
        var qpos=0;
        //if(backgroundlist[conver_id]!=""){
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
        //}
        //获取对话人物名称
        //if(namelist[conver_id]!=""){
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
        //}
        //获取对话内容
        if(tmpforout[0]=='0') stdout("lconver",tmpforout,100,1);
        else stdout("rconver",tmpforout,100,1);
        if(have_options[conver_id]!=0){
            var target=comment[conver_id];
            var header="",option1="",option2="",option3="";
            var curpos=0;
            for(;curpos<target.length;curpos++){
                if(target[curpos]=='@') break;
                header+=target[curpos];
            }
            for(curpos++;curpos<target.length;curpos++){
                if(target[curpos]=='@') break;
                option1+=target[curpos];
            }
            for(curpos++;curpos<target.length;curpos++){
                if(target[curpos]=='@') break;
                option2+=target[curpos];
            }
            for(curpos++;curpos<target.length;curpos++){
                option3+=target[curpos];
            }
            document.getElementById('comlead').innerHTML="<h2>"+header+"</h2>";
            if(option3!=""){
                document.getElementById('opa').innerHTML="<button onclick=\"choose_st(1)\">"+option1+"</button>";
                document.getElementById('opb').innerHTML="<button onclick=\"choose_st(2)\">"+option2+"</button>";
                document.getElementById('opc').innerHTML="<button onclick=\"choose_st(3)\">"+option3+"</button>"; 
                document.getElementById('opa').style.left="10%";
                document.getElementById('opb').style.left="40%";
            }
            else{
                document.getElementById('opa').innerHTML="<button onclick=\"choose_st(1)\">"+option1+"</button>";
                document.getElementById('opb').innerHTML="<button onclick=\"choose_st(2)\">"+option2+"</button>";
                document.getElementById('opc').innerHTML="";
                document.getElementById('opa').style.left="20%";
                document.getElementById('opb').style.left="60%";
            }
            st_chosen=-1;
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
            //window.alert('p');
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
            document.getElementById('comlead').innerHTML="";
            document.getElementById('opa').innerHTML="";
            document.getElementById('opb').innerHTML="";
            document.getElementById('opc').innerHTML="";
        }
        else{
            //等待回车
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
            //判断是否此对话下一步为结局
            if(is_end[conver_id]!=0){
                to_end(conver_id);
                break;
                // do something?
            }
            //判断此对话是否为章末
            if(chap_end[conver_id]!=0){
                current_chapter++;
                SAVE();
                NEXT_CHAPTER(current_chapter);
                conver_id=start_ch[current_chapter];
                break;
                // do something?
            }
            conver_id++;
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
    document.getElementById('stage').style.display="none";
    document.getElementById('offi').style.display="block";
    chp();
}