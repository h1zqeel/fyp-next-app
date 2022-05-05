import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    const email = req.body.email;
    const result = await prisma.userAdmin.create({data:{email:email}});
    res.json(result);
    

}