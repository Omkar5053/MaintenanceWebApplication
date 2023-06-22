$(document).ready(function () {
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  let username = localStorage.getItem("username");
  const user = document.getElementById("username");
  user.innerHTML = username;
  const role = document.getElementById("role");
  role.innerHTML = roleType;
  getMaintenanceData();

  function getMaintenanceData() {
    $.post(
      "http://localhost:8080/maintenance/listOfMaintenanceData",
      function (data, status) {
        console.log(data);
        for (i = 0; i < data.length; i++) {
          $("#maintenanceTableDataBody").append(
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
                            .append(data[i].user.userName)
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
                            .append(data[i].hostel.hostelName)
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
                            .append(data[i].maintenanceType)
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
                            .append(data[i].description)
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
                            .append(data[i].date)
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
                            .append(data[i].maintenanceStatus)
                        )
                    )
                )
              )
              .append(
                $("<td>").append(
                  `
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit editMaintenance" id="editMaintenance" data-toggle="modal" data-target="#editMaintenanceModal" data-aid="` +
                    data[i].maintenanceId +
                    `"></i>
                            <i class="fas fa-trash deleteMaintenance" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                    data[i].maintenanceId +
                    `"></i>
                        `
                )
              )
          );
        }

        $(document).on("click", ".deleteMaintenance", function (e) {
          e.preventDefault();
          deleteMaintenance($($(this)[0]).data("aid"));
        });

        $(document).on("click", ".editMaintenance", function (e) {
          e.preventDefault();
          console.log("Edit");
          getOneMaintenance($($(this)[0]).data("aid"));
        });
      }
    );
  }

  function deleteMaintenance(maintenanceId) {
    $.ajax({
      url: `http://localhost:8080/maintenance/deleteMaintenance?maintenanceId=${maintenanceId}&userId=${userId}&roleType=${roleType}`,
      type: "POST",
      success: function (data) {
        getMaintenanceData();
        window.location.reload();
      },
      error: function (error) {
        alert(error);
        getMaintenanceData();
        window.location.reload();
      },
    });
  }

  function getOneMaintenance(maintenanceId) {
    $.ajax({
      url: `http://localhost:8080/maintenance/listOfMaintenanceDataById?maintenanceId=${maintenanceId}`,
      method: "POST",
      success: function (data) {
        getMaintenanceType();
        getMaintenanceStatus();
        $("#maintenance_id").val(data.maintenanceId);
        $("#editUserName").val(data.user.userName);
        $("#editHostelName").val(data.hostel.hostelName);
        $("#editDescription").val(data.description);
        $("#maintenanceStatus-Select").val(data.maintenanceStatus);
        $("#maintenanceType-select").val(data.maintenanceType);
      },
      error: function (error) {
        alert(error);
      },
    });
  }

  $("#editMaintenance").on("click", function (e) {
    let maintenanceId = $("#maintenance_id").val();
    let maintenanceStatus = $("#maintenanceStatus-Select").val();
    let maintenanceType = $("#maintenanceType-select").val();

    $.ajax({
      url: `http://localhost:8080/maintenance/editMaintenanceDetailsByAdmin?maintenanceId=${maintenanceId}&maintenanceStatus=${maintenanceStatus}&userId=${userId}&roleType=${roleType}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      success: function (data) {
        $("#maintenance_id").val("");
        $("#editUserName").val("");
        $("#editHostelName").val("");
        $("#editDescription").val("");
        $("#editDate").val("");
        $("#maintenanceStatus-Select").val("");
        $("#maintenanceType-select").val("");
        getMaintenanceStatus();
        getMaintenanceType();
        if (!data.status) {
          swal("Duplicate Entry", "Data Added Already", "warning");
        } else {
          getMaintenanceData
          swal("Good Job!", "Data Updated Succesfully!!", "success").then(
            (value) => {
              window.location.reload();
            }
          );
        }
       
      },
      error: function (error) {
        alert(error);
      },
    });
  });

  function getMaintenanceType() {
    $.ajax({
      url: `http://localhost:8080/common/maintenanceType`,
      type: "GET",
      success: function (data) {
        $(".maintenanceTypeDropdown").empty();
        for (i = 0; i < data.length; i++) {
          $(".maintenanceTypeDropdown").append(
            $("<option>", { value: data[i].value }).text(data[i].name)
          );
        }
      },
      error: function (error) {
        alert(error);
      },
    });
  }

  function getMaintenanceStatus() {
    $.ajax({
      url: `http://localhost:8080/common/maintenanceStatus`,
      type: "GET",
      success: function (data) {
        $(".maintenanceStatusDropdown").empty();
        for (i = 0; i < data.length; i++) {
          $(".maintenanceStatusDropdown").append(
            $("<option>", { value: data[i].value }).text(data[i].name)
          );
        }
      },
      error: function (data) {
        alert(error);
      },
    });
  }
});
