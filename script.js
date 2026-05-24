/* ===========================
   OISHI RAMEN — SCRIPT.JS
   =========================== */

'use strict';

// ---- MENU DATA ----
// veg: true = Vegetarian, false = Non-Vegetarian
// image: path to image file (e.g. 'images/ramen.jpg')
const MENU = {
  hotRamen: [
    { id:1, name:'Paitan Ramen',       price:'₹279', desc:'Rich broth with tender noodles and signature flavour.',                                                                   tag:'Signature', jp:'パイタンラーメン',       veg: false, image:'images/1.jpg' },
    { id:2, name:'Shoyu Ramen',        price:'₹289', desc:'Sauce based ramen with balanced umami taste.',                                                                            tag:'Classic',   jp:'しょうゆラーメン',        veg: false, image:'images/1.jpg' },
    { id:3, name:'Miso Ramen',         price:'₹349', desc:'Classic Japanese miso based ramen with savory depth.',                                                                    tag:'Popular',   jp:'味噌ラーメン',             veg: false, image:'images/1.jpg' },
    { id:4, name:'Shoyu Paitan Ramen', price:'₹319', desc:'A fusion of shoyu sauce and paitan ramen broth flavour.',                                                                 tag:'Fusion',    jp:'しょうゆパイタン',         veg: false, image:'images/1.jpg' },
    { id:5, name:'Tantanmen',          price:'₹299', desc:'Spicy sesame ramen with creamy texture, topped with minced chicken and spring onions.',                                   tag:'Spicy',     jp:'担々麺',                  veg: false, image:'images/1.jpg' }
  ],
  ramen: [
    { id:1, name:'Veg Ramen',           price:'₹199', desc:'Light and flavourful vegetarian ramen.',                                                                                  tag:'Vegetarian', jp:'ベジラーメン',           veg: true,  image:'images/1.jpg' },
    { id:2, name:'Kimchi Ramen',        price:'₹210', desc:'An incredibly flavourful kimchi ramen with spicy authentic flavors.',                                                     tag:'Spicy',      jp:'キムチラーメン',          veg: true,  image:'images/1.jpg' },
    { id:3, name:'Gochujang Soba',      price:'₹320', desc:'Great fusion taste of chilli honey and sesame oil, served with signature toppings.',                                      tag:'Fusion',     jp:'コチュジャンそば',        veg: true,  image:'images/1.jpg' },
    { id:4, name:'Taiwan Mazesoba',     price:'₹289', desc:'Seasoned sautéed minced chicken soba with spring onion, poached egg and nori on top.',                                   tag:"Chef's Pick",jp:'台湾まぜそば',            veg: false, image:'images/1.jpg' },
    { id:5, name:'Shoyu Karaage Soba',  price:'₹289', desc:'Light seasoned soba with soy sauce, karaage chicken, spring onion and shredded nori on top.',                            tag:'Popular',    jp:'しょうゆからあげそば',    veg: false, image:'images/1.jpg' },
    { id:6, name:'Aburi Soba',          price:'₹299', desc:'Light seasoned soba with aburi sauce, spring onion, braised chicken and soft boiled egg on top.',                         tag:'Signature',  jp:'あぶりそば',             veg: false, image:'images/1.jpg' }
  ],
  sushi: {
    smallRoll: {
      title:'Small Roll', badge:'6 PCS',
      items:[
        { id:1, name:'Carrot Maki',  price:'₹129', veg: true,  image:'images/1.jpg' },
        { id:2, name:'Kappa Maki',   price:'₹129', veg: true,  image:'images/1.jpg' },
        { id:3, name:'Tuna Maki',    price:'₹169', veg: false, image:'images/1.jpg' },
        { id:4, name:'Kimchi Maki',  price:'₹159', veg: true,  image:'images/1.jpg' }
      ]
    },
    modernRoll: {
      title:'Modern Roll', badge:'8 PCS',
      items:[
        { id:1, name:'Shrimp Futo Maki',     price:'₹259', veg: false, image:'images/1.jpg' },
        { id:2, name:'Cheese Cucumber Roll', price:'₹209', veg: true,  image:'images/1.jpg' },
        { id:3, name:'Oishi Veg Roll',       price:'₹229', veg: true,  image:'images/1.jpg' },
        { id:4, name:'Kaarage Futo Maki',    price:'₹269', veg: false, image:'images/1.jpg' }
      ]
    }
  },
  appetisers: [
    { id:1, name:'Kaarage',           price:'₹219', desc:'Japanese seasoned style fried chicken bites.',                             tag:'Popular', jp:'からあげ',  veg: false, image:'images/1.jpg' },
    { id:2, name:'Ebi Fried (Shrimp)',price:'₹219', desc:'Crispy deep fried shrimp served with tempura sauce on the side.',          tag:'Seafood',  jp:'海老フライ', veg: false, image:'images/1.jpg' }
  ],
  beverage: [
    { id:1, name:'Peach Ice Tea',    price:'₹80',  icon:'🍑' },
    { id:2, name:'Lemon Ice Tea',    price:'₹80',  icon:'🍋' },
    { id:3, name:'Red Bull Ice Tea', price:'₹149', icon:'🧃' },
    { id:4, name:'Red Bull',         price:'₹129', icon:'⚡' },
    { id:5, name:'Virgin Mojito',    price:'₹89',  icon:'🍹' },
    { id:6, name:'Sprite',           price:'₹60',  icon:'🥤' },
    { id:7, name:'Coke',             price:'₹60',  icon:'🥤' },
    { id:8, name:'Lemon Soda',       price:'₹80',  icon:'🍋' }
  ],
  toppings: [
    { id:1, name:'Chicken',    price:'₹69', icon:'🍗' },
    { id:2, name:'Egg',        price:'₹30', icon:'🥚' },
    { id:3, name:'Sweet Corn', price:'₹20', icon:'🌽' },
    { id:4, name:'Kimchi',     price:'₹40', icon:'🌶' }
  ]
};

