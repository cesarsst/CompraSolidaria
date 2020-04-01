$(document).ready(function(){
    
    var url = window.location.href;
    var id = url.split('/perfil/')[1];
    const imgPerfil = document.getElementById('imgPerfil');

    $(function(){
        $.ajax({
            type: 'GET',
            url: '/getImgPerfil/'+id, 
            beforeSend: function(){                

            },
            success: function(data) {  
                const user = data.user;
                console.log(data);
                $(imgPerfil).html('<img class="card-img-top img-fluid cardTam mt-3" id="imgUser" src="img/uploads/'+user.img+'"></img>')
            },
            error: function(data){
             										
            }			

        });
    })


})


function solicitaTel(idUser){

    var url = window.location.href;
    var id = url.split('/perfil/')[1];
    const solicitaModal = window.document.getElementById('solicitaModal');
    const loading = window.document.getElementById('loading');
    const logsErrors = window.document.getElementById('logsErrors')
    $(logsErrors).html('');


    $(function(){
        $.ajax({
            type: 'POST',
            url: '/solicitaTel', 
            data: {id},
            beforeSend: function(){                
                $(solicitaModal).modal('hide');		
                $(loading).html('<center><div id="spinner" class="spinner"></div></center>');	
										
            },
            success: function(data) {  
                window.location.href= '/mensagem';
            },
            error: function(data){
                $(loading).html('Solicitar telefone');	
                $(logsErrors).html('<p style="color: red;">'+ data.responseJSON.msg+'</a></p>');
                											

            }			

        });
    })

}