export function DiscountInit(){
    const priceMap = {
        'family-discount': {
            'ファミリー割 ~2人': '550 円',
            'ファミリー割 3人以上': '1100 円',
        },
        'dcard-discount': {
            'silver': '220 円',
            'gold': '550 円',
            'platinum': '550 円',
        }
    };

    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            const id = select.id;
            const value = select.value;

            const priceText = priceMap[id]?.[value] || '0 円';
            const priceCell = document.getElementById(`${id}-price`);

            if (priceCell) priceCell.textContent = priceText;
        });
    });
}