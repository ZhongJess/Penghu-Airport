$(function() {
    $(".coll>a").on("click", function() {
        get_data($(this).data("busno"));

    });

});

function get_data(path) {

    let busroute = "";
    let busdiv = "";
    if (path == "016701") {
        busroute = $("#departure_station");
        busdiv = $('.departure ');
    } else {
        busroute = $("#return_station");
        busdiv = $('.return ');
    }
    //公車地圖
    $.ajax({
        url: "get_bus_line.aspx?busno=" + path,
        method: "GET",
        dataType: "json",
        success: function(data) {

            pointdata = data;
            point_line = pointdata[0].businfo_data;
            if (point_line.length == 0) {
                //隱藏區塊
                alert('請稍後重新查詢');
                busdiv.toggleClass('hidden');
            } else if (point_line == "errormsg") {
                //隱藏區塊
                alert('請稍後重新查詢');
                busdiv.toggleClass('hidden');
            } else {

                var pagedata = point_line.trim();
                var count = $(pagedata).find('span').length;
                if (count != 9) {
                    alert('請稍後重新查詢');
                    busdiv.toggleClass('hidden');
                } else {
                    //公車動態表
                    busroute.html("");
                    busroute.append(point_line);
                }

            }
        },
        error: function() {
            //console.log(msg);
        }
    });
}