document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------
    // Inicializar EmailJS
    // ----------------------------
    emailjs.init("wrBOMNdDfuDldH6k1"); // Reemplaza con tu User ID de EmailJS

    // ----------------------------
    // Función de LOGIN
    // ----------------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const validUsername = "admin";
            const validPassword = "1234";

            if (username === validUsername && password === validPassword) {
                alert(`Bienvenido, ${username}. Has ingresado correctamente.`);
                emailjs.send("service_6ao64uc", "template_ex25q5f", { username }).then(() => {
                    console.log("Correo enviado con éxito.");
                }).catch((error) => {
                    console.error("Error al enviar el correo:", error);
                });
                navigateTo("pagina2.html");
            } else {
                const errorMessage = document.getElementById("error-message");
                errorMessage.style.display = "block";
            }
        });
    }

    // ----------------------------
    // Formulario de Envío de Correo
    // ----------------------------
    const correoForm = document.getElementById("correoForm");
    if (correoForm) {
        correoForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const responseElement = document.getElementById("correoResponse");

            emailjs.send("service_6ao64uc", "template_ex25q5f", { email, message })
                .then(() => {
                    responseElement.innerText = "Correo enviado correctamente.";
                    responseElement.style.color = "green";
                })
                .catch((error) => {
                    console.error("Error al enviar correo:", error);
                    responseElement.innerText = "Error al enviar correo.";
                    responseElement.style.color = "red";
                });
        });
    }

    // ----------------------------
    // Obtener Foto Aleatoria de Unsplash
    // ----------------------------
    const UNSPLASH_ACCESS_KEY = "Olm38GqT6K6I_C2m8bDrVMIV4omYxoHTXuMRXAOdsTI";
    const getPhotoBtn = document.getElementById("getPhotoBtn");
    const randomPhoto = document.getElementById("randomPhoto");
    const photoDescription = document.getElementById("photoDescription");

    const fetchRandomPhoto = async () => {
        try {
            const response = await fetch("https://api.unsplash.com/photos/random", {
                headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
            });

            if (!response.ok) throw new Error("Error al obtener la foto.");
            const photoData = await response.json();

            randomPhoto.src = photoData.urls.regular;
            randomPhoto.alt = photoData.alt_description || "Foto aleatoria";
            photoDescription.textContent = photoData.alt_description || "Sin descripción.";
        } catch (error) {
            console.error("Error al obtener foto:", error);
            photoDescription.textContent = "Error al cargar la foto.";
        }
    };

    if (getPhotoBtn) getPhotoBtn.addEventListener("click", fetchRandomPhoto);

    // ----------------------------
    // Consultar Clima
    // ----------------------------
    const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
    if (fetchWeatherBtn) {
        fetchWeatherBtn.addEventListener("click", async () => {
            const location = document.getElementById("locationInput").value.trim();
            const apiKey = "bf67c4ca6ff845aab7c13925242711"; // Reemplaza con tu API Key
            const weatherResult = document.getElementById("weatherResult");

            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
                );
                if (!response.ok) throw new Error("Error al obtener los datos del clima.");
                const data = await response.json();

                weatherResult.innerHTML = `
                    <h2>Clima en ${data.location.name}, ${data.location.country}</h2>
                    <p>Temperatura: ${data.current.temp_c}°C</p>
                    <p>Condición: ${data.current.condition.text}</p>
                    <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
                    <p>Humedad: ${data.current.humidity}%</p>
                    <p>Viento: ${data.current.wind_kph} km/h</p>
                `;
            } catch (error) {
                console.error("Error al obtener el clima:", error);
                weatherResult.innerHTML = `<p>Error al obtener el clima.</p>`;
            }
        });
    }
    // ----------------------------
    // Manejar el Envío del Formulario
    // ----------------------------
    const employeeForm = document.getElementById("employeeForm");
    if (employeeForm) {
        employeeForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evitar el envío predeterminado del formulario

            const employeeName = document.getElementById("employeeName").value.trim();
            const salary = parseFloat(document.getElementById("salary").value.trim());
            const observation = document.getElementById("observation").value.trim();
            const senderName = document.getElementById("senderName").value.trim();
            const responseMessage = document.getElementById("responseMessage");
            const submitButton = event.target.querySelector('button[type="submit"]');

            // Validación básica
            if (!employeeName || !salary || !senderName) {
                alert("Por favor, completa todos los campos obligatorios.");
                responseMessage.textContent = "Todos los campos marcados son obligatorios.";
                responseMessage.style.color = "red";
                return;
            }

            // Validación avanzada del salario
            if (isNaN(salary) || salary <= 0) {
                alert("Por favor, ingresa un salario válido y positivo.");
                responseMessage.textContent = "El salario debe ser un número positivo.";
                responseMessage.style.color = "red";
                return;
            }

            // Confirmación antes de enviar
            const confirmSend = confirm(`¿Estás seguro de enviar el mensaje para ${employeeName}?`);
            if (!confirmSend) {
                responseMessage.textContent = "El envío fue cancelado.";
                responseMessage.style.color = "orange";
                return;
            }

            try {
                // Deshabilitar el botón para evitar múltiples envíos
                submitButton.disabled = true;
                responseMessage.textContent = "Enviando mensaje...";
                responseMessage.style.color = "blue";

                // Enviar el formulario usando EmailJS
                await emailjs.send("service_6ao64uc", "template_ex25q5f", {
                    employee_name: employeeName,
                    salary: salary,
                    observation: observation,
                    sender_name: senderName,
                });

                // Mensaje de éxito
                alert(`Gracias, ${senderName}. Tu mensaje se ha enviado correctamente.`);
                responseMessage.textContent = "¡El mensaje se envió correctamente!";
                responseMessage.style.color = "green";

                // Opcional: Reiniciar el formulario después del envío exitoso
                employeeForm.reset();
            } catch (error) {
                // Manejar errores
                console.error("Error al enviar el correo:", error);
                alert("Ocurrió un error al enviar el mensaje.");
                responseMessage.textContent = "Ocurrió un error al enviar el mensaje.";
                responseMessage.style.color = "red";
            } finally {
                // Rehabilitar el botón
                submitButton.disabled = false;
            }
        });

        // ----------------------------
        // Botón de Limpiar Formulario
        // ----------------------------
        document.getElementById("clearForm").addEventListener("click", function () {
            employeeForm.reset(); // Limpiar los campos del formulario
            const responseMessage = document.getElementById("responseMessage");
            responseMessage.textContent = ""; // Limpiar mensajes previos
            alert("Formulario limpiado correctamente.");
        });

        // Enfoque automático al primer campo
        document.getElementById("employeeName").focus();
    }

});
// Función para calcular el salario
function calculateSalary() {
    const salary = prompt('Ingresa el salario:');
    const discount = prompt('Ingresa el descuento:');
    if (!salary || !discount) {
        alert('Por favor ingresa ambos valores.');
        return;
    }
    const total = salary - discount;
    alert(`El total después del descuento es: ${total}`);
}

// Función para calcular el total de puntos
function calculateTotalPoints() {
    const point1 = prompt('Ingresa el primer puntaje:');
    const point2 = prompt('Ingresa el segundo puntaje:');
    const point3 = prompt('Ingresa el tercer puntaje:');
    if (!point1 || !point2 || !point3) {
        alert('Por favor ingresa los tres puntajes.');
        return;
    }
    const total = parseFloat(point1) + parseFloat(point2) + parseFloat(point3);
    alert(`El total de los puntajes es: ${total}`);
}

// Función para calcular el porcentaje de un puntaje
function calculatePercentage() {
    const point = prompt('Ingresa el puntaje:');
    if (!point) {
        alert('Por favor ingresa un puntaje.');
        return;
    }
    const percentage = point * 0.15;
    alert(`El 15% del puntaje es: ${percentage}`);
}


// ----------------------------
// Función para navegar entre páginas
// ----------------------------
function navigateTo(url) {
    window.location.href = url;
    }
