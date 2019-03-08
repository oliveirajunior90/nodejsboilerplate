const bcrypt = require("bcryptjs");
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('User', () => {
    
    beforeEach( async() => {
        await truncate()
    })
    
    it('should encrypt user password', async()=> {

        const user = await factory.create('Usuario', {
            password: '123456789'
        })
                
        const compareHash = await bcrypt.compare("123456789", user.password_hash);
    
        expect(compareHash).toBe(true)

    })

})