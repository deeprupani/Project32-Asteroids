class Rocks {
    constructor(x, y, radius) {
        // console.log(x, y, radius);
        var options = {
            'restitution': 0.8,
            'friction': 1.0,
            'density': 1.0,
            'setStatic': false
        }
        this.body = Bodies.circle(x, y, radius, options);
        this.radius = radius;
        this.width = width;
        this.height = height;
        this.image=loadImage('./images/asteroid1.png');
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;

        imageMode(CENTER);
        fill("blue");
        image(this.image,pos.x, pos.y, this.radius);
    }
}