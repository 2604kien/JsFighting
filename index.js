const canvas= document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.width=1024;
canvas.height=600;

c.fillRect(0, 0, canvas.width,canvas.height);

const gravity=0.15;
class Sprite {
    // create constructor for a sprite
    constructor({position, velocity}){
        //assign position variable
        this.position=position;

        //add velocity 
        this.velocity =velocity;
        this.lastKey;
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
       this.position.x += this.velocity.x;
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
const keys={
    //first key
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    //2nd Key
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}


function animate(){
    //loop the animate function over and over again (act as a infinite loop)
    window.requestAnimationFrame(animate);
    c.fillStyle='black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x=0;
    enemy.velocity.x=0;
    //player movement
    if (keys.a.pressed && player.lastKey =="a"){
        player.velocity.x=-4;
    }
    else if(keys.d.pressed && player.lastKey =="d"){
        player.velocity.x=4;
    }
    //2nd player movement
    if (keys.ArrowLeft.pressed && enemy.lastKey =="ArrowLeft"){
        enemy.velocity.x=-4;
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey =="ArrowRight"){
        enemy.velocity.x=4;
    }
}
animate();

//add Event Listener that listen to an event (key down, key up)

window.addEventListener('keydown', (event)=>{
    switch(event.key){
        //1st player key
        case 'd':
            keys.d.pressed=true;
            player.lastKey="d";
        break;
        case 'a':
            keys.a.pressed=true;
            player.lastKey="a";
        break;
        case 'w':
            player.velocity.y=-8;
        break;

        //2nd player key
        case 'ArrowRight':
            keys.ArrowRight.pressed=true;
            enemy.lastKey='ArrowRight'
        
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true;
            enemy.lastKey="ArrowLeft";
        break;
        case 'ArrowUp':
            enemy.velocity.y=-8;
        break;
    }
});
window.addEventListener('keyup', (event)=>{
    switch(event.key){
        //1st key up
        case 'd':
            keys.d.pressed=false;
        break;
        case 'a':
            keys.a.pressed=false;
        break;
        case 'w':
            keys.w.pressed=false;
        break;
        
        //2nd key up
        case 'ArrowRight':
            keys.ArrowRight.pressed=false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed=false;
        break;
    }
});
