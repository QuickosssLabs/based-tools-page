// Search Filter Logic
document.getElementById('search-bar').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const community = card.getAttribute('data-community').toLowerCase();

        if (title.includes(filter) || community.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

