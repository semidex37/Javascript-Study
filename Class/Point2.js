var defineObject = require('./defineObject');

var Point = function(x,y)
{
    defineObject(this, ["X", "Y"], {
        set: function(value, key) {
            return value;
        },
        get: function(value, key) {
            return value * 2;
        }
    });

    this.X = (x)?x:0;
    this.Y = (y)?y:0;
};

var p1 = new Point(4, 8);
console.log(p1);

console.log("X", p1.X, p1.__data__.__x__);
console.log("Y", p1.Y, p1.__data__.__y__);

