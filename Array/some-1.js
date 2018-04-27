/**
 * Created by yhjeong-C on 2017-10-20.
 */
// The callback function.
function CheckIfEven(value, index, ar) {
    if (value % 2 == 0)
        return true;
}

var numbers = [1, 15, 4, 10, 11, 22];

var evens = numbers.some(CheckIfEven);
console.log(evens);

// Output:
// true