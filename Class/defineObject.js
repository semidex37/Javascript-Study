var ObjectDefineProperties = function(targetObject, properties, methods) {
    var dataObject = {};
    var targetMethods = {};
    var privatePropertyName;
    var propertyName;

    if(!methods) {
        methods = {};
    }

    if(!properties) {
        throw ReferenceError(properties);
    }

    for(var idx in properties) {
        propertyName = properties[idx];
        privatePropertyName = "__" + propertyName.toLowerCase() + "__";
        targetMethods[propertyName] = ObjectDefinePropertiesSetterGetter.call(this, dataObject, propertyName, privatePropertyName, methods.set, methods.get);
    }// ~for - idx

    targetObject.__data__ = dataObject;

    Object.defineProperties(targetObject, targetMethods);
};

var ObjectDefinePropertiesSetterGetter = function(dataObject, propertyName, privatePropertyName, setter, getter) {
    return {
        set: function(value) {
            if(setter) {
                dataObject[privatePropertyName] = setter(value, propertyName, this);
            }else {
                dataObject[privatePropertyName] = value;
            }
        },
        get: function() {
            if(getter) {
                return getter(dataObject[privatePropertyName], propertyName);
            }else {
                return dataObject[privatePropertyName];
            }

        }
    };
};

module.exports = ObjectDefineProperties;