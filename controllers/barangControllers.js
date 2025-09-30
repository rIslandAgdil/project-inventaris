//require config database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//tambahkan barang
exports.createBarang = async (req, res) => {
    try {
        const { nama_barang, kode_inventaris, jumlah, kondisi, ruanganId, userId } = req.body;
        const barang = await prisma.barang.create({
            data: { nama_barang, kode_inventaris, jumlah, kondisi, ruanganId, userId}, 
        });
         res.json({ message : 'Barang berhasil ditambahkan', barang});
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};

//read - semua barang
exports.getBarang = async (req, res) => {
    try {
        const barang = await prisma.barang.findMany(); //{ include: { ruangan: true } } 
        res.json(barang);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
 
};

//read barang by id - buat coba aja sih - bagusnya kembangkan ke fitur search
exports.getBarangBy = async (req, res) => {
    try {
       const {id} = req.params;
       const barang = await prisma.barang.findUnique({
        where : {id:Number(id)},
       });
       if (!barang) return res.status(404).json({message : 'Barang tidak ditemukan'});
       res.json(barang);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.updateBarang = async (req, res) => {
    try {
        const { id } = req.params;
        const {nama_barang, jumlah, kondisi, ruanganId} = req.body;
        const barang = await prisma.barang.update({
            where : { id : Number(id)},
            data : {nama_barang, jumlah, kondisi, ruanganId}
        });
        res.json({message : 'Data Barang Berhasil diupdate', barang});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};


exports.deleteBarang = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.barang.delete ({where : { id : Number(id)}});
        res.json({message : "Barang Berhasil Dihapus"});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};