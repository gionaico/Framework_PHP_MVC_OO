Dropzone.autoDiscover = false;
$(document).ready(function () {

	$(".inputKeyup").keyup(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", "");        		
        // $("#sp_"+id+"").html("<span></span>");
    });

    $("#submit1").click(function(){
        $("div").remove(".div_errPhp");
        validaJS();
    });

    $('.selectCF').change(function() {
        var id = this.getAttribute('id');
        $("#"+id+"").attr("style", "");
    });

    $(".checkboxCategory").click(function(){
         $("#div_subjets").attr("style","" );
    });

    $(".level").click(function(){
         $("#div_level").attr("style","" );
    });
});

function validaJS(){
    
    var title = document.getElementById("title").value;
    var courseLenguge = document.getElementById("courseLenguge").value;
    var ulr = document.getElementById("ulr").value;
    var courseDuration = document.getElementById("courseDuration").value;
    var v_level="";
    var level = document.getElementsByClassName('level');
        for (var i = 0; i < level.length; i++) {
            if (level[i].checked) {
                v_level = level[i].value;
            }
        }
    var price = document.getElementById("price").value;
    var courseDescr = document.getElementById("courseDescr").value;
    var category = [];
    var checkboxCategory = document.getElementsByClassName('checkboxCategory');
    var j = 0;    
        for (var i = 0; i < checkboxCategory.length; i++) {
            if (checkboxCategory[i].checked) {
                category[j] = checkboxCategory[i].value;
                j++;
            }
        }
    var personalDescr = document.getElementById("personalDescr").value;
    
           
                
    if (title == null || title.length < 10) {
        controlForm("title");
        return false;
    }
    if (courseLenguge == null || courseLenguge.length == 0) {
        controlForm("courseLenguge");
        return false;
    }
    if (ulr == null || ulr.length == 0|| !ulrPattern.test(ulr)) {
        controlForm("ulr");
        return false;
    }
    if (courseDuration == null || courseDuration.length == 0) {
        controlForm("courseDuration");
        return false;
    }
    if (v_level == null || v_level.length == 0) {
        $("#div_level").attr("style","border: solid 2px red; background-color: #FFC9C9;" );
        return false;
    }
    if (price == null || price.length == 0|| !pricePattern.test(price)) {
        controlForm("price");
        return false;
    }   
    if (courseDescr == null || courseDescr.length < 150) {
        controlForm("courseDescr");
        $("#courseDescr").focus().after("<div class='div_errPhp><span  class='error' >Minimus caracters are 150</span><br></div>");
        return false;
    }
    if (category == null || category.length == 0) {
        $("#div_subjets").attr("style","border: solid 2px red; background-color: #FFC9C9;" );
        return false;
    }
    
    if (personalDescr == null || personalDescr.length < 150) {
        controlForm("personalDescr");
        $("#courseDescr").focus().after("<div class='div_errPhp><span  class='error' >Minimus caracters are 150</span><br></div>");
        return false;
    }
}


