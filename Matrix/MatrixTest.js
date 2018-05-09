var Matrix = require('js/Matrix');

var wb = Matrix.CreateWorkBook("Font Family", "Font Size");
var ws = wb.CreateWorkSheet("Sheet Name");

/*************************************************
 * 스타일 정의
 *************************************************/
var BORDER_BOX = "border:solid,#000000;";
var BORDER_LEFT = "border-left:solid,#000000;";
var BORDER_TOP = "border-top:solid,#000000;";
var BORDER_RIGHT = "border-right:solid,#000000;";
var BORDER_BOTTOM = "border-bottom:solid,#000000;";
var FONT_TITLE    = "font-size:16;font-weight:bold;font-family:맑은 고딕;";
var FONT_DEFAULT  = "font-size:10;font-family:맑은 고딕;";
var BACK_COLOR_GRAY = "#E0E0E0";
var ALIGN_TOP = 0;
var ALIGN_MIDDLE = 1;
var ALIGN_BOTTOM = 2;
var ALIGN_LEFT = 0;
var ALIGN_CENTER = 1;
var ALIGN_RIGHT = 2;

// 셀의 데이터 지정
ws.setCellText("B2", "지역명");
ws.setCellText("C2", "연령대");
ws.setCellText("C3", "10대");
ws.setCellText("D3", "20대");
ws.setCellText("E3", "30대");
ws.setCellText("F3", "40대");
ws.setCellText("G3", "50대");

// 병합
ws.MergeCell("B2", "B3");
ws.MergeCell("C2", "G2");

// 스타일 지정
ws.setCellStyle("B2:G3" ,FONT_DEFAULT ,BORDER_BOX ,"#B9CDE5" ,null ,ALIGN_CENTER ,ALIGN_MIDDLE);
ws.setCellStyle("B4:B8" ,FONT_DEFAULT ,BORDER_BOX ,"#B9CDE5" ,null ,ALIGN_LEFT ,ALIGN_MIDDLE);
ws.setCellStyle("C4:G8" ,FONT_DEFAULT ,BORDER_BOX ,null ,"#,##0.00" ,ALIGN_RIGHT ,ALIGN_MIDDLE);

ws.setChartObject("B10:G20", Matrix.GetObject("Chart1"));
ws.setChartObject("I10:N20", Matrix.GetObject("Chart1"));
ws.setGridObject("B22:G32", Matrix.GetObject("DataGrid1"));
ws.setGridObject("I22:I32", Matrix.GetObject("DataGrid2"));




////////
ws.setChartObject("B10:G20", Matrix.GetObject("Chart1"));
ws.setGridObject(3,3, Matrix.GetObject("DataGrid1"))



















