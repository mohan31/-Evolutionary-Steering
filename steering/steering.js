var vehicle;

function setup(){
    createCanvas(600,400);
    vehicle = new Vehicle(width/2,height/2);
}

function draw(){
    background(0);

    var target = createVector(mouseX , mouseY);
    fill(127);
    stroke(200);
    strokeWeight(5);

    ellipse(target.x,target.y,50,50);

    vehicle.seek(target);
    vehicle.update();
    vehicle.display();


}
