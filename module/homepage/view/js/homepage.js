$(document).ready(function () {
	
    

    $("#viewMore").click(function(event) {
    	v++;
    	limite1=limite2;
    	limite2=limite2+3;
    	// console.log(v+"  "+limite1+" - "+limite2);
    	crearList(limite1, limite2, json);
		courseDetalles();
    
    });

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
	$.get("module/homepage/controller/controller_homepage.php?getCourses=true",
        
     function (response) {
     	// console.log(JSON.parse(response));
        json = JSON.parse(response);
             
        v++;
    	limite1=limite2;
    	limite2=limite2+3;

	    // console.log(v+"  "+limite1+" - "+limite2);	
	    crearList(limite1, limite2, json);
	    courseDetalles();
	 }).fail(function() {
        alert( "error dfsdgffg" );
    });
	/*-------------------------------------------------------------------------------------*/

	var v_b=0;
    var limite2_b=0;
    $.get("module/homepage/controller/controller_homepage.php?getCategorias=true",
        
     function (response) {
     	// console.log(JSON.parse(response));
     	limite1_b=limite2_b;
    	limite2_b=limite2_b+3;
     	console.log(response);
     	json2=JSON.parse(response);
     	bucleCategorias(limite1_b, limite2_b, json2);
        
        
	 }).fail(function() {
        alert( "error dfsdgffg" );
    });

 
    

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

	
}

function creaCategorias(json){
	var div_1=document.createElement("div");
	 div_1.setAttribute("class", "col-md-4 margin_img_home");
	var div_2=document.createElement("div");
	 div_2.setAttribute("class", "single_course");
	var div_3=document.createElement("div");
	 div_3.setAttribute("class", "singCourse_imgarea");
	var img=document.createElement("img");
	 img.setAttribute("src", json.photoCategory);
	 img.setAttribute("class", "mediana");
	var div_4=document.createElement("div");
	 div_4.setAttribute("class", "mask");
	var a=document.createElement("a");
	 a.setAttribute("href", "#");
	 a.setAttribute("class", "course_more");
	 a.innerHTML="Courses of this category";
	var div_5=document.createElement("div");
	 div_5.setAttribute("class", "singCourse_content");
	var h3=document.createElement("h3");
	var a2=document.createElement("a");
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

function courseDetalles(){
	$(".courseDetalles").click(function(event) {
	    	var id=this.getAttribute("id");
	    	console.log(id);
	    	enviarIdCourse("module/homepage/controller/controller_homepage.php?idCourse=true&idCourse2=",  id);

	    });
}

function enviarIdCourse(url, id) {
	console.log('"'+id+'"');
    $.get( ""+url+""+id+"",
        // {"idCourse2": id},
        function( response ) {
            console.log(response);
            window.location.href=""+response+"";
    })
    .fail(function(response) {
        alert("fallo");
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