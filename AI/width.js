/*
    너비 우선 탐색
 */
(function() {
    var Node = function() {
        return {
            nodeId: 0,
            parentNodeId: 0
        };
    };

    var Width = function() {};

    Width.prototype = {
        OpenLIst: [],
        ClosedList: [],
        OpenListIndex: -1,
        ClosedListIndex: -1,

        main: function() {
            this.initList();

        },
        initList: function() {

        },
        printRoute: function() {

        },
        printList: function() {

        },
        check: function() {

        },
        removeFirst: function () {

        },
        moveToFirst: function() {

        },
        expand: function() {

        }

    };

    var width = new Width();
    width.main();

})();
