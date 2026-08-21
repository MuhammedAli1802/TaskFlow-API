const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Tüm Görevleri Listeleme, Filtreleme, Arama ve Sayfalama (GET)
const getAllTasks = (req, res) => {
    let tasks = readData(); // Verileri okuduk
    
    // URL'den gelen parametreleri yakalıyoruz (örn: ?status=pending)
    const { status, priority, keyword, sort, page, limit } = req.query;

    // 1. Filtreleme (Durum ve Önceliğe Göre)
    if (status) tasks = tasks.filter(t => t.status === status);
    if (priority) tasks = tasks.filter(t => t.priority === priority);

    // 2. Arama (Başlık veya açıklamada kelime geçiyorsa)
    if (keyword) {
        tasks = tasks.filter(t => 
            t.title.toLowerCase().includes(keyword.toLowerCase()) || 
            t.description.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 3. Sıralama (Oluşturulma tarihine göre yeniden eskiye)
    if (sort === 'createdAt') {
        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // 4. Sayfalama (Örn: sayfa 1, her sayfada 5 kayıt)
    if (page && limit) {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;
        tasks = tasks.slice(startIndex, endIndex);
    }

    // İşlenmiş son veriyi gönderiyoruz
    res.status(200).json(tasks);
};

// Belirli bir Görevi Getirme (GET)
const getTaskById = (req, res) => {
  const tasks = readData();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Görev bulunamadı' });

  res.status(200).json(task);
}

// Yeni Görev Ekleme (POST)
const createTask = (req, res) => {
  const tasks = readData();
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    ...req.body,
    status: req.body.status || 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
};

// Görev Güncelleme (PUT)
const updateTask = (req, res) => {
  const tasks = readData();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Görev bulunamadı' });

  // mevcut verilerle yeni verileri birleştirerek güncelleme yapıyoruz
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  writeData(tasks);
  res.status(200).json(tasks[taskIndex]);
};

// Görev Silme (DELETE)
const deleteTask = (req, res) => {
  const tasks = readData();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Görev bulunamadı' });

  tasks.splice(taskIndex, 1);
  writeData(tasks);
  res.status(200).json({ message: 'Görev silindi' });
};


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};