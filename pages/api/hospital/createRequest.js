import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { name,
    email,
    hospitalName,
    hospitalEmail,
    plan,
    phone,
    hospitalPhone,
    why } = req.body
  const result = await prisma.hospitalRequest.create({
    data: {
        name:name,
        email: email,
        hospitalName: hospitalName,
        hospitalEmail: hospitalEmail,
        plan: plan,
        phone: phone,
        hospitalPhone: hospitalPhone,
        why:why
    },
  })
  res.json(result)
}
