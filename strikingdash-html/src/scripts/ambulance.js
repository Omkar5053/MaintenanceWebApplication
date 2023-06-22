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
          `http://localhost:8080/ambulance/listAllAmbulances?userId=${userId}`,
          function (data, status) {
            console.log(data);

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
        $(document).on('click','.deleteAmbulance', function(e) {
          e.preventDefault();
           deleteAmbulance($($(this)[0]).data("aid"));
           
         });
    }

    $("#saveAmbulance").click(function() {
      
       let ambulanceName =  $("#ambulanceName").val()
       let licensePlate = $("#licensePlate").val()
       let ambulance_id = 0
     
      
       $.ajax({
          url: `http://localhost:8080/ambulance/addOrEditAmbulance?ambulance_id=${ambulance_id}&ambulanceName=${ambulanceName}&licensePlate=${licensePlate}&userId=${userId}`,
          type: "POST",
          success: function (data) {
           $("#ambulanceName").val("");
           $("#licensePlate").val("");

           if(!data.status)
             {
              swal("Duplicate Entry", "Ambulance Already Exists", "warning");
             } else{
              getAmbulanceData();
              swal("Ambulance Added Succesfully!!")
             .then((value) => {
                   window.location.reload();
                });
             }
          },
          error: function () {
            swal("Server Error", "Something wrong in server", "error");
            console.log("Error");
          },
        });
  })

});



// <i class="fas fa-trash deleteAmbulance" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
//                             data.listOfData[i].ambulance_id +
//                             `"></i>