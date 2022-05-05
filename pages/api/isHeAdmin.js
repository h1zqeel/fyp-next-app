import prisma from '../../lib/prisma'

export default async function handle(req, res){
    const result = await prisma.userAdmin.findUnique({where:{email:req.body.email}})
    if(result)
        res.json({admin: true})
    else
        res.json({admin: false})
}

