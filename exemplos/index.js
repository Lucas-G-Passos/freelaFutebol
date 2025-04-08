       document.getElementById('loginForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao fazer login');
                    
                }

                const data = await response.json();
                const token = data.token;

                // Salvar token no localStorage
                localStorage.setItem('token', token);

                window.location.href = "menu.html";

            } catch (error) {
                console.error('Erro:', error);
                document.getElementById('result').innerHTML = `<p>${error.message}</p>`;
            }
        });
