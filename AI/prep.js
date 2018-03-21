var diff = function(oldData, newData) {
    if(newData >= oldData) { // 증가 또는 변화 없음
        console.log("1");
        return 1;
    }else { // 감소
        console.log("0");
        return 0;
    }

};

var main = function(/* Array */ arr) {
    var data;

    for(var idx=0, idxLen=arr.length-2; idx<idxLen; idx++) {
        diff(arr[idx], arr[idx+1])
    }// ~for - idx
};


var arr = require('./data/data.js').prep;
// var arr = [1988, 1988, 1987, 1988, 1989, 1990, 1991, 1995, 2000, 2003, 2005, 2000, 2000, 1999, 1988, 1999, 2000];

main(arr);

