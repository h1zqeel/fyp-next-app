import axios from 'axios';
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
    const plan = result.plan;
    const user = await prisma.users.findUnique({where:{email:email}});
    let tests = parseInt(user.remainingTests);
    console.log(tests);
    switch(plan){
        case 1:{
            tests +=10;
           await prisma.users.update({where:{email:email}, data:{remainingTests:parseInt(tests)}});
           break;
        }
        case 2:{
            tests +=20;
            await prisma.users.update({where:{email:email}, data:{remainingTests:parseInt(tests)}});
            break;
        }
        case 3:{
            tests +=50;
            await prisma.users.update({where:{email:email}, data:{remainingTests:parseInt(tests)}});
            break;
        }
    }
    res.json(result);
}