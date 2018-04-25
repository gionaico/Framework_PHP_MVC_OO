$(document).ready(function () {
	
    /* **********************************************************************
    Este js utiliza funciones declaradas en un archivo para toda la aplicacion en la ruta
     view/js/generalFunctions.js
	**************************************************************************
     */ 
    eventosCourses();
    filtros();
    traerCursos();
	autocomplete();	
});/*end document ready*/    

/*--------------------------------------------------------------------------------*/
    function eventosCourses(){
        $("#vewMap").click(function(event) {        
            var elemento=document.getElementById('row_primero');
            var elemento2=document.getElementById('rowSegundo');
            elemento.style.display="none";
            elemento2.style.display="block";
            document.getElementById('results').innerHTML="";
            /*initMap();*/
            traerCursosMaps();
        });

        $("#go_back").click(function(event) {
            var elemento=document.getElementById('row_primero');
            var elemento2=document.getElementById('rowSegundo');
            elemento2.style.display="none";
            elemento.style.display="block";
        });
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    	infoWindow.setPosition(pos);
    	infoWindow.setContent(browserHasGeolocation ?'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }

    
    function initMap() {        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            map.setCenter(pos);
            
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
          /*Browser doesn't support Geolocation*/
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }


    function filtros(){

        $( function() {
            $( "#slider-range-min" ).slider({
                range: "min",
                value: 250,
                min: 10,
                max: 500,
                slide: function( event, ui ) {
                $( "#amount" ).val(ui.value + " €" );/*salta cada vez que mueve el slider*/
                /*c(ui.value);*/
                filtrosValue(ui.value);
                }
	    });
	    $( "#amount" ).val($( "#slider-range-min" ).slider( "value" )+ " €"  );
	    /*c($( "#amount" ).val());	   */
        });


        load_category("../../courses/obtain_category",{"load_category":true}, "subject");
        $("#subSubject").empty();
        $("#subSubject").append('<option value="" selected="selected">Select sub-subject</option>');
        $("#subSubject").prop('disabled', true);

        $("#subject").change(function() {
            var subject = $(this).val();
            var subject2 = $("#subSubject");
            /*console.log(prueba);*/
            if(subject === ''|| subject==="all"){
                 subject2.prop('disabled', true);
                 $("#prueba2").empty();
            }else{
                subject2.prop('disabled', false);             
                load_subCategory("../../courses/obtain_subCategory", {"load_subCategory":true},subject, "subSubject");
            }        
            filtrosValue("", "", "", subject);
        });//end subject

        $("#subSubject").change(function() {
            var subSubject = $(this).val();        
            filtrosValue("","","","", subSubject);        
        });//end subject

        $(".level").click(function(){    	
        	var level=$(this).val();
             filtrosValue("","", level);
        });

        $('.lenguage').change(function() {
           var lenguage=$(this).val();
           filtrosValue("", lenguage);
        });

}

    function filtrosValue(slider ='', lenguage='', level='' , category ='', sub_subject=''){
    	var datosFiltros={"price":slider, "lenguage":lenguage, "level":level, "category":category, "sub_subject":sub_subject};
    	var datosFiltros_S = JSON.stringify(datosFiltros);
    	/*c(datosFiltros_S);*/
    	$.post("../../courses/cambiarFiltros", {"datosFiltros":datosFiltros_S},
            
         function (response) {
         	restPaginacion(response);

    	 }).fail(function() {
            c( "err fun filtros value courses.js" );
        });
    }

    function restPaginacion(response){
    	var cursosfil=JSON.parse(response);
         	console.log(cursosfil.pages);
         	if (cursosfil.pages>0) {
         		/*console.log(cursosfil);*/
    			var l1=0;
    			var l2=3;
    			
    	     	paginar(cursosfil.pages, cursosfil.datos);
         	}else{
         		$("#div_listCou").html("<br /><br /><br /><p><center><strong>Sin resultados. <br />Por favor cambie los filtros</strong></center></p>")
         	}
    }


    function traerCursosMaps(){
        var map = new google.maps.Map(document.getElementById('map'), {
              /*center: {lat: -34.397, lng: 150.644},*/
              zoom: 8
            });
        var infoWindow = new google.maps.InfoWindow({map: map});

        /*Try HTML5 geolocation.*/
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          /*Browser doesn't support Geolocation*/
          handleLocationError(false, infoWindow, map.getCenter());
        }


        $.post("../../courses/consultaFiltrada", {"consultaFiltrada":true},
            
         function (response) {
         	console.log(response);
         	console.log(JSON.parse(response));
         	var dat=JSON.parse(response);
         	if (dat.filas<11) {
         		var cant_cursos=dat.filas;
         	}else{
         		var cant_cursos=11;
         	}
         	pintarMarkers(map, dat.datos, cant_cursos);

         	
         }).fail(function() {
            c( "err traerCursosMaps" );
        });
}

    function pintarMarkers(map, datosParseados, limite){
    	var markers=datosParseados;
        var infoWindow = new google.maps.InfoWindow;
    	var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
    	var  cont=document.getElementById('info-content');

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     	var labelIndex = 0;
     	console.log("limite "+limite);
     	for (var i = 0; i < limite; i++) {
    		var point = new google.maps.LatLng(
    		  parseFloat(markers[i]["lat"]),
    		  parseFloat(markers[i]["lng"]));
    		var leter=labels[labelIndex++ % labels.length];
    		var html = "<p>"+
    						"<img class='icon' src='../../module/courses/view/img/course-icon.png' />"+
    						"<b><a class='courseDetalles' id='"+markers[i]["id"]+"' href='#'>"+markers[i]["title"]+"</a></b>"+
    					"</p>"+"<br/>"+
    					"<table>"+						
    						"<tr>"+
    							"<td><b>Lenguage:&nbsp&nbsp&nbsp</b></td>"+
    							"<td>"+markers[i]["lenguage"]+"</td>"+
    						"</tr>"+
    						"<tr>"+
    							"<td><b>Level: </b></td>"+
    							"<td>"+markers[i]["levelCour"]+"</td>"+
    						"</tr>"+
    						"<tr>"+
    							"<td><b>Price: </b></td>"+
    							"<td>"+markers[i]["price"]+"</td>"+
    						"</tr>"+
    					"</table>";


    		/*var icon = customIcons[price] || {};*/
    		var marker = new google.maps.Marker({
    			map: map,
    			position: point,
    			animation: google.maps.Animation.DROP,
    			label: leter/*,
    		 	icon: icon.icon*/
    		});
    		bindInfoWindow(marker, map, infoWindow, html);
    		addResult(markers[i], i, marker);

        }

    }


    function htmlIconoMapa(datos){     	
        var title = datos["title"];
        var lenguage = datos["lenguage"];
        var price = datos["price"];
        var id = datos["id"];
        var level = datos["levelCour"];
        var icono = "../../module/courses/view/img/course-icon.png";

        document.getElementById('iw-icon').innerHTML = '<img class="icon" ' +
            'src="' + icono + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a class="courseDetalles" id="'+id+'" href="#">' + title + '</a></b>';
        document.getElementById('iw-lenguage').textContent = lenguage;
        document.getElementById('iw-price').textContent = price;
        document.getElementById('iw-level').textContent = level;
    }


	function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
        courseDetalles();
      });
    }

    function addResult(result, i, marker) {
        var results = document.getElementById('results');
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        /*var markerIcon = MARKER_PATH + markerLetter + '.png';*/

        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');

        tr.onclick = function() {
          google.maps.event.trigger(marker, 'click');
        };

        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        var icon = document.createElement('img');
        icon.src = "../../module/courses/view/img/course-icon.png";
        icon.class="icon";
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(result["title"]);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
    }

    function traerCursos(){
    	$.post("../../courses/getCoursesFiltrados", {"getCoursesFiltrados":true},
            
         function (response) {
            /*console.log(response);*/
         	restPaginacion(response);
         	
    	 }).fail(function() {
            c( "err courses.js 24" );
        });
    }

    function paginar(totalPaginas, datos){
    	/*console.log(datos);*/
    	/*console.log(l1+" "+ l2);*/
    	paginarCrear(totalPaginas, datos);
    	/*console.log(totalPaginas);*/
    	/*var ele=document.getElementById('pagination');*/
    	$('.pagination').twbsPagination('destroy');
    	$('.pagination').twbsPagination({
    	        totalPages: totalPaginas,
    	        visiblePages: 3,
    	        startPage:1,
    	        onPageClick: function (event, page) {
    	            
    				paginarCrear(page, datos);
    	        }
    	});
    }

    function paginarCrear(TotalPages, datos){
    	/*console.log(TotalPages);*/
    	if (TotalPages===1) {
    		 l1=0;
    		 l2=3;
    	}else{
    		 l2=TotalPages*3;
    		 l1=l2-3;
    	}
    	/*console.log(l1+" "+ l2);*/
    	$("#div_listCou").empty();
    	crearList(l1, l2, datos);
    	courseDetalles();
    }