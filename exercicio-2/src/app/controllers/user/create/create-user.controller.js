

class CreateUserController{
    constructor(userService){
        this.userService = userService;
    }

    async execute(req,res){
        const {body} = req;
        const {name, email, password} = body;
        
        const user = await this.userService.create({name, email,password});
        console.log(user);
        return res.status(201).send(user);
    }
}

export {CreateUserController};