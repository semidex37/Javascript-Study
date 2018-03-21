// // CASE 1
// var n, s;
// n = new Number(100);
// s = "Current locale value is: ";
// s += n.toLocaleString();
// console.log(s);
//
// // Output:
// // The value 100 as represented by the current locale.




// CASE 2
var number = 123456789;
var options1 = { style: "percent" };
var options2 = { style: "currency", currency: "INR" };

console.log(number.toLocaleString("en-US"));
// 123,456,789
console.log(number.toLocaleString("ja-JP"));
// 123,456,789
console.log(number.toLocaleString("ar-SA", options1));
// ١٢,٣٤٥,٦٧٨,٩٠٠ %
console.log(number.toLocaleString("hi-IN", options2));
// ₹ 12,34,56,789.00