import { state, addObserver } from './state/state.js';

const Options = {
    call: [
        { label: "かけ放題", price: 1980 },
        { label: "5分通話無料", price: 880 },
    ],
    warranty: [
        { label: "smartあんしん補償", price: 0 },
        { label: "モバイルe保険", price: 700},
        { label: "AppleCare+", price: 0 },
    ],
    security: [
        { label: "あんしんセキュリティ(スタンダード)", price: 550 },
        { label: "あんしんセキュリティ(トータル)", price: 880 },
        { label: "ウイルスバスター 1台版", price: 770 },
        { label: "ウイルスバスター 3台版", price: 990 },
    ],
    pack: [
        { label: "smartあんしんパック", price: 0 },
        { label: "いちおしパック", price: 550 },
    ]
};

/**
 * Optionモジュールの初期化
 */
export function OptionInit() {
    createAllOptionButtons();
    registerCategoryTabHandlers();

    // 初期表示として「通話」タブをアクティブにする
    document.querySelector('.option-category-button.call')?.click();
    addObserver(updateSmartWarrantyButton);
}

/**
 * カテゴリタブのクリックイベントを登録
 */
function registerCategoryTabHandlers() {
    const category_buttons = document.querySelectorAll('.option-category-button');
    const option_lists = document.querySelectorAll('.option-list');

    category_buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 全てのタブとリストを非アクティブ化
            category_buttons.forEach(btn => btn.classList.remove('active'));
            option_lists.forEach(list => list.style.display = 'none');

            // クリックされたタブをアクティブ化
            button.classList.add('active');
            // 対応するオプションリストを表示
            const category = [...button.classList].find(cls => Options[cls]);
            document.querySelector(`.option-list[data-category="${category}"]`).style.display = 'flex';
        });
    });
}

function updateSmartWarrantyButton() {
    // ボタンの検索（.option-button と .warranty の両方のクラスを持つものを探す）
    const warrantyButtons = document.querySelectorAll('.option-button.warranty');
    const smartWarrantyButton = [...warrantyButtons].find(btn => btn.textContent.startsWith('smartあんしん補償'));

    if (smartWarrantyButton) {
        // stateから最新の価格を取得
        const newPrice = state.smartWarrantyPrice;
        // 表示を更新
        smartWarrantyButton.textContent = `smartあんしん補償 (${newPrice.toLocaleString()}円)`;
        
        // ▼▼▼ このボタンに紐づくstate更新の価格も最新化する ▼▼▼
        // 古いイベントリスナーを削除し、新しい価格でリスナーを再登録する
        const newButton = smartWarrantyButton.cloneNode(true); // ボタンを複製
        smartWarrantyButton.parentNode.replaceChild(newButton, smartWarrantyButton); // ボタンを入れ替え
        
        newButton.addEventListener('click', () => {
            const container = newButton.closest('.option-list');
            container.querySelectorAll('.option-button').forEach(b => b.classList.remove('active'));
            newButton.classList.add('active');

            const newSelectedOptions = { ...state.selectedOptions, warranty: newPrice };
            state.selectedOptions = newSelectedOptions;
        });
    }
}

/**
 * すべてのオプションボタンを最初に生成する
 */
function createAllOptionButtons() {
    const option_container = document.querySelector('.option-edit');
    option_container.innerHTML = ""; // コンテナをクリア

    // Object.entriesでOptionsの全カテゴリをループ
    Object.entries(Options).forEach(([category, options]) => {
        // カテゴリごとのコンテナを作成
        const listContainer = document.createElement('div');
        listContainer.classList.add('option-list');
        listContainer.dataset.category = category;
        listContainer.style.display = 'none'; // 初期状態は非表示

        // 各オプションボタンを作成
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('option-button', category);
            btn.textContent = `${opt.label} (${opt.price.toLocaleString()}円)`;

            btn.addEventListener('click', () => {
                // 同じカテゴリ内のボタンの選択をすべて解除
                listContainer.querySelectorAll('.option-button').forEach(b => b.classList.remove('active'));
                // クリックされたボタンをアクティブ化
                btn.classList.add('active');

                // stateを更新
                // オブジェクトを一度コピーして、該当カテゴリの料金だけを更新し、stateに再セットする
                const newSelectedOptions = { ...state.selectedOptions, [category]: opt.price };
                state.selectedOptions = newSelectedOptions;
            });
            listContainer.appendChild(btn);
        });
        option_container.appendChild(listContainer);
    });
}