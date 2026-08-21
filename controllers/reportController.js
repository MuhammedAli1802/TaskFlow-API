const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Toplam görev sayısı
const getTotalCounts = (req, res) => {
    const tasks = readData();
    res.status(200).json({ count: tasks.length });
}

// Tamamlanan görev sayısı
const getCompletedCounts = (req, res) => {
    const tasks = readData();
    const completedTasks = tasks.filter(t => t.status === 'completed');
    res.status(200).json({ count: completedTasks.length });
}

// Bekleyen görev sayısı
const getPendingCounts = (req, res) => {
    const tasks = readData();
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    res.status(200).json({ count: pendingTasks.length });
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

// Yüksek öncelikli görev sayısı
const getHighPriorityCounts = (req, res) => {
    const tasks = readData();
    const highPriorityTasks = tasks.filter(t => t.priority === 'high');
    res.status(200).json({ count: highPriorityTasks.length });
}

// Devam eden görev sayısı
const getInProgressCounts = (req, res) => {
    const tasks = readData();
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    res.status(200).json({ count: inProgressTasks.length });
}

module.exports = {
    getCompletedCounts,
    getPendingCounts,
    getSystemSummary,
    getTotalCounts,
    getHighPriorityCounts,
    getInProgressCounts
};
