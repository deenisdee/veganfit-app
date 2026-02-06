// ============================================
// ARQUIVO: js/app.js (REVISADO)
// ============================================


// ===================================
// DETECÇÃO DE RETORNO DO MERCADO PAGO
// ===================================

window.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const returnType = urlParams.get('return');

  if (returnType) {
    // Remove o parâmetro da URL sem recarregar
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    // Aguarda 500ms pra garantir que tudo carregou
    setTimeout(() => {
      if (returnType === 'success') {
        // Abre modal na aba 3
        openPremiumModal('mp-success');
        switchTab(3);
        showNotification(
        '✅ Pagamento Aprovado!',
        'Digite o código que você recebeu por e-mail'
        );
      } else if (returnType === 'pending') {
      showNotification(
      '⏳ Pagamento Pendente',
      'Você receberá o código assim que confirmarmos o pagamento'
      );
    } else if (returnType === 'failure') {
    openPremiumModal('mp-failure');
    switchTab(2); // Volta pra aba de planos
    showNotification(
    '❌ Pagamento Não Aprovado',
    'Tente novamente ou escolha outro método de pagamento'
    );
  }
}, 500);
}
});






// TÉCNICAS ANTI-BURLA (DevTools)
// Dificuldade: ⭐⭐⭐☆☆ (só dev experiente consegue)
// ============================================

// ============================================
// PROTEÇÃO ANTI-BURLA (3 camadas) - V2
// ============================================

/* (bloco comentado removido: código legado desativado) */

// setupIngredientDropdown()
// - Inicializa o dropdown "Buscar por ingredientes"
// - NÃO depende do botão Aplicar
// - Clicou no ingrediente => aplica automaticamente (sem precisar aplicar)
// - Limpar continua funcionando

/* =========================================================
FUNÇÃO: setupIngredientDropdown
PARA QUE SERVE:
- Inicializa e configura a rotina setupIngredientDropdown (eventos, estado e elementos de UI relacionados).
========================================================= */
function setupIngredientDropdown() {
  const toggle = document.getElementById('rfIngToggle');
  const panel = document.getElementById('rfIngPanel');
  const grid = document.getElementById('rfIngGrid');
  const btnClear = document.getElementById('rfIngClear');

  if (!toggle || !panel || !grid || !btnClear) return;

  // ✅ Usa o id REAL do seu HTML: search-input

  /* =========================================================
  FUNÇÃO: getSearchInput
  PARA QUE SERVE:
  - Obtém/carrega dados necessários para getSearchInput (UI/estado/localStorage/API).
  ========================================================= */
  function getSearchInput() {
    return document.getElementById('search-input');
  }

let selected = new Set();

function collectIngredientsFromRecipes() {
  const out = new Set();
  if (!Array.isArray(window.RECIPES)) return [];

  window.RECIPES.forEach((r) => {
    const list = Array.isArray(r?.ingredients) ? r.ingredients : [];
    list.forEach((ing) => {
      let text = '';

      if (!ing) return;
      if (typeof ing === 'string') text = ing;
      else if (typeof ing.text === 'string') text = ing.text;
      else if (typeof ing.name === 'string') text = ing.name;

      text = String(text || '').trim().toLowerCase();

      text = text
      .replace(/\d+/g, ' ')
      .replace(/\b(xícara|xicara|colher|sopa|chá|cha|ml|g|kg|un|unidade|pitada|a\s+gosto)\b/gi, ' ')
      .replace(/[()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

      if (text.length < 3) return;

      out.add(text);
    });
});

return Array.from(out).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}


/* =========================================================
FUNÇÃO: renderChips
PARA QUE SERVE:
- Renderiza/atualiza a UI relacionada a renderChips com base no estado atual do app.
========================================================= */
function renderChips(items) {
  // =========================
  // ÍCONES POR INGREDIENTE (Lucide)
  // =========================
  function pickIcon(label) {
    const t = String(label || '').toLowerCase();

    // frutas
    if (t.includes('banana')) return 'banana';
    if (t.includes('maca') || t.includes('maçã')) return 'apple';
    if (t.includes('limao') || t.includes('limão') || t.includes('laranja')) return 'citrus';
    if (t.includes('morango')) return 'cherry';
    if (t.includes('uva')) return 'grape';
    if (t.includes('abacate')) return 'avocado';
    if (t.includes('abacaxi')) return 'sparkles'; // se não tiver ícone específico, cai no padrão

    // legumes / verduras
    if (t.includes('cenoura')) return 'carrot';
    if (t.includes('tomate')) return 'tomato';
    if (t.includes('cebola')) return 'onion';
    if (t.includes('alho')) return 'garlic';
    if (t.includes('abobora') || t.includes('abóbora')) return 'pumpkin';
    if (t.includes('cogumelo') || t.includes('champignon')) return 'mushroom';
    if (t.includes('espinafre') || t.includes('alface') || t.includes('couve') || t.includes('brocolis') || t.includes('brócolis')) return 'leaf';

    // grãos / cereais
    if (t.includes('arroz') || t.includes('aveia') || t.includes('farinha')) return 'wheat';

    // proteínas vegetais
    if (t.includes('tofu')) return 'cube';
    if (t.includes('grao de bico') || t.includes('grão de bico') || t.includes('feijao') || t.includes('feijão') || t.includes('lentilha')) return 'bean';

    // líquidos / temperos
    if (t.includes('agua') || t.includes('água')) return 'droplets';
    if (t.includes('leite')) return 'milk';
    if (t.includes('azeite') || t.includes('oleo') || t.includes('óleo')) return 'droplet';

    // ✅ padrão igual ao botão Ingredientes (sparkles)
    return 'sparkles';
  }

grid.innerHTML = items.map((label) => {
  const safe = label.replace(/"/g, '&quot;');
  const active = selected.has(label) ? 'is-active' : '';
  const icon = pickIcon(label);

  return `
      <button
        type="button"
        class="rf-chip tap rf-ing-chip ${active}"
        data-ing="${safe}"
        aria-pressed="${selected.has(label) ? 'true' : 'false'}"
      >
        <i data-lucide="${icon}"></i>
        <span class="rf-ing-chip__label">${label}</span>
      </button>
    `;
}).join('');

try {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
} catch (_) {}
}




/* =========================================================
FUNÇÃO: toggleChip
PARA QUE SERVE:
- Alterna um estado (liga/desliga) relacionado a toggleChip e atualiza a UI quando necessário.
========================================================= */
function toggleChip(label) {
  if (selected.has(label)) selected.delete(label);
  else selected.add(label);
}

function setOpen(isOpen) {
  toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen) panel.classList.remove('hidden');
  else panel.classList.add('hidden');
}


/* =========================================================
FUNÇÃO: applySelectionAuto
PARA QUE SERVE:
- Executa a lógica encapsulada em applySelectionAuto.
========================================================= */
function applySelectionAuto() {
  const input = getSearchInput();
  const list = Array.from(selected);

  if (!input) return;

  if (list.length === 0) input.value = '';
  else input.value = `ing: ${list.join(', ')}`;

    // ✅ Isso dispara o motor oficial do input
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }


/* =========================================================
   FUNÇÃO: clearSelection
   PARA QUE SERVE:
   - Executa a lógica encapsulada em clearSelection.
   ========================================================= */
  function clearSelection() {
    const input = getSearchInput();
    selected = new Set();

    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    renderChips(ingredientsList);
  }

  const ingredientsList = collectIngredientsFromRecipes();
  renderChips(ingredientsList);
  setOpen(false);

  panel.addEventListener('click', (e) => e.stopPropagation());
  grid.addEventListener('click', (e) => e.stopPropagation());
  toggle.addEventListener('click', (e) => e.stopPropagation());

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';

    if (!open && typeof window.closeAdvancedFiltersPanel === 'function') {
      window.closeAdvancedFiltersPanel();
    }

    setOpen(!open);
  });

  document.addEventListener('click', (e) => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (!open) return;

    const inside = e.target.closest('.rf-filter-row, #ingredients-filters, .rf-ingredients, #rfIngPanel');
    if (!inside) setOpen(false);
  });

  grid.addEventListener('click', (e) => {
    const el = e.target.closest('.rf-ing-chip');
    if (!el) return;

    const label = String(el.getAttribute('data-ing') || '').trim().toLowerCase();
    if (!label) return;

    const exact = ingredientsList.find(x => x.toLowerCase() === label) || label;

    toggleChip(exact);
    renderChips(ingredientsList);

    applySelectionAuto();
  });

  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest('.rf-ing-chip');
    if (!el) return;
    e.preventDefault();
    el.click();
  });

  btnClear.addEventListener('click', function () {
  clearSelection();
  setOpen(false); // ✅ fecha o box após limpar
});

}




// =====================================
// HERO SLIDER (drag/snap + click)
// Requisitos no HTML:
// - #sliderTrack (container das slides)
// - #sliderDots (dots)
// Cada slide deve ter: data-recipe-id="123"
// =====================================

/* =========================================================
   FUNÇÃO: setupHeroSliderDrag
   PARA QUE SERVE:
   - Inicializa e configura a rotina setupHeroSliderDrag (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function setupHeroSliderDrag() {
  const track = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('sliderDots');
  if (!track) return;

  // evita duplicar listeners
  if (track.dataset.dragReady === '1') return;
  track.dataset.dragReady = '1';

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;
  let moved = false;

  const DRAG_THRESHOLD_PX = 10;     // separa click de drag
  const SNAP_THRESHOLD_RATIO = 0.18; // % da largura para trocar slide


/* =========================================================
   FUNÇÃO: slides
   PARA QUE SERVE:
   - Executa a lógica encapsulada em slides.
   ========================================================= */
  function slides() {
    return Array.from(track.children || []);
  }

  function slideWidth() {
    const s = slides();
    if (!s.length) return 0;
    const rect = s[0].getBoundingClientRect();
    return rect.width || 0;
  }


/* =========================================================
   FUNÇÃO: clampIndex
   PARA QUE SERVE:
   - Executa a lógica encapsulada em clampIndex.
   ========================================================= */
  function clampIndex(i) {
    const max = Math.max(0, slides().length - 1);
    return Math.min(max, Math.max(0, i));
  }

  function setTranslate(x) {
    track.style.transform = `translate3d(${x}px,0,0)`;
  }


/* =========================================================
   FUNÇÃO: goto
   PARA QUE SERVE:
   - Executa a lógica encapsulada em goto.
   ========================================================= */
  function goto(i, animate = true) {
    index = clampIndex(i);
    const w = slideWidth();
    const x = -index * w;

    track.style.transition = animate ? 'transform 260ms ease' : 'none';
    setTranslate(x);

    updateDots();
  }


/* =========================================================
   FUNÇÃO: updateDots
   PARA QUE SERVE:
   - Executa a lógica encapsulada em updateDots.
   ========================================================= */
  function updateDots() {
    if (!dotsEl) return;
    const s = slides();
    dotsEl.innerHTML = s.map((_, i) => `
  <button class="slider-dot ${i === index ? 'active' : ''}" type="button" aria-label="Slide ${i + 1}"></button>
  `).join('');

    // click nos dots
    Array.from(dotsEl.querySelectorAll('.slider-dot')).forEach((btn, i) => {
      btn.addEventListener('click', () => goto(i, true));
    });
  }


/* =========================================================
   FUNÇÃO: onResize
   PARA QUE SERVE:
   - Executa a lógica encapsulada em onResize.
   ========================================================= */
  function onResize() {
    // recalc posição atual no novo width
    goto(index, false);
  }

  // Clique do slide (se não arrastou)
  track.addEventListener('click', (e) => {
    if (moved) return; // se arrastou, não é click
    const slide = e.target.closest?.('[data-recipe-id]');
    if (!slide) return;

    const id = slide.getAttribute('data-recipe-id');
    if (!id) return;

    // chama seu PORTEIRO (crédito/premium/unlocked)
    if (typeof requestOpenRecipe === 'function') {
      requestOpenRecipe(String(id));
    } else if (typeof renderRecipeDetail === 'function') {
      // fallback: abre direto (não ideal, mas evita quebrar)
      renderRecipeDetail(String(id));
    }
  });
  
  
    track.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    const slide = e.target.closest?.('[data-recipe-id]');
    if (!slide) return;

    e.preventDefault();

    const id = slide.getAttribute('data-recipe-id');
    if (!id) return;

    if (typeof requestOpenRecipe === 'function') requestOpenRecipe(String(id));
  });

  
  

  // Drag (pointer events)
  track.addEventListener('pointerdown', (e) => {
    // só botão principal / toque
    track.setPointerCapture?.(e.pointerId);

    dragging = true;
    moved = false;
    startX = e.clientX;
    currentX = e.clientX;

    track.style.transition = 'none';
  });

  track.addEventListener('pointermove', (e) => {
    if (!dragging) return;

    currentX = e.clientX;
    const dx = currentX - startX;

    if (Math.abs(dx) > DRAG_THRESHOLD_PX) moved = true;

    const w = slideWidth();
    const baseX = -index * w;
    setTranslate(baseX + dx);
  });


/* =========================================================
   FUNÇÃO: endDrag
   PARA QUE SERVE:
   - Executa a lógica encapsulada em endDrag.
   ========================================================= */
  function endDrag() {
    if (!dragging) return;
    dragging = false;

    const dx = currentX - startX;
    const w = slideWidth();

    // snap
    const ratio = w ? Math.abs(dx) / w : 0;
    if (ratio > SNAP_THRESHOLD_RATIO) {
      if (dx < 0) goto(index + 1, true);
      else goto(index - 1, true);
    } else {
      goto(index, true);
    }

    // libera o click na próxima interação
    setTimeout(() => { moved = false; }, 0);
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', onResize);

  // Inicializa dots e posição
  goto(0, false);
}

// (Opcional) API para setas existentes chamarem

/* =========================================================
   FUNÇÃO: heroSliderNext
   PARA QUE SERVE:
   - Executa a lógica encapsulada em heroSliderNext.
   ========================================================= */
function heroSliderNext() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  const total = track.children?.length || 0;
  const cur = Number(track.dataset.heroIndex || '0');
  const next = Math.min(total - 1, cur + 1);
  track.dataset.heroIndex = String(next);
}


/* =========================================================
   FUNÇÃO: heroSliderPrev
   PARA QUE SERVE:
   - Executa a lógica encapsulada em heroSliderPrev.
   ========================================================= */
function heroSliderPrev() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  const cur = Number(track.dataset.heroIndex || '0');
  const prev = Math.max(0, cur - 1);
  track.dataset.heroIndex = String(prev);
}







// ============================================
// Premium – estado único (com validade) + sync de UI (Header/Tab/Hamb)
// ============================================
window.RF = window.RF || {};

/**
 * syncPremiumFromCore
 * --------------------------------------------------
 * Sincroniza o estado Premium de forma consistente:
 * - Se existir isPremiumValidNow(), ela é a verdade (flag + expiração)
 * - Mantém isPremium alinhado com a validade real
 * - Atualiza a UI do Premium (header/tab/hamb) via RF.premium.syncUI()
 *
 * Use depois de:
 * - loadUserData()
 * - activatePremium()
 * - clearPremiumState()/forceFreeCleanup()
 */

/* =========================================================
   FUNÇÃO: syncPremiumFromCore
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em syncPremiumFromCore (estado, validação e sincronização de UI).
   ========================================================= */
function syncPremiumFromCore() {
  try {
    const valid = (typeof isPremiumValidNow === 'function')
      ? isPremiumValidNow()
      : (localStorage.getItem('fit_premium') === 'true');

    // Alinha variáveis globais
    isPremium = valid === true;

    // Se expirou/inválido, garante limpeza mínima (evita UI “presa” em Premium)
    if (!isPremium) {
      premiumToken = null;
      premiumExpires = null;
    } else {
      // Se você tiver expires em storage, mantém no core para badge/timers
      if (typeof getPremiumExpiresFromStorage === 'function') {
        const exp = getPremiumExpiresFromStorage();
        if (exp && Number.isFinite(exp)) premiumExpires = exp;
      }
    }

    // Sincroniza UI Premium (Header/Tab/Hamb)
    if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }
  } catch (e) {
    console.warn('[syncPremiumFromCore] Falha ao sincronizar:', e);
  }
}

RF.premium = {
  /**
   * isActive
   * --------------------------------------------------
   * Retorna TRUE apenas se Premium estiver realmente válido.
   * Se existir isPremiumValidNow(), ela manda.
   */
  isActive: function () {
    try {
      if (typeof isPremiumValidNow === 'function') return isPremiumValidNow();
      return localStorage.getItem('fit_premium') === 'true';
    } catch (_) {
      return false;
    }
  },

  /**
   * setActive
   * --------------------------------------------------
   * Mantém compatibilidade com chamadas existentes.
   * - Ao DESATIVAR: limpa flag + token + expires (fonte única)
   * - Ao ATIVAR: apenas marca flag true (pressupõe que token/exp já foram setados no fluxo normal)
   */
  setActive: function (active) {
    try {
      if (!active) {
        // Preferência: limpeza central (zera flag, token e expiração + variáveis)
        if (typeof clearPremiumState === 'function') {
          clearPremiumState();
        } else {
          localStorage.setItem('fit_premium', 'false');
          localStorage.setItem('fit_premium_expires', '');
          localStorage.setItem('fit_premium_token', '');
          isPremium = false;
          premiumToken = null;
          premiumExpires = null;
        }
      } else {
        // Mantém comportamento atual: marca flag true
        // (token/expiração devem ser definidos pelo activatePremium/loadUserData)
        localStorage.setItem('fit_premium', 'true');
      }
    } catch (_) {}

    // Sempre sincroniza depois
    syncPremiumFromCore();
  },

  /**
   * syncUI
   * --------------------------------------------------
   * Sincroniza UI (Header/Tab/Hamb) com base na validade real do Premium.
   */
  syncUI: function () {
    const active = RF.premium.isActive();

    // 1) Classe no body
    document.body.classList.toggle('premium-active', active);

    // 2) Header: botão "Ativar Premium"
    const headerBtn = document.getElementById('premium-btn');

    // 2.1) Badge premium (se existir)
    const premiumBadge =
      document.getElementById('premium-badge') ||
      document.querySelector('.premium-badge') ||
      document.querySelector('[data-premium-badge]');

    if (headerBtn) {
      if (active) {
        headerBtn.classList.add('hidden');
        headerBtn.style.display = 'none';
      } else {
        headerBtn.classList.remove('hidden');
        headerBtn.style.display = '';
        headerBtn.disabled = false;
        headerBtn.style.pointerEvents = 'auto';
        headerBtn.style.opacity = '1';
        headerBtn.setAttribute('aria-disabled', 'false');
      }
    }

    if (premiumBadge) {
      if (active) {
        premiumBadge.classList.remove('hidden');
        premiumBadge.style.display = '';
      } else {
        premiumBadge.classList.add('hidden');
        premiumBadge.style.display = 'none';
      }
    }

    // 3) Tab bar: botão Premium (estrela)
    const tabPremium = document.querySelectorAll('.tab-bar .tab-premium');
    tabPremium.forEach(function (el) {
      el.dataset.premiumActive = active ? 'true' : 'false';
    });

    // 4) Hambúrguer: botão "Seja Premium"
    const hambPremium = document.querySelectorAll('.hamburger-premium-btn');
    hambPremium.forEach(function (el) {
      el.dataset.premiumActive = active ? 'true' : 'false';
    });

    // 5) HOME: botão "Como funciona o Premium" + card do tour
    const tourBtn = document.getElementById('open-tour-btn');
    const tourCard = document.getElementById('tour-card');

    if (tourBtn) {
      if (active) {
        tourBtn.classList.add('hidden');
        tourBtn.style.display = 'none';
        if (tourCard) {
          tourCard.classList.add('hidden');
          tourCard.style.display = 'none';
        }
      } else {
        tourBtn.classList.remove('hidden');
        tourBtn.style.display = '';
      }
    }

    // 6) Sincroniza o tour (se existir)
    if (typeof window.syncPremiumTour === 'function') {
      window.syncPremiumTour();
    }

    // 7) Evento global
    window.dispatchEvent(
      new CustomEvent('rf:premium-change', { detail: { active: active } })
    );
  }
};

// Atalho opcional
window.rfSyncPremiumUI = RF.premium.syncUI;







// ==============================
// FONTE ÚNICA DE DADOS (receitas)
// ==============================
const ALL_RECIPES = (typeof RECIPES !== 'undefined' && Array.isArray(RECIPES)) ? RECIPES : [];
let allRecipes = ALL_RECIPES; // compat




 // ============================================
// Embaralhar receitas a cada carregamento (Fisher–Yates)
// (compatível iPhone / ES5)
// ============================================

