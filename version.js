// version.js - Badge versione automatico basato su Last-Modified
(function() {
    const nomeFile = window.location.pathname.split('/').pop() || 'index.html';
    const versioneKey = 'versione_' + nomeFile;
    const dataKey = 'lastmod_' + nomeFile;

    fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
            const lastModified = response.headers.get('Last-Modified');
            if (!lastModified) {
                mostraBadge('v???', nomeFile);
                return;
            }
            const dataModifica = new Date(lastModified).getTime();
            let versioneAttuale = localStorage.getItem(versioneKey);
            let dataSalvata = localStorage.getItem(dataKey);

            if (!versioneAttuale || !dataSalvata || dataModifica > parseInt(dataSalvata)) {
                const nuovaVersione = versioneAttuale ? parseInt(versioneAttuale) + 1 : 1;
                localStorage.setItem(versioneKey, nuovaVersione);
                localStorage.setItem(dataKey, dataModifica);
                versioneAttuale = nuovaVersione;
            }
            const versioneFormattata = 'v' + String(versioneAttuale).padStart(3, '0');
            mostraBadge(versioneFormattata, nomeFile);
        })
        .catch(() => {
            mostraBadge('v???', nomeFile);
        });

    function mostraBadge(versione, file) {
        const box = document.createElement('div');
        box.style.position = 'fixed';
        box.style.bottom = '10px';
        box.style.right = '10px';
        box.style.backgroundColor = 'rgba(0,0,0,0.6)';
        box.style.color = '#fff';
        box.style.fontSize = '11px';
        box.style.fontFamily = 'monospace';
        box.style.padding = '4px 8px';
        box.style.borderRadius = '8px';
        box.style.zIndex = '9999';
        box.style.pointerEvents = 'none';
        box.style.backdropFilter = 'blur(4px)';
        box.innerText = `${versione}-${file}`;
        document.body.appendChild(box);
    }
})();