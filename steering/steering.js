var vehicles = [];
var food = [];
var poison = [];
function setup(){
    createCanvas(600,400);
    for(var i = 0; i<10; i++){
        var x = random(width);
        var y = random(height);
        vehicles[i] = new Vehicle(x,y);
    }
    for(var i=0; i < 40; i++){
        var x = random(width);
        var y = random(height);
        food.push(createVector(x,y));
    }
    for(var i=0; i < 10; i++){
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x,y));
    }
}

function draw(){
    background(0);

    if(random(1) < 0.05){
        var x = random(width);
        var y = random(height);
        food.push(createVector(x,y));
    }
    if(random(1) < 0.01){
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x,y));
    }
    //var target = createVector(mouseX , mouseY);
    fill(127);
    stroke(200);
    strokeWeight(5);

    //ellipse(target.x,target.y,50,50);

    for( var i=0; i<food.length; i++){
        fill(0,255,0);
        noStroke();
        ellipse(food[i].x,food[i].y,5,5);
    }

    for( var i=0; i<poison.length; i++){
        fill(255,0,0);
        noStroke();
        ellipse(poison[i].x,poison[i].y,5,5);
    }

    for(var i=vehicles.length-1; i>0; i--){
        vehicles[i].boundaries();
        vehicles[i].behivour(food,poison);
        //vehicle.seek(target);
        vehicles[i].update();
        vehicles[i].display();

        if(vehicles[i].dead()){
            vehicles.splice(i,1);
        }
    }




}
