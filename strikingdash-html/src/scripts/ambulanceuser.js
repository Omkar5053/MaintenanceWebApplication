$(document).ready(function () {
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  let username = localStorage.getItem("username");
  const user = document.getElementById("username");
  user.innerHTML = username;
  const role = document.getElementById("role");
  role.innerHTML = roleType;
  getAmbulanceData();

  function getAmbulanceData() {
    $.post(
      `http://localhost:8080/ambulance/getAllRequests?userId=${userId}`,
      function (data, status) {
        console.log(data);

        for (i = 0; i < data.listOfData.length; i++) {
          $("#ambulanceTableDataBody").append(
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
                    .addClass("d-flex")
                    .append(
                      $("<div>")
                        .addClass("userDatatable-inline-title")
                        .append(
                          $("<a>")
                            .addClass("text-dark fw-500")
                            .append(data.listOfData[i].user)
                        )
                    )
                )
              )
              .append(
                $("<td>").append(
                  $("<div>")
                    .addClass("d-flex")
                    .append(
                      $("<div>")
                        .addClass("userDatatable-inline-title")
                        .append(
                          $("<a>")
                            .addClass("text-dark fw-500")
                            .append(data.listOfData[i].hostel.hostelName)
                        )
                    )
                )
              )
              .append(
                $("<td>").append(
                  $("<div>")
                    .addClass("d-flex")
                    .append(
                      $("<div>")
                        .addClass("userDatatable-inline-title")
                        .append(
                          $("<a>")
                            .addClass("text-dark fw-500")
                            .append(data.listOfData[i].ambulance.ambulanceName)
                        )
                    )
                )
              )
              .append(
                $("<td>").append(
                  $("<div>")
                    .addClass("d-flex")
                    .append(
                      $("<div>")
                        .addClass("userDatatable-inline-title")
                        .append(
                          $("<a>")
                            .addClass("text-dark fw-500")
                            .append(data.listOfData[i].ambulanceStatus)
                        )
                    )
                )
              )
              .append(
                $("<td>").append(
                  $("<div>")
                    .addClass("d-flex")
                    .append(
                      $("<div>")
                        .addClass("userDatatable-inline-title")
                        .append(
                          $("<a>")
                            .addClass("text-dark fw-500")
                            .append(data.listOfData[i].requestDate)
                        )
                    )
                )
              )
              .append(
                $("<td>").append(
                  `
                  <input type="button" class="changeStatus button-34" data-aid="` +
                    data.listOfData[i].requestId +
                    `" value="` +
                    data.listOfData[i].ambulanceStatus +
                    `"></button>
                          `
                )
              )
          );
        }
      }
    );

    $(document).on("click", ".changeStatus", function (e) {
      e.preventDefault();
      changeAmbulanceStatus($($(this)[0]).data("aid"));
    });
  }

  function changeAmbulanceStatus(requestId) {
    $.ajax({
      url: `http://localhost:8080/ambulance/changeStatus?requestId=${requestId}&userId=${userId}`,
      type: "POST",
      success: function (data) {
        $(".button-34").css("background", "#ffcc00");
        if (!data.status) {
          swal("Server Error", "Something wrong in server", "error");
        } else {
          getAmbulanceData();
          swal("Ambulance Status Changed Succesfully!!").then((value) => {
            window.location.reload();
          });
        }
      },
      error: function () {
        swal("Server Error", "Something wrong in server", "error");
       
      },
    });
  }

  function getHostels() {
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

  function getAmbulances() {
    $.ajax({
      url: `http://localhost:8080/ambulance/listAllAmbulances?userId=${userId}`,
      type: "POST",
      success: function (data) {
        $(".messDropdown").empty();
        $(".messDropdown").append($("<option>").append("Select Option"));
        for (i = 0; i < data.listOfData.length; i++) {
          $(".messDropdown").append(
            $("<option>", { value: data.listOfData[i].ambulance_id }).text(
              data.listOfData[i].ambulanceName
            )
          );
        }
      },
      error: function () {
        console.log("Eror");
      },
    });
  }

  $("#addNewRequest").click(function () {
    getHostels();
    getAmbulances();
  });

  $("#saveAmbulance").click(function () {
    let hostelId = $(".hostelDropdown").val();
    let ambulanceId = $(".messDropdown").val();

    $.ajax({
      url: `http://localhost:8080/ambulance/addAmbulanceRequest?hostel_id=${hostelId}&ambulance_id=${ambulanceId}&userId=${userId}`,

      type: "POST",
      success: function (data) {
        $("#ambulanceName").val("");
        $("#licensePlate").val("");
        if (!data.status) {
          swal("Server Error", "Something wrong in server", "error");
        } else {
          getAmbulanceData();
          swal("Ambulance Request Added Succesfully!!").then((value) => {
            window.location.reload();
          });
        }
     
      },
      error: function () {
        console.log("Error");
      },
    });
  });
});
