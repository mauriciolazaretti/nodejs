import * as bcrypt from 'bcrypt';
import { ErrorCustom } from '../../errors/error-custom.js';
class UserService{
    constructor(userModel){
        this.userModel = userModel;
    }

    async getAll(){
        return this.userModel.findAll();
    }

    async create({name,password,email}){
        const salt_rounds = 10;
        const pwd = await bcrypt.hash(password,salt_rounds);
        const {count} = await this.userModel.findAndCountAll({
            where: {
                email: email
            }
        });
        if(count){
            throw new ErrorCustom({
                status: 400,
                error: 'e-mail inválido'
              });
        }
        return  this.userModel.create({name, email, password: pwd});
    }

    async delete(id){
        const user = await this.userModel.findByPk(id);
        await user.destroy();
    }
}

export {UserService};