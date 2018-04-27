var keyArr =  [
    '@color-black',
    '@gspfsabbb-Width',
    '@gspfsabbb-Style',
    '@prop-skin-004',
    '@csdpb-Style',
    '@csdpb-Width',
    '@csdpb-Color' ];

var valueArr = [
    'AA',
    'BB',
    'CC',
    'DD',
    'EE',
    'FF',
    'GG'
];

var htmlContent = "";

htmlContent += '@color-black;';
htmlContent += '@gspfsabbb-Width @gspfsabbb-Style @prop-skin-004;';
htmlContent += "@csdpb-Style @csdpb-Width @csdpb-Color;";

// var regexp = new RegExp("\\\${[\\S]+}", "g");

var regKey = "(@[a-zA-Z\-0-9]+)";
var regexp = new RegExp(regKey, "g");

var result = htmlContent.match(regexp);

if(result) {
    console.log(result.length);
    var idx,
        jdx;
    for(idx in result) {
        result[idx]

    }// ~for - idx

}
console.log(result);





// 중복 제거
// var keys = result.reduce(function(a, b) {
//     if(a.indexOf(b) < 0) {
//         a.push(b);
//     }
//     return a;
// }, []);
// var keys = DuplicateRemoveByArray(result);

// console.log(keys);
//
// // ${} 제거
// keys = keys.reduce(function(a, b) {
//     b = b.replace(/\${/g, "");
//     b = b.replace(/}/g, "");
//     a.push(b);
//     return a;
// }, []);
//
// console.log(keys);