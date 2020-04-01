$(document).ready(function(){

    const perfilFoto = document.getElementById('perfilFoto');
    const name = document.getElementById('inputName');
    const tel = document.getElementById('inputTel');
    const perfilType = document.getElementById('perfilType');
    const imgUser = document.getElementById('inputImg');

    $(function(){
        $.ajax({
          type: 'GET',
          url: '/requestPerfilData', 
          beforeSend: function(){ 
              $(perfilFoto).html('<div class="spinner"></div>')               													
          },
          success: (data) => {                    																			
           
            const user = data.user[0];
            $(perfilFoto).html('<img class="card-img-top img-fluid cardTam mt-3" id="imgUser" src="img/uploads/'+user.img+'"></img>') 
                  
            $(name).attr('placeholder', user.name);
            $(name).value = user.name;

            $(tel).attr('placeholder', user.tel)
            $(tel).value = user.tel;

            if(user.perfilType == 0){
                perfilType.options.selectedIndex = 0;
            } else {
                perfilType.options.selectedIndex = 1;
            }
          }																						
        });
      
      });




});



// Altera o palceholder do input de enviar arquivo
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});