/*
    server.jsの役割
    　・・・ここではサーバの起動のみを行う
 */

//.envファイルを読み込むためのモジュール(dotenv)を読み込む
require('dotenv').config('.env');

//サーバ起動用の設定ファイルであるapp.jsを読み込む
const app = require('./app');

const PORT = process.env.PORT || 3000;

//サーバの起動
app.listen(PORT, () => {
    console.log(`サーバ起動: http://localhost:${process.env.PORT}`);
});