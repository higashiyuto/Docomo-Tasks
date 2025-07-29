import { PlanInit } from './plan.js';
import { OptionInit } from './option.js';
import { DiscountInit } from './discount/discount.js';
import { DeviceInit } from './device/device.js';
import { InstallmentsInit } from './installments/installments.js';
import { renderDeviceInfo } from './device/ui/renderDeviceInfo.js';
import { addObserver } from './state/state.js';
import { TotalInit } from './total/total.js';

async function init(){
    PlanInit();
    OptionInit();
    DiscountInit();
    DeviceInit();
    InstallmentsInit();
    TotalInit();

    addObserver(renderDeviceInfo);
}

init();