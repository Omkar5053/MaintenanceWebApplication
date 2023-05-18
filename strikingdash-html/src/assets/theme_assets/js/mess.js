$(document).ready(function(){
   
    getMess();

    function getMess()
    {
        $.post(
          "http://localhost:8080/mess/listOfAllMess",
          function (data, status) {
            console.log(data);

            for (i = 0; i < data.length; i++) {
                $("#messTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].messName)))))
                .append($("<td>").append(`
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit" id="editMess" data-toggle="modal" data-target="#editMess" data-aid="` +
                            data[i].hostel_id +
                            `"></i>
                            <i class="fas fa-trash deleteMess" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].hostel_id +
                            `"></i>
                        `)))
            }
    
             $(".deleteHostel").click(function (e) {
               deleteHostel($($(this)[0]).data("aid"));
               e.preventDefault();
             });
    
             $("#editHostel").click(function (e) {
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
