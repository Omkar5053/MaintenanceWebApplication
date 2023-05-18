$(document).ready(function(){
   
    getHostels();

    function getHostels()
    {
        $("#hostel-table").empty();
        $.post(
          "http://localhost:8080/hostel/getAllHostels",
          function (data, status) {
            console.log(data);
            // $("#hostel-table").append(
            //   $("<thead>")
            //     .append($("<th>").append("No"))
            //     .append($("<th>").append("Hostel Name"))
            //     .append($("<th>").append("Action"))
            // );
            for (i = 0; i < data.length; i++) {
                $("#hostelTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(data[i].hostelName)))
                .append($("<td>").append(`
                            <i class="fas fa-eye listStudents" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].hostel_id +
                            `"></i>
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit" id="editHostel" data-toggle="modal" data-target="#editHostel" data-aid="` +
                            data[i].hostel_id +
                            `"></i>
                            <i class="fas fa-trash deleteHostel" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
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
