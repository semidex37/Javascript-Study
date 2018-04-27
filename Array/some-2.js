// Create a function that returns true if the value is
// outside the range.
var isOutsideRange = function (value) {
    return value < this.minimum || value > this.maximum;
}

// Create an array of numbers.
var numbers = [6, 12, 16, 22, -12];

// The range object is to be the 'this' object.
var range = { minimum: 10, maximum: 20 };

console.log(numbers.some(isOutsideRange, range));

// Output: true