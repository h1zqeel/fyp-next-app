import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    const email = req.body.email;
    let result = await prisma.users.findUnique({where:{email:email}});
    res.json({remaining:result.remainingTests});
}