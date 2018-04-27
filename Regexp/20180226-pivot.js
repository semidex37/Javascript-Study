var str = "[FLD01][CDE01238sjklasdf][User count]";
var regexp;
var regexpStr;
var matchArr;

// Case 1
regexpStr = "FLD01";
regexp = new RegExp('\\['+regexpStr+'\\]', 'g');

matchArr = str.match(regexp);
console.log("1. " + matchArr);
if(matchArr) {
    console.log("1. Length: " + matchArr.length);
}


// Case 2
regexp = new RegExp("\\[[a-zA-Z0-9 ]+\\]", 'g');
matchArr = str.match(regexp);
console.log("2. " + matchArr);
if(matchArr) {
    console.log("2. Length: " + matchArr.length);
    for(var idx in matchArr) {
        console.log("Match String:", idx, matchArr[idx]);
    }
}

