/**
 * Classes
 */

class CommonObject {
    constructor() {
        console.log("call CommonObject.constructor");
        this.message = "Common Object";
    }
    output() {
        return this.message;
    }
}

var commonObject = new CommonObject();
console.log(commonObject.output());


class HeaderObject extends CommonObject {
    constructor() {
        super();
        console.log("call HeaderObject.constructor");
        this.message = "Header Object";
    }
}

var headerObject = new HeaderObject();
console.log(headerObject.output());
