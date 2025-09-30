//require config database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//tambahkan barang
exports.createRuangan = async (req, res) => {
    try {
        const { nama_ruangan } = req.body;
        const ruangan = await prisma.ruangan.create({
            data: { nama_ruangan }, 
        });
         res.json({ message : 'Barang berhasil ditambahkan', ruangan});
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};

//read - semua barang
exports.getAllRuangan = async (req, res) => {
    try {
        const ruangan = await prisma.ruangan.findMany(); //{ include: { ruangan: true } } 
        res.json(ruangan);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
 
};

exports.updateRuangan = async (req, res) => {
    try {
        const { id } = req.params;
        const {nama_ruangan} = req.body;
        const ruangan = await prisma.ruangan.update({
            where : { id : Number(id)},
            data : {nama_ruangan}
        });
        res.json({message : 'Data Barang Berhasil diupdate', ruangan});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};


exports.deleteRuangan = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.ruangan.delete ({where : { id : Number(id)}});
        res.json({message : "Barang Berhasil Dihapus"});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};