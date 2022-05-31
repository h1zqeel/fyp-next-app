import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    let {email} = req.body;
    const {id: hospitalId} = await prisma.hospitalRequest.findUnique({where:{email:email}});
    const allResults = await prisma.hospitalTest.findMany({where:{hospitalId:hospitalId}});


    res.json(allResults);
}