/* =========================================================
   FUNÇÃO: shuffleArray
   PARA QUE SERVE:
   - Executa a lógica encapsulada em shuffleArray.
   ========================================================= */
function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// embaralha 1x por load
if (allRecipes && allRecipes.length > 1) {
  shuffleArray(allRecipes);
}

   
  
  



// ==============================
// ESTADO DO USUÁRIO
// ==============================
let credits = 3;
let unlockedRecipes = [];



let isPremium = false;
let premiumToken = null;
let premiumExpires = null;

// ⭐ NOVO - Controle de timers de expiração
let _premiumTimeout = null;
let _premiumInterval = null;

// UI state
let currentRecipe = null;


let currentSlideIndex = 0;
let featuredRecipes = [];
let searchTerm = '';
let selectedCategory = '';
let searchIngredients = [];
let advancedFilters = { maxCalories: null, minProtein: null, maxTime: null };
let shoppingList = [];
let weekPlan = {};

// ==============================
// STORAGE ADAPTER (localStorage)
// ==============================
const isClaudeEnvironment = typeof window.storage !== 'undefined';

const storage = {
  async get(key) {
    try {
      if (isClaudeEnvironment) return await window.storage.get(key);
      const value = localStorage.getItem(key);
      return value ? { key, value } : null;
    } catch (e) {
      return null;
    }
  },
  async set(key, value) {
    try {
      if (isClaudeEnvironment) return await window.storage.set(key, value);
      localStorage.setItem(key, value);
      return { key, value };
    } catch (e) {
      return null;
    }
  }
};

// ==============================
// DOM
// ==============================
const creditsBadge = document.getElementById('credits-badge');
const premiumBtn = document.getElementById('premium-btn');
const creditsText = document.getElementById('credits-text'); // pode não existir (vc re-renderiza)

const recipeGrid = document.getElementById('recipe-grid');
const recipeDetail = document.getElementById('recipe-detail');

const premiumModal = document.getElementById('premium-modal');
const premiumCodeInput = document.getElementById('premium-code-input');
const modalMessage = document.getElementById('modal-message');
const modalCancel = document.getElementById('modal-cancel');
const modalActivate = document.getElementById('modal-activate');

const searchInput = document.getElementById('search-input');

const shoppingCounter = document.getElementById('shopping-counter');
const calculatorBtn = document.getElementById('calculator-btn');
const shoppingBtn = document.getElementById('shopping-btn');
const plannerBtn = document.getElementById('planner-btn');

const calculatorModal = document.getElementById('calculator-modal');
const shoppingModal = document.getElementById('shopping-modal');
const plannerModal = document.getElementById('planner-modal');

const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const categoriesGrid = document.getElementById('categoriesGrid');

const faqBtn = document.getElementById('faq-btn');
const faqModal = document.getElementById('faq-modal');

// Modal (B) — modal de refeição existente no HTML
const mealSelectorModal = document.getElementById('meal-selector-modal');
const mealSelectorSubtitle = document.getElementById('meal-selector-subtitle');

// ==============================
// MODAL HELPERS
// ==============================

/* =========================================================
   FUNÇÃO: openModal
   PARA QUE SERVE:
   - Abre/mostra a interface ou modal relacionado a openModal.
   ========================================================= */
function openModal(el) {
  if (!el) return;
  el.classList.remove('hidden');
  document.body.classList.add('modal-open');
}
function closeModal(el) {
  if (!el) return;
  el.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

window.closePremiumModal = function () {
  if (premiumCodeInput) premiumCodeInput.value = '';
  const warning = document.getElementById('credits-warning');
  if (warning) warning.classList.add('hidden');
  closeModal(premiumModal);
};

// ==============================
// CORE BUSINESS RULES (fonte da verdade)
// ==============================

/* =========================================================
   FUNÇÃO: canAccessRecipe
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em canAccessRecipe.
   ========================================================= */
function canAccessRecipe(recipeId) {
  if (isPremium) return true;
  if (unlockedRecipes.includes(recipeId)) return true;
  return credits > 0;
}

/**
 * Consome crédito e libera receita APENAS uma vez,
 * e somente quando necessário.
 * Retorna true se pode acessar, false se deve ir pro premium.
 */

/* =========================================================
   FUNÇÃO: ensureRecipeAccess
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em ensureRecipeAccess.
   ========================================================= */
function ensureRecipeAccess(recipeId) {
  // Premium ou já liberada
  if (isPremium || unlockedRecipes.includes(recipeId)) return true;
  
  // ✅ Tem crédito: ABRE MODAL DE CONFIRMAÇÃO
  if (credits > 0) {
    openConfirmCreditModal(recipeId);
    return false; // Não abre a receita ainda
  }
  
  // ✅ SEM CRÉDITO: Isso nunca deve acontecer aqui porque viewRecipe() já trata
  // Mas mantemos como fallback de segurança
  if (modalMessage) {
    modalMessage.textContent = 'Seus créditos acabaram. Ative o Premium para acesso ilimitado.';
  }
  const warning = document.getElementById('credits-warning');
  if (warning) warning.classList.remove('hidden');
  openModal(premiumModal);
  return false;
}






// ================================
// MODAL DE CONFIRMAÇÃO DE CRÉDITO
// ================================
// ================================
// MODAL DE CONFIRMAÇÃO DE CRÉDITO
// ================================
let pendingRecipeId = null;

window.openConfirmCreditModal = function (recipeId) {
  const id = String(recipeId);

  const recipe = Array.isArray(allRecipes)
    ? allRecipes.find(r => String(r.id) === id)
    : null;

  if (!recipe) return;

  pendingRecipeId = id;

  const creditsRemaining = document.getElementById('credits-remaining');
  const recipeNameConfirm = document.getElementById('recipe-name-confirm');

  if (creditsRemaining) creditsRemaining.textContent = String(credits);
  if (recipeNameConfirm) recipeNameConfirm.textContent = recipe.name;

  const modal = document.getElementById('confirm-credit-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
};





window.closeConfirmCreditModal = function () {
  const modal = document.getElementById('confirm-credit-modal');
  if (modal) modal.classList.add('hidden');

  document.body.classList.remove('modal-open');

  // ✅ cancela pendência
  pendingRecipeId = null;
};




window.confirmUnlockRecipe = function () {
  if (!pendingRecipeId) return;

  const id = String(pendingRecipeId);

  // 1) Créditos atuais
  const c = (typeof getCreditsSafe === 'function')
    ? getCreditsSafe()
    : (Number.isFinite(credits) ? credits : 0);

  // 2) Caso sim -> DESCONTA O CRÉDITO (primeiro!)
  if (isPremium !== true) {
    if (c <= 0) {
      // segurança: sem crédito => premium
      if (typeof window.closeConfirmCreditModal === 'function') {
        window.closeConfirmCreditModal();
      }
      if (typeof window.openPremium === 'function') window.openPremium('no-credits');
      else if (typeof window.openPremiumModal === 'function') window.openPremiumModal('no-credits');
      return;
    }

    credits = c - 1;

    // persistência do seu projeto
    if (typeof persistCredits === 'function') persistCredits();
    else localStorage.setItem('fit_credits', String(credits));

    // desbloqueia pra sempre
    if (typeof unlockRecipe === 'function') unlockRecipe(id);
  }

  // 3) Fecha modal (e destrava scroll) — sempre
  if (typeof window.closeConfirmCreditModal === 'function') {
    window.closeConfirmCreditModal();
  } else {
    const modal = document.getElementById('confirm-credit-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  // ✅ Importante: limpa a pendência ANTES de abrir (evita efeitos colaterais)
  pendingRecipeId = null;

  // 4) Atualiza UI/cards (recomendado manter)
  try { updateUI(); } catch (_) {}
  try { renderRecipes(); } catch (_) {}

  // ✅ 4.5) PREFETCH HERO (antes de abrir a receita)
  try {
    if (typeof _rfPrefetchImage === 'function' && typeof _rfGetRecipeHeroUrlById === 'function') {
      _rfPrefetchImage(_rfGetRecipeHeroUrlById(id));
    }
  } catch (_) {}

  // 5) DEPOIS abre a receita pelo PORTEIRO (mais robusto)
  requestOpenRecipe(id);
};





// loadUserData()
// - Carrega do storage: créditos, receitas liberadas e estado premium (token/expiração)
// - Tem um “guard” no começo que limpa premium inválido antes de qualquer UI renderizar

/* =========================================================
   FUNÇÃO: loadUserData
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para loadUserData (UI/estado/localStorage/API).
   ========================================================= */
async function loadUserData() {
  try {
    // ✅ 0) Guard: se alguém deixou fit_premium = true mas expirou, limpa ANTES de qualquer coisa
    const flaggedAsPremium =
      (window.RF && RF.premium && typeof RF.premium.isActive === 'function')
        ? RF.premium.isActive()
        : (localStorage.getItem('fit_premium') === 'true');

    if (flaggedAsPremium && typeof isPremiumValidNow === 'function' && !isPremiumValidNow()) {
      if (typeof clearPremiumState === 'function') {
        clearPremiumState();
      } else {
        // fallback mínimo
        localStorage.setItem('fit_premium', 'false');
        localStorage.setItem('fit_premium_token', '');
        localStorage.setItem('fit_premium_expires', '');
      }
    }

    // ✅ 1) Carrega token/expiração (se existir)
    const tokenResult = await storage.get('fit_premium_token');
    const expiresResult = await storage.get('fit_premium_expires');

    premiumToken = (tokenResult && tokenResult.value) ? tokenResult.value : null;

    const expiresStr = (expiresResult && expiresResult.value) ? String(expiresResult.value) : '';
    premiumExpires = expiresStr ? parseInt(expiresStr, 10) : null;
    if (!Number.isFinite(premiumExpires)) premiumExpires = null;

    // ✅ 2) Decide Premium de forma consistente (fonte única)
    // Se existir validação por tempo/token, ela manda
    if (typeof isPremiumValidNow === 'function') {
      isPremium = !!isPremiumValidNow();
      localStorage.setItem('fit_premium', isPremium ? 'true' : 'false');
    } else {
      // fallback: usa a flag
      isPremium = (localStorage.getItem('fit_premium') === 'true');
    }

    // ✅ 3) Se não é premium, carrega créditos e desbloqueadas
    if (!isPremium) {
      const creditsResult = await storage.get('fit_credits');
      const unlockedResult = await storage.get('fit_unlocked');

      const c = creditsResult && creditsResult.value ? parseInt(creditsResult.value, 10) : 3;
      credits = Number.isFinite(c) ? c : 3;

      const rawUnlocked = unlockedResult && unlockedResult.value ? unlockedResult.value : '[]';
      try {
        unlockedRecipes = JSON.parse(rawUnlocked) || [];
      } catch (_) {
        unlockedRecipes = [];
      }
    }

    // ✅ 4) Shopping list e Week plan (vale pra free e premium)
    const shoppingResult = await storage.get('fit_shopping');
    if (shoppingResult && shoppingResult.value) {
      try { shoppingList = JSON.parse(shoppingResult.value) || []; } catch (_) { shoppingList = []; }
    }

    const weekPlanResult = await storage.get('fit_weekplan');
    if (weekPlanResult && weekPlanResult.value) {
      try { weekPlan = JSON.parse(weekPlanResult.value) || {}; } catch (_) { weekPlan = {}; }
    }

  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
  }

  // ✅ 5) Render/Sync (fora do try para sempre rodar mesmo se um storage falhar)
  try { updateUI(); } catch (_) {}
  try { if (typeof updatePremiumButtons === 'function') updatePremiumButtons(); } catch (_) {}

  try { updateShoppingCounter(); } catch (_) {}
  try { initSliderAndCategories(); } catch (_) {}
  try { renderRecipes(); } catch (_) {}
  try { setupRecipeHeroPrefetch(); } catch (_) {}
  try { setupRecipeGridClickGuard(); } catch (_) {}

  // ✅ 6) Agora sim: sincroniza Premium “do core/validade” no lugar certo
  try {
    if (typeof syncPremiumFromCore === 'function') {
      syncPremiumFromCore();
    } else if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }
  } catch (_) {}

  // ✅ 7) Timers de expiração (se existirem no seu fluxo)
  try {
    if (typeof _setupPremiumTimers === 'function' && isPremium && premiumExpires && premiumExpires > Date.now()) {
      _setupPremiumTimers();
    }
  } catch (_) {}

  // ✅ 8) Lucide (ícones)
  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (_) {}
}






/* =========================================================
   FUNÇÃO: saveUserData
   PARA QUE SERVE:
   - Salva dados/estado persistente (ex.: localStorage) conforme a lógica de saveUserData.
   ========================================================= */
async function saveUserData() {
  try {
    if (isPremium && premiumToken) {
      // Salva token premium
      await storage.set('fit_premium', 'true');
      await storage.set('fit_premium_token', premiumToken);
      if (premiumExpires) {
        await storage.set('fit_premium_expires', premiumExpires.toString());
      }
    } else {
      // Salva créditos
      await storage.set('fit_credits', credits.toString());
      await storage.set('fit_unlocked', JSON.stringify(unlockedRecipes));
      await storage.set('fit_premium', 'false');
    }
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
  }
}


/* =========================================================
   FUNÇÃO: saveShoppingList
   PARA QUE SERVE:
   - Salva dados/estado persistente (ex.: localStorage) conforme a lógica de saveShoppingList.
   ========================================================= */
async function saveShoppingList() {
  try {
    await storage.set('fit_shopping', JSON.stringify(shoppingList));
    updateShoppingCounter();
  } catch (e) {}
}


/* =========================================================
   FUNÇÃO: saveWeekPlan
   PARA QUE SERVE:
   - Salva dados/estado persistente (ex.: localStorage) conforme a lógica de saveWeekPlan.
   ========================================================= */
async function saveWeekPlan() {
  try {
    await storage.set('fit_weekplan', JSON.stringify(weekPlan));
  } catch (e) {}
}








// ==============================
// UI (Badge / Premium)
// ==============================

/* =========================================================
   FUNÇÃO: updateUI
   PARA QUE SERVE:
   - Executa a lógica encapsulada em updateUI.
   ========================================================= */
function updateUI() {
  try { 
  
      // ✅ Guard anti “regra invertida”
    if (isPremium && !isPremiumValidNow()) {
      forceFreeCleanup();
    }
	
    if (!creditsBadge) return;

    if (isPremium) {
      document.body.classList.remove('free-user');
      document.body.classList.add('premium-active');

      creditsBadge.classList.add('premium');

      let badgeText = 'Premium';
      if (premiumExpires) {
        const daysLeft = Math.ceil((premiumExpires - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysLeft > 0) {
          badgeText = `PREMIUM (${daysLeft}D)`;
        }
      }

      creditsBadge.innerHTML = `
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
  <span>${badgeText}</span>
  `;

      if (premiumBtn) {
        premiumBtn.style.display = 'none';
        // ✅ Força reflow para aplicar mudança imediatamente
        premiumBtn.offsetHeight;
      }

    } else {
      document.body.classList.add('free-user');
      document.body.classList.remove('premium-active');

      creditsBadge.classList.remove('premium');
      creditsBadge.innerHTML = `

  <span id="credits-text">&nbsp &nbsp &nbsp${credits} Créditos</span>
  `;

      if (premiumBtn) {
        premiumBtn.style.display = 'block';
        // ✅ Força reflow
        premiumBtn.offsetHeight;
      }
    }

    creditsBadge.classList.add('ready');

    // ✅ Mantém Tab/Hamburger sempre sincronizados com o estado atual
    if (typeof updatePremiumButtons === 'function') {
      updatePremiumButtons();
    }

  } catch (error) {
    console.error('Erro em updateUI:', error);

    // ✅ Não deixa UI premium desincronizar mesmo em erro
    if (typeof updatePremiumButtons === 'function') {
      updatePremiumButtons();
    }
  }
}








/* =========================================================
   FUNÇÃO: updateShoppingCounter
   PARA QUE SERVE:
   - Executa a lógica encapsulada em updateShoppingCounter.
   ========================================================= */
function updateShoppingCounter() {
  if (!shoppingCounter) return;
  if (shoppingList.length > 0) {
    shoppingCounter.textContent = shoppingList.length;
    shoppingCounter.classList.remove('hidden');
  } else {
    shoppingCounter.classList.add('hidden');
  }
}

// ==============================
// SLIDER + CATEGORIAS
// ==============================
let sliderAutoplay = null;


/* =========================================================
   FUNÇÃO: initSliderAndCategories
   PARA QUE SERVE:
   - Inicializa e configura a rotina initSliderAndCategories (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function initSliderAndCategories() {
  if (!allRecipes || allRecipes.length === 0) return;

  // -----------------------------
  // SLIDER (Hero)
  // -----------------------------
  if (sliderTrack && sliderDots) {
    // garante featuredRecipes global se você já usa em outros lugares
    featuredRecipes = allRecipes.filter(r => r.featured).slice(0, 4);

    sliderTrack.innerHTML = featuredRecipes.map(recipe => {
      const id = String(recipe.id);
      const img = recipe.images?.hero || recipe.image;

      return `
  <div class="slide-new" data-recipe-id="${id}" role="button" tabindex="0" aria-label="Abrir receita ${recipe.name}">
  <img src="${img}" alt="${recipe.name}"
  loading="eager" decoding="async"


  onerror="this.onerror=null; this.src='https://mymortgagecompany.co.uk/wp-content/uploads/2016/09/placeholder.png';">


  <div class="slide-overlay-new">
  <h2 class="slide-title-new">${recipe.name}</h2>
  <p class="slide-description-new">${recipe.description || 'Receita deliciosa'}</p>
  </div>
  </div>
  `;
    }).join('');

    // Dots (sem onclick inline)
    sliderDots.innerHTML = featuredRecipes.map((_, idx) => `
  <button class="slider-dot-new ${idx === 0 ? 'active' : ''}" type="button" data-slide-idx="${idx}" aria-label="Ir para slide ${idx + 1}"></button>
  `).join('');

    // Clique nos dots (tenta usar sua função existente; senão faz fallback)
    if (!sliderDots.dataset.dotsBound) {
      sliderDots.dataset.dotsBound = '1';
      sliderDots.addEventListener('click', function (e) {
        const btn = e.target.closest?.('[data-slide-idx]');
        if (!btn) return;
        const idx = parseInt(btn.getAttribute('data-slide-idx') || '0', 10);

        // Se você já tem goToSlideNew / updateSlider, usa.
        if (typeof window.goToSlideNew === 'function') {
          window.goToSlideNew(idx);
          return;
        }

        // fallback simples: scroll por transform
        const slideW = sliderTrack.querySelector('.slide-new')?.getBoundingClientRect().width || 0;
        sliderTrack.style.transition = 'transform 260ms ease';
        sliderTrack.style.transform = `translate3d(${-idx * slideW}px,0,0)`;

        // atualiza dot ativo
        Array.from(sliderDots.querySelectorAll('.slider-dot-new')).forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }, { passive: true });
    }

    // ✅ TAP MOBILE (iPhone): não depender de click
    if (!sliderTrack.dataset.tapBound) {
      sliderTrack.dataset.tapBound = '1';

      let startX = 0;
      let startY = 0;
      let moved = false;

      const MOVE_THRESHOLD = 12; // px: separa tap de drag


/* =========================================================
   FUNÇÃO: openFromTarget
   PARA QUE SERVE:
   - Abre/mostra a interface ou modal relacionado a openFromTarget.
   ========================================================= */
      function openFromTarget(target) {
        const slide = target.closest?.('[data-recipe-id]');
        if (!slide) return;

        const id = slide.getAttribute('data-recipe-id');
        if (!id) return;

        // chama seu PORTEIRO (créditos/premium/unlocked)
        if (typeof window.requestOpenRecipe === 'function') {
          window.requestOpenRecipe(String(id));
        } else if (typeof window.openConfirmCreditModal === 'function') {
          // fallback (não ideal)
          window.openConfirmCreditModal(String(id));
        } else {
          console.warn('[slider] requestOpenRecipe/openConfirmCreditModal não encontrados');
        }
      }

      // Pointer events (Safari iOS moderno)
      sliderTrack.addEventListener('pointerdown', function (e) {
        startX = e.clientX;
        startY = e.clientY;
        moved = false;
      }, { passive: true });

      sliderTrack.addEventListener('pointermove', function (e) {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) moved = true;
      }, { passive: true });

      sliderTrack.addEventListener('pointerup', function (e) {
        if (moved) return; // foi arrasto
        openFromTarget(e.target);
      }, { passive: true });

      // Fallback touch (iOS antigo / casos raros)
      sliderTrack.addEventListener('touchstart', function (e) {
        const t = e.touches && e.touches[0];
        if (!t) return;
        startX = t.clientX;
        startY = t.clientY;
        moved = false;
      }, { passive: true });

      sliderTrack.addEventListener('touchmove', function (e) {
        const t = e.touches && e.touches[0];
        if (!t) return;
        const dx = Math.abs(t.clientX - startX);
        const dy = Math.abs(t.clientY - startY);
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) moved = true;
      }, { passive: true });

      sliderTrack.addEventListener('touchend', function (e) {
        if (moved) return;
        openFromTarget(e.target);
      }, { passive: true });
    }

    // Se existir o slider drag completo que te passei antes, liga.
    // (se não existir, não quebra)
    if (typeof setupHeroSliderDrag === 'function') {
      try { setupHeroSliderDrag(); } catch (_) {}
    }

    // Se você tinha autoplay antigo, não chama mais aqui para não brigar com touch/drag:
    // startAutoplay();
    // updateSlider();
  }

  // -----------------------------
  // CATEGORIAS (como no seu print)
  // -----------------------------
  if (categoriesGrid) {
const categories = [
  { name: 'Todas', value: '' },
  { name: 'Café da Manhã', value: 'Café da Manhã' },
  { name: 'Almoço/Janta', value: 'Almoço/Janta' },
  { name: 'Lanches', value: 'Lanches' },
  { name: 'Sobremesas', value: 'Sobremesas' },
  { name: 'Sucos', value: 'Sucos' }
];

    categoriesGrid.innerHTML = categories.map((cat, index) => `
  <div class="category-card-new ${index === 0 ? 'active' : ''}"
  onclick="filterByCategory('${cat.value}', this)">
  ${cat.name}
  </div>
  `).join('');
  }
}




