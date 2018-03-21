function AreaOfCircle(radius) {
    var area = Math.PI * (radius * radius);
    console.log(typeof area, area, area.toFixed(2));
    return area.toFixed(0);
}

// Create an array.
var radii = [10, 20, 30];

// Get the areas from the radii.
var areas = radii.map(AreaOfCircle);

console.log(areas);
//document.write(areas);