import { state } from '../../state/state.js';

export function renderDeviceInfo(){
    const device_price  = document.getElementById('device-price');
    const kaedoki_price = document.getElementById('kaedoki-price');
    const kaedoki_monthly_price = document.getElementById('kaedoki-monthly-price');
    const normal_price  = document.getElementById('normal-price');
    const normal_monthly_price = document.getElementById('normal-monthly-price');

    device_price.textContent  = `${state.devicePrice} 円`;
    kaedoki_price.textContent = `${state.kaedokiPrice} 円 = `;
    kaedoki_monthly_price.textContent = `${state.kaedokiMonthlyPrice} 円 / 月`;
    normal_price.textContent  = `${state.devicePrice} 円 = `;
    normal_monthly_price.textContent = `${state.normalMonthlyPrice} 円 / 月`;
}