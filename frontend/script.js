/*console.log("IDS JavaScript Started");
let project="Network Intrusion Detection System";
console.log(project)
let status="working"
console.log(status)
status = "ready";
console.log(status);
let studentname="faeza";
/*let age=20;*/
/*let projectname="Network";
let packetcount=9;
console.log(typeof studentname,typeof age)
console.log(typeof projectname,typeof packetcount)
let packet=20
let flow=5
console.log(packet+flow)
console.log(packet-flow)
console.log(packet/flow)
console.log(packet*flow)

console.log(packet>flow)
console.log(packet<flow)
console.log(packet===flow)
console.log(packet!==flow)
if(packet>10 && flow<1){
    console.log("Packet is greater")
}
else if(packet===flow){
    console.log("Both are equal")
}
else{
    console.log("Flow is greater")
}
let isAttack=false
console.log(!isAttack)
function greet(name) {
    console.log("hello",name)
}
greet("faeza")
function showinfo(name,age){
       console.log(name,age)
}
showinfo("faeza",20)

function add(a,b) {
    
    return a+b

}
let sum=add(2,3)
console.log(sum)
function multiply(a,b) {
    return a*b
}
let result=multiply(2,3)
console.log(result)
let packets = [10, 20, 30, 40];
console.log(packets[0])
console.log(packets[1]=25)

console.log(packets)
console.log(packets.length)
packets.push(50)

let count=1
while(count<=5){
    console.log(count)
    count+=1
}

let student = {
    name: "Faeza",
    age: 20,
    course: "Data Science",

    greet: function () {
        console.log("Hello, I am", this.name);
    }
};

student.greet();
console.log(student.name)
console.log(student.age=21)
console.log(student.course)
console.log(student)*/

/*let name="Faeza";*/
/*let age=20;
let course="Data Science";
console.log(`My name is ${name}, I am ${age} years old and i study ${course}`)
let text = "Hello Faeza";
let message = "Network Intrusion Detection System";
console.log(message.length);
console.log(message.toUpperCase());
console.log(message.toLowerCase());
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let courseInput=document.getElementById("course")
/*let button = document.getElementById("mybutton");
button.addEventListener("click", function() {
    console.log(nameInput.value);
    console.log(ageInput.value);
      console.log(courseInput.value);
});*/
/*let form = document.getElementById("myForm");
form.addEventListener("submit",function (event) {
      event.preventDefault();
      console.log("Form submitted")
    
});*/

/*let form = document.getElementById("myForm");

form.addEventListener("submit",function (event) {
      event.preventDefault();
    let formData=new FormData(form);
    let name=formData.get("name" );
    let age=formData.get("age");
    
    console.log(name);
    console.log(age)
});
fetch("http://127.0.0.1:8000/health")
    .then(response => response.json())
    .then(data => {
        console.log(data);*/
/*let form = document.getElementById("networkForm");
 form.addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(form);

    console.log(formData.get("Protocol"));
    console.log(formData.get("Flow_Duration"));
});
*/
/*fetch("http://127.0.0.1:8000/NetworkFlow", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})*/
let form = document.getElementById("networkForm");
let button = form.querySelector('input[type="submit"]');
let resultBox = document.getElementById("predictionResult");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let formData = new FormData(form);

    let data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = Number(value);
    }

    button.value = "⏳ Checking...";
    button.disabled = true;

    fetch("http://127.0.0.1:8000/NetworkFlow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        return response.json();
    })

    .then(result => {

        if (result.classification === "Benign") {

            console.log("Benign");

            resultBox.style.backgroundColor = "#f0fff4";
            resultBox.style.borderColor = "#4caf50";
            resultBox.style.color = "#2e7d32";

            document.getElementById("resultIcon").textContent = "🛡️";
        }

        else {

            console.log("DoS Attack");

            resultBox.style.backgroundColor = "#fff0f0";
            resultBox.style.borderColor = "#e05252";
            resultBox.style.color = "#c62828";

            document.getElementById("resultIcon").textContent = "⚠️";
        }

        document.getElementById("classification").textContent =
            "Traffic Status: " + result.classification;

        document.getElementById("confidence").textContent =
            "Confidence: " + (result.confidence * 100).toFixed(2) + "%";

        button.value = "🛡️ Check Traffic";
        button.disabled = false;
    })

    .catch(error => {

        console.log(error);

        resultBox.style.backgroundColor = "#fff8e1";
        resultBox.style.borderColor = "#f0ad4e";
        resultBox.style.color = "#8a5a00";

        document.getElementById("resultIcon").textContent = "⚠️";

        document.getElementById("classification").textContent =
            "Error: " + error.message;

        document.getElementById("confidence").textContent =
            "Please check whether the FastAPI server is running.";

        button.value = "🛡️ Check Traffic";
        button.disabled = false;
    });

});