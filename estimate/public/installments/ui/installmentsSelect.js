import { state } from '../../state/state.js';

export function registerInstallmentsSelectHandler(){
    const installments_select = document.getElementById('installments-num');
    if(!installments_select) return;

    installments_select.addEventListener('change', (e)=>{
        const selectedNum = e.target.value;

        // 状態を更新
        state.installmentsNum = selectedNum;
    });
}