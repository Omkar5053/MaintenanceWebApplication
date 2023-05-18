$(document).ready(function(){
   
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
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit" id="editFeedback" data-toggle="modal" data-target="#editFeedback" data-aid="` +
                            data[i].internship +
                            `"></i>
                            <i class="fas fa-trash deleteFeedback" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].internship +
                            `"></i>
                        `)))
            }
    
             $(".deleteInternship").click(function (e) {
               deleteInternship($($(this)[0]).data("aid"));
               e.preventDefault();
             });
    
             $("#editInternship").click(function (e) {
               var tr = e.target.parentNode.parentNode;
               getOneHostel(tr);
               e.preventDefault();
             });


          }
        );
    }

    function getOneHostel(data) {
        console.log("HostelData:" + data)

        var id = data.cells[0].textContent;
        var firstName = data.cells[1].textContent;

        $('h5.modal-title').html('Edit Admin Data: '+firstName);
        $('#editName').val(firstName);
    };

});
