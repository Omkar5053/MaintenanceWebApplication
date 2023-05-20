$(document).ready(function(){
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
    getFeedbackData();

    function getFeedbackData()
    {
        $.post(
          "http://localhost:8080/feedback/listOfFeedbacks",
          function (data, status) {
            console.log(data);

            for (i = 0; i < data.length; i++) {
                $("#feedbackTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].user.userName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].mess.messName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].feedback)))))
                .append($("<td>").append(`
                            <i class="fas fa-trash deleteFeedback" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].feedbackId +
                            `"></i>
                        `)))
            }
    
    


          }
        );

        $(document).on('click','.deleteFeedback', function(e) {
          e.preventDefault();
           deleteFeedback($($(this)[0]).data("aid"));
           
         });


    }

    function deleteFeedback(feedbackId) {
      $.ajax({
          url: `http://localhost:8080/feedback/deleteFeedback?feedbackId=${feedbackId}&userId=${userId}&roleType=${roleType}`,
          type: "POST",
              success: function (data) {
                getFeedbackData();
                  window.location.reload();
              },
              error: function () {
                getFeedbackData();
                  window.location.reload();
              },
          });
  }


  function getMess()
  {
      $.ajax({
        url: `http://localhost:8080/mess/listOfAllMess`,
        type: "POST",
        success: function (data) {
          $(".messDropdown").empty();
          $(".messDropdown").append($("<option>").append("Select Option"));
          for (i = 0; i < data.length; i++) {
            $(".messDropdown").append(
              $("<option>", { value: data[i].messId }).text(
                data[i].messName
              )
            );
         }
        },
        error: function () {
         console.log("Eror");
        },
      });
  }

  $("#dropdownMenuLink").click(function() {
    getMess();
})


$("#saveFeedback").click(function() {
  let feedbackId = 0;
  let feedback = $("#feedback").val();
  let messId = $(".messDropdown").val();

    
   let userId = localStorage.getItem("userId");
   let roleType = localStorage.getItem("roleType");
   $.ajax({
      url: `http://localhost:8080/feedback/addOrEditFeedback?feedbackId=${feedbackId}&feedback=${feedback}&messId=${messId}&userId=${userId}&roleType=${roleType}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
    

      success: function (data) {
          $("#feedback").val("");
          getFeedbackData();
          window.location.reload();
      },
      error: function () {
        console.log("Error");
      },
    });
})

});
