import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const result = await prisma.hospitalRequest.findUnique({where:{email:req.body.email}});
    // if(!result){
    //     res.json({approved:'not'})
    //     return;
    // }
    if(result && result.approved == 1){
        res.json({approved:result.approved})
    } else{
        res.json({approved:false})

    }
}