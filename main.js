 sketches = ["Apple","banana","orange","pineapple","cat","snowman"]
var points= 0
function setup(){
    canvas = createCanvas(280,280)
    canvas.center()
    background("white")
    randomnum()
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis
}

function clearCanvas(){
    background("white")
    randomnum()
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet')
}

function draw(){
    strokeWeight(13)
    stroke(0)
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
    
}

function randomnum(){
    randomnumber = Math.floor(Math.random() * 6);
    stbd = sketches[randomnumber]
    document.getElementById("stbd").innerHTML = "Sketch To Be Drawn: "+stbd
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        drawn_sketch = results[0].label
        document.getElementById('sketch').innerHTML = "Label: "+results[0].label
        document.getElementById('conf').innerHTML = "Confidence: "+Math.round(results[0].confidence*100)+"%"
        UtterThis = new SpeechSynthesisUtterance(results[0].label)
        synth.speak(UtterThis)
        if(stbd==drawn_sketch){
            points = points+1
            document.getElementById("points").innerHTML ="Points: "+ points
        }else{
           
            randomnum()
        }
       
    }
}