// ---- HELPERS ----
const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);

// ---- SPLASH ----
function initSplash() {
  const el = $('splash');
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => {
      el.style.display = 'none';
      document.body.style.overflow = '';
      initReveal();
    }, 700);
  }, 2300);
}

// ---- THEME ---- default: dark
function initTheme() {
  const saved = localStorage.getItem('oishi-theme');
  const theme = saved ? saved : 'dark';
  document.body.setAttribute('data-theme', theme);
  $('themeToggle').addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('oishi-theme', next);
  });
}

// ---- NAVBAR ----
function initNav() {
  const nav = $('navbar');
  const ham = $('hamburger');
  const links = $('navLinks');
  const ov = $('navOverlay');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    $('backToTop').classList.toggle('show', window.scrollY > 400);
  });

  const close = () => {
    ham.classList.remove('open');
    links.classList.remove('open');
    ov.classList.remove('show');
    document.body.style.overflow = '';
  };

  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    links.classList.toggle('open', open);
    ov.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  ov.addEventListener('click', close);
  $$('.nav-link').forEach(l => l.addEventListener('click', close));

  const sections = $$('section[id]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => obs.observe(s));
}

// ---- BACK TO TOP ----
function initBTT() {
  $('backToTop').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

// ---- SCROLL REVEAL ----
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -70px 0px', threshold: 0.08 });
  $$('.reveal').forEach(el => obs.observe(el));
}

// ---- CARD ENTRANCE — smooth, uniform, staggered ----
function observeCards() {
  const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const DURATION = '0.55s';
  const BASE_DELAY = 60;

  const groups = [
    '#hotRamenGrid .menu-card',
    '#ramenGrid .menu-card',
    '#appetisersGrid .menu-card',
    '#sushiCategories .sushi-row',
    '#sushiCategories .sushi-cat',
    '#toppingsGrid .bev-card',
    '.bev-card'
  ];

  groups.forEach(selector => {
    const items = $$(selector);
    items.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'none';
    });

    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).map(e => e.target);
      if (!visible.length) return;

      const sorted = [...items].filter(el => visible.includes(el));
      sorted.forEach((el, i) => {
        const delay = i * BASE_DELAY;
        setTimeout(() => {
          el.style.transition = `opacity ${DURATION} ${EASING}, transform ${DURATION} ${EASING}`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.06 });

    items.forEach(el => obs.observe(el));
  });
}

// ---- BALANCED GRID (desktop) ----
function applyBalancedGrid(gridEl, count) {
  if (window.innerWidth <= 540) {
    gridEl.style.gridTemplateColumns = 'repeat(2, 1fr)';
    return;
  }
  if (window.innerWidth <= 900) {
    gridEl.style.gridTemplateColumns = 'repeat(2, 1fr)';
    return;
  }
  let bestCols = 3;
  let bestWaste = Infinity;
  for (let cols = 2; cols <= 4; cols++) {
    const rows = Math.ceil(count / cols);
    const lastRow = count - (rows - 1) * cols;
    const waste = cols - lastRow;
    if (waste < bestWaste || (waste === bestWaste && cols > bestCols)) {
      bestWaste = waste;
      bestCols = cols;
    }
  }
  const rows = Math.ceil(count / bestCols);
  const lastRow = count - (rows - 1) * bestCols;
  if (lastRow === 1 && count > 2) {
    const altCols = bestCols - 1;
    if (altCols >= 2) bestCols = altCols;
  }
  gridEl.style.gridTemplateColumns = `repeat(${bestCols}, 1fr)`;
}

