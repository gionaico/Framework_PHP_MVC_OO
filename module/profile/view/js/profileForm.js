

$(document).ready(function () {

    $("#birth_date").datepicker({
        dateFormat: "yy-mm-dd",
        defaultDate: '2000-01-01',        
        changeMonth: true,
        changeYear: true,
        yearRange: '-110:-18'
    });
    $("#birth_date").focusout(function() {
        $("#birth_date").attr("style", "");
    });
    /////////////////////////////////////////////////////////////////////
    $(".inputKeyup").keyup(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", "");
        // $("#sp_"+id+"").html("<span></span>");
    });
    /////////////////////////////////////////////////////////////////////
    $("#submit1").click(function(){
        $("div").remove(".div_errPhp");
        
        validaJS();
    });
    /////////////////////////////////////////////////////////////////////
    $(".gio_checkbox").click(function(){
         $("#div_intereses").attr("style","" );
    });
    /////////////////////////////////////////////////////////////////////


    var userLocalStorage = {"user": localStorage.getItem("user")};

    $.ajax({
        type: "POST",
        url: "../../profile/upDateDatosPer",
        data: userLocalStorage,
        success: function(datos) {
            /*console.log(datos);*/
            var json=JSON.parse(datos);
            if (json.success) {
                pintaDatos(json.datos[0]);
                // console.log(json.datos[0]);
            }else{
                console.log("n");
            }
                                          
        }
    })
    .fail(function(xhr, jqXHR, textStatus, errorThrown) {
        console.log(jqXHR); 
        console.log(textStatus); 
        console.log(errorThrown);  
        console.log(xhr);            
    });



    localizacion();    

});//end_DOCUMENTE.ready

function pintaDatos(datos){
    $("#name").val(datos.name);
    $("#user_name").html(datos.user_name);
    $("#user_name").val(datos.user_name);
    $("#fotoperfil").attr("src", datos.avatar);

    if (datos.birth_date!="0000-00-00") {
        $("#birth_date").val(datos.birth_date);
    }

    var genere = document.getElementsByClassName('genere');
        for (var i = 0; i < genere.length; i++) {
            if (datos.genere ==genere[i].value) {
                genere[i].checked=true;
            }
        }

    if (datos.phone!="0") {
        $("#phone").val(datos.phone);
    }

    if (datos.interests!="") {
        var interes=  datos.interests;
        var arr_interes=interes.split(":"); 

        var inputElements = document.getElementsByClassName('gio_checkbox');    
        
        for (var j = 0; j < arr_interes.length; j++) {
            for (var k = 0; k < inputElements.length; k++) {
                if (arr_interes[j] == inputElements[k].value){
                    inputElements[k].checked = true;
                }
            }
        }
    }

   console.log(datos);
    $("#email").val(datos.email);

    load_countries_(datos.country);

}

function localizacion(){
    // load_countries_();
    
    $("#province").empty();
    $("#province").append('<option value="" selected="selected">Select province</option>');
    $("#province").prop('disabled', true);
    $("#city").empty();
    $("#city").append('<option value="" selected="selected">Select city</option>');
    $("#city").prop('disabled', true);

    $('.selUb').change(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", "");
    });

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
             load_provinces_1();
        }//fi else
    });

    $("#province").change(function() {
        var prov = $(this).val();
        // console.log(prov);
        if(prov > 0){
            load_cities_1(prov);
        }else{
            $("#city").prop('disabled', false);
        }
    });
}



