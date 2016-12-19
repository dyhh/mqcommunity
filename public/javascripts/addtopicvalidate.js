$(document).ready(function(){

  $("#title").click(function(){
    var
    $title = $("#title"),
    titleVal = $.trim($title.val());
    if(titleVal.length == 0){
      $("#titleinfo .notice").text("请输入一个5-30个字的题目");
    }
    else{
      $("#titleinfo .notice").empty();
    }
  })

  $("#brief").click(function(){
    var
    $brief = $("#brief"),
    briefVal = $.trim($brief.val());
    if(briefVal.length == 0){
      $("#briefinfo .notice").text("请输入一个200字以内的文章简介");
    }
    else{
      $("#briefinfo .notice").empty();
    }
  })




  $("#title,#brief").change(function(){
    $("#titleinfo .notice").empty();
    $("#briefinfo .notice").empty();
  })

  $( "#addtopicform" ).validate( {
    rules: {
      title: {
        required: true,
        minlength: 5,
        maxlength: 30
      },
      brief: {
        required: true,
        maxlength: 200
      }
    },
    messages: {
      title: {
        required: "请输入一个5-30个字的题目",
        minlength: "题目至少5个字",
        maxlength: "题目不得超过30个字"
      },
      brief:{
        required: "请输入一个200字以内的文章简介",
        maxlength: "文章简介不得超过200个字"
      }

    },
    errorElement: "span",
    errorPlacement: function ( error, element ) {
      // Add the `help-block` class to the error element
      error.addClass( "help-block" );

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents( ".form-group" ).addClass( "has-feedback" );

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
      $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
      $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
    },
    unhighlight: function ( element, errorClass, validClass ) {
      $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
      $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
    }
  });

})
