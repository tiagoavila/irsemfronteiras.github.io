const scriptURL = "https://script.google.com/macros/s/AKfycbya6jYf1eacYdz5EZQDhP1yQ89nWi1st8da_CD1I-x-8oTzuboGFSWx3uW_rMSYdl5ITw/exec"; // from Apps Script

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // If honeypot is filled, skip
    if (data.hp_field) {
        console.warn("Bot detected, ignoring submission.");
        return;
    }

    const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

        if (result.status === "success") {
            alert("✅ Obrigado! Suas informações foram salvas.");
            e.target.reset();
        } else if (result.status === "error" && result.reason === "invalid_email") {
            alert("❌ Por favor, insira um endereço de e-mail válido.");
        } else if (result.status === "ignored") {
            console.warn("Envio de bot ignorado.");
        } else {
            alert("⚠️ Algo deu errado. Por favor, tente novamente mais tarde.");
        }
});