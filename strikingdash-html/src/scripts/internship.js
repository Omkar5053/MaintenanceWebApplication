$(document).ready(function(){
   
    getInternship();

    function getInternship()
    {
        $.post(
          "http://localhost:8080/internship/listOfInternships",
          function (data, status) {
            console.log(data);

            for (i = 0; i < data.length; i++) {
                $("#internshipTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].registrationNumber)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].name)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].hostel.hostelName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].mess.messName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].emailId)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].phoneNo)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].noOfDays)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].purpose)))))
                .append($("<td>").append(`
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit" id="edit-inter" data-toggle="modal" data-target="#editInternship" data-aid="` +
                            data[i].internshipId+
                            `"></i>
                            <i class="fas fa-trash deleteInternship" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].internshipId+
                            `"></i>
                        `)))
            }
    
             $(".deleteInternship").click(function (e) {
               deleteInternship($($(this)[0]).data("aid"));
               e.preventDefault();
             });
    
             $("#edit-inter").click(function (e) {
              
             });


          }
        );
    }


    function getHostels()
    {
        $.ajax({
          url: `http://localhost:8080/hostel/getAllHostels`,
          type: "POST",
          success: function (data) {
            $("#hostel-select").empty();
            $("#hostel-select").append($("<option>").append("Select Option"));
            for (i = 0; i < data.length; i++) {
              $("#hostel-select").append(
                $("<option>", { value: data[i].hostel_id }).text(
                  data[i].hostelName
                )
              );
           }
          },
          error: function () {
           console.log("Eror");
          },
        });
    }

    function getMess()
    {
        $.ajax({
          url: `http://localhost:8080/mess/listOfAllMess`,
          type: "POST",
          success: function (data) {
            $("#mess-select").empty();
            $("#mess-select").append($("<option>").append("Select Option"));
            for (i = 0; i < data.length; i++) {
              $("#mess-select").append(
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
    
    
    $("#addNewInternship").click(function() {
        getHostels();
        getMess();
    })



    $("#saveInternship").click(function() {
        
      let registrationNo = $("#registrationNo").val();
      let name = $("#studentName").val();
      let emailId = $("#emailId").val();
      let phoneNo = $("#phoneNo").val();
      let purpose = $("#purpose").val();
      let noOfDays = $("#noOfDays").val();
      let hostelId = $("#registrationNo").val();
      let messId = $("#registrationNo").val();
  
        
       let userId = localStorage.getItem("userId");
       let roleType = localStorage.getItem("roleType");
       $.ajax({
          url: `http://localhost:8080/internship/addMess?userId=${userId}&roleType=${roleType}`,
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
    
});
