import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

//fungsi untuk menambahkan data seed User
async function seedUser() {
    try {
        const isStudentEmail = await prisma.user.findUnique({where:{email:"test1@test.id"}})
        const isTeacherEmail = await prisma.user.findUnique({where:{email:"teacher@test.id"}})
        if(!isStudentEmail){
            const hashPW = bcrypt.hashSync("test1", 10)
            await prisma.user.create({
                data:{ name: 'test1', email: 'test1@test.id', password:hashPW, role:"STUDENT" },
            })
        }
        if(!isTeacherEmail){
            const hashPW = bcrypt.hashSync("teacher", 10)
            await prisma.user.create({
                data:{ name: 'teacher', email: 'teacher@test.id', password:hashPW, role:"TEACHER" }
            })
        }
        console.log("✅ Seeding Data User selesai telah selesai dibuat)")
    } catch (error) {
        console.error('❌ Gagal seeding User:', error)
        process.exit(1)
    }
}

//fungsi untuk menambahkan semua data seed ke database
async function runSeed() {
    await seedUser()
    await prisma.$disconnect()
    process.exit(0)
}

runSeed()

// seedUser()
//   .then(() => {
//     console.log('Seeding selesai ✅')
//   })
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
