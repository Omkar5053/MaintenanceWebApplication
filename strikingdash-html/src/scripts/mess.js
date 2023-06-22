$(document).ready(function () {
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  let username = localStorage.getItem("username");
  const user = document.getElementById("username");
  user.innerHTML = username;
  const role = document.getElementById("role");
  role.innerHTML = roleType;
  getMess();

  function getMess() {
    $.post("http://localhost:8080/mess/listOfAllMess", function (data, status) {
      console.log(data);
      $("#messTableDataBody").empty();
      for (i = 0; i < data.length; i++) {
        $("#messTableDataBody").append(
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
                          .append(data[i].messName)
                      )
                  )
              )
            )
            .append(
              $("<td>").append(
                `
                            <i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit" id="MessEdit" data-toggle="modal" data-target="#editMess" data-aid="` +
                  data[i].messId +
                  `"></i>
                        `
              )
            )
        );
      }
    });
    $(document).on("click", ".deleteMess", function (e) {
      deleteMess($($(this)[0]).data("aid"));
      e.preventDefault();
    });

    $(document).on("click", "#MessEdit", function (e) {
      getOneMess($($(this)[0]).data("aid"));
      e.preventDefault();
    });
  }

  function getOneMess(id) {
    $.ajax({
      url: `http://localhost:8080/mess/getBy?messId=${id}`,
      method: "POST",
      success: function (data) {
        console.log(data);
        $("#editMessName").val(data.messName);
        $("#h_id").val(data.messId);
      },
    });
  }

  $("#editMessForm").on("click", function (e) {
    let messName = $("#editMessName").val();
    let messId = $("#h_id").val();
    $.ajax({
      url: `http://localhost:8080/mess/addOrUpdateMess?messId=${messId}&messName=${messName}&userId=${userId}&roleType=${roleType}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      success: function (data) {
        $("#editMessName").val("");
        if (!data.status) {
          swal("Duplicate Entry", "Mess Already Exists", "warning");
        } else {
          getMess();
          swal("Good Job!!", "Mess Updated Successfully", "success").then((value) => {
            window.location.reload();
          });
        }
      },
      error: function () {
        swal("Server Error", "Something wrong in server", "error");
        console.log("Error");
      },
    });
  });

  $("#saveMess").click(function () {
    let messId = 0;
    let messName = $("#addMessName").val();
    let userId = localStorage.getItem("userId");
    let roleType = localStorage.getItem("roleType");
    $.ajax({
      url: `http://localhost:8080/mess/addOrUpdateMess?messId=${messId}&messName=${messName}&userId=${userId}&roleType=${roleType}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      success: function (data) {
        $("#addMessName").val("");
        if (!data.status) {
          swal("Duplicate Entry", "Mess Already Exists", "warning");
        } else {
          getMess();
          swal("Good Job!!", "Mess Added Successfully", "success").then((value) => {
            window.location.reload();
          });
        }
      },
      error: function () {
        swal("Server Error", "Something wrong in server", "error");
        console.log("Error");
      },
    });
  });

  function deleteMess(messId) {
    $.ajax({
      url: `http://localhost:8080/mess/delete?messId=${messId}&userId=${userId}&roleType=${roleType}`,
      type: "POST",
      success: function (data) {
        getMess();
        window.location.reload();
      },
      error: function () {
        getMess();
        window.location.reload();
      },
    });
  }
});
