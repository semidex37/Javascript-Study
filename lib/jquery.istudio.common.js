var getDPI = function(el) {
    var ratio = 1;

    try {
        var context;
        var dpr;
        var bsr;
        if(el) {
            if(el.constructor == HTMLCanvasElement) {
                context = el.getContext("2d");
            }else if(el.constructor == CanvasRenderingContext2D) {
                context = el;
            }

            dpr = window.devicePixelRatio || 1;
            bsr = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;

            ratio = (dpr / bsr);
        }else {
            return getDPI(document.createElement("canvas"));
        }
    }catch (e) {
        LogManager.Error("istudio.Util.GetDPI", e);
    }
    return ratio;
};

var calcDPI = function() {
    $.istudio.dpi = getDPI(document.createElement("canvas"));
    return $.istudio.dpi;
};