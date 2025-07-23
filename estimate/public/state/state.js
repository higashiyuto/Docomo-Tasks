let observers = [];

export function addObserver(fn) {
    observers.push(fn);
}

function notify() {
    observers.forEach(fn => {
        try {
            fn();
        } catch (e) {
            console.error('Observer function error:', e);
        }
    });
}

const rawState = {
    selectedDevice: null,
    contractType: null,
    originalDevicePrice: 0,
    originalKaedokiPrice: 0,
    devicePrice: 0,
    smartWarrantyPrice: 0,
    normalMonthlyPrice: 0,
    kaedokiPrice: 0,
    kaedokiMonthlyPrice: 0,
    installmentsNum: 1,
    discount: {
        mnp: 0,
        new: 0,
        change: 0,
    },
    currentDiscount: 0,
    basePlanPrice: 0,
    selectedOptions: {
      call: 0,
      warranty: 0,
      security: 0,
      pack: 0,
    },
    useDiscount: false,
    activePaymentPlan: 'none',
    total: 0,
};

function recalculatePrices(target) {
    const discount = target.useDiscount ? (target.currentDiscount || 0) : 0;
    const device = target.originalDevicePrice || 0;
    const kaedoki = target.originalKaedokiPrice || 0;

    target.devicePrice = device - discount;
    target.kaedokiPrice = kaedoki - discount;

    const installments = Number(target.installmentsNum) || 1;
    target.normalMonthlyPrice = Math.ceil(target.devicePrice / installments);
    target.kaedokiMonthlyPrice = Math.ceil(target.kaedokiPrice / 23);
}

// ▼▼▼ 修正箇所 ▼▼▼
function recalculateTotal(target) {
    let paymentPrice = 0;
    if (target.activePaymentPlan === 'kaedoki') {
        paymentPrice = target.kaedokiMonthlyPrice;
    } else if (target.activePaymentPlan === 'normal') {
        paymentPrice = target.normalMonthlyPrice;
    }

    const planPrice = target.basePlanPrice || 0;
    const optionPrice = Object.values(target.selectedOptions).reduce((sum, price) => sum + price, 0);

    // プラン料金と支払いプランの月額料金を合算する
    target.total = planPrice + paymentPrice + optionPrice;
}

export const state = new Proxy(rawState, {
    set(target, prop, value) {
        target[prop] = value;

        const priceTriggerProps = [
            'useDiscount', 'installmentsNum', 'selectedDevice',
            'contractType', 'currentDiscount'
        ];

        // ▼▼▼ 修正箇所 ▼▼▼
        const totalTriggerProps = ['activePaymentPlan', 'basePlanPrice', 'selectedOptions'];

        if (priceTriggerProps.includes(prop)) {
            recalculatePrices(target);
            recalculateTotal(target);
        } else if (totalTriggerProps.includes(prop)) {
            recalculateTotal(target);
        }

        notify();
        return true;
    },
});