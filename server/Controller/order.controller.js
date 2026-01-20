const OrderModel = require("../Model/order.model");

const OrderController = {
    getAll: async (req, res) => {
        try {
            const orders = await OrderModel.find().sort({ createdAt: -1 });
            res.status(200).send(orders);
        } catch (error) {
            res.status(500).json({ message: "Sifarişlər gətirilərkən xəta baş verdi" });
        }
    },

    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const found = await OrderModel.findById(id);
            
            if (!found) {
                return res.status(404).send("Sifariş tapılmadı");
            }
            res.status(200).send(found);
        } catch (error) {
            res.status(404).send("Yanlış ID formatı");
        }
    },

    post: async (req, res) => {
        try {
            const newOrder = new OrderModel({ ...req.body });
            await newOrder.save();
            res.status(201).send(newOrder);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await OrderModel.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).send("Silinəcək sifariş tapılmadı");
            }
            res.status(200).send("Sifariş uğurla silindi");
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await OrderModel.findByIdAndUpdate(
                id, 
                { ...req.body }, 
                { new: true } 
            );
            res.status(200).send(updated);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = OrderController;