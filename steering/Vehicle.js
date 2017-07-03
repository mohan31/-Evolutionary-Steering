

function Vehicle(x,y){
    this.vel = createVector(0,-2);
    this.acc = createVector(0,0);
    this.position = createVector(x,y);

    this.r = 6;
    this.maxSpeed = 5;
    this.maxForce = 0.2;

    this.health = 1;

    this.dna = [];
    //Food weight
    this.dna[0] = random(2,-2);
    //poison weigth
    this.dna[1] = random(2,-2);
    //Food perception
    this.dna[2] = random(10,100);
    //Poison perception
    this.dna[3] = random(10,100);

    this.applyForce = function(force){
        this.acc.add(force);
    };

    this.behivour  = function(good,bad){
        var steerG = this.eat(good , 0.1,this.dna[2]);
        var steerB = this.eat(bad , -0.1,this.dna[3]);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    this.dead = function(){
        return (this.health < 0);
    }

    this.eat = function(list, energy,precption){
        var record = Infinity;
        var closest = -1;
        for(var i=0; i<list.length; i++){
            //var d = dist(this.position.x,this.position.y,list[i].x,list[i].y);
            var d = this.position.dist(list[i]);

            if(d < record && d < precption){
                record = d;
                //console.log(d);
                closest = i;
            }
        }

        if(record < this.maxSpeed){
            list.splice(closest,1);
            this.health+=energy;
        }
        else if(closest >-1){
            return this.seek(list[closest]);
        }

        return createVector(0,0);
    };

    this.update = function(){
        this.health-=0.005;

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
        //this.applyForce(steering);

        return steering;

    };



        this.boundaries = function() {
            var d = 25;
            var desired = null;

            if (this.position.x < d) {
                desired = createVector(this.maxSpeed, this.vel.y);
            }
            else if (this.position.x > width -d) {
                desired = createVector(-this.maxSpeed, this.vel.y);
            }

            if (this.position.y < d) {
                desired = createVector(this.vel.x, this.maxSpeed);
            }
            else if (this.position.y > height-d) {
                desired = createVector(this.vel.x, -this.maxSpeed);
            }

            if (desired !== null) {
                desired.normalize();
                desired.mult(this.maxSpeed);
                var steer = p5.Vector.sub(desired, this.vel);
                steer.limit(this.maxForce);
                this.applyForce(steer);
            }
        };

    this.display = function(){
     // Draw a triangle rotated in the direction of velocity
        var angle = this.vel.heading() + PI/2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x,this.position.y);
        rotate(angle);

        //If in debugging mode
        if(checkbox.checked()){
            stroke(0,255,0);
            noFill();
            line(0,0,0,-this.dna[0]*20);
            ellipse(0,0,this.dna[2]*2);
            stroke(255,0,0);
            line(0,0,0,-this.dna[1]*20);
            ellipse(0,0,this.dna[3]*2);
        }
        var red = color(255,0,0);
        var green = color(0,255,0);
        var col = lerpColor(red,green,this.health);
        stroke(0);
        fill(col);
        beginShape();
        vertex( -this.r,this.r*3);
        vertex( this.r,this.r*3);
        vertex(0, 0);
        endShape(CLOSE);
        pop();

    };
}
