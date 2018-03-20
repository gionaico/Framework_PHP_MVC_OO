Dropzone.autoDiscover = false;
$(document).ready(function () {
    
    load_data();

	$(".inputKeyup").keyup(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", ""); 
        
        // $("#sp_"+id+"").html("<span></span>");
    });

    $("#submit1").click(function(){
        $("div").remove(".div_errPhp");
        validaJS();
    });

    $('.selectCF').change(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", "");
    });

    $(".checkboxCategory").click(function(){
         $("#div_subjets").attr("style","" );
    });

    $(".level").click(function(){
         $("#div_level").attr("style","" );
    });
    // var cad="resources/ListOfCategoryCourse.json"
    load_categorya("resources/ListOfCategoryCourse.json");
    

    $("#prueba").change(function() {
        var prueba = $(this).val();
        // console.log(prueba);
        load_subCategory("resources/ListOfSubcategoryCourse.json", prueba, "prueba2");
        // console.log(prueba2);
        
    });


    $('#dropzone').dropzone({
        url: "module/courses/controller/controller_courses.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 2000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*',
        init: function () {
            this.on("success", function (file, response) {
console.log(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok');//.animate({'right': '300px'}, 300);
            });
        },
        complete: function (file) {
            if(file.status == "success"){
console.log("El archivo '"+ file.name+"' pasa js ");
            }
        },
        error: function (file) {
alert("Error en js subiendo el archivo " + file.name);
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;

            $.ajax({
                type: "POST",
                url: "module/courses/controller/controller_courses.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    console.log(json.res);
                    var element= file.previewElement;
                    if (json.res) {
                        console.log(element);
                        if (element  != null) {
                            console.log("fgfdgentra");
                            element.parentNode.removeChild(file.previewElement);
                            alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        
                        if (element != null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }
                }
            });
        }
    });//end_dropzone
});

function validaJS(){
    
    var title = document.getElementById("title").value;
    var courseLenguge = document.getElementById("courseLenguge").value;
    var ulr = document.getElementById("ulr").value;
    var courseDuration = document.getElementById("courseDuration").value;
    var v_level="";
    var level = document.getElementsByClassName('level');
        for (var i = 0; i < level.length; i++) {
            if (level[i].checked) {
                v_level = level[i].value;
            }
        }
    var price = document.getElementById("price").value;
    var courseDescr = document.getElementById("courseDescr").value;
    var category = [];
    var checkboxCategory = document.getElementsByClassName('checkboxCategory');
    var j = 0;    
        for (var i = 0; i < checkboxCategory.length; i++) {
            if (checkboxCategory[i].checked) {
                category[j] = checkboxCategory[i].value;
                j++;
            }
        }
    var personalDescr = document.getElementById("personalDescr").value;
    
           
                
    // if (title == null || title.length < 10) {
    //     controlForm("title");
    //     $("#title").after("<div class='div_errPhp'><span  class='error' >Min 10 caracters.</span><br></div>");
    //     return false;
    // }
    // if (courseLenguge == null || courseLenguge.length == 0) {
    //     controlForm("courseLenguge");
    //     return false;
    // }
    // if (ulr == null || ulr.length == 0|| !ulrPattern.test(ulr)) {
    //     controlForm("ulr");
    //     $("#ulr").after("<div class='div_errPhp'><span  class='error' >Invalid Format</span><br></div>");
    //     return false;
    // }
    // if (courseDuration == null || courseDuration.length == 0) {
    //     controlForm("courseDuration");
    //     return false;
    // }
    // if (v_level == null || v_level.length == 0) {
    //     $("#div_level").attr("style","border: solid 2px red; background-color: #FFC9C9;" );
    //     return false;
    // }
    // if (price == null || price.length == 0|| !pricePattern.test(price)) {
    //     controlForm("price");
    //     return false;
    // }   
    // if (courseDescr == null || courseDescr.length < 150) {
    //     controlForm("courseDescr");
    //     $("#courseDescr").focus().after("<div class='div_errPhp'><span  class='error' >Minimus 150 caracters</span><br></div>");
    //     return false;
    // }
    // if (category == null || category.length == 0) {
    //     $("#div_subjets").attr("style","border: solid 2px red; background-color: #FFC9C9;" );
    //     return false;
    // }
    
    // if (personalDescr == null || personalDescr.length < 150) {
    //     controlForm("personalDescr");
    //    	$("#personalDescr").focus().after("<div class='div_errPhp'><span  class='error' >Minimus 150 caracters</span><br></div>");
    //     return false;
    // }
    var dataCourse = {"title": title,
    					 "courseLenguge": courseLenguge, 
    					"ulr": ulr,
    					"courseDuration":courseDuration, 
    					"level": v_level, 
    					"price": price,
    					"courseDescr": courseDescr, 
    					"category": category,
    					"personalDescr": personalDescr};
    //console.log(dataCourse);
    var course_JSON = JSON.stringify(dataCourse);
    // var course_JSON = "JSON.stringify(dataCourse)";
    //console.log(course_JSON);

	$.post('module/courses/controller/controller_courses.php',
	            {"course_JSON": course_JSON},
	function(response){
			console.log(response);
            if (response.success) {
                window.location.href=response.redirect;
            }
		   
	},"json").fail(function(xhr, textStatus, errorThrown){
     		// console.log("ddd");
            console.log(xhr.responseText);
            if (xhr.status === 0) {
                console.log('Not connect: Verify Network.');
            } else if (xhr.status == 404) {
                console.log('Requested page not found [404]');
            } else if (xhr.status == 500) {
                console.log('Internal Server Error [500].');
            } else if (textStatus === 'parsererror') {
                console.log('Requested JSON parse failed.');//200
            } else if (textStatus === 'timeout') {
                console.log('Time out error.');
            } else if (textStatus === 'abort') {
                console.log('Ajax request aborted.');
            } else {
                console.log('Uncaught Error: ' + xhr.responseText);
            }
            
            if (xhr.responseJSON == 'undefined' && xhr.responseJSON === null ){
                  xhr.responseJSON = JSON.parse(xhr.responseText);                
            }
            
            if (xhr.responseJSON.error.title){
                $("#title").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.title + "</span><br></div>");
                $("#sp_title").html("<span></span>");
            }           
            if (xhr.responseJSON.error.courseLenguge){
                $("#courseLenguge").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.courseLenguge + "</span><br></div>");
                $("#sp_courseLenguge").html("<span></span>");
            }
            if (xhr.responseJSON.error.ulr){
                $("#ulr").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.ulr + "</span><br></div>");
                $("#sp_ulr").html("<span></span>");
            }
            if (xhr.responseJSON.error.courseDuration){
                $("#courseDuration").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.courseDuration + "</span><br></div>");
                $("#sp_courseDuration").html("<span></span>");
            }
            if (xhr.responseJSON.error.level){
                $("#div_level").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.level + "</span><br></div>");
                $("#sp_level").html("<span></span>");
            }
            if (xhr.responseJSON.error.price){
                $("#price").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.price + "</span><br></div>");
                $("#sp_price").html("<span></span>");
            }
            if (xhr.responseJSON.error.courseDescr){
                $("#courseDescr").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.courseDescr + "</span><br></div>");
                $("#sp_courseDescr").html("<span></span>");
            }
            if (xhr.responseJSON.error.category){
                $("#div_subjets").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.category + "</span><br></div>");
                $("#sp_category").html("<span></span>");
            }
            if (xhr.responseJSON.error.personalDescr){
                $("#personalDescr").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.personalDescr + "</span><br></div>");
                $("#sp_personalDescr").html("<span></span>");
            }
             if (!xhr.responseJSON.success1) {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!  '+xhr.responseJSON.error_dubidaFoto).addClass('msg_error');//.animate({'right': '300px'}, 300);
                
            } 
    });
}//end validaJs


