class DeleteUserController{
    constructor(userService){
        this.userService = userService;
    }

    async execute(req,res){
        await this.userService.delete(req.body.id);
        return res.status(200).send('');
    }
}

export {DeleteUserController};