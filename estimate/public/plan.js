import { state } from './state/state.js'; // ◀◀◀ stateをインポート

const planOptions = {
    max: [
        // priceの値を文字列から数値に変更
        { label: "~1GB", price: 5698 },
        { label: "1GB~3GB", price: 6798 },
        { label: "無制限", price: 8448 },
    ],
    mini: [
        { label: "4GB", price: 2750 },
        { label: "10GB", price: 3850},
    ],
    ahamo: [
        { label: "20GB", price: 2970 },
        { label: "100GB", price: 4950 },
    ]
};

export function PlanInit() {
    const plan_buttons = document.querySelectorAll('.plan-button');
    plan_buttons.forEach(button => {
        button.addEventListener('click', () => {
            plan_buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            PlanStorageEdit();
        });
    });

    const max_button = document.querySelector('.plan-button.max');
    if (max_button) {
        max_button.classList.add('active');
        PlanStorageEdit();
    }
}

function PlanStorageEdit() {
    const plan_storage = document.querySelector('.plan-storage');
    plan_storage.innerHTML = "";

    const active_button = document.querySelector('.plan-button.active');
    if (!active_button) return;

    const planType = [...active_button.classList].find(cls => planOptions[cls]);
    if (!planType) return;

    planOptions[planType].forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('storage-button', planType);
        // toLocaleString() で3桁区切りにする
        btn.textContent = `${option.label} (${option.price.toLocaleString()}円)`;

        btn.addEventListener('click', () => {
            const allStorageButtons = document.querySelectorAll('.storage-button');
            allStorageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // ▼▼▼ stateを更新 ▼▼▼
            state.basePlanPrice = option.price;
        });
        plan_storage.appendChild(btn);
    });
}