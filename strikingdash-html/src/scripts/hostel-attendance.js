$(document).ready(function(){
    let userId = localStorage.getItem("userId");
    let roleType = localStorage.getItem("roleType");
    let username = localStorage.getItem("username");
    const user = document.getElementById("username");
    user.innerHTML = username;
    const role = document.getElementById("role");
    role.innerHTML = roleType;
    let hostel_id;
    let floorNo;
    getHostels();
  
      function getStudentData(data)
      {
       
        $("#internshipTableDataBody").empty();
        for (i = 0; i < data.listOfData.length; i++) {
            $("#internshipTableDataBody").append($("<tr>")
            .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
            .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data.listOfData[i].user.firstName + " "+ data.listOfData[i].user.lastName)))))
            .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data.listOfData[i].user.email)))))
            .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data.listOfData[i].user.userName)))))
           
            .append($("<td>").append(`

                        <label style="margin-right:5px">Present/Absent</label><input type="checkbox" style="width:20px; height:20px;" name="attendance" class="assignHostel" value="` +
                        data.listOfData[i].user.userId +
                        `">
                    `)))
        }
      }

    function getHostels()
    {
        $("#floor-select").prop('disabled', true);
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
        hostel_id = this.value;
        $.ajax({
            url: `http://localhost:8080/hostel/getBy?hostel_id=${hostel_id}`,
            method: "POST",
            success: function (data) {
                $("#floor-select").prop('disabled', false);
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

        //    $("#floor-select").on("change", function(){
       
        //     let floorNo = this.value * 100;
        //     $(".roomDropdown").empty();
        //     $(".roomDropdown").append($("<option>").append("Select Option"));
        //     for (i = 1; i <= noOfRoomPerFloor; i++) {
        //       $(".roomDropdown").append(
        //         $("<option>", { value: floorNo + i }).text(
        //             floorNo + i
        //         )
        //       );
        //      }
        //    })
            },
          });
    });
  
      $("#searchStudent").click(function() {
       
        let id = 0;
        floorNo = $(".floorDropdown").val();
        hostel_id = $(".hostelDropdown").val();
    
         $.ajax({
            url: `http://localhost:8080/student/listStudentsByFloor?hostel_id=${hostel_id}&floorNo=${floorNo}&userId=${userId}`,
            headers: {
              "Content-Type": "application/json",
            },
            type: "POST",
            success: function (data) {   
          
             if(data.listOfData.length === 0)
             {
              swal("The Floor is Empty", "Noone assigned to that floor", "warning");
             }
            getStudentData(data);
            },
            error: function () {
              swal("Server Error", "Something wrong in server", "error");
              console.log("Error");
            },
          });
    })


    $("#submitAttendance").click(function(){
        var presents = [];
        $.each($("input[name='attendance']:checked"), function(){
            presents.push($(this).val());
        });

        if(presents.length <= 0)
        {
          swal("Try Again!", "Please Select atleast One Student", "error");
        } else{
          $.ajax({
            url: `http://localhost:8080/hostelAttendance/addAttendance?hostel_id=${hostel_id}&floorNo=${floorNo}&studentAttendances=${presents}`,
            headers: {
              "Content-Type": "application/json",
            },
            type: "POST",
            success: function (data) {   
              if(!data.status)
              {
                let message = data.message;
               swal("Try Again!", message , "warning")
               .then((value) => {
                window.location.reload();
             });
              } else{
               swal("Good job!", "Attendance Added Successfully", "success")
              .then((value) => {
                    window.location.reload();
                 });
              }
            },
            error: function () {
              swal("Try Again!", "Something is Wrong", "error");
              console.log("Error");
            },
          });
        }
        
        
      });


      $("#uploadFile").click(function(){
        var fileInput = document.getElementById('choose-file');
        var fileName = fileInput.files[0].name;
        var fileExtension = fileName.split('.').pop();
        console.log(fileExtension);
      });
      
  });
  