function load_countries_(country) {
        $.post( "../../profile/load_country",
            function( response ) {
            
                if(response === 'error'){
                    load_countries_2("http://localhost/Proyectos/GiovannyProy4/resources/ListOfCountryNamesByName.json", country);
                }else{
                    /*console.log(JSON.parse(response));*/
                    $.each(JSON.parse(response), function (i, valor) {
                        if (country==valor.sISOCode) {
                            $("#country").append("<option selected='selected' value='" + valor.sISOCode + "'>" + valor.sName + "</option>");    
                        }else{
                            $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
                        }
                    });   
                    // load_countries_v2("module/profile/controller/controller_profile.php?load_country=true"); //oorsprong.org
                }
        })
        .fail(function(response) {
            load_countries_2("http://localhost/Proyectos/GiovannyProy4/resources/ListOfCountryNamesByName.json", country);
        });
    }



    function load_countries_2(cad, country) {
        $.getJSON( cad, function(data) {
            $("#country").empty();
            $("#country").append('<option value="" selected="selected">Select country</option>');

            $.each(JSON.parse(response), function (i, valor) {
                if (country==valor.sISOCode) {
                    $("#country").append("<option selected='selected' value='" + valor.sISOCode + "'>" + valor.sName + "</option>");    
                }else{
                    $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
                }   
            });
        })
        .fail(function() {
            alert( "error load_countries_v2" );
        });
    }



    function load_provinces_1() { //provinciasypoblaciones.xml - xpath
        $.post( "../../profile/load_provinces",
            function( response ) {
              $("#province").empty();
              $("#province").append('<option value="" selected="selected">Select province</option>');

                console.log(JSON.parse(response));
                var json = JSON.parse(response);
                var provinces=json.provinces;


                if(provinces === 'error'){
                    load_provinces_2();
                }else{
                    for (var i = 0; i < provinces.length; i++) {
                        $("#province").append("<option value='" + provinces[i].id + "'>" + provinces[i].nombre + "</option>");
                    }
                }
        })
        .fail(function(response) {
            load_provinces_2();
        });
     }   


    function load_provinces_2() {
        $.post("resources/provinciasypoblaciones.xml", function (xml) {
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


    function load_cities_2(prov) {
        $.post("resources/provinciasypoblaciones.xml", function (xml) {
            $("#city").empty();
            $("#city").append('<option value="" selected="selected">Select city</option>');

            $(xml).find('provincia[id=' + prov + ']').each(function(){
                $(this).find('localidad').each(function(){
                     $("#city").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
                });
            });
        })
        .fail(function() {
            alert( "error load_cities2" );
        });
    }


    function load_cities_1(prov) { //provinciasypoblaciones.xml - xpath
        var datos = { idPoblac : prov  };
        $.post( "../../profile/load_cities", datos, function(response) {
            console.log(response);
            var json = JSON.parse(response);
            var cities=json.cities;
            //alert(poblaciones);
            //console.log(poblaciones);
            //alert(poblaciones[0].poblacion);

            $("#city").empty();
            $("#city").append('<option value="" selected="selected">Select city</option>');

            if(cities === 'error'){
                load_cities_2(prov);
            }else{
                for (var i = 0; i < cities.length; i++) {
                    $("#city").append("<option value='" + cities[i].poblacion + "'>" + cities[i].poblacion + "</option>");
                }
            }
        })
        .fail(function() {
            load_cities_2(prov);
        });
    }




function validaJS(){
       
    var user_name = document.getElementById("user_name").value;
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
    var intereses = [];
    var inputElements = document.getElementsByClassName('gio_checkbox');
    var j = 0;    
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].checked) {
                intereses[j] = inputElements[i].value;
                j++;
            }
        }



        
    if (email == null || email.length == 0|| !emailPattern.test(email)) {
        controlForm("email");
        return false;
    }

    if (password!="" || rePassword!="") {    
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
    }

    var data = {"user_name":user_name, "name": name, "birth_date": birth_date,"country":country, "province": province, "city": city,"phone": phone, "email": email,"password": password, 
                    "genere": v_genere,  "intereses": intereses};
    
    var user_JSON = JSON.stringify(data);
    

    console.log(user_JSON);

    $.ajax({
        type: "POST",
        url: "../../profile/updateUser",
        data: {"user": user_JSON},
        success: function(datos) {
            console.log(datos);
            var json=JSON.parse(datos);
            if (json.success) {
                var toasts = new Toast('UPDATE', 'success', 'toast-top-full-width', json.mensaje, 18000);
                delayToasts(toasts,0);
                setTimeout(redireccionActual, 18000);
            } else {
                var toasts = new Toast('UPDATE', 'error', 'toast-top-full-width', json.mensaje, 18000);
                delayToasts(toasts,0);
            }

                                          
        }
    })
    .fail(function(xhr, jqXHR, textStatus, errorThrown) {
        console.log(jqXHR); 
        console.log(textStatus); 
        console.log(errorThrown);  
        console.log(xhr);  
        if (xhr.responseJSON == undefined || xhr.responseJSON === null ){
              xhr.responseJSON = JSON.parse(xhr.responseText);                
        }          
    });


    /*$.post('../../profile/updateUser',
        {"dataString": dataString},
     function(response){
        
            console.log(response);
            
             // var json_cont2 = JSON.parse(response);
             // console.log(json_cont2);
               
     },"json").fail(function(xhr, textStatus, errorThrown){
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
            
            if (xhr.responseJSON.error.un){
                $("#un").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.un + "</span><br></div>");
                $("#sp_un").html("<span></span>");
            }
            

            if (xhr.responseJSON.error.country){
                $("#country").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.country + "</span><br></div>");
                $("#sp_country").html("<span></span>");
            }

            if (xhr.responseJSON.error.province){
                $("#province").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.province + "</span><br></div>");
                $("#sp_province").html("<span></span>");
            }

            if (xhr.responseJSON.error.city){
                $("#city").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.city + "</span><br></div>");
                $("#sp_city").html("<span></span>");
            }

            

            if (xhr.responseJSON.error.phone){
                $("#phone").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.phone + "</span><br></div>");
                $("#sp_phone").html("<span></span>");
            }

            if (xhr.responseJSON.error.email){
                $("#email").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.email + "</span><br></div>");
                $("#sp_email").html("<span></span>");
            }

            if (xhr.responseJSON.error.birth_date){
                $("#birth_date").focus().after("<div class='div_errPhp'><span  class='error' >" + xhr.responseJSON.error.birth_date + "</span><br></div>");
                $("#sp_birth_date").html("<span></span>");
            }
             });
   
*/
}//end validaJS





