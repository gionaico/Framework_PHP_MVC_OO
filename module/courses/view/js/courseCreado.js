$(document).ready(function () {
	load_dates();

});//end document.reary



function load_dates(){
     
	$.post("../../courses/load", {"load":true},
          function(response){
            console.log(response);
          	if (response.acceso) {
          		document.getElementById('title').innerHTML=response.title;
          		var imgCourse=document.getElementById('imgCourse');
          		imgCourse.setAttribute('src', "../../"+response.avatar+"");
     			document.getElementById('courseDescr').innerHTML=response.courseDescr;
     			document.getElementById('pice').innerHTML=response.price+" €";
          		
          	}
          },"json").fail(function(xhr){
          				alert(xhr.responseText);
          			});
}
