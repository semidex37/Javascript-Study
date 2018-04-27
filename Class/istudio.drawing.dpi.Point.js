    var Point = function(x,y)
    {
        this.__x;
        this.__y;

        Object.defineProperties(this, {
            X: {
                set: function(value) {
                    this.__x = value;
                },
                get: function() {
                    return this.__x * 1.5;
                }
            },
            Y: {
                set: function(value) {
                    this.__y = value;
                },
                get: function() {
                    return this.__y * 1.5;
                }
            }
        });

        this.X = x;
        this.Y = y;

        // this.X = x ? x: 0;
        // this.Y = y ? y: 0;
    };

    Point.prototype.Equals = function(val){
        return (this.X == val.X && this.Y == val.Y);
    };

    Point.prototype.Dispose = function(){
        this.X = undefined;
        this.Y = undefined;
    };

    Point.prototype.toString = function() {
        console.log("prototype.toString");
        return {
            X: this.X,
            Y: this.Y
        }
    };

    Point.toString = function() {
        console.log("toString");
        return {
            X: this.X,
            Y: this.Y
        }
    };


    var p1 = new Point(3, 4);
    console.log(p1.__proto__);
    console.log(p1.__proto__.__proto__);
    console.log(p1);
    console.log(p1);
    console.log(p1.X);
    console.log(p1.Y);