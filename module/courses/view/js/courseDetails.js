$(document).ready(function () {
	$.get( "module/courses/controller/controller_courses.php?coursetDetails=true",
        function( response ) {
        	var json = JSON.parse(response);
            console.log(json);
            var img=document.getElementById('img');
            img.setAttribute("src", json[0].avatar);
            var title=document.getElementById('title');
            title.innerHTML=json[0].title;
            var detalles=document.getElementById('detalles');
            detalles.innerHTML=json[0].courseDescr;
            var duration=document.getElementById('duration');
            duration.innerHTML=json[0].duration;
            var level=document.getElementById('level');
            level.innerHTML=json[0].levelCour;
            var lenguage=document.getElementById('lenguage');
            lenguage.innerHTML=json[0].lenguage;
            var category=document.getElementById('category');
            category.innerHTML=json[0].category;
            var price=document.getElementById('price');
            price.innerHTML=json[0].price+" €";
            var detalles_teacher=document.getElementById('detalles_teacher');
            detalles_teacher.innerHTML=json[0].personalDescr;
       		
    })
    .fail(function(response) {
        alert("fallo");
    });
});









function p(){
	
}