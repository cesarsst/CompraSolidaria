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