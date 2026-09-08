/* ============================================================
   UltraPDF Landing Page — Interactivity
   ============================================================ */

(function () {
    'use strict';

    // --- Theme Toggle ---
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('ultrapdf-theme');

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }

    themeBtn.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('ultrapdf-theme', next);
    });

    // --- Language Toggle ---
    const langBtn = document.getElementById('lang-toggle');
    const savedLang = localStorage.getItem('ultrapdf-lang') || 'es';
    const langLabel = langBtn.querySelector('.lang-label');

    const translations = {
        es: {
            'nav.features': 'Herramientas',
            'nav.tools': 'Todas las herramientas',
            'nav.ai': 'Firmas y Móvil',
            'nav.platforms': 'Plataformas',
            'nav.tutorials': 'Tutoriales',
            'nav.download': 'Descargar',
            'hero.title1': 'El todo en uno',
            'hero.title2': 'para tus documentos PDF',
            'hero.subtitle': 'Edita, convierte, comprime y protege tus PDFs con más de 55 herramientas e inteligencia artificial integrada. Todo en una aplicación de escritorio.',
            'hero.download': 'Descargar v2.18.2',
            'hero.github': 'Ver en GitHub <span class="arrow">\u2192</span>',
            'hero.versions': 'Ver todas las versiones',
            'terminal.copy': 'Copiar',
            'stats.downloads': 'descargas mundiales',
            'stats.opensource': 'Open Source',
            'stats.tools': 'herramientas PDF',
            'stats.formats': 'formatos de conversión',
            'stats.ai': 'integrada',
            'stats.tracking': 'rastreadores',
            'pillars.local.title': 'Tus archivos, tu control.',
            'pillars.local.desc': '100% funcional sin conexión a internet. Tus documentos nunca salen de tu equipo. Sin rastreadores, sin analíticas, sin compromisos.',
            'pillars.local.check1': 'Funciona sin conexión a internet',
            'pillars.local.check2': 'Archivos nunca salen de tu equipo',
            'pillars.local.check3': 'Sin rastreadores ni analíticas',
            'pillars.local.check4': 'Licencia MIT — gratuito para siempre',
            'pillars.tools.title': 'Todo lo que necesitas. Nada que no.',
            'pillars.tools.desc': 'De comprimir a OCR, de firmar a convertir. Herramientas profesionales que empresas pagan cientos de dólares por año. Aquí son gratuitas.',
            'pillars.tools.check1': 'Comprimir, dividir, combinar, convertir',
            'pillars.tools.check2': 'Firma digital y certificados',
            'pillars.tools.check3': 'OCR multi-idioma con Tesseract',
            'pillars.tools.check4': 'Flujos de trabajo automatizados',
            'pillars.cloud.title': 'Copias en la nube. Backblaze B2.',
            'pillars.cloud.desc': 'Almacenamiento en la nube personal: copia de seguridad de tus documentos en tu propio bucket de Backblaze B2. El nivel gratuito incluye 10 GB — sin tarjeta de crédito.',
            'pillars.cloud.check1': 'Bucket propio en Backblaze B2',
            'pillars.cloud.check2': 'Clic derecho → "Save to Backblaze B2"',
            'pillars.cloud.check3': '10 GB gratis sin tarjeta de crédito',
            'pillars.cloud.check4': 'Explora, sube, descarga y elimina archivos',
            'features.title': 'Herramientas esenciales para cada necesidad.',
            'features.compress': 'Comprimir',
            'features.compress.desc': 'Reduce el tamaño de tus PDFs manteniendo la calidad. Calidad ajustable, modo escala de grises y linealización web.',
            'features.convert': 'Convertir',
            'features.convert.desc': 'Más de 30 formatos soportados. Word, Excel, PowerPoint, imágenes, HTML y más.',
            'features.sign': 'Firmar',
            'features.sign.desc': 'Firma digital con certificados PEM/P12/PFX/JKS. Firma compartida multi-participante.',
            'features.merge': 'Unir',
            'features.merge.desc': 'Combina múltiples PDFs en un solo documento. Genera tabla de contenidos automáticamente.',
            'features.ocr': 'OCR',
            'features.ocr.desc': 'Reconocimiento óptico de caracteres multi-idioma. Modo automático, forzado y estricto.',
            'features.security': 'Seguridad',
            'features.security.desc': 'Encriptación con contraseña. Permisos de impresión, copia y edición. Aplanar formularios.',
            'features.more': '+ 49 herramientas más <span class="arrow">\u2192</span>',
            'alltools.title': 'Todas las herramientas.',
            'alltools.desc': '55+ herramientas profesionales organizadas por categoría.',
            'filter.all': 'Todos',
            'filter.recommended': 'Recomendados',
            'filter.pages': 'Páginas',
            'filter.security': 'Seguridad',
            'filter.format': 'Formato',
            'filter.advanced': 'Avanzado',
            'filter.dev': 'Desarrollador',
            'how.title': 'Tres pasos. Listo.',
            'how.step1.title': 'Sube tu PDF',
            'how.step1.desc': 'Arrastra y suelta tu archivo, o selecciónalo desde tu explorador. También puedes escanear un código QR desde tu móvil.',
            'how.step2.title': 'Elige tu herramienta',
            'how.step2.desc': 'Más de 55 herramientas organizadas por categoría. Selecciona la que necesitas y configura los opciones.',
            'how.step3.title': 'Descarga el resultado',
            'how.step3.desc': 'Tu PDF procesado está listo. Descárgalo, guárdalo en la nube, o compártelo directamente.',
            'showcase.sign.title': 'Firma digital.<br>Legalmente vinculante.',
            'showcase.sign.desc': 'Dibuja tu firma directamente en pantalla, súbela como imagen, o usa certificados digitales PEM/P12/PFX/JKS. Firma compartida multi-participante con seguimiento de estado.',
            'showcase.sign.check1': 'Dibuja, escribe o sube tu firma',
            'showcase.sign.check2': 'Certificados digitales enterprise',
            'showcase.sign.check3': 'Firma compartida multi-participante',
            'showcase.sign.check4': 'Verificación de firmas existentes',
            'showcase.qr.title': 'Sube desde tu<br>móvil con un QR.',
            'showcase.qr.desc': 'Escanea el código QR con la cámara de tu teléfono y sube PDFs directamente desde tu dispositivo móvil. Sin cables, sin transferencias, sin complicaciones.',
            'showcase.qr.check1': 'Escanea con cualquier cámara',
            'showcase.qr.check2': 'Soporta iOS y Android',
            'showcase.qr.check3': 'Detección de bordes automática',
            'showcase.qr.check4': 'Conexión directa, sin internet',
            'deps.title': 'Construido sobre gigantes.',
            'deps.desc': 'UltraPDF utiliza las mejores bibliotecas open source del ecosistema.',
            'platforms.title': 'Disponible en todas partes.',
            'platforms.desc': 'Descarga la aplicación de escritorio o ejecuta UltraPDF en tu navegador.',
            'platforms.soon': 'Próximamente',
            'platforms.web': 'Web App',
            'platforms.web.desc': 'ultrapdf.dev',
            'platforms.selfhost': 'Self-Host',
            'platforms.open': 'Open Source',
            'versions.title': 'Historial de versiones.',
            'versions.latest': 'Última versión',
            'versions.download': 'Descargar',
            'versions.rebrand': 'Rebranding completo',
            'versions.v2182': 'Corregido crash al iniciar — frontend embebido correctamente, ligado a loopback, installer reducido a 410 MB',
            'versions.v2181': 'MSI corregido \u2014 JRE empaquetado correctamente, tamaño reducido a 494 MB',
            'versions.v2180': 'Primera versión como UltraPDF. UI renovada con tema moderno.',
            'footer.tagline': 'El alternativo gratuito a Adobe Acrobat.',
            'footer.product': 'Producto',
            'footer.features': 'Características',
            'footer.alltools': 'Herramientas',
            'footer.platforms': 'Plataformas',
            'footer.versions': 'Versiones',
            'footer.community': 'Comunidad',
            'footer.docs': 'API Docs',
            'footer.legal': 'Legal',
            'footer.privacy': 'Privacidad (local-first)',
            'footer.license': 'MIT License \u00b7 \u00a9 2026 UltraPDF',
            'tool.compress.desc': 'Reduce hasta 90% manteniendo calidad',
            'tool.multi.desc': 'Merge, rotate, split en una sola vista',
            'tool.merge.desc': 'Combina PDFs con tabla de contenidos',
            'tool.compare.desc': 'Diferencias lado a lado con resaltado',
            'tool.convert.desc': 'A Word, Excel, HTML, im\u00e1genes y 30+ formatos',
            'tool.ocr.desc': 'Texto reconocible multi-idioma',
            'tool.sign.desc': 'Firma digital legal multi-participante',
            'tool.security.desc': 'Encriptar, permisos y aplanar formularios',
            'tool.split.desc': 'Divide por p\u00e1ginas, cap\u00edtulos o tama\u00f1o',
            'tool.rotate.desc': 'Gira p\u00e1ginas a cualquier \u00e1ngulo',
            'tool.crop.desc': 'Recorta p\u00e1ginas visualmente',
            'tool.extract.desc': 'Extrae p\u00e1ginas espec\u00edficas a nuevo PDF',
            'tool.reorder.desc': 'Reordena, duplica o elimina p\u00e1ginas',
            'tool.remove.desc': 'Elimina p\u00e1ginas espec\u00edficas',
            'tool.pagenum.desc': 'Numeraci\u00f3n configurable con Bates',
            'tool.layout.desc': 'Multi-up: 2, 4 o N p\u00e1ginas por hoja',
            'tool.scale.desc': 'Ajusta tama\u00f1o y escala de p\u00e1ginas',
            'tool.booklet.desc': 'Impresi\u00f3n tipo booklet con orden correcto',
            'tool.password.desc': 'Encriptaci\u00f3n 40/128/256-bit',
            'tool.removepw.desc': 'Elimina protecci\u00f3n por contrase\u00f1a',
            'tool.cert.desc': 'Firma con certificados PEM/P12/PFX',
            'tool.validate.desc': 'Verifica firmas digitales y certificados',
            'tool.sanitize.desc': 'Elimina JS, archivos incrustados, metadatos',
            'tool.flatten.desc': 'Hace el PDF no editable',
            'tool.perms.desc': 'Controla imprimir, copiar, editar',
            'tool.watermark.desc': 'Texto o imagen como marca de agua',
            'tool.stamp.desc': 'Sellos de texto o imagen con plantillas',
            'tool.timestamp.desc': 'Marca temporal RFC 3161',
            'tool.colors.desc': 'Brillo, contraste, saturaci\u00f3n',
            'tool.replacecolor.desc': 'Reemplaza o invierte colores',
            'tool.scanner.desc': 'Simula efecto de esc\u00e1ner',
            'tool.automate.desc': 'Workflows multi-paso reutilizables',
            'tool.overlay.desc': 'Superpone un PDF sobre otro',
            'tool.repair.desc': 'Repara PDFs corruptos o da\u00f1ados',
            'tool.formfill.desc': 'Editor visual de campos de formulario',
            'tool.read.desc': 'Lee y anota PDFs con highlights',
            'tool.annotate.desc': 'Highlights, dibujos, notas y formas',
            'tool.rename.desc': 'Detecta t\u00edtulo y renombra autom\u00e1ticamente',
            'tool.images.desc': 'Extrae todas las im\u00e1genes a ZIP',
            'tool.metadata.desc': 'Edita autor, t\u00edtulo, fechas y campos',
            'tool.toc.desc': 'Edita bookmarks y outline del PDF',
            'tool.addtext.desc': 'Inserta texto en cualquier posici\u00f3n',
            'tool.addimg.desc': 'Inserta PNG, JPG, SVG en el PDF',
            'tool.attach.desc': 'Archivos incrustados en el PDF',
            'tool.showjs.desc': 'Busca y muestra JavaScript oculto',
            'tool.info.desc': 'Metadata completa, fuentes, cifrado',
            'tool.airgap.desc': 'Despliegue sin conexi\u00f3n a internet',
            'tool.api.desc': 'Documentaci\u00f3n REST completa con Swagger',
            'tool.folder.desc': 'Procesamiento autom\u00e1tico de carpetas',
            'tool.sso.desc': 'Configuraci\u00f3n OAuth2 / SAML2'
        },
        en: {
            'nav.features': 'Features',
            'nav.tools': 'All Tools',
            'nav.ai': 'Sign & Mobile',
            'nav.platforms': 'Platforms',
            'nav.tutorials': 'Tutorials',
            'nav.download': 'Download',
            'hero.title1': 'Everything you need',
            'hero.title2': 'for your PDF documents',
            'hero.subtitle': 'Edit, convert, compress and secure your PDFs with 55+ tools and built-in AI intelligence. All in one desktop application.',
            'hero.download': 'Download v2.18.2',
            'hero.github': 'View on GitHub <span class="arrow">\u2192</span>',
            'hero.versions': 'View all versions',
            'terminal.copy': 'Copy',
            'stats.downloads': 'worldwide downloads',
            'stats.opensource': 'Open Source',
            'stats.tools': 'PDF tools',
            'stats.formats': 'conversion formats',
            'stats.ai': 'built-in',
            'stats.tracking': 'trackers',
            'pillars.local.title': 'Your files. Your control.',
            'pillars.local.desc': '100% functional offline. Your documents never leave your machine. No trackers, no analytics, no compromises.',
            'pillars.local.check1': 'Works without internet',
            'pillars.local.check2': 'Files never leave your device',
            'pillars.local.check3': 'No trackers or analytics',
            'pillars.local.check4': 'MIT License — free forever',
            'pillars.tools.title': 'Everything you need. Nothing you don\'t.',
            'pillars.tools.desc': 'From compress to OCR, from sign to convert. Professional tools that companies pay hundreds of dollars per year for. Here, they\'re free.',
            'pillars.tools.check1': 'Compress, split, merge, convert',
            'pillars.tools.check2': 'Digital signatures and certificates',
            'pillars.tools.check3': 'Multi-language OCR with Tesseract',
            'pillars.tools.check4': 'Automated workflows',
            'pillars.cloud.title': 'Cloud backup. Backblaze B2.',
            'pillars.cloud.desc': 'Personal cloud storage: back up your documents to your own Backblaze B2 bucket. Free tier includes 10 GB — no credit card required.',
            'pillars.cloud.check1': 'Your own Backblaze B2 bucket',
            'pillars.cloud.check2': 'Right-click → "Save to Backblaze B2"',
            'pillars.cloud.check3': '10 GB free, no credit card',
            'pillars.cloud.check4': 'Browse, upload, download, and delete files',
            'features.title': 'Essential tools for every need.',
            'features.compress': 'Compress',
            'features.compress.desc': 'Reduce PDF size while maintaining quality. Adjustable quality, grayscale mode, and web linearization.',
            'features.convert': 'Convert',
            'features.convert.desc': '30+ formats supported. Word, Excel, PowerPoint, images, HTML and more.',
            'features.sign': 'Sign',
            'features.sign.desc': 'Digital signing with PEM/P12/PFX/JKS certificates. Multi-participant shared signing.',
            'features.merge': 'Merge',
            'features.merge.desc': 'Combine multiple PDFs into one document. Auto-generate table of contents.',
            'features.ocr': 'OCR',
            'features.ocr.desc': 'Multi-language optical character recognition. Auto, force, and strict modes.',
            'features.security': 'Security',
            'features.security.desc': 'Password encryption. Print, copy, and edit permissions. Flatten forms.',
            'features.more': '+ 49 more tools <span class="arrow">\u2192</span>',
            'alltools.title': 'All the tools.',
            'alltools.desc': '55+ professional tools organized by category.',
            'filter.all': 'All',
            'filter.recommended': 'Recommended',
            'filter.pages': 'Pages',
            'filter.security': 'Security',
            'filter.format': 'Format',
            'filter.advanced': 'Advanced',
            'filter.dev': 'Developer',
            'how.title': 'Three steps. Done.',
            'how.step1.title': 'Drop your PDF',
            'how.step1.desc': 'Drag and drop your file, or select it from your file explorer. You can also scan a QR code from your phone.',
            'how.step2.title': 'Choose your tool',
            'how.step2.desc': '55+ tools organized by category. Select the one you need and configure the options.',
            'how.step3.title': 'Download the result',
            'how.step3.desc': 'Your processed PDF is ready. Download it, save to cloud, or share it directly.',
            'showcase.sign.title': 'Digital signature.<br>Legally binding.',
            'showcase.sign.desc': 'Draw your signature directly on screen, upload it as an image, or use PEM/P12/PFX/JKS digital certificates. Multi-participant shared signing with status tracking.',
            'showcase.sign.check1': 'Draw, type, or upload your signature',
            'showcase.sign.check2': 'Enterprise digital certificates',
            'showcase.sign.check3': 'Multi-participant shared signing',
            'showcase.sign.check4': 'Verify existing signatures',
            'showcase.qr.title': 'Upload from your<br>phone with a QR.',
            'showcase.qr.desc': 'Scan the QR code with your phone camera and upload PDFs directly from your mobile device. No cables, no transfers, no hassle.',
            'showcase.qr.check1': 'Scan with any camera',
            'showcase.qr.check2': 'Supports iOS and Android',
            'showcase.qr.check3': 'Automatic edge detection',
            'showcase.qr.check4': 'Direct connection, no internet needed',
            'deps.title': 'Built on giants.',
            'deps.desc': 'UltraPDF uses the best open source libraries in the ecosystem.',
            'platforms.title': 'Available everywhere.',
            'platforms.desc': 'Download the desktop app or run UltraPDF in your browser.',
            'platforms.soon': 'Coming Soon',
            'platforms.web': 'Web App',
            'platforms.web.desc': 'ultrapdf.dev',
            'platforms.selfhost': 'Self-Host',
            'platforms.open': 'Open Source',
            'versions.title': 'Release history.',
            'versions.latest': 'Latest release',
            'versions.download': 'Download',
            'versions.rebrand': 'Full rebrand',
            'versions.v2182': 'Fixed startup crash — frontend properly embedded, bound to loopback, installer reduced to 410 MB',
            'versions.v2181': 'Fixed MSI \u2014 JRE properly bundled, size reduced to 494 MB',
            'versions.v2180': 'First release as UltraPDF. Modern UI with redesigned theme.',
            'footer.tagline': 'The free alternative to Adobe Acrobat.',
            'footer.product': 'Product',
            'footer.features': 'Features',
            'footer.alltools': 'Tools',
            'footer.platforms': 'Platforms',
            'footer.versions': 'Releases',
            'footer.community': 'Community',
            'footer.docs': 'API Docs',
            'footer.legal': 'Legal',
            'footer.privacy': 'Privacy (local-first)',
            'footer.license': 'MIT License \u00b7 \u00a9 2026 UltraPDF',
            'tool.compress.desc': 'Reduce up to 90% while keeping quality',
            'tool.multi.desc': 'Merge, rotate, split in a single view',
            'tool.merge.desc': 'Combine PDFs with table of contents',
            'tool.compare.desc': 'Side-by-side differences with highlighting',
            'tool.convert.desc': 'To Word, Excel, HTML, images and 30+ formats',
            'tool.ocr.desc': 'Multi-language text recognition',
            'tool.sign.desc': 'Legal multi-participant digital signing',
            'tool.security.desc': 'Encrypt, permissions, and flatten forms',
            'tool.split.desc': 'Split by pages, chapters, or size',
            'tool.rotate.desc': 'Rotate pages to any angle',
            'tool.crop.desc': 'Crop pages visually',
            'tool.extract.desc': 'Extract specific pages to new PDF',
            'tool.reorder.desc': 'Reorder, duplicate, or delete pages',
            'tool.remove.desc': 'Remove specific pages',
            'tool.pagenum.desc': 'Configurable numbering with Bates stamping',
            'tool.layout.desc': 'Multi-up: 2, 4 or N pages per sheet',
            'tool.scale.desc': 'Adjust page size and scale',
            'tool.booklet.desc': 'Booklet printing with correct page order',
            'tool.password.desc': '40/128/256-bit encryption',
            'tool.removepw.desc': 'Remove password protection',
            'tool.cert.desc': 'Sign with PEM/P12/PFX certificates',
            'tool.validate.desc': 'Verify digital signatures and certificates',
            'tool.sanitize.desc': 'Remove JS, embedded files, metadata',
            'tool.flatten.desc': 'Make PDF non-editable',
            'tool.perms.desc': 'Control print, copy, and edit permissions',
            'tool.watermark.desc': 'Text or image watermark',
            'tool.stamp.desc': 'Text or image stamps with templates',
            'tool.timestamp.desc': 'RFC 3161 document timestamp',
            'tool.colors.desc': 'Brightness, contrast, saturation',
            'tool.replacecolor.desc': 'Replace or invert colors',
            'tool.scanner.desc': 'Simulate scanner effect',
            'tool.automate.desc': 'Reusable multi-step workflows',
            'tool.overlay.desc': 'Overlay one PDF on another',
            'tool.repair.desc': 'Repair corrupted or damaged PDFs',
            'tool.formfill.desc': 'Visual form field editor',
            'tool.read.desc': 'Read and annotate PDFs with highlights',
            'tool.annotate.desc': 'Highlights, drawings, notes, and shapes',
            'tool.rename.desc': 'Auto-detect title and rename file',
            'tool.images.desc': 'Extract all images to ZIP',
            'tool.metadata.desc': 'Edit author, title, dates, and fields',
            'tool.toc.desc': 'Edit bookmarks and PDF outline',
            'tool.addtext.desc': 'Insert text anywhere in the PDF',
            'tool.addimg.desc': 'Insert PNG, JPG, SVG into PDF',
            'tool.attach.desc': 'Embedded files in PDF',
            'tool.showjs.desc': 'Find and display hidden JavaScript',
            'tool.info.desc': 'Full metadata, fonts, encryption info',
            'tool.airgap.desc': 'Air-gapped deployment',
            'tool.api.desc': 'Full REST documentation with Swagger',
            'tool.folder.desc': 'Automated folder processing',
            'tool.sso.desc': 'OAuth2 / SAML2 configuration'
        }
    };

    function setLang(lang) {
        html.setAttribute('data-lang', lang);
        langLabel.textContent = lang === 'es' ? 'EN' : 'ES';
        const dict = translations[lang];
        if (!dict) return;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });
        html.setAttribute('lang', lang === 'es' ? 'es' : 'en');
        localStorage.setItem('ultrapdf-lang', lang);
    }

    setLang(savedLang);

    langBtn.addEventListener('click', function () {
        const current = html.getAttribute('data-lang') || 'es';
        setLang(current === 'es' ? 'en' : 'es');
    });

    // --- Mobile Hamburger ---
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
        });
    });

    // --- Docker Copy ---
    const copyBtn = document.getElementById('docker-copy');
    const copyLabel = copyBtn.querySelector('.copy-label');

    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText('docker run -p 8080:8080 ultrapdf/ultrapdf:latest').then(function () {
            copyBtn.classList.add('copied');
            copyLabel.textContent = 'Copiado!';
            setTimeout(function () {
                copyBtn.classList.remove('copied');
                copyLabel.textContent = html.getAttribute('data-lang') === 'en' ? 'Copy' : 'Copiar';
            }, 2000);
        });
    });

    // --- Tool Filters ---
    const filterPills = document.querySelectorAll('.filter-pill');
    const toolCards = document.querySelectorAll('.tool-card');

    filterPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
            filterPills.forEach(function (p) { p.classList.remove('active'); });
            pill.classList.add('active');
            const filter = pill.getAttribute('data-filter');

            toolCards.forEach(function (card) {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cats = card.getAttribute('data-categories') || '';
                    card.classList.toggle('hidden', !cats.includes(filter));
                }
            });
        });
    });

    // --- Scroll Fade-In Animation ---
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Add fade-in class to sections
    var sections = document.querySelectorAll(
        '.pillar-row, .feature-card, .tool-card, .step, .ai-split, .dep-item, .platform-card, .version-row, .section-header'
    );
    sections.forEach(function (el, i) {
        el.classList.add('fade-in');
        el.style.transitionDelay = (i % 6) * 60 + 'ms';
        observer.observe(el);
    });

    // --- Navbar background on scroll ---
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            navbar.style.borderBottomColor = 'var(--border)';
        } else {
            navbar.style.borderBottomColor = 'transparent';
        }
    }, { passive: true });

    // --- Step images lightbox ---
    var lightbox = document.getElementById('image-lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.step-img-wrap').forEach(function (wrap) {
        wrap.addEventListener('click', function () {
            var img = wrap.querySelector('img');
            if (!img) return;
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

})();
