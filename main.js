var status="";
var object=[];
var textcomapre="";
function preload(){}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function start(){
    Objectdetecter=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="detecting object";
textcomapre=document.getElementById("input").value;
console.log(textcomapre);
}
function modelLoaded(){
    console.log("modelloaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
if (error){
    console.log(error);
}
else{
    console.log(results);
    object=results;
}
}
function draw(){
    image(video,0,0,480,380);
    if (status != ""){
        Objectdetecter.detect(video,gotResult);
        for (i=0 ;i<object.length;i++){
            document.getElementById("status").innerHTML="detected object";
            fill("blue");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("blue");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if (object[i].label == textcomapre){
                video.stop();
                Objectdetecter.detect(gotResult);
document.getElementById("numberofobject").innerHTML=textcomapre+" found";
synth=window.speechSynthesis;
utterthis=new SpeechSynthesisUtterance(textcomapre+"found");
synth.speak(utterthis);
            }
            else{
                document.getElementById("numberofobject").innerHTML=textcomapre+" not found";
            }
        }
    }
}