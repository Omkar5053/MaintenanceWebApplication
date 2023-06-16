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
  function getHostels() {
    $.ajax({
      url: `http://localhost:8080/hostel/getAllHostels?userId=${userId}`,
      type: "POST",
      beforeSend: function () {},
      success: function (data) {
        if(data.status == false)
        {
          $(location).attr("href", "login.html");
        } 
        else{
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
        }
        
      },
      error: function () {
        $(location).attr("href", "login.html");
      },
    });

    $(document).on("click", ".deleteHostel", function (e) {
      deleteHostel($($(this)[0]).data("aid"));
      e.preventDefault();
    });

    $(document).on("click", ".editHostel", function (e) {
      e.preventDefault();
      // let id = $(this).data("aid");
      // let name = $(this).data("name");
      // $("#editHostelName").val(name);
      // $("#h_id").val(id);
      $("#edit-modal-basic").modal("show");
      getOneHostel($($(this)[0]).data("aid"));
      
    });
  }

  function getOneHostel(id) {
    $.ajax({
      url: `http://localhost:8080/hostel/getBy?hostel_id=${id}`,
      method: "POST",
      success: function (data) {
        console.log(data)
        $("#editHostelName").val(data.hostelName);
        $("#editNoOfFloors").val(data.noOfFloors);
        $("#editNoOfRoomPerFloor").val(data.noOfRoomPerFloor);
        $("#editNoOfStudentPerRoom").val(data.noOfStudentPerRoom);
        $("#h_id").val(data.hostel_id);
      },
    });
  }

  $("#editHostel").on("click", function (e) {
    let hostelName = $("#editHostelName").val();
    let noOfFloors = $("#editNoOfFloors").val();
    let noOfRoomPerFloor = $("#editNoOfRoomPerFloor").val();
    let noOfStudentPerRoom = $("#editNoOfStudentPerRoom").val();
    let hostel_id = $("#h_id").val();
    $.ajax({
      url: `http://localhost:8080/hostel/addOrUpdateHostel?hostel_id=${hostel_id}&hostelName=${hostelName}&noOfFloors=${noOfFloors}&noOfRoomPerFloor=${noOfRoomPerFloor}&noOfStudentPerRoom=${noOfStudentPerRoom}&userId=${userId}`,
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
    if ($("#addHostelName").val() == "") {
       alert("Please enter the hostel name")
    } else {
      let userId = localStorage.getItem("userId");
      let hostelName = $("#addHostelName").val();
      let noOfFloors = $("#addNoOfFloors").val();
      let noOfRoomPerFloor = $("#addNoOfRoomPerFloor").val();
      let noOfStudentPerRoom = $("#addNoOfStudentPerRoom").val();
      let hostelId = 0
      $.ajax({
        url: `http://localhost:8080/hostel/addOrUpdateHostel?hostel_id=${hostelId}&hostelName=${hostelName}&noOfFloors=${noOfFloors}&noOfRoomPerFloor=${noOfRoomPerFloor}&noOfStudentPerRoom=${noOfStudentPerRoom}&userId=${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
          $("#popup-message").hide();
          console.log(data);
          $("#addHostelName").val("");
          $("#addNoOfFloors").val("");
          $("#addNoOfRoomPerFloor").val("");
          $("#addNoOfStudentPerRoom").val("");
          getHostels();
          window.location.reload();
        },
        error: function (error) {
          $("#popup-message").show();
        },
      });
    }
  });

  
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










  const msgButtons = document.querySelectorAll('.btn-message');
  let messageCount = 0;
  function createMessage(type,icon,loading){
    let message = ``;
    const messageShowcase = $('.message-wrapper');
    if(!loading){
      message = `
        <div class="atbd-pop-message message-${type} message-${messageCount}">
            <span class="atbd-pop-message__icon">
                <i class="la la-${icon}"></i>
            </span>
            <span class="atbd-pop-message__text"><p>Hostel has already registered</p></span>
        </div>
      `;
    }else{
      message = `
        <div class="atbd-pop-message message-${type} message-${messageCount}">
            <span class="atbd-pop-message__icon">
                <i class="la la-loader"></i>
            </span>
            <span class="atbd-pop-message__text"><p>Hostel has already registered</p></span>
        </div>
    `;
    }
    
    messageShowcase.append(message);
    messageCount++;
  }
  function showMessage(e){
    e.preventDefault();
    let duration = (optionValue, defaultValue) =>
      typeof optionValue === "undefined" ? defaultValue : optionValue;


    
    let messageType = this.dataset.messagetype;
    let messageIcon = this.dataset.messageicon;
    let messageLoading = this.dataset.messageLoading;
    createMessage(messageType,messageIcon,messageLoading);
    feather.replace();
    let thismessage = messageCount - 1;

    setTimeout(function(){
      $(document).find(".message-"+thismessage).remove();
    },duration(this.dataset.duration,3000));

  }

  if(msgButtons){
    msgButtons.forEach(messageButton => messageButton.addEventListener('click',showMessage));
  }
});
