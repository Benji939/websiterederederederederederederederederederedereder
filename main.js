
prediction="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quailty:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
    });
}
console.log(ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YK3rffDDx/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function speak(){
    var synth= window.speechSynthesis;
    speakdata1="The prediction is"+prediction;
    var utter=new SpeechSynthesisUtterance(speakdata1); 
    synth.speak(utter);
}
function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img, getresult);
}
function getresult(error, results){
if(error){
    console.log(error);
}else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML+results[0].label;
    prediction=results[0].label;
    speak();
    if(results[0].label=="Ok"){
        document.getElementById("update_gesture").innerHTML="&#128076;";
}      if(results[0].label=="Good"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
}           if(results[0].label=="Bad"){
                document.getElementById("update_gesture").innerHTML="&#128078;";
    }
    if(results[0].label=="Stop"){
        document.getElementById("update_gesture").innerHTML="&#128400;";
}      if(results[0].label=="Rock on"){
            document.getElementById("update_gesture").innerHTML="&#129304;";
}           if(results[0].label=="Hello/Goodbye"){
                document.getElementById("update_gesture").innerHTML="&#9995;";
}
if(results[0].label=="Stand for what you believe in"){
    document.getElementById("update_gesture").innerHTML="&#9994;";
}

}
}