// ---- VEG / NON-VEG BADGE HTML ----
function vegBadge(veg) {
  if (veg === true) {
    return `<span class="diet-badge diet-veg" title="Vegetarian">
      <span class="diet-dot"></span>Veg
    </span>`;
  } else if (veg === false) {
    return `<span class="diet-badge diet-nonveg" title="Non-Vegetarian">
      <span class="diet-dot"></span>Non-Veg
    </span>`;
  }
  return '';
}

// ---- CARD IMAGE HTML ----
function cardImageHTML(item) {
  const src = item.image || '';
  const alt = item.name || 'Dish';
  return `<div class="card-img">
    <img
      class="card-dish-img"
      src="${src}"
      alt="${alt}"
      loading="lazy"
      onerror="this.onerror=null;this.style.display='none';this.parentElement.querySelector('.card-img-alt').style.display='flex';"
    />
    <div class="card-img-alt" style="display:none;">
      <span class="card-img-alt-text">${alt}</span>
    </div>
    ${item.tag ? `<span class="card-img-badge">${item.tag}</span>` : ''}
    ${vegBadge(item.veg)}
  </div>`;
}

// ---- MODAL ----
const modal = {
  ov: $('modalOverlay'),
  body: $('modalBody'),
  imgWrap: $('modalImgWrap'),

  open(data) {
    // Show modal immediately with text content
    this.body.innerHTML = `
      <div class="modal-red-bar"></div>
      <div class="modal-jp">${data.jp || '日本料理'}</div>
      <div class="modal-name">${data.name}</div>
      <div class="modal-price">${data.price}</div>
      <div class="modal-hr"></div>
      <div class="modal-desc">${data.desc || 'Crafted with authentic Japanese technique and the finest ingredients.'}</div>
      <div class="modal-footer-badges">
        <div class="modal-footer-left">
          ${data.tag ? `<div class="modal-tag">◆ ${data.tag}</div>` : '<div></div>'}
        </div>
        <div class="modal-footer-right">
          ${data.veg !== undefined ? `<div class="modal-diet">${vegBadge(data.veg)}</div>` : ''}
        </div>
      </div>
    `;

    this.imgWrap.innerHTML = `
      <div class="modal-img-real">
        <div class="modal-img-shimmer"></div>
        <img
          src="${data.image || ''}"
          alt="${data.name || 'Dish'}"
          loading="eager"
          decoding="async"
          onload="this.style.opacity='1';var s=this.previousElementSibling;if(s&&s.classList.contains('modal-img-shimmer'))s.style.display='none';"
          onerror="this.onerror=null;this.style.display='none';var s=this.previousElementSibling;if(s)s.style.display='none';var f=this.parentElement.querySelector('.modal-img-fallback');if(f)f.style.display='flex';"
          style="opacity:0;transition:opacity 0.2s ease;"
        />
        <div class="modal-img-fallback" style="display:none;">
          <span class="modal-img-fallback-text">${data.name || 'Dish Image'}</span>
        </div>
      </div>
    `;

    this.ov.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Handle already-cached images (onload won't fire for cached)
    const img = this.imgWrap.querySelector('img');
    if (img && img.complete && img.naturalWidth > 0) {
      img.style.opacity = '1';
      const shimmer = this.imgWrap.querySelector('.modal-img-shimmer');
      if (shimmer) shimmer.style.display = 'none';
    }
  },

  close() {
    this.ov.classList.remove('open');
    document.body.style.overflow = '';
  }
};

$('modalClose').addEventListener('click', () => modal.close());
$('modalOverlay').addEventListener('click', e => { if (e.target === $('modalOverlay')) modal.close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.close(); });

// ---- RENDER: MENU CARD ----
function makeCard(item, idx) {
  return `
    <div class="menu-card" role="button" tabindex="0" data-idx="${idx}">
      ${cardImageHTML(item)}
      <div class="card-body">
        <div class="card-top">
          <div class="card-name">${item.name}</div>
          <div class="card-price">${item.price}</div>
        </div>
      </div>
    </div>
  `;
}

function attachCards(gridId, dataArr) {
  const grid = $(gridId);
  grid.innerHTML = dataArr.map((item, i) => makeCard(item, i)).join('');

  applyBalancedGrid(grid, dataArr.length);

  grid.querySelectorAll('.menu-card').forEach((card, i) => {
    card.addEventListener('click', () => modal.open(dataArr[i]));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter') modal.open(dataArr[i]);
    });
  });

  window.addEventListener('resize', () => applyBalancedGrid(grid, dataArr.length));
}

