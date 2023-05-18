$(document).ready(function(){
   
    getMess();
    let userId = localStorage.getItem("userId")
    let roleType = localStorage.getItem("roleType")

    function getMess()
    {
        $.post(
          "http://localhost:8080/mess/listOfAllMess",
          function (data, status) {
            console.log(data);
            $("#messTableDataBody").empty();
            for (i = 0; i < data.length; i++) {
                $("#messTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].messName)))))
                .append($("<td>").append(`
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit" id="MessEdit" data-toggle="modal" data-target="#editMess" data-aid="` +
                            data[i].messId +
                            `"></i>
                            <i class="fas fa-trash deleteMess" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].messId +
                            `"></i>
                        `)))
            }
          }
        );
        $(document).on('click','.deleteMess', function(e) {
            deleteMess($($(this)[0]).data("aid"));
            e.preventDefault();
        })

       $(document).on('click','#MessEdit', function(e) {
          getOneMess($($(this)[0]).data("aid"));
          e.preventDefault();
      })
    }


    function getOneMess(id) {
        $.ajax({
          url: `http://localhost:8080/mess/getBy?messId=${id}`,
          method: "POST",
          success: function (data) {
            console.log(data);
            $("#editMessName").val(data.messName);
            $("#h_id").val(data.messId);
          },
        });
    };

    $("#editMessForm").on("click", function (e) {
      let messName = $("#editMessName").val();
      let messId = $("#h_id").val();
      $.ajax({
        url: `http://localhost:8080/mess/updateMess?messId=${messId}&messName=${messName}&userId=${userId}&roleType=${roleType}`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        success: function (data) {
          getMess();
          window.location.reload();
          $("#editMessName").val("");
        },
        error: function () {
          console.log("Error");
        },
      });
    });

    $("#saveMess").click(function() {
        let data = {
            messName: $("#addMessName").val()
          };
         let userId = localStorage.getItem("userId");
         let roleType = localStorage.getItem("roleType");
         $.ajax({
            url: `http://localhost:8080/mess/addMess?userId=${userId}&roleType=${roleType}`,
            headers: {
              "Content-Type": "application/json",
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data) {
                $("#addMessName").val("");
                getMess();
                window.location.reload();
            },
            error: function () {
              console.log("Error");
            },
          });
    })

     function deleteMess(messId) {
         $.ajax({
             url: `http://localhost:8080/mess/delete?messId=${messId}&userId=${userId}&roleType=${roleType}`,
             type: "POST",
                 success: function (data) {
                     getMess();
                     window.location.reload();
                 },
                 error: function () {
                     getMess();
                     window.location.reload();
                 },
             });
     }

});
