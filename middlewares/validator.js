const validateTask = (req, res, next) => {
    const {title, description, priority, assignee} = req.body;
    if (!title || !description || !priority || !assignee) {
        return res.status(400).json({ 
            error: "Bad Request",
            message: 'Tüm alanlar zorunludur' });
    }
    // Eğer tüm veriler eksiksizse, geçiş izni verip işlemi Controller'a aktarıyoruz
    next();
};

module.exports = validateTask;