var indice = 0;
var totalUser = 0;

$(document).ready(function(){
  var geolocation = window.navigator.geolocation;

  const localizacao = geolocation.getCurrentPosition((posicao)=>{
      var latitude = posicao.coords.latitude;
      var longitude = posicao.coords.longitude;

      console.log(latitude, longitude);

      var coordenadas = {lat: latitude, lng: longitude};
      // Busca os markers
      $(function(){
        $.ajax({
          type: 'POST',
          url: '/userLocation', 
          data: {coordenadas},
          beforeSend: function(){                													
          },
          success: (data) => {                    																			
              
              const usersList = data;
              addPerfil(usersList, indice);
              showPerfil(indice);

          }																						
        });
      
      });
  

  }, (error)=>{

  });;
    
  
});

function addPerfil(usersList, indiceRecive){
  
  const users = window.document.getElementById('users');
  totalUser = usersList.length;

  if(usersList.length != 0){
    
    for(let i = 0; i < usersList.length; i++){

      if(usersList[i][1] < 1){
        usersList[i][1] = 1;
      }

      var content = '<div class="card marginCard" id="card'+i+'" style="display:none">'+
      '<img class="card-img-top img-fluid cardTam" src="img/uploads/'+usersList[i][0].img+'" alt="Card image cap">'+
      '<div class="card-body text-center">'+
       '<h5 class="card-title">'+usersList[i][0].name+'</h5>'+
        '<p class="card-text">Distância de você: '+ usersList[i][1]+' Km</p>'+
          '<a class="btn btn-success" href="/perfil/'+usersList[i][0]._id+'">Entrar em contato</a>'+
    '   </form>'+
      '</div>'+
    '</div>'
  
    $(users).append(content);
  
    }
  } else {
    $(users).html('Não existe usuários perto de você!');
  }

}

function clearUsers(){
  var cont = indice-1;
    while(cont != -1){
      var card = document.getElementById('card'+cont+'');
      if(card){
        card.style.display = "none";
      }
      cont--;
    }
}


function showPerfil(indice){

  if(indice != 0){
    clearUsers();
  }

  for(let i=indice; i<indice+3; i++){
    var card = document.getElementById('card'+i+'');
    if(card){
      card.style.display = "";
    } 
  }

  

}

function searchMoreUsers(){

  indice += 3;
  if(indice > totalUser){
    clearUsers();
    indice = 0;
  }
  showPerfil(indice);

}