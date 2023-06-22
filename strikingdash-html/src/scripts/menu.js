$(document).ready(function () {
    $("#popup-message").hide();
    let userId = localStorage.getItem("userId");
    let roleType = localStorage.getItem("roleType");
    let username = localStorage.getItem("username");
    const user = document.getElementById("username");
    user.innerHTML = username;
    const role = document.getElementById("role");
    role.innerHTML = roleType;
    getHostels();
    getAmbulanceData();
    getMess();
    getUsers();
    
    function getHostels() {
      $.ajax({
        url: `http://localhost:8080/hostel/getAllHostels?userId=${userId}`,
        type: "POST",
        beforeSend: function () {},
        success: function (data) {
            let h = data.listOfData.length;
        
         document.getElementById("hostel-count").innerHTML = h;

         
            $("#hostelTableDataBody").empty();
            for (i = 0; i < data.listOfData.length; i++) {
              
              $("#hostelTableDataBody").append(
                $("<tr>")
                  .append(
                    $("<td>").append(
                      $("<div>")
                        .addClass("userDatatable-content")
                        .append(i + 1)
                    )
                  )
                  .append(
                    $("<td>").append(
                      $("<div>")
                        .addClass("userDatatable-content")
                        .append(data.listOfData[i].hostelName)
                    )
                  )
                  .append(
                    $("<td>").append(
                      `<i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit editHostel" id=""  data-name="` +
                        data.listOfData[i].hostelName +
                        `" data-aid="` +
                        data.listOfData[i].hostel_id +
                        `"></i>
            
                     `
                    )
                  )
              );
            }
          
        },
        error: function () {
          $(location).attr("href", "login.html");
        },
      });
    }


    function getAmbulanceData()
    {
        $.post(
          `http://localhost:8080/ambulance/listAllAmbulances?userId=${userId}`,
          function (data, status) {
            let a = data.listOfData.length;
            document.getElementById("ambulance-count").innerHTML = a;
            for (i = 0; i < data.listOfData.length; i++) {
                $("#ambulanceTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data.listOfData[i].ambulanceName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data.listOfData[i].licensePlate)))))
                .append($("<td>").append(
                  `
                    
                        `)))
            }
          }
        );
    }

    function getUsers()
    {
        $.post(
          `http://localhost:8080/auth/getUsers`,
          function (data, status) {
            let a = data.length;
            document.getElementById("user-count").innerHTML = a;
            
          }
        );
    }

    function getMess()
    {
        $.post(
          "http://localhost:8080/mess/listOfAllMess",
          function (data, status) {
            let a = data.length;
       
            document.getElementById("mess-count").innerHTML = a;
          }
        );
    }
  

  });