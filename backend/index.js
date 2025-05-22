const express = require("express");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } =require("firebase/auth");
const { initializeApp } =require( "firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyB8dSyLSNxRlvhX8PsTQbNEK0ie6XaXn5g",
    authDomain: "login-edya2.firebaseapp.com",
    projectId: "login-edya2",
    storageBucket: "login-edya2.appspot.com",
    messagingSenderId: "89246934117",
    appId: "1:89246934117:web:dff88b4c669c053289128c"
  };
const appfirebase = initializeApp(firebaseConfig);
  
const auth = getAuth(appfirebase);
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
});

app.get("/", (req, res) => {
    res.send("¡Servidor en Node.js con Express!");
});

app.post("/crear", async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        if (!correo || !contraseña) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const user = userCredential.user;
        const token = await user.getIdToken(); 

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                uid: user.uid,
                email: user.email,
                token: token,
            },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/usuario", async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        if (!correo || !contraseña) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        
        console.log("Autenticando...");
        console.log(`Correo: ${correo}, Contraseña: ${contraseña}`);

        const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
        const user = userCredential.user;
        const token = await user.getIdToken(); 
        
        res.status(200).json({
            message: "Usuario autenticado exitosamente",
            user: {
                uid: user.uid,
                email: user.email,
                token: token,
            },
        });
    } catch (error) {
        res.status(401).json({ error: "El correo o la contraseña son incorrectos" });
    }
});