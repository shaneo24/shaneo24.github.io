document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
    // 1. MENU TOGGLE LOGIC (Index Page)
    // ==========================================
	const filtersToggle = document.getElementById('filters-toggle');
	const filtersContent = document.getElementById('filters-content');
	
	if (filtersToggle && filtersContent) {
		filtersToggle.addEventListener('click', () => {
			filtersToggle.classList.toggle('active');
			filtersContent.classList.toggle('open');
		});
	}

	// ==========================================
    // 2. ACCORDION LOGIC (Horse Profile Page)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

	if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                // Spin the arrow
                header.classList.toggle('active');
                
                // Open the content right below it
                const content = header.nextElementSibling;
                if (content) {
                    content.classList.toggle('open');
                }
            });
        });
    }

	// ==========================================
    // 3. FILTERING LOGIC (Index Page)
    // ==========================================
    const applyButton = document.getElementById('apply-btn');
    const clearButton = document.getElementById('clear-btn');
    const cards = document.querySelectorAll('.card');
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

    // Function to run the filtering logic
    function runFilters() {
        const selectedAges = Array.from(document.querySelectorAll('input[name="age"]:checked')).map(cb => cb.value);
        const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(cb => cb.value);
        const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
		const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);

        // Check if ANY filters are currently active
        const totalFiltersApplied = selectedAges.length + selectedGenders.length + selectedTypes.length + selectedPrices.length;

        // Show or hide the "Clear Filters" button based on activity
        if (clearButton) {
			if (totalFiltersApplied > 0) {
				clearButton.style.visibility = 'visible';
				clearButton.style.opacity = '1'; // Triggers the smooth fade-in
			} else {
				clearButton.style.visibility = 'hidden';
				clearButton.style.opacity = '0'; // Triggers the smooth fade-out
			}
		}

        cards.forEach(card => {
            const cardAge = card.getAttribute('data-age');
            const cardGender = card.getAttribute('data-gender');
			const cardType = card.getAttribute('data-type');
            const cardPrice = card.getAttribute('data-price');

            const matchesAge = selectedAges.length === 0 || selectedAges.includes(cardAge);
            const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(cardGender);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(cardType);
			const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(cardPrice);

            if (matchesAge && matchesGender && matchesType && matchesPrice) {
                // If it matches, make sure it is visible and remove the fade-out class
                card.style.display = 'flex';
                // A tiny delay ensures the display:flex registers before animating opacity back in
                setTimeout(() => {
                    card.classList.remove('fade-out');
                }, 10);
            } else {
                // If it doesn't match, apply the fade-out CSS class first
                card.classList.add('fade-out');
                
                // Wait 300ms (matching the CSS transition time) before fully hiding it from the grid
                setTimeout(() => {
                    // Double check it still has fade-out (prevents glitches if user clicks very fast)
                    if (card.classList.contains('fade-out')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // Listen for the Apply button
    if (applyButton) applyButton.addEventListener('click', runFilters);

    // Listen for the Clear button
    if (clearButton) {
		clearButton.addEventListener('click', () => {
			const filterCheckboxes = document.querySelectorAll('.filters-container input[type="checkbox"]');
            filterCheckboxes.forEach(cb => cb.checked = false);
            runFilters();
		});
    };
});