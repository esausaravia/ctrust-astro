function jQueryReady(){
  console.log('jQueryReady');
  $("#nombre").on('keyup', function(e) {
    var val = $(this).val();
    if (val.match(/[^a-zA-Z áéíóúÁÉÍÓÚñÑ]*$/g)) {
        $(this).val(val.replace(/[^a-zA-Z áéíóúÁÉÍÓÚñÑ]*$/g, ''));
    }
  });

  $("#telefono").on('keyup', function(e) {
    var val = $(this).val();
    if (val.match(/[^0-9]*$/g)) {
        $(this).val(val.replace(/[^0-9]*$/g, ''));
    }
  });
  $("#nombre1").on('keyup', function(e) {
    var val = $(this).val();
    if (val.match(/[^a-zA-Z áéíóúÁÉÍÓÚñÑ]*$/g)) {
        $(this).val(val.replace(/[^a-zA-Z áéíóúÁÉÍÓÚñÑ]*$/g, ''));
    }
  });

  $("#telefono1").on('keyup', function(e) {
    var val = $(this).val();
    if (val.match(/[^0-9]*$/g)) {
        $(this).val(val.replace(/[^0-9]*$/g, ''));
    }
  });
  $(".politicaspop").click(function() {
    $('#politicas').modal('show');
    return false;
  });

  const navbarToggler = document.querySelector('.navbar-toggler');
    navbarToggler.addEventListener('click', function() {
    this.classList.toggle('collapsed');
  });


  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById('utm_source').value = urlParams.get('utm_source') || '';
  document.getElementById('utm_medium').value = urlParams.get('utm_medium') || '';
  document.getElementById('utm_campaign').value = urlParams.get('utm_campaign') || '';
  document.getElementById('utm_term').value = urlParams.get('utm_term') || '';
  document.getElementById('utm_content').value = urlParams.get('utm_content') || '';

  const urlParams1 = new URLSearchParams(window.location.search);
  document.getElementById('utm_source1').value = urlParams.get('utm_source') || '';
  document.getElementById('utm_medium1').value = urlParams.get('utm_medium') || '';
  document.getElementById('utm_campaign1').value = urlParams.get('utm_campaign') || '';
  document.getElementById('utm_term1').value = urlParams.get('utm_term') || '';
  document.getElementById('utm_content1').value = urlParams.get('utm_content') || '';

  $('#form_register1').validate({
    rules: {
      nombre1: { required: !0, minlength: 2, maxlength: 25 },
      telefono1: { required: !0, minlength: 8, maxlength: 12, digits: true },
      email1: {required: true,email: true},
      edad1: { required: !0, min: 19, max: 120, digits: true }
    },
    messages: {
      nombre1: {},
      telefono1: {},
      email1: {required: "Please enter an email address.",email: "Please enter a valid email address."},
      edad1: {}
    },
    submitHandler: function() {
      console.log(`form_register1 submitHandler`, arguments)
        if(  $("#edad1").val() < 18){

            $('.alert1').removeClass('alert-success');
            $('.alert1').removeClass('alert-warning');
            $('.alert1').removeClass('alert-danger');

                $('.alert1').addClass('alert-warning');
                $('.mensaje1').html('La edad mínima de consentimiento es 18 años.');
                $('.alert1').show();
                setTimeout(function() {
                    $(".alert1").fadeOut(500);
                }, 3000);
                return false;

        }else{

            $('.alert1').removeClass('alert-success');
            $('.alert1').removeClass('alert-warning');
            $('.alert1').removeClass('alert-danger');
            $('#btn_activar1').attr("disabled", "on");

            const formData = new FormData(document.getElementById('form_register1'));

             fetch('app/api1.php', {
                 method: 'POST',
                 body: formData
             })
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then(data => {
                 if (data.status === 'success') {
                     // Redireccionar a la página de agradecimiento
                     window.location.href = './gracias.html';
                 } else {
                     // Mostrar un mensaje de error
                     $('#btn_activar1').prop("disabled", false);
                     alert('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
                 }
             })
             .catch(error => {
                 console.error('Error:', error);
                 $('#btn_activar1').prop("disabled", false);
                 alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
             });
        }
       }
  });

  $('#form_register').validate({
    rules: {
      nombre: { required: !0, minlength: 2, maxlength: 25 },
      telefono: { required: !0, minlength: 8, maxlength: 12, digits: true },
      email: {required: true,email: true},
      edad: { required: !0, min: 19, max: 120, digits: true }
    },
    messages: {
      nombre: {},
      telefono: {},
      email: {required: "Please enter an email address.",email: "Please enter a valid email address."},
      edad: {}
    },
    submitHandler: function() {
      console.log(`form_register submitHandler`, arguments)
        console.log("aqui");
        if(  $("#edad").val() < 18){

            $('.alert').removeClass('alert-success');
            $('.alert').removeClass('alert-warning');
            $('.alert').removeClass('alert-danger');

                $('.alert').addClass('alert-warning');
                $('.mensaje').html('La edad mínima de consentimiento es 18 años.');
                $('.alert').show();
                setTimeout(function() {
                    $(".alert").fadeOut(500);
                }, 3000);
                return false;

        }else{
            $('.alert').removeClass('alert-success');
            $('.alert').removeClass('alert-warning');
            $('.alert').removeClass('alert-danger');
            $('#btn_activar').attr("disabled", "on");

            const formData = new FormData(document.getElementById('form_register'));

             fetch('/app/api.php', {
                 method: 'POST',
                 body: formData
             })
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then(data => {
                 if (data.status === 'success') {
                     // Redireccionar a la página de agradecimiento
                     window.location.href = './gracias.html';
                 } else {
                     // Mostrar un mensaje de error
                     $('#btn_activar').prop("disabled", false);
                     alert('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
                 }
             })
             .catch(error => {
                 console.error('Error:', error);
                 $('#btn_activar').prop("disabled", false);
                 alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
             });
        }
       }
     });

  $('#btn_activar').click(function() {
    console.log("act");
      $('.alert').removeClass('alert-success');
      $('.alert').removeClass('alert-warning');
      $('.alert').removeClass('alert-danger');

      var privacidad = $('#politica').prop('checked');

      if (privacidad == false) {
          $('.alert').addClass('alert-warning');
          $('.mensaje').html('Debes aceptar el Aviso de privacidad.');
          $('.alert').show();
          setTimeout(function() {
              $(".alert").fadeOut(500);
          }, 3000);
          return false;
      }
    return true;
  });

  $('#btn_activar1').click(function() {
    console.log("act 1");

    $('.alert1').removeClass('alert-success');
    $('.alert1').removeClass('alert-warning');
    $('.alert1').removeClass('alert-danger');

    var privacidad = $('#politica1').prop('checked');

    if (privacidad == false) {
        $('.alert1').addClass('alert-warning');
        $('.mensaje1').html('Debes aceptar el Aviso de privacidad.');
        $('.alert1').show();
        setTimeout(function() {
            $(".alert1").fadeOut(500);
        }, 3000);
        return false;
    }
    console.log('act1 end');
    return true;
  });
}

document.addEventListener("DOMContentLoaded", function(){
  $(jQueryReady)
});