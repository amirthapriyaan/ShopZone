const express = require('express');
const mobiles = express.Router();
const mongoose = require('mongoose');

// Define the schema for mobiles
const mobileSchema = new mongoose.Schema({
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
   
    internalStorage: {
        type: String,
        required: true
    },
    primaryCamera: {
        type: String,
        required: true
    },
    cameraFeatures: {
        type: String,
        required: true
    },
    flash: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    depth: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
 
});

// Create the model
const Mobile = mongoose.model('Mobile', mobileSchema);

// GET all mobiles
mobiles.get('/mobiles', async (req, res) => {
    try {
        const mobiles = await Mobile.find();
        res.json(mobiles);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving mobiles", error });
    }
});

// POST multiple mobiles
mobiles.post('/mobiles', async (req, res) => {
    try {
        const mobiles = req.body; // Expect an array of mobiles
        
        if (!Array.isArray(mobiles)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of mobiles.' });
        }
        
        // Validate each mobile
        const requiredFields = [
            'id', 'title', 'brand', 'oldPrice', 'newPrice', 'discount', 'image', 
            'description', 'os', 'processorBrand', 'processorType', 'processorCore', 
             'internalStorage', 'primaryCamera', 'cameraFeatures', 
            'flash', 'width', 'height', 'depth', 'weight'
        ];
        
        for (const mobile of mobiles) {
            for (const field of requiredFields) {
                if (!mobile[field]) {
                    return res.status(400).json({ message: `Missing required field in mobile: ${field}` });
                }
            }
        }
        
        // Insert all mobiles
        const result = await Mobile.insertMany(mobiles);
        res.status(201).json({ message: 'Mobiles added', mobiles: result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding mobiles', error });
    }
});

// PUT (update) an existing mobile
mobiles.put('/mobiles/:id', async (req, res) => {
    try {
        const updatedMobile = await Mobile.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedMobile) {
            res.json({ message: 'Mobile updated', mobile: updatedMobile });
        } else {
            res.status(404).json({ message: 'Mobile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating mobile', error });
    }
});

// DELETE a mobile
mobiles.delete('/mobiles/:id', async (req, res) => {
    try {
        const deletedMobile = await Mobile.findOneAndDelete({ id: req.params.id });
        if (deletedMobile) {
            res.json({ message: 'Mobile deleted', mobile: deletedMobile });
        } else {
            res.status(404).json({ message: 'Mobile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mobile', error });
    }
});

module.exports = mobiles;
