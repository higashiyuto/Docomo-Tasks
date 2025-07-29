// DiscountInit.js

import { state } from '../state/state.js'; // stateをインポート

export function DiscountInit() {
    // --- ▼▼▼ 修正点1: 固定価格の割引もpriceMapに追加 ▼▼▼ ---
    // 価格情報を数値で管理
    const priceMap = {
        'family-discount': {
            'ファミリー割 ~2人': 550,
            'ファミリー割 3人以上': 1100,
        },
        // 「ドコモ光・home5G割」の価格を追加
        'wifi-discount': {
            'ドコモ光・home5G割': 1210,
        },
        'dcard-discount': {
            'silver': 220,
            'gold': 550,
            'platinum': 550,
        },
        // 「ドコモでんき割」の価格を追加（現在は0円）
        'electricity-discount': {
            'ドコモでんき割': 110,
        }
    };

    // --- ▼▼▼ 修正点2: querySelectorAllのセレクタを修正 ▼▼▼ ---
    // 割引項目のselectとcheckbox全てを対象にする
    const discountElements = document.querySelectorAll(
        '#family-discount, #wifi-discount, #dcard-discount, #electricity-discount, ' +
        '#family-discount-checkbox, #wifi-discount-checkbox, #dcard-discount-checkbox, #electricity-discount-checkbox'
    );

    const updateDiscountState = (element) => {
        const baseId = element.id.replace('-checkbox', '');
        const select = document.getElementById(baseId);
        const checkbox = document.getElementById(`${baseId}-checkbox`);

        if (!select || !checkbox) return;

        const id = select.id;
        const value = select.value;
        const isApplied = checkbox.checked;

        const discountKey = id.replace('-discount', '');

        // priceMapから割引額を取得するロジックは変更なしでOK
        const amount = priceMap[id]?.[value] || 0;

        const newPlanDiscounts = { ...state.planDiscounts };
        newPlanDiscounts[discountKey] = { applied: isApplied, amount: amount };
        state.planDiscounts = newPlanDiscounts;

        // UIの価格表示は、選択肢がない割引（光割など）でも正しく機能するようにする
        const priceCell = document.getElementById(`${id}-price`);
        if (priceCell) {
            // valueが空でない場合（＝何かが選択されている場合）のみ価格を表示する
            // これにより、ファミリー割などで初期状態が「0円」と正しく表示される
            if (value) {
                priceCell.textContent = `${amount} 円`;
            } else {
                priceCell.textContent = '0 円';
            }
        }
    };

    discountElements.forEach(element => {
        element.addEventListener('change', () => updateDiscountState(element));
    });

    // 初期読み込み時にも各割引の表示を更新する
    document.querySelectorAll('.discount-item select').forEach(select => {
        updateDiscountState(select);
    });
}