window.changeSlideNew = function(direction) {
  if (!featuredRecipes || featuredRecipes.length === 0) return;
  currentSlideIndex = (currentSlideIndex + direction + featuredRecipes.length) % featuredRecipes.length;
  updateSlider();
};

window.goToSlideNew = function(index) {
  currentSlideIndex = index;
  updateSlider();
};


/* =========================================================
   FUNÇÃO: updateSlider
   PARA QUE SERVE:
   - Executa a lógica encapsulada em updateSlider.
   ========================================================= */
function updateSlider() {
  if (!sliderTrack) return;
  sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  document.querySelectorAll('.slider-dot-new').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}


/* =========================================================
   FUNÇÃO: startAutoplay
   PARA QUE SERVE:
   - Executa a lógica encapsulada em startAutoplay.
   ========================================================= */
function startAutoplay() {
  if (!featuredRecipes || featuredRecipes.length === 0) return;
  clearInterval(sliderAutoplay);
  sliderAutoplay = setInterval(() => window.changeSlideNew(1), 8000);
}

function initCategoriesDrag() {
  const grid = document.querySelector('.categories-grid-new');
  if (!grid) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  grid.ondragstart = () => false;

  grid.addEventListener('mousedown', (e) => {
    isDown = true;
    grid.style.cursor = 'grabbing';
    startX = e.pageX - grid.offsetLeft;
    scrollLeft = grid.scrollLeft;
  });

  grid.addEventListener('mouseleave', () => {
    isDown = false;
    grid.style.cursor = 'grab';
  });

  grid.addEventListener('mouseup', () => {
    isDown = false;
    grid.style.cursor = 'grab';
  });

  grid.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - grid.offsetLeft;
    const walk = (x - startX);
    grid.scrollLeft = scrollLeft - walk;
  });

  let touchStartX = 0;
  let touchScrollLeft = 0;

  grid.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = grid.scrollLeft;
  });

  grid.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.5;
    grid.scrollLeft = touchScrollLeft + walk;
  });

  grid.style.cursor = 'grab';
  
}




// filterByCategory(category, element)
// - Seleciona a categoria (estado separado)
// - NÃO mexe no searchTerm (texto da busca)
window.filterByCategory = function(category, element) {
  // ✅ Fecha qualquer box aberto ao trocar categoria
  if (typeof window.closeIngredientPanel === 'function') window.closeIngredientPanel();
  if (typeof window.closeAdvancedFiltersPanel === 'function') window.closeAdvancedFiltersPanel();

  document.querySelectorAll('.category-card-new').forEach(card => card.classList.remove('active'));
  if (element) element.classList.add('active');

  if (element && element.scrollIntoView) {
    element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  selectedCategory = category || '';
  closeRecipeDetail();
  renderRecipes();
};





// ================================
// MAPEAMENTO AUTOMÁTICO DE ÍCONES (SÓ LUCIDE)
// ================================

/* =========================================================
   FUNÇÃO: getIconFromIngredientName
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getIconFromIngredientName (UI/estado/localStorage/API).
   ========================================================= */
function getIconFromIngredientName(name) {
  if (!name) return 'utensils';
  
  const nameLower = name.toLowerCase();
  
  // Proteínas
  if (nameLower.includes('frango') || nameLower.includes('peito') || nameLower.includes('coxa')) return 'drumstick';
  if (nameLower.includes('carne') || nameLower.includes('boi') || nameLower.includes('patinho')) return 'beef';
  if (nameLower.includes('peixe') || nameLower.includes('salmão') || nameLower.includes('atum')) return 'fish';
  if (nameLower.includes('camarão')) return 'fish';
  if (nameLower.includes('ovo')) return 'egg';
  if (nameLower.includes('whey') || nameLower.includes('proteína')) return 'dumbbell';
  
  // Frutas
  if (nameLower.includes('banana')) return 'banana';
  if (nameLower.includes('morango') || nameLower.includes('framboesa')) return 'cherry';
  if (nameLower.includes('maçã')) return 'apple';
  if (nameLower.includes('limão') || nameLower.includes('lima')) return 'citrus';
  if (nameLower.includes('laranja')) return 'orange';
  if (nameLower.includes('abacate')) return 'leaf';
  
  // Vegetais
  if (nameLower.includes('brócolis')) return 'leaf-maple';
  if (nameLower.includes('batata')) return 'cookie';
  if (nameLower.includes('alho')) return 'flower-2';
  if (nameLower.includes('tomate')) return 'circle-dot';
  if (nameLower.includes('cebola')) return 'circle';
  if (nameLower.includes('cenoura')) return 'carrot';
  if (nameLower.includes('alface') || nameLower.includes('rúcula') || nameLower.includes('espinafre')) return 'leaf';
  if (nameLower.includes('couve') || nameLower.includes('repolho')) return 'leafy-green';
  if (nameLower.includes('pimentão') || nameLower.includes('pimenta')) return 'flame';
  if (nameLower.includes('milho')) return 'wheat';
  
  // Grãos
  if (nameLower.includes('aveia') || nameLower.includes('granola')) return 'wheat';
  if (nameLower.includes('arroz')) return 'wheat';
  if (nameLower.includes('macarrão') || nameLower.includes('massa')) return 'wheat';
  if (nameLower.includes('pão') || nameLower.includes('torrada')) return 'wheat';
  
  // Laticínios
  if (nameLower.includes('leite')) return 'milk';
  if (nameLower.includes('queijo')) return 'milk';
  if (nameLower.includes('iogurte')) return 'milk-off';
  
  // Gorduras
  if (nameLower.includes('azeite') || nameLower.includes('óleo')) return 'droplets';
  if (nameLower.includes('manteiga')) return 'square';
  if (nameLower.includes('amendoim') || nameLower.includes('castanha')) return 'nut';
  
  // Temperos
  if (nameLower.includes('sal')) return 'sparkles';
  if (nameLower.includes('pimenta')) return 'flame';
  if (nameLower.includes('canela')) return 'wheat';
  if (nameLower.includes('erva') || nameLower.includes('orégano') || nameLower.includes('alecrim')) return 'leaf';
  if (nameLower.includes('tempero')) return 'sparkles';
  if (nameLower.includes('mostarda') || nameLower.includes('molho')) return 'droplet';
  
  // Doces
  if (nameLower.includes('mel')) return 'droplet';
  if (nameLower.includes('açúcar')) return 'candy';
  if (nameLower.includes('chocolate')) return 'candy';
  
  // Especiais
  if (nameLower.includes('açaí')) return 'ice-cream';
  if (nameLower.includes('polpa')) return 'package';
  if (nameLower.includes('coco')) return 'palmtree';
  
  // Bebidas
  if (nameLower.includes('café')) return 'coffee';
  if (nameLower.includes('chá')) return 'cup-soda';
  if (nameLower.includes('água')) return 'droplet';
  if (nameLower.includes('suco')) return 'glass-water';
  
  // Padrão
  return 'chef-hat';
}






// ================================
// ACCESS CORE — créditos + desbloqueios
// ================================


/* =========================================================
   FUNÇÃO: getUnlockedSet
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getUnlockedSet (UI/estado/localStorage/API).
   ========================================================= */
function getUnlockedSet() {
  // unlockedRecipes pode existir globalmente; garantimos um Set
  if (!Array.isArray(unlockedRecipes)) unlockedRecipes = [];
  return new Set(unlockedRecipes);
}

function persistUnlocked() {
  try {
    localStorage.setItem('fit_unlocked', JSON.stringify(unlockedRecipes || []));
  } catch (_) {}
}


/* =========================================================
   FUNÇÃO: persistCredits
   PARA QUE SERVE:
   - Salva dados/estado persistente (ex.: localStorage) conforme a lógica de persistCredits.
   ========================================================= */
function persistCredits() {
  try {
    localStorage.setItem('fit_credits', String(credits ?? 3));
  } catch (_) {}
}

function isRecipeUnlocked(recipeId) {
  const s = getUnlockedSet();
  return s.has(String(recipeId));
}


/* =========================================================
   FUNÇÃO: unlockRecipe
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em unlockRecipe.
   ========================================================= */
function unlockRecipe(recipeId) {
  const id = String(recipeId);
  if (!Array.isArray(unlockedRecipes)) unlockedRecipes = [];
  if (!unlockedRecipes.includes(id)) {
    unlockedRecipes.push(id);
    persistUnlocked();
  }
}



/* =========================================================
   FUNÇÃO: canAccessRecipe
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em canAccessRecipe.
   ========================================================= */
function canAccessRecipe(recipeId) {
  // Premium: acesso total
  if (isPremium === true) return true;

  // Free: acesso se já foi desbloqueada
  if (isRecipeUnlocked(recipeId)) return true;

  // Free: acesso se ainda tem créditos (a confirmação vai consumir)
  return (Number.isFinite(credits) ? credits : 0) > 0;
}




// ================================
// UI/REGRA OFICIAL — Lock & CTA
// ================================


/* =========================================================
   FUNÇÃO: getCreditsSafe
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getCreditsSafe (UI/estado/localStorage/API).
   ========================================================= */
function getCreditsSafe() {
  return Number.isFinite(credits) ? credits : 0;
}

// Cadeado (somente quando créditos = 0 e não está desbloqueada)
function shouldShowLock(recipeId) {
  if (isPremium === true) return false;

  const c = getCreditsSafe();

  // Enquanto tem créditos, NUNCA mostra cadeado
  if (c > 0) return false;

  // Créditos zerados: mostra cadeado em tudo, exceto desbloqueadas
  return !isRecipeUnlocked(recipeId);
}

// CTA Verde "Desbloquear com 1 crédito" (somente quando:
// - free
// - ainda não desbloqueada
// - créditos > 0)

/* =========================================================
   FUNÇÃO: shouldShowUnlockCTA
   PARA QUE SERVE:
   - Executa a lógica encapsulada em shouldShowUnlockCTA.
   ========================================================= */
function shouldShowUnlockCTA(recipeId) {
  if (isPremium === true) return false;
  if (isRecipeUnlocked(recipeId)) return false;

  const c = getCreditsSafe();
  return c > 0;
}



/**
 * decideRecipeOpenAction
 * --------------------------------------------------
 * FUNÇÃO CENTRAL (JUÍZ FINAL)
 * Responsável por decidir O QUE FAZER quando o usuário
 * tenta abrir uma receita.
 *
 * ❗ Esta função NÃO abre modal, NÃO navega e NÃO mexe na UI.
 * Ela APENAS decide a ação correta com base no estado atual.
 *
 * Retornos possíveis:
 * - { action: 'open', id }            → abre a receita direto
 * - { action: 'confirm-credit', id }  → pede confirmação de uso de crédito
 * - { action: 'premium', id }         → direciona para o Premium
 *
 * 🔒 Fonte única de verdade para:
 * - Grid de receitas
 * - Slider
 * - Botões
 * - Retorno de navegação
 */
 

/* =========================================================
   FUNÇÃO: decideRecipeOpenAction
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em decideRecipeOpenAction.
   ========================================================= */
function decideRecipeOpenAction(recipeId) {
  const id = String(recipeId);

  // 1️⃣ Premium: acesso total, sempre abre direto
  if (isPremium === true) {
    return { action: 'open', id };
  }

  // 2️⃣ Receita já desbloqueada anteriormente (free)
  if (typeof isRecipeUnlocked === 'function' && isRecipeUnlocked(id)) {
    return { action: 'open', id };
  }

  // 3️⃣ Usuário free com créditos disponíveis
  const c = (typeof getCreditsSafe === 'function')
    ? getCreditsSafe()
    : (Number.isFinite(credits) ? credits : 0);

  if (c > 0) {
    return { action: 'confirm-credit', id };
  }

  // 4️⃣ Usuário free sem créditos → Premium
  return { action: 'premium', id };
}





/**
 * requestOpenRecipe
 * --------------------------------------------------
 * FUNÇÃO EXECUTORA
 * Responsável por executar a ação decidida pelo
 * "juiz" decideRecipeOpenAction().
 *
 * ❗ Esta função NÃO decide regra de acesso.
 * Ela apenas executa:
 * - abrir receita
 * - abrir modal de confirmação de crédito
 * - abrir modal Premium
 */
function requestOpenRecipe(recipeId) {
  const decision = decideRecipeOpenAction(recipeId);

  if (!decision || !decision.action) return;

  switch (decision.action) {
    case 'open':
      // ✅ Abre o detalhe da receita
      renderRecipeDetail(decision.id);
      break;

    case 'confirm-credit':
      // ✅ Abre modal de confirmação de uso de crédito
      if (typeof window.openConfirmCreditModal === 'function') {
        window.openConfirmCreditModal(decision.id);
      }
      break;

    case 'premium':
      // ✅ Direciona para o Premium
      if (typeof window.openPremium === 'function') {
        window.openPremium('no-credits');
      } else if (typeof window.openPremiumModal === 'function') {
        window.openPremiumModal('no-credits');
      }
      break;

    default:
      console.warn('[requestOpenRecipe] Ação desconhecida:', decision);
  }
}







// ================================
// PREFETCH HERO IMAGES (anti-lag)
// ================================
const _rfPrefetchCache = new Set();


/* =========================================================
   FUNÇÃO: _rfPrefetchImage
   PARA QUE SERVE:
   - Executa a lógica encapsulada em _rfPrefetchImage.
   ========================================================= */
function _rfPrefetchImage(url) {
  if (!url || typeof url !== 'string') return;
  if (_rfPrefetchCache.has(url)) return;

  _rfPrefetchCache.add(url);

  try {
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = url;
  } catch (e) {
    // falha silenciosa (prefetch nunca pode quebrar nada)
  }
}


/* =========================================================
   FUNÇÃO: _rfGetRecipeHeroUrlById
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em _rfGetRecipeHeroUrlById.
   ========================================================= */
function _rfGetRecipeHeroUrlById(recipeId) {
  const id = String(recipeId);
  const recipe = (Array.isArray(allRecipes) ? allRecipes : []).find(r => String(r.id) === id);
  if (!recipe) return null;

  // hero > image
  return recipe.images?.hero || recipe.image || null;
}


/* =========================================================
   FUNÇÃO: setupRecipeHeroPrefetch
   PARA QUE SERVE:
   - Inicializa e configura a rotina setupRecipeHeroPrefetch (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function setupRecipeHeroPrefetch() {
  if (!recipeGrid) return;

  // evita duplicar listener
  if (recipeGrid.dataset.heroPrefetchAttached === '1') return;
  recipeGrid.dataset.heroPrefetchAttached = '1';


/* =========================================================
   FUNÇÃO: prefetchFromTarget
   PARA QUE SERVE:
   - Executa a lógica encapsulada em prefetchFromTarget.
   ========================================================= */
  function prefetchFromTarget(target) {
    const card = target.closest?.('[data-recipe-id]');
    if (!card) return;

    const id = card.getAttribute('data-recipe-id');
    if (!id) return;

    const heroUrl = _rfGetRecipeHeroUrlById(id);
    if (!heroUrl) return;

    _rfPrefetchImage(heroUrl);
  }

  // desktop
  recipeGrid.addEventListener('pointerenter', (e) => {
    prefetchFromTarget(e.target);
  }, true);

  // mobile: antes do click
  recipeGrid.addEventListener('touchstart', (e) => {
    prefetchFromTarget(e.target);
  }, { passive: true });

  // teclado/acessibilidade
  recipeGrid.addEventListener('focusin', (e) => {
    prefetchFromTarget(e.target);
  });
}








/**
 * setupRecipeGridClickGuard
 * --------------------------------------------------
 * RESPONSABILIDADE ÚNICA:
 * Capturar o clique em um card de receita no grid
 * e delegar 100% da lógica para requestOpenRecipe().
 *
 * ❗ Esta função NÃO decide:
 * - premium
 * - créditos
 * - desbloqueio
 * - modais
 *
 * Ela apenas identifica o recipeId e encaminha.
 */

/* =========================================================
   FUNÇÃO: setupRecipeGridClickGuard
   PARA QUE SERVE:
   - Inicializa e configura a rotina setupRecipeGridClickGuard (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function setupRecipeGridClickGuard() {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;

  // Evita duplicar listener se renderRecipes/loadUserData rodarem mais de uma vez
  if (grid.dataset.clickGuardAttached === '1') return;
  grid.dataset.clickGuardAttached = '1';

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('[data-recipe-id]');
    if (!card) return;

    const recipeId = card.getAttribute('data-recipe-id');
    if (!recipeId) return;

    // 🔑 ÚNICO ponto de entrada para abrir receita
    if (typeof requestOpenRecipe === 'function') {
      requestOpenRecipe(String(recipeId));
    } else {
      console.warn('[setupRecipeGridClickGuard] requestOpenRecipe não encontrado.');
    }
  });
}







// initHomeUI()
// - inicializa listeners e UI da home

/* =========================================================
   FUNÇÃO: initHomeUI
   PARA QUE SERVE:
   - Inicializa e configura a rotina initHomeUI (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function initHomeUI() {
  setupIngredientDropdown();
}





// getRecipeIngredientsHaystack(recipe)
// - Cria um texto “pesquisável” com todos os ingredientes da receita
// - Compatível com ingredientes como string OU como objeto { text } / { name }

/* =========================================================
   FUNÇÃO: getRecipeIngredientsHaystack
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getRecipeIngredientsHaystack (UI/estado/localStorage/API).
   ========================================================= */
function getRecipeIngredientsHaystack(recipe) {
  const list = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
  const parts = list.map((ing) => {
    if (!ing) return '';
    if (typeof ing === 'string') return ing;
    if (typeof ing.text === 'string') return ing.text;
    if (typeof ing.name === 'string') return ing.name;
    return '';
  });

  return parts.join(' ').toLowerCase();
}


// parseAdvancedFilters(raw)
// - Extrai filtros avançados do texto digitado:
//   cal<=400 | calorias<=400
//   prot>=15 | proteina>=15 | proteína>=15
//   tempo<=20
// - Retorna: { cleanedText, filters }

/* =========================================================
   FUNÇÃO: parseAdvancedFilters
   PARA QUE SERVE:
   - Executa a lógica encapsulada em parseAdvancedFilters.
   ========================================================= */
function parseAdvancedFilters(raw) {
  let text = String(raw || '').trim(); // vamos limpar daqui
  const filters = { maxCalories: null, minProtein: null, maxTime: null };

  // cal<=N
  const mCal = text.match(/\b(cal|calorias)\s*<=\s*(\d+)\b/i);
  if (mCal && mCal[2]) {
    const n = Number(mCal[2]);
    if (Number.isFinite(n)) filters.maxCalories = n;
    text = text.replace(mCal[0], '').trim();
  }

  // prot>=N
  const mProt = text.match(/\b(prot|proteina|proteína)\s*>=\s*(\d+)\b/i);
  if (mProt && mProt[2]) {
    const n = Number(mProt[2]);
    if (Number.isFinite(n)) filters.minProtein = n;
    text = text.replace(mProt[0], '').trim();
  }

  // tempo<=N
  const mTime = text.match(/\b(tempo)\s*<=\s*(\d+)\b/i);
  if (mTime && mTime[2]) {
    const n = Number(mTime[2]);
    if (Number.isFinite(n)) filters.maxTime = n;
    text = text.replace(mTime[0], '').trim();
  }

  return { cleanedText: text, filters };
}



