// Define a callback function.
function CheckIfPrime(value, index, ar) {
    high = Math.floor(Math.sqrt(value)) + 1;

    console.log("high:", high, "value:", value, "index:", index, ar);

    for (var div = 2; div <= high; div++) {
        console.log("  div:", div, high, value % div);
        if (value % div == 0) {
            console.log("return false", value, div, value % div);
            return false;
        }
    }
    return true;
}

// Create the original array.
var numbers = [31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53];

// Get the prime numbers that are in the original array.
var primes = numbers.filter(CheckIfPrime);

// document.write(primes);
console.log(primes);

console.log(6%6);