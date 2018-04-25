    $(document).ready(function(){
    
    contactInicio();

    });


    function contactInicio(){
        $(".f_cont").keyup(function(event) {
            var id = this.getAttribute("id");
            quitarErrores(id);
        });
        $('.ajaxLoader').hide();    

        
        $("#submitBtn").click(function(event) {
            $(".e_contact").remove();
            if (validaContact()){
                // show ajax loader icon
                $('.ajaxLoader').show();
                var dataString = $("#contact_form").serialize();
                // console.log(dataString);
                $.ajax({
                    type: "POST",
                    url: "../../contact/process_contact",
                    data: dataString,
                    success: function(dataString) {
                        console.log(dataString);
                        paint(dataString);
                    }
                })
                .fail(function() {
                    console.log("e");
                    // paint("<div class='alert alert-error'>Server error. Try later...</div>");
                });
            }
            // return false;
        });
    }


    function paint(dataString) {
        $("#resultMessage").html(dataString).fadeIn("slow");
                        
        setTimeout(function() {
            $("#resultMessage").fadeOut("slow")
        }, 5000);
                                
        //reset the form
        $('#contact_form')[0].reset();
                                
        // hide ajax loader icon
        $('.ajaxLoader').fadeOut("fast");                            
                        
        if (dataString == "<div class='alert alert-success'>Your message has been sent </div>"){
            alert("Your email have been sent");
        }else{
            alert(dataString);
        }
    }

    
    function validaContact(){
        var inputName = document.getElementById("inputName").value;
        var inputEmail = document.getElementById("inputEmail").value;
        var inputSubject = document.getElementById("inputSubject").value;
        var inputMessage = document.getElementById("inputMessage").value;

        if (inputName == null || inputName.length < 1|| !user_namePattern.test(inputName)) {        
            escribirErrores("inputName", "Invalid name");
            return false;
        }
        if (inputEmail == null || inputEmail.length < 1|| !emailPattern.test(inputEmail)) {        
            escribirErrores("inputEmail", "Invalid email");
            return false;
        }
        if (inputSubject == null || inputSubject.length < 3) {        
            escribirErrores("inputSubject", "Min 3 caracters");
            return false;
        }
        if (inputMessage == null || inputMessage.length < 10) {        
            escribirErrores("inputMessage", "Min 10 caracters");
            return false;
        }
        return true;
    }