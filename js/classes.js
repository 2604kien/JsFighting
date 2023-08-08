class Sprite {
    // create constructor for a sprite
    constructor({position, imageSrc}){
        //assign position variable
        this.position=position;
        this.width=50;
        this.image=new Image();
        this.image.src=imageSrc;
        //add velocity 

        //add height
        this.height=150;

    }
    //draw method to draw a sprite (player, enemy,...etc)
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
        
    }
    //create moving method, update the time frame for object
    update(){
       this.draw();
    }

}
class Fighter {
    // create constructor for a sprite
    constructor({position, velocity, color = 'red', offset}){
        //assign position variable
        this.position=position;
        this.width=50;
        //add velocity 
        this.velocity =velocity;
        this.lastKey;
        //add height
        this.height=150;
        this.health=100;
        this.attackBox={
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
    }
    //draw method to draw a sprite (player, enemy,...etc)
    draw(){
        //fillStyle set the color for fillRect
        c.fillStyle=this.color;
        c.fillRect(this.position.x, this.position.y,this.width,150);
        if(this.isAttacking){
            c.fillStyle='yellow';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
        
    }
    //create moving method, update the time frame for object
    update(){
       this.draw();
       this.attackBox.position.x=this.position.x+this.attackBox.offset.x;
       this.attackBox.position.y=this.position.y;
       this.position.x += this.velocity.x;
       this.position.y += this.velocity.y;
    
       /*if else statement to change the velocity back to 0 if the y axis 
       position of the object, height,and vertical velocity sump up to 0
       ----else we add the gravity value into velocity*/
        if(this.position.y+this.height+this.velocity.y>=canvas.height-120){
            this.velocity.y=0;
        }
        else{
            this.velocity.y+=gravity;
        }
    }
    attack(){
        this.isAttacking=true;
        setTimeout(()=>{this.isAttacking=false}, 100);
    }
}