$(document).ready(function () {
    function onSuccess(imageData) {
        var foto = $("#foto");
        foto.attr("src", imageData);
    }

    function onFail(message) {
        console.log(message);
    }

    function capturePhoto() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }
      
    function getPhoto(source) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: source
        });
    }

    $("#btnCamera").on("click", function () {
        capturePhoto();
    });

    $("#btnGaleria").on("click", function () {
        getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
    });

    function win(data) {
        if (data && data.responseCode == 200) {
            navigator.notification.confirm("Imagem enviada", null, "Wennder Santos", ["OK"])
        }
    }

    function fail(data) {
        console.log(data);
    }

    $("#btnUpload").on("click", function () {
            var foto = $("#foto");
            var imageURI = foto.attr("src");
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var params = new Object();
            options.params = params;
            options.chunkedMode = false;
            var ft = new FileTransfer();
            ft.upload(imageURI, "https://www.cotando-staging.azurewebsites.net/api/upload-imagem", win, fail, options);
    });
});