app.get('/api/foods', async (req, res) => {
    try {
      let query = {};
      if (req.query.category) {
        query.category = req.query.category;
      }
      const foods = await Food.find(query);
      res.json(foods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  