const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./server/config/db');
const deviceRoutes = require('./server/routes/devices');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ✅ 静的ファイル公開
app.use('/', express.static(path.join(__dirname))); // ← index.html を含む全体ルート
app.use('/estimate', express.static(path.join(__dirname, 'estimate/public')));
app.use('/device-edit', express.static(path.join(__dirname, 'device-edit/public')));
app.use('/todo-dairy', express.static(path.join(__dirname, 'todo-dairy/public')));
app.use('/schedule', express.static(path.join(__dirname, 'schedule/public')));

// ✅ APIルーティング（必要なら）
app.use('/api/devices', deviceRoutes);

module.exports = app;
