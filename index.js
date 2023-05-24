document.getElementById("file-input").addEventListener("change", function (event) {
    var file = event.target.files[0];
    var imageType = /^image\//;

    if (!file || !imageType.test(file.type)) {
        alert("Please select an image file.");
        return;
    }

    var imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = "";

    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.onload = function () {
        URL.revokeObjectURL(this.src);
    };

    imageContainer.appendChild(img);
});

function convertToBlackAndWhite() {
    var imageContainer = document.getElementById("image-container");
    var image = imageContainer.querySelector("img");

    if (!image) {
        alert("Please select an image first.");
        return;
    }

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
    }

    context.putImageData(imageData, 0, 0);

    var outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = "";
    outputContainer.appendChild(canvas);
}

function convertToBinary() {
    var imageContainer = document.getElementById("image-container");
    var image = imageContainer.querySelector("img");

    if (!image) {
        alert("Please select an image first.");
        return;
    }

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var threshold = 128; // Adjust this threshold as needed

    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        var binary = avg < threshold ? 0 : 255;
        data[i] = binary; // Red
        data[i + 1] = binary; // Green
        data[i + 2] = binary; // Blue
    }

    context.putImageData(imageData, 0, 0);

    var outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = "";
    outputContainer.appendChild(canvas);
}
