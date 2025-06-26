document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabLinks = document.querySelectorAll('.nav-tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior (e.g., jumping to top)

            // Remove 'active' class from all tab links
            tabLinks.forEach(item => item.classList.remove('active'));

            // Add 'active' class to the clicked tab link
            link.classList.add('active');

            // Hide all tab content
            tabContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding tab content
            const targetTabId = link.dataset.tab; // Get the data-tab attribute value
            const targetTabContent = document.getElementById(targetTabId);
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }

            // If the hamburger menu is open, close it
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Set initial active tab on page load (Home tab)
    // Find the home tab link and content elements
    const homeTabLink = document.querySelector('.nav-tab-link[data-tab="home-tab-content"]');
    const homeTabContent = document.getElementById('home-tab-content');

    // Ensure they exist before trying to activate
    if (homeTabLink && homeTabContent) {
        // Remove 'active' from any other potentially active links (if any were set by default)
        tabLinks.forEach(link => link.classList.remove('active'));
        // Add 'active' to the home tab link
        homeTabLink.classList.add('active');

        // Hide all tab contents first (optional, but good for consistency)
        tabContents.forEach(content => content.classList.remove('active'));
        // Display the home tab content
        homeTabContent.classList.add('active');
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3'); // Assuming h3 is the clickable part
        question.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked FAQ item
            item.classList.toggle('active');

            // Optional: Close other open FAQ items when one is clicked
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Testimonial star rating interaction
    const starRatingDivs = document.querySelectorAll('.star-rating');
    starRatingDivs.forEach(ratingDiv => {
        const stars = ratingDiv.querySelectorAll('label');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                // This handles the visual feedback for the user by CSS :checked ~ label
                // For actual form submission, the 'value' of the radio button is what matters.
                // No additional JS needed here for the visual unless you want more complex effects.
            });
        });
    });

    // Testimonial Form Submission (Frontend only, requires backend for persistence)
    const testimonialForm = document.querySelector('.testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('testimonial-name').value;
            const message = document.getElementById('testimonial-message').value;
            const rating = testimonialForm.querySelector('input[name="rating"]:checked');

            if (name && message && rating) {
                const ratingValue = parseInt(rating.value);

                // In a real application, you would send this data to a server:
                // fetch('/api/testimonials', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ name, message, rating: ratingValue })
                // })
                // .then(response => response.json())
                // .then(data => {
                //     console.log('Testimonial submitted:', data);
                //     // Here, you would typically refresh the testimonials list
                //     // or dynamically add the new testimonial.
                //     alert('Thank you for your testimonial! It will be reviewed and added soon.');
                //     testimonialForm.reset(); // Clear form
                // })
                // .catch(error => {
                //     console.error('Error submitting testimonial:', error);
                //     alert('There was an error submitting your testimonial. Please try again later.');
                // });

                // For this front-end only example, we'll just alert and reset the form.
                // To actually "make the testimonials available after users add,"
                // a backend database and API would be required to store and retrieve them.
                alert('Thank you for your testimonial! Your feedback has been received. (Note: In a real application, this would be saved to a database and displayed dynamically.)');
                testimonialForm.reset(); // Clear the form

                // Optionally, if you want to visually add it to the list without a backend,
                // you would create a new testimonial-item div and append it to testimonials-grid.
                // However, this would disappear on page refresh.
            } else {
                alert('Please fill in your name, testimonial, and select a rating.');
            }
        });
    }


    // Smooth scrolling for internal links (optional, if you want it)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is a tab link. If so, let the tab handler manage it.
            if (this.classList.contains('nav-tab-link')) {
                return;
            }
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});