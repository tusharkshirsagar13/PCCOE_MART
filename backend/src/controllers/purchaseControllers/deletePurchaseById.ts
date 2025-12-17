import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";


const deletePurchaseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        console.log(id);

        const result = await PurchaseModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Server error while deleting item" });
    }
};

export default deletePurchaseById;
