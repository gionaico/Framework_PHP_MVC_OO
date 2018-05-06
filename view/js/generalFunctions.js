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
        
        $("#87").click(function(event) {        
            window.location.href="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";
        });

        $("#search_prod").submit(function(event) {
            event.preventDefault(); //evita la redireccion         
            empezarBusqueda();
        });

        $("#Submit").click(function(event) {        
            empezarBusqueda();
        });

        $(".formatPass").click(function(){
            alert("Password format:\n\n- Use upper case and lower case\n- Min 8 caracters\n- Use special caracters");    
        });
        
    });//end document ready

    function redireccion(){
        window.location.href="http://localhost/Proyectos/GiovannyProy4";
    }

    function redireccionActual(){
        window.location.href=window.location;
    }

    function amigable(url) {
        var link="";
        url = url.replace("?", "");
        url = url.split("&");

        for (var i=0;i<url.length;i++) {
            var aux = url[i].split("=");
            link +=  "/"+aux[1];
        }
        return "http://localhost/Proyectos/GiovannyProy4" + link;
    }


    function limpiaForm(arr){
        for (var i = 0; i <arr.length; i++) {            
            $("#"+arr[i]+"")[0].reset();
        }
    }


    function autocomplete(json){
        $.post(amigable("?module=courses&function=autocomplete"),{"autocomplete":true},
            
         function (response) {
            // console.log(JSON.parse(response));
            var json=JSON.parse(response);
            
            var suggestions = new Array();
            for (var i = 0; i < json.length; i++) {
                suggestions.push(json[i].title);
            }

            $("#keyword").autocomplete({
                source: suggestions,
                minLength: 1,
                select: function (event, ui) {//al hacer click o enter sobre uno comcreto
                    // console.log(ui.item.label);
                    var keyword = ui.item.label;
                    // console.log(keyword);
                    fun_keyword(keyword);
                    
                }
            });  
            
         }).fail(function() {
            console.log( "error generalfunctions.js autocomplete" );
        });

    }


    function empezarBusqueda(){
        var ele_keyword=document.getElementById('keyword').value;
            // c(ele_keyword);
        fun_keyword(ele_keyword);
    }


    function fun_keyword(keywo){
        $.post("../../courses/keyword", {"keyword":true, "key":keywo},
            
         function (response) {
            console.log(response);
            var json=JSON.parse(response);
            console.log(json.filas);
            var l1=0;
            var l2=3;
            // crearList(l1, l2, cursosfil.datos);
            if (window.location=="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/") {
                paginar(json.pages, json.datos);
            }else if (window.location=="http://localhost/Proyectos/GiovannyProy4/homepage/homepage/"){
                window.location.href="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";

            }
              
            
         }).fail(function() {
            c( "error generalfunctions.js fun_keyword" );
        });
    }


    function c(d){
        console.log(d);
    }


    function irCourses(){

        $.post("../../courses/resFiltros",{"resFiltros":true},                    
         function (response) {
            console.log(response);
            var n_location="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";
            window.location.href=n_location;
         }).fail(function() {
            alert( "error f generales l-25" );
        });
    }


    function enviarInfoToContro(ulr, json) {
        console.log(json);
        $.post( ""+ulr+"", json,
            // {"idCourse2": id},
            function( response ) {
                c(response);
                window.location.href=""+response+"";
                
        })
        .fail(function(response) {
            c("fallo enviarInfoToContro fgenerales l42");
        });
    }


    function courseDetalles(){
        $(".courseDetalles").click(function(event) {
                var id=this.getAttribute("id");
                console.log(id);
                enviarInfoToContro("../../homepage/idCourse", {"idCourse":true, "idCourse2":id});

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
        img.setAttribute("src", "../../"+json.avatar+"");
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
        a2.setAttribute("id", ""+json.id+"");
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
        img2.setAttribute("src", "");
        var p3=document.createElement("p");

        
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
        $.post( "../../profile/load_country",
            function( response ) {
                /*console.log(response);*/
            
                if(response === 'error'){
                    load_countries_v2("http://localhost/Proyectos/GiovannyProy4/resources/ListOfCountryNamesByName.json");
                }else{
                    /*console.log(JSON.parse(response));*/
                    $.each(JSON.parse(response), function (i, valor) {
                        $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
                    });   
                    // load_countries_v2("module/profile/controller/controller_profile.php?load_country=true"); //oorsprong.org
                }
        })
        .fail(function(response) {
            load_countries_v2("http://localhost/Proyectos/GiovannyProy4/resources/ListOfCountryNamesByName.json");
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
        $.post( "../../profile/load_provinces",
            function( response ) {
              $("#province").empty();
              $("#province").append('<option value="" selected="selected">Select province</option>');

                console.log(JSON.parse(response));
                var json = JSON.parse(response);
                var provinces=json.provinces;


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
            alert( "error load_cities2" );
        });
    }


    function load_cities_v1(prov) { //provinciasypoblaciones.xml - xpath
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


    function load_category(url, json, id_etiqueta) { //provinciasypoblaciones.xml - xpath
        // console.log(json);
        $.post( ""+url+"", json,
            function( response ) {            
                $("#"+id_etiqueta+"").empty();
                $("#"+id_etiqueta+"").append('<option value="" selected="selected">Select '+id_etiqueta+'</option>');
                // console.log(response);
                if(response == 'error'){
                    // console.log("dfgljdfkjgh");
                    load_category_B(url, id_etiqueta);
                }else{
                    var loc="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";
                    if(window.location==loc){
                        $("#"+id_etiqueta+"").append("<option value='all'>All categories</option>");
                    }
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
            load_category_B(url, id_etiqueta);
        });
    }

    
    function load_category_B(ulr, id_etiqueta) {
        $.getJSON( ulr, function(data) {
          $("#"+id_etiqueta+"").empty();
          $("#"+id_etiqueta+"").append('<option value="" selected="selected">Select prueba</option>');
          // console.log(data);
          var type="";
            var loc="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";
            if(window.location==loc){
                $("#"+id_etiqueta+"").append("<option value='all'>All categories</option>");
            }
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


    function load_subCategory(ulr, json, valueSelectAnterior, id_etiqueta) {
        // console.log(ulr);
         $.post( ""+ulr+"", json,
            function( response ) {            
                // console.log(response);
                $("#"+id_etiqueta+"").empty();
                $("#"+id_etiqueta+"").append('<option value="" selected="selected">Select '+id_etiqueta+'</option>');
                // console.log(response);
                if(response == 'error'){
                    // console.log("dfgljdfkjgh");
                    // load_category_B(ulr, id_etiqueta);
                }else{
                    var loc="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";
                    if(window.location==loc){
                        $("#"+id_etiqueta+"").append("<option value='all'>All sub-categories</option>");
                    }
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


    function escribirErrores(id, mensaje){
        $("#"+id+"").focus();
        $("#"+id+"").attr("style", "background:#FFC9C9; border:red 2px solid");        
        $("#"+id+"").after("<div class='e_contact'><span class='errores' style='color:red;'>"+mensaje+"</span><br/><br/></div>");
    }


    function quitarErrores(id){    
        $("#"+id+"").attr("style", "");            
        $("input#"+id+"").siblings('div').remove();
    }


