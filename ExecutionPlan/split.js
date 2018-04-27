var DuplicateRemoveByArray = function(/* Array */ arr, /* Function */ callbackFunc) {
    if(typeof callbackFunc == 'function') {
        return arr.reduce(function() {
            return callbackFunc.apply(this, arguments);
        }, []);
    }

    return arr.reduce(function(a, b) {
        if(a.indexOf(b) < 0) {
            console.log("Default", a, b);
            a.push(b);
        }
        return a;
    }, []);
};

var RemovePatternsForArray  = function(/* Array */ arr, /* Array */ patterns) {
    if(!patterns) return arr;
    var index,
        pattern;
    return arr.reduce(function(a, b) {
        for(index in patterns) {
            pattern = patterns[index];
            b = b.replace(pattern, "");
        }// ~for - index
        a.push(b);
        return a;
    }, []);
};

// var htmlContent = '<div class="dvTable">\n';
//     htmlContent += '<div class="dvRow">\n';
//     htmlContent += '<div class="dvCell">\n';
//     htmlContent += '<div class="dvCellTitle">\n';
//     htmlContent += '<label for="txtTabsName" data-i18n="">#이름</label>\n';
//     htmlContent += '</div>\n';
//     htmlContent += '</div>\n';
//     htmlContent += '<div class="dvCell">\n';
//     htmlContent += '<div class="dvCellContent">\n';
//     htmlContent += '<input type="text" id="txtTabsName" name="txtTabsName" class="dvCellControl">\n';
//     htmlContent += '</div>\n';
//     htmlContent += '</div>\n';
//     htmlContent += '</div>\n';
//     htmlContent += '</div>\n';
//     htmlContent += '<script type="text/javascript">\n';
//     htmlContent += '$(document).ready(function(){\n';
//     htmlContent += 'console.log("123");\n';
//     htmlContent += '});\n';
//     htmlContent += '</script>\n';
//
//
// console.log(htmlContent);
//
// var str = "(<script[\sa-z\=\"\/]+)(>)([\s\S]+)(<\/script>)";
// var str = "(<script[\s])";
// var regexp = new RegExp(str, 'g');
//
// console.log("----- regexp -----");
// console.log(regexp);
// console.log("----- regexp.$1 -----");
// console.log(RegExp.$1);
// console.log("----- regexp.$2 -----");
// console.log(RegExp.$2);
// console.log("----- regexp.$3 -----");
// console.log(RegExp.$3);
// console.log("----- regexp.$4 -----");
// console.log(RegExp.$4);


var htmlContent = "";

htmlContent += '<div id="${id}" class="dvTable">\n';
htmlContent += '<input type="text" id="txtTabsName" name="${id}txtTabsName" class="dvCellControl" value="${text}">\n';
htmlContent += "</div>";

// var regexp = new RegExp("\\\${[\\S]+}", "g");
var regexp = new RegExp("(\\\${)([\\S]+)(})", "g");

var result = htmlContent.match(regexp);

console.log(result.length);
console.log(result);

// 중복 제거
// var keys = result.reduce(function(a, b) {
//     if(a.indexOf(b) < 0) {
//         a.push(b);
//     }
//     return a;
// }, []);
var keys = DuplicateRemoveByArray(result);

console.log(keys);

// ${} 제거
keys = keys.reduce(function(a, b) {
    b = b.replace(/\${/g, "");
    b = b.replace(/}/g, "");
    a.push(b);
    return a;
}, []);

console.log(keys);












