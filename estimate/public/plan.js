export function PlanInit(){
    // プラン別ボタンにaction付与
    const plan_buttons = document.querySelectorAll('.plan-button');
    plan_buttons.forEach(button=>{
        button.addEventListener('click',()=>{
            plan_buttons.forEach(btn=>btn.classList.remove('active'));
            button.classList.add('active');

            PlanStorageEdit();
        });
    });

    const max_button = document.querySelector('.plan-button.max');
    if(max_button){
        max_button.classList.add('active');
        PlanStorageEdit();
    }
}

// 選択されたプランの容量+料金表示用関数
function PlanStorageEdit(){
    const planOptions = {
        max: [
            {label: "無制限", price: "7,315円"},
        ],
        mini: [
            {label: "1GB", price: "3,465円"},
            {label: "3GB", price: "4,565円"},
            {label: "5GB", price: "5,665円"},
        ],
        ahamo: [
            {label: "30GB", price: "2,970円"},
            {label: "110GB", price: "4,980円"},
        ]
    };
    const plan_storage = document.querySelector('.plan-storage');
    plan_storage.innerHTML = "";

    const active_button = document.querySelector('.plan-button.active');
    if(!active_button) return;

    const planType = [...active_button.classList].find(cls=>planOptions[cls]);
    if(!planType) return;

    // 容量オプションを作成して追加
    planOptions[planType].forEach(option=>{
        const btn = document.createElement('button');
        btn.classList.add('storage-button',planType);
        btn.textContent = `${option.label} (${option.price})`;

        btn.addEventListener('click', ()=>{
            const allStorageButtons = document.querySelectorAll('.storage-button');
            allStorageButtons.forEach(b=>b.classList.remove('active'));

            btn.classList.add('active');
        });

        plan_storage.appendChild(btn);
    });
}