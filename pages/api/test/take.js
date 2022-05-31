import prisma from '../../../lib/prisma'

export default async function handle(req, res){
    let {email, testResult, patientName, dob, hospital} = req.body;
    let toReturn = {};
    const result = await prisma.users.update({where:{email:email}, data:{remainingTests:{decrement:1}}});
    toReturn.remainingTests = result.remainingTests;
    if(hospital){
        let result = ''
        let severity = '';
        if(testResult === 'No Covid'){
            result = 'No Covid';
            severity = 'NA';
        } else {
            result = 'Covid';
            severity = testResult;
        }
        let {id: hospitalId} = await prisma.hospitalRequest.findUnique({where:{email:email}});
        const saveTest = await prisma.hospitalTest.create({data:{hospitalId, patientName, patientDOB: new Date(dob), result, severity }});
        toReturn.id = saveTest.id;
    }
    else {
        let result = ''
        let severity = '';
        if(testResult === 'No Covid'){
            result = 'No Covid';
            severity = 'NA';
        } else {
            result = 'Covid';
            severity = testResult;
        }

        const saveTest = await prisma.individualTest.create({data:{patientName, patientDOB: new Date(dob), result, severity }});
        toReturn.id = saveTest.id;
    }
    res.json(toReturn);
}

