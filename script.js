document.addEventListener('DOMContentLoaded', function () {

    // Get elements for the welcome popup and help button
    const popup = document.getElementById('welcome-popup');
    const helpMeButton = document.querySelector('.popup-content button');

    // Select key elements for animations
    const navBar = document.querySelector('.nav-bar'); // Navigation bar
    const navItems = document.querySelectorAll('.nav-item'); // Icons and labels in the nav bar
    const mainContent = document.querySelector('.main-content'); // Main content area
    const logoContainer = document.querySelector('.logo'); // Logo container
    const icons = document.querySelectorAll('.icon-item'); // Icons for each section
    const labels = document.querySelectorAll('.label'); // Labels corresponding to the icons

    // Check if the user is returning from another page during the session
    const isReturningFromOtherPage = sessionStorage.getItem('isReturning');

    // Initially hide main content and logo (keep nav bar visible)
    if (mainContent) mainContent.style.display = 'none'; // Hide main content
    if (logoContainer) {
        logoContainer.style.opacity = '0'; // Make logo invisible
        logoContainer.style.display = 'none'; // Hide logo
    }

    // Hide all labels at the start
    labels.forEach(label => {
        label.style.opacity = '0';  // Hide labels by setting opacity to 0
        label.style.visibility = 'hidden';  // Ensure labels are not visible
    });

    // Show the popup if the user is visiting the site for the first time in this session
    if (!isReturningFromOtherPage) {

        // Display the welcome popup with a fade-in effect
        popup.style.display = 'flex';

        setTimeout(() => {
            popup.classList.add('active'); // Activate the popup
        }, 10);

        // When the help button is clicked, close the popup and reveal the main content
        helpMeButton.addEventListener('click', function () {

            popup.classList.remove('active'); // Deactivate the popup

            setTimeout(() => {
                popup.style.display = 'none'; // Hide the popup

                // Reveal the main content and logo
                showMainContent();
                animateNavBarIcons(); // Trigger the animation of the icons and labels
            }, 300);
        });

    } else {

        // If returning to the site, skip the popup and show the main content immediately
        showMainContent();
        animateNavBarIcons(); // Start nav bar animations
    }

    // Function to reveal the main content and logo
    function showMainContent() {

        if (navBar) navBar.style.display = 'flex'; // Ensure nav bar is visible
        if (mainContent) mainContent.style.display = 'block'; // Show main content

        // Fade in the logo with an animation
        if (logoContainer) {
            logoContainer.style.display = 'block'; // Show logo container
            logoContainer.style.opacity = '1'; // Make logo visible
            logoContainer.classList.add('slide-down'); // Trigger slide-down animation
        }

        // Trigger animations for section icons and their labels
        loadContentAnimations();
    }

    // Function to animate nav bar icons and labels
    function animateNavBarIcons() {

        setTimeout(() => {
            navItems.forEach(item => {
                item.style.opacity = '1'; // Make icons and labels visible
                item.classList.add('fade-in'); // Trigger fade-in animation for each item
            });
        }, 300); // Delay for better synchronization
    }

    // Set a sessionStorage flag to indicate the user has navigated to another page
    window.onbeforeunload = function () {
        sessionStorage.setItem('isReturning', 'true');
    };

});

// Function to animate the section icons and labels
function loadContentAnimations() {

    const icons = document.querySelectorAll('.icon-item'); // Section icons
    const labels = document.querySelectorAll('.label'); // Corresponding labels

    // Animate each icon and label with a slight delay for each
    icons.forEach((icon, index) => {

        setTimeout(() => {
            icon.classList.add('slide-up'); // Slide-up animation for the icon
            labels[index].style.visibility = 'visible'; // Make label visible
            labels[index].classList.add('fade-in'); // Trigger fade-in animation for the label
        }, index * 1200); // Delay of 1200ms between each icon/label animation
    });
}
