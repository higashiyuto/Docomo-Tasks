import { state } from '../../state/state.js';

export async function registerContractSelectHandler(){
    const contract_select = document.getElementById('contract-select');
    if(!contract_select) return;

    const discountMap = {
        'MNP': 'mnp',
        '新規': 'new',
        '機種変更': 'change',
    };

    contract_select.addEventListener('change', (e)=>{
        const contractType = e.target.value;
        state.contractType = contractType;

        const discountKey = discountMap[contractType];
        state.currentDiscount = discountKey ? state.discount[discountKey] : 0;
    
        if(state.useDiscount){
            state.useDiscount = false;
            state.useDiscount = true;
        }

        const discountCheckbox = document.getElementById('discount-checkbox');
        const kaedokiCheckbox = document.getElementById('kaedoki-price-checkbox');
        const normalCheckbox = document.getElementById('normal-price-checkbox');

        // 2. UI上のチェックをすべて外す
        if (discountCheckbox) discountCheckbox.checked = false;
        if (kaedokiCheckbox) kaedokiCheckbox.checked = false;
        if (normalCheckbox) normalCheckbox.checked = false;

        // 3. 関連するstateをリセットする
        state.useDiscount = false;
        state.activePaymentPlan = 'none';
    });
}