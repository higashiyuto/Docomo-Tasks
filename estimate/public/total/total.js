// public/js/total.js

// ファイルの先頭部分を修正
import { state, addObserver } from '../state/state.js';
import { renderTotal } from './ui/renderTotal.js';

// ... renderTotal 関数の定義は変更なし ...

/**
 * Totalモジュールの初期化
 */
export function TotalInit() {
    // stateの監視対象（Observer）にrenderTotal関数を登録
    addObserver(renderTotal);
    // 初期表示
    renderTotal();
}