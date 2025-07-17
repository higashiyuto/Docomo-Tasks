export function OptionInit(){
    // プラン別ボタンにaction付与
    const option_buttons = document.querySelectorAll('.option-category-button');
    option_buttons.forEach(button=>{
        button.addEventListener('click',()=>{
            option_buttons.forEach(btn=>btn.classList.remove('active'));
            button.classList.add('active');

            OptionEdit();
        });
    });

    const call_button = document.querySelector('.option-category-button.call');
    if(call_button){
        call_button.classList.add('active');
        OptionEdit();
    }
}

// 選択されたプランの容量+料金表示用関数
function OptionEdit(){
    const Options = {
        call: [
            {label: "かけ放題", price: "1,980円"},
            {label: "5分通話無料", price: "880円"},
            {label: "なし", price: "0円"},
        ],
        warranty: [
            {label: "smartあんしん補償", price: "0円"},
            {label: "モバイルe保険", price: "700円"},
            {label: "Apple Care+", price: "1300円"},
        ],
        security: [
            {label: "あんしんセキュリティ(スタンダード)", price: "550円"},
            {label: "あんしんセキュリティ(トータル)", price: "880円"},
            {label: "ウイルスバスター 1台版", price: "770円"},
            {label: "ウイルスバスター 3台版", price: "990円"},
        ],
        pack: [
            {label: "smartあんしんパック", price: "0"},
            {label: "いちおしパック", price: "0"},
        ]
    };
    const option = document.querySelector('.option-edit');
    option.innerHTML = "";

    const active_button = document.querySelector('.option-category-button.active');
    if(!active_button) return;

    const optionType = [...active_button.classList].find(cls=>Options[cls]);
    if(!optionType) return;

    Options[optionType].forEach(opt=>{
        const btn = document.createElement('button');
        btn.classList.add('option-button',optionType);
        btn.textContent = `${opt.label} (${opt.price})`;

        btn.addEventListener('click', ()=>{
            const allOptionButtons = document.querySelectorAll('.option-button');
            allOptionButtons.forEach(b=>b.classList.remove('active'));

            btn.classList.add('active');
        });
        option.appendChild(btn);
    });
}