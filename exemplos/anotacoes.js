//instar o pacote 
//jsonwebtoken



// Middleware de verificação de JWT
function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId; 
        next();
    });
}








app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await sql.connect(connectDB);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Usuario WHERE login = @username AND senha = @password');

        if (result.recordset.length > 0) {  
            var userId = result.recordset[0].id_usuario;
            // Log de depuração para verificar o ID do usuário
            console.log('ID do usuário:', userId);                    
            //const token = jwt.sign({ userId }, SECRET, { expiresIn: '30s' });
            const token = jwt.sign({ userId }, SECRET, { expiresIn: '300s' });
            res.json({ success: true, token });
            console.log('TOKEN', token);
        } else {
            res.json({ success: false, message: 'Usuário ou senha inválidos' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }    
});











