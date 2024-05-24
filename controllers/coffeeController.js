const Coffee = require("../models/coffeeModel");
const mongoose = require("mongoose");

// get all coffee
const getCoffees = async (req, res) => {
  const coffees = await Coffee.find({}).sort({ createdAt: -1 });
  res.status(200).json(coffees);
};

// get single coffee
const getCoffee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Coffee not found" });
  }
  const coffee = await Coffee.findById(id);
  if (!coffee) {
    return res.status(404).json({ error: "Coffee not found" });
  }
  res.status(200).json(coffee);
};

// create new coffee
const createCoffee = async (req, res) => {
  const { image, name, description, temp, price,  } = req.body;
  // add to database
  try {
    const coffee = await Coffee.create({ image, name, description, temp, price });
    res.status(200).json(coffee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a coffee
const deleteCoffee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Coffee not found" });
  }
  const coffee = await Coffee.findOneAndDelete({ _id: id });
  if (!coffee) {
    return res.status(400).json({ error: "Coffee not found" });
  }
  res.status(200).json(coffee);
};

// update coffee
const updateCoffee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Coffee not found" });
  }

  const coffee = await Coffee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!coffee) {
    return res.status(400).json({ error: "Coffee not found" });
  }
  res.status(200).json(coffee);
};

module.exports = {
  createCoffee,
  getCoffee,
  getCoffees,
  deleteCoffee,
  updateCoffee,
};
