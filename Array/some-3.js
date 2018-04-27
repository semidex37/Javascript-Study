var fld1 = {
    FieldName: "FLD1"
};
var fld2 = {
    FieldName: "FLD2"
};
var fld3 = {
    FieldName: "FLD3"
};
var fld4 = {
    FieldName: "FLD4"
};
var fld5 = {
    FieldName: "FLD5"
};
var fld6 = {
    FieldName: "FLD6"
};


var newFieldsOptions = [fld1, fld2, fld3, fld5];
var oldFieldsOptions = [fld2, fld4, fld6];

var otherFieldOptions = oldFieldsOptions.some(function(value, index, ar) {

    console.log("value", value, newFieldsOptions.indexOf(value));

    if(newFieldsOptions.indexOf(value) == -1) {
        return value;
    }

});

console.log("length: ", otherFieldOptions.length);
console.log("otherFieldOptions", otherFieldOptions);