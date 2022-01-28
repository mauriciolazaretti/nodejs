class GetUserController{
    constructor(userService){
        this.userService = userService;
    }

    async execute(req,res){
        const users = await this.userService.getAll();
        return res.status(200).send(users);
    }
}

export {GetUserController};