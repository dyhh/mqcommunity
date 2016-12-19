$(document).ready(function(){

  $("#position").click(function(){
    var
    $position = $("#position"),
    positionVal = $.trim($position.val());
    if(positionVal.length == 0){
      $("#positioninfo .notice").text("请输入你的职位");
    }
    else{
      $("#positioninfo .notice").empty();
    }
  })

  $("#qq").click(function(){
    var
    $qq = $("#qq"),
    qqVal = $.trim($qq.val());
    if(qqVal.length == 0){
      $("#qqinfo .notice").text("请输入你的QQ号");
    }
    else{
      $("#qqinfo .notice").empty();
    }
  })

  $("#phone").click(function(){
    var
    $phone = $("#phone"),
    phoneVal = $.trim($phone.val());
    if(phoneVal.length == 0){
      $("#phoneinfo .notice").text("请输入至少11位手机号");
    }
    else{
      $("#phoneinfo .notice").empty();
    }
  })



  $("#position,#phone,#qq").change(function(){
    $("#positioninfo .notice").empty();
    $("#phoneinfo .notice").empty();
    $("#qqinfo .notice").empty();
  })

  $( "#editpersonalform" ).validate( {
    rules: {
      phone: {
        minlength: 11
      },
      qq:{
        minlength: 5,
        maxlength: 12
      }
    },
    messages: {
      phone: {
        minlength: "手机号至少要11位"
      },
      qq: {
        minlength: "qq号至少5位",
        maxlength: "qq号不能超过12位"
      }
    },
    errorElement: "span",
    errorPlacement: function ( error, element ) {
      // Add the `help-block` class to the error element
      error.addClass( "help-block" );

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents( ".col-sm-5" ).addClass( "has-feedback" );

      if ( element.prop( "type" ) === "checkbox" ) {
        error.appendTo( element.parent( "label" ).parent("div").parent("div").next("div") );
      } else {
        //error.insertAfter( element );
        error.appendTo(element.parent("div").next("div"));
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
      $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
      $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
    },
    unhighlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
      $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
    }
  });

})
