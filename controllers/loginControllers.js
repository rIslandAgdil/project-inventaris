// Import PrismaClient dari package @prisma/client
const { PrismaClient } = require("@prisma/client")

// Membuat instance PrismaClient
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


// Controller: REGISTER user baru
const register = async (req, res) => {
    const { username, email, password } = req.body

    // Cek apakah email sudah terdaftar
    const user = await prisma.user.findFirst({
        where: { email }
    })

    if (user) {
        // Jika email sudah ada → kirim error 403
        res.status(403).json({
            data: null, 
            message: "Sorry Email Already Exist", 
            status: "Already Exist"
        })
    } else {
        try {
            // Simpan user baru ke database
            const newUser = await prisma.user.create({
                data: {
                    username, 
                    email, 
                    password: await bcrypt.hash(password, 10)
                }
            })

            // Kirim response sukses
            res.status(201).json({
                data: newUser, 
                message: "User was successfully register", 
                status: "success"
            })
            return
        } catch (err) {
            // Jika ada error saat create user
            res.status(400).json({
                data: null,
                message: err,
                status: "error"
            })
            return
        }
    }
}

// Controller: LOGIN user
const login = async (req, res) => {
    // #swagger.tags = ['User']

    const { email, password } = req.body

    // Cari user berdasarkan email
    const user = await prisma.user.findFirst({
        where: { email }
    })

    // Validasi: user harus ada + password harus cocok
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Username atau Password salah!' })
    }

    res.json({ message: 'Berhasil Login' })
}

// Export fungsi register & login
module.exports = {
  register,
  login
}