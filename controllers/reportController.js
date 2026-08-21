const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Tamamlanan görev sayısı
const getCompletedTasks = (req, res) => {
    const tasks = readData();
    const completedTasks = tasks.filter(t => t.status === 'completed');
    res.status(200).json(completedTasks.length > 0 ? completedTasks : { message: 'Tamamlanmış görev bulunamadı' });
}

// Bekleyen görev sayısı
const getPendingTasks = (req, res) => {
    const tasks = readData();
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    res.status(200).json(pendingTasks.length > 0 ? pendingTasks : { message: 'Bekleyen görev bulunamadı' });
}

// Genel Sistem özeti
const getSystemSummary = (req, res) => {
    const tasks = readData();

    const summary = {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed').length,
        pendingTasks: tasks.filter(t => t.status === 'pending').length,
        highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
        inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    };
    res.status(200).json(summary);
}

module.exports = {
    getCompletedTasks,
    getPendingTasks,
    getSystemSummary
};
