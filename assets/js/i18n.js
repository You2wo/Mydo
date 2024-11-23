i18next
    .use(i18nextBrowserLanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'id',
        resources: resources,
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    }, function(err, t) {
        updateContent();
    });

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
            element.placeholder = i18next.t(key);
        } else {
            element.textContent = i18next.t(key);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const indonesiaBtn = document.querySelector('[data-lang="id"]');
    const englishBtn = document.querySelector('[data-lang="en"]');
    const languageIcon = document.querySelector('.dropdown img[src*="btn"]'); // Select the language icon

    function updateLanguageIcon(lang) {
        if (lang === 'id') {
            languageIcon.src = 'assets/img/indonesiabtn.png';
        } else if (lang === 'en') {
            languageIcon.src = 'assets/img/usbtn.png'; // Assuming you have this image
        }
    }

    if (indonesiaBtn) {
        indonesiaBtn.addEventListener('click', () => {
            i18next.changeLanguage('id', (err, t) => {
                if (err) return console.log('Something went wrong loading', err);
                updateLanguageIcon('id');
                updateContent();
            });
        });
    }

    if (englishBtn) {
        englishBtn.addEventListener('click', () => {
            i18next.changeLanguage('en', (err, t) => {
                if (err) return console.log('Something went wrong loading', err);
                updateLanguageIcon('en');
                updateContent();
            });
        });
    }

    updateLanguageIcon(i18next.language);
});

i18next
    .use(i18nextBrowserLanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'id',
        resources: resources,
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    }, function(err, t) {
        if (!err) {
            const languageIcon = document.querySelector('.dropdown img[src*="btn"]');
            if (languageIcon) {
                const currentLang = i18next.language;
                if (currentLang === 'id') {
                    languageIcon.src = 'assets/img/indonesiabtn.png';
                } else if (currentLang === 'en') {
                    languageIcon.src = 'assets/img/usbtn.png';
                }
            }
        }
        updateContent();
    });