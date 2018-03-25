$(document).ready(function () {
	
    /* **********************************************************************
    Este js utiliza funciones declaradas en un archivo para toda la aplicacion en la ruta
     view/js/generalFunctions.js
	**************************************************************************
     */
    
    $.get("module/courses/controller/controller_courses.php?getCoursesFiltrados=true",
        
     function (response) {
     	console.log(response);
     	// console.log(JSON.parse(response).length);
     	var cursosfil=JSON.parse(response);
     	console.log(cursosfil);
		var l1=0;
		var l2=3;
		crearList(l1, l2, cursosfil.datos);
     	paginar(cursosfil.pages, cursosfil.datos);
		
  
     	
	 }).fail(function() {
        alert( "error dfsdgffg" );
    });
});/*end document ready*/    

function paginar(totalPaginas, datos){

	console.log(datos);
// console.log(l1+" "+ l2);
	$('.pagination').twbsPagination({
	        totalPages: totalPaginas,
	        visiblePages: 3,
	        onPageClick: function (event, page) {
	            console.log(page);
				if (page===1) {
					 l1=0;
					 l2=3;
				}else{
					 l2=page*3;
					 l1=l2-3;
				}
				console.log(l1+" "+ l2);
				$("#div_listCou").empty();
				crearList(l1, l2, datos);
				courseDetalles();
	        }
	});
}