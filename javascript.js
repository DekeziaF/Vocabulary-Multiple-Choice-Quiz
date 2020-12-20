var answer;
var count = 0;
var score = 5;

var randomNumber;
    var length = 5;
    var arrayRandom = [];
    var j = 0;    
    for(x = 0; x < length; x++){
        while(j !== 5){
            randomNumber = Math.floor(Math.random() * 10);
        
            if (arrayRandom.indexOf(randomNumber) < 0){
                arrayRandom.push(randomNumber);
                j++;
            }
        }
    }
    
    console.log(arrayRandom);
    
validateName = function() {
    var name = document.myform.name.value;
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    
    if (name === null || name === "") {
        alert("Name cannot be blank");
        return false;
    } else if (!regName.test(name)){
        alert("This Name is Invalid. Please Enter Your Full Name (Eg. John Doe).");
        return false;
    }  
}


getXMLFile = function(path, callback){
    let request = new XMLHttpRequest();
    request.open("GET", path);
    request.setRequestHeader("Content-Type", "text/xml");
    request.onreadystatechange = function(){
       if (request.readyState === 4 && request.status === 200){
           callback(request.responseXML);
       } 
    };
    request.send();
};


getXMLQuestion  = function(){
    getXMLFile("questions.xml", function(xml){
               
    var xmlDoc = xml.responseXML; 
    var length = 5;
    var x = 0;
    var j = 0;
    var i = 0;
        
    var tempRan;
    tempRan = arrayRandom[count];  
        
        if(count===5){
            document.getElementById("word").innerHTML = "Your Results" ;
            document.getElementById("sentence").innerHTML = "\n\n\n";
            document.getElementById("options").innerHTML = score + "/5";
            document.getElementById("options").style.color = "#000000";
            document.getElementById("options").style.fontSize = "45px";
            document.getElementById("restart").style.visibility = 'visible';
            document.getElementById("restart").innerHTML = "RESTART";
            document.getElementById("restart").onclick = function(event) {startOver()};
            
        }
   
        else{
            
                        
            document.getElementById("word").innerHTML = xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('word')[0].childNodes[0].nodeValue;

            document.getElementById("sentence").innerHTML = xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('question')[0].childNodes[0].nodeValue;

            document.getElementById("option1").innerHTML = xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('answer')[0].childNodes[0].nodeValue;

            document.getElementById("option2").innerHTML = xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('answer')[1].childNodes[0].nodeValue;

            document.getElementById("option3").innerHTML = xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('answer')[2].childNodes[0].nodeValue;

            document.getElementById("option4").innerHTML = xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('answer')[3].childNodes[0].nodeValue;
            
            document.getElementById("restart").style.visibility = 'hidden';
            
            for(var j=0; j<4; j++){
                if(xml.getElementsByTagName('item')[tempRan].getElementsByTagName('answer')[j].getAttribute('correct')){
                    answer = xml.getElementsByTagName('item')[tempRan].getElementsByTagName('answer')[j].getAttribute('correct');
                }

            }

            console.log(answer);
            document.getElementById("option1").onclick = function(event) {HTMLButtonElement(answer)};
            document.getElementById("option2").onclick = function(event) {HTMLButtonElement(answer)};
            document.getElementById("option3").onclick = function(event) {HTMLButtonElement(answer)};
            document.getElementById("option4").onclick = function(event) {HTMLButtonElement(answer)};

        }           
    });
     
}
incorrectResponse = function(){

    getXMLFile("questions.xml", function(xml){
    
        var tempRan = [];
        tempRan = arrayRandom[count-1];             
        var xmlDoc = xml.responseXML; 
    
        confirm(xml.getElementsByTagName('item')[tempRan]. getElementsByTagName('definition')[0].childNodes[0].nodeValue);
        
    });
    
}


HTMLButtonElement = function(answer) {
   var nextQuestion =0;
   var correct;
    
    if(event.target.innerHTML === answer){
         correct = 'y';
         alert("You are correct");
         theQuiz();
         count++;
         
     }
   
    else{
        correct = 'n';
        alert("Incorrect Answer");
        incorrectResponse();
        theQuiz();
        count++;
        score--;
    }
    console.log(score + "/5");
   
}
theQuiz = function(){  
    
   getXMLQuestion();
    
    
}
startOver = function(){
    
    location.replace("index.html") ;
}




