/**
 * Destructuring
 * 
 * Reference URL: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */

 /**
  * 배열 비구조화
  */

 // 기본 구문
 var x = [1, 2, 3, 4, 5];
 var [y, z] = x;
 console.log(`y: ${y}`);
 console.log(`z: ${z}`);


 // 기본 변수 할당
 var foo = ["One", "Two", "Three"];
 var [one, two, three] = foo;
 console.log(`one: ${one}`);
 console.log(`two: ${two}`);
 console.log(`three: ${three}`);
 

 // 선언에서 분리한 할당
 var a, b;
 [a, b] = [1, 3];
 console.log(`a: ${a}`);
 console.log(`b: ${b}`);
 

 // 기본값
 var a, b;
 [a=5, b=7] = [1];
 console.log(`a: ${a}`);
 console.log(`b: ${b}`);
 

 // 변수 교환하기 (XOR-swap)
 var a = 1;
 var b = 3;

 [a, b] = [b, a];
 console.log(`a: ${a}`);
 console.log(`b: ${b}`);
 

 // 함수에서 반환된 배열 파싱
 function f() {
     return [6, 7];
 }

 var a, b;
 [a, b] = f();
 console.log(`a: ${a}`);
 console.log(`b: ${b}`);
 

 // 일부 반환값 무시하기
 function f() {
     return [4, 7, 9, 11, 13];
 }

 var [a,,,b] = f();
 console.log(`a: ${a}`);
 console.log(`b: ${b}`);


 // 변수에 배열의 나머지를 할당하기
 var [a, ...b] = [2, 3, 4, 5, 6];
 console.log(`a: ${a}`);
 console.log(`b: ${b}`);


 // 정규식에서 일치하는 값 가져오기
 var url = "https://developer.mozilla.org/en-US/Web/JavaScript";

var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

var [, protocol, fullhost, fullpath] = parsedURL;

console.log(protocol); // "https"


/**
 * 객체 비구조화
 */

// 기본 할당
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true


// 선언 없는 할당
var a, b;

({a, b} = {a: 1, b: 2});

console.log(`a: ${a}`);
console.log(`b: ${b}`);


// 새로운 변수 이름으로 할당하기
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true


// 기본값
var {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5


// 기본값을 제공하여 새로운 변수 이름으로 할당하기
var {a:aa = 100, b:bb = 50} = {a: 30};

console.log(aa); // 30
console.log(bb); // 50


// 중첩 객체 및 배열 비구조화
var metadata = {
    title: "Scratchpad",
    translations: [
       {
        locale: "de",
        localization_tags: [ ],
        last_edit: "2014-04-14T08:43:37",
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
       }
    ],
    url: "/en-US/docs/Tools/Scratchpad"
};

var { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"


// for of 반복문과 비구조화
var people = [
    {
      name: "Mike Smith",
      family: {
        mother: "Jane Smith",
        father: "Harry Smith",
        sister: "Samantha Smith"
      },
      age: 35
    },
    {
      name: "Tom Jones",
      family: {
        mother: "Norah Jones",
        father: "Richard Jones",
        brother: "Howard Jones"
      },
      age: 25
    }
  ];
  
  for (var {name: n, family: { father: f } } of people) {
    console.log("Name: " + n + ", Father: " + f);
  }
  
  // "Name: Mike Smith, Father: Harry Smith"
  // "Name: Tom Jones, Father: Richard Jones"

  