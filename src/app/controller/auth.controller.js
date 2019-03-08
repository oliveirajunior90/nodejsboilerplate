const { Usuario } = require('../models')

exports.authenticate = async(req, res, next) => {

    try {

        const { email , senha } = req.body
        
        const user = await Usuario.findOne({ where : {email}})
        
        if(!user) return res.status(401).send('Usuário não encontrado')
        
        if(!(await user.checkPassword(senha))) return res.status(401).send('Senha Invalida')
        
        res.status(200).send({
            token: user.generateAccessToken(),
            data : {
                usuario : user.nome,
                email: user.email,
                profile: user.fotoPerfil 
            }
        })

    } catch(e) {

        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });

    }
}