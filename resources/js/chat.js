async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    if (!input.value.trim()) return;

    // Afficher le message de l'utilisateur
    chatBox.innerHTML += `<div><strong>Vous :</strong> ${input.value}</div>`;
    const userMessage = input.value;
    input.value = '';

    // Appeler l'API Laravel via la route nommée
    const response = await fetch('/chat/send', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content 
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div><strong>IA :</strong> ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}