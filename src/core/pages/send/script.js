function sendMessage() {
    var mensaje = document.getElementById("mensaje").value;
    // Construye el objeto de datos a enviar
    var data = {
        message: mensaje
    };
    // Realiza la solicitud POST al backend
    fetch('/send-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta del servidor
            if (data.status === "success") {
                alert("Mensaje enviado con éxito.");
                // Limpia el campo del textarea
                document.getElementById("mensaje").value = "";
            } else {
                alert("Hubo un error al enviar el mensaje.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function previewMessage() {
    var mensaje = document.getElementById("mensaje").value;
    var previewElement = document.getElementById("preview");
    var caracteresPorLinea = 60; // Cambia esta cantidad según tus necesidades


    var fragmentos = [];
    for (var i = 0; i < mensaje.length; i += caracteresPorLinea) {
        fragmentos.push(mensaje.slice(i, i + caracteresPorLinea));
    }


    var mensajeConSaltosDeLinea = fragmentos.join('\n');
    previewElement.style.display = 'block';
    previewElement.innerHTML = mensajeConSaltosDeLinea;
}




