best_song_ever = 0;
steal_my_girl = 0;

left_wristX = 0;
left_wristY = 0;

right_wristX = 0;
right_wristY = 0;

song1_status = "";
song2_status = "";

leftWrist_score = 0;
rightWrist_score = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is initalized");
}


function draw() {
    image(video, 0, 0, 500, 400);
    song1_status = song1.isPlaying();
   
    song2_status = song2.isPlaying();

    fill("red");
    stroke("red");

    if (leftWrist_score > 0.01) {
        console.log("showing  left wrist");
        circle(left_wristX, left_wristY, 40);
        song2.stop();

        if (song1_status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = " Playing - Harry Potter Theme song "
        }
    }

    if (rightWrist_score > 0.01) {
        console.log("showing  right wrist");
        circle(right_wristX, right_wristY, 40);
        song1.stop();

        if (song2_status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing - Peter Pan";
        }

    }
    
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWrist_score = results[0].pose.keypoints[9].score;
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        rightWrist_score = results[0].pose.keypoints[10].score;
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        console.log("left wrist x =" + left_wristX + " left wrist y =" + left_wristY);
        console.log("right wrist x =" + right_wristX + " right wrist y =" + right_wristY);
        console.log(" left wrist score = "+ leftWrist_score + " right wrist score = "+ rightWrist_score)

    }
}