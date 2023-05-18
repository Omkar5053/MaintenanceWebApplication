$(document).ready(function () {
    let userId = localStorage.getItem("userId");
    let roleType = localStorage.getItem("roleType");
  
    $("#login").on("click", function (e) {
      let loginId = $("#username").val();
      let password = $("#password-field").val();
      $.ajax({
        url: `http://localhost:8080/auth/login?loginId=${loginId}&password=${password}`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        success: function (data) {
          localStorage.setItem("userId", data.sessionId);
          localStorage.setItem("roleType", data.roleName);
          $("#username").val("");
          $("#password").val("");
          $(location).attr("href", "menu.html");
          $(".content").hide();
        },
        error: function () {
          console.log("Error");
        },
      });
    });
  
    $(".logout").on("click", function (e) {
      console.log("logout");
      $.ajax({
        url: `http://localhost:8080/auth/logout`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        success: function (data) {
          $(location).attr("href", "../login-page/index.html");
        },
        error: function () {
          console.log("Error");
        },
      });
    });
  
    $("#hostel").on("click", function (e) {
      getHostels();
    });
    function getHostels() {
      $("#hostelTableDataBody").empty();
      $.post(
        "http://localhost:8080/hostel/getAllHostels",
        function (data, status) {
          console.log(data);
          $("#hostel-table").append(
            $("<thead>")
              .append($("<th>").append("No"))
              .append($("<th>").append("Hostel Name"))
              .append($("<th>").append("Action"))
          );
          for (i = 0; i < data.length; i++) {
            $("#hostel-table").append(
              $("<tr>")
                .append($("<td>").append(i + 1))
                .append($("<td>").append(data[i].hostelName))
                .append(
                  $("<td>").append(
                    `
                      <i class="fas fa-eye listStudents" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                      data[i].hostel_id +
                      `"></i>
                      <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit editHostel" data-bs-toggle="modal" data-bs-target="#update" data-aid="` +
                      data[i].hostel_id +
                      `"></i>
                      <i class="fas fa-trash deleteHostel" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                      data[i].hostel_id +
                      `"></i>
                  `
                  )
                )
            );
          }
  
          $(".deleteHostel").click(function (e) {
            deleteHostel($($(this)[0]).data("aid"));
            e.preventDefault();
          });
  
          $(".editHostel").click(function (e) {
            getOneHostel($($(this)[0]).data("aid"));
            e.preventDefault();
          });
  
          $(".listStudents").click(function (e) {
            console.log("in view");
            $("#parent").hide();
            $("#viewflight").show();
            viewFlight($($(this)[0]).data("aid"));
            e.preventDefault();
          });
        }
      );
    }
  
    $("#addHostel").on("click", function (e) {
      let data = {
        hostelName: $("#addHostelName").val(),
      };
  
      $.ajax({
        url: `http://localhost:8080/hostel/addHostel?userId=${userId}&roleType=${roleType}`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
          //console.log(data);
          getHostels();
          $("#addHostelName").val("");
        },
        error: function () {
          console.log("Error");
        },
      });
    });
  
    function getOneHostel(id) {
      $.ajax({
        url: `http://localhost:8080/hostel/getBy?hostel_id=${id}`,
        method: "POST",
        success: function (data) {
          $("#name").val(data.hostelName);
          $("#h_id").val(data.hostel_id);
        },
      });
    }
    //done finding by id
  
    //Updating the airline
    $("#updateHostel").on("click", function (e) {
      let hostelName = $("#name").val();
      let hostel_id = $("#h_id").val();
      $.ajax({
        url: `http://localhost:8080/hostel/updateHostel?hostel_id=${hostel_id}&hostelName=${hostelName}&userId=${userId}&roleType=${roleType}`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        success: function (data) {
          //console.log(data);
          getHostels();
          $("#name").val("");
        },
        error: function () {
          console.log("Error");
        },
      });
    });
  
    function deleteHostel(hostelId) {
      $.ajax({
        url: `http://localhost:8080/hostel/delete?hostel_id=${hostelId}&userId=${userId}&roleType=${roleType}`,
        type: "POST",
        success: function (data) {
          getHostels();
        },
        error: function () {
          getHostels();
        },
      });
    }
  
    $("#ambulance").on("click", function (e) {
      $(".content").show();
      $("#table").hide();
      $(".hostel").hide();
      $(".ambulance").show();
      $(".internship").hide();
      $(".mess").hide();
      $(".messUser").hide();
      $(".leave").hide();
      $(".maintenance").hide();
      $.ajax({
        url: `http://localhost:8080/ambulance/listall?roleType=${roleType}`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        success: function (data) {
          getAllAmbulances(data);
        },
        error: function () {
          console.log("Error");
        },
      });
  
      function getAllAmbulances(data) {
        $("#ambu-table").empty();
        $("#ambu-table").append(
          $("<thead>")
            .append($("<th>").append("No"))
            .append($("<th>").append("AmbulanceName"))
            .append($("<th>").append("License Plate"))
            .append($("<th>").append("Action"))
        );
        for (i = 0; i < data.length; i++) {
          $("#ambu-table").append(
            $("<tr>")
              .append($("<td>").append(i + 1))
              .append($("<td>").append(data[i].ambulanceName))
              .append($("<td>").append(data[i].licensePlate))
              .append(
                $("<td>").append(
                  `
                                 <i class='fas fa-eye listStudents' data-aid="` +
                    data[i].ambulance_id +
                    `"></i>
                                 <i class="far fa-edit editAmbulance" data-bs-toggle="modal" data-bs-target="#second_form" data-aid="` +
                    data[i].ambulance +
                    `"></i>
                                 <i class="fas fa-trash deleteAmbulance" data-aid="` +
                    data[i].ambulance_id +
                    `"></i>
                             `
                )
              )
          );
        }
        // loadButtons1();
      }
    });
  
    $("#internship").on("click", function (e) {
      // $(".content").show();
      $("#table").hide();
      $(".hostel").hide();
      $(".ambulance").hide();
      $(".internship").show();
      $(".mess").hide();
      $(".messUser").hide();
      $(".leave").hide();
      $(".feedback").hide();
      $(".maintenance").hide();
      $.ajax({
        url: `http://localhost:8080/hostel/getAllHostels`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        success: function (items) {
          $("#internship-dropdown").show();
          $("#internship-select").empty();
  
          $("#internship-select").append($("<option>").append("Select Option"));
          for (var i = 0; i < items.length; i++) {
            $("#internship-select").append(
              $("<option>", { value: items[i].hostel_id }).text(
                items[i].hostelName
              )
            );
          }
        },
        error: function () {
          console.log("Error");
        },
      });
      $("#internship-select").on("change", function (e) {
        let hostelId = $("#internship-select").val();
  
        console.log(
          "userId:" +
            localStorage.getItem("userId") +
            "RoleType:" +
            localStorage.getItem("roleType")
        );
        $.ajax({
          url: `http://localhost:8080/internship/listOfInternshipStudentsByHostel?hostelId=${hostelId}&userId=${userId}&roleType=${roleType}`,
          headers: {
            "Content-Type": "application/json",
          },
          type: "POST",
          success: function (data) {
            getAllInternshipData(data);
          },
          error: function () {
            console.log("Error");
          },
        });
      });
  
      function getAllInternshipData(data) {
        $("#inten-table").empty();
        $("#inten-table").append(
          $("<thead>")
            .append($("<th>").append("No"))
            .append($("<th>").append("RegistrationNumber"))
            .append($("<th>").append("Name"))
            .append($("<th>").append("Days"))
            .append($("<th>").append("PhoneNo"))
            .append($("<th>").append("Purpose"))
            .append($("<th>").append("Action"))
        );
        for (i = 0; i < data.length; i++) {
          $("#inten-table").append(
            $("<tr>")
              .append($("<td>").append(i + 1))
              .append($("<td>").append(data[i].registrationNumber))
              .append($("<td>").append(data[i].noOfDays))
              .append($("<td>").append(data[i].phoneNo))
              .append($("<td>").append(data[i].purpose))
              .append($("<td>").append(data[i].name))
              .append(
                $("<td>").append(
                  `
                                            <i class='fas fa-eye listStudents' data-aid="` +
                    data[i].internshipId +
                    `"></i>
                                            <i class="far fa-edit editAmbulance" data-bs-toggle="modal" data-bs-target="#second_form" data-aid="` +
                    data[i].internshipId +
                    `"></i>
                                            <i class="fas fa-trash deleteAmbulance" data-aid="` +
                    data[i].internshipId +
                    `"></i>
                                        `
                )
              )
          );
        }
        // loadButtons1();
      }
    });
  
    $("#hostelList").on("change", function (e) {
      let hostelId = $("#hostelList").val();
      console.log(
        "userId:" +
          localStorage.getItem("userId") +
          "RoleType:" +
          localStorage.getItem("roleType")
      );
      $.ajax({
        url: `http://localhost:8080/internship/listOfInternshipStudentsByHostel?hostelId=${hostelId}&userId=${userId}&roleType=${roleType}`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        success: function (data) {
          getAllInternshipData(data);
        },
        error: function () {
          console.log("Error");
        },
      });
    });
  
    //    function getAllInternshipData(data){
    //        $("#table").empty();
    //        $("#table").append($("<thead>").append($("<th>").append("No"))
    //            .append($("<th>").append("RegistrationNumber"))
    //            .append($("<th>").append("Name"))
    //            .append($("<th>").append("Days"))
    //            .append($("<th>").append("PhoneNo"))
    //            .append($("<th>").append("Purpose"))
    //            .append($("<th>").append("Action")))
    //        for(i=0;i<data.length;i++) {
    //            $("#table").append($("<tr>")
    //                .append($("<td>").append(i+1))
    //                .append($("<td>").append(data[i].registrationNumber))
    //                .append($("<td>").append(data[i].noOfDays))
    //                .append($("<td>").append(data[i].phoneNo))
    //                .append($("<td>").append(data[i].purpose))
    //                .append($("<td>").append(data[i].name))
    //                .append($("<td>").append(`
    //                    <i class='fas fa-eye listStudents' data-aid="`+data[i].internshipId+`"></i>
    //                    <i class="far fa-edit editAmbulance" data-bs-toggle="modal" data-bs-target="#second_form" data-aid="`+data[i].internshipId+`"></i>
    //                    <i class="fas fa-trash deleteAmbulance" data-aid="`+data[i].internshipId+`"></i>
    //            `)));
    //        }
    //    }
  
    $("#mess").on("click", function () {
      //    $(".content").show();
      //   $("#table").hide();
      $(".hostel").hide();
      $(".ambulance").hide();
      $(".internship").hide();
      $(".mess").show();
      $(".messUser").hide();
      $(".leave").hide();
      $(".feedback").hide();
      $(".maintenance").hide();
      $.ajax({
        url: `http://localhost:8080/mess/listOfAllMess`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        success: function (data) {
          console.log(data);
  
          getAllMess(data);
        },
        error: function () {
          console.log("Error");
        },
      });
    });
  
    function getAllMess(data) {
      $("#mess-table").empty();
      $("#mess-table").append(
        $("<thead>")
          .append($("<th>").append("No"))
          .append($("<th>").append("MessName"))
          .append($("<th>").append("Action"))
      );
      for (i = 0; i < data.length; i++) {
        $("#mess-table").append(
          $("<tr>")
            .append($("<td>").append(i + 1))
            .append($("<td>").append(data[i].messName))
            .append(
              $("<td>").append(
                `
                      <i class='fas fa-eye listStudents' data-aid="` +
                  data[i].messId +
                  `"></i>
                      <i class="far fa-edit editAmbulance" data-bs-toggle="modal" data-bs-target="#second_form" data-aid="` +
                  data[i].messId +
                  `"></i>
                      <i class="fas fa-trash deleteAmbulance" data-aid="` +
                  data[i].messId +
                  `"></i>
             `
              )
            )
        );
      }
      // loadButtons1();
    }
  
    $("#messUser").on("click", function () {
      $(".content").show();
      $("#table").hide();
      $(".hostel").hide();
      $(".ambulance").hide();
      $(".internship").hide();
      $(".mess").hide();
      $(".messUser").show();
      $(".leave").hide();
      $(".feedback").hide();
      $(".maintenance").hide();
      $.ajax({
        url: `http://localhost:8080/common/userType`,
        headers: { "Content-Type": "application/json" },
        type: "GET",
        success: function (items) {
          $("#messUser-select").val("");
          for (var i = 0; i < items.length; i++) {
            $("#messUser-select").append(
              $("<option>", { value: items[i].value }).text(items[i].name)
            );
          }
        },
        error: function () {
          console.log("Error");
        },
      });
      $("#messUser-select").on("change", function () {
        let userType = $("#messUser-select").val();
        $.ajax({
          url: `http://localhost:8080/mess/listOfStudentsByUserType?userType=${userType}&userId=${userId}&roleType=${roleType}`,
          headers: { "Content-Type": "application/json" },
          type: "POST",
          success: function (data) {
            console.log(data);
            getAllMessUser(data);
          },
          error: function () {
            console.log("Error");
          },
        });
      });
    });
  
    function getAllMessUser(data) {
      $("#messUser-table").empty();
      $("#messUser-table").append(
        $("<thead>")
          .append($("<th>").append("No"))
          .append($("<th>").append("Name"))
          .append($("<th>").append("HostelName"))
          .append($("<th>").append("FoodType"))
          .append($("<th>").append("BreakFast"))
          .append($("<th>").append("Lunch"))
          .append($("<th>").append("Dinner"))
          .append($("<th>").append("Action"))
      );
      for (i = 0; i < data.length; i++) {
        $("#messUser-table").append(
          $("<tr>")
            .append($("<td>").append(i + 1))
            .append($("<td>").append(data[i].user.userName))
            .append($("<td>").append(data[i].hostel.hostelName))
            .append($("<td>").append(data[i].foodType))
            .append($("<td>").append(data[i].breakFast))
            .append($("<td>").append(data[i].lunch))
            .append($("<td>").append(data[i].dinner))
            .append(
              $("<td>").append(
                `
                      <i class='fas fa-eye listStudents' data-aid="` +
                  data[i].messId +
                  `"></i>
                      <i class="far fa-edit editAmbulance" data-bs-toggle="modal" data-bs-target="#second_form" data-aid="` +
                  data[i].messId +
                  `"></i>
                      <i class="fas fa-trash deleteAmbulance" data-aid="` +
                  data[i].messId +
                  `"></i>
             `
              )
            )
        );
      }
      // loadButtons1();
    }
  
    $("#leave").on("click", function (e) {
      $(".content").show();
      $("#table").hide();
      $(".hostel").hide();
      $(".ambulance").hide();
      $(".internship").hide();
      $(".mess").hide();
      $(".messUser").hide();
      $(".leave").show();
      $(".feedback").hide();
      $(".maintenance").hide();
      $.ajax({
        url: `http://localhost:8080/hostel/getAllHostels`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        success: function (items) {
          $("#leave-dropdown").show();
          $("#leave-select").empty();
  
          $("#leave-select").append($("<option>").append("Select Option"));
          for (var i = 0; i < items.length; i++) {
            $("#leave-select").append(
              $("<option>", { value: items[i].hostel_id }).text(
                items[i].hostelName
              )
            );
          }
        },
        error: function () {
          console.log("Error");
        },
      });
      $("#leave-select").on("change", function (e) {
        let hostelId = $("#leave-select").val();
  
        console.log(
          "userId:" +
            localStorage.getItem("userId") +
            "RoleType:" +
            localStorage.getItem("roleType")
        );
        $.ajax({
          url: `http://localhost:8080/leave/listOfLeavesByHostel?hostelId=${hostelId}&userId=${userId}&roleType=${roleType}`,
          headers: {
            "Content-Type": "application/json",
          },
          type: "POST",
          success: function (data) {
            getAllLeaveData(data);
          },
          error: function () {
            console.log("Error");
          },
        });
      });
  
      function getAllLeaveData(data) {
        $("#leave-table").empty();
        $("#leave-table").append(
          $("<thead>")
            .append($("<th>").append("No"))
            .append($("<th>").append("Hostel"))
            .append($("<th>").append("Name"))
            .append($("<th>").append("LeaveType"))
            .append($("<th>").append("Reason"))
            .append($("<th>").append("ParentName"))
            .append($("<th>").append("ParentNumber"))
            .append($("<th>").append("StartDate"))
            .append($("<th>").append("EndDate"))
            .append($("<th>").append("Action"))
        );
        for (i = 0; i < data.length; i++) {
          $("#leave-table").append(
            $("<tr>")
              .append($("<td>").append(i + 1))
              .append($("<td>").append(data[i].hostel.hostelName))
              .append($("<td>").append(data[i].user.userName))
              .append($("<td>").append(data[i].leaveType))
              .append($("<td>").append(data[i].reason))
              .append($("<td>").append(data[i].parentName))
              .append($("<td>").append(data[i].parentNumber))
              .append($("<td>").append(data[i].startDate))
              .append($("<td>").append(data[i].endDate))
              .append(
                $("<td>").append(
                  `
                                               <i class='fas fa-eye listStudents' data-aid="` +
                    data[i].internshipId +
                    `"></i>
                                               <i class="far fa-edit editAmbulance" data-bs-toggle="modal" data-bs-target="#second_form" data-aid="` +
                    data[i].internshipId +
                    `"></i>
                                               <i class="fas fa-trash deleteAmbulance" data-aid="` +
                    data[i].internshipId +
                    `"></i>
                                           `
                )
              )
          );
        }
        // loadButtons1();
      }
    });
  
    //feedback
  
    $("#feedback").on("click", function () {
      //    $(".content").show();
      //   $("#table").hide();
      $(".hostel").hide();
      $(".ambulance").hide();
      $(".internship").hide();
      $(".mess").hide();
      $(".messUser").hide();
      $(".leave").hide();
      $(".feedback").show();
      $(".maintenance").hide();
      $.ajax({
        url: `http://localhost:8080/mess/listOfAllMess`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        success: function (data) {
          console.log(data);
          $("#feedback-dropdown").show();
          $("#feedback-select").empty();
  
          $("#feedback-select").append($("<option>").append("Select Option"));
          for (var i = 0; i < data.length; i++) {
            $("#feedback-select").append(
              $("<option>", { value: data[i].messId }).text(data[i].messName)
            );
          }
        },
        error: function () {
          console.log("Error");
        },
      });
  
      $("#feedback-select").on("change", function (e) {
        let messId = $("#feedback-select").val();
        localStorage.setItem("messId", messId);
        console.log(messId);
        $.ajax({
          url: `http://localhost:8080/feedback/listOfFeedbacks?messId=${messId}&userId=${userId}&roleType=${roleType}`,
          headers: {
            "Content-Type": "application/json",
          },
          type: "POST",
          success: function (data) {
            getAllFeedbackByMess(data);
          },
          error: function () {
            console.log("Error");
          }
        });
      });
  
      function getAllFeedbackByMess(data) {
        $("#feedback-table").empty();
        $("#feedback-table").append(
          $("<thead>")
            .append($("<th>").append("No"))
            .append($("<th>").append("Feedback"))
            .append($("<th>").append("User Name"))
            .append($("<th>").append("Mess Name"))
            .append($("<th>").append("Action"))
        );
        for (i = 0; i < data.length; i++) {
          $("#feedback-table").append(
            $("<tr>")
              .append($("<td>").append(i + 1))
              .append($("<td>").append(data[i].feedback))
              .append($("<td>").append(data[i].user.userName))
              .append($("<td>").append(data[i].mess.messName))
              .append(
                $("<td>").append(
                  `
                                               <i class="fas fa-trash deleteFeedback" data-fid="` +
                    data[i].feedbackId +
                    `"></i>
                                           `
                )
              )
          );
        }
        $(".deleteFeedback").click(function (e) {
          deleteFeedback($($(this)[0]).data("fid"));
          e.preventDefault();
        });
      }
      function deleteFeedback(feedbackId){
          let messId  = localStorage.getItem("messId");
              $.ajax({
                url: `http://localhost:8080/feedback/deleteFeedback?feedbackId=${feedbackId}&userId=${userId}&roleType=${roleType}`,
                type: "POST",
                dataType: "json",
                success: function (data) {
                  console.log("Inside delete");
                  $.ajax({
                      url: `http://localhost:8080/feedback/listOfFeedbacks?messId=${messId}&userId=${userId}&roleType=${roleType}`,
                      headers: {
                        "Content-Type": "application/json",
                      },
                      type: "POST",
                      success: function (data) {
                        getAllFeedbackByMess(data);
                      },
                      error: function () {
                        console.log("Error");
                      }
                    });
                 // getHostels();
                },
                error: function () {
                  //getHostels();
                },
              });
      }
    });
  
  
    $("#maintenance").on("click", function (){
      $(".hostel").hide();
      $(".ambulance").hide();
      $(".internship").hide();
      $(".mess").hide();
      $(".messUser").hide();
      $(".leave").hide();
      $(".feedback").hide();
      $(".maintenance").show();
      $(".card").show();
    });
  });
  