$(document).ready(function(){
    let userId = localStorage.getItem("userId");
    let roleType = localStorage.getItem("roleType");
    let username = localStorage.getItem("username");
    const user = document.getElementById("username");
    user.innerHTML = username;
    const role = document.getElementById("role");
    role.innerHTML = roleType;
      getStudents();
  
      function getStudents()
      {
          $.post(
            `http://localhost:8080/auth/getStudents?userId=${userId}`,
            function (data, status) {
              
  
              for (i = 0; i < data.length; i++) {
                  $("#internshipTableDataBody").append($("<tr>")
                  .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].firstName + " "+ data[i].lastName)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].email)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].userType)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].isActive)))))
                  .append($("<td>").append(`
    
                              <input type="button" data-toggle="modal" data-target="#modal-basic"  class="assignHostel button-34" data-aid="` +
                              data[i].userId +
                              `"value="Assign Hostel">
                          `)))
              }
            }
          );
  
         
  
           $(document).on('click','.assignHostel', function(e) {
            e.preventDefault();
            $("#u_id").val($($(this)[0]).data("aid"));
            getHostels();
           });
      }
  
    

  
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
        console.log("get Hostels")
        $.ajax({
          url: `http://localhost:8080/hostel/getAllHostels?userId=${userId}`,
          type: "POST",
          success: function (data) {
            $(".hostelDropdown").empty();
            $(".hostelDropdown").append($("<option>").append("Select Option"));
            for (i = 0; i < data.listOfData.length; i++) {
              $(".hostelDropdown").append(
                $("<option>", { value: data.listOfData[i].hostel_id }).text(
                  data.listOfData[i].hostelName
                )
              );
           }
          },
          error: function () {
           console.log("Eror");
          },
        });
    }

    $("#hostel-select").on( "change", function() {
        let hostel_id = this.value;
        $.ajax({
            url: `http://localhost:8080/hostel/getBy?hostel_id=${hostel_id}`,
            method: "POST",
            success: function (data) {
                let noOfFloors = data.noOfFloors;
                let noOfRoomPerFloor = data.noOfRoomPerFloor;
                let noOfStudentPerRoom = data.noOfStudentPerRoom;

           $(".floorDropdown").empty();
           $(".floorDropdown").append($("<option>").append("Select Option"));
            for (i = 1; i <= noOfFloors; i++) {
              $(".floorDropdown").append(
                $("<option>", { value:  i}).text(
                  i
                )
              );
           }

           $("#floor-select").on("change", function(){
       
            let floorNo = this.value * 100;
            $(".roomDropdown").empty();
            $(".roomDropdown").append($("<option>").append("Select Option"));
            for (i = 1; i <= noOfRoomPerFloor; i++) {
              $(".roomDropdown").append(
                $("<option>", { value: floorNo + i }).text(
                    floorNo + i
                )
              );
             }
           })
            },
          });
    });
  
      $("#saveStudent").click(function() {
        let id = 0;
        let floorNo = $(".floorDropdown").val();
        let roomNo = $(".roomDropdown").val();
        let hostel_id = $(".hostelDropdown").val();
        let userId = $("#u_id").val();
    
         $.ajax({
            url: `http://localhost:8080/student/addOrUpdateData?id=${id}&floorNo=${floorNo}&roomNo=${roomNo}&hostel_id=${hostel_id}&userId=${userId}`,
            headers: {
              "Content-Type": "application/json",
            },
            type: "POST",
            success: function (data) {  
             $("#hostel-select").val("");
             $("#room-select").val("");
             $("#floor-select").val("");
                getStudents();
                window.location.reload();

            },
            error: function () {
              console.log("Error");
            },
          });
    })
      
  });
  