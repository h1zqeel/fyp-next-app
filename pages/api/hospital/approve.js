import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    const email = req.body.email;
    const result = await prisma.hospitalRequest.update({
        where:{
            email:email
        },
        data:{
            approved:1
        }
    });
    res.json(result);
    

}