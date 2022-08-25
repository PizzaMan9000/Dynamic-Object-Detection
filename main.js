statusCode = "";
objects = [];

function preload() {
}

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);

    video.size(380, 380);

    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {

    console.log("The Model Has Been Loaded!");
    statusCode = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {

    if (error)
    {
        console.log(error);
    } else {
        console.log(results);

        objects = results;
    }
}

function draw()
{
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);

    image(video, 0, 0, 380, 380);

    if (statusCode != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            fill(color(r, g, b));
            percantage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percantage + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke(color(r, g, b));
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("numberOfObjects").innerHTML = "cocossd has detected " + objects.length + " objects";
        }

        document.getElementById("status").innerHTML = "Status: Objects Detected";
    }
    
}