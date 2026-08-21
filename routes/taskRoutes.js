const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateTask = require('../middlewares/validator');


// GET Rotaları (Doğrulama gerektirmez, sadece okuma yapar)
// Tüm Görevleri Listeleme (GET)
router.get('/', taskController.getAllTasks);

// Belirli bir Görevi Getirme (GET)
router.get('/:id', taskController.getTaskById);

// Görev Silme (DELETE)
router.delete('/:id', taskController.deleteTask);


// POST ve PUT Rotaları (Doğrulama Gerektirir) (Araya 'validateTask' middleware'ini ekledik)
// İstek geldiğinde önce validateTask çalışacak, onay verirse taskController'a geçecek
// Yeni Görev Ekleme (POST)
router.post('/', validateTask, taskController.createTask);

// Görev Güncelleme (PUT)
router.put('/:id', validateTask, taskController.updateTask);

module.exports = router;