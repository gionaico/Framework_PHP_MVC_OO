$(document).ready(function () {
	var v=0;
    var limite2=0;
	$.get("module/homepage/controller/controller_homepage.php?getCourses=true",
        
     function (response) {
     	console.log(JSON.parse(response));
        json = JSON.parse(response);
        //      //console.log(json[0]["product"]);
        //      console.log(json);
        //      //console.log(json.length);
        //      console.log(json[0].title);
             
        v++;
    	limite1=limite2;
    	limite2=limite2+3;

    console.log(v+"  "+limite1+" - "+limite2);	
    crearList(limite1, limite2, json);
    })
    .fail(function() {
        alert( "error dfsdgffg" );
    });

    $("#a").click(function(event) {
    	v++;
    	limite1=limite2;
    	limite2=limite2+3;
    	console.log(v+"  "+limite1+" - "+limite2);
    	crearList(limite1, limite2, json);

    });

});//end document ready


function crearList(limite1, limite2, json){
	
console.log(json);
var div_listCou=document.getElementById("div_listCou");
var ul=document.createElement("ul");
ul.setAttribute("class", "course_nav");

	if (json.length<limite2) {
		for (var i = limite1 ; i <json.length; i++) {
			console.log(json[i]);
			var u=construir(json[i], div_listCou, ul);
			ul.appendChild(u);
		}
	}else{
		for (var i = limite1 ; i <limite2; i++) {
			console.log(json[i]);
			var u=construir(json[i], div_listCou, ul);
			ul.appendChild(u);
		}
	}	
	div_listCou.appendChild(ul);
}

function construir(json, div_listCou, ul){
	console.log(json);
	xxx


	var li=document.createElement("div");
	li.setAttribute("class", "col-md-4");
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
	a.setAttribute("class", "course_more");
	a.setAttribute("id", ""+json.id+"");
	a.innerHTML="View Course";
	


	var div1_2=document.createElement("div");
	div1_2.setAttribute("class", "singCourse_content");
	var h3=document.createElement("h3");
	h3.setAttribute("class", "singCourse_title");
	var a2=document.createElement("a");
	a2.setAttribute("id", ""+json.id+"");////////////////////////////////////////////////
	a2.innerHTML=json.title;
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





	// div_listCou.appendChild(ul);
	// ul.appendChild(li);
	li.appendChild(div1);
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

	return li;
}