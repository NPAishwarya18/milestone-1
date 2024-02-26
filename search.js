foodSchema.index({ name: 'text' });

app.get('/api/foods/search', async (req, res) => {
  try {
    const query = req.query.q;
    const foods = await Food.find({ $text: { $search: query } });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
