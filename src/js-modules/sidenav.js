const sideNavToggle = () => {
    const sideNavContainer = document.getElementById('sidenav');
    sideNavContainer.classList.toggle('sidenav-visible');
}

document.getElementById('favorites-button').addEventListener('click', event => {
    event.preventDefault();
    sideNavToggle();  
})

document.getElementById('sidenav-close-btn').addEventListener('click', event => {
    event.preventDefault();
    sideNavToggle();
})
