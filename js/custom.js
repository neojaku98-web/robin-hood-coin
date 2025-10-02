// Toggle Class
$('.toggleMenu').click(function () {
    $('header').toggleClass('active');
});
$('header .menu a').click(function () {
    $('header').removeClass('active');
});


// Mouse
$(document).ready(function () {
    var cursor = $(".cursor");
    $(window).mousemove(function (e) {
        cursor.css({
            top: e.clientY - cursor.height() / 2,
            left: e.clientX - cursor.width() / 2
        });
    });
    $(window)
        .mouseleave(function () {
            cursor.css({ opacity: "0" });
        })
        .mouseenter(function () {
            cursor.css({ opacity: "1" });
        });
    //Spotlight on any number of elements by just selecting them
    $("header ul li a, .btn,a")
        .mouseenter(function () {
            cursor.css({ transform: "scale(3.2)" });
        })
        .mouseleave(function () {
            cursor.css({ transform: "scale(1)" });
        });
    $(window)
        .mousedown(function () {
            cursor.css({ transform: "scale(2)" });
        })
        .mouseup(function () {
            cursor.css({ transform: "scale(1)" });
        });
});


// Scroll to Circle
gsap.to(".svgcircle .svgcir", { rotation: 1440, duration: 200 });
// var rotate = gsap.timeline({
//   scrollTrigger:{
//     trigger: ".svgcircle",
//     pin: false,
//     scrub:1,
//     start: 'center center',
//     end:'+=5000',
//   }
// })
// .to('.svgcircle .svgcir', {
//   rotation:360,
//   duration:5000, ease:'none',
// })


// ------------------------------------------
// ---- Text Animation GSAP Js Start
// ------------------------------------------
let tl = gsap.timeline();

tl.from(".logo img, header li", {
    duration: 0.3,
    y: -300,
    autoAlpha: 0,
    ease: "elastic.out(1, 1)",
    stagger: {
        each: 0.75,
        amount: 0.5
    }
}).from(".anim .row", {
    duration: 1,
    y: 150,
    autoAlpha: 0,
    ease: "bounce.out", y: 200,
    stagger: .3
}, "+=0.1");

// ------------------------------------------
// ---- Text Animation GSAP Js End
// ------------------------------------------

//This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
//by Ethan Shulman

var width = 640;
var height = 480;
var nump = 600000;
var timeScale = 1.0;
var alphablend = false;

var vbuf;
var pstart;

var canvasElement;
var gl;
window.onload = function () {
    canvasElement = document.getElementById("display");
    canvasElement.width = window.innerWidth - 20;//width;
    canvasElement.height = window.innerHeight - 20;

    gl = canvasElement.getContext("webgl");
    if (!gl) {
        gl = canvasElement.getContext("experimental-webgl");
        if (!gl) alert("WebGL not supported!");
    }


    pstart = new Float32Array(nump * 2);
    var i = pstart.length;
    while (i--) {
        pstart[i] = Math.random() * 2 - 1;
    }

    vbuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
    gl.bufferData(gl.ARRAY_BUFFER, pstart, gl.STATIC_DRAW);

    var vsh = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsh, document.getElementById("vshader").innerHTML);
    gl.compileShader(vsh);

    var fsh = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsh,
        document.getElementById("fshader").innerHTML);

    gl.compileShader(fsh);

    var program = gl.createProgram();
    gl.attachShader(program, vsh);
    gl.attachShader(program, fsh);
    gl.linkProgram(program);
    gl.useProgram(program);

    var vattr = gl.getAttribLocation(program, "Vertex");
    gl.enableVertexAttribArray(vattr);
    gl.vertexAttribPointer(vbuf, 2, gl.FLOAT, false, 4, 0);

    tuni = gl.getUniformLocation(program, "Time");

    gl.enable(gl.BLEND);
    if (alphablend) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    } else {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    }


    gl.disable(gl.DEPTH_TEST);

    // gl.clearColor(0, 0, 0, 1);

    if (!window.requestAnimationFrame) window.requestAnimationFrame = setTimeout;

    startTime = Date.now();
    render();
}

var tuni, startTime;
function render() {
    window.requestAnimationFrame(render);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(tuni, (Date.now() - startTime) / 10000. * timeScale);
    gl.drawArrays(gl.POINTS, 0, nump);
}

function copyTexthere() {
    var temp = $("<input>");
    $("body").append(temp);
    temp.val($('#copyText1').text()).select();
    document.execCommand("copy");
    temp.remove();
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

let comingDate = new Date('Feb 8, 2024 13:12:00')

let d = document.getElementById('days')
let h = document.getElementById('hours')
let m = document.getElementById('minutes')
let s = document.getElementById('seconds')

let x = setInterval(function () {
    let now = new Date()
    let selisih = comingDate.getTime() - now.getTime()

    let days = Math.floor(selisih / (1000 * 60 * 60 * 24))
    let hours = Math.floor(selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let minutes = Math.floor(selisih % (1000 * 60 * 60) / (1000 * 60))
    let seconds = Math.floor(selisih % (1000 * 60) / 1000)

    d.innerHTML = getTrueNumber(days)
    h.innerHTML = getTrueNumber(hours)
    m.innerHTML = getTrueNumber(minutes)
    s.innerHTML = getTrueNumber(seconds)

    if (selisih < 0) {
        clearInterval(x)
        d.innerHTML = '00'
        h.innerHTML = '00'
        m.innerHTML = '00'
        s.innerHTML = '00'
    }
}, 1000)

function getTrueNumber(x) {
    if (x < 10) return '0' + x
    else return x
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    perlin = new ClassicalNoise(),
    variation = .0025,
    amp = 300,
    variators = [],
    max_lines = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 40,
    canvasWidth,
    canvasHeight,
    start_y;

for (var i = 0, u = 0; i < max_lines; i++, u += .02) {
    variators[i] = u;
}

function draw() {
    ctx.shadowColor = "rgba(43, 205, 255, 1)";
    ctx.shadowBlur = 0;

    for (var i = 0; i <= max_lines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, start_y);
        for (var x = 0; x <= canvasWidth; x++) {
            var y = perlin.noise(x * variation + variators[i], x * variation, 0);
            ctx.lineTo(x, start_y + amp * y);
        }
        var color = Math.floor(150 * Math.abs(y));
        var alpha = Math.min(Math.abs(y) + 0.05, .05);
        ctx.strokeStyle = "rgba(255,255,255," + alpha * 2 + ")";
        ctx.stroke();
        ctx.closePath();

        variators[i] += .005;
    }
}

(function init() {
    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
})();

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    draw();
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvasWidth = document.documentElement.clientWidth,
        canvasHeight = document.documentElement.clientHeight;

    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);

    start_y = canvasHeight / 2;
}
AOS.init();
