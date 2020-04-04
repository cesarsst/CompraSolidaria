$(document).ready(function(){
    $(logsErrors).html('');

    var geolocation = window.navigator.geolocation;
    const localizacao = geolocation.getCurrentPosition((posicao)=>{

        var lat = document.getElementById('inputLat');
        var lng = document.getElementById('inputLng');


        lat.value = posicao.coords.latitude;
        lng.value = posicao.coords.longitude;

    });
});



// Altera o palceholder do input de enviar arquivo
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});