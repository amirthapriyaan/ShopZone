const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema for laptops
const laptopSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    processorBrand: {
        type: String,
        required: true
    },
    processorType: {
        type: String,
        required: true
    },
    processorCore: {
        type: String,
        required: true
    },
    operatingFrequency: {
        type: String,
        required: true
    },
    internalStorage: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    screenSize: {
        type: String,
        required: true
    },
    resolution: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    }
});

// Create the model
const Laptop = mongoose.model('Laptop', laptopSchema);

// GET all laptops
router.get('/laptops', async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving laptops", error });
    }
});

// POST a new laptop
router.post('/laptops', async (req, res) => {
    try {
        // Validate incoming data
        const requiredFields = ['id', 'title', 'brand', 'oldPrice', 'newPrice', 'discount', 'image', 'description', 'os', 'processorBrand', 'processorType', 'processorCore', 'operatingFrequency', 'internalStorage', 'ram', 'screenSize', 'resolution', 'weight'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Missing required field: ${field} `});
            }
        }

        // Create and save the new laptop
        const newLaptop = new Laptop(req.body);
        await newLaptop.save();
        res.status(201).json({ message: 'Laptop added', laptop: newLaptop });
    } catch (error) {
        res.status(500).json({ message: 'Error adding laptop', error });
    }
});

// PUT (update) an existing laptop
router.put('/laptops/:id', async (req, res) => {
    try {
        const updatedLaptop = await Laptop.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedLaptop) {
            res.json({ message: 'Laptop updated', laptop: updatedLaptop });
        } else {
            res.status(404).json({ message: 'Laptop not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating laptop', error });
    }
});

// DELETE a laptop
router.delete('/laptops/:id', async (req, res) => {
    try {
        const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
        if (deletedLaptop) {
            res.json({ message: 'Laptop deleted', laptop: deletedLaptop });
        } else {
            res.status(404).json({ message: 'Laptop not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting laptop', error });
    }
});

module.exports = router;
