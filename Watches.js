const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema for watches
const watchSchema = new mongoose.Schema({
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
        type: String
    },
    flash: {
        type: String
    },
    width: {
        type: String
    },
    height: {
        type: String
    },
    depth: {
        type: String
    },
    weight: {
        type: String,
        required: true
    }
});

// Create the model
const Watch = mongoose.model('Watch', watchSchema);

// GET all watches
router.get('/watches', async (req, res) => {
    try {
        const watches = await Watch.find();
        res.json(watches);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving watches", error });
    }
});

// POST multiple watches
router.post('/watches', async (req, res) => {
    try {
        const watches = req.body; // Expect an array of watches
        
        if (!Array.isArray(watches)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of watches.' });
        }
        
        // Validate each watch
        const requiredFields = ['id', 'title', 'brand', 'oldPrice', 'newPrice', 'discount', 'image', 'description', 'os', 'processorBrand', 'processorType', 'processorCore', 'internalStorage', 'primaryCamera', 'weight'];
        for (const watch of watches) {
            for (const field of requiredFields) {
                if (!watch[field]) {
                    return res.status(400).json({ message: `Missing required field in watch: ${field}` });
                }
            }
        }
        
        // Insert all watches
        const result = await Watch.insertMany(watches);
        res.status(201).json({ message: 'Watches added', watches: result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding watches', error });
    }
});

// PUT (update) an existing watch
router.put('/watches/:id', async (req, res) => {
    try {
        const updatedWatch = await Watch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedWatch) {
            res.json({ message: 'Watch updated', watch: updatedWatch });
        } else {
            res.status(404).json({ message: 'Watch not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating watch', error });
    }
});

// DELETE a watch
router.delete('/watches/:id', async (req, res) => {
    try {
        const deletedWatch = await Watch.findByIdAndDelete(req.params.id);
        if (deletedWatch) {
            res.json({ message: 'Watch deleted', watch: deletedWatch });
        } else {
            res.status(404).json({ message: 'Watch not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting watch', error });
    }
});

module.exports = router;
