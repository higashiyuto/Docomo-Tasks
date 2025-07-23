// public/js/total.js

import { state } from '../../state/state.js';

/**
 * 合計金額表示を更新する関数
 */
export function renderTotal() {
    const totalContainer = document.querySelector('.total-container');
    if (!totalContainer) return;

    // stateから合計金額を取得し、日本円の形式にフォーマットして表示
    const formattedTotal = state.total.toLocaleString();
    totalContainer.textContent = `合計 ${formattedTotal} 円`;
}

/**
 * Totalモジュールの初期化
 * stateの監視対象（Observer）にrenderTotal関数を登録する
 */
export function TotalInit() {
    // 最初に一度表示を更新
    renderTotal();
}