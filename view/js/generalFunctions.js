var user_namePattern=/^[_A-Za-z0-9-\\+]{4,}$/; //permite numeros y letras
var passwordPattern=/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; //min 1 mayus, 1 min, 1 numero o caract especiales, min 8 caracteres
var datePattern=/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/; //format yy/mm/dd
var emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/; 
var namePattern=/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/; //permite nombre y apellidos
var phonePattern=/^[0-9]{9}$/; //min 9 digitos
var ulrPattern = /^(ftp|http|https):\/\/[^ "]+$/;
var pricePattern=/^[0-9]{1,3}([.][0-9]{1,2})?$/;

// index.php?page=courses&view=courses
$(document).ready(function () {
    $("#resetFiltros").click(function(event) {        
        irCourses();
    });

    
});//end document ready

function c(d){
    console.log(d);
}

function irCourses(){
    
    $.post("../../courses/resFiltros",{"resFiltros":true},                    
     function (response) {
        console.log(response);
        // window.location.href="index.php?page=courses&view=courses";                          
     }).fail(function() {
        alert( "error f generales l-25" );
    });
}

function enviarInfoToContro(ulr, json) {
    console.log(json);
    $.post( ""+ulr+"", json,
        // {"idCourse2": id},
        function( response ) {
            console.log(response);
            // window.location.href=""+response+"";
    })
    .fail(function(response) {
        c("fallo enviarInfoToContro fgenerales l42");
    });
}


function courseDetalles(){
    $(".courseDetalles").click(function(event) {
            var id=this.getAttribute("id");
            console.log(id);
            enviarInfoToContro("module/homepage/controller/controller_homepage.php?idCourse=true&idCourse2=",  id);

        });
}


function crearList(limite1, limite2, json){
    
    // console.log(json);
    var div_listCou=document.getElementById("div_listCou");
    var ul=document.createElement("ul");
    ul.setAttribute("class", "course_nav");
  

    if (json.length<limite2) {
        for (var i = limite1 ; i <json.length; i++) {
            // console.log(json[i]);
            var elemento=creaCursos(json[i]);
            ul.appendChild(elemento);
        }
    }else{
        for (var i = limite1 ; i <limite2; i++) {
            // console.log(json[i]);
            var elemento=creaCursos(json[i]);
            ul.appendChild(elemento);
        }
    }   

    div_listCou.appendChild(ul);
}


function creaCursos(json){
    // console.log(json);
    


    var div_princ=document.createElement("div");
    div_princ.setAttribute("class", "col-md-4 margin_img_home");
    var div1=document.createElement("div");
    div1.setAttribute("class", "single_course");

    var div1_1=document.createElement("div");
    div1_1.setAttribute("class", "singCourse_imgarea");

    var img=document.createElement("img");
    img.setAttribute("src", ""+json.avatar+"");/////////////////////////////////////////////////
    img.setAttribute("class", "mediana");
    var div1_1_1=document.createElement("div");
    div1_1_1.setAttribute("class", "mask");
    var a=document.createElement("a");
    a.setAttribute("class", "course_more courseDetalles");
    a.setAttribute("id", ""+json.id+"");
    a.setAttribute("href", "#");
    a.innerHTML="View Course";
    


    var div1_2=document.createElement("div");
    div1_2.setAttribute("class", "singCourse_content");
    var h3=document.createElement("h3");
    h3.setAttribute("class", "singCourse_title");
    var a2=document.createElement("a");
    a2.setAttribute("id", ""+json.id+"");////////////////////////////////////////////////
    a2.setAttribute("class", "courseDetalles");
    a2.setAttribute("href", "#");
    a2.innerHTML=(json.title).substring(0,23)+" ...";
    var p=document.createElement("p");
    p.setAttribute("class", "singCourse_price");
    var span=document.createElement("span");
    span.innerHTML=json.price+" €";
    var p2=document.createElement("p");
    p2.innerHTML=(json.courseDescr).substring(0,150)+" ...";


    var div1_3=document.createElement("div");
    div1_3.setAttribute("class", "singCourse_author");
    var img2=document.createElement("img");
    img2.setAttribute("src", "");/////////////////////////////////////////////
    var p3=document.createElement("p");





    // div_div_princstCou.appendChild(ul);
    // ul.appendChild(div_princ);
    div_princ.appendChild(div1);
    div1.appendChild(div1_1);
    div1.appendChild(div1_2);
    div1.appendChild(div1_3);

    div1_1.appendChild(img);
    div1_1.appendChild(div1_1_1);
    div1_1_1.appendChild(a);

    div1_2.appendChild(h3);
    h3.appendChild(a2);
    div1_2.appendChild(p);
    p.appendChild(span);
    div1_2.appendChild(p2);

    div1_3.appendChild(img2);
    div1_3.appendChild(p3);

    return div_princ;
}

function controlForm(id){
    $("#"+id+"").focus();
    $("#"+id+"").attr("style", "background:#FFC9C9; border:red 2px solid");    
}



function load_countries_v1() {
    $.post( "module/profile/controller/controller_profile.php?load_country=true",
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
    $.postJSON( cad, function(data) {
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
    $.post( "module/profile/controller/controller_profile.php?load_provinces=true",
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


function load_cities_v2(prov) {
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


function load_category(ulr, id_etiqueta) { //provinciasypoblaciones.xml - xpath
    $.post( ""+ulr+"",
        function( response ) {            
            $("#"+id_etiqueta+"").empty();
            $("#"+id_etiqueta+"").append('<option value="" selected="selected">Select '+id_etiqueta+'</option>');
            // console.log(response);
            if(response == 'error'){
                // console.log("dfgljdfkjgh");
                load_category_B(ulr, id_etiqueta);
            }else{
                var json = JSON.parse(response);
                // console.log(json);
                // console.log(json.length);
                var type="";
                for (var i = 0; i < json.length; i++) {
                    if (json[i].type!=type) {
                        type=json[i].type;
                        $("#"+id_etiqueta+"").append("<option value='" + json[i].type + "'>" +json[i].type  + "</option>");
                    }
                }
            }
    })
    .fail(function(response) {
        load_category_B(ulr, id_etiqueta);
    });
 }

function load_category_B(ulr, id_etiqueta) {
    $.getJSON( ulr, function(data) {
      $("#"+id_etiqueta+"").empty();
      $("#"+id_etiqueta+"").append('<option value="" selected="selected">Select prueba</option>');
      // console.log(data);
      var type="";
      $.each(data, function (i, valor) {
        if (valor.type!=type) {
            type=valor.type;
            $("#"+id_etiqueta+"").append("<option value='" + valor.type + "'>" +valor.type  + "</option>");
        }
        
      });
    })
    .fail(function() {
        alert( "error categoryB" );
    });
}

function load_subCategory(ulr, valueSelectAnterior, id_etiqueta) {
    // console.log(ulr);
     $.post( ""+ulr+"",
        function( response ) {            
            // console.log(response);
            $("#"+id_etiqueta+"").empty();
            $("#"+id_etiqueta+"").append('<option value="" selected="selected">Select '+id_etiqueta+'</option>');
            // console.log(response);
            if(response == 'error'){
                // console.log("dfgljdfkjgh");
                // load_category_B(ulr, id_etiqueta);
            }else{
                var json = JSON.parse(response);
                // console.log(json);
                // console.log(json.length);
                for (var i = 0; i < json.length; i++) {
                    if (json[i].type==""+valueSelectAnterior+"") {
                        $("#"+id_etiqueta+"").append("<option value='" + json[i].course + "'>" +json[i].course  + "</option>");
                    }
                }
            }
    })
    .fail(function(response) {
        alert(response);
    });

}





// function load_subCategory(cad, v, id_select) {
//       console.log(id_select);
//     $.postJSON( cad, function(data) {
//       $("#prueba2").empty();
//       $("#prueba2").append('<option value="" selected="selected">Select prueba2</option>');
//       console.log(data);
//       console.log(v);

//       $.each(data, function (i, valor) {
//         console.log(valor[""+v+""]);
//         if ((valor[""+v+""])!= undefined) {
//         $("#"+id_select+"").append("<option value='" + valor[""+v+""]+  "'>" + valor[""+v+""]+  "</option>");
//         }
//       });
//     })
//     .fail(function() {
//         alert( "error zcxxzc" );
//     });
// }