const express = require('express');
const router = express.Router();



// GET all items
router.get('/items', (req, res) => {
    res.json(items);
});

// POS Titems
router.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// DELETE an item
router.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

module.exports = router;
