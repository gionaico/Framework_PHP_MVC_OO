$(document).ready(function () {
	
    /* **********************************************************************
    Este js utiliza funciones declaradas en un archivo para toda la aplicacion en la ruta
     view/js/generalFunctions.js
	**************************************************************************
     */  
    	   
    filtros();
    traerCursos();
	autocomplete();	
});/*end document ready*/    

/*--------------------------------------------------------------------------------*/


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
	    // c($( "#amount" ).val());
	    
	} );


    load_category("../../courses/obtain_category",{"load_category":true}, "subject");
    $("#subSubject").empty();
    $("#subSubject").append('<option value="" selected="selected">Select sub-subject</option>');
    $("#subSubject").prop('disabled', true);

    $("#subject").change(function() {
        var subject = $(this).val();
        var subject2 = $("#subSubject");
        // console.log(prueba);
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
	// c(datosFiltros_S);
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
     		// console.log(cursosfil);
			var l1=0;
			var l2=3;
			// crearList(l1, l2, cursosfil.datos);
	     	paginar(cursosfil.pages, cursosfil.datos);
     	}else{
     		$("#div_listCou").html("<br /><br /><br /><p><center><strong>Sin resultados. <br />Por favor cambie los filtros</strong></center></p>")
     	}
}

function traerCursos(){
	$.post("../../courses/getCoursesFiltrados", {"getCoursesFiltrados":true},
        
     function (response) {
     	console.log(response);
     	// console.log(JSON.parse(response).length);
     	restPaginacion(response);
     	
	 }).fail(function() {
        c( "err courses.js 24" );
    });
}

function paginar(totalPaginas, datos){
	// console.log(datos);
	// console.log(l1+" "+ l2);
	paginarCrear(totalPaginas, datos);
	// console.log(totalPaginas);
	// var ele=document.getElementById('pagination');
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
	// console.log(TotalPages);
	if (TotalPages===1) {
		 l1=0;
		 l2=3;
	}else{
		 l2=TotalPages*3;
		 l1=l2-3;
	}
	// console.log(l1+" "+ l2);
	$("#div_listCou").empty();
	crearList(l1, l2, datos);
	courseDetalles();
}