$(document).ready(function(){
  

    const userLoggedRequest = window.document.getElementById('userLoggedRequest');
    const userLoggedRequestAccept = window.document.getElementById('userLoggedRequestAccept');
    const userLoggedResponse = window.document.getElementById('userLoggedResponse');
    const userLoggedResponseAccept = window.document.getElementById('userLoggedResponseAccept');

    $.ajax({
        type: 'GET',
        url: '/findRequest', 
        beforeSend: function(){                
                                    
        },
        success: (data) => {  
            
            const userLoggedRequestData = data.userLoggedRequest;
            const userLoggedRequestAcceptData = data.userLoggedRequestAccept;
            const userLoggedResponseData = data.userLoggedResponse;
            const userLoggedResponseAcceptData = data.userLoggedResponseAccept;

            // Aqui so recebe o nome 
            for(let i =0; i<userLoggedRequestData.length; i++){
                var content = '<div class="card mt-2 cardMens">'+
                '<div class="card-body">'+
                  '<h5 class="card-title">Solicitação realizada</h5>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Você desejou se conectar com <b>'+ userLoggedRequestData[i] +' </b></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Status: <a style="color: #d8d82d !important;">Aguardando</a></h6>'+
                '</div>'+
              '</div>';
                
                $(userLoggedRequest).append(content);
            }
           
            for(let i =0; i<userLoggedRequestAcceptData.length; i++){
                var content = '<div class="card mt-2 cardMens">'+
                '<div class="card-body">'+
                  '<h5 class="card-title">Solicitação aceita</h5>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Você desejou se conectar com <b>'+ userLoggedRequestAcceptData[i][0] +' </b></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Telefone: <a href="https://api.whatsapp.com/send?phone=55'+  userLoggedRequestAcceptData[i][1] +'" target="_blank"><b>'+ userLoggedRequestAcceptData[i][1] +' </a></b></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Status: <a style="color: #15c73d !important;">Aceita</a></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted mt-2"><a href="/addStar/'+userLoggedRequestAcceptData[i][2]+'"><img src="/img/star.jpg">Doar uma estrela</a></h6>'+
                '</div>'+
              '</div>';
                
                $(userLoggedRequestAccept).append(content);
            }

            // Mostra só o nome
            for(let i =0; i<userLoggedResponseData.length; i++){

                var content = '<div class="card mt-2 cardMens">'+
                '<div class="card-body">'+
                  '<h5 class="card-title">Solicitação realizada por '+ userLoggedResponseData[i][0] +'.</h5>'+
                  '<h6 class="card-subtitle mb-2 text-muted"><b>'+ userLoggedResponseData[i][0] +' </b> deseja se conectar com você! </h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Status: <a style="color: #d8d82d !important;">Aguardando aprovação</a></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted mt-2"> <a href="/acceptRequest/'+ userLoggedResponseData[i][1] +'"> <button class="btn btn-success">Aceitar</button></a> | <a href="/rejectRequest/'+ userLoggedResponseData[i][1] +'"><button class="btn btn-danger ">Recusar</button></a></h6>'+
                '</div>'+
              '</div>';

                ;

                $(userLoggedResponse).append(content);
            }

            for(let i =0; i<userLoggedResponseAcceptData.length; i++){
                var content = '<div class="card mt-2 cardMens">'+
                '<div class="card-body">'+
                  '<h5 class="card-title">Solicitação realizada por '+ userLoggedResponseAcceptData[i][0] +'.</h5>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Você se conectou com <b>'+userLoggedResponseAcceptData[i][0]+'</b></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Telefone: <b><a href="https://api.whatsapp.com/send?phone=55'+ userLoggedResponseAcceptData[i][1] +'" target="_blank">'+ userLoggedResponseAcceptData[i][1] +'</a></b></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted">Status: <a style="color: #15c73d !important;">Aceita</a></h6>'+
                  '<h6 class="card-subtitle mb-2 text-muted mt-2"><a href="/addStar/'+userLoggedResponseAcceptData[i][2]+'"><img src="/img/star.jpg">Doar uma estrela</a></h6>'+
                '</div>'+
              '</div>';
                
                $(userLoggedResponseAccept).append(content);
            }

            
        },
        error: function(data){
                                                        
        }			

    });

});


function test(){
  alert("teste");
}