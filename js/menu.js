const menuFallback = [
    { nombre: 'La Raíz', descripcion: 'Carne a la parrilla, cheddar, cebolla caramelizada, pepinillos y salsa de la casa.', precio: 8900, categoria: 'clasicas', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', orden: 1 },
    { nombre: 'Nativa', descripcion: 'Carne a la parrilla, queso provolone, rúcula fresca y mayo de hierbas.', precio: 9500, categoria: 'clasicas', imagen_url: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', orden: 2 },
    { nombre: 'Doble Origen', descripcion: 'Doble carne, doble cheddar, panceta crocante y nuestra salsa ahumada.', precio: 10900, categoria: 'especiales', imagen_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', orden: 3 },
    { nombre: 'La Fogonera', descripcion: 'Carne a la parrilla, queso azul, cebolla al vino y hojas verdes.', precio: 10500, categoria: 'especiales', imagen_url: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFtYnVyZ3Vlc2FzfGVufDB8fDB8fHww', orden: 4 },
    { nombre: 'Monte Verde', descripcion: 'Medallón de garbanzos, palta, tomate, hojas verdes y aderezo cítrico.', precio: 9200, categoria: 'especiales', imagen_url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80', orden: 5 },
    { nombre: 'La Ahumada', descripcion: 'Carne a la parrilla, provolone, panceta, pepinillos y barbacoa de la casa.', precio: 10200, categoria: 'especiales', imagen_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80', orden: 6 },
    { nombre: 'Papas de la Casa', descripcion: 'Papas rústicas al romero con mayo de hierbas.', precio: 3900, categoria: 'acompanamientos', imagen_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', orden: 7 },
    { nombre: 'Aros de Cebolla', descripcion: 'Crujientes, dorados y hechos al momento.', precio: 4200, categoria: 'acompanamientos', imagen_url: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80', orden: 8 },
    { nombre: 'Limonada de Estación', descripcion: 'Limón recién exprimido, menta y un toque de jengibre.', precio: 2800, categoria: 'bebidas', imagen_url: 'https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGltb25hZGF8ZW58MHx8MHx8fDA%3D', orden: 9 },
    { nombre: 'Bebida de la Casa', descripcion: 'Consulta las opciones frescas disponibles hoy.', precio: 2500, categoria: 'bebidas', imagen_url: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80', orden: 10 }
];

const menuCategoryLabels = {
    clasicas: 'Clásica',
    especiales: 'Especial',
    acompanamientos: 'Acompañamiento',
    bebidas: 'Bebida'
};

document.querySelectorAll('.logo-image').forEach((image) => {
    const showLogo = () => {
        image.classList.add('is-ready');
        image.closest('.brand')?.classList.add('has-logo');
        image.closest('.hero-logo-wrap')?.classList.add('has-logo');
    };
    image.addEventListener('load', showLogo);
    image.addEventListener('error', () => { image.hidden = true; });
    if (image.complete && image.naturalWidth > 0) showLogo();
    });

const menuGrid = document.querySelector('#menu-grid');
const menuStatus = document.querySelector('#menu-status');
const menuCount = document.querySelector('#menu-count');

function safeImageUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' ? url.href : '';
    } catch {
        return '';
    }
    }

function formatPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return '';
    return `$ ${new Intl.NumberFormat('es', { maximumFractionDigits: 0 }).format(amount)}`;
}

function createMenuCard(item, index) {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.dataset.category = item.categoria;
    card.style.animationDelay = `${Math.min(index % 4, 3) * 65}ms`;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'menu-card-image';
    const imageUrl = safeImageUrl(item.imagen_url || '');
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = item.nombre;
        image.loading = 'lazy';
        image.decoding = 'async';
        imageWrap.append(image);
    }

    const category = document.createElement('span');
    category.className = 'menu-card-category';
    category.textContent = menuCategoryLabels[item.categoria] || item.categoria;
    imageWrap.append(category);

    const body = document.createElement('div');
    body.className = 'menu-card-body';
    const titleRow = document.createElement('div');
    titleRow.className = 'menu-card-title-row';
    const title = document.createElement('h3');
    title.textContent = item.nombre;
    const price = document.createElement('span');
    price.className = 'menu-card-price';
    price.textContent = formatPrice(item.precio);
    titleRow.append(title, price);
    const description = document.createElement('p');
    description.textContent = item.descripcion || '';
    body.append(titleRow, description);
    card.append(imageWrap, body);
    return card;
}

function renderMenu(items) {
    menuGrid.replaceChildren(...items.map(createMenuCard));
    menuCount.textContent = `${items.length} ${items.length === 1 ? 'opción' : 'opciones'}`;
    applyMenuFilter(document.querySelector('.menu-tab.is-active')?.dataset.category || 'todas');
}

function applyMenuFilter(category) {
    const cards = [...menuGrid.querySelectorAll('.menu-card')];
    let visibleCount = 0;
    cards.forEach((card) => {
        const visible = category === 'todas' || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
    });
    menuCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'opción' : 'opciones'}`;
}

document.querySelectorAll('.menu-tab').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.menu-tab').forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
        });
        applyMenuFilter(button.dataset.category);
    });
});

async function loadMenu() {
    let items = menuFallback;
    if (window.nativoSupabaseConfigured) {
        const { data, error } = await window.nativoSupabase
        .from('menu')
        .select('nombre, descripcion, precio, categoria, imagen_url, orden')
        .eq('disponible', true)
        .order('orden', { ascending: true });

        if (!error && data?.length) {
        items = data;
        } else if (error) {
        menuStatus.textContent = 'No pudimos conectar con la carta online. Te mostramos el menú de ejemplo.';
        console.error('Error al cargar el menú:', error.message);
        }
    }
    renderMenu(items);
}

loadMenu();