

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
    $("#formatPass").click(function(){
        alert("Password format:\n\n- Use upper case and lower case\n- Min 8 caracters\n- Use special caracters");    
    });

    load_countries_v1();
    
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
        controlForm("un");
        return false;
    }
    if (name == null || name.length == 0|| !namePattern.test(name)) {
        controlForm("name");
        return false;
    }
    if (birth_date == null || birth_date.length == 0|| !datePattern.test(birth_date)) {
        controlForm("birth_date");
        return false;
    }
    if (country=="") {
        controlForm("country");
        return false;
    }else if (country === 'ES') {        
        if (province===''){
            controlForm("province");
            return false;
        }
        if (city===''){
            controlForm("city");
            return false;
        }
    }

    if (phone == null || phone.length == 0|| !phonePattern.test(phone)) {
        controlForm("phone");
        return false;
    }
    if (email == null || email.length == 0|| !emailPattern.test(email)) {
        controlForm("email");
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

    if (interests.length==0) {
        $("#div_intereses").attr("style","border: solid 2px red; background-color: #FFC9C9;" );
        return false;
    }

    var data = {"un": un,"name": name, "birth_date": birth_date,"country":country, "province": province, "city": city,"phone": phone, "email": email,"password": password, 
                    "genere": v_genere,  "interests": interests};
    //console.log(data);
    var user_JSON = JSON.stringify(data);
    //alert(data);
    

    $.post('module/profile/controller/controller_profile.php',
        {"user_JSON": user_JSON},
     function(response){
        if (response.success) {
            console.log(response);
            alert(response.mensaje);
            window.location.href = response.redirect;             
        }
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
   

}//end validaJS





