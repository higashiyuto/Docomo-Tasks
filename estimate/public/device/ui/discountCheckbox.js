import { state } from '../../state/state.js';

export function registerDiscountCheckHandler(){
    const discount_checkbox = document.getElementById('discount-checkbox');

    discount_checkbox.addEventListener('click', ()=>{
        state.useDiscount = discount_checkbox.checked;
    });
}