async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const message = input.value.trim();

    if (!message) return;

    chatBox.innerHTML += `<div><strong>Vous :</strong> ${message}</div>`;
    input.value = '';

    try {
        const response = await fetch('/api/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        chatBox.innerHTML += `<div><strong>IA :</strong> ${data.reply}</div>`;
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<div><strong>Erreur :</strong> ${error.message || 'Problème de connexion.'}</div>`;
    }
}