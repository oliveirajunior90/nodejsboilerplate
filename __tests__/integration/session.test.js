const truncate = require('../utils/truncate')
const request = require('supertest')
const app = require('../../src/app')
const factory = require('../factories')


describe('Authentication', () => {

    beforeEach( async() => {
        await truncate()
    })
    
    it('should authenticated with valid credentials', async() => {

        const user = await factory.create('Usuario', {
            password: '123456789'
        })

        const response = await request(app)
            .post('/authenticate')
            .send({
                email: user.email,
                senha: '123456789'
            })

        expect(response.status).toBe(200)    

    })
    

    it('should not authenticated with invalid credentials', async() => {
    
        const user = await factory.create('Usuario', {
            password: '123456789'
        })

        const response = await request(app)
            .post('/authenticate')
            .send({
                email: user.email,
                senha: '123456789123'
            })

        expect(response.status).toBe(401)    

    })

    it("should return jwt token when authenticated", async () => {

        const user = await factory.create('Usuario', {
            password: '123456789'
        })

        const response = await request(app)
            .post('/authenticate')
            .send({
                email: user.email,
                senha: '123456789'
            })
            
        expect(response.body).toHaveProperty("token")

    })
  
    it("should be able to access private routes when authenticated", async() => {

        const user = await factory.create('Usuario', {
            password: '123456789'
        })

        const accessToken = user.generateAccessToken()

        const response = await request(app)
            .get('/painel')
            .set('x-access-token', accessToken)

        expect(response.status).toBe(200)  

    })

    it("should not be able to access private routes when authenticated", async() => {

        const response = await request(app).get('/painel')
            
        expect(response.status).toBe(401)   
        
    })

})
