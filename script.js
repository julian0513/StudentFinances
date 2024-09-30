document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('welcome-popup');
    const helpMeButton = document.querySelector('.popup-content button');

    // Select the elements
    const navBar = document.querySelector('.nav-bar');
    const navItems = document.querySelectorAll('.nav-item'); // Select nav items for icons and labels
    const mainContent = document.querySelector('.main-content');
    const logoContainer = document.querySelector('.logo');
    const icons = document.querySelectorAll('.icon-item');
    const labels = document.querySelectorAll('.label'); // Select all the labels

    // Check if the user is returning to the home page during the session
    const isReturningFromOtherPage = sessionStorage.getItem('isReturning');

    // Initially hide the main content and logo, but not the nav bar
    if (mainContent) mainContent.style.display = 'none';
    if (logoContainer) {
        logoContainer.style.opacity = '0';
        logoContainer.style.display = 'none';
    }

    // Ensure labels are not visible at the start
    labels.forEach(label => {
        label.style.opacity = '0';  // Hide labels initially
        label.style.visibility = 'hidden';  // Make sure they're hidden
    });

    // Show the popup only if not returning from another page during the session
    if (!isReturningFromOtherPage) {
        // Show the popup with fade-in effect
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);

        // When the button is clicked
        helpMeButton.addEventListener('click', function () {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';

                // Show the main content and logo
                showMainContent();
                animateNavBarIcons(); // Trigger the animation of the icons and labels
            }, 300);
        });
    } else {
        // If returning, show the main content immediately
        showMainContent();
        animateNavBarIcons(); // Trigger the animation of the icons and labels
    }

    // Function to show main content
    function showMainContent() {
        if (navBar) navBar.style.display = 'flex'; // Static nav bar background
        if (mainContent) mainContent.style.display = 'block';

        // Show the logo with fade-in
        if (logoContainer) {
            logoContainer.style.display = 'block';
            logoContainer.style.opacity = '1';
            logoContainer.classList.add('slide-down');
        }

        // Trigger animations for the rectangles and labels
        loadContentAnimations();
    }

    // Animate only the icons and labels inside the nav bar
    function animateNavBarIcons() {
        setTimeout(() => {
            navItems.forEach(item => {
                item.style.opacity = '1'; // Ensure the icons and labels are visible
                item.classList.add('fade-in'); // Apply fade-in to icons and labels
            });
        }, 300); // Adjust delay as needed
    }

    // Set sessionStorage flag indicating the user has visited another page
    window.onbeforeunload = function () {
        sessionStorage.setItem('isReturning', 'true');
    };
});

// Function to load content animations
function loadContentAnimations() {
    const icons = document.querySelectorAll('.icon-item');
    const labels = document.querySelectorAll('.label');

    // Sequentially animate the middle section icons (rectangles) and labels
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('slide-up'); // Trigger the slide-up animation for rectangle
            labels[index].style.visibility = 'visible'; // Ensure label becomes visible when animating
            labels[index].classList.add('fade-in'); // Trigger the fade-in for the corresponding label
        }, index * 1200); // Sequential delay: 1200ms apart for each
    });
}
