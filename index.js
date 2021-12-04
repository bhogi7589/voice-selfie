var recognition = new window.webkitSpeechRecognition();
var synth = window.speechSynthesis;

window.addEventListener('load', function(){
    camera = document.getElementById("camera");
    Webcam.set({
        width: 350,
        height: 250,
        image_format: "png",
        png_quality: 90
    });
    Webcam.attach(camera);    
});

function start(){
    document.getElementById("text").value = "";
    recognition.start();
}

recognition.onresult = function(event){
    document.getElementById("text").value = event.results[0][0].transcript;
    if (document.getElementById("text").value.toLowerCase() == "take my selfie"){
        speak();
    }
};

function speak(){
    var voice = new SpeechSynthesisUtterance("Taking your selfie in 5 seconds");
    synth.speak(voice);
    window.setTimeout(snap, 5000);
}

function check(){
    var rbs = document.getElementById("group").querySelectorAll('input[name="format"]');
    for (var rb of rbs){
        if (rb.checked){
            return rb.value;
        }
    }
}

function set(){
    var format = check();
    if (format == "png"){
        Webcam.set({
            width: 350,
            height: 250,
            image_format: "png",
            png_quality: 90
        });    
    }
    else {
        Webcam.set({
            width: 350,
            height: 250,
            image_format: "jpeg",
            jpeg_quality: 90
        });    
    }
}

function snap(){
    set();
    Webcam.snap(function(url){
        document.getElementById("selfie").src = url;
        var link = document.getElementById("download");
        link.href = url;
        document.getElementById("parent").classList.remove("d-none");
    });
}