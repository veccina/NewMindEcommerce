// src/controllers/productController.js
const Product = require('../models/Product');

// CREATE (admin only)
exports.createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const saved = await product.save();
        return res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};

// UPDATED: READ (LIST) with FILTERING & SEARCH
exports.getProducts = async (req, res, next) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;

        // Build a MongoDB filter object
        const filter = {};

        // Category filter
        if (category) {
            filter.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Search in name or description
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const products = await Product.find(filter);
        return res.json(products);
    } catch (error) {
        next(error);
    }
};

// READ (SINGLE)
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        return res.json(product);
    } catch (error) {
        next(error);
    }
};

// UPDATE (admin only)
exports.updateProduct = async (req, res, next) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(updated);
    } catch (error) {
        next(error);
    }
};

// DELETE (admin only)
exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};
