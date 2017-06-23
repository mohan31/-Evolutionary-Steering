function Vehicle(x,y){
    this.vel = createVector(0,-2);
    this.acc = createVector(0,0);
    this.position = createVector(x,y);

    this.r = 6;
    this.maxSpeed = 8;
    this.maxForce = 0.2;


    this.applyForce = function(force){
        this.acc.add(force);
    };

    this.update = function(){

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.position.add(this.vel);
        this.acc.mult(0);
    };

    this.seek = function (target){
        var desired = p5.Vector.sub(target,this.position);

        desired.setMag(this.maxSpeed);

        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        this.applyForce(steering);
    };

    this.display = function(){
     // Draw a triangle rotated in the direction of velocity
        var theta = this.vel.heading() + PI/2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x,this.position.y);
        rotate(theta);
        beginShape();
        vertex( -this.r,this.r*3);
        vertex( this.r,this.r*3);
        vertex(0, 0);
        endShape(CLOSE);
        pop();

    };
}
