const API_URL = 'http://localhost:5000/api/users';

// Stage 1: Input (Load Trigger)
async function loadVaultData() {
    const loader = document.getElementById('loading');
    const list = document.getElementById('userList');
    loader.style.display = 'block';

    try {
        // Stage 2: Process (Asynchronous Fetch Bridge)
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error(`Fetch Failed: ${response.status}`);
        
        const data = await response.json(); // Deserialization

        // Stage 3: Output (DOM Manipulation)
        list.innerHTML = '';
        data.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            // Security: textContent over innerHTML to prevent XSS (Slide 14)
            card.innerHTML = `<h3>${user.name}</h3><p>${user.email} | Age: ${user.age}</p>`;
            list.appendChild(card);
        });
    } catch (error) {
        list.innerHTML = `<p style="color:red">Shield Error: Failed to connect to server nerves.</p>`;
    } finally {
        loader.style.display = 'none'; // UI Cleanup (Slide 15)
    }
}

// POST Integration
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };

    try {
        btn.disabled = true;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            document.getElementById('userForm').reset();
            loadVaultData(); // Refresh system state
        }
    } catch (error) {
        alert("Fatal Error: Connection to the Cognitive Vault lost.");
    } finally {
        btn.disabled = false;
    }
});

loadVaultData();