/* =========================================================
   FUNÇÃO: renderRecipes
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderRecipes com base no estado atual do app.
   ========================================================= */
function renderRecipes() {
  if (!recipeGrid || !Array.isArray(allRecipes) || allRecipes.length === 0) return;

  // ===== helpers locais (não cria regra nova) =====
  function rfNorm(v) {
    return String(v || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // lê chips ativos do DOM (auto-apply)
  const selTags = Array.from(document.querySelectorAll('#rfTagsGrid .rf-chip.is-active'))
    .map(el => rfNorm(el.getAttribute('data-tag')))
    .filter(Boolean);

  const selObjectives = Array.from(document.querySelectorAll('#rfObjChips .rf-chip.is-active'))
    .map(el => rfNorm(el.getAttribute('data-value')))
    .filter(Boolean);

  const selDietary = Array.from(document.querySelectorAll('#rfDietChips .rf-chip.is-active'))
    .map(el => rfNorm(el.getAttribute('data-value')))
    .filter(Boolean);


/* =========================================================
   FUNÇÃO: recipeTagSet
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em recipeTagSet.
   ========================================================= */
  function recipeTagSet(recipe) {
    const set = new Set();

    // recipe.tags
    if (Array.isArray(recipe?.tags)) {
      recipe.tags.forEach(t => {
        const k = rfNorm(t);
        if (k) set.add(k);
      });
    }

    // searchMeta.objectives
    if (Array.isArray(recipe?.searchMeta?.objectives)) {
      recipe.searchMeta.objectives.forEach(t => {
        const k = rfNorm(t);
        if (k) set.add(k);
      });
    }

    // searchMeta.dietary booleans
    const d = recipe?.searchMeta?.dietary;
    if (d && typeof d === 'object') {
      Object.keys(d).forEach(key => {
        if (d[key] === true) set.add(rfNorm(key));
      });
      if (d.vegan === true) set.add('vegano');
    }

    return set;
  }

  // ===== estado atual do motor =====
  const q = (searchTerm || '').trim().toLowerCase();
  const cat = (selectedCategory || '').trim();
  const ingTokens = Array.isArray(searchIngredients) ? searchIngredients : [];
  const f = advancedFilters || { maxCalories: null, minProtein: null, maxTime: null };

  let filtered = allRecipes.filter(recipe => {
    // 1) Categoria
    if (cat) {
      const recipeCat = String(recipe?.category || '');
      const catOk =
        recipeCat === cat ||
        (cat === 'Almoço/Janta' && (recipeCat === 'Almoço' || recipeCat === 'Jantar'));
      if (!catOk) return false;
    }

    // 2) Texto (nome)
    if (q) {
      const name = String(recipe?.name || '').toLowerCase();
      if (!name.includes(q)) return false;
    }

    // 3) Ingredientes (AND)
    if (ingTokens.length > 0) {
      const hay = getRecipeIngredientsHaystack(recipe);
      const allMatch = ingTokens.every(t => hay.includes(t));
      if (!allMatch) return false;
    }

    // 4) Chips: Tags / Objetivos / Restrições
    if (selTags.length || selObjectives.length || selDietary.length) {
      const set = recipeTagSet(recipe);

      // Tags: AND
      if (selTags.length > 0) {
        for (let i = 0; i < selTags.length; i++) {
          if (!set.has(selTags[i])) return false;
        }
      }

      // Restrições: AND
      if (selDietary.length > 0) {
        for (let i = 0; i < selDietary.length; i++) {
          if (!set.has(selDietary[i])) return false;
        }
      }

      // Objetivos: OR
      if (selObjectives.length > 0) {
        let ok = false;
        for (let i = 0; i < selObjectives.length; i++) {
          if (set.has(selObjectives[i])) { ok = true; break; }
        }
        if (!ok) return false;
      }
    }

    // 5) Sliders
    if (Number.isFinite(f.maxCalories) && Number.isFinite(recipe?.calories)) {
      if (Number(recipe.calories) > f.maxCalories) return false;
    }
    if (Number.isFinite(f.minProtein) && Number.isFinite(recipe?.protein)) {
      if (Number(recipe.protein) < f.minProtein) return false;
    }
    if (Number.isFinite(f.maxTime) && Number.isFinite(recipe?.time)) {
      if (Number(recipe.time) > f.maxTime) return false;
    }

    return true;
  });

  // ✅ Estado vazio: mensagem genérica (funciona para ingredientes + filtros + sliders)
  if (!filtered || filtered.length === 0) {
    recipeGrid.innerHTML = `
  <div class="rf-empty-state">
  <h3>Nenhuma receita encontrada</h3>
  <p>Não encontramos nenhuma receita com os filtros usados. Tente remover uma tag, ajustar os valores ou limpar os filtros.</p>
  </div>
  `;
    return;
  }

  // ===== BLOQUEIO (mantém seu comportamento atual) =====
  const safeCredits = Number.isFinite(credits) ? credits : 0;
  const noCredits = (!isPremium && safeCredits <= 0);

  recipeGrid.innerHTML = filtered.map(recipe => {
    const id = String(recipe.id);

    const isUnlocked =
      isPremium === true ||
      (Array.isArray(unlockedRecipes) && unlockedRecipes.includes(id));

    const showLock = (!isUnlocked && noCredits);
    const showPremiumCTA = (!isUnlocked && noCredits);

    return `
  <div class="recipe-card" data-recipe-id="${id}">
  <div class="recipe-image-container">

  <img
  src="${recipe.image}"
  alt="${recipe.name}"
  class="recipe-image"
  loading="lazy"
  decoding="async"
  onload="this.classList.add('is-loaded')"
  onerror="this.onerror=null; this.classList.add('is-loaded'); this.src='https://images.unsplash.com/photo-1490644659350-3f5777c715be?auto=format&fit=crop&w=1200&q=60';"
  />

  <div class="rf-skeleton" aria-hidden="true"></div>
  <div class="recipe-category">${recipe.category}</div>

  ${
    showLock
    ? `
                <div class="recipe-overlay">
                  <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              `
    : ''
  }
</div>

<div class="recipe-content">
<h3 class="recipe-title">${recipe.name}</h3>

<div class="recipe-meta">
<svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<circle cx="12" cy="12" r="10"/>
<polyline points="12 6 12 12 16 14"/>
</svg>
<span>${recipe.time}min</span>

<svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
<circle cx="9" cy="7" r="4"/>
</svg>
<span>${recipe.servings}</span>

<svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
</svg>
<span>${recipe.difficulty}</span>
</div>

<div class="recipe-stats">
<div class="stat">
<div class="stat-value calories">${recipe.calories}</div>
<div class="stat-label">calorias</div>
</div>
<div class="stat">
<div class="stat-value protein">${recipe.protein}g</div>
<div class="stat-label">proteína</div>
</div>
</div>

<button
type="button"
class="recipe-button ${
isUnlocked
? 'unlocked'
: (showPremiumCTA ? 'premium-cta' : 'locked')
}"
>
${
  isUnlocked
  ? `
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                  </svg>
                  <span class="btn-label">Ver Receita</span>
                `
  : `
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span class="btn-label">Desbloquear</span>
                `
}
</button>
</div>
</div>
`;
  }).join('');
}






/* =========================================================
   FUNÇÃO: viewRecipe
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em viewRecipe.
   ========================================================= */
function viewRecipe(recipeId) {
  const id = String(recipeId);

  // 1) Premium abre direto
  if (isPremium === true) {
    requestOpenRecipe(id);
    return;
  }

  // 2) Se já foi desbloqueada "pra sempre", abre direto
  if (typeof isRecipeUnlocked === 'function' && isRecipeUnlocked(id)) {
    requestOpenRecipe(id);
    return;
  }

  // Créditos atuais (seguro)
  const c = (typeof getCreditsSafe === 'function')
    ? getCreditsSafe()
    : (Number.isFinite(credits) ? credits : 0);

  // 3) Créditos > 0 e ainda não desbloqueada => abre POPUP de confirmação
  if (c > 0) {
    if (typeof window.openConfirmCreditModal === 'function') {
      window.openConfirmCreditModal(id);
    } else {
      console.warn('[viewRecipe] openConfirmCreditModal não existe.');
    }
    return; // ✅ NÃO abre a receita aqui
  }

  // 4) Créditos <= 0 => abre Premium
  if (typeof window.openPremium === 'function') {
    window.openPremium('no-credits');
  } else if (typeof window.openPremiumModal === 'function') {
    window.openPremiumModal('no-credits');
  } else {
    console.warn('[viewRecipe] openPremium/openPremiumModal não existe.');
  }
}




/**
 * viewRecipe
 * --------------------------------------------------
 * FUNÇÃO LEGADA / COMPATIBILIDADE
 * Alguns trechos antigos do HTML (ou componentes) podem chamar viewRecipe().
 *
 * A partir de agora, ela NÃO decide mais nada:
 * ela delega 100% para o "porteiro" requestOpenRecipe(),
 * que executa a decisão central (premium / unlocked / crédito / premium modal).
 */
function viewRecipe(recipeId) {
  const id = String(recipeId);

  if (typeof requestOpenRecipe === 'function') {
    requestOpenRecipe(id);
    return;
  }

  // Fallback extremo (não ideal, mas evita tela quebrada se algo estiver fora de ordem)
  if (typeof renderRecipeDetail === 'function') {
    renderRecipeDetail(id);
    return;
  }

  console.warn('[viewRecipe] requestOpenRecipe/renderRecipeDetail não encontrados.');
}





// ==============================
// DETALHE DA RECEITA
// ==============================



/* =========================================================
   FUNÇÃO: renderRecipeDetail
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderRecipeDetail com base no estado atual do app.
   ========================================================= */
function renderRecipeDetail(recipeId) {
   const id = String(recipeId);
  const recipe = allRecipes.find(r => String(r.id) === id);
  if (!recipe) return;

  currentRecipe = recipe;
  const heroImage = recipe.images?.hero || recipe.image;
  

 recipeDetail.innerHTML = `
<div class="breadcrumbs-wrapper">
<button class="back-btn" onclick="closeRecipeDetail()">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M19 12H5M12 19l-7-7 7-7"/>
</svg>
Início
</button>

<div class="breadcrumbs">
<div class="breadcrumb-item">
<span class="breadcrumb-current">${recipe.name}</span>
</div>
</div>



</div>

<img src="${heroImage}" alt="${recipe.name}" class="detail-hero-image">





<div class="detail-content-wrapper">
<div style="align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem;">

<button class="btn-add-shopping" onclick="addToShoppingList(${recipe.id})">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
</svg>
Adicionar à Lista de compras
</button>
<br>
<p class="planner-subtitle" style="display: block; margin-top: -0.5rem; clear: both;">Aproveite para adicionar os ingredientes desta receita na Lista de compras (Só para Usuário Premium)</p>
</div>

${recipe.tags && recipe.tags.length > 0 ? `
        <div class="tags-container">
          ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      ` : ''}

  <div class="detail-stats">
  <div class="detail-stat">
  <div class="detail-stat-value">${recipe.calories}</div>
  <div class="detail-stat-label">Calorias</div>
  </div>
  <div class="detail-stat">
  <div class="detail-stat-value">${recipe.protein}g</div>
  <div class="detail-stat-label">Proteína</div>
  </div>
  <div class="detail-stat">
  <div class="detail-stat-value">${recipe.carbs}g</div>
  <div class="detail-stat-label">Carbos</div>
  </div>
  <div class="detail-stat">
  <div class="detail-stat-value">${recipe.fats}g</div>
  <div class="detail-stat-label">Gorduras</div>
  </div>
  <div class="detail-stat">
  <div class="detail-stat-value">${recipe.time}min</div>
  <div class="detail-stat-label">Tempo</div>
  </div>
  <div class="detail-stat">
  <div class="detail-stat-value">${recipe.difficulty}</div>
  <div class="detail-stat-label">Dificuldade</div>
  </div>
  </div>

  <div class="detail-section">
  <h3 class="section-title">
  <i data-lucide="calendar-plus" class="section-icon"></i>
  Adicionar ao Planejamento Semanal
  </h3>
  <p class="planner-subtitle">Selecione o dia da semana que você quer fazer esta receita (Só para Usuário Premium)</p>
  <div class="planner-days">
  ${['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'].map(day => `
            <button class="planner-day" onclick="addToWeekPlan('${day}', ${recipe.id})">${day}</button>
          `).join('')}
    </div>
    </div>

    ${recipe.benefits && recipe.benefits.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">
            <i data-lucide="heart-pulse" class="section-icon"></i>
            Benefícios
          </h3>
          <div class="benefits-grid">
            ${recipe.benefits.map(benefit => `
      <div class="benefit-item">
      <i data-lucide="check-circle" class="benefit-icon"></i>
      <span>${benefit}</span>
      </div>
      `).join('')}
          </div>
        </div>
      ` : ''}

    <div class="detail-section">
    <h3 class="section-title">
    <i data-lucide="chef-hat" class="section-icon"></i>
    Ingredientes
    </h3>
    <div class="ingredients-grid">





    ${(recipe.ingredients || []).map(ing => {
        if (typeof ing === 'string') {
          ing = { text: ing, quantity: '', name: ing };
        }

      // Pega ícone (só Lucide agora)
      const iconName = ing.icon || getIconFromIngredientName(ing.text || ing.name || ing.quantity);

      // Renderiza ícone
      const iconHTML = `<i data-lucide="${iconName}" class="ingredient-icon"></i>`;
  
  return `
      <div class="ingredient-item">
      <div class="ingredient-icon-wrapper">
      ${iconHTML}
      </div>
      <div class="ingredient-content">
      <span class="ingredient-text">${ing.text || ing.name || ing.quantity || ing}</span>
      ${ing.optional ? '<span class="ingredient-optional">Opcional</span>' : ''}
      </div>
      </div>
      `;
}).join('')}
 
        </ol>
      </div>
	  
	  
	  
	  
	  <!-- ✅ MODO DE PREPARO -->
        ${recipe.instructions && (Array.isArray(recipe.instructions) ? recipe.instructions : recipe.instructions.steps || []).length > 0 ? `
      <div class="detail-section">
      <h3 class="section-title">
      <i data-lucide="chef-hat" class="section-icon"></i>
      Modo de Preparo
      </h3>
      <ol class="instructions-list">
      ${(Array.isArray(recipe.instructions) ? recipe.instructions : recipe.instructions.steps || []).map((step, index) => `
                        <li class="instruction-step">
                            <span class="step-number">${index + 1}</span>
                            <span class="step-text">${step}</span>
                        </li>
                    `).join('')}
        </ol>
        </div>
        ` : ''}
	  
	  
	  
	  

      ${recipe.tips && recipe.tips.length > 0 ? `
      <div class="detail-section">
      <h3 class="section-title">
      <i data-lucide="lightbulb" class="section-icon"></i>
      Dicas do Chef
      </h3>
      <div class="tips-list">
      ${recipe.tips.map(tip => `<div class="tip-item">${tip}</div>`).join('')}
          </div>
        </div>
      ` : ''}

      ${recipe.allergens && recipe.allergens.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">
            <i data-lucide="alert-triangle" class="section-icon"></i>
            Alérgenos
          </h3>
          <div class="allergens-container">
            ${recipe.allergens.map(allergen => `
        <div class="allergen-badge">
        <i data-lucide="alert-circle" class="allergen-icon"></i>
        ${allergen}
        </div>
        `).join('')}
          </div>
        </div>
      ` : ''}
      </div>
      `;

  // ✅ Renderiza os ícones Lucide
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ✅ ANIMAÇÃO SUAVE
  const slider = document.getElementById('heroSlider');
  const categories = document.querySelector('.categories-new');
  
  // Fade out: grid, slider, categorias
  recipeGrid.classList.add('fade-out');
  if (slider) slider.classList.add('fade-out');
  if (categories) categories.classList.add('fade-out');
  
  setTimeout(() => {
    // Esconde os elementos
    recipeGrid.classList.add('hidden');
    recipeGrid.classList.remove('fade-out');
    if (slider) {
      slider.style.display = 'none';
      slider.classList.remove('fade-out');
    }
    if (categories) {
      categories.style.display = 'none';
      categories.classList.remove('fade-out');
    }
    
    // Mostra receita
    recipeDetail.classList.remove('hidden');
    recipeDetail.classList.add('fade-in');
    
    // Scroll suave pro topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
}




window.closeRecipeDetail = function() {
  const recipeDetailEl = document.getElementById('recipe-detail');
  const recipeGridEl = document.getElementById('recipe-grid');
  
  if (!recipeDetailEl || !recipeGridEl) return;

  const slider = document.getElementById('heroSlider');
  const categories = document.querySelector('.categories-new');
  
  // Fade out: receita
  recipeDetailEl.classList.add('fade-out');
  
  setTimeout(() => {
    // Esconde receita
    recipeDetailEl.classList.add('hidden');
    recipeDetailEl.classList.remove('fade-out', 'fade-in');
    
    currentRecipe = null;
    
    // Mostra grid, slider, categorias
    recipeGridEl.classList.remove('hidden');
    recipeGridEl.classList.add('fade-in');
    
    if (slider) {
      slider.style.display = 'block';
      slider.classList.add('fade-in');
    }
    if (categories) {
      categories.style.display = 'block';
      categories.classList.add('fade-in');
    }
    
    renderRecipes();
    
    // Scroll suave pro topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
};




window.closeRecipeDetailAndFilter = function(category) {
  const recipeDetailEl = document.getElementById('recipe-detail');
  const recipeGridEl = document.getElementById('recipe-grid');
  
  if (!recipeDetailEl || !recipeGridEl) return;

  const slider = document.getElementById('heroSlider');
  const categories = document.querySelector('.categories-new');
  
  // Fade out: receita
  recipeDetailEl.classList.add('fade-out');
  
  setTimeout(() => {
    // Esconde receita
    recipeDetailEl.classList.add('hidden');
    recipeDetailEl.classList.remove('fade-out', 'fade-in');
    
    currentRecipe = null;
    
    // Mostra grid, slider, categorias
    recipeGridEl.classList.remove('hidden');
    recipeGridEl.classList.add('fade-in');
    
    if (slider) {
      slider.style.display = 'block';
      slider.classList.add('fade-in');
    }
    if (categories) {
      categories.style.display = 'block';
      categories.classList.add('fade-in');
    }
    
    // ✅ FILTRA PELA CATEGORIA
    searchTerm = category;
    renderRecipes();
    
    // ✅ ATIVA O BOTÃO DA CATEGORIA
    document.querySelectorAll('.category-card-new').forEach(card => {
      card.classList.remove('active');
      if (card.textContent.trim() === category) {
        card.classList.add('active');
        // Scroll pra categoria ativa
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
    
	
	
	
	
    // Scroll suave pro topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
};







// ==============================
// LISTA DE COMPRAS
// ==============================
window.addToShoppingList = function(recipeId) {
  const recipe = allRecipes.find(r => r.id === recipeId);
  if (!recipe) return;

  (recipe.ingredients || []).forEach(ing => {
    const ingText = typeof ing === 'string'
      ? ing
      : `${ing.quantity || ''} ${ing.text || ''}`.trim();

    const existingItem = shoppingList.find(item => {
      const itemText = typeof item.text === 'string'
        ? item.text
        : `${item.quantity || ''} ${item.text || ''}`.trim();
      return itemText.toLowerCase() === ingText.toLowerCase();
    });

    if (existingItem) {
      if (!existingItem.recipes) existingItem.recipes = [existingItem.recipe];
      if (!existingItem.recipes.includes(recipe.name)) existingItem.recipes.push(recipe.name);
    } else {
      shoppingList.push({
        id: Date.now() + Math.random(),
        text: ingText,
        checked: false,
        recipe: recipe.name,
        recipes: [recipe.name]
      });
    }
  });

  saveShoppingList();
  showNotification('Sucesso!', `Ingredientes de "${recipe.name}" adicionados à lista.`);
};


/* =========================================================
   FUNÇÃO: renderShoppingList
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderShoppingList com base no estado atual do app.
   ========================================================= */
function renderShoppingList() {
  const content = document.getElementById('shopping-list-content');
  if (!content) return;

  if (shoppingList.length === 0) {
    content.innerHTML = `
      <div class="shopping-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <p style="font-size:1.125rem;margin-bottom:.5rem;">Sua lista está vazia</p>
      <p style="font-size:.875rem;">Adicione ingredientes das receitas</p>
      </div>
      `;
    return;
  }

  content.innerHTML = `
      <div style="max-height: 60vh; overflow-y: auto;">
      ${shoppingList.map(item => `
        <div class="shopping-item">
          <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItem('${item.id}')">
          <div class="shopping-item-content">
            <div class="shopping-item-content">
              ${item.text
                ? (typeof item.text === 'string' ? item.text : `${item.quantity || ''} ${item.text}`)
                : (item.quantity && item.text ? `${item.quantity} ${item.text}` : (item.ingredient || item))
              }
            </div>
            <div class="shopping-item-recipe">${item.recipes ? item.recipes.join(', ') : ''}</div>
          </div>
          <button class="btn-delete" onclick="removeShoppingItem('${item.id}')" aria-label="Remover item">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      `).join('')}
        </div>

        <button class="btn-clear-list" onclick="clearShoppingList()">Limpar Toda a Lista</button>
        `;
}

window.toggleShoppingItem = function(id) {
  shoppingList = shoppingList.map(item =>
    item.id.toString() === id.toString() ? { ...item, checked: !item.checked } : item
  );
  saveShoppingList();
  renderShoppingList();
};

window.removeShoppingItem = function(id) {
  shoppingList = shoppingList.filter(item => item.id.toString() !== id.toString());
  saveShoppingList();
  renderShoppingList();
};

window.clearShoppingList = function() {
  showConfirm(
    'Limpar lista',
    'Tem certeza que deseja limpar toda a lista de compras?',
    () => {
      shoppingList = [];
      saveShoppingList();
      updateShoppingCounter();
      closeShoppingList();
      showNotification('Tudo certo', 'Lista de compras limpa.');
    }
  );
};

// ==============================
// PLANEJADOR SEMANAL
// ==============================
let selectedDayForPlanner = null;
let selectedRecipeForPlanner = null;

// ✅ B) abre modal existente no HTML (#meal-selector-modal)
window.addToWeekPlan = function(day, recipeId) {
  console.log('[PLANNER] Abrindo seletor:', { day, recipeId });
  
  // ✅ Salva os valores
  selectedDayForPlanner = day;
  selectedRecipeForPlanner = recipeId;

  const recipe = allRecipes.find(r => r.id === recipeId);
  if (mealSelectorSubtitle && recipe) {
    mealSelectorSubtitle.textContent = `${day} - ${recipe.name}`;
  }

  const mealModal = document.getElementById('meal-selector-modal');
  if (mealModal) {
    // ✅ Remove hidden e modal-open do body
    mealModal.classList.remove('hidden');
    mealModal.style.pointerEvents = 'auto'; // ✅ IMPORTANTE
    document.body.classList.add('modal-open');
    
    console.log('[PLANNER] Modal aberto');
  }
  
  
  // ✅ Renderiza ícones Lucide
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
    
};


window.addToWeekPlanWithMeal = function(meal) {
  console.log('[PLANNER] Adicionando:', { 
    day: selectedDayForPlanner, 
    recipeId: selectedRecipeForPlanner, 
    meal 
  });
  
  // ✅ Validação com log de erro
  if (!selectedDayForPlanner || !selectedRecipeForPlanner) {
    console.error('[PLANNER] Erro: Variáveis não definidas!', {
      selectedDay: selectedDayForPlanner,
      selectedRecipe: selectedRecipeForPlanner
    });
    return;
  }

  // ✅ Busca a receita
  const recipe = allRecipes.find(r => r.id === selectedRecipeForPlanner);
  
  if (!recipe) {
    console.error('[PLANNER] Erro: Receita não encontrada!', {
      recipeId: selectedRecipeForPlanner
    });
    return;
  }

  // ✅ Adiciona ao planejamento
  const key = `${selectedDayForPlanner}-${meal}`;
  weekPlan[key] = recipe;

  // ✅ Salva
  saveWeekPlan();
  
  console.log('[PLANNER] Receita salva:', { key, recipe: recipe.name });
  
  // ✅ Notificação
  showNotification(
  'Receita Adicionada!', 
  `${recipe.name} adicionado para\n${selectedDayForPlanner} - ${meal}`
   );

  // ✅ FECHA O MODAL (IMPORTANTE!)
  window.closeMealSelector();
  
  console.log('[PLANNER] Modal fechado, processo concluído');
};

window.closeMealSelector = function() {
  const modal = document.getElementById('meal-selector-modal');

  if (modal) {
    modal.classList.add('hidden');
    modal.style.pointerEvents = 'auto'; // ✅ MUDOU: 'auto' em vez de 'none'
  }

  // ✅ Limpa as variáveis
  selectedDayForPlanner = null;
  selectedRecipeForPlanner = null;
  
  // ✅ Remove a classe modal-open
  document.body.classList.remove('modal-open');
  
  console.log('[MEAL SELECTOR] Modal fechado e variáveis limpas');
};







/* =========================================================
   FUNÇÃO: renderWeekPlanner
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderWeekPlanner com base no estado atual do app.
   ========================================================= */
function renderWeekPlanner() {
  const content = document.getElementById('week-planner-content');
  if (!content) return;

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo' ];
  const meals = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'];

  const dailyCalories = {};
  days.forEach(day => {
    let total = 0;
    meals.forEach(meal => {
      const key = `${day}-${meal}`;
      if (weekPlan[key]) total += weekPlan[key].calories;
    });
    dailyCalories[day] = total;
  });

  content.innerHTML = `
        <div class="week-planner-wrapper">
        <table class="week-table">
        <thead>
        <tr>
        <th>Refeição</th>
        ${days.map(day => `<th>${day}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${meals.map(meal => `
        <tr>
        <td style="background:#f9fafb;font-weight:600;">${meal}</td>
        ${days.map(day => {
            const key = `${day}-${meal}`;
                const planned = weekPlan[key];
                return `
            <td>
            ${planned ? `
                      <div class="planned-meal">
                        <div class="planned-meal-name">${planned.name}</div>
                        <div class="planned-meal-cal">${planned.calories} cal</div>
                        <button class="btn-remove-meal" onclick="removeFromWeekPlan('${day}', '${meal}')">Remover</button>
                      </div>
                    ` : `<div class="empty-slot">-</div>`}
              </td>
              `;
              }).join('')}
            </tr>
          `).join('')}
              <tr>
              <td style="background:#fffbeb;font-weight:600;">Total do Dia</td>
              ${days.map(day => `
              <td style="background:#fffbeb;font-weight:600;color:#ea580c;">
                ${dailyCalories[day]} cal
              </td>
            `).join('')}
                </tr>
                </tbody>
                </table>
                </div>

                ${isPremium ? `
      <button class="btn-save-plan" onclick="saveWeekPlanConfirm()">Salvar Planejamento</button>
    ` : `
      <button class="btn-save-plan" disabled title="Disponível apenas para usuários Premium">Calcule e Planeje sua Semana</button>
    `}
                  `;
}

window.saveWeekPlanConfirm = function() {
  showNotification('Planejamento salvo', 'Planejamento semanal salvo com sucesso.');
};

window.removeFromWeekPlan = function(day, meal) {
  const key = `${day}-${meal}`;
  delete weekPlan[key];
  saveWeekPlan();
  renderWeekPlanner();
};

// ==============================
// CALCULADORA
// ==============================
window.calculateCalories = function() {
  const weight = parseFloat(document.getElementById('calc-weight')?.value);
  const height = parseFloat(document.getElementById('calc-height')?.value);
  const age = parseFloat(document.getElementById('calc-age')?.value);
  const gender = document.getElementById('calc-gender')?.value;
  const activity = document.getElementById('calc-activity')?.value;

  if (!weight || !height || !age) {
    showNotification('Atenção', 'Preencha todos os campos.');
    return;
  }

  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const tdee = bmr * (activityMultipliers[activity] || 1.2);
  const deficit = tdee - 500;
  const surplus = tdee + 300;

  const results = document.getElementById('calc-results');
  if (!results) return;

  results.classList.remove('hidden');
  results.innerHTML = `
                  <div class="result-box" style="background:#dbeafe;">
                  <h4>Suas Necessidades Calóricas</h4>
                  <div class="result-grid">
                  <div class="result-item">
                  <div class="result-value" style="color:#16a34a;">${Math.round(tdee)}</div>
                  <div class="result-label">Manutenção</div>
                  </div>
                  <div class="result-item">
                  <div class="result-value" style="color:#ea580c;">${Math.round(deficit)}</div>
                  <div class="result-label">Perder Peso</div>
                  </div>
                  <div class="result-item">
                  <div class="result-value" style="color:#3b82f6;">${Math.round(surplus)}</div>
                  <div class="result-label">Ganhar Massa</div>
                  </div>
                  </div>
                  </div>

                  <div class="result-box" style="background:#f0fdf4;">
                  <h4>Macronutrientes Recomendados</h4>
                  <div class="result-grid">
                  <div class="result-item">
                  <div class="result-value" style="color:#3b82f6;">${Math.round(weight * 2)}g</div>
                  <div class="result-label">Proteína</div>
                  </div>
                  <div class="result-item">
                  <div class="result-value" style="color:#f59e0b;">${Math.round(tdee * 0.4 / 4)}g</div>
                  <div class="result-label">Carboidratos</div>
                  </div>
                  <div class="result-item">
                  <div class="result-value" style="color:#ea580c;">${Math.round(tdee * 0.25 / 9)}g</div>
                  <div class="result-label">Gorduras</div>
                  </div>
                  </div>
                  </div>
                  `;
};






// =========================================================
// MODAIS (controle) — WEB SEM GATE DE PREMIUM
// =========================================================

window.openCalculator = function () {
  // abre a calculadora para todos
  openModal(calculatorModal);
};

window.closeCalculator = function () {
  closeModal(calculatorModal);
};

window.openShoppingList = function () {
  // abre a lista de compras para todos
  renderShoppingList();
  openModal(shoppingModal);
};

window.closeShoppingList = function () {
  closeModal(shoppingModal);
};

window.openWeekPlanner = function () {
  // abre o planejador semanal para todos
  renderWeekPlanner();
  openModal(plannerModal);
};

window.closeWeekPlanner = function () {
  closeModal(plannerModal);
};







// ==============================
// PREMIUM (pronto p/ evoluir)
// ==============================

/* =========================================================
   FUNÇÃO: redeemPremiumCode
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em redeemPremiumCode (estado, validação e sincronização de UI).
   ========================================================= */
async function redeemPremiumCode(code) {
  // hoje: /api/redeem
  // amanhã: token/KV/edge -> só troca aqui
  const res = await fetch('/api/redeem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });

  const data = await res.json();
  return data; // { ok: true } | { ok:false, error }
}








/* =========================================================
   FUNÇÃO: activatePremium
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em activatePremium (estado, validação e sincronização de UI).
   ========================================================= */
async function activatePremium() {
  const input = document.getElementById('premium-code-input');
  const code = input ? input.value.trim().toUpperCase() : '';
  
  if (!code) {
    showNotification('Aviso', 'Digite um código válido');
    return;
  }

  try {
    const response = await fetch('/api/validate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    });

    const data = await response.json();

    // ✅ CORRIGIDO: Verifica data.ok ao invés de data.valid
    if (!data.ok) {
      showNotification('Código Inválido', data.error || 'Código inválido ou expirado');
      return;
    }

    // ✅ DEBUG
    console.log('[ACTIVATE] API Response:', {
      token: data.token,
      expiresAt: data.expiresAt,
      expiresInDays: data.expiresInDays
    });

    // ✅ ATIVA PREMIUM
    isPremium = true;
    premiumToken = data.token;
    premiumExpires = data.expiresAt;

    // ✅ Persiste no storage
    await storage.set('fit_premium', 'true');
    await storage.set('fit_premium_token', data.token);
    await storage.set('fit_premium_expires', data.expiresAt.toString());

    // ✅ Persiste no localStorage
    try {
      localStorage.setItem('fit_premium', 'true');
      localStorage.setItem('fit_premium_token', data.token);
      localStorage.setItem('fit_premium_expires', data.expiresAt.toString());
    } catch (e) {
      console.warn('[PREMIUM] localStorage falhou:', e);
    }

    // ✅ Sincroniza UI
    if (window.RF && RF.premium && typeof RF.premium.setActive === 'function') {
      RF.premium.setActive(true);
    } else if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }

    updateUI();

    if (typeof window.updatePremiumButtons === 'function') {
      window.updatePremiumButtons();
    }

    _setupPremiumTimers();

    // ✅ Fecha modal
    if (typeof window.closePremiumModal === 'function') {
      window.closePremiumModal();
    }

    showNotification(
      'Premium Ativado! 🎉',
      `Você tem acesso ilimitado por ${data.expiresInDays} dias!`
    );

    console.log('[PREMIUM] Ativado!', { 
      expires: new Date(data.expiresAt).toISOString() 
    });

  } catch (e) {
    console.error('Erro ao ativar premium:', e);
    if (String(e.message || '').includes('fetch')) {
      showNotification('Erro de Conexão', 'Verifique sua internet e tente novamente.');
    } else {
      showNotification('Erro', 'Erro ao validar código. Tente novamente.');
    }
  }
}







// ==============================
// SISTEMA HYBRID DE EXPIRAÇÃO PREMIUM
// ==============================






/* =========================================================
   FUNÇÃO: _handlePremiumExpiration
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em _handlePremiumExpiration (estado, validação e sincronização de UI).
   ========================================================= */
async function _handlePremiumExpiration() {
  console.log('[PREMIUM] Expirado - executando bloqueio');
  
  isPremium = false;
  premiumToken = null;
  premiumExpires = null;
  
  await storage.set('fit_premium', 'false');
  await storage.set('fit_premium_token', '');
  await storage.set('fit_premium_expires', '');
  
  updateUI();
  renderRecipes();
  
  // ✅ FECHA TODOS OS MODAIS ABERTOS
  const allModals = document.querySelectorAll('.modal:not(.hidden)');
  allModals.forEach(modal => {
    modal.classList.add('hidden');
  });
  document.body.classList.remove('modal-open');
  
  // Fecha modal de refeição especificamente
  if (typeof window.closeMealSelector === 'function') {
    window.closeMealSelector();
  }
  
  // Fecha detalhe de receita se estiver aberto
  if (typeof window.closeRecipeDetail === 'function') {
    window.closeRecipeDetail();
  }
  
  showNotification(
    'Premium Expirado', 
    'Seu acesso premium expirou. Adquira um novo código para continuar.'
  );
  
  setTimeout(() => {
    openModal(premiumModal);
  }, 2000);
  
  _clearPremiumTimers();
  
  // ✅ Força reload para limpar estados dos botões
  setTimeout(() => {
    window.location.reload();
  }, 2500);
}





// updatePremiumButtons()
// - Mantém o “amarelo/estado Premium” nos botões (TabBar + Hambúrguer)
// - Agora prioriza o estado único (RF.premium / isPremiumValidNow) e só usa variáveis antigas como fallback

/* =========================================================
   FUNÇÃO: updatePremiumButtons
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em updatePremiumButtons (estado, validação e sincronização de UI).
   ========================================================= */
function updatePremiumButtons() {
  const tabPremiumBtn = document.querySelector('.tab-premium');
  const tabPremiumLabel = tabPremiumBtn?.querySelector('.tab-label');

  const hamburgerPremiumBtn = document.querySelector('.hamburger-premium-btn');
  const hamburgerPremiumText = hamburgerPremiumBtn?.querySelector('span');

  // 1) Fonte única (quando existir)
  let active = false;

  // Se você tiver validação por expiração/token, ela manda
  if (typeof isPremiumValidNow === 'function') {
    active = !!isPremiumValidNow();
  } else if (window.RF && RF.premium && typeof RF.premium.isActive === 'function') {
    active = !!RF.premium.isActive();
  } else {
    // fallback antigo (não ideal, mas evita quebrar)
    active = !!isPremium;
  }

  // 2) Prazo (se existir): usa premiumExpires (memória) ou fit_premium_expires (storage)
  let expiresMs = null;
  if (typeof premiumExpires === 'number' && Number.isFinite(premiumExpires)) {
    expiresMs = premiumExpires;
  } else {
    const raw = localStorage.getItem('fit_premium_expires');
    const parsed = raw ? Number(raw) : NaN;
    if (Number.isFinite(parsed)) expiresMs = parsed;
  }

  // 3) UI: “amarelo” quando premium ativo
  if (active) {
    const daysLeft = expiresMs
      ? Math.max(0, Math.ceil((expiresMs - Date.now()) / (1000 * 60 * 60 * 24)))
      : null;

    // ✅ TAB BAR - Fica amarelo
    if (tabPremiumBtn) tabPremiumBtn.classList.add('has-premium');
    if (tabPremiumLabel) tabPremiumLabel.textContent = 'Premium';

    // ✅ MENU HAMBÚRGUER - Fica amarelo + mostra dias (se tiver)
    if (hamburgerPremiumBtn) {
      hamburgerPremiumBtn.classList.add('has-premium');
      hamburgerPremiumBtn.style.cursor = 'default';
      hamburgerPremiumBtn.style.opacity = '1';

      // SÓ desabilita se estiver na index
      const isIndex =
        /index\.html/i.test(location.pathname) ||
        location.pathname === '/' ||
        location.pathname === '';

      if (isIndex) {
        hamburgerPremiumBtn.disabled = true;
        hamburgerPremiumBtn.onclick = null;
      } else {
        hamburgerPremiumBtn.disabled = false;
        // Mantém o onclick original do HTML
      }
    }

    if (hamburgerPremiumText) {
      hamburgerPremiumText.textContent =
        daysLeft === null ? 'Premium' : `Premium (${daysLeft}D)`;
    }
  } else {
    // ❌ SEM PREMIUM - Volta ao normal
    if (tabPremiumBtn) tabPremiumBtn.classList.remove('has-premium');
    if (tabPremiumLabel) tabPremiumLabel.textContent = 'Premium';

    if (hamburgerPremiumBtn) {
      hamburgerPremiumBtn.classList.remove('has-premium');
      hamburgerPremiumBtn.disabled = false;
      hamburgerPremiumBtn.style.cursor = 'pointer';
      hamburgerPremiumBtn.style.opacity = '';
      // Mantém o onclick original do HTML
    }

    if (hamburgerPremiumText) hamburgerPremiumText.textContent = 'Seja Premium';
  }

  // 4) Mantém sync geral (body/header/tour) se existir
  if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
    RF.premium.syncUI();
  }

  // 5) Re-render icons (se estiver usando lucide)
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}








/* =========================================================
   FUNÇÃO: _setupPremiumTimers
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em _setupPremiumTimers (estado, validação e sincronização de UI).
   ========================================================= */
function _setupPremiumTimers() {
  // Limpa timers anteriores (se existirem)
  _clearPremiumTimers();
  
  if (!isPremium || !premiumExpires) return;
  
  const now = Date.now();
  const timeLeft = premiumExpires - now;
  
  // ✅ DEBUG - Ver cálculo
  console.log('[PREMIUM] Setup timers:', {
    now: new Date(now).toISOString(),
    expires: new Date(premiumExpires).toISOString(),
    timeLeft: timeLeft,
    timeLeftSeconds: Math.ceil(timeLeft / 1000),
    timeLeftDays: Math.ceil(timeLeft / (1000 * 60 * 60 * 24))
  });
  
  // ✅ Se já expirou, executa imediatamente
  if (timeLeft <= 0) {
    console.log('[PREMIUM] Já expirado ao configurar timer');
    _handlePremiumExpiration();
    return;
  }
  
  // ✅ CORREÇÃO: Usar apenas setInterval (não setTimeout para períodos longos)
  // Verifica a cada 30 segundos se expirou
  _premiumInterval = setInterval(() => {
    const now = Date.now();
    
    if (now >= premiumExpires) {
      console.log('[PREMIUM] Interval detectou expiração');
      _handlePremiumExpiration();
    } else {
      // ✅ DEBUG: mostra quanto tempo falta
      const remaining = premiumExpires - now;
      const daysLeft = Math.ceil(remaining / (1000 * 60 * 60 * 24));
      console.log(`[PREMIUM] Ainda ativo - ${daysLeft} dias restantes`);
    }




    
  }, 30000); // Verifica a cada 30 segundos

  
  
  console.log('[PREMIUM] Timer de verificação configurado (check a cada 30s)');
}





/* =========================================================
   FUNÇÃO: _clearPremiumTimers
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em _clearPremiumTimers (estado, validação e sincronização de UI).
   ========================================================= */
function _clearPremiumTimers() {
  if (_premiumTimeout) {
    clearTimeout(_premiumTimeout);
    _premiumTimeout = null;
  }
  
  if (_premiumInterval) {
    clearInterval(_premiumInterval);
    _premiumInterval = null;
  }
}

// ✅ Mantém função pública para compatibilidade

/* =========================================================
   FUNÇÃO: checkPremiumExpiration
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em checkPremiumExpiration (estado, validação e sincronização de UI).
   ========================================================= */
async function checkPremiumExpiration() {
  if (!isPremium || !premiumExpires) return;
  
  const now = Date.now();
  
  if (now > premiumExpires) {
    await _handlePremiumExpiration();
  }
}


// ==============================
// EVENTOS
// ==============================
if (premiumBtn) {
  premiumBtn.addEventListener('click', () => {
    if (modalMessage) modalMessage.textContent = 'Tenha acesso ilimitado a todas as receitas.';
    const warning = document.getElementById('credits-warning');
    if (warning) {
      if (credits === 0) warning.classList.remove('hidden');
      else warning.classList.add('hidden');
    }
    openModal(premiumModal);

    setTimeout(() => {
      if (premiumCodeInput) premiumCodeInput.focus();
    }, 100);
  });
}

if (modalCancel) modalCancel.addEventListener('click', () => window.closePremiumModal());
if (modalActivate) modalActivate.addEventListener('click', activatePremium);

if (premiumCodeInput) {
  premiumCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') activatePremium();
  });
}





/* =========================================================
   FUNÇÃO: handleSearchInput
   PARA QUE SERVE:
   - Manipula um evento/ação do usuário e encaminha a lógica necessária em handleSearchInput.
   ========================================================= */
function handleSearchInput(e) {
  const raw = String(e?.target?.value || '').trim();

  // 1) Ingredientes: ing: ...
  const m = raw.match(/^(ing|ingredientes)\s*:\s*(.+)$/i);

  if (m && m[2]) {
    const afterIng = m[2].trim();
    const parsed = parseAdvancedFilters(afterIng);

    searchIngredients = parsed.cleanedText
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    advancedFilters = parsed.filters;

    // quando é "ing:", não usamos busca por texto
    searchTerm = '';
  } else {
    // 2) Busca normal: pode conter filtros também
    const parsed = parseAdvancedFilters(raw);

    searchIngredients = [];
    advancedFilters = parsed.filters;
    searchTerm = parsed.cleanedText;
  }

  renderRecipes();
}



if (searchInput) {
  searchInput.addEventListener('input', (e) => {
  const raw = String(e.target.value || '').trim();

  // 1) Ingredientes: ing: ...
  const m = raw.match(/^(ing|ingredientes)\s*:\s*(.+)$/i);

  if (m && m[2]) {
    // separa parte de ingredientes do resto (para poder ter filtros junto)
    // Ex: "ing: tofu, tomate cal<=400"
    const afterIng = m[2].trim();

    // quebra por espaço para tentar detectar filtros no final
    // (mais simples: primeiro parseia filtros do "afterIng" inteiro)
    const parsed = parseAdvancedFilters(afterIng);

    searchIngredients = parsed.cleanedText
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    advancedFilters = parsed.filters;

    // quando é "ing:", não usamos busca por texto
    searchTerm = '';
  } else {
    // 2) Busca normal: pode conter filtros também
    const parsed = parseAdvancedFilters(raw);

    searchIngredients = [];
    advancedFilters = parsed.filters;
    searchTerm = parsed.cleanedText;
  }

  renderRecipes();
});

}

if (calculatorBtn) calculatorBtn.addEventListener('click', window.openCalculator);
if (shoppingBtn) shoppingBtn.addEventListener('click', window.openShoppingList);
if (plannerBtn) plannerBtn.addEventListener('click', window.openWeekPlanner);

// ==============================
// FAQ (SEM emoji)
// ==============================
const faqData = [
  {
    title: 'Créditos',
    items: [
      { q: 'Como funcionam os 3 créditos?', a: 'Use 1 crédito para liberar 1 receita permanentemente.' },
      { q: 'Perco acesso às receitas?', a: 'Não. Receita desbloqueada fica sua.' },
      { q: 'Posso ganhar mais créditos?', a: 'Para acesso ilimitado, ative o Premium.' }
    ]
  },
  {
    title: 'Premium',
    items: [
      { q: 'O que ganho?', a: 'Receitas ilimitadas e ferramentas completas.' },
      { q: 'Como ativar?', a: 'Clique em Ativar Premium e digite o código recebido.' },
      { q: 'Posso cancelar?', a: 'Sim. Sem fidelidade.' }
    ]
  },
  {
    title: 'Ferramentas',
    items: [
      { q: 'Calculadora de Calorias', a: 'Preencha seus dados para estimar metas.' },
      { q: 'Lista de Compras', a: 'Adicione ingredientes direto da receita.' },
      { q: 'Planejador Semanal', a: 'Escolha dia e refeição e organize sua semana.' }
    ]
  },
  {
    title: 'Receitas',
    items: [
      { q: 'Como desbloquear?', a: 'Clique na receita e use 1 crédito.' },
      { q: 'Posso buscar?', a: 'Use a barra de busca ou categorias.' },
      { q: 'Tem informação nutricional?', a: 'Sim: calorias, proteína, tempo e porções.' }
    ]
  }
];


/* =========================================================
   FUNÇÃO: chevronSvg
   PARA QUE SERVE:
   - Executa a lógica encapsulada em chevronSvg.
   ========================================================= */
function chevronSvg() {
  return `
                  <svg viewBox="0 0 24 24" fill="none">
                  <polyline points="9 18 15 12 9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                  </svg>
                  `;
}


/* =========================================================
   FUNÇÃO: renderFAQ
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderFAQ com base no estado atual do app.
   ========================================================= */
function renderFAQ() {
  const content = document.getElementById('faq-content');
  if (!content) return;

  content.innerHTML = faqData.map((section, idx) => `
                  <div class="faq-section" id="faq-sec-${idx}">
                  <button class="faq-header" onclick="toggleFAQSection(${idx})" aria-expanded="false">
                  <span class="faq-title">${section.title}</span>
                  <span class="faq-chevron">${chevronSvg()}</span>
                  </button>
                  <div class="faq-body" id="faq-body-${idx}" style="display:block;">
                  ${section.items.map(item => `
          <div style="margin-bottom:12px;">
            <div class="faq-q">${item.q}</div>
            <div class="faq-a">${item.a}</div>
          </div>
        `).join('')}
                    </div>
                    </div>
                    `).join('') + `
    <div class="faq-help">
      <h4>Ainda tem dúvidas?</h4>
      <div class="faq-help-links">
        <a class="wa" href="https://wa.me/5511999999999?text=Ajuda%20MyNutriFlow" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92V21a1 1 0 0 1-1.09 1A19.8 19.8 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75l1.14 4.57a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 .95-.27l4.57 1.14a1 1 0 0 1 .75 1z" stroke="currentColor" stroke-width="2"/>
          </svg>
          WhatsApp
        </a>
        <a class="ig" href="https://instagram.com/mynutriflow" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/>
            <path d="M16 11.37a4 4 0 1 1-7.88 1.26 4 4 0 0 1 7.88-1.26z" stroke="currentColor" stroke-width="2"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2"/>
          </svg>
          Instagram
        </a>
      </div>
    </div>
  `;

                    document.querySelectorAll('.faq-section').forEach(sec => sec.classList.add('open'));
                  }

                window.toggleFAQSection = function(idx) {
                  const body = document.getElementById(`faq-body-${idx}`);
  const sec = document.getElementById(`faq-sec-${idx}`);
  if (!body || !sec) return;

  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  sec.classList.toggle('open', !isOpen);
};

window.openFAQ = function() {
  renderFAQ();
  openModal(faqModal);
};
window.closeFAQ = function() { closeModal(faqModal); };

if (faqBtn) faqBtn.addEventListener('click', window.openFAQ);

// ==============================
// NOTIFICAÇÃO + CONFIRM
// ==============================

/* =========================================================
   FUNÇÃO: showNotification
   PARA QUE SERVE:
   - Executa a lógica encapsulada em showNotification.
   ========================================================= */
function showNotification(title, message) {
  const modal = document.getElementById('notification-modal');
  const titleEl = document.getElementById('notification-title');
  const messageEl = document.getElementById('notification-message');

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
}

window.closeNotification = function() {
  const modal = document.getElementById('notification-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};


/* =========================================================
   FUNÇÃO: showConfirm
   PARA QUE SERVE:
   - Executa a lógica encapsulada em showConfirm.
   ========================================================= */
function showConfirm(title, message, onConfirm) {
  const modal = document.getElementById('confirm-modal');
  if (!modal) return;

  const titleEl = modal.querySelector('.confirm-title');
  const messageEl = modal.querySelector('.confirm-message');
  const yesBtn = modal.querySelector('.confirm-yes');
  const noBtn = modal.querySelector('.confirm-no');

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;


/* =========================================================
   FUNÇÃO: cleanup
   PARA QUE SERVE:
   - Executa a lógica encapsulada em cleanup.
   ========================================================= */
  const cleanup = () => {
    if (yesBtn) yesBtn.onclick = null;
    if (noBtn) noBtn.onclick = null;
    modal.classList.add('hidden');
  };

  if (yesBtn) {
    yesBtn.onclick = () => {
      cleanup();
      onConfirm();
    };
  }

  if (noBtn) noBtn.onclick = cleanup;

  modal.classList.remove('hidden');

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  };
}

// ==============================
// HAPTIC
// ==============================

/* =========================================================
   FUNÇÃO: haptic
   PARA QUE SERVE:
   - Executa a lógica encapsulada em haptic.
   ========================================================= */
function haptic(ms = 8) {
  try {
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (navigator.vibrate) navigator.vibrate(ms);
    }
  } catch(e){}
}

document.addEventListener('touchstart', (e) => {
  const target = e.target.closest('.tap');
  if (target) haptic(8);
}, { passive: true });



// ================================
// BOTÃO VOLTAR AO TOPO
// ================================
const backToTopBtn = document.getElementById('back-to-top');
// Mostra/esconde baseado no scroll


// ================================
// TAB BAR - FUNÇÕES
// ================================
window.tabGoHome = function() {
  haptic(10);
  
  // Fecha modal de detalhes se estiver aberto
  closeRecipeDetail();
  
  // Reseta busca
  searchTerm = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  
  // Renderiza todas as receitas
  renderRecipes();
  
  // Scroll pro topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Atualiza estado ativo
  setActiveTab(0);
};

window.tabGoSearch = function() {
  haptic(10);
  
  // Scroll pro topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Foca no campo de busca
  setTimeout(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }, 300);
  
  // Atualiza estado ativo
  setActiveTab(1);
};





window.togglePlannerDropdown = function () {
  haptic(10);

  // pega por id OU por classe (porque às vezes seu dropdown é .planner-dropdown)
  const dropdown =
    document.getElementById('planner-dropdown') ||
    document.querySelector('.planner-dropdown');

  if (!dropdown) return;

  dropdown.classList.toggle('hidden');

  // Renderiza ícones lucide (se estiver usando)
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Atualiza estado ativo (Planner)
  if (typeof window.setActiveTab === 'function') {
    window.setActiveTab(2);
  }
};








window.closePlannerDropdown = function () {
  const dropdown =
    document.getElementById('planner-dropdown') ||
    document.querySelector('.planner-dropdown');
	  setActiveTab(0);

  if (dropdown) {
    dropdown.classList.add('hidden');
  }
};






window.tabGoPremium = function() {
  haptic(10);
  openPremiumModal('tab');
  setActiveTab(3);
};


/* =========================================================
   FUNÇÃO: setActiveTab
   PARA QUE SERVE:
   - Executa a lógica encapsulada em setActiveTab.
   ========================================================= */
function setActiveTab(index) {
  const tabs = document.querySelectorAll('.tab-item');
  tabs.forEach((tab, i) => {
    if (i === index) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}








// ================================
// DROPDOWN PLANNER - FUNÇÕES (VERSÃO FINAL)
// ================================
window.openCalorieCalculator = function() {
  haptic(10);

  // fecha o dropdown primeiro
  closePlannerDropdown();

  /* // se for FREE, deve abrir premium com foco
  if (window.RF?.premium?.isActive && !window.RF.premium.isActive()) {
    openPremiumModal('planner');
    return;
  } */

  // se for premium, abre a calculadora normal
  const calcBtn = document.getElementById('calculator-btn');
  if (calcBtn) calcBtn.click();
  openModal(calculatorModal);
  
  
};

window.openShoppingList = function() {
  haptic(10);

  closePlannerDropdown();

/*   if (window.RF?.premium?.isActive && !window.RF.premium.isActive()) {
    openPremiumModal('planner');
    return;
  } */

  const shoppingBtn = document.getElementById('shopping-btn');
  if (shoppingBtn) shoppingBtn.click();
    renderShoppingList();
  openModal(shoppingModal);
  
  
};

window.openWeekPlanner = function() {
  haptic(10);

  closePlannerDropdown();

/*   if (window.RF?.premium?.isActive && !window.RF.premium.isActive()) {
    openPremiumModal('planner');
    return;
  } */

  const plannerBtn = document.getElementById('planner-btn');
  if (plannerBtn) plannerBtn.click();
    renderWeekPlanner();
  openModal(plannerModal);
  
  
};










// ================================
// MENU HAMBÚRGUER - FUNÇÕES
// ================================
window.openHamburgerMenu = function () {
  const menu = document.getElementById('hamburger-menu');
  if (!menu) return;

  haptic?.(10);

  menu.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

window.closeHamburgerMenu = function () {
  const menu = document.getElementById('hamburger-menu');
  if (!menu) return;

  menu.classList.add('hidden');
  document.body.classList.remove('modal-open');
};








// ================================
// RODAPÉ - FUNÇÕES
// ================================
window.openFAQModal = function() {
  haptic(10);
  const faqModal = document.getElementById('faq-modal');
  if (faqModal) {
    faqModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
};















window.openPremiumModal = function(origin) {
  if (!origin) origin = 'tab';
  haptic(10);
  console.log('[Premium] Aberto por:', origin);
  
  const premiumModal = document.getElementById('premium-modal');
  if (!premiumModal) return;
  
  premiumModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  // foco simples (sem firula)
  setTimeout(() => {
    const input = document.getElementById('premium-code-input');
    if (input) input.focus();
  }, 150);
};

// Função para processar pagamento via Mercado Pago
window.openPremiumCheckout = async function(plan = 'premium-monthly') {
  try {
    const email = prompt('Digite seu email para continuar:');
    if (!email) return;

    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: plan, email: email })
    });

    const { preferenceId } = await response.json();

    // Inicializa MP se ainda não foi
    if (typeof mp === 'undefined') {
      window.mp = new MercadoPago('APP_USR-9e097327-7e68-41b4-be4b-382b6921803f');
    }

    mp.checkout({
      preference: { id: preferenceId },
      autoOpen: true
    });

  } catch (error) {
    console.error('Erro ao abrir checkout:', error);
    alert('Erro ao processar pagamento. Tente novamente.');
  }
};







/* =========================================================
   FUNÇÃO: isPremiumValidNow
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em isPremiumValidNow (estado, validação e sincronização de UI).
   ========================================================= */
function isPremiumValidNow() {
  const flag = localStorage.getItem('fit_premium') === 'true';
  const exp = parseInt(localStorage.getItem('fit_premium_expires') || '0', 10);
  return flag && exp > 0 && Date.now() < exp;
}

function forceFreeCleanup() {
  try {
    localStorage.setItem('fit_premium', 'false');
    localStorage.setItem('fit_premium_expires', '');
    localStorage.setItem('fit_premium_token', '');
  } catch (_) {}
  isPremium = false;
  premiumToken = null;
  premiumExpires = null;
}






// ================================
// Premium Core (fonte única)
// ================================

/* =========================================================
   FUNÇÃO: getPremiumExpiresFromStorage
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getPremiumExpiresFromStorage (UI/estado/localStorage/API).
   ========================================================= */
function getPremiumExpiresFromStorage() {
  const exp = parseInt(localStorage.getItem('fit_premium_expires') || '0', 10);
  return Number.isFinite(exp) ? exp : 0;
}

// Alias de compatibilidade (opcional, recomendado)
const getPremiumExpires = getPremiumExpiresFromStorage;


/* =========================================================
   FUNÇÃO: isPremiumValidNow
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em isPremiumValidNow (estado, validação e sincronização de UI).
   ========================================================= */
function isPremiumValidNow() {
  const flag = localStorage.getItem('fit_premium') === 'true';
  const exp = getPremiumExpiresFromStorage();
  return flag && exp > 0 && Date.now() < exp;
}

function clearPremiumState() {
  localStorage.setItem('fit_premium', 'false');
  localStorage.setItem('fit_premium_expires', '');
  localStorage.setItem('fit_premium_token', '');
  isPremium = false;
  premiumToken = null;
  premiumExpires = null;
}




// ==============================
// START
// ==============================
loadUserData();



// ================================
// RENDERIZA ÍCONES LUCIDE AO CARREGAR
// ================================
window.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    console.log('Ícones Lucide renderizados');
  }
});

// Renderiza novamente após 500ms (garantia)
setTimeout(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}, 500);




// ================================
// BOTÃO VOLTAR AO TOPO
// ================================
window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

window.addEventListener('scroll', () => {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    const scrollY = window.scrollY;
    
    // Aparece depois de 500px, some quando volta pra menos de 200px
    if (scrollY > 1000) {
      backToTopBtn.classList.remove('hidden');
    } else if (scrollY < 1000) {
      backToTopBtn.classList.add('hidden');
    }
  }
});


document.addEventListener('click', (e) => {
  const tabItem = e.target.closest('.tab-item');
  if (tabItem) closePlannerDropdown();
}, true);





// ================================
// AUTO-ABRIR FERRAMENTAS VIA URL
// ================================
window.addEventListener('DOMContentLoaded', function() {
	
  RF.premium.syncUI();
  const urlParams = new URLSearchParams(window.location.search);
  const tool = urlParams.get('tool');
  
  if (tool) {
    setTimeout(() => {
      switch(tool) {
        case 'calculator':
          const calcBtn = document.getElementById('calculator-btn');
          if (calcBtn) calcBtn.click();
          break;
        case 'shopping':
          const shopBtn = document.getElementById('shopping-btn');
          if (shopBtn) shopBtn.click();
          break;
        case 'planner':
          const planBtn = document.getElementById('planner-btn');
          if (planBtn) planBtn.click();
          break;
        case 'faq':
          const faqBtn = document.getElementById('faq-btn');
          if (faqBtn) faqBtn.click();
          break;
		  
		  
        case 'premium':
		openPremiumModal('url');
		break;
      }
      
      // Limpa URL depois de abrir
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 500);
  }
});






// ===============================
// DEBUG TABBAR + PLANNER (temporário)
// ===============================
(function debugPlannerTabbar(){
  'use strict';


/* =========================================================
   FUNÇÃO: pick
   PARA QUE SERVE:
   - Executa a lógica encapsulada em pick.
   ========================================================= */
  function pick(sel){ return document.querySelector(sel); }
  function closestAny(el, sels){
    for (const s of sels) {
      const c = el.closest(s);
      if (c) return c;
    }
    return null;
  }

  const TABBAR_SEL = ['.tabbar', '#tabbar', '.tab-bar', '#tab-bar'];
  const DROPDOWN_SEL = ['#plannerDropdown', '#planner-dropdown', '.plannerDropdown', '.planner-dropdown'];

  document.addEventListener('click', (e) => {
    const tabbar = closestAny(e.target, TABBAR_SEL);
    if (!tabbar) return;

    const a = e.target.closest('a');
    const btn = e.target.closest('button');
    const dd = DROPDOWN_SEL.map(s => pick(s)).find(Boolean);

    console.log('--- TABBAR CLICK ---');
    console.log('page:', location.pathname);
    console.log('target:', e.target);
    console.log('closest <a> href:', a ? a.getAttribute('href') : null);
    console.log('closest <button>:', !!btn);
    console.log('tabbar matched selector:', TABBAR_SEL.find(s => e.target.closest(s)));
    console.log('dropdown found:', dd ? (dd.id ? '#'+dd.id : dd.className) : 'NOT FOUND');
    console.log('defaultPrevented:', e.defaultPrevented);
  }, true);
})();



// ===============================
// PARTE 9 — DEBUG: QUEM CHAMA openPlannerDropdown()
// (não altera comportamento)
// ===============================
(function debugOpenPlannerCalls(){
  'use strict';

  if (window.__debugPlannerPatched) return;
  window.__debugPlannerPatched = true;

  const originalOpen = window.openPlannerDropdown;

  if (typeof originalOpen === 'function') {
    window.openPlannerDropdown = function () {
      console.log('[DEBUG] openPlannerDropdown() foi chamado em:', location.pathname);
      console.trace('[DEBUG] stack openPlannerDropdown');
      return originalOpen.apply(this, arguments);
    };
  } else {
    console.warn('[DEBUG] openPlannerDropdown não existe neste momento.');
  }
})();




// ===============================
// PARTE 10 — FALLBACK INDEX: criar/abrir planner-dropdown após clique
// (não interfere nos handlers existentes)
// ===============================
(function plannerIndexFallback(){
  'use strict';


/* =========================================================
   FUNÇÃO: isIndexPage
   PARA QUE SERVE:
   - Executa a lógica encapsulada em isIndexPage.
   ========================================================= */
  function isIndexPage() {
    const p = (location.pathname || '').toLowerCase();
    return p.endsWith('/index.html') || p === '/' || p.endsWith('/index');
  }

  function isPlannerButtonClick(target) {
    const btn = target.closest('button');
    if (!btn) return false;
    return !!btn.querySelector('svg.lucide-calendar, svg.lucide.lucide-calendar');
  }

  if (!isIndexPage()) return;

  document.addEventListener('click', function(e){
    if (!e.target.closest('.tab-bar')) return;
    if (!isPlannerButtonClick(e.target)) return;

    // deixa TODOS os handlers atuais rodarem primeiro
    setTimeout(function(){
      const dd = document.getElementById('planner-dropdown');
      if (!dd && typeof window.openPlannerDropdown === 'function') {
        window.openPlannerDropdown();
      }
    }, 0);
  }, false);
})();


// ===============================
// ESTADO VISUAL DO PLANNER (VERDE ↔ CINZA)
// - Fica verde quando dropdown abre
// - Volta ao cinza quando dropdown fecha
// - Baseado no estado REAL do DOM (hidden/display)
// ===============================
(function plannerActiveState() {
  'use strict';


/* =========================================================
   FUNÇÃO: getPlannerButton
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getPlannerButton (UI/estado/localStorage/API).
   ========================================================= */
  function getPlannerButton() {
    const tabbar = document.querySelector('.tab-bar');
    if (!tabbar) return null;

    return Array.from(tabbar.querySelectorAll('button')).find(btn =>
      btn.querySelector('svg.lucide-calendar, svg.lucide.lucide-calendar')
    );
  }


/* =========================================================
   FUNÇÃO: setActive
   PARA QUE SERVE:
   - Executa a lógica encapsulada em setActive.
   ========================================================= */
  function setActive(active) {
    const btn = getPlannerButton();
    if (!btn) return;
    btn.classList.toggle('is-active', active);
  }

  function isDropdownOpen() {
    const el = document.getElementById('planner-dropdown');
    if (!el) return false;

    // Se estiver explicitamente escondido, está fechado
    if (el.classList.contains('hidden')) return false;

    const cs = getComputedStyle(el);

    if (cs.display === 'none') return false;
    if (cs.visibility === 'hidden') return false;
    if (cs.opacity === '0') return false;
    if (cs.pointerEvents === 'none') return false;

    return true;
  }

  // Clique no botão do Planner → avalia após abrir
  document.addEventListener('click', function (e) {
    const btn = getPlannerButton();
    if (!btn) return;

    if (btn.contains(e.target)) {
      setTimeout(function () {
        setActive(isDropdownOpen());
      }, 0);
    }
  }, true);

  // Clique fora → avalia após fechar (timing real do seu DOM)
  document.addEventListener('click', function () {
    setTimeout(function () {
      setActive(isDropdownOpen());
    }, 60);
  }, false);

})();




// ===============================
// PARTE 13 — DEBUG ESTADO DO DROPDOWN AO FECHAR
// ===============================
(function debugPlannerDropdownState(){
  'use strict';

  if (window.__debugPlannerDropdownState) return;
  window.__debugPlannerDropdownState = true;


/* =========================================================
   FUNÇÃO: dd
   PARA QUE SERVE:
   - Executa a lógica encapsulada em dd.
   ========================================================= */
  function dd() { return document.getElementById('planner-dropdown'); }

  document.addEventListener('click', function(){
    setTimeout(() => {
      const el = dd();
      if (!el) return;

      const cs = getComputedStyle(el);
      console.log('[DEBUG dropdown]',
        'display:', cs.display,
        'visibility:', cs.visibility,
        'opacity:', cs.opacity,
        'pointerEvents:', cs.pointerEvents,
        'class:', el.className
      );
    }, 50);
  }, false);
})();





// ===============================
// TOUR PREMIUM (card no banner)
// - Botão aparece apenas no FREE
// - Premium continua podendo acessar o tour por outros gatilhos (ex: ?)
// ===============================
(function premiumTourCard(){
  'use strict';

  const openBtn   = document.getElementById('open-tour-btn');
  const card      = document.getElementById('tour-card');
  const textEl    = document.getElementById('tour-text');
  const counterEl = document.getElementById('tour-counter');
  const closeBtn  = document.getElementById('tour-close');
  const prevBtn   = document.getElementById('tour-prev');
  const nextBtn   = document.getElementById('tour-next');

  // Se não estiver na HOME (não existe botão/card), não faz nada
  if (!openBtn || !card || !textEl || !counterEl || !closeBtn || !prevBtn || !nextBtn) {
    return;
  }

  const steps = [
    "1) No plano Gratuito, você tem direito a 3 Créditos e cada um desbloqueia uma receita.",
    "2) Primeiro acesse a Calculadora de Calorias: Clareza, não paranoia. Você entende o que seu corpo precisa.",
	"3) Escolha uma receita de seu interesse. Uma escolha por vez já tira o peso do dia.",
	"4) Em cada receita você pode adicionar os ingredientes na lista de compras e adicionar ao Planejamento Semanal.",
	"5) No Planejador Semanal você organiza, soma as calorias e te livra do “o que eu como hoje?”.",
	"6) Onde Encontro estas ferramentas? No Planner, na versão Mobile e nos botões acima, na versão Web.",
	"7) Pronto. Se fizer sentido, ative o Premium e tenha acesso a todas receitas."
	
  
  ];

  let i = 0;

  // ===============================
  // CONTROLE DE PLANO
  // ===============================

/* =========================================================
   FUNÇÃO: isPremium
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em isPremium (estado, validação e sincronização de UI).
   ========================================================= */
  function isPremium(){
    return localStorage.getItem('fit_premium') === 'true';
  }

  function syncPremiumUI(){
    if (isPremium()) {
      // Premium: não mostra o botão no banner
      openBtn.classList.add('hidden');

      // garante que o card não fique aberto
      card.classList.add('hidden');
    } else {
      // Free: mostra o botão
      openBtn.classList.remove('hidden');
    }
  }

  // ===============================
  // RENDER
  // ===============================

/* =========================================================
   FUNÇÃO: render
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a render com base no estado atual do app.
   ========================================================= */
  function render(){
    textEl.textContent = steps[i];
    counterEl.textContent = `${i + 1}/${steps.length}`;
    prevBtn.disabled = (i === 0);
    nextBtn.textContent = (i === steps.length - 1) ? 'Fechar' : 'Avançar';
  }

  // ===============================
  // AÇÕES
  // ===============================

/* =========================================================
   FUNÇÃO: open
   PARA QUE SERVE:
   - Abre/mostra a interface ou modal relacionado a open.
   ========================================================= */
  function open(){
    card.classList.remove('hidden');
    i = 0;
    render();
  }

  function close(){
    card.classList.add('hidden');
  }

  // ===============================
  // EVENTOS
  // ===============================
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  prevBtn.addEventListener('click', () => {
    if (i > 0) {
      i--;
      render();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (i < steps.length - 1) {
      i++;
      render();
    } else {
      close();
    }
  });

  // ===============================
  // INIT
  // ===============================
  syncPremiumUI();

  // Expondo para uso externo (ex: após ativar Premium em runtime)
  window.syncPremiumTour = syncPremiumUI;

})();





// =========================================================
// PLANEJADOR — garante wrapper de scroll horizontal (WEB)
// =========================================================
(function ensurePlannerHorizontalScroll(){

/* =========================================================
   FUNÇÃO: wrapPlannerTable
   PARA QUE SERVE:
   - Executa a lógica encapsulada em wrapPlannerTable.
   ========================================================= */
  function wrapPlannerTable() {
    // tenta achar a tabela do planejador no DOM (modal aberto)
    // ajuste aqui se sua tabela tiver um id/class específico
    var table =
      document.querySelector('#week-planner-modal table') ||
      document.querySelector('.week-planner-modal table') ||
      document.querySelector('.planner-modal table') ||
      document.querySelector('#planner-modal table') ||
      document.querySelector('table.week-planner') ||
      null;

    if (!table) return;

    // se já estiver envolvida, não faz nada
    var parent = table.parentElement;
    if (parent && parent.classList && parent.classList.contains('planner-scroll-x')) return;

    // cria wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'planner-scroll-x';

    // insere wrapper antes da tabela e move tabela pra dentro
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }






document.addEventListener('DOMContentLoaded', function(){
  wrapPlannerTable();
  setupIngredientDropdown();
  setupAdvancedFiltersAutoApply();
});




  // 2) roda sempre que abrir o modal (captura cliques nos botões do planner)
  document.addEventListener('click', function(){
    // espera um tick caso o modal seja injetado depois do clique
    setTimeout(wrapPlannerTable, 0);
  }, true);

  // 3) se o DOM mudar (modal injetado dinamicamente), tenta de novo
  try {
    var obs = new MutationObserver(function(){
      wrapPlannerTable();
    });
    obs.observe(document.body, { childList: true, subtree: true });
  } catch (e) {}
})();



// =========================================================
// INFINITE SCROLL (HOME) — Motor + Render (Micropasso 2)
// =========================================================
(function () {
  const BATCH_SIZE = 24;

  const state = {
    list: null,
    cursor: 0,
    observing: false
  };

  // 🔧 Ajuste aqui se o seu grid tiver outro id/classe

/* =========================================================
   FUNÇÃO: getGridEl
   PARA QUE SERVE:
   - Obtém/carrega dados necessários para getGridEl (UI/estado/localStorage/API).
   ========================================================= */
  function getGridEl() {
    return document.getElementById('recipes-grid')
      || document.querySelector('.recipes-grid')
      || document.querySelector('#recipes-container')
      || null;
  }


/* =========================================================
   FUNÇÃO: ensureSentinel
   PARA QUE SERVE:
   - Executa a lógica encapsulada em ensureSentinel.
   ========================================================= */
  function ensureSentinel(grid) {
    if (!grid) return null;

    let sentinel = document.getElementById('rf-load-more-sentinel');
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.id = 'rf-load-more-sentinel';
      sentinel.style.height = '1px';
      sentinel.style.width = '100%';
      sentinel.style.marginTop = '1px';
      grid.appendChild(sentinel);
    } else {
      // garante que ele fica no final
      grid.appendChild(sentinel);
    }
    return sentinel;
  }

  // Remove apenas os cards, mantendo o sentinela (ele será reanexado no final)

/* =========================================================
   FUNÇÃO: clearGridKeepSentinel
   PARA QUE SERVE:
   - Executa a lógica encapsulada em clearGridKeepSentinel.
   ========================================================= */
  function clearGridKeepSentinel(grid) {
    if (!grid) return;

    const sentinel = document.getElementById('rf-load-more-sentinel');
    // remove tudo
    grid.innerHTML = '';
    // recoloca sentinela
    if (sentinel) grid.appendChild(sentinel);
  }

  // ---------------------------------------------------------
  // Render dos cards (reaproveita o que já existe)
  // ---------------------------------------------------------

/* =========================================================
   FUNÇÃO: renderCardFromExistingRenderer
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderCardFromExistingRenderer com base no estado atual do app.
   ========================================================= */
  function renderCardFromExistingRenderer(recipe) {
    // 1) Se você tiver uma função pronta de "criar card", usamos ela
    //    (muitos apps têm algo tipo createRecipeCard / renderRecipeCard etc.)
    if (typeof window.createRecipeCard === 'function') {
      return window.createRecipeCard(recipe);
    }
    if (typeof window.renderRecipeCard === 'function') {
      return window.renderRecipeCard(recipe);
    }

    // 2) Fallback seguro: cria um card simples clicável (não quebra seu app)
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const img = recipe.images?.hero || recipe.image || '';
    const name = recipe.name || recipe.title || 'Receita';
    const cat = recipe.category || '';

    card.innerHTML = `
                  <div class="recipe-image">
                  ${img ? `<img src="${img}" alt="${name}" loading="lazy" decoding="async">` : ''}
      </div>
      <div class="recipe-content">
        ${cat ? `<div class="recipe-category">${cat}</div>` : ''}
        <div class="recipe-title">${name}</div>
      </div>
    `;

                  // tenta abrir detalhe usando função existente
                  card.addEventListener('click', () => {
                    if (typeof window.requestOpenRecipe === 'function') {
                      window.requestOpenRecipe(recipe.id);
                    }
                });

              return card;
            }


          /* =========================================================
          FUNÇÃO: appendBatch
          PARA QUE SERVE:
          - Executa a lógica encapsulada em appendBatch.
          ========================================================= */
          function appendBatch(items) {
            const grid = getGridEl();
            if (!grid) return;

            // garante sentinela e insere cards antes dele
            const sentinel = ensureSentinel(grid);

            const frag = document.createDocumentFragment();
            items.forEach((r) => {
              const el = renderCardFromExistingRenderer(r);
              if (el) frag.appendChild(el);
            });

          // insere antes do sentinela (pra ele continuar no final)
          if (sentinel) {
            grid.insertBefore(frag, sentinel);
          } else {
          grid.appendChild(frag);
        }
    }


  /* =========================================================
  FUNÇÃO: loadNextBatch
  PARA QUE SERVE:
  - Obtém/carrega dados necessários para loadNextBatch (UI/estado/localStorage/API).
  ========================================================= */
  function loadNextBatch() {
    if (!Array.isArray(state.list)) return;

    const start = state.cursor;
    const end = Math.min(start + BATCH_SIZE, state.list.length);
    if (start >= end) return;

    const batch = state.list.slice(start, end);
    state.cursor = end;

    appendBatch(batch);

    // acabou? para de observar
    if (state.cursor >= state.list.length) {
      window.__rfStopInfiniteScroll && window.__rfStopInfiniteScroll();
    }
}

const observer = new IntersectionObserver((entries) => {
  if (entries.some(e => e.isIntersecting)) loadNextBatch();
}, { root: null, rootMargin: '600px 0px', threshold: 0.01 });


/* =========================================================
FUNÇÃO: start
PARA QUE SERVE:
- Executa a lógica encapsulada em start.
========================================================= */
function start(list) {
  const grid = getGridEl();
  if (!grid) {
    console.warn('[InfiniteScroll] Grid nao encontrado');
    return;
  }

state.list = Array.isArray(list) ? list : [];
state.cursor = 0;

// limpa grid e reinicia
ensureSentinel(grid);
clearGridKeepSentinel(grid);

const sentinel = ensureSentinel(grid);

if (!state.observing && sentinel) {
  observer.observe(sentinel);
  state.observing = true;
}

loadNextBatch();
}


/* =========================================================
FUNÇÃO: stop
PARA QUE SERVE:
- Executa a lógica encapsulada em stop.
========================================================= */
function stop() {
  const sentinel = document.getElementById('rf-load-more-sentinel');
  if (sentinel) observer.unobserve(sentinel);
  state.observing = false;
}

// ---------------------------------------------------------
// Reset da Home (voltar do detalhe / trocar categoria)
// ---------------------------------------------------------

/* =========================================================
FUNÇÃO: homeReset
PARA QUE SERVE:
- Executa a lógica encapsulada em homeReset.
========================================================= */
function homeReset(optionalList) {
  // se passar lista, troca a lista atual
  if (Array.isArray(optionalList)) state.list = optionalList;

  // se não tiver lista ainda, tenta usar a global (compat)
  if (!Array.isArray(state.list) || state.list.length === 0) {
    state.list = (typeof window.allRecipes !== 'undefined' && Array.isArray(window.allRecipes))
    ? window.allRecipes
    : (typeof window.ALL_RECIPES !== 'undefined' && Array.isArray(window.ALL_RECIPES))
    ? window.ALL_RECIPES
    : (typeof window.RECIPES !== 'undefined' && Array.isArray(window.RECIPES))
    ? window.RECIPES
    : [];
  }

// reinicia do zero
stop();
start(state.list);
}

// expõe
window.__rfStartInfiniteScroll = start;
window.__rfStopInfiniteScroll = stop;
window.__rfHomeReset = homeReset;

console.log('[InfiniteScroll] motor carregado (passo 2)');
})();




// ===================================
// INTEGRAÇÃO MERCADO PAGO
// ===================================

// Inicializa Mercado Pago SDK (DECLARA APENAS UMA VEZ!)
const mp = new MercadoPago('APP_USR-9e097327-7e68-41b4-be4b-382b6921803f');



// Função para abrir checkout do Mercado Pago
window.openPremiumCheckout = async function(plan = 'premium-monthly') {
  try {
    const email = prompt('Digite seu email para continuar:');
    if (!email) return;

    console.log('1. Enviando requisição...');

    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: plan, email: email })
    });

  console.log('2. Status:', response.status);
  console.log('3. OK:', response.ok);

  const data = await response.json();

  console.log('4. Data recebida:', data);

  if (!data.preferenceId) {
    throw new Error('PreferenceId não retornado');
  }

console.log('5. Abrindo checkout com preferenceId:', data.preferenceId);

mp.checkout({
  preference: { id: data.preferenceId },
  autoOpen: true
});

} catch (error) {
  console.error('ERRO DETALHADO:', error);
  alert('Erro ao processar pagamento: ' + error.message);
}
};







// 3. Função para validar código premium via API

/* =========================================================
FUNÇÃO: validatePremiumCodeAPI
PARA QUE SERVE:
- Centraliza rotinas relacionadas a Premium em validatePremiumCodeAPI (estado, validação e sincronização de UI).
========================================================= */
async function validatePremiumCodeAPI(code) {
  try {
    const response = await fetch('/api/validate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    });

  const result = await response.json();
  return result;

} catch (error) {
  console.error('Erro ao validar código:', error);
  return { valid: false, error: 'Erro ao validar código' };
}
}





// ===================================
// PREMIUM MODAL - TABS E PLANOS
// ===================================


/* =========================================================
FUNÇÃO: showPremiumTab
PARA QUE SERVE:
- Centraliza rotinas relacionadas a Premium em showPremiumTab (estado, validação e sincronização de UI).
========================================================= */
function showPremiumTab(tab) {
  // Remove active de todas as tabs
  document.querySelectorAll('.premium-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.premium-tab-content').forEach(c => c.classList.remove('active'));

  // Ativa tab selecionada
  if (tab === 'plans') {
    document.querySelector('.premium-tab:first-child').classList.add('active');
    document.getElementById('premium-plans-tab').classList.add('active');
  } else {
  document.querySelector('.premium-tab:last-child').classList.add('active');
  document.getElementById('premium-code-tab').classList.add('active');
}
}


/* =========================================================
FUNÇÃO: selectPlan
PARA QUE SERVE:
- Executa a lógica encapsulada em selectPlan.
========================================================= */
async function selectPlan(plan) {
  const email = prompt('Digite seu email para continuar:');
  if (!email) return;

  try {
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: plan, email: email })
    });

  const { preferenceId } = await response.json();

  // Inicializa MP se ainda não foi
  if (typeof mp === 'undefined') {
    window.mp = new MercadoPago(process.env.MP_PUBLIC_KEY || 'APP_USR-9e097327-7e68-41b4-be4b-382b6921803f');
  }

mp.checkout({
  preference: { id: preferenceId },
  autoOpen: true
});

} catch (error) {
  console.error('Erro ao abrir checkout:', error);
  alert('Erro ao processar pagamento. Tente novamente.');
}
}





// ===================================
// SISTEMA PREMIUM - ABAS NAVEGÁVEIS
// ===================================

let userData = {
  name: '',
  email: '',
  phone: '',
  registered: false
};

// Trocar de aba (navegação livre)

/* =========================================================
FUNÇÃO: switchTab
PARA QUE SERVE:
- Executa a lógica encapsulada em switchTab.
========================================================= */
function switchTab(tabNumber) {
  // Remove active de todas as abas
  document.querySelectorAll('.premium-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.premium-tab-content').forEach(content => content.classList.remove('active'));

  // Ativa aba selecionada
  document.querySelector(`.premium-tab-btn:nth-child(${tabNumber})`).classList.add('active');
  document.getElementById(`tab-${tabNumber}`).classList.add('active');
  
  console.log('[TAB] Mudou para aba', tabNumber);
}

// Formulário de cadastro
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Captura dados
  userData.name = document.getElementById('user-name').value.trim();
  userData.email = document.getElementById('user-email').value.trim().toLowerCase();
  userData.phone = document.getElementById('user-phone').value.trim();
  
  // Valida
  if (!userData.name || !userData.email || !userData.phone) {
    showNotification('Aviso', 'Preencha todos os campos');
    return;
  }
  
  if (!userData.email.includes('@')) {
    showNotification('Aviso', 'Digite um email válido');
    return;
  }
  
  // Marca como registrado
  userData.registered = true;
  
  // Salva no localStorage (auto-preenchimento futuro)
  try {
    localStorage.setItem('vf_user_name', userData.name);
    localStorage.setItem('vf_user_email', userData.email);
    localStorage.setItem('vf_user_phone', userData.phone);
  } catch (e) {
    console.warn('[STORAGE] Falha ao salvar dados:', e);
  }
  
  console.log('[CADASTRO] Salvo:', userData);
  
  showNotification('✅ Cadastro Completo!', 'Agora escolha seu plano');
  
  // Vai pra aba de planos
  switchTab(2);
});

// Auto-preencher formulário se já cadastrou antes

/* =========================================================
   FUNÇÃO: autoFillForm
   PARA QUE SERVE:
   - Executa a lógica encapsulada em autoFillForm.
   ========================================================= */
function autoFillForm() {
  try {
    const savedName = localStorage.getItem('vf_user_name');
    const savedEmail = localStorage.getItem('vf_user_email');
    const savedPhone = localStorage.getItem('vf_user_phone');
    
    if (savedName && savedEmail && savedPhone) {
      document.getElementById('user-name').value = savedName;
      document.getElementById('user-email').value = savedEmail;
      document.getElementById('user-phone').value = savedPhone;
      
      userData.name = savedName;
      userData.email = savedEmail;
      userData.phone = savedPhone;
      userData.registered = true;
      
      console.log('[AUTO-FILL] Dados carregados do localStorage');
    }
  } catch (e) {
    console.warn('[AUTO-FILL] Erro:', e);
  }
}

// Selecionar plano COM VALIDAÇÃO

/* =========================================================
   FUNÇÃO: selectPlanWithValidation
   PARA QUE SERVE:
   - Executa a lógica encapsulada em selectPlanWithValidation.
   ========================================================= */
async function selectPlanWithValidation(plan) {
  // ✅ VALIDA SE PREENCHEU CADASTRO
  if (!userData.registered) {
    showNotification('⚠️ Cadastro Necessário', 'Complete o cadastro antes de escolher um plano');
    switchTab(1); // Força voltar pra aba 1
    return;
  }
  
  try {
    if (plan === 'trial') {
      await activateTrial();
    } else {
      await processPayment(plan);
    }
  } catch (error) {
    console.error('Erro ao processar plano:', error);
    showNotification('Erro', 'Erro ao processar. Tente novamente.');
  }
}




// Ativar trial de 5 dias

/* =========================================================
   FUNÇÃO: activateTrial
   PARA QUE SERVE:
   - Executa a lógica encapsulada em activateTrial.
   ========================================================= */
async function activateTrial() {
  try {
    const trialCode = 'TRIAL-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const expiresAt = Date.now() + (5 * 24 * 60 * 60 * 1000);
    
    // Salva usuário no Firestore
    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        plan: 'trial',
        code: trialCode,
        expiresAt: expiresAt
      })
    });
    
    if (!response.ok) throw new Error('Erro ao criar trial');
    
    // ✅ ATIVA PREMIUM LOCALMENTE
    isPremium = true;
    premiumToken = trialCode;
    premiumExpires = expiresAt;
    
    // ✅ SALVA NO STORAGE
    await storage.set('fit_premium', 'true');
    await storage.set('fit_premium_token', trialCode);
    await storage.set('fit_premium_expires', expiresAt.toString());
    
    // ✅ SALVA NO LOCALSTORAGE
    localStorage.setItem('fit_premium', 'true');
    localStorage.setItem('fit_premium_token', trialCode);
    localStorage.setItem('fit_premium_expires', expiresAt.toString());
    
    // ✅ DISPARA PIPELINE DE UI (IGUAL AO CÓDIGO)
    if (window.RF && RF.premium && typeof RF.premium.setActive === 'function') {
      RF.premium.setActive(true);
    } else if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }
    
    // ✅ ATUALIZA UI
    updateUI();
    
    // ✅ ATUALIZA BOTÕES PREMIUM
    if (typeof window.updatePremiumButtons === 'function') {
      window.updatePremiumButtons();
    }
    
    // ✅ SETUP TIMERS
    if (typeof _setupPremiumTimers === 'function') {
      _setupPremiumTimers();
    }
    
	await new Promise(resolve => setTimeout(resolve, 500));
	
    // ✅ FECHA MODAL
    closePremiumModal();
    
    showNotification(
      'Trial Ativado!',
      'Você tem 5 dias de acesso premium grátis!'
    );
    
    console.log('[TRIAL] Ativado:', { code: trialCode, expires: new Date(expiresAt) });
    
  } catch (error) {
    console.error('Erro ao ativar trial:', error);
    showNotification('Erro', 'Erro ao ativar trial. Tente novamente.');
  }
}




/* =========================================================
   FUNÇÃO: processPayment
   PARA QUE SERVE:
   - Executa a lógica encapsulada em processPayment.
   ========================================================= */
async function processPayment(plan) {
  try {
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        plan: plan, 
        email: userData.email,
        name: userData.name,      // ← ADICIONA
        phone: userData.phone     // ← ADICIONA
      })
    });

    const { preferenceId } = await response.json();

    // Inicializa MP
    if (typeof mp === 'undefined') {
      window.mp = new MercadoPago('APP_USR-9e097327-7e68-41b4-be4b-382b6921803f');
    }

    // Marca que está aguardando pagamento
    sessionStorage.setItem('vf_awaiting_payment', 'true');

    // Abre checkout
    mp.checkout({
      preference: { id: preferenceId },
      autoOpen: true
    });

    // Auto-switch pra aba 3
    setTimeout(() => {
      const isAwaiting = sessionStorage.getItem('vf_awaiting_payment');
      if (isAwaiting === 'true') {
        switchTab(3);
        sessionStorage.removeItem('vf_awaiting_payment');
        showNotification('💳 Pagamento Processado', 'Digite o código que você recebeu por e-mail');
      }
    }, 3000);

  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    showNotification('Erro', 'Erro ao processar pagamento. Tente novamente.');
  }
}







// Ativar com código

/* =========================================================
   FUNÇÃO: activatePremiumWithCode
   PARA QUE SERVE:
   - Centraliza rotinas relacionadas a Premium em activatePremiumWithCode (estado, validação e sincronização de UI).
   ========================================================= */
async function activatePremiumWithCode() {
  const input = document.getElementById('premium-code-input');
  const code = input ? input.value.trim().toUpperCase() : '';
  
  if (!code) {
    showNotification('Aviso', 'Digite um código válido');
    return;
  }

  try {
    const response = await fetch('/api/validate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code: code,
        email: userData.email || 'unknown@email.com'
      })
    });

    const data = await response.json();

    if (!data.ok) {
      showNotification('Código Inválido', data.error || 'Código inválido ou expirado');
      return;
    }

    console.log('[ACTIVATE] Código validado:', data);

    // Ativa premium
    isPremium = true;
    premiumToken = data.token;
    premiumExpires = data.expiresAt;

    await storage.set('fit_premium', 'true');
    await storage.set('fit_premium_token', data.token);
    await storage.set('fit_premium_expires', data.expiresAt.toString());

    localStorage.setItem('fit_premium', 'true');
    localStorage.setItem('fit_premium_token', data.token);
    localStorage.setItem('fit_premium_expires', data.expiresAt.toString());

    if (window.RF && RF.premium && typeof RF.premium.setActive === 'function') {
      RF.premium.setActive(true);
    } else if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }

    updateUI();

    if (typeof window.updatePremiumButtons === 'function') {
      window.updatePremiumButtons();
    }

    _setupPremiumTimers();

    closePremiumModal();

    showNotification(
      'Premium Ativado! ',
      `Você tem acesso ilimitado por ${data.expiresInDays} dias!`
    );

    console.log('[PREMIUM] Ativado!', { 
      expires: new Date(data.expiresAt).toISOString() 
    });

  } catch (e) {
    console.error('Erro ao ativar premium:', e);
    showNotification('Erro', 'Erro ao validar código. Tente novamente.');
  }
}






// Abrir modal

/* =========================================================
   FUNÇÃO: openPremiumModal
   PARA QUE SERVE:
   - Abre/mostra a interface ou modal relacionado a openPremiumModal.
   ========================================================= */
function openPremiumModal(source, startTab) {
  const modal = document.getElementById('premium-modal');
  modal.classList.remove('hidden');
  
  // Previne scroll do body (importante no iOS)
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  
  // Auto-preenche se já cadastrou antes
  autoFillForm();
  
  // Sempre abre na aba 1
// Aba inicial (padrão: 1 - Cadastro)
const _startTab = Number.isFinite(Number(startTab)) ? Number(startTab) : 1;
switchTab(_startTab);
  
  console.log('[MODAL] Aberto de:', source);
}

// Fechar modal

/* =========================================================
   FUNÇÃO: closePremiumModal
   PARA QUE SERVE:
   - Fecha/esconde a interface ou modal relacionado a closePremiumModal.
   ========================================================= */
function closePremiumModal() {
  const modal = document.getElementById('premium-modal');
  modal.classList.add('hidden');
  
  // Restaura scroll do body
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}




// ===================================
// MÁSCARA DE TELEFONE
// ===================================

document.getElementById('user-phone')?.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
  
  if (value.length <= 11) {
    // Formato: (11) 99999-9999
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  } else {
    value = value.substring(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  }
  
  e.target.value = value;
});





// ===================================
// LISTENER - CARD
// ===================================


/* =========================================================
   FUNÇÃO: setupRecipeGridClickGuard
   PARA QUE SERVE:
   - Inicializa e configura a rotina setupRecipeGridClickGuard (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function setupRecipeGridClickGuard() {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;

  if (grid.dataset.clickGuardAttached === '1') return;
  grid.dataset.clickGuardAttached = '1';

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('[data-recipe-id]');
    if (!card) return;

    // ✅ impede qualquer outro onclick/bubbling de abrir receita
    e.preventDefault();
    e.stopPropagation();

    const id = String(card.getAttribute('data-recipe-id') || '');
    if (!id) return;

    // Premium: abre direto
    if (isPremium === true) {
      requestOpenRecipe(id);
      return;
    }

    // Se já desbloqueou "pra sempre": abre direto
    if (typeof isRecipeUnlocked === 'function' && isRecipeUnlocked(id)) {
      requestOpenRecipe(id);
      return;
    }

    // Créditos atuais
    const c = (typeof getCreditsSafe === 'function')
      ? getCreditsSafe()
      : (Number.isFinite(credits) ? credits : 0);

    // 1) Clico na receita e créditos > 0 -> abre popup de confirmação
    if (c > 0) {
      if (typeof window.openConfirmCreditModal === 'function') {
        window.openConfirmCreditModal(id);
      }
      return; // ✅ NÃO abre receita aqui
    }

    // 6) Clico na receita e créditos <= 0 -> abre premium
    if (typeof window.openPremium === 'function') {
      window.openPremium('no-credits');
    } else if (typeof window.openPremiumModal === 'function') {
      window.openPremiumModal('no-credits');
    }
  });
}






// Estado dos filtros
let activeFilters = {
    maxTime: 120,
    minProtein: 0,
    maxCalories: 1000,
    dietary: {},
    objectives: []
};


// Toggle painel de filtros
window.toggleFilters = function() {
    const panel = document.getElementById('filters-panel');
    if (!panel) return;

    const willOpen = panel.classList.contains('hidden');

    // ✅ Se vai abrir os filtros, fecha ingredientes antes
    if (willOpen && typeof window.closeIngredientPanel === 'function') {
        window.closeIngredientPanel();
    }

    panel.classList.toggle('hidden');

    // Renderiza ícones Lucide
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 100);
    }
};





// =========================================================
// CONTROLE DE PAINÉIS (Ingredientes x Filtros)
// - Garante que apenas 1 painel fica aberto por vez
// =========================================================

window.closeIngredientPanel = function() {
  const toggle = document.getElementById('rfIngToggle');
  const panel = document.getElementById('rfIngPanel');

  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  if (panel) panel.classList.add('hidden');
};

window.closeAdvancedFiltersPanel = function() {
  const panel = document.getElementById('filters-panel');
  if (panel) panel.classList.add('hidden');
};





// Atualizar valores dos sliders
window.updateFilterValue = function(type, value) {
    const displayEl = document.getElementById(`${type}-value`);
    if (displayEl) {
        displayEl.textContent = value;
    }
    
    // Atualiza gradiente do slider
    const slider = document.getElementById(`filter-${type}`);
    if (slider) {
        const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #16a34a 0%, #16a34a ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
    }
    
    // Salva no estado
    if (type === 'time') activeFilters.maxTime = parseInt(value);
    if (type === 'protein') activeFilters.minProtein = parseInt(value);
    if (type === 'calories') activeFilters.maxCalories = parseInt(value);
};



// Limpar filtros (UNIFICADO: advancedFilters + renderRecipes)
window.clearFilters = function() {
    // 1) Chips: desmarca tudo
    document.querySelectorAll('#filters-panel .rf-chip.is-active').forEach(chip => {
        chip.classList.remove('is-active');
    });

    // 2) Sliders: volta para "não filtrar"
    const elTime = document.getElementById('filter-time');
    const elProt = document.getElementById('filter-protein');
    const elCal  = document.getElementById('filter-calories');

    if (elTime) elTime.value = elTime.max || 120;
    if (elCal)  elCal.value  = elCal.max  || 1000;
    if (elProt) elProt.value = elProt.min || 0;

    // Atualiza labels numéricas
    if (typeof updateFilterValue === 'function') {
        if (elTime) updateFilterValue('time', elTime.value);
        if (elProt) updateFilterValue('protein', elProt.value);
        if (elCal)  updateFilterValue('calories', elCal.value);
    }

    // 3) Estado do motor principal
    window.advancedFilters = { maxCalories: null, minProtein: null, maxTime: null };

    // 4) Renderiza usando o motor real
    if (typeof renderRecipes === 'function') {
        renderRecipes();
    }

    // 5) Badge (se existir)
    if (typeof updateFiltersBadge === 'function') {
        updateFiltersBadge();
    }

    // 6) ✅ FECHA OS DOIS BOXES após limpar
    if (typeof window.closeIngredientPanel === 'function') {
        window.closeIngredientPanel();
    }
    if (typeof window.closeAdvancedFiltersPanel === 'function') {
        window.closeAdvancedFiltersPanel();
    }
};



// Aplicar filtros (UNIFICADO: advancedFilters + renderRecipes)
window.applyFilters = function () {
  const maxTime = parseInt(document.getElementById('filter-time')?.value || '120', 10);
  const minProtein = parseInt(document.getElementById('filter-protein')?.value || '0', 10);
  const maxCalories = parseInt(document.getElementById('filter-calories')?.value || '1000', 10);

  // ✅ Fonte única (o renderRecipes usa advancedFilters)
  advancedFilters = {
    maxTime: Number.isFinite(maxTime) ? maxTime : null,
    minProtein: Number.isFinite(minProtein) ? minProtein : null,
    maxCalories: Number.isFinite(maxCalories) ? maxCalories : null
  };

  // ✅ Render pelo motor único (categoria + texto + ingredientes + avançados)
  renderRecipes();

  if (typeof updateFiltersBadge === 'function') updateFiltersBadge();
};



// Renderizar receitas filtradas

/* =========================================================
   FUNÇÃO: renderFilteredRecipes
   PARA QUE SERVE:
   - Renderiza/atualiza a UI relacionada a renderFilteredRecipes com base no estado atual do app.
   ========================================================= */
function renderFilteredRecipes(recipes) {
    if (!recipeGrid) return;
    
    if (recipes.length === 0) {
        recipeGrid.innerHTML = `
  <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
  <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
  <h3 style="font-size: 1.25rem; color: #374151; margin-bottom: 0.5rem;">
  Nenhuma receita encontrada
  </h3>
  <p style="color: #6b7280;">
  Tente ajustar os filtros ou fazer uma busca diferente
  </p>
  <button onclick="clearFilters()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #16a34a; color: white; border: none; border-radius: 8px; cursor: pointer;">
  Limpar Filtros
  </button>
  </div>
  `;
        return;
    }
    
    // Usa a função de render existente, mas com lista filtrada
    const originalRecipes = window.allRecipes;
    window.allRecipes = recipes;
    renderRecipes(); // sua função existente
    window.allRecipes = originalRecipes;
}




/* =========================================================
   FUNÇÃO: updateFiltersBadge
   PARA QUE SERVE:
   - Executa a lógica encapsulada em updateFiltersBadge.
   ========================================================= */
function updateFiltersBadge() {
    let count = 0;

    // Conta sliders ativos pelo motor REAL (advancedFilters)
    const f = window.advancedFilters || {};
    if (Number.isFinite(f.maxTime)) count++;
    if (Number.isFinite(f.minProtein)) count++;
    if (Number.isFinite(f.maxCalories)) count++;

    // Conta chips ativos (tags/objetivos/restrições)
    const chipsActive = document.querySelectorAll('#filters-panel .rf-chip.is-active').length;
    count += chipsActive;

    // ✅ IMPORTANTE: badge deve ir no botão "Filtros", não no de ingredientes
    const toggleBtn =
        document.getElementById('rfAdvToggle') ||
        document.querySelector('.rf-filter-row .filters-toggle[onclick*="toggleFilters"]') ||
        (document.querySelectorAll('.rf-filter-row .filters-toggle')[1] || null);

    if (!toggleBtn) return;

    let badge = toggleBtn.querySelector('.filters-active-badge');

    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'filters-active-badge';
            toggleBtn.appendChild(badge);
        }
        badge.textContent = String(count);
    } else if (badge) {
        badge.remove();
    }
}




// Inicializar sliders ao carregar
window.addEventListener('DOMContentLoaded', function() {
    // Inicializa gradientes dos sliders
    ['time', 'protein', 'calories'].forEach(type => {
        const slider = document.getElementById(`filter-${type}`);
        if (slider) {
            updateFilterValue(type, slider.value);
        }
    });
});



// Atalho: usa o motor oficial já ligado no input (searchInput.addEventListener('input', ...))

/* =========================================================
   FUNÇÃO: filterRecipes
   PARA QUE SERVE:
   - Executa uma etapa do fluxo de receitas (seleção/abertura/renderização) em filterRecipes.
   ========================================================= */
function filterRecipes(query) {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.value = String(query || '');
  input.dispatchEvent(new Event('input', { bubbles: true }));
}




/* =========================================================
   FUNÇÃO: setupAdvancedFiltersAutoApply
   PARA QUE SERVE:
   - Inicializa e configura a rotina setupAdvancedFiltersAutoApply (eventos, estado e elementos de UI relacionados).
   ========================================================= */
function setupAdvancedFiltersAutoApply() {
  const panel = document.getElementById('filters-panel');
  if (!panel) return;

  // evita duplicar listener
  if (panel.__rfAutoApplyBound) return;
  panel.__rfAutoApplyBound = true;

  // 1) Chips: clique = aplica
  panel.addEventListener('click', function (e) {
    const chip = e.target.closest('.rf-chip');
    if (!chip) return;

    // toggle visual (se já existir em outro lugar, não tem problema)
    chip.classList.toggle('is-active');

    // aplica imediatamente (usa sua applyFilters atual)
    if (typeof window.applyFilters === 'function') {
      window.applyFilters();
    }
  });

  // 2) Sliders: mexeu = aplica
  const ids = ['filter-time', 'filter-protein', 'filter-calories'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', function () {
      // atualiza label numérica (se existir)
      if (typeof updateFilterValue === 'function') {
        if (id === 'filter-time') updateFilterValue('time', this.value);
        if (id === 'filter-protein') updateFilterValue('protein', this.value);
        if (id === 'filter-calories') updateFilterValue('calories', this.value);
      }
      if (typeof window.applyFilters === 'function') {
        window.applyFilters();
      }
    });
  });
}
