import { registerInstallmentsSelectHandler } from './ui/installmentsSelect.js';
import { registerInstallmentsCheckHandler } from './ui/installmentsCheckbox.js';

export async function InstallmentsInit(){
    registerInstallmentsSelectHandler();
    registerInstallmentsCheckHandler();
}