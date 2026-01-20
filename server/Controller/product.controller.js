const ProductModel = require("../Model/product.model");

const ProductController = {
    getAll: async (req, res) => {
        try {
            const target = await ProductModel.find()
                .populate("categoryId")
                .populate("tags");
            res.status(200).send(target);
        } catch (error) {
            res.status(500).json({ message: "Məhsullar gətirilərkən xəta baş verdi" });
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const found = await ProductModel.findById(id)
                .populate("categoryId")
                .populate("tags");
            
            if (!found) {
                return res.status(404).send("Məhsul tapılmadı");
            }
            res.status(200).send(found);
        } catch (error) {
            res.status(404).send("Yanlış ID formatı");
        }
    },
    post: async (req, res) => {
        try {
            // Artıq bu funksiya isAdmin tərəfindən qorunur
            const newProduct = new ProductModel({ ...req.body });
            await newProduct.save();
            res.status(201).send(newProduct);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await ProductModel.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).send("Silinəcək məhsul tapılmadı");
            }
            res.status(200).send("Məhsul uğurla silindi");
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await ProductModel.findByIdAndUpdate(
                id, 
                { ...req.body }, 
                { new: true } // Bu parametr yenilənmiş məlumatın geri qayıtmasını təmin edir
            );
            res.status(200).send(updated);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = ProductController;