"use strict";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let timer;

function validateForm() {
    const reg = /^[0-9]*$/;
    let radiusNumber = document.getElementById("radius").value;
    let volumeNumber = document.getElementById("volume");
    
    if (reg.test(radiusNumber)) {
        volumeNumber.value = volumeCalc(radiusNumber);
        if (radiusNumber < 250) {
            circleDraw(radiusNumber);
        } else {
            swal("The radius does not fit the canvas area");
        }
    } else {
        swal("Please fill number");
    }
}

function volumeCalc(value) {
    value = Math.abs(value);
    let vol = (4/3) * Math.PI * Math.pow(value, 3);
    vol = Math.floor(vol);
    return vol;
}

function circleDraw(r) {
    ctx.beginPath();
    ctx.arc(250, 250, r, 0, Math.PI * 2, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

function blackCircles() {
    let count = 0;
    timer = setInterval(function () {
        ctx.beginPath();
        ctx.arc(250, 250, count, 0, Math.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.stroke();
        if (count > 250) {
            clearInterval(timer);
        }       
        count++;
    }, 100)
}

function startCircle() {
    stopCircle();
    clearCircle();
    blackCircles();
}

function stopCircle() {
    clearInterval(timer);
}

function clearCircle() {
    ctx.clearRect(0, 0, 500, 500);
}

document.getElementById("calculate")
    .addEventListener("click", validateForm);

document.getElementById("start")
    .addEventListener("click", startCircle);

document.getElementById("stop")
    .addEventListener("click", stopCircle);

document.getElementById("clear")
    .addEventListener("click", clearCircle);

blackCircles();
