const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');
const dropdowns = document.querySelectorAll('.nav-item.dropdown > .nav-links'); // Sadece ana dropdown tetikleyicileri
const subDropdowns = document.querySelectorAll('.dropdown-submenu > a'); // Alt dropdown tetikleyicileri

// Hamburger menüyü aç/kapat
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // İkonu değiştir (isteğe bağlı)
    const icon = mobileMenu.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Mobil menüde bir linke tıklandığında menüyü kapat (opsiyonel)
navLinks.forEach(link => {
    // Eğer link bir dropdown tetikleyicisi değilse veya alt menü içindeyse
    if (!link.parentElement.classList.contains('dropdown') && !link.closest('.dropdown-menu')) {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.querySelector('i').classList.remove('fa-times');
                mobileMenu.querySelector('i').classList.add('fa-bars');
            }
        });
    }
});


// Mobil ve tablet için açılır menüleri tıklama ile yönet
function handleDropdownClick(event) {
    // Eğer mobil menü aktif değilse (yani masaüstü görünümdeyse) ve hover çalışıyorsa, tıklamayı engelleme
    const isMobileView = window.innerWidth <= 960;
    if (!isMobileView && getComputedStyle(event.currentTarget.nextElementSibling).display !== 'none' && event.type === 'click') {
        // Masaüstünde hover ile zaten açıksa ve tıklandıysa, varsayılan davranışı (linke gitme) engelleme
        // Eğer link # ise bir şey yapma, değilse gidebilir.
        if(event.currentTarget.getAttribute('href') === '#') {
            event.preventDefault();
        }
        return;
    }


    if (isMobileView) {
        event.preventDefault(); // Linke gitmeyi engelle, sadece menüyü aç/kapat
        const currentDropdownMenu = event.currentTarget.nextElementSibling;
        const parentItem = event.currentTarget.parentElement;

        // Diğer açık dropdown'ları kapat (aynı seviyedeki)
        if (parentItem.parentElement.classList.contains('nav-menu') || parentItem.parentElement.classList.contains('dropdown-menu')) {
            const siblingDropdowns = Array.from(parentItem.parentElement.children).filter(child => child !== parentItem && (child.classList.contains('dropdown') || child.classList.contains('dropdown-submenu')));
            siblingDropdowns.forEach(sibling => {
                const openMenu = sibling.querySelector('.dropdown-menu, .dropdown-menu-submenu');
                if (openMenu && openMenu.style.display === 'block') {
                    openMenu.style.display = 'none';
                    sibling.classList.remove('open');
                }
            });
        }


        if (currentDropdownMenu) {
            if (currentDropdownMenu.style.display === 'block') {
                currentDropdownMenu.style.display = 'none';
                parentItem.classList.remove('open');
            } else {
                currentDropdownMenu.style.display = 'block';
                parentItem.classList.add('open');
            }
        }
    }
}

dropdowns.forEach(dropdown => {
    // Masaüstünde hover ile açılacağı için tıklama olayını sadece mobil için ekleyebiliriz
    // Ya da hem tıklama hem hover'ı yönetebiliriz.
    // Şimdilik tıklama ekleyelim, CSS zaten hover'ı hallediyor.
    dropdown.addEventListener('click', handleDropdownClick);
});

subDropdowns.forEach(subDropdown => {
    subDropdown.addEventListener('click', handleDropdownClick);
});


// Sayfa yeniden boyutlandırıldığında mobil menü ve dropdown davranışlarını düzelt
window.addEventListener('resize', () => {
    const isMobileView = window.innerWidth <= 960;
    if (!isMobileView) {
        // Masaüstü görünüme geçildiğinde mobil menüyü kapat
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.querySelector('i').classList.remove('fa-times');
            mobileMenu.querySelector('i').classList.add('fa-bars');
        }
        // Masaüstünde JS ile açılmış dropdown'ları sıfırla (CSS hover devralır)
        document.querySelectorAll('.dropdown-menu, .dropdown-menu-submenu').forEach(menu => {
            menu.style.display = ''; // CSS'in yönetmesine izin ver
        });
        document.querySelectorAll('.nav-item.open, .dropdown-submenu.open').forEach(item => {
            item.classList.remove('open');
        });
    } else {
        // Mobil görünüme geçildiğinde, hover ile açık kalmış olabilecek
        // dropdown'ların display stilini JS'in yönetebilmesi için sıfırla.
        // Eğer CSS'de :hover ile display:block varsa bu sorun yaratabilir.
        // Bu yüzden mobil için :hover'ı iptal etmek veya JS ile kontrol etmek daha iyidir.
        // Mevcut CSS'imiz mobil için hover'ı doğrudan display:block yapmıyor,
        // sadece masaüstü için, o yüzden bu kısım şimdilik çok kritik değil.
    }
});
