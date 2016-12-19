$(document).ready(function(){

  $("#password").click(function(){
    var
    $password = $("#password"),
    passwordVal = $.trim($password.val());
    if(passwordVal.length == 0){
      $("#passwordinfo .notice").text("请先输入原始密码");
    }else{
      $("#passwordinfo .notice").empty();
    }
  })

  $("#password1").click(function(){
    var
    $password1 = $("#password1"),
    password1Val = $.trim($password1.val());
    if(password1Val.length == 0){
      $("#password1info .notice").text("请输入6-16位数字、字母或常用符号，字母区分大小写");
    }else{
      $("#password1info .notice").empty();
    }
  })

  $("#password2").click(function(){
    var
    $password2 = $("#password2"),
    password2Val = $.trim($password2.val());
    if(password2Val.length == 0){
      $("#password2info .notice").text("请输入6-16位数字、字母或常用符号，字母区分大小写");
    }else{
      $("#password2info .notice").empty();
    }
  })

  $("#password,#password1,#password2").change(function(){
    $("#passwordinfo .notice").empty();
    $("#password1info .notice").empty();
    $("#password2info .notice").empty();
  })

  $( "#editpassform" ).validate( {
    rules: {
      password: {
        required: true,
        minlength: 6,
        maxlength: 16
      },
      password1: {
        required: true,
        minlength: 6,
        maxlength: 16
      },
      password2: {
        required: true,
        minlength: 6,
        maxlength: 16,
        equalTo: "#password1"
      }
    },
    messages: {
      password: {
        required: "请输入有效的密码",
        minlength: "密码至少要包含6位字符",
        maxlength: "密码不得超过16位字符"
      },
      password1: {
        required: "请输入一个有效的密码",
        minlength: "密码至少要包含6位字符",
        maxlength: "密码不得超过16位字符"
      },
      password2: {
        required: "请输入一个有效的密码",
        minlength: "密码至少要包含6位字符",
        maxlength: "密码不得超过16位字符",
        equalTo: "两次密码输入不一致"
      }
    },
    errorElement: "span",
    errorPlacement: function ( error, element ) {
      // Add the `help-block` class to the error element
      error.addClass( "help-block" );

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents( ".input-group" ).addClass( "has-feedback" );

      if ( element.prop( "type" ) === "checkbox" ) {
        error.appendTo( element.parent( "label" ).parent("div").parent("div").next("div") );
      } else {
        //error.insertAfter( element );
        error.appendTo(element.parent("div").parent("div").next("div"));
      }

      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if ( !element.next( "span" )[ 0 ] ) {
        $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
      }
    },
    success: function ( label, element ) {
      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if ( !$( element ).next( "span" )[ 0 ] ) {
        $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
      }
    },
    highlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".input-group" ).addClass( "has-error" ).removeClass( "has-success" );
      $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
    },
    unhighlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".input-group" ).addClass( "has-success" ).removeClass( "has-error" );
      $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
    }
  });

})
