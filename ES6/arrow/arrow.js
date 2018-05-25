/**
 * Arrow
 * Reference URL: http://itstory.tk/entry/JavaScript-ES6-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC
 */

var evens = [2, 4, 6, 8,];

var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

console.log("odds", odds);
console.log("nums", nums);
console.log("pairs", pairs);

var fives = [];
nums.forEach(v => {
    if(v % 5 === 0) {
        fives.push(v);
    }
});

console.log("fives", fives);

var bob = {
    _name: "Bob",
    _friends: ["John", "Brian", "Herry"],
    printFriends() {
        this._friends.forEach(f =>
            console.log(this._name + " knows " + f)
        );
    }
}

bob.printFriends();

/*
    bob._friends.forEach(function(f) {
        console.log(this._name + " knows " + f)
    }.bind(bob));
*/



