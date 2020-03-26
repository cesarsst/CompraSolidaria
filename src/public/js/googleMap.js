function inicializar() {
   
    var geolocation = window.navigator.geolocation;
    const localizacao = geolocation.getCurrentPosition((posicao)=>{
        var latitude = posicao.coords.latitude;
        var longitude = posicao.coords.longitude;

        var coordenadas = {lat: latitude, lng: longitude};

       
        var mapa = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 15,
          center: coordenadas
        });
        
        var markerYou = new google.maps.Marker({
          position: coordenadas,
          icon: "/img/you.png",
          map: mapa,
          title: "Você"
        });	

        // Busca os markers
        $(function(){
          $.ajax({
            type: 'POST',
            url: '/userLocation', 
            data: {coordenadas},
            beforeSend: function(){                													
            },
            success: (data) => {                    																			
                
                const userProx = data;

                userProx.forEach(element =>{
                   
                  

                  var contentString = '<div id="content" style="color=black;">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">'+ element[0].name +'</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Distância de você: </b>'+ element[1] +' metros.' +
                    '<p><b>Stars: </b>'+ element[0].stars +'.' +
                    '<p><a href="/perfil/'+ element[0]._id +'">Enviar mensagem!</a></p>'
                    '</p>'+
                    '</div>'+
                    '</div>';


                  var infowindow = new google.maps.InfoWindow({
                    content: contentString
                  });

                  var marker = new google.maps.Marker({
                    position: {lat: element[0].lat, lng: element[0].lng},
                    map: mapa,
                    title: element[0].name
                  });	

                  marker.addListener('click', function() {
                    infowindow.open(mapa, marker);
                  });
            
                })                         
            }																						
          });
        
        });
    

    }, (error)=>{
        console.log(error)

    });;
    
}