// ---- RENDER: HOT RAMEN ----
function renderHotRamen() { attachCards('hotRamenGrid', MENU.hotRamen); }

// ---- RENDER: RAMEN ----
function renderRamen() { attachCards('ramenGrid', MENU.ramen); }

// ---- RENDER: SUSHI ----
function renderSushi() {
  const wrap = $('sushiCategories');
  const cats = [MENU.sushi.smallRoll, MENU.sushi.modernRoll];
  wrap.innerHTML = cats.map(cat => `
    <div class="sushi-cat reveal">
      <div class="sushi-cat-hd">
        <span class="sushi-cat-name">${cat.title}</span>
        <span class="sushi-cat-pcs">${cat.badge}</span>
      </div>
      <div class="sushi-items" data-count="${cat.items.length}">
        ${cat.items.map((item, i) => `
          <div class="sushi-row" role="button" tabindex="0"
               data-cat="${cat.title}" data-idx="${i}">
            <div class="sushi-img">
              <img
                class="card-dish-img"
                src="${item.image || ''}"
                alt="${item.name}"
                loading="lazy"
                onerror="this.onerror=null;this.style.display='none';this.parentElement.querySelector('.card-img-alt').style.display='flex';"
              />
              <div class="card-img-alt" style="display:none;">
                <span class="card-img-alt-text">${item.name}</span>
              </div>
              <span class="sushi-idx">0${item.id}</span>
              ${vegBadge(item.veg)}
            </div>
            <div class="sushi-info">
              <span class="sushi-name">${item.name}</span>
              <span class="sushi-price">${item.price}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  wrap.querySelectorAll('.sushi-items').forEach(grid => {
    const count = parseInt(grid.getAttribute('data-count'), 10);
    applyBalancedGrid(grid, count);
    window.addEventListener('resize', () => applyBalancedGrid(grid, count));
  });

  wrap.querySelectorAll('.sushi-row').forEach(row => {
    const open = () => {
      const catKey = row.dataset.cat === 'Small Roll' ? 'smallRoll' : 'modernRoll';
      const item = MENU.sushi[catKey].items[+row.dataset.idx];
      modal.open({ ...item, jp:'寿司', desc:'Freshly handcrafted with premium ingredients.', tag:'Sushi Roll' });
    };
    row.addEventListener('click', open);
    row.addEventListener('keypress', e => { if (e.key === 'Enter') open(); });
  });
}

// ---- RENDER: APPETISERS ----
function renderAppetisers() { attachCards('appetisersGrid', MENU.appetisers); }

// ---- RENDER: BEVERAGE (keeps icons) ----
function renderBeverage() {
  $('beverageGrid').innerHTML = MENU.beverage.map((item, i) => `
    <div class="bev-card">
      <div class="bev-left">
        <span class="bev-num">0${item.id}</span>
        <span class="bev-icon">${item.icon}</span>
        <span class="bev-name">${item.name}</span>
      </div>
      <div class="bev-price">${item.price}</div>
    </div>
  `).join('');
}

// ---- RENDER: TOPPINGS (beverage style) ----
function renderToppings() {
  $('toppingsGrid').innerHTML = MENU.toppings.map(item => `
    <div class="bev-card">
      <div class="bev-left">
        <span class="bev-num">0${item.id}</span>
        <span class="bev-icon">${item.icon}</span>
        <span class="bev-name">${item.name}</span>
      </div>
      <div class="bev-price">${item.price}</div>
    </div>
  `).join('');
}

// ---- PRELOAD ALL MENU IMAGES ----
function preloadMenuImages() {
  const allImages = new Set();
  [...MENU.hotRamen, ...MENU.ramen, ...MENU.appetisers].forEach(item => {
    if (item.image) allImages.add(item.image);
  });
  [MENU.sushi.smallRoll, MENU.sushi.modernRoll].forEach(cat => {
    cat.items.forEach(item => { if (item.image) allImages.add(item.image); });
  });
  allImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ---- INIT ----
function init() {
  document.body.style.overflow = 'hidden';

  renderHotRamen();
  renderRamen();
  renderSushi();
  renderAppetisers();
  renderBeverage();
  renderToppings();

  initTheme();
  initNav();
  initBTT();
  initSplash();

  setTimeout(observeCards, 120);

  // Preload modal images silently in background after page settles
  setTimeout(preloadMenuImages, 1500);
}

document.addEventListener('DOMContentLoaded', init);