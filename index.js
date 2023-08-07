const canvas= document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.width=1024;
canvas.height=720;

c.fillRect(0, 0, canvas.width,canvas.height);

const gravity=0.1;
class Sprite {
    // create constructor for a sprite
    constructor({position, velocity}){
        //assign position variable
        this.position=position;

        //add velocity 
        this.velocity =velocity;

        //add height
        this.height=150;
    }
    //draw method to draw a sprite (player, enemy,...etc)
    draw(){
        //fillStyle set the color for fillRect
        c.fillStyle="red";
        c.fillRect(this.position.x, this.position.y,50,150);
    }
    //create moving method, update the time frame for object
    update(){
       this.draw();
       this.position.y += this.velocity.y;
    
       /*if else statement to change the velocity back to 0 if the y axis 
       position of the object, height,and vertical velocity sump up to 0
       ----else we add the gravity value into velocity*/
        if(this.position.y+this.height+this.velocity.y>=canvas.height){
            this.velocity.y=0;
        }
        else{
            this.velocity.y+=gravity;
        }
    }
}
//create player and parse in values into Sprite object
const player = new Sprite({position: {
    x: 0,
    y: 0
}, velocity: {
    x: 0,
    y: 4
}});

//create enemy and parse in values into Sprite object
const enemy = new Sprite({position: {
    x: 600,
    y: 150
}, velocity: {
    x: 0,
    y: 4
}});

// create animation
function animate(){
    //loop the animate function over and over again (act as a infinite loop)
    window.requestAnimationFrame(animate);
    c.fillStyle='black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}
animate();