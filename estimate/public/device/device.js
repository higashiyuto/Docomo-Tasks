import { fetchDevices } from '../api/deviceService.js';
import { renderDeviceSelect, registerDeviceSelectHandler } from '../device/ui/deviceSelect.js';
import { registerContractSelectHandler } from '../device/ui/contractSelect.js';
import { registerDiscountCheckHandler } from '../device/ui/discountCheckbox.js';

export async function DeviceInit(){
    const devices = await fetchDevices(); // 端末情報取得
    renderDeviceSelect(devices); // セレクトへ格納関数呼び出し
    registerDeviceSelectHandler(devices);
    registerContractSelectHandler();
    registerDiscountCheckHandler();
}