$(document).ready(function () {
    $('.imagen').on('click', function () {
      // Al hacer clic en el div, simula hacer clic en un input de tipo archivo
      $('#uploadButton').click();
    });

    $('.imagen img').on('click', function () {
      // Hacer clic en la imagen abre el cuadro de diálogo de selección de archivos
      $('#uploadButton').click();
    });

    $('.imagen').on('paste', function (e) {
      // Captura el evento de pegado y maneja la imagen pegada
      var items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (var index in items) {
        var item = items[index];
        if (item.kind === 'file') {
          var blob = item.getAsFile();
          handleFile(blob, $(this));
        }
      }
    });

    $('.imagen').on('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass('dragover');
    });

    $('.imagen').on('dragleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).removeClass('dragover');
    });

    $('.imagen').on('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).removeClass('dragover');

      var files = e.originalEvent.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0], $(this));
      }
    });

    $('#uploadButton').change(function () {
      // Cuando se selecciona una imagen desde el botón, muestra la vista previa
      handleFile(this.files[0], $('.imagen'));
    });

    function handleFile(file, container) {
      // Verifica si el archivo es de tipo permitido
      if (file && /\.(jpe?g|png)$/i.test(file.name)) {
        // Muestra el botón de eliminación
        container.find('button').css('display', 'inline-block');
        // Lee la imagen como un objeto de datos
        var reader = new FileReader();
        reader.onload = function (e) {
          // Muestra la vista previa de la imagen
          container.find('img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('La página dice: Formato de archivo no admitido. Por favor, selecciona un archivo JPEG o PNG.');
        // Puedes manejar de otra manera el caso en que el formato no sea el correcto
      }
    }

    // Función para eliminar la imagen
    window.deleteImage = function () {
      var container = $('.imagen');
      container.find('img').attr('src', 'images/upload.png');
      container.find('button').css('display', 'none');
      $('#uploadButton').val(''); // Limpiamos el valor del input file para permitir cargar la misma imagen nuevamente
    };
  });