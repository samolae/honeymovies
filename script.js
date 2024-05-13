document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.list-item').forEach(li => li.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
