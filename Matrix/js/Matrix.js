var wb = {
    WorkBook: {
        FontFamily: "맑은 고딕",
        FontSize: "12px",
        Sheets: [{
            SheetName: "Sheet1",
            Controls: [{
                
            }]
        }],
        Style: [{
            Index: 0, Value: "#EAF4FE"
        }]
    }
};

var CreateWorkBook = function(/* string */ fontFamily, /* string */ fontSize) {
    var wb = {
        WorkBook: {

        }
    };
    return {
        CreateWorkSheet: CreateWorkSheet
    };
};

var CreateWorkSheet = function(/* string */ sheetName) {
    var ws = {};
    return {

    }
};

var CreateChart = function() {
    // chartType ,beginRow ,beginCol ,endRow ,endCol
    // chartType ,fromRange ,toRange

};

var CreateChartByJson = function() {
    // jsonText ,beginRow ,beginCol ,endRow ,endCol
    // jsonText ,fromRange ,toRange
    // jsonText ,range

};

var CreateImage = function() {
    // imagePath ,beginRow ,beginCol ,endRow ,endCol
    // imagePath ,fromRange ,toRange

};

var MergeCell = function() {
    // beginRow ,beginCol ,endRow ,endCol
    // fromRange ,toRange
    // range

};

var setCellStyle = function() {
    // range ,fontStyle ,borderStyle ,fillStyle ,format ,horizonAlgn ,verticalAlgn
    // range ,style
    // rowIndex ,columnIndex ,fontStyle ,borderStyle ,fillStyle ,format ,horizonAlgn ,verticalAlgn
    // rowIndex ,columnIndex ,style

};

var setCellText = function() {
    // range ,text
    // rowIndex ,columnIndex ,text

};

var setCellValue = function() {
    // range ,value
    // rowIndex ,columnIndex ,value
};

var setColumnWidth = function() {
    // columnIndex ,width
    // startCol ,endCol ,width
};


var setRangeStyle = function () {
    // beginRow ,beginCol ,endRow ,endCol ,style
    // range ,fontStyle ,borderStyle ,fillStyle ,format ,horizonAlgn ,verticalAlgn
    // range ,style

};

var setRowHeight = function() {
    // rowIndex ,height

};

var CreateObjectByJson = function() {

};

var ExportServiceCall = function () {

};

var Matrix = {
    CreateWorkBook: CreateWorkBook,
    CreateObjectByJson: CreateObjectByJson,
    ExportServiceCall: ExportServiceCall
};

module.exports = Matrix;