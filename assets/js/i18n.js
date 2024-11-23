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

    if (indonesiaBtn) {
        indonesiaBtn.addEventListener('click', () => {
            i18next.changeLanguage('id', (err, t) => {
                if (err) return console.log('Something went wrong loading', err);
                updateContent();
            });
        });
    }

    if (englishBtn) {
        englishBtn.addEventListener('click', () => {
            i18next.changeLanguage('en', (err, t) => {
                if (err) return console.log('Something went wrong loading', err);
                updateContent();
            });
        });
    }
});

i18next.on('languageChanged', () => {
    updateContent();
});