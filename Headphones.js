const express = require('express');
const headphones = express.Router();
const mongoose = require('mongoose');

// Define the schema for headphones
const headphoneSchema = new mongoose.Schema({
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
    rating: {
        type: String,
        required: true
    }
});

// Create the model
const Headphone = mongoose.model('Headphone', headphoneSchema);

// GET all headphones
headphones.get('/headphones', async (req, res) => {
    try {
        const headphones = await Headphone.find();
        res.json(headphones);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving headphones", error });
    }
});

// POST multiple headphones
headphones.post('/headphones', async (req, res) => {
    try {
        const headphones = req.body; // Expect an array of headphones
        
        if (!Array.isArray(headphones)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of headphones.' });
        }
        
        // Validate each headphone
        const requiredFields = ['id', 'title', 'brand', 'oldPrice', 'newPrice', 'discount', 'image', 'description', 'os', 'processorBrand', 'processorType', 'processorCore', 'operatingFrequency', 'internalStorage', 'primaryCamera', 'cameraFeatures', 'flash', 'width', 'height', 'depth', 'weight','rating'];
        for (const headphone of headphones) {
            for (const field of requiredFields) {
                if (!headphone[field]) {
                    return res.status(400).json({ message: `Missing required field in headphone: ${field}` });
                }
            }
        }
        
        // Insert all headphones
        const result = await Headphone.insertMany(headphones);
        res.status(201).json({ message: 'Headphones added', headphones: result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding headphones', error });
    }
});

// PUT (update) an existing headphone
headphones.put('/headphones/:id', async (req, res) => {
    try {
        const updatedHeadphone = await Headphone.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedHeadphone) {
            res.json({ message: 'Headphone updated', headphone: updatedHeadphone });
        } else {
            res.status(404).json({ message: 'Headphone not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating headphone', error });
    }
});

// DELETE a headphone
headphones.delete('/headphones/:id', async (req, res) => {
    try {
        const deletedHeadphone = await Headphone.findOneAndDelete({ id: req.params.id });
        if (deletedHeadphone) {
            res.json({ message: 'Headphone deleted', headphone: deletedHeadphone });
        } else {
            res.status(404).json({ message: 'Headphone not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting headphone', error });
    }
});

module.exports = headphones;
