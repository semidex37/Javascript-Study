/******************************************************
 *
 ******************************************************/
var req = Matrix.getRequest();
var res = Matrix.getResponse();

var conn = Matrix.getConnection();
var util = Matrix.getUtility();

var sql;
var table;
var wb;
var ws;
try{

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



    // Excel 객체
    wb  = util.CreateWorkBook("맑은 고딕" ,"11");
    ws  = wb.CreateWorkSheet("Sheet1");

    sql = " SELECT '서울' AS LOCALE, 50.00 AS VAL1, 100.00 AS VAL2, 150.00 AS VAL3, 120.00 AS VA4, 80.00 AS VA5 FROM DUAL UNION ALL   "
        + " SELECT '인천' AS LOCALE, 30.00 AS VAL1,  70.00 AS VAL2, 111.00 AS VAL3,  90.00 AS VA4, 60.00 AS VA5 FROM DUAL UNION ALL   "
        + " SELECT '부산' AS LOCALE, 49.00 AS VAL1,  98.00 AS VAL2, 140.00 AS VAL3, 112.00 AS VA4, 72.00 AS VA5 FROM DUAL UNION ALL   "
        + " SELECT '광주' AS LOCALE, 40.00 AS VAL1,  60.00 AS VAL2, 181.00 AS VAL3, 112.00 AS VA4, 98.00 AS VA5 FROM DUAL UNION ALL   "
        + " SELECT '울산' AS LOCALE, 48.00 AS VAL1,  65.00 AS VAL2, 182.00 AS VAL3, 114.00 AS VA4, 68.00 AS VA5 FROM DUAL  ";
    conn.Connect("MTXRPTY");
    table = conn.ExecuteDataTable(sql);


    // table 데이터 엑셀에 넣기
    ws.CopyFromDataTable(table ,"B4" ,false);
    ws.setCellText("B2", "지역명");
    ws.setCellText("C2", "연령대");
    ws.setCellText("C3", "10대");
    ws.setCellText("D3", "20대");
    ws.setCellText("E3", "30대");
    ws.setCellText("F3", "40대");
    ws.setCellText("G3", "50대");
    //병합
    ws.MergeCell("B2", "B3");
    ws.MergeCell("C2", "G2");

    //스타일 지정
    ws.setCellStyle("B2:G3" ,FONT_DEFAULT ,BORDER_BOX ,"#B9CDE5" ,null ,ALIGN_CENTER ,ALIGN_MIDDLE);
    ws.setCellStyle("B4:B8" ,FONT_DEFAULT ,BORDER_BOX ,"#B9CDE5" ,null ,ALIGN_LEFT ,ALIGN_MIDDLE);
    ws.setCellStyle("C4:G8" ,FONT_DEFAULT ,BORDER_BOX ,null ,"#,##0.00" ,ALIGN_RIGHT ,ALIGN_MIDDLE);

    //차트에 데이터 소스 지정 하기
    var makeChartSeries = function(ws, chart) {
        // 서울
        var ser = chart.CreateSeries();
        ser.setLabelRange("Sheet1!B4");
        ser.setCategoryRange("Sheet1!C3:G3");
        ser.setValueRange("Sheet1!C4:G4");
        if(chart.getChartType() == 15)return;// Chart.enChartType.PieChart
        if(chart.getChartType() == 16) return;// Chart.enChartType.PieExplosionChart) return;
        // 인천
        ser = chart.CreateSeries();
        ser.setLabelRange("Sheet1!B5");
        ser.setCategoryRange("Sheet1!C3:G3");
        ser.setValueRange("Sheet1!C5:G5");
        // 부산
        ser = chart.CreateSeries();
        ser.setLabelRange("Sheet1!B6");
        ser.setCategoryRange("Sheet1!C3:G3");
        ser.setValueRange("Sheet1!C6:G6");
        // 광주
        ser = chart.CreateSeries();
        ser.setLabelRange("Sheet1!B7");
        ser.setCategoryRange("Sheet1!C3:G3");
        ser.setValueRange("Sheet1!C7:G7");
        // 울산
        ser = chart.CreateSeries();
        ser.setLabelRange("Sheet1!B8");
        ser.setCategoryRange("Sheet1!C3:G3");
        ser.setValueRange("Sheet1!C8:G8");
    };
    // 차트 타입 리스트
    //  BarChart = 0,
    //  BarStackedChart = 1,
    //  BarPercentStackedChart = 2,
    //  ColumnChart = 3,
    //  ColumnStackedChart = 4,
    //  ColumnPercentStackedChart = 5,
    //  LineChart = 6,
    //  LineStackedChart = 7,
    //  LinePercentStackedChart = 8,
    //  SymbolLineChart = 9,
    //  SymbolLineStackedChart = 10,
    //  SymbolLinePercentStackedChart = 11,
    //  AreaChart = 12,
    //  AreaStackedChart = 13,
    //  AreaPercentStackedChart = 14,
    //  PieChart = 15,
    //  PieExplosionChart = 16,

    // BarChart
    makeChartSeries(ws, ws.CreateChart(0, "B10", "G20"));
    makeChartSeries(ws, ws.CreateChart(1, "B22", "G32"));
    makeChartSeries(ws, ws.CreateChart(2, "B34", "G44"));

    // ColumnChart
    makeChartSeries(ws, ws.CreateChart(3, "I10", "N20"));
    makeChartSeries(ws, ws.CreateChart(4, "I22", "N32"));
    makeChartSeries(ws, ws.CreateChart(5, "I34", "N44"));

    // LineChart
    makeChartSeries(ws, ws.CreateChart(6, "P10", "U20"));
    makeChartSeries(ws, ws.CreateChart(7, "P22", "U32"));
    makeChartSeries(ws, ws.CreateChart(8, "P34", "U44"));

    //SymbolLineChart
    makeChartSeries(ws, ws.CreateChart(9, "B48", "G58"));
    makeChartSeries(ws, ws.CreateChart(10, "B60", "G70"));
    makeChartSeries(ws, ws.CreateChart(11, "B72", "G82"));

    //AreaChart
    makeChartSeries(ws, ws.CreateChart(12 ,"I48", "N58"));
    makeChartSeries(ws, ws.CreateChart(13, "I60", "N70"));
    makeChartSeries(ws, ws.CreateChart(14, "I72", "N82"));

    //Pie
    makeChartSeries(ws, ws.CreateChart(15 ,"P48", "U58"));
    makeChartSeries(ws, ws.CreateChart(16 ,"P60", "U70"));


    conn.DisConnect();
    conn = null;
    var fileName =  util.getUniqueKey("EXP") + ".xlsx";
    //엑셀 파일 생성
    wb.Save("UPLOAD/" + fileName);

    res.CreateTable("FILE" ,"MTXRPTY" ,"SELECT '"+ fileName+"' AS FILE_NAME FROM DUAL ");
}catch(e){
    if(conn != null){
        conn.DisConnect();
        conn = null;
    }
    Matrix.ThrowException(e.message);
}