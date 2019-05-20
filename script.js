

const canvas = document.getElementById("myCanvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")

var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
grd.addColorStop(0, "#00111e")
grd.addColorStop(.5, "#033d5e")
grd.addColorStop(1, "#00111e")


let numStars = 600
let stars = []
let size = .4
let speed = 1
let accelerate

canvas.onmouseenter = function(){
    // clearInterval(decelerate)
    accelerate = setInterval(function() {

        if (speed < 150) {
            speed += 3
            console.log(speed)
        }

    }, 100)

    accelerate()

} 

canvas.onmouseleave = function() {
    clearInterval(accelerate)
    speed = 1
    console.log("left")
    // let decelerate = setInterval(function() {
    //     speed -= .2
    //     console.log(speed)

    // }, 100)
    

    // decelerate()
}


var focal_length = canvas.width
let centerX = canvas.width / 2
let centerY = canvas.height / 2


for (i = 0; i < numStars; i++) {
    stars[i] = new star()
}

function star() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.z = Math.random() * canvas.width

    this.move = function() {
        this.z = this.z - speed
        if (this.z <= 0) {
            this.z = canvas.width
        }
    }
    this.show = function() {

        let x, y, s; 

        x = (this.x - centerX) * (focal_length / this.z)
        x = x + centerX
        
        y = (this.y - centerY) * (focal_length / this.z)
        y = y + centerY

        s = size * (focal_length / this.z)

        ctx.beginPath()
        ctx.arc(x, y, s, 0, Math.PI*2)
        ctx.fillStyle = "#fff"
        ctx.shadowBlur = Math.floor((Math.random()*15)+5)
        ctx.shadowColor = "#fff"
        ctx.fill()
    }

}

function draw() {

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (i = 0; i < numStars; i++) {
        stars[i].show()
        stars[i].move()
    }

}

function update(){
    draw()
    window.requestAnimationFrame(update)
}
update()
