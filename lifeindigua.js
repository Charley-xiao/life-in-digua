//2021/2/6 23:45
var global_effect=0;
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function stdout(lbname,gstr,rest,stpoint){
    var gstrl=gstr.length;
    var elem=document.getElementById(lbname);
    elem.innerHTML="";
    for(var i=stpoint;i<gstrl-1;i++){
        await sleep(rest);
        if(i==gstrl-2&&(gstr[i]=='A'||gstr[i]=='B'||gstr[i]=='C'||gstr[i]=='D'||gstr[i]=='E'||gstr[i]=='F'||gstr[i]=='G'||gstr[i]=='H')) break;
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
function enter(){
    document.getElementById('logo').style.top="10%";
    document.getElementById('options').style.display="";
    show_help();
    document.getElementById('logo').addEventListener("click",function(){
        var current_time=new Date();
        if(current_time.getHours()=="00"||current_time.getHours()=="24"||current_time.getHours()=="0"){
            global_effect=1;
            document.getElementById('logoo').id="dead";
            document.getElementById('body').style.background="black";
            document.getElementById('options').style.display="none";
            document.getElementById('nav_settings').style.display="none";
            document.getElementById('HELP').style.display="none";
            document.getElementById('logo').style.top="50%";
            document.getElementById('logo').style.transform="translate(0,-50%)";
            document.getElementById('logoa').innerHTML+="<h1 style=\"color: red;\" id=\"logob\"></h1>";
            document.getElementById('HELP').innerHTML="";document.getElementById('ALL_SETTINGS').innerHTML="";
            var tmptmpsss="<a style=\"color: red;font-size: 20px;\">逃иє«ењЁе°дё–дёЌз§°ж„离Џ ж¬Іе‡єдё–иЂЊеїѓзѕЎд№‹ еѕЉ这дёЌе®љйљѕжЉ‰ж‹© и°里ЃзџҐиє«еїѓеђ‘дЅ•е¤„！</a>";
            for(var countr=0;countr<=10;countr++)
             document.getElementById('HELP').innerHTML+=tmptmpsss,document.getElementById('ALL_SETTINGS').innerHTML+=tmptmpsss;
            document.getElementById('HELP').innerHTML+="<center><input class=\"button button1\" type=\"button\" onclick=\"offhelp()\" value=\"关闭\"/></center>"
            document.getElementById('ALL_SETTINGS').innerHTML+="<center><input class=\"button button2\" type=\"button\" onclick=\"offsettings()\" value=\"关闭\"/></center>"
            var identity=setInterval(logob_showtime,1000);
            function logob_showtime(){
                var tmp_time=new Date();
                var strrrr="";
                strrrr+=tmp_time.getHours()+':';
                strrrr+=tmp_time.getMinutes()+':';
                strrrr+=tmp_time.getSeconds();
                document.getElementById('logob').innerHTML=strrrr;
            }
        }
    });
}
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
var converlist=["","0你一定是新来的侦探吧！我叫 Solokov，是地瓜星的副首长。1","1我是 Belarus 侦探，您好。2",
"0希望你能尽快找到杀害地瓜的凶手，我们会将他绳之以法。3","1我会尽我的全力的。4","0拜托您了。5","3（在住处）好累啊......（打哈欠）6",
"1要不先睡一会儿吧。7","0噔噔咚.....（敲门声）8","1（这会是谁呢）谁啊？（打开门）9","0你就是那个侦探吧。A0","1是，你是？A1",
"0布列斯特。我就住在旁边。A2","1这样啊，你好。A3","2当然知道。A4","0他是地瓜星的首领。A5","0但是我不怎么支持他......A6",
"1怎么说？A7","2他是个独裁者，我认为。A8","0他曾经实行过高压的政策。A9","0比如舆论管控，削减工人工资之类的......B0",
"0我自己也是工人。B1","0我是有亲身体会的。B2","0要是地瓜再继续当下去......B3","1你的意思是......B4","0对，确实。我挺希望地瓜下台的。B5",
"0不过死我是真没想到的。B6","1那你觉得现在会变得怎么样呢？B7","0Solokov 肯定会上台。B8","0不过，怎么说呢......B9","0我感觉这个人不一般。C0",
"1嗯......C1","0现在不早了，你去休息吧，不打扰你了。C2","1好吧，再见！C3","3（过了许久）（躺在床上）明天肯定又是忙碌的一天......（闭上眼睛）C4",
"2咚......咚......C5","3啊！C6","3（下楼，打开灯）是谁？！别跑！C7","1太黑了，根本看不清楚是谁......C8","1地上还有一把刀？C9",
"1我的天啊，我差点就被暗杀了！D0","1不过是谁想杀我呢......D1","1有作案动机的，貌似......D2","1也就只有凶手，或者他的同伙了！D3",
"2（第二天......）D4","2您好！D5","1你是？D6","0我是葡共，也是负责调查这个案子的。D7","1你好。我是白鹅。D8","0看起来你的精神不太好？D9",
"0是没睡好吗？E0","0这样啊，水土不服很正常。E1","2说到这еї«и·‘пјЃ，你是从哪里来的呢？еї«и·‘пјЃеї«и·‘пјЃE2","0哦。E3",
"1不说闲话了，我们去现场看看。E4","2（在案发现场，地瓜宫）E5","0这里就是地瓜被发现死亡的地方。E6","1他当时是怎么样的呢？E7",
"0躺在地上，胸上刺着一把刀。E8","2我去洗照片，你去找一下相关的人员。E9","0问一下当时发生了什么。F0","1好。F1","3让我看看涉案人员有哪些。F2",
"3你是锅巴吧。F3","0是的。F4","1能讲一下当时你在做什么，看到了什么吗？F5","0好的。F6","2我是地瓜的司机，你知道。F7"];//0/1+content,2->清空右部,3->清空左部
//                   1 2 3 4 5 6 7 8 91011121314151617181920212223242526272829303132333435
var is_end      =[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0];
var chap_end    =[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0];
var have_options=[-1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
0,1,0,0,0,0,0];
var comment=[-1,"","","","","我想......@去一趟犯罪现场。@先回房间休息。@","","","","","","","",
"我说......@今天天气不错，是吧？@你了解地瓜的这件事吗？@我还有事，先去忙了。","","","","","",""/*19*/,"","","","","","","","","","","","","","",
""/*34*/,"这是什么声音？@也许是风声，继续睡吧。@我得去看看。@","","","","","","","","","","","","","",""
,"实际上......@我昨天晚上很晚才睡。@昨天晚上有人想要暗杀我。@","","еї«и·‘пјЃ@еї«и·‘пјЃ@еї«и·‘пјЃ@еї«и·‘пјЃ","","","","","","","","","",
"我只审问______一个就够了，剩下的交给葡共。@锅巴@咖啡@瑞邦","","","","",""];
var st_chosen=-1;
//            1  2  3  4  5  6  7  8  9 10 11 12 13     14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35     36
var nxt1=[-1,-1,-1,-1,-1,55,-1,-1,-1,-1,-1,-1,-1,/**/-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,    36,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,    51,-1,53,-1,-1,-1,-1,-1,-1,-1,-1,-1,/**/63,-1,-1,-1,-1,-1];
var nxt2=[-1,-1,-1,-1,-1, 6,-1,-1,-1,-1,-1,-1,-1,    14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,/**/37,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,/**/-1,-1,53,-1,-1,-1,-1,-1,-1,-1,-1,-1,/**/-1,-1,-1,-1,-1,-1];
var nxt3=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,/**/-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,    -1,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,    -1,-1,53,-1,-1,-1,-1,-1,-1,-1,-1,-1,/**/-1,-1,-1,-1,-1,-1];
var start_ch=[-1,1];
var backgroundlist=["","solokov2.jpg@bela1.png","solokov2.jpg@bela1.png",
"solokov2.jpg@bela1.png","solokov2.jpg@bela1.png","solokov2.jpg@bela1.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png",
"brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png",
"brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png",
"brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png",
"brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png","brest.jpg@bela2.png",
" @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png"," @bela2.png",
" @ ","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg",
"unknown.jpg@unknown.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg"," @ ","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg",
"pg.jpg@bela3.jpg","pg.jpg@bela3.jpg","pg.jpg@bela3.jpg"," @bela3.jpg","guoba.jpg@bela3.jpg","guoba.jpg@bela3.jpg","guoba.jpg@bela3.jpg",
"guoba.jpg@bela3.jpg","guoba.jpg@bela3.jpg"];
var namelist=["","Solokov@我","Solokov@我","Solokov@我","Solokov@我","Solokov@我"," @我"," @我","？@我","？@我","布列斯特@我","布列斯特@我",
"布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我",
"布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我","布列斯特@我",
"布列斯特@我","布列斯特@我"," @我","？@我"," @我","？@我"," @我"," @我"," @我"," @我"," @我"," @我","旁白@ ","葡共@我","葡共@我","葡共@我",
"葡共@我","葡共@我","葡共@我","葡共@我","еї«и·‘пјЃ@еї«и·‘пјЃ","葡共@我","葡共@我","旁白@ ","葡共@我","葡共@我","葡共@我","葡共@我","葡共@我",
"葡共@我"," @我","锅巴@我","锅巴@我","锅巴@我","锅巴@我","锅巴@我"];
var audiolist=[""];

var egglist=["你真的想知道真相吗？","为什么不自己去寻找呢？","嫌疑人已经浮出水面了......","难道你还不知道吗？","去搜寻更多线索吧......",
"你不觉得......","你自己很可悲吗？","被困在这里......","企图找到凶手......","你是否曾想过，为什么你会被请来？","想过吗？",
"你还记得自己是从哪里来的吗？","你知道自己是谁吗？","你不知道......","因为......","你的θ®°εΏ†记忆撌脩�#&被-(%@!!~",
"逃иє«ењЁе°дё–дёЌз§°ж„离Џ ж¬Іе‡єдё–иЂЊеїѓзѕЎд№‹ еѕЉ这дёЌе®љйљѕжЉ‰ж‹© и°里ЃзџҐиє«еїѓеђ‘дЅ•е¤„！"];
async function easter_egg(){
    console.clear();
    for(var i=0;i<egglist.length;i++){
        if(i>1&&current_chapter<2) break;
        if(i>4&&current_chapter<3) break;
        console.log(egglist[i]);
        await sleep(3000);
    }
    await sleep(3000);
    console.clear();
}
var mythlist=["醒来吧......","醒来吧，迷路的人......","你已经沉睡了很久了......","é†’æ¥å§ï¼Œè¿·è·¯ç„äºº","别沉迷于幻象......",
"不要认为一切都是正常的......","把自己变疯吧......","选择那些不可理喻的路......","你才能醒过来......"];
async function myths(){
    console.clear();
    for(var i=0;i<mythlist.length;i++){
        console.log(mythlist[i]);
        await sleep(3000);
    }
    await sleep(3000);
    console.clear();
}
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
function myplay(str){
    if(audio_set!=0){
        var aud=new Audio(str);
        aud.play();
    }
}
function mainthemeplay(){
    myplay("maintheme.mp3");
}
function to_end(sign){
    document.getElementById('endstage').style.display="";
    document.getElementById('mainpart').style.display="none";
    if(sign==1){
        document.getElementById('endheader').style.opacity="0";
        document.getElementById('endheader').innerHTML="<p>结局1</p><h1>被不明人员杀害</h1><p>达成</p>";
        fadeIn("endheader",10000);
        conver_id--;
        SAVE();
        document.getElementById('endcontent').style.opacity="0";
        document.getElementById('endcontent').innerHTML="进度已保存，刷新以重新开始";
        fadeIn("endcontent",10000);
    }
}

function NEXT_CHAPTER(sign){

}
function choose_st(oppp){
    st_chosen=oppp;
    if(oppp==1) document.getElementById('opa').style.color="red";
    else if(oppp==2) document.getElementById('opb').style.color="red";
    else if(oppp==3) document.getElementById('opc').style.color="red";
    else window.alert("Error Code : 102 !");
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
    var tmpconverid=getCookie("process");
    if(tmpconverid=="") conver_id=1;
    else conver_id=tmpconverid;
    //conver_id=1;
    if(global_effect!=0){
        for(var i=0;i<converlist.length;i++){
            if(i&1) converlist[i]="0逃иє«ењЁе°дё–дёЌз§°ж„离Џ ж¬Іе‡єдё–иЂЊеїѓзѕЎд№‹ еѕЉ这дёЌе®љйљѕжЉ‰ж‹© и°里ЃзџҐиє«еїѓеђ‘дЅ•е¤„！1";
            else converlist[i]="1逃иє«ењЁе°дё–дёЌз§°ж„离Џ ж¬Іе‡єдё–иЂЊеїѓзѕЎд№‹ еѕЉ这дёЌе®љйљѕжЉ‰ж‹© и°里ЃзџҐиє«еїѓеђ‘дЅ•е¤„！1";
        }
        for(var i=0;i<comment.length;i++){
            comment[i]="鍒仠鐣控制台杩欓�@easter_egg()ёЌз§°ж„@Џ ж¬Іе‡єдё–иmyths()ЂЊеїѓзѕЎд№‹ еѕЉ@дёЌе®љйљѕжЉ‰ж‹© и°ЃзџҐиє«еїѓеђ‘дЅ•е¤„";
        }
        for(var i=0;i<backgroundlist.length;i++){
            backgroundlist[i]="unknown.jpg@unknown.jpg";
        }
        for(var i=0;i<namelist.length;i++){
            namelist[i]="獵삣�easter_egg()瓦숅뇤@з¦»ејЂmyths()иї™й‡Њ";
        }
    }
    while(1){
        //window.alert("new turn");
        var tmpforout=converlist[conver_id];
        SAVE();
        //获取对话人物头像
        var tmpleftimg="src/",tmprgtimg="src/";
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
        if(conver_id==52) document.getElementById('body').style.background="black";
        else if(global_effect==0) document.getElementById('body').style.background="";
        //获取对话内容
        if(tmpforout[0]=='0') stdout("lconver",tmpforout,60,1);
        else if(tmpforout[0]=='1') stdout("rconver",tmpforout,60,1);
        else if(tmpforout[0]=='2') document.getElementById('rconver').innerHTML="",stdout("lconver",tmpforout,60,1);
        else  document.getElementById('lconver').innerHTML="",stdout("rconver",tmpforout,60,1);
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
            else if(st_chosen==3&&option3!=""){
                conver_id=nxt3[conver_id];
            }
            else{
                if(global_effect==0) window.alert("Error Code : 100 !\n可能原因：\n1. 按下回车过快；\n2. 没有选择选项。\n请刷新解决。");
                else window.alert("ç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œç¦»å¼€è¿™é‡Œ");
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
                SAVE();
                to_end(is_end[conver_id]);
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
    if(global_effect==0) document.getElementById('body').style.background="";
    document.getElementById('logo').style.display="none";
    document.getElementById('options').style.display="none";
    document.getElementById('mainpart').style.display="";
    document.getElementById('stage').style.display="none";
    document.getElementById('offi').style.display="block";
    chp();
}
