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
        imageContainer.appendChild(img);
    };
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
    context.drawImage(image, 0, 0, image.width, image.height);

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

    var convertedImg = document.createElement("img");
    convertedImg.src = canvas.toDataURL("image/png");
    outputContainer.appendChild(convertedImg);

    // Create a download link for the converted image
    var downloadLink = document.createElement("a");
    downloadLink.href = convertedImg.src;
    downloadLink.download = "black_and_white.png";
    downloadLink.textContent = "Download";
    outputContainer.appendChild(downloadLink);
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
    context.drawImage(image, 0, 0, image.width, image.height);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var threshold = 128; // Adjust this threshold as needed

    var binaryOutput = [];
    var binaryString = "";

    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        var binary = avg < threshold ? 0 : 1;
        binaryOutput.push(binary);
        binaryString += binary;
    }

    var binaryOutputElement = document.getElementById("binary-output");
    binaryOutputElement.textContent = binaryString;

    var outputContainer = document.getElementById("output-container");
    outputContainer.scrollIntoView({ behavior: "smooth" });
}

function copyToClipboard() {
    var binaryOutputElement = document.getElementById("binary-output");

    // Create a temporary textarea to copy the binary output
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = binaryOutputElement.textContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    alert("Binary output copied to clipboard!");
}
