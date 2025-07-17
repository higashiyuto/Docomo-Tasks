document.querySelectorAll('.tab-buttons button').forEach(button=>{
    button.addEventListener('click',()=>{
        const src = button.getAttribute('data-src');
        document.getElementById('rightApp').src = src;
    });
});