function load_data() {
     $.get("module/courses/controller/controller_courses.php?load_data=true",
          function(response){
            if(response.curso===""){
                console.log(1);
                $("#title").val('');
                $("#courseLenguge").val('');
                $("#ulr").val('');
                $("#courseDuration").val('');
                var level = document.getElementsByClassName('level');
                for (var i = 0; i < level.length; i++) {
                    if (level[i].checked) {
                        level[i].checked=false;
                    }
                }
                $("#price").val('');
                $('#courseDescr').val('');
                var category = [];
                var checkboxCategory = document.getElementsByClassName('checkboxCategory');
                var j = 0;    
                    for (var i = 0; i < checkboxCategory.length; i++) {
                        if (checkboxCategory[i].checked) {
                            checkboxCategory[i].checked=false;
                        }
                    }
                $('#personalDescr').val('');
                
            // $(this).fill_or_clean();
            }else{
                console.log(2);
              $("#title").val(response.curso.title);
              $("#courseLenguge").val(response.curso.courseLenguge);
              $("#ulr").val(response.curso.ulr);
              $("#level").val(response.curso.level);
              var level = document.getElementsByClassName('level');
                for (var i = 0; i < level.length; i++) {
                    if (level ==level[i].value) {
                        level[i].checked=true;
                    }
                }
              $('#courseDuration').val(response.curso.courseDuration);
              $('#province').val(response.curso.province);
              $('#price').val(response.curso.price);
              $("#courseDescr").val(response.curso.courseDescr);
              var category = response.curso.category;
              var inputElements = document.getElementsByClassName('checkboxCategory');
              for (var j = 0; j < category.length; j++) {
                  for (var k = 0; k < inputElements.length; k++) {
                    if (category[j] === inputElements[k]){
                        inputElements[k].checked = true;
                    }
                  }
              }
              $("#personalDescr").val(response.curso.personalDescr);
            }
          }, "json");
}