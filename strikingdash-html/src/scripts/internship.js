$(document).ready(function(){
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  let username = localStorage.getItem("username");
  const user = document.getElementById("username");
  user.innerHTML = username;
  const role = document.getElementById("role");
  role.innerHTML = roleType;
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
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit editInternship" data-toggle="modal" data-target="#editInternshipModal" data-aid="` +
                            data[i].internshipId+
                            `"></i>
                            <i class="fas fa-trash deleteInternship" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].internshipId+
                            `"></i>
                        `)))
            }
          }
        );

        $(document).on('click','.deleteInternship', function(e) {
          e.preventDefault();
           deleteInternship($($(this)[0]).data("aid"));
           
         });

         $(document).on('click','.editInternship', function(e) {
          e.preventDefault();
          console.log("Edit");
          getOneInternship($($(this)[0]).data("aid"));
         });
    }

    function deleteInternship(internshipId) {
      $.ajax({
          url: `http://localhost:8080/internship/deleteInternship?internshipId=${internshipId}&userId=${userId}&roleType=${roleType}`,
          type: "POST",
              success: function (data) {
                getInternship();
                  window.location.reload();
              },
              error: function () {
                getInternship();
                  window.location.reload();
              },
          });
  }


    function getOneInternship(id) {
      $.ajax({
        url: `http://localhost:8080/internship/getById?internshipId=${id}`,
        method: "POST",
        success: function (data) {
          getHostels();
          getMess();
           $("#editregistrationNo").val(data.registrationNumber);
           $("#editstudentName").val(data.name);
           $("#editemailId").val(data.emailId);
           $("#editphoneNo").val(data.phoneNo);
           $("#editpurpose").val(data.purpose);
           $("#editnoOfDays").val(data.noOfDays);
           $("#hostelEdit-select").val(data.hostel.hostelName);
           $("#messEdit-select").val(data.mess.messName);
          $("#internship_id").val(data.internshipId);
        },
      });
  };

  $("#editInternship").on("click", function (e) {
      let internshipId = $("#internship_id").val();
      let registrationNo = $("#editregistrationNo").val();
      let name = $("#editstudentName").val();
      let emailId = $("#editemailId").val();
      let phoneNo = $("#editphoneNo").val();
      let purpose = $("#editpurpose").val();
      let noOfDays = $("#editnoOfDays").val();
      let hostelId = $("#hostelEdit-select").val();
      let messId = $("#messEdit-select").val();
  
        
       let userId = localStorage.getItem("userId");
       let roleType = localStorage.getItem("roleType");
    
    $.ajax({
      url: `http://localhost:8080/internship/addOrEditInternship?internshipId=${internshipId}&registrationNo=${registrationNo}&name=${name}&phoneNo=${phoneNo}&emailId=${emailId}&purpose=${purpose}&noOfDays=${noOfDays}&hostelId=${hostelId}&messId=${messId}&userId=${userId}&roleType=${roleType}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      success: function (data) {
        $("#registrationNo").val("");
        $("#studentName").val("");
        $("#emailId").val("");
        $("#phoneNo").val("");
        $("#purpose").val("");
        $("#noOfDays").val("");
        $(".hostelDropdown").val("");
        $(".messDropdown").val("");
           getInternship();
           window.location.reload();
        
      },
      error: function () {
        console.log("Error");
      },
    });
  });


    function getHostels()
    {
        $.ajax({
          url: `http://localhost:8080/hostel/getAllHostels`,
          type: "POST",
          success: function (data) {
            $(".hostelDropdown").empty();
            $(".hostelDropdown").append($("<option>").append("Select Option"));
            for (i = 0; i < data.length; i++) {
              $(".hostelDropdown").append(
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
    
    
    $("#addNewInternship").click(function() {
        getHostels();
        getMess();
    })



    $("#saveInternship").click(function() {
      let internshipId = 0;
      let registrationNo = $("#registrationNo").val();
      let name = $("#studentName").val();
      let emailId = $("#emailId").val();
      let phoneNo = $("#phoneNo").val();
      let purpose = $("#purpose").val();
      let noOfDays = $("#noOfDays").val();
      let hostelId = $(".hostelDropdown").val();
      let messId = $(".messDropdown").val();

  
        
       let userId = localStorage.getItem("userId");
       let roleType = localStorage.getItem("roleType");
       $.ajax({
          url: `http://localhost:8080/internship/addOrEditInternship?internshipId=${internshipId}&registrationNo=${registrationNo}&name=${name}&phoneNo=${phoneNo}&emailId=${emailId}&purpose=${purpose}&noOfDays=${noOfDays}&hostelId=${hostelId}&messId=${messId}&userId=${userId}&roleType=${roleType}`,
          headers: {
            "Content-Type": "application/json",
          },
          type: "POST",
        
  
          success: function (data) {
           $("#registrationNo").val("");
           $("#studentName").val("");
           $("#emailId").val("");
           $("#phoneNo").val("");
           $("#purpose").val("");
           $("#noOfDays").val("");
           $("#hostel-select").val("");
           $("#mess-select").val("");
              getInternship();
              window.location.reload();
          },
          error: function () {
            console.log("Error");
          },
        });
  })
    
});
