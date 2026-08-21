const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middlewares/logger');
const reportRoutes = require('./routes/reportRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);
app.use('/tasks', taskRoutes);
app.use('/reports', reportRoutes);


app.get('/', (req, res) => {
  res.send('Api Çalışıyor');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});