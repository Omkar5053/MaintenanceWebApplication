$(document).ready(function () {
    let userId = localStorage.getItem("userId");
    let roleType = localStorage.getItem("roleType");
    $("#popup-message").hide();
    $("#login").on("click", function (e) {
      let loginId = $("#username").val();
      let password = $("#password-field").val();
     if(loginId === ""){
      $(".username-valid").html("Please Enter Username").css("color", "red");
        setTimeout(function(){
          $(document).find(".valid").remove();
        },3000);
     }
     else if(password === "")
      {
        $(".password-valid").html("Please Enter Password").css("color", "red");
        setTimeout(function(){
          $(document).find(".password-valid").remove();
        },3000);
      }
      else{
        $.ajax({
          url: `http://localhost:8080/auth/login?loginId=${loginId}&password=${password}`,
          headers: { "Content-Type": "application/json" },
          type: "POST",
          success: function (data) {
            localStorage.setItem("userId", data.sessionId);
            localStorage.setItem("roleType", data.roleName);
            localStorage.setItem("username", data.username);
            $("#username").val("");
            $("#password").val("");
            $(location).attr("href", "menu.html");
            $(".content").hide();
          },
          error: function () {
            $("#popup-message").show();
          },
        });
      }
      
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
            <span class="atbd-pop-message__text"><p>Please enter valid credentials</p></span>
        </div>
      `;
    }else{
      message = `
        <div class="atbd-pop-message message-${type} message-${messageCount}">
            <span class="atbd-pop-message__icon">
                <i class="la la-loader"></i>
            </span>
            <span class="atbd-pop-message__text"><p>Please enter valid credentials</p></span>
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
  