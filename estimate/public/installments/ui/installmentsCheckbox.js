import { state } from '../../state/state.js';

export function registerInstallmentsCheckHandler() {
    const kaedoki_checkbox = document.getElementById('kaedoki-price-checkbox');
    const normal_checkbox = document.getElementById('normal-price-checkbox');

    // kaedokiチェックボックスの処理
    kaedoki_checkbox.addEventListener('click', () => {
        if (kaedoki_checkbox.checked) {
            // ① 片方がチェックされたら、もう片方のチェックを外す
            normal_checkbox.checked = false;
            // ② どのプランが有効になったかstateを更新
            state.activePaymentPlan = 'kaedoki';
        } else {
            // チェックが外されたら、プラン選択も解除
            state.activePaymentPlan = 'none';
        }
    });

    // normalチェックボックスの処理
    normal_checkbox.addEventListener('click', () => {
        if (normal_checkbox.checked) {
            // ① 片方がチェックされたら、もう片方のチェックを外す
            kaedoki_checkbox.checked = false;
            // ② どのプランが有効になったかstateを更新
            state.activePaymentPlan = 'normal';
        } else {
            // チェックが外されたら、プラン選択も解除
            state.activePaymentPlan = 'none';
        }
    });
}