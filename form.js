const SHEETDB_URL = "https://sheetdb.io/api/v1/71iry3q44vwtd"; // replace with your SheetDB API URL

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value) {
        // If honeypot is filled, it's likely a bot
        e.preventDefault();
        return;
    }

    // Basic email validation
    const emailInput = document.getElementById('email-input');
    const email = emailInput ? emailInput.value.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        e.preventDefault();
        alert('Por favor, insira um e-mail válido.');
        emailInput && emailInput.focus();
        return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const now = new Date().toISOString();
    data.DataCadastro = now;
    
    const btnSubmit = document.getElementById('submit-btn');
    const nameInput = document.querySelector('input[name="Nome"]');
    const emailInputField = document.querySelector('input[name="Email"]');

    disableForm(btnSubmit, nameInput, emailInputField);

    try {
        const response = await fetch(SHEETDB_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: [data] }) // SheetDB expects { "data": [ ... ] }
        });

        if (response.ok) {
            alert("✅ Obrigado! Suas informações foram salvas.");
            e.target.reset();
        } else {
            alert("⚠️ Falha ao salvar os dados. Tente novamente mais tarde.");
        }

        enableForm(btnSubmit, nameInput, emailInputField);
    } catch (err) {
        console.error("Erro ao enviar o formulário:", err);
        alert("⚠️ Erro de conexão.");
    }
});

// Smooth scroll for 'Entrar na lista de espera' button
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a.btn[href="#formulario"]').forEach(function(scrollBtn) {
        scrollBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.getElementById('formulario');
            if (target) {
                // Custom slow scroll
                var targetY = target.getBoundingClientRect().top + window.pageYOffset;
                var startY = window.pageYOffset;
                var distance = targetY - startY;
                var duration = 1200; // ms (slower)
                var startTime = null;

                function animateScroll(currentTime) {
                    if (!startTime) startTime = currentTime;
                    var timeElapsed = currentTime - startTime;
                    var progress = Math.min(timeElapsed / duration, 1);
                    var ease = progress < 0.5
                        ? 2 * progress * progress
                        : -1 + (4 - 2 * progress) * progress;
                    window.scrollTo(0, startY + distance * ease);
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                requestAnimationFrame(animateScroll);
            }
        });
    });
});

function disableForm(btnSubmit, nameInput, emailInputField) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";
    btnSubmit.style.cursor = "not-allowed";
    btnSubmit.style.opacity = "0.6";
    if (nameInput) nameInput.disabled = true;
    if (emailInputField) emailInputField.disabled = true;
}

function enableForm(btnSubmit, nameInput, emailInputField) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Entrar na lista de espera";
    btnSubmit.style.cursor = "pointer";
    btnSubmit.style.opacity = "1";
    nameInput && (nameInput.disabled = false);
    emailInputField && (emailInputField.disabled = false);
}
