$(document).ready(function () {
	// console.log(window.location);
    /* **********************************************************************
    Este js utiliza funciones declaradas en un archivo para toda la aplicacion en la ruta
     view/js/generalFunctions.js
	**************************************************************************
     */
    autocomplete();
    
    $("#viewMore").click(function(event) {
    	v++;
    	limite1=limite2;
    	limite2=limite2+3;
    	// console.log(v+"  "+limite1+" - "+limite2);
    	crearList(limite1, limite2, json);
		courseDetalles();
    
    });
	/*-------------------------------------------------------------------------------------*/
    $("#viewMoreCategories").click(function(event) {
    	v_b++;
    	limite1_b=limite2_b;
    	limite2_b=limite2_b+3;
    	// console.log(v+"  "+limite1+" - "+limite2);
    	bucleCategorias(limite1_b, limite2_b, json2);		    
    });

    /*-------------------------------------------------------------------------------------*/
    var v=0;
    var limite2=0;
	$.post("../../homepage/getCourses/",{"getCourses":true},
        
     function (response) {
        json = JSON.parse(response);
     	console.log(json);
             
        v++;
    	limite1=limite2;
    	limite2=limite2+3;

	    crearList(limite1, limite2, json);
	    courseDetalles();
	 }).fail(function() {
	 	// console.log(window.location);
        alert( "error homepage/getCourses" );
    });
	/*-------------------------------------------------------------------------------------*/

	var v_b=0;
    var limite2_b=0;
    $.post("../../homepage/getCategorias/",{"getCategorias":true},
        
     function (response) {
     	// console.log(JSON.parse(response));
     	limite1_b=limite2_b;
    	limite2_b=limite2_b+3;
    	
     	json2=JSON.parse(response);
     	console.log(json2);
     	bucleCategorias(limite1_b, limite2_b, json2);
        
	 }).fail(function() {
        alert( "../../homepage/getCategorias" );
    });
	/*-------------------------------------------------------------------------------------*/
});//end document ready

function bucleCategorias(limite1, limite2, json){
	
	var div=document.getElementById("categories");
  console.log(limite1+limite2);

	if (json.length<limite2) {
		for (var i = limite1 ; i <json.length; i++) {
			// console.log(json[i]);
			var element2=creaCategorias(json[i]);
			div.appendChild(element2);
		}
	}else{
		for (var i = limite1 ; i <limite2; i++) {
			console.log(json[i]);
			var element2=creaCategorias(json[i]);
			div.appendChild(element2);
		}
	}	
	courseCategory();
	
}

function creaCategorias(json){
	var div_1=document.createElement("div");
	 div_1.setAttribute("class", "col-md-4 margin_img_home");
	var div_2=document.createElement("div");
	 div_2.setAttribute("class", "single_course");
	var div_3=document.createElement("div");
	 div_3.setAttribute("class", "singCourse_imgarea");
	var img=document.createElement("img");
	 img.setAttribute("src", "../../"+json.photoCategory+"");
	 img.setAttribute("class", "mediana");
	var div_4=document.createElement("div");
	 div_4.setAttribute("class", "mask");
	var a=document.createElement("a");
	 a.setAttribute("href", "#");
	 	a.setAttribute("id", json.inicia);
	 a.setAttribute("class", "course_more classCategory");
	 a.innerHTML="Courses of this category";
	var div_5=document.createElement("div");
	 div_5.setAttribute("class", "singCourse_content");
	var h3=document.createElement("h3");
	var a2=document.createElement("a");
		a.setAttribute("id", json.inicia);
		a2.setAttribute("class", " classCategory");
		a2.setAttribute("href", "#");
		a2.innerHTML=json.course;


	div_1.appendChild(div_2);
	div_2.appendChild(div_3);
	div_3.appendChild(img);
	div_3.appendChild(div_4);
	div_4.appendChild(a);
	div_2.appendChild(div_5);
	div_5.appendChild(h3);
	h3.appendChild(a2);

	return div_1;
}

function courseCategory(){
	$(".classCategory").click(function(event) {
     	 var idCategory=this.getAttribute("id");
     	 console.log(idCategory);
     	 enviarInfoToContro("../../homepage/filtros",{"filtros":true, "category": idCategory});
     	});;
}





