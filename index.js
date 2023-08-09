const canvas= document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.width=1024;
canvas.height=600;

c.fillRect(0, 0, canvas.width,canvas.height);

const gravity=0.15;

//create player and parse in values into Sprite object
const player = new Fighter({position: {
    x: 0,
    y: 0
}, velocity: {
    x: 0,
    y: 4
}, color: "green", offset: {
    x:0,
    y:0
}, imageSrc: "./characterAsset/Player1/Idle.png",
frameMax:8,
scale: 2,
offset:{
    x:0,
    y:93
    }

});

//create enemy and parse in values into Sprite object
const enemy = new Fighter({position: {
    x: 600,
    y: 150
}, velocity: {
    x: 0,
    y: 4
}, offset:{
    x: 0,
    y: 107
}, imageSrc: "./characterAsset/Player2/Idle.png",
frameMax:4,
scale: 2
});
const background= new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./characterAsset/background.png"
});
const shop= new Sprite({
    position: {
        x: 605,
        y: 95
    },
    imageSrc: "./characterAsset/shop.png",
    scale: 3,
    frameMax: 6
});
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
    background.update();
    shop.update();
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

    //detect collision
    if (rectCollision({r1: player, r2: enemy} )){
        player.isAttacking=false;
        console.log("player attacking successful");
        enemy.health-=20;
        document.querySelector('#enemyHealth').style.width=enemy.health+"%";
    }
    
    if (rectCollision({r1: enemy, r2: player})){
        enemy.isAttacking=false;
        console.log("enemy attacking successful");
        player.health-=20;
        document.querySelector('#playerHealth').style.width=player.health+"%";
        
    }
    //end game base on health
    if(enemy.health<=0 || player.health<=0){
        determineWinner({player, enemy});
    }


}

decreaseTimer();
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
        case 'j':
            player.attack();
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
        case '1':
            if(event.code=='Numpad1') enemy.attack();
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
