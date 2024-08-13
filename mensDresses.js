const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema for mensDresses
const mensDressSchema = new mongoose.Schema({
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
    size: {
        type: String,
        required: true
    },
    image: {
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
    description: {
        type: String,
        required: true
    }
});

// Create the model
const MensDress = mongoose.model('MensDress', mensDressSchema);

// GET all mensDresses
router.get('/mensDresses', async (req, res) => {
    try {
        const mensDresses = await MensDress.find();
        res.json(mensDresses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving mensDresses", error });
    }
});

// POST multiple mensDresses
router.post('/mensDresses', async (req, res) => {
    try {
        const mensDresses = req.body; // Expect an array of mensDresses
        
        if (!Array.isArray(mensDresses)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of mensDresses.' });
        }
        
        // Validate each mensDress
        const requiredFields = ['id', 'title', 'brand', 'size', 'image', 'oldPrice', 'newPrice', 'discount', 'description'];
        for (const mensDress of mensDresses) {
            for (const field of requiredFields) {
                if (!mensDress[field]) {
                    return res.status(400).json({ message: `Missing required field in mensDress: ${field}` });
                }
            }
        }
        
        // Insert all mensDresses
        const result = await MensDress.insertMany(mensDresses);
        res.status(201).json({ message: 'MensDresses added', mensDresses: result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding mensDresses', error });
    }
});

// PUT (update) an existing mensDress
router.put('/mensDresses/:id', async (req, res) => {
    try {
        const updatedMensDress = await MensDress.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedMensDress) {
            res.json({ message: 'MensDress updated', mensDress: updatedMensDress });
        } else {
            res.status(404).json({ message: 'MensDress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating mensDress', error });
    }
});

// DELETE a mensDress
router.delete('/mensDresses/:id', async (req, res) => {
    try {
        const deletedMensDress = await MensDress.findByIdAndDelete(req.params.id);
        if (deletedMensDress) {
            res.json({ message: 'MensDress deleted', mensDress: deletedMensDress });
        } else {
            res.status(404).json({ message: 'MensDress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mensDress', error });
    }
});

module.exports = router;
