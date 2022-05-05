import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    const email = req.body.email;
    const result = await prisma.managers.findUnique({where:{email:email}})
    if(result)
        res.json({admin: true})
    else
        res.json({admin: false})
}