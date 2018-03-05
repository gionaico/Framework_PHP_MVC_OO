

var user_namePattern=/^[_A-Za-z0-9-\\+]{4,}$/; //permite numeros y letras
var passwordPattern=/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; //min 1 mayus, 1 min, 1 numero o caract especiales, min 8 caracteres
var datePattern=/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/; //format yy/mm/dd
var emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/; 
var namePattern=/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/; //permite nombre y apellidos
var phonePattern=/^[0-9]{9}$/; //min 9 digitos

Dropzone.autoDiscover = false;
$(document).ready(function () {

	$("#birth_date").datepicker({
        dateFormat: "yy-mm-dd",
        defaultDate: '2000-01-01',        
        changeMonth: true,
        changeYear: true,
        yearRange: '-110:-18'
    });

    $(".inputKeyup").keyup(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", "");
        $("#sp_"+id+"").html("<span></span>");
    });

    $("#submit1").click(function(){
        validaJS();
    });

    $("#formatPass").click(function(){
        alert("Password format:\n\n- Use upper case and lower case\n- Min 8 caracters\n- Use special caracters");    
    });
	    //Dropzone function //////////////////////////////////
    $('#dropzone').dropzone({
    	url: "module/profile/controller",
        addRemoveLinks: true,
        maxFileSize: 2000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*'
        // url: "module/products/controller/controller_products.php?upload=true",
        // addRemoveLinks: true,
        // maxFileSize: 2000,
        // dictResponseError: "Ha ocurrido un error en el server",
        // acceptedFiles: 'image/*',
        // init: function () {
        //     this.on("success", function (file, response) {
        //         alert(response);
        //         $("#progress").show();
        //         $("#bar").width('100%');
        //         $("#percent").html('100%');
        //         $('.msg').text('').removeClass('msg_error');
        //         $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
        //     });
        // },
        // complete: function (file) {
        //     if(file.status == "success"){
        //     alert("El archivo se ha subido correctamente: " + file.name);
        //     }
        // },
        // error: function (file) {
        //     alert("Error subiendo el archivo " + file.name);
        // },
        // removedfile: function (file, serverFileName) {
        //     var name = file.name;

        //     $.ajax({
        //         type: "POST",
        //         url: "module/products/controller/controller_products.php?delete=true",
        //         data: "filename=" + name,
        //         success: function (data) {
        //             $("#progress").hide();
        //             $('.msg').text('').removeClass('msg_ok');
        //             $('.msg').text('').removeClass('msg_error');
        //             $("#e_avatar").html("");

        //             //var json = JSON.parse(data);
        //             alert(data);
        //             if (data.res) {
        //                 var element;
        //                 if ((element = file.previewElement) != null) {
        //                     element.parentNode.removeChild(file.previewElement);
        //                     alert("Imagen eliminada: " + name);
        //                 } else {
        //                     false;
        //                 }
        //             } else { //json.res == false, elimino la imagen también
        //                 var element;
        //                 if ((element = file.previewElement) != null) {
        //                     element.parentNode.removeChild(file.previewElement);
        //                 } else {
        //                     false;
        //                 }
        //             }
        //         }
        //     });
        // }
       });//end_dropzone

    load_countries_v1();
    
    $("#province").empty();
    $("#province").append('<option value="" selected="selected">Select province</option>');
    $("#province").prop('disabled', true);
    $("#city").empty();
    $("#city").append('<option value="" selected="selected">Select city</option>');
    $("#city").prop('disabled', true);

    $("#country").change(function() {
        var country = $(this).val();
        var province = $("#province");
        var city = $("#city");
        console.log(country);
        if(country !== 'ES'){
             province.prop('disabled', true);
             city.prop('disabled', true);
             $("#province").empty();
             $("#city").empty();
        }else{
             province.prop('disabled', false);
             city.prop('disabled', false);
             load_provinces_v1();
        }//fi else
    });

    $("#province").change(function() {
        var prov = $(this).val();
        console.log(prov);
        if(prov > 0){
            load_cities_v1(prov);
        }else{
            $("#city").prop('disabled', false);
        }
    });

});//end_DOCUMENTE.ready


function validaJS(){
    var un = document.getElementById("un").value;
    var name = document.getElementById("name").value;
    var birth_date = document.getElementById("birth_date").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var city = document.getElementById("city").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    var genere = document.getElementsByClassName('genere');
        for (var i = 0; i < genere.length; i++) {
            if (genere[i].checked) {
                v_genere = genere[i].value;
            }
        }
    var interests = [];
    var inputElements = document.getElementsByClassName('gio_checkbox');
    var j = 0;    
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].checked) {
                interests[j] = inputElements[i].value;
                j++;
            }
        }


    if (un == null || un.length == 0|| !user_namePattern.test(un)) {
        $("#un").focus();
        $("#un").attr("style", "background:#FFC9C9; border:red 2px solid");
        return false;
    }
    if (name == null || name.length == 0|| !namePattern.test(name)) {
        $("#name").focus();
        $("#name").attr("style", "background:#FFC9C9; border:red 2px solid");
        return false;
    }
    if (birth_date == null || birth_date.length == 0|| !datePattern.test(birth_date)) {
        $("#birth_date").focus();
        $("#birth_date").attr("style", "background:#FFC9C9; border:red 2px solid");
        return false;
    }
    if (phone == null || phone.length == 0|| !phonePattern.test(phone)) {
        $("#phone").focus();
        $("#phone").attr("style", "background:#FFC9C9; border:red 2px solid");
        return false;
    }
    if (email == null || email.length == 0|| !emailPattern.test(email)) {
        $("#email").focus();
        $("#email").attr("style", "background:#FFC9C9; border:red 2px solid");
        return false;
    }
    if (password==rePassword) {        
        if (password == null || password.length == 0|| !passwordPattern.test(password)) {
            $("#password").focus();
            $("#password").attr("style", "background:#FFC9C9; border:red 2px solid");
            $("#rePassword").attr("style", "background:#FFC9C9; border:red 2px solid");
            $("#sp_password").html("<span style='color:#BA1C2E;'>Incorrect format</span>");
            $("#sp_rePassword").html("<span style='color:#BA1C2E;'>Incorrect format</span>");

            return false;
        }
    }else{
        $("#password").attr("style", "background:#FFC9C9; border:red 2px solid");
        $("#rePassword").attr("style", "background:#FFC9C9; border:red 2px solid");
        $("#sp_password").html("<span style='color:#BA1C2E;'>Passwords do not match</span>");
        $("#sp_rePassword").html("<span style='color:#BA1C2E;'>Passwords do not match</span>");
        return false;
    }

    var data = {"un": un,"name": name, "birth_date": birth_date,"country":country, "province": province, "city": city,"phone": phone, "email": email,"password": password, 
                    "genere": v_genere,  "interests": interests};
    console.log(data);
    var user_JSON = JSON.stringify(data);
    alert(data);

    $.post('module/profile/controller/controller_profile.php',
        {"user_JSON": user_JSON},
     function(response){
            console.log(response);

             // var json_cont2 = JSON.parse(response);
             // console.log(json_cont2);
               
     }).fail(function() {
            alert( "recepcion de datos fallida en boton detalles producto" );
             });
   

}//end validaJS

function load_countries_v1() {
    $.get( "module/profile/controller/controller_profile.php?load_country=true",
        function( response ) {
        console.log(JSON.parse(response));
        
            if(response === 'error'){
                load_countries_v2("resources/ListOfCountryNamesByName.json");
            }else{
                load_countries_v2("module/profile/controller/controller_profile.php?load_country=true"); //oorsprong.org
            }
    })
    .fail(function(response) {
        load_countries_v2("resources/ListOfCountryNamesByName.json");
    });
}

function load_countries_v2(cad) {
    $.getJSON( cad, function(data) {
      $("#country").empty();
      $("#country").append('<option value="" selected="selected">Select country</option>');

      $.each(data, function (i, valor) {
        $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
      });
    })
    .fail(function() {
        alert( "error load_countries_v2" );
    });
}


function load_provinces_v1() { //provinciasypoblaciones.xml - xpath
    $.get( "module/profile/controller/controller_profile.php?load_provinces=true",
        function( response ) {
          $("#province").empty();
          $("#province").append('<option value="" selected="selected">Select province</option>');

            console.log(JSON.parse(response));
            var json = JSON.parse(response);
            var provinces=json.provinces;
            //alert(provinces);
            //console.log(provinces);

            //alert(provinces[0].id);
            //alert(provinces[0].nombre);

            if(provinces === 'error'){
                load_provinces_v2();
            }else{
                for (var i = 0; i < provinces.length; i++) {
                    $("#province").append("<option value='" + provinces[i].id + "'>" + provinces[i].nombre + "</option>");
                }
            }
    })
    .fail(function(response) {
        load_provinces_v2();
    });
}


function load_provinces_v2() {
    $.get("resources/provinciasypoblaciones.xml", function (xml) {
        $("#province").empty();
        $("#province").append('<option value="" selected="selected">Select province</option>');

        $(xml).find("provincia").each(function () {
            var id = $(this).attr('id');
            var name = $(this).find('nombre').text();
            $("#province").append("<option value='" + id + "'>" + name + "</option>");
        });
    })
    .fail(function() {
        alert( "error load_provinces" );
    });
}


function load_cities_v2(prov) {
    $.get("resources/provinciasypoblaciones.xml", function (xml) {
        $("#city").empty();
        $("#city").append('<option value="" selected="selected">Select city</option>');

        $(xml).find('provincia[id=' + prov + ']').each(function(){
            $(this).find('localidad').each(function(){
                 $("#city").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
            });
        });
    })
    .fail(function() {
        alert( "error load_cities" );
    });
}

function load_cities_v1(prov) { //provinciasypoblaciones.xml - xpath
    var datos = { idPoblac : prov  };
    $.post("module/profile/controller/controller_profile.php", datos, function(response) {
        //alert(response);
        var json = JSON.parse(response);
        var cities=json.cities;
        //alert(poblaciones);
        //console.log(poblaciones);
        //alert(poblaciones[0].poblacion);

        $("#city").empty();
        $("#city").append('<option value="" selected="selected">Select city</option>');

        if(cities === 'error'){
            load_cities_v2(prov);
        }else{
            for (var i = 0; i < cities.length; i++) {
                $("#city").append("<option value='" + cities[i].poblacion + "'>" + cities[i].poblacion + "</option>");
            }
        }
    })
    .fail(function() {
        load_cities_v2(prov);
    });
}