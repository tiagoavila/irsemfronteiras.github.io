const SHEETDB_URL = "https://sheetdb.io/api/v1/71iry3q44vwtd"; // replace with your SheetDB API URL

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const now = new Date().toISOString();
    data.DataCadastro = now;

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
    } catch (err) {
        console.error("Erro ao enviar o formulário:", err);
        alert("⚠️ Erro de conexão.");
    }
});