import { state } from '../../state/state.js';

export async function renderDeviceSelect(devices){
    const device_select = document.getElementById('device-select');
    device_select.innerHTML = '';

    devices.sort((a, b) => a.name.localeCompare(b.name));
    devices.forEach((device)=>{
        const option = document.createElement('option');
        option.value = device.name;
        option.textContent = device.name;
        device_select.appendChild(option);
    });
}

export function registerDeviceSelectHandler(devices){
    const device_select = document.getElementById('device-select');
    if(!device_select) return;

    device_select.addEventListener('change', (e)=>{
        const selectedDeviceName = e.target.value;
        const selectedDevice = devices.find(d => d.name === selectedDeviceName);
        if (!selectedDevice) return;

        // 状態を更新
        // 端末情報
        state.selectedDevice = selectedDevice.name;
        state.originalDevicePrice  = selectedDevice.price;
        state.devicePrice = state.originalDevicePrice;
        
        state.originalKaedokiPrice = selectedDevice.kaedoki;
        state.kaedokiPrice = state.originalKaedokiPrice;

        state.currentDiscount = state.discount[state.contractType] || 0;

        if(state.useDiscount){
            state.useDiscount = false;
            state.useDiscount = true;
        }else{
            state.discountPrice = state.originalDevicePrice;
            state.kaedokiPrice = state.originalKaedokiPrice;
            state.normalMonthlyPrice = Math.ceil(state.devicePrice / state.installmentsNum);
            state.kaedokiMonthlyPrice = Math.ceil(state.kaedokiPrice / 23);
        }

        // 端末割引情報
        state.discount.mnp = selectedDevice.discount.mnp;
        state.discount.new = selectedDevice.discount.new;
        state.discount.change = selectedDevice.discount.change;

        if(state.contractType){
            state.currentDiscount = state.discount[state.contractType] || 0;
        }
    });
}