function register(){

    $(logsErrors).html('');
    var geolocation = window.navigator.geolocation;
    
    const localizacao = geolocation.getCurrentPosition((posicao)=>{
        var latitude = posicao.coords.latitude;
        var longitude = posicao.coords.longitude;

        var name = document.getElementById('inputName').value;
        var email = document.getElementById('inputEmail').value;
        var tel = document.getElementById('inputTel').value;
        var password = document.getElementById('inputPassword').value;
        var passwordConfirm = document.getElementById('inputPasswordConfirm').value;
        var perfil1 = document.getElementById('customRadio1').checked;
        var perfil2 = document.getElementById('customRadio2').checked;
        var perfilType = null;
        
        if(perfil1 == false && perfil2 == false){
            $(logsErrors).append('<p style="color: red;">Selecione uma opção de perfil!</a></p>')
        } else {
            
            if(perfil1){
                perfilType = 0;
            } else if(perfil2) {
                perfilType = 1;
            }
    
            $(function(){
    
                var post_url = '/register';												
                var loading = window.document.getElementById('loading');																
                var logsErrors = window.document.getElementById('logsErrors');
    
                var post_data = {name, email, tel, password, passwordConfirm, latitude, longitude, perfilType}
    
                $.ajax({
                    type: 'POST',
                    url: post_url, 
                    data: post_data,
                    beforeSend: function(){                
                        $(loading).html('<center><div id="spinner" class="spinner"></div></center>');	
                        $(logsErrors).html('');												
                    },
                    success: function(data) {   
                        window.location.href= '/login';
                    },
                    error: function(data){
                        $(loading).html('Registrar');	
                        console.log(data);
                        const errors = data.responseJSON.errors;
                        errors.forEach(element =>{
                            $(logsErrors).append('<p style="color: red;">'+ element.msg +'</a></p>')
                        })												
    
                    }																					
                });
                
            });
        }
        

        
    })



}