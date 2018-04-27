

var enPropFontFamily = {};


enPropFontFamily['__default__'] = enPropFontFamily['default'];
Object.defineProperties(enPropFontFamily, {
    'default': {
        get: function() {
            console.log("get", enPropFontFamily['__default__']);
            return enPropFontFamily['__default__'];
        },
        set: function(value) {
            console.log("set", value);
            enPropFontFamily['__default__'] = value;
        }
    }
});
