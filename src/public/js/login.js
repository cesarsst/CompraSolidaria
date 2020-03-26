function login(){

    var email = window.document.getElementById('inputEmail').value;
    var password = window.document.getElementById('inputPassword').value;
    

    $(function(){

        var loading = window.document.getElementById('loading');
        var logsErrors = window.document.getElementById('logsErrors');

        $.ajax({
            type: 'POST',
            url: '/login', 
            data: {email, password},
            beforeSend: function(){                
                $(loading).html('<center><div id="spinner" class="spinner"></div></center>');	
                $(logsErrors).html('');												
            },
            success: function(data) {
                window.location.href= '/';
            },
            error: function(data){
                $(loading).html('Entrar');	
                const errors = data.responseJSON.errors;
                console.log(errors);
                errors.forEach(element =>{
                    $(logsErrors).html('<p style="color: red;">'+ element.msg +'</a></p>')
                })												

            }			

        });





    })




}