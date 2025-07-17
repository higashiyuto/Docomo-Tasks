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

  //元の価格(変動しない値)
  originalDevicePrice: 0,
  originalKaedokiPrice: 0,

  //現在表示中の価格(割引反映後など)
  devicePrice: 0,
  normalMonthlyPrice: 0,
  kaedokiPrice: 0,
  kaedokiMonthlyPrice: 0,

  //分割情報
  installmentsNum: 1,

  //割引情報
  discount:{
    mnp: 0,
    new: 0,
    change: 0,
  },

  //適用されている割引額
  currentDiscount: 0,

  //割引が有効か
  useDiscount: false,
};

export const state = new Proxy(rawState, {
  set(target, prop, value) {
    target[prop] = value;

    // 割引チェック切り替え時に価格を再計算
    if (prop === 'useDiscount') {
      const discount = target.currentDiscount || 0;
      const device = target.originalDevicePrice || 0;
      const kaedoki = target.originalKaedokiPrice || 0;

      target.devicePrice = value ? device - discount : device;
      target.kaedokiPrice = value ? kaedoki - discount : kaedoki;

      target.normalMonthlyPrice = Math.ceil(target.devicePrice / target.installmentsNum);
      target.kaedokiMonthlyPrice = Math.ceil(target.kaedokiPrice / 23);
    }

    notify();
    return true;
  },
});