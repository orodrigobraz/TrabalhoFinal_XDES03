require("dotenv").config();
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();
app.use(express.json());
app.use(cors());
app.listen(3000, () =>{

    console.log("Servidor ouvindo na porta 3000!!!");
});

const User = require('./model/User');
const Livro = require('./model/Livro');


app.post('/login', async (req,res) => {

    const {usuario, senha} = req.body; 
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    for (let user of usuariosCadastrados){
        if(user.usuario === usuario){
            const senhaValidada = await bcrypt.compare(senha, user.senha);
            if(senhaValidada){ 
                
                const token = jwt.sign({ userId: user.id, usuario: user.usuario }, process.env.TOKEN);
                
                return res.json({ "token" : token});
            }
            
            else
                return res.status(422).send(`Usuario ou senhas incorretas.`);
        }   
    }

});

app.post('/criar', async (req,res) => {
    const {usuario, email, senha, confirmasenha} = req.body; 
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    const usuarioExistente = usuariosCadastrados.find(user => user.usuario === usuario);
    const emailExistente = usuariosCadastrados.find(user => user.email === email);

    if (!usuario || !senha || !email || !confirmasenha) {
        return res.status(409).send(`Você deve preencher todos os campos..`);
    }

    if (usuarioExistente) {
        return res.status(409).send(`Usuário ${usuario} já foi cadastrado.`);
    }

    if (emailExistente) {
        return res.status(409).send(`E-mail ${email} já foi cadastrado.`);
    }

    if (senha.length < 4) {
        return res.status(409).send(`A senha deve conter pelo menos 4 dígitos, tente novamente.`);
    }

    if(confirmasenha !== senha){
        return res.status(409).send(`As senhas não são iguais, tente novamente..`);
    }

    const id = usuariosCadastrados.length + 1;

    const salt = await bcrypt.genSalt(10);

    const senhaCripto = await bcrypt.hash(senha,salt);

    const user = new User(id, usuario, email, senhaCripto);

    usuariosCadastrados.push(user);
    fs.writeFileSync(jsonPath,JSON.stringify(usuariosCadastrados,null,2));
    res.send(`Tudo certo usuario criado com sucesso.`);
});

app.post('/postar', upload.none(), async (req,res) => {
    console.log("Corpo da solicitação: ", req.body);
    const {titulo, autor, editora, pagnum, img} = req.body; 
    const jsonPath = path.join(__dirname, '.', 'db', 'livros.json');
    const livrosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    const livroExistente = livrosCadastrados.find(livro => livro.titulo === titulo);
    

    if (!titulo || !autor || !editora || !pagnum || !img) {
        console.log("ERRO 1");

        return res.status(409).send(`Você deve preencher todos os campos..`);
    }


    if (livroExistente) {
        console.log("ERRO 2");

        return res.status(409).send(`Livro ${titulo} já foi cadastrado.`);
        }

    const id = livrosCadastrados.length + 1;
    const imgBase64 = Buffer.from(img).toString('base64');
    const livro = new Livro(id, titulo, autor, editora, pagnum, imgBase64);

    livrosCadastrados.push(livro);
    fs.writeFileSync(jsonPath,JSON.stringify(livrosCadastrados,null,2));
    res.send(`Tudo certo, livro cadastrado com sucesso!!`);
});


