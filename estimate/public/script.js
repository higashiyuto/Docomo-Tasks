import { PlanInit } from './plan.js';
import { OptionInit } from './option.js';
import { DiscountInit } from './discount.js';
import { DeviceInit } from './device/device.js';
import { renderDeviceInfo } from './device/ui/renderDeviceInfo.js';
import { addObserver } from './state/state.js';

async function init(){
    PlanInit();
    OptionInit();
    DiscountInit();
    DeviceInit();

    addObserver(renderDeviceInfo);
}

init();