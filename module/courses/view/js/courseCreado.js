$(document).ready(function () {
	load_dates();

});//end document.reary



function load_dates(){
     console.log("entras");
	$.get("module/courses/controller/controller_courses.php?load=true",
          function(response){
            console.log(response);
          	if (response.acceso) {
          		document.getElementById('title').innerHTML=response.title;
          		var imgCourse=document.getElementById('imgCourse');
          		imgCourse.setAttribute('src', response.avatar);
     			document.getElementById('courseDescr').innerHTML=response.courseDescr;
     			document.getElementById('pice').innerHTML=response.price+" €";
          		
          	}
          },"json").fail(function(xhr){
          				alert(xhr.responseText);
          			});
}