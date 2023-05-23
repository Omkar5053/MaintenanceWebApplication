$(document).ready(function(){
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  let username = localStorage.getItem("username");
  const user = document.getElementById("username");
  user.innerHTML = username;
  const role = document.getElementById("role");
  role.innerHTML = roleType;
    getAmbulanceData();

    function getAmbulanceData()
    {
        $.post(
          "http://localhost:8080/ambulance/listAllAmbulances",
          function (data, status) {
            console.log(data);

            for (i = 0; i < data.length; i++) {
                $("#ambulanceTableDataBody").append($("<tr>")
                .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].user.userName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].ambulanceName)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].licensePlate)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].ambulanceStatus)))))
                .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].lastMaintenanceDate)))))
                .append($("<td>").append(`
                            <i class="fas fa-trash deleteAmbulance" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                            data[i].ambulance_id +
                            `"></i>
                        `)))
            }
          }
        );
        $(document).on('click','.deleteAmbulance', function(e) {
          e.preventDefault();
           deleteAmbulance($($(this)[0]).data("aid"));
           
         });

        //  $(document).on('click','.ambulanceEdit', function(e) {
        //   e.preventDefault();
        
        //   getOneAmbulance($($(this)[0]).data("aid"));
        //  });
    }

    $("#saveAmbulance").click(function() {
      let data = {
        ambulanceName: $("#ambulanceName").val(),
        licensePlate: $("#licensePlate").val()
      }
      
       let userId = localStorage.getItem("userId");
       let roleType = localStorage.getItem("roleType");
       $.ajax({
          url: `http://localhost:8080/ambulance/add?userId=${userId}&roleType=${roleType}`,
          headers: {
            "Content-Type": "application/json",
          },
          type: "POST",
          dataType: "json",
          data: JSON.stringify(data),
          success: function (data) {
           $("#ambulanceName").val("");
           $("#licensePlate").val("");
           
           getAmbulanceData();
              window.location.reload();
          },
          error: function () {
            console.log("Error");
          },
        });
  })

  function deleteAmbulance(ambulanceId) {
    $.ajax({
        url: `http://localhost:8080/ambulance/delete?ambulanceId=${ambulanceId}&userId=${userId}&roleType=${roleType}`,
        type: "POST",
            success: function (data) {
              getAmbulanceData();
                window.location.reload();
            },
            error: function () {
              getAmbulanceData();
                window.location.reload();
            },
        });
}


});
