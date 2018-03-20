var user_namePattern=/^[_A-Za-z0-9-\\+]{4,}$/; //permite numeros y letras
var passwordPattern=/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; //min 1 mayus, 1 min, 1 numero o caract especiales, min 8 caracteres
var datePattern=/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/; //format yy/mm/dd
var emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/; 
var namePattern=/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/; //permite nombre y apellidos
var phonePattern=/^[0-9]{9}$/; //min 9 digitos
var ulrPattern = /^(ftp|http|https):\/\/[^ "]+$/;
var pricePattern=/^[0-9]{1,3}([.][0-9]{1,2})?$/;

function controlForm(id){
    $("#"+id+"").focus();
    $("#"+id+"").attr("style", "background:#FFC9C9; border:red 2px solid");    
}



function load_countries_v1() {
    $.get( "module/profile/controller/controller_profile.php?load_country=true",
        function( response ) {
        //     console.log(response);
        // console.log(JSON.parse(response));
        
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



function load_categorya(cad) {
    $.getJSON( cad, function(data) {
      $("#prueba").empty();
      $("#prueba").append('<option value="" selected="selected">Select prueba</option>');
      console.log(data);
      $.each(data, function (i, valor) {
        $("#prueba").append("<option value='" + valor.inicia + "'>" + valor.course + "</option>");
      });
    })
    .fail(function() {
        alert( "error category" );
    });
}
function load_subCategory(cad, v, id_select) {
      console.log(id_select);
    $.getJSON( cad, function(data) {
      $("#prueba2").empty();
      $("#prueba2").append('<option value="" selected="selected">Select prueba2</option>');
      console.log(data);
      console.log(v);

      $.each(data, function (i, valor) {
        console.log(valor[""+v+""]);
        if ((valor[""+v+""])!= undefined) {
        $("#"+id_select+"").append("<option value='" + valor[""+v+""]+  "'>" + valor[""+v+""]+  "</option>");
        }
      });
    })
    .fail(function() {
        alert( "error zcxxzc" );
    });
}