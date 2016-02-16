$(document).ready(function(){
  $("form#loginForm").submit(function() { // loginForm is submitted
    var username = $('#username').attr('value'); // get username
    var password = $('#password').attr('value'); // get password

    if (username && password) { // values are not empty
      $.ajax({
        type: "GET",
        url: "dispatcher/ws-login.php", // URL of the PHP script
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the PHP script
        data: "username=" + username + "&password=" + password,
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          $('div#loginResult').text("responseText: " + XMLHttpRequest.responseText
            + ", textStatus: " + textStatus
            + ", errorThrown: " + errorThrown);
          $('div#loginResult').addClass("error");
        }, // error
        // script call was successful
        // data contains the JSON values returned by the PHP script
        success: function(data){
          if (data.error) { // script returned error
            $('div#loginResult').text("data.error: " + data.error);
            $('div#loginResult').addClass("error");
          } // if
          else { // login was successful
            $('form#loginForm').hide();
            $('div#loginResult').text("data.success: " + data.success
              + ", data.userid: " + data.userid);
            $('div#loginResult').addClass("success");
          } //else
        } // success
      }); // ajax
    } // if
    else {
      $('div#loginResult').text("enter username and password");
      $('div#loginResult').addClass("error");
    } // else
    $('div#loginResult').fadeIn();
    return false;
  });
});
