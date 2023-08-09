class Sprite {
    // create constructor for a sprite
    constructor({position, imageSrc, scale = 1, frameMax = 1, offset={x:0, y:0}}){
        //assign position variable
        this.position=position;
        this.width=50;
        this.image=new Image();
        this.image.src=imageSrc;
        this.scale=scale;
        this.frameMax=frameMax;
        this.frameCurrent=0;
        this.frameElapsed=0;
        this.frameHold=10;
        this.offset=offset;
        //add velocity 

        //add height
        this.height=150;

    }
    //draw method to draw a sprite (player, enemy,...etc)
    animateFrame(){
        
       this.frameElapsed++;
       if(this.frameElapsed % this.frameHold===0){
      
       if(this.frameCurrent<this.frameMax-1){
        this.frameCurrent++;
       }
       else{
        this.frameCurrent=0;
        }
        
    }
    }
    draw(){
        c.drawImage(this.image,
            this.frameCurrent*this.image.width/this.frameMax,
            0,
            this.image.width/this.frameMax,
            this.image.height,
             this.position.x - this.offset.x,
              this.position.y - this.offset.y,
              (this.image.width/this.frameMax)*this.scale,
              this.image.height*this.scale);
        
    }
    //create moving method, update the time frame for object
    update(){
       this.draw();
       this.animateFrame();
    }

}
//child class fighter extends from super class Sprite
class Fighter extends Sprite {
    // create constructor for a sprite
    constructor({position, sprites, velocity, color = 'red',  imageSrc, scale = 1, frameMax = 1, offset={x:0, y:0}}){
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        });
        //assign position variable
        this.frameCurrent=0;
        this.frameElapsed=0;
        this.frameHold=10;
        this.width=50;
        this.sprites=sprites;
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
        for (const sprite in sprites){
            sprites[sprite].image =new Image();
            sprites[sprite].image.src=sprites[sprite].imageSrc;
        }
      
    }
    //draw method to draw a sprite (player, enemy,...etc)

    //create moving method, update the time frame for object
    update(){
       this.draw();
       this.animateFrame();
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