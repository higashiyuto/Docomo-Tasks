// seeds/seedDevices.js

const mongoose = require('mongoose');
const Device = require('../models/Device.js'); // 適切なパスに修正してください

const path = require('path'); // pathモジュールをインポート
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Atlasに接続成功');
    }catch(err){
        console.log('MongoDB 接続エラー:', err);
        process.exit(1);
    }
};


// --- 投入する端末データ ---
const seedData = [
    {
        name: 'iPhone 16',
        price: 1,
        kaedoki: 145200-91344,
        warranty: 880,
        discount: {
            mnp: 44000,
            new: 0,
            change: 22000,
        }
    },
    {
        name: 'iPhone 16 256GB',
        price: 172810,
        kaedoki: 172810-95040,
        warranty: 880,
        discount: {
            mnp: 0,
            new: 0,
            change: 3300,
        }
    },
    {
        name: 'iPhone 16e',
        price: 118910,
        kaedoki: 118910-75240,
        warranty: 880,
        discount: {
            mnp: 43647,
            new: 0,
            change: 0,
        },
    },
    {
        name: 'iPhone 15',
        price: 118910,
        kaedoki: 118910-74976,
        warranty: 880,
        discount: {
            mnp: 43911,
            new: 11000,
            change: 0,
        },
    },
    {
        name: 'Google Pixel 9a',
        price: 88000,
        kaedoki: 88000-43560,
        warranty: 880,
        discount: {
            mnp: 43560,
            new: 0,
            change: 3300,
        },
    },
    {
        name: 'Google Pixel 9',
        price: 148060,
        kaedoki: 148060-83160,
        warranty: 880,
        discount: {
            mnp: 30129,
            new: 0,
            change: 3300,
        },
    },
    {
        name: 'Google Pixel 8a',
        price: 84480,
        kaedoki: 84480-44616,
        warranty: 880,
        discount: {
            mnp: 39017,
            new: 39017,
            change: 22000,
        },
    },
    {
        name: 'Galaxy S25',
        price: 135740,
        kaedoki: 135740-81840,
        warranty: 880,
        discount: {
            mnp: 11000,
            new: 0,
            change: 14300,
        },
    },
    {
        name: 'Galaxy A36',
        price: 62590,
        kaedoki: 62590-30624,
        warranty: 770,
        discount: {
            mnp: 31295,
            new: 0,
            change: 0,
        },
    },
    {
        name: 'Galaxy A25',
        price: 22000,
        kaedoki: 0,
        warranty: 330,
        discount: {
            mnp: 21999,
            new: 0,
            change: 0,
        },
    },
    {
        name: 'AQUOS wish4',
        price: 22000,
        kaedoki: 0,
        warranty: 330,
        discount: {
            mnp: 21999,
            new: 5499,
            change: 0,
        },
    },
    {
        name: 'AQUOS A55',
        price: 70840,
        kaedoki: 70840-32208,
        warranty: 550,
        discount: {
            mnp: 0,
            new: 0,
            change: 3300,
        },
    },
    {
        name: 'AQUOS sense9',
        price: 67100,
        kaedoki: 67100-23760,
        warranty: 770,
        discount: {
            mnp: 0,
            new: 0,
            change: 3300,
        },
    },
    {
        name: 'Xperia 10 VI',
        price: 62590,
        kaedoki: 62590-29040,
        warranty: 770,
        discount: {
            mnp: 31295,
            new: 0,
            change: 3300,
        },
    },
    {
        name: 'arrows We2',
        price: 22000,
        kaedoki: 0,
        warranty: 330,
        discount: {
            mnp: 21999,
            new: 5499,
            change: 0,
        },
    },
    // --- 他の端末データをここに追加 ---
];

// データベース接続からデータ投入までの一連の処理を行うメイン関数
const importData = async () => {
    // 1. データベースに接続する
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Atlasへの接続に成功しました。');
    } catch (error) {
        console.error('MongoDB 接続エラー:', error);
        process.exit(1); // 接続に失敗したらプロセスを終了
    }

    // 2. データの削除と投入を行う
    try {
        // 既存のデータを全て削除
        await Device.deleteMany({});
        console.log('既存の端末データを全て削除しました。');

        // 新しいデータを一括で投入
        await Device.insertMany(seedData);
        console.log('新しい端末データの投入が完了しました。');

        process.exit(); // 成功したらプロセスを正常に終了

    } catch (error) {
        console.error('データ投入中にエラーが発生しました:', error);
        process.exit(1); // エラーが発生したらプロセスを終了
    }
};

// スクリプトを実行
importData();