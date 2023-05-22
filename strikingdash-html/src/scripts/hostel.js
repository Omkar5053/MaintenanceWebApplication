$(document).ready(function () {
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  getHostels();
  function getHostels() {
    $.ajax({
      url: `http://localhost:8080/hostel/getAllHostels`,
      type: "POST",
      beforeSend: function () {},
      success: function (data, status) {
        $("#hostelTableDataBody").empty();
        for (i = 0; i < data.length; i++) {
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
                    .append(data[i].hostelName)
                )
              )
              .append(
                $("<td>").append(
                  `<i  style="font-size:20px; cursor:pointer; margin:3px;" class="far fa-edit editHostel" id=""  data-name="` +
                    data[i].hostelName +
                    `" data-aid="` +
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
      },
      error: function () {
        console.log("Eror");
      },
    });

    $(document).on("click", ".deleteHostel", function (e) {
      deleteHostel($($(this)[0]).data("aid"));
      e.preventDefault();
    });

    $(document).on("click", ".editHostel", function (e) {
      e.preventDefault();
      let id = $(this).data("aid");
      let name = $(this).data("name");
      $("#editHostelName").val(name);
      $("#h_id").val(id);
      $("#edit-modal-basic").modal("show");
      // getOneHostel($($(this)[0]).data("aid"));
      // e.preventDefault();
    });
  }

  function getOneHostel(id) {
    $.ajax({
      url: `http://localhost:8080/hostel/getBy?hostel_id=${id}`,
      method: "POST",
      success: function (data) {
        $("#editHostelName").val(data.hostelName);
        $("#h_id").val(data.hostel_id);
      },
    });
  }

  $("#editHostel").on("click", function (e) {
    let hostelName = $("#editHostelName").val();
    let hostel_id = $("#h_id").val();
    $.ajax({
      url: `http://localhost:8080/hostel/updateHostel?hostel_id=${hostel_id}&hostelName=${hostelName}&userId=${userId}&roleType=${roleType}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      success: function (data) {
        getHostels();
        $("#editHostelName").val("");
        window.location.reload();
      },
      error: function () {
        console.log("Error");
      },
    });
  });

  $("#addHostel").click(function () {
    let data = {
      hostelName: $("#addHostelName").val(),
    };
    if (data.hostelName == "") {
      // <button class="btn btn-outline-lighten fs-14 fw-500 btn-lg btn-message" data-messageType="warning" data-messageIcon="exclamation-circle">Warning</button>
    } else {
      let userId = localStorage.getItem("userId");
      let roleType = localStorage.getItem("roleType");
      $.ajax({
        url: `http://localhost:8080/hostel/addHostel?userId=${userId}&roleType=${roleType}`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
          $("#addHostelName").val("");
          //console.log(data);
          getHostels();
          window.location.reload();
        },
        error: function () {
          console.log("Error");
        },
      });
    }
  });

  // function deleteConfirm(cId) {
  //   swal({
  //     title: "Are you sure?",
  //     text: "you want to delete this contact",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       window.location = "/user/delete/" + cId;
  //     } else {
  //       swal("Your contact is safe");
  //     }
  //   });
  // }

  function deleteHostel(hostelId) {
    swal({
      title: "Are you sure?",
      text: "you want to delete this hostel",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: `http://localhost:8080/hostel/delete?hostel_id=${hostelId}&userId=${userId}&roleType=${roleType}`,
          type: "POST",
          success: function (data,status,http) {
            console.log(http.status);
            if(data === "SUCCESS"){
              getHostels();
              window.location.reload();
              swal("Hostel deleted successfully");
            }else{
              swal("You can't delete this Hostel");
            }
   
          },
          error: function (http) {
            swal("You can't delete this Hostel");
            getHostels();
            window.location.reload();
          },
        });
      }
      //  else {
      //   swal("Your Hostel is safe");
      // }
    });
  }
});
