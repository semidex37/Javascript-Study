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
var fieldOption;

for(var idx in oldFieldsOptions) {
    fieldOption = oldFieldsOptions[idx];

    console.log("value", fieldOption, newFieldsOptions.indexOf(fieldOption));

    if(newFieldsOptions.indexOf(fieldOption) == -1) {
        console.log("fieldOption", fieldOption);
    }

}

// console.log("length: ", otherFieldOptions.length);
// console.log("otherFieldOptions", otherFieldOptions);