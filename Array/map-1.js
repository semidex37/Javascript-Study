// Define the callback function.
function AreaOfCircle(radius) {
    var area = Math.PI * (radius * radius);
    // return area.toFixed(0);
    return radius;
}

// Create an array.
var radii = [10, 20, 30];

// Get the areas from the radii.
var areas = radii.map(AreaOfCircle);

console.log(areas);

console.log(areas[1] == radii[1]);

// Output:
// 314,1257,2827