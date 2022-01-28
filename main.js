status_of_model = "";
objects = [];

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status_model").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("input").value;
}

function modelLoaded(){
  console.log("cocossd loaded");
  status = "true";
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw(){
    image(video,0,0,400,400);
    if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status_model").innerHTML = "Status : Objects Detected";
          
           
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == object_name){
            video.stop();
            document.getElementById("status_object").innerHTML = object_name + " found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + " found");
            synth.speak(utterThis); 
          }
          else{
            document.getElementById("status_object").innerHTML = object_name + " not found";
            synth2 = window.speechSynthesis;
            utterThis2 = new SpeechSynthesisUtterance(object_name + " not found");
            synth2.speak(utterThis2); 
          }
        }
      }
}







