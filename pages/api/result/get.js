import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    let {id, hospital} = req.body;
    let toReturn = {};
    if(hospital){
      let result = await prisma.hospitalTest.findUnique({where:{id:parseInt(id)}});
        toReturn.name = result.patientName;
        toReturn.dob = result.patientDOB;
        toReturn.result = result.result;
        toReturn.severity = result.severity;
    }
    else {
        let result = await prisma.individualTest.findUnique({where:{id:parseInt(id)}});
        toReturn.name = result.patientName;
        toReturn.dob = result.patientDOB;
        toReturn.result = result.result;
        toReturn.severity = result.severity;
    }
    res.json(toReturn);
}

