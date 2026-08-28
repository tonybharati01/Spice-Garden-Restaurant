// 1. Elements ko select karein
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

// 2. Hamburger click par menu open/close karne ka code (jo aapne pehle likha hoga)
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Ya jo bhi class aap toggle kar rahe hain
    hamburger.classList.toggle('toggle'); 
});

// 3. Sabhi links par loop chalayein aur click hote hi menu close karein
links.forEach(link => {
    link.addEventListener('click', () => {
        // Click hote hi 'active' class ko remove kar dein taaki menu band ho jaye
        navLinks.classList.remove('active'); 
        
        // Agar hamburger ka icon change hota hai to use bhi wapas normal karein
        // Jaise bars icon ko wapas lanes ke liye:
        const icon = hamburger.querySelector('i');
        if(icon.classList.contains('fa-times')) {
            icon.classList.className = 'fas fa-bars';
        }
    });
});