$(document).ready(function () {
   var marker;
   pintarDatos();
	
});



    function pintarDatos(){
        $.post( "../../courses/coursetDetails",{"coursetDetails":true},
            function( response ) {
                var json = JSON.parse(response);
                console.log(json);
                var img=document.getElementById('img');
                img.setAttribute("src", "../../"+json[0].avatar+"");
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
                category.innerHTML=json[0].subject;
                var price=document.getElementById('price');
                price.innerHTML=json[0].price+" €";
                var detalles_teacher=document.getElementById('detalles_teacher');
                detalles_teacher.innerHTML=json[0].personalDescr;
               
                var lat=parseFloat(json[0]["lat"]);
                var lng=parseFloat(json[0]["lng"]);
                pintarMapa(lat, lng);
                
        })
        .fail(function(response) {
            alert("fallo");
        }); 
    }

    function pintarMapa(latitud, longitud){

        var infoWindow = new google.maps.InfoWindow;
        var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: latitud, lng: longitud},
              zoom: 15
            });
        var point = new google.maps.LatLng(latitud, longitud);
        marker = new google.maps.Marker({
                map: map,
                position: point,
                animation: google.maps.Animation.DROP
            }); 

         marker.addListener('click', toggleBounce);

    }

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }




