$(document).ready(function () {
	
    /* **********************************************************************
    Este js utiliza funciones declaradas en un archivo para toda la aplicacion en la ruta
     view/js/generalFunctions.js
	**************************************************************************
     */
    
    
    $.post("../../courses/getCoursesFiltrados", {"getCoursesFiltrados":true},
        
     function (response) {
     	// console.log(response);
     	// console.log(JSON.parse(response).length);
     	var cursosfil=JSON.parse(response);
     	console.log(cursosfil);
		var l1=0;
		var l2=3;
		// crearList(l1, l2, cursosfil.datos);
     	paginar(cursosfil.pages, cursosfil.datos);
 
     	
	 }).fail(function() {
        c( "err courses.js 24" );
    });

	autocomplete();

	$("#search_prod").submit(function(event) {
		event.preventDefault(); //evita la redireccion 
		// var ele_keyword=document.getElementById('keyword').value;
		// // c(ele_keyword);
		// fun_keyword(ele_keyword);
		// location.reload(true);
		empezarBusqueda();
	});
	$("#Submit").click(function(event) {		
		empezarBusqueda();
	});
});/*end document ready*/    



function empezarBusqueda(){
	var ele_keyword=document.getElementById('keyword').value;
		// c(ele_keyword);
	fun_keyword(ele_keyword);
}

function autocomplete(json){
	$.post("../../courses/autocomplete",{"autocomplete":true},
        
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
        c( "error courses.js autocomplete" );
    });

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
     	paginar(json.pages, json.datos);
		  
     	
	 }).fail(function() {
        c( "error courses.js fun_keyword" );
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
	            // console.log(page);
				// if (page===1) {
				// 	 l1=0;
				// 	 l2=3;
				// }else{
				// 	 l2=page*3;
				// 	 l1=l2-3;
				// }
				// console.log(l1+" "+ l2);
				// $("#div_listCou").empty();
				// crearList(l1, l2, datos);
				// courseDetalles();
				paginarCrear(page, datos);
	        }
	});
}



function paginarCrear(page, datos){
	// console.log(page);
	if (page===1) {
		 l1=0;
		 l2=3;
	}else{
		 l2=page*3;
		 l1=l2-3;
	}
	// console.log(l1+" "+ l2);
	$("#div_listCou").empty();
	crearList(l1, l2, datos);
	courseDetalles();
}