$(document).ready(function(){
  let userId = localStorage.getItem("userId");
  let roleType = localStorage.getItem("roleType");
  let username = localStorage.getItem("username");
  const user = document.getElementById("username");
  user.innerHTML = username;
  const role = document.getElementById("role");
  role.innerHTML = roleType;
    getMessUsers();
  
      function getMessUsers()
      {
          $.post(
            "http://localhost:8080/mess/listOfAllMessUsers",
            function (data, status) {
              console.log(data);
  
              for (i = 0; i < data.length; i++) {
                  $("#internshipTableDataBody").append($("<tr>")
                  .append($("<td>").append($("<div>").addClass("userDatatable-content").append(i+1)))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].user.firstName + " "+ data[i].user.lastName)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].user.userType)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].foodType)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].hostel.hostelName)))))
                  .append($("<td>").append($("<div>").addClass("d-flex").append($("<div>").addClass("userDatatable-inline-title").append($("<a>").addClass("text-dark fw-500").append(data[i].mess.messName)))))
                  .append($("<td>").append(`
                              
                              <i class="fas fa-trash deleteMessUser" style="font-size:20px; cursor:pointer; margin:3px;" data-aid="` +
                              data[i].messUserId+
                              `"></i>
                          `)))
              }
            }
          );
  
          $(document).on('click','.deleteMessUser', function(e) {
            e.preventDefault();
             deleteMessUser($($(this)[0]).data("aid"));
             
           });
  
    
      }
  
      function deleteMessUser(messUserId) {

        swal({
          title: "Are you sure?",
          text: "you want to delete this hostel",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            $.ajax({
              url: `http://localhost:8080/mess/deleteStudentMessUserData?messUserId=${messUserId}&userId=${userId}&roleType=${roleType}`,
              type: "POST",
              success: function (data) {
                if(data.status){
                  getMessUsers();
                  swal("Mess User Deleted Succesfully!!")
                 .then((value) => {
                    window.location.reload();
                  });   
                 
                }else{
                  swal("You can't delete");
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
  