import authenticationDatamapper from '../../datamappers/authentication.datamapper.js'

export default {
    
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await authenticationDatamapper.login(email, password);
            if (!user.email == user.req.body){
                res.status(404).json({message: 'User not found' });
            } 
             res.status(200).json(user);
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}