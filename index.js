function convertImage() {
  var fileInput = document.getElementById("imageInput");
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    var image = new Image();
    image.src = reader.result;

    image.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      var binaryData = "";

      var imageData = context.getImageData(0, 0, image.width, image.height).data;
      for (var i = 0; i < imageData.length; i += 4) {
        var red = imageData[i];
        var green = imageData[i + 1];
        var blue = imageData[i + 2];
        var alpha = imageData[i + 3];

        // Calculate average brightness of the pixel
        var brightness = (red + green + blue) / 3;

        // Convert brightness to binary value (1 for black, 0 for white)
        var binaryValue = brightness < 128 ? "1" : "0";

        binaryData += binaryValue;
      }

      document.getElementById("binaryOutput").textContent = binaryData;
    };

    image.src = URL.createObjectURL(file);
  };

  reader.readAsDataURL(file);
}
