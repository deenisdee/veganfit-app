// ============================================
// ARQUIVO: js/app.js 
// ============================================


// ==============================
// MERCADO PAGO (INICIALIZAÇÃO ÚNICA + FALLBACK)
// - Requer no HTML: <script src="https://sdk.mercadopago.com/js/v2"></script> ANTES do app.js
// - Mantém uma instância global em window.mp
// ==============================
const MP_PUBLIC_KEY = 'APP_USR-9a3547c8-2f6d-4cde-b502-027d0e817746';

function ensureMercadoPagoInstance() {
  try {
    if (window.mp && typeof window.mp.checkout === 'function') return true;
    if (typeof MercadoPago === 'undefined') return false;
    window.mp = new MercadoPago(MP_PUBLIC_KEY, { locale: 'pt-BR' });
    return !!(window.mp && typeof window.mp.checkout === 'function');
  } catch (e) {
    console.warn('[MP] Falha ao inicializar SDK:', e);
    return false;
  }
}


function getStoredCheckoutEmail() {
  try {
    return normalizeEmailForLookup(
      localStorage.getItem('vf_checkout_email') ||
      localStorage.getItem('vf_user_email') ||
      localStorage.getItem('premium_email') ||
      ''
    );
  } catch (_) {
    return '';
  }
}

function persistCheckoutEmail(email) {
  const normalized = normalizeEmailForLookup(email);
  if (!normalized || !normalized.includes('@')) return '';

  try { localStorage.setItem('vf_checkout_email', normalized); } catch (_) {}
  try { localStorage.setItem('vf_user_email', normalized); } catch (_) {}
  try { localStorage.setItem('premium_email', normalized); } catch (_) {}
  return normalized;
}

function getCheckoutStartedAt() {
  try {
    return parseInt(localStorage.getItem('vf_checkout_started_at') || '0', 10) || 0;
  } catch (_) {
    return 0;
  }
}

function isCheckoutPendingRecent(maxAgeMs) {
  const startedAt = getCheckoutStartedAt();
  if (!startedAt) return false;
  return (Date.now() - startedAt) <= (maxAgeMs || (45 * 60 * 1000));
}

function isPremiumAccessActive() {
  try {
    if (typeof isPremiumValidNow === 'function') return !!isPremiumValidNow();
  } catch (_) {}

  try {
    if (window.RF && RF.premium && typeof RF.premium.isActive === 'function') {
      return !!RF.premium.isActive();
    }
  } catch (_) {}

  return isPremium === true;
}

function openMpCheckoutWithFallback(preferenceId, initPoint) {
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

  try {
    console.log('[MP] openMpCheckoutWithFallback()', {
      isMobile,
      preferenceId,
      hasInitPoint: !!initPoint,
      initPointPreview: initPoint ? String(initPoint).slice(0, 60) + '...' : '',
    });
  } catch (_) {}

  if (isMobile) {
    if (initPoint) {
      window.location.href = initPoint;
      return true;
    }
    console.warn('[MP] Mobile detectado, mas initPoint está vazio. Checkout não pode abrir.');
    if (typeof showNotification === 'function') {
      showNotification('⚠️ Não foi possível abrir o pagamento', 'Tente novamente em alguns segundos.');
    }
    return false;
  }

  const canUseModal = ensureMercadoPagoInstance() && preferenceId;

  if (canUseModal) {
    try {
      window.mp.checkout({
        preference: { id: preferenceId },
        autoOpen: true,
      });

      setTimeout(() => {
        const hasMpIframe = !!document.querySelector('iframe[src*="mercadopago"]');
        if (!hasMpIframe && initPoint) {
          console.warn('[MP] Modal não renderizou. Fazendo redirect para initPoint...');
          window.location.href = initPoint;
        }
      }, 700);

      return true;
    } catch (e) {
      console.warn('[MP] Falha ao abrir modal, usando redirect:', e);
    }
  }

  if (initPoint) {
    window.location.href = initPoint;
    return true;
  }

  console.warn('[MP] Sem initPoint. Nada a fazer.');
  return false;
}


// ==============================
// BOOT LOADER (barra fina estilo YouTube)
// ==============================
(function bootLoaderInit() {
  try {
    document.documentElement.classList.add('rf-ui-booting');

    if (!document.getElementById('rf-boot-loader-style')) {
      const style = document.createElement('style');
      style.id = 'rf-boot-loader-style';
      style.textContent = `
        html.rf-ui-booting #credits-badge,
        html.rf-ui-booting #premium-btn,
        html.rf-ui-booting #premium-badge,
        html.rf-ui-booting [data-premium-badge],
        html.rf-badge-lock #credits-badge,
        html.rf-badge-lock #premium-btn,
        html.rf-badge-lock #premium-badge,
        html.rf-badge-lock [data-premium-badge] {
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        #rf-boot-loader {
          position: fixed;
          inset: 0 auto auto 0;
          width: 100%;
          height: 4px;
          z-index: 99999;
          pointer-events: none;
          opacity: 1;
          transition: transform 10.5s ease-out;
          background: transparent;
        }

        #rf-boot-loader.hidden {
          opacity: 0;
        }

        #rf-boot-loader .rf-boot-bar {
          width: 100%;
          height: 100%;
          transform-origin: left center;
          transform: scaleX(0);
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 45%, #93c5fd 100%);
          box-shadow: 0 0 10px rgba(59,130,246,.45);
          transition: transform 10.5s ease-out;
          will-change: transform;
        }
      `;
      document.head.appendChild(style);
    }

    const loader = {
      el: null,
      bar: null,
      progress: 0,
      done: false,
      timer: null,
      ensure() {
        if (this.el) return;
        if (!document.body) return;
        const wrap = document.createElement('div');
        wrap.id = 'rf-boot-loader';
        wrap.setAttribute('aria-hidden', 'true');

        const bar = document.createElement('div');
        bar.className = 'rf-boot-bar';
        wrap.appendChild(bar);

        document.body.appendChild(wrap);
        this.el = wrap;
        this.bar = bar;
        this.set(0.08);
      },
      set(value) {
        this.ensure();
        if (!this.bar || this.done) return;
        const next = Math.max(this.progress, Math.min(value, 0.94));
        this.progress = next;
        this.bar.style.transform = `scaleX(${next})`;
      },
      trickle() {
        if (this.done) return;
        this.ensure();
        const tick = () => {
          if (this.done) return;
          const p = this.progress;
          let inc = 0.0;
          if (p < 0.25) inc = 0.12;
          else if (p < 0.55) inc = 0.08;
          else if (p < 0.8) inc = 0.04;
          else if (p < 0.9) inc = 0.015;
          else inc = 0.006;
          this.set(p + inc);
          this.timer = window.setTimeout(tick, 180 + Math.round(Math.random() * 140));
        };
        tick();
      },
      finish() {
        if (this.done) return;
        this.done = true;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.ensure();
        if (this.bar) {
          this.bar.style.transition = 'transform .18s ease-out';
          this.bar.style.transform = 'scaleX(1)';
        }
        window.setTimeout(() => {
          try { document.documentElement.classList.remove('rf-ui-booting'); } catch (_) {}
          if (this.el) this.el.classList.add('hidden');
        }, 170);
        window.setTimeout(() => {
          if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
          this.el = null;
          this.bar = null;
        }, 460);
      }
    };

    window.__rfBootLoader = loader;

    if (!window.__rfBadgeBoot) {
      const startedAt = Date.now();
      document.documentElement.classList.add('rf-badge-lock');
      window.__rfBadgeBoot = {
        unlocked: false,
        startedAt,
        unlock: function(forceDelayMs) {
          if (this.unlocked) return;
          const delayMs = Math.max(0, Number.isFinite(forceDelayMs) ? forceDelayMs : 0);
          const elapsed = Date.now() - this.startedAt;
          const waitMs = Math.max(delayMs, 1200 - elapsed);
          setTimeout(() => {
            if (this.unlocked) return;
            this.unlocked = true;
            document.documentElement.classList.remove('rf-badge-lock');
            try {
              const btn = document.getElementById('premium-btn');
              const badge = document.getElementById('credits-badge');
              const pbadge = document.getElementById('premium-badge') || document.querySelector('[data-premium-badge]');
              if (badge) badge.style.opacity = '';
              if (btn) btn.style.opacity = '';
              if (pbadge) pbadge.style.opacity = '';
            } catch (_) {}
          }, waitMs);
        }
      };
      window.__rfUnlockBadgesNow = function(forceDelayMs) {
        try { window.__rfBadgeBoot && window.__rfBadgeBoot.unlock(forceDelayMs); } catch (_) {}
      };
    }

    const begin = () => {
      try {
        loader.ensure();
        loader.trickle();
      } catch (_) {}
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', begin, { once: true });
    } else {
      begin();
    }
  } catch (_) {}
})();


// ===================================
// DETECÇÃO DE RETORNO DO MERCADO PAGO
// ===================================

window.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);

  const returnType = urlParams.get('return');
  const openPremium = urlParams.get('openPremium');
  const tabParam = urlParams.get('tab');
  const emailParam = normalizeEmailForLookup(urlParams.get('email') || '');
  const autoValidate = urlParams.get('autovalidate');
  const shouldOpenValidationTab = (openPremium === '1' || tabParam === '3');
  const shouldAutoValidate = (returnType === 'success' && autoValidate === '1' && !!emailParam);

  if (returnType || openPremium || tabParam || emailParam || autoValidate) {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  if (emailParam) {
    persistCheckoutEmail(emailParam);
  }

  if (returnType) {
    setTimeout(async () => {
      if (returnType === 'success') {
        showNotification('✅ Pagamento aprovado!', 'Validando seu Premium automaticamente…');

        const email =
          emailParam ||
          getStoredCheckoutEmail() ||
          (typeof userData === 'object' ? normalizeEmailForLookup(userData.email || '') : '') ||
          '';

        if (email && email.includes('@')) {
          persistCheckoutEmail(email);
          const result = await syncPremiumFromBackend(email, {
            closeModal: false,
            successToast: true,
            failToast: false,
            errorToast: false,
            reloadOnSuccess: true
          });

          if (!result || !result.premium) {
            await autoRecoverPremiumAfterCheckout({
              email: email,
              retries: 10,
              intervalMs: 2500,
              successToast: true,
              reloadOnSuccess: true,
              closeModal: false
            });
          }
        } else {
          showNotification('✅ Pagamento aprovado!', 'Abra o Premium e digite o e-mail usado no pagamento para validar.');
        }
      } else if (returnType === 'pending') {
        sanitizeSuspiciousPaidPremium('mp-return-pending');
        showNotification('⏳ Pagamento em análise', 'Assim que o pagamento for aprovado, o Premium será ativado automaticamente.');
        await autoRecoverPremiumAfterCheckout({
          email: emailParam || getStoredCheckoutEmail(),
          retries: 12,
          intervalMs: 2500,
          successToast: true,
          reloadOnSuccess: true,
          closeModal: false
        });
      } else {
        clearCheckoutPendingState();
        sanitizeSuspiciousPaidPremium('mp-return-failure');
        showNotification('❌ Pagamento não aprovado', 'Tente novamente ou use outro método de pagamento.');
      }
    }, 500);
  }

  if (!returnType && !isPremiumAccessActive()) {
    setTimeout(async () => {
      await autoRecoverPremiumAfterCheckout({
        email: emailParam || getStoredCheckoutEmail(),
        retries: 8,
        intervalMs: 2500,
        successToast: true,
        reloadOnSuccess: true,
        closeModal: false
      });
    }, 900);
  }

  if (shouldOpenValidationTab) {
    setTimeout(async () => {
      openPremiumModal('email-link');
      switchTab(3);

      ensurePremiumEmailValidationUI();

      const fallbackEmail = emailParam || getStoredCheckoutEmail();
      if (fallbackEmail) {
        const inp = document.getElementById('premium-email-input');
        if (inp) inp.value = fallbackEmail;
      }

      if (shouldAutoValidate) {
        await activatePremium();
      }
    }, 350);
  }
});


// ============================================
// PROTEÇÃO ANTI-BURLA (comentada / V2)
// ============================================
/* ... mantida como estava ... */


// setupIngredientDropdown()
function setupIngredientDropdown() {
  const toggle = document.getElementById('rfIngToggle');
  const panel = document.getElementById('rfIngPanel');
  const grid = document.getElementById('rfIngGrid');
  const btnClear = document.getElementById('rfIngClear');

  if (!toggle || !panel || !grid || !btnClear) return;

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

  function renderChips(items) {
    function pickIcon(label) {
      const t = String(label || '').toLowerCase();
      if (t.includes('banana')) return 'banana';
      if (t.includes('maca') || t.includes('maçã')) return 'apple';
      if (t.includes('limao') || t.includes('limão') || t.includes('laranja')) return 'citrus';
      if (t.includes('morango')) return 'cherry';
      if (t.includes('uva')) return 'grape';
      if (t.includes('abacate')) return 'avocado';
      if (t.includes('abacaxi')) return 'sparkles';
      if (t.includes('cenoura')) return 'carrot';
      if (t.includes('tomate')) return 'tomato';
      if (t.includes('cebola')) return 'onion';
      if (t.includes('alho')) return 'garlic';
      if (t.includes('abobora') || t.includes('abóbora')) return 'pumpkin';
      if (t.includes('cogumelo') || t.includes('champignon')) return 'mushroom';
      if (t.includes('espinafre') || t.includes('alface') || t.includes('couve') || t.includes('brocolis') || t.includes('brócolis')) return 'leaf';
      if (t.includes('arroz') || t.includes('aveia') || t.includes('farinha')) return 'wheat';
      if (t.includes('tofu')) return 'cube';
      if (t.includes('grao de bico') || t.includes('grão de bico') || t.includes('feijao') || t.includes('feijão') || t.includes('lentilha')) return 'bean';
      if (t.includes('agua') || t.includes('água')) return 'droplets';
      if (t.includes('leite')) return 'milk';
      if (t.includes('azeite') || t.includes('oleo') || t.includes('óleo')) return 'droplet';
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

  function toggleChip(label) {
    if (selected.has(label)) selected.delete(label);
    else selected.add(label);
  }

  function setOpen(isOpen) {
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) panel.classList.remove('hidden');
    else panel.classList.add('hidden');
  }

  function applySelectionAuto() {
    const input = getSearchInput();
    const list = Array.from(selected);

    if (!input) return;

    if (list.length === 0) input.value = '';
    else input.value = `ing: ${list.join(', ')}`;

    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

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
    setOpen(false);
  });
}


// =====================================
// HERO SLIDER (drag/snap + click)
// =====================================
function setupHeroSliderDrag() {
  const track = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('sliderDots');
  if (!track) return;

  if (track.dataset.dragReady === '1') return;
  track.dataset.dragReady = '1';

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;
  let moved = false;

  const DRAG_THRESHOLD_PX = 10;
  const SNAP_THRESHOLD_RATIO = 0.18;

  function slides() {
    return Array.from(track.children || []);
  }

  function slideWidth() {
    const s = slides();
    if (!s.length) return 0;
    const rect = s[0].getBoundingClientRect();
    return rect.width || 0;
  }

  function clampIndex(i) {
    const max = Math.max(0, slides().length - 1);
    return Math.min(max, Math.max(0, i));
  }

  function setTranslate(x) {
    track.style.transform = `translate3d(${x}px,0,0)`;
  }

  function goto(i, animate = true) {
    index = clampIndex(i);
    const w = slideWidth();
    const x = -index * w;

    track.style.transition = animate ? 'transform 260ms ease' : 'none';
    setTranslate(x);

    updateDots();
  }

  function updateDots() {
    if (!dotsEl) return;
    const s = slides();
    dotsEl.innerHTML = s.map((_, i) => `
      <button class="slider-dot ${i === index ? 'active' : ''}" type="button" aria-label="Slide ${i + 1}"></button>
    `).join('');

    Array.from(dotsEl.querySelectorAll('.slider-dot')).forEach((btn, i) => {
      btn.addEventListener('click', () => goto(i, true));
    });
  }

  function onResize() {
    goto(index, false);
  }

  track.addEventListener('click', (e) => {
    if (moved) return;
    const slide = e.target.closest?.('[data-recipe-id]');
    if (!slide) return;

    const id = slide.getAttribute('data-recipe-id');
    if (!id) return;

    if (typeof requestOpenRecipe === 'function') {
      requestOpenRecipe(String(id));
    } else if (typeof renderRecipeDetail === 'function') {
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

  track.addEventListener('pointerdown', (e) => {
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

  function endDrag() {
    if (!dragging) return;
    dragging = false;

    const dx = currentX - startX;
    const w = slideWidth();

    const ratio = w ? Math.abs(dx) / w : 0;
    if (ratio > SNAP_THRESHOLD_RATIO) {
      if (dx < 0) goto(index + 1, true);
      else goto(index - 1, true);
    } else {
      goto(index, true);
    }

    setTimeout(() => { moved = false; }, 0);
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', onResize);

  goto(0, false);
}

function heroSliderNext() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  const total = track.children?.length || 0;
  const cur = Number(track.dataset.heroIndex || '0');
  const next = Math.min(total - 1, cur + 1);
  track.dataset.heroIndex = String(next);
}

function heroSliderPrev() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  const cur = Number(track.dataset.heroIndex || '0');
  const prev = Math.max(0, cur - 1);
  track.dataset.heroIndex = String(prev);
}


// ============================================
// Premium – estado único (com validade) + sync de UI
// ============================================
window.RF = window.RF || {};

function syncPremiumFromCore() {
  try {
    const valid = (typeof isPremiumValidNow === 'function')
      ? isPremiumValidNow()
      : (localStorage.getItem('fit_premium') === 'true');

    isPremium = valid === true;

    if (!isPremium) {
      premiumToken = null;
      premiumExpires = null;
    } else {
      if (typeof getPremiumExpiresFromStorage === 'function') {
        const exp = getPremiumExpiresFromStorage();
        if (exp && Number.isFinite(exp)) premiumExpires = exp;
      }
    }

    if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }
  } catch (e) {
    console.warn('[syncPremiumFromCore] Falha ao sincronizar:', e);
  }
}


// =======================================================
// PREMIUM - FONTE DA VERDADE = BACKEND (premium_users)
// =======================================================

function ensurePremiumEmailValidationUI() {
  const tab3 = document.getElementById('tab-3');
  if (!tab3) return;

  const codeInput = document.getElementById('premium-code-input');
  if (codeInput) {
    const wrap = codeInput.closest('.premium-field') || codeInput.parentElement;
    if (wrap) wrap.style.display = 'none';
    codeInput.style.display = 'none';
  }

  if (!document.getElementById('premium-email-input')) {
    const box = document.createElement('div');
    box.className = 'premium-email-validate';
    box.style.marginTop = '10px';

    box.innerHTML = `
      <div style="font-size:15px; opacity:0.9; margin-bottom:8px;">
        Digite o <strong>e-mail usado no pagamento</strong> para validar seu Premium:
      </div>
      <input id="premium-email-input" type="email" placeholder="seuemail@exemplo.com"
        style="width:100%; padding:12px 14px; border-radius:12px; border:1px solid rgba(0,0,0,.12); outline:none; font-size:14px;"/>
      <button id="premium-validate-email-btn" type="button"
        style="margin-top:10px; height: 47px; font-size: 16px; width:100%; padding:12px 14px; color:#fff; font-family: inherit; background:#16a34a; border-radius:12px; border:none; font-weight: 700; cursor:pointer;">
        VALIDAR PREMIUM
      </button>
    `;

    tab3.appendChild(box);

    const btn = box.querySelector('#premium-validate-email-btn');
    if (btn && !btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        activatePremium();
      });
    }
  }
}

function setPremiumLocalState(expiresAt, plan, source) {
  isPremium = true;
  premiumExpires = Number(expiresAt || 0) || null;
  premiumToken = null;

  try {
    setPremiumSource(source || 'backend');
    localStorage.setItem('fit_premium', 'true');
    localStorage.setItem('fit_premium_expires', premiumExpires ? String(premiumExpires) : '');
    localStorage.setItem('fit_premium_token', '');
    localStorage.setItem('fit_premium_plan', String(plan || '').trim().toLowerCase());
  } catch (_) {}

  try {
    if (window.RF?.premium?.setActive) window.RF.premium.setActive(true);
  } catch (_) {}

  syncPremiumFromCore();

  try { if (typeof updateUI === 'function') updateUI(); } catch (_) {}
  try { if (typeof renderRecipes === 'function') renderRecipes(); } catch (_) {}
}

function clearPremiumLocalState() {
  try {
    if (typeof clearPremiumState === 'function') {
      clearPremiumState();
      try { if (typeof updateUI === 'function') updateUI(); } catch (_) {}
      try { if (typeof renderRecipes === 'function') renderRecipes(); } catch (_) {}
      return;
    }
  } catch (_) {}

  try {
    localStorage.setItem('fit_premium', 'false');
    localStorage.setItem('fit_premium_expires', '');
    localStorage.setItem('fit_premium_token', '');
    localStorage.removeItem('fit_premium_source');
  } catch (_) {}

  isPremium = false;
  premiumToken = null;
  premiumExpires = null;

  syncPremiumFromCore();

  try { if (typeof updateUI === 'function') updateUI(); } catch (_) {}
  try { if (typeof renderRecipes === 'function') renderRecipes(); } catch (_) {}
}

function normalizeEmailForLookup(email) {
  let e = String(email || '').trim().toLowerCase();
  e = e.replace(/\s+/g, '+');
  e = e.replace(/%2b/gi, '+');
  return e;
}

function getPremiumSource() {
  try {
    return String(localStorage.getItem('fit_premium_source') || '').trim().toLowerCase();
  } catch (_) {
    return '';
  }
}

function setPremiumSource(source) {
  try {
    if (source) localStorage.setItem('fit_premium_source', String(source).trim().toLowerCase());
    else localStorage.removeItem('fit_premium_source');
  } catch (_) {}
}

function clearCheckoutPendingState() {
  try {
    localStorage.removeItem('vf_checkout_pending');
    localStorage.removeItem('vf_checkout_plan');
    localStorage.removeItem('vf_checkout_started_at');
    localStorage.removeItem('vf_checkout_email');
  } catch (_) {}
}

function markCheckoutPending(plan) {
  try {
    localStorage.setItem('vf_checkout_pending', '1');
    localStorage.setItem('vf_checkout_plan', String(plan || '').trim().toLowerCase());
    localStorage.setItem('vf_checkout_started_at', String(Date.now()));
    if (userData && userData.email) persistCheckoutEmail(userData.email);
  } catch (_) {}
}

function hasPendingCheckout() {
  try {
    return localStorage.getItem('vf_checkout_pending') === '1';
  } catch (_) {
    return false;
  }
}

function sanitizeSuspiciousPaidPremium(reason) {
  try {
    const source = getPremiumSource();
    const flag = localStorage.getItem('fit_premium') === 'true';
    const token = String(localStorage.getItem('fit_premium_token') || '').trim();
    const exp = parseInt(localStorage.getItem('fit_premium_expires') || '0', 10);

    const isValidByTime = !!(flag && exp > 0 && Date.now() < exp);
    const isTrialLike = source === 'trial' || /^TRIAL-/i.test(token);
    const isCodeLike = source === 'code' && token.length > 0;
    const isBackendPaid = source === 'backend';

    if ((isTrialLike || isCodeLike || isBackendPaid) && isValidByTime) return;

    if (flag) {
      console.warn('[PREMIUM] Limpando estado local suspeito:', reason || 'unknown');
      clearPremiumLocalState();
    }
  } catch (err) {
    console.warn('[PREMIUM] Falha ao sanitizar estado local:', err);
  }
}

async function syncPremiumFromBackend(email, opts) {
  const options = opts || {};
  const normalized = normalizeEmailForLookup(email);

  if (!normalized || !normalized.includes('@')) return { ok: false, error: 'email inválido' };

  try {
    const res = await fetch('/api/premium-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalized })
    });

    const data = await res.json();

    if (data?.ok && data?.premium === true) {
      setPremiumLocalState(data.expiresAt, data.plan || 'monthly', 'backend');
      clearCheckoutPendingState();
      try { updateGreeting(); } catch (_) {}

      if (options.reloadOnSuccess) {
        setTimeout(() => {
          try { window.location.reload(); } catch (_) {}
        }, 600);
      }

      if (options.successToast) {
        showNotification('✅ Premium ativado!', 'Seu acesso já está liberado.');
      }

      if (options.closeModal !== false) {
        try { closePremiumModal(); } catch (_) {}
      }

      return { ok: true, premium: true, expiresAt: data.expiresAt, plan: data.plan };
    }

    // ✅ CORREÇÃO CRÍTICA:
    // Quando o localStorage está completamente limpo (outro dispositivo, cache limpo),
    // o backend retorna premium: false apenas se o e-mail não existe OU se realmente expirou.
    // NÃO chamamos clearPremiumLocalState() aqui para não interferir com um estado
    // que pode ser válido e ainda não ter sido carregado (race condition no boot).
    // A limpeza só acontece se o usuário está com premium ativo localmente
    // mas o backend diz que não tem — ou seja, estado inconsistente real.
    const localPremiumActive = localStorage.getItem('fit_premium') === 'true';
    if (localPremiumActive) {
      // Só limpa se o local diz "sim" mas o backend diz "não" (inconsistência real)
      clearPremiumLocalState();
    }
    // Se local está limpo e backend diz "não premium", simplesmente não faz nada.
    // O usuário pode ter digitado um e-mail errado — não alteramos o estado.

    if (options.failToast) {
      showNotification('⚠️ Não encontrado', 'Não localizamos um Premium ativo para este e-mail.');
    }

    return { ok: true, premium: false };
  } catch (err) {
    console.warn('[PREMIUM] Falha ao sincronizar backend:', err);
    if (options.errorToast) {
      showNotification('Erro', 'Falha ao validar Premium. Tente novamente.');
    }
    return { ok: false, error: String(err?.message || err) };
  }
}


async function autoRecoverPremiumAfterCheckout(opts) {
  const options = opts || {};
  const email = normalizeEmailForLookup(options.email || getStoredCheckoutEmail() || '');

  // ✅ CORREÇÃO: Com localStorage limpo, hasPendingCheckout() e isCheckoutPendingRecent()
  // retornam false, bloqueando a recuperação. Permitimos a tentativa se o e-mail foi
  // fornecido explicitamente (chamada direta de activatePremium via Aba 3).
  const hasEmail = !!email && email.includes('@');
  const shouldTry = hasEmail && (
    hasPendingCheckout() ||
    isCheckoutPendingRecent(options.maxAgeMs || (45 * 60 * 1000)) ||
    !!options.forceIfEmail  // ✅ novo flag para forçar mesmo sem checkout pendente
  );

  if (!shouldTry) return { ok: false, skipped: true };
  if (isPremiumAccessActive()) {
    clearCheckoutPendingState();
    return { ok: true, premium: true, alreadyActive: true };
  }

  const tries = Math.max(1, parseInt(options.retries || 8, 10));
  const intervalMs = Math.max(800, parseInt(options.intervalMs || 2500, 10));

  for (let attempt = 1; attempt <= tries; attempt++) {
    const result = await syncPremiumFromBackend(email, {
      closeModal: options.closeModal,
      successToast: attempt === 1 ? !!options.successToast : false,
      failToast: false,
      errorToast: false,
      reloadOnSuccess: !!options.reloadOnSuccess
    });

    if (result && result.premium) {
      if (options.openModalOnSuccess) {
        try {
          openPremiumModal('auto-recovery');
          switchTab(3);
          ensurePremiumEmailValidationUI();
          const inp = document.getElementById('premium-email-input');
          if (inp) inp.value = email;
        } catch (_) {}
      }
      return { ok: true, premium: true, attempt: attempt };
    }

    if (attempt < tries) {
      await new Promise(function(resolve) { setTimeout(resolve, intervalMs); });
    }
  }

  return { ok: true, premium: false };
}

RF.premium = {
  isActive: function () {
    try {
      if (typeof isPremiumValidNow === 'function') return isPremiumValidNow();
      return localStorage.getItem('fit_premium') === 'true';
    } catch (_) {
      return false;
    }
  },

  setActive: function (active) {
    try {
      if (!active) {
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
        localStorage.setItem('fit_premium', 'true');
      }
    } catch (_) {}

    syncPremiumFromCore();
  },

  syncUI: function () {
    const active = RF.premium.isActive();

    document.body.classList.toggle('premium-active', active);

    const headerBtn = document.getElementById('premium-btn');

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
        const bootLocked = document.documentElement.classList.contains('rf-ui-booting') ||
          document.documentElement.classList.contains('rf-badge-lock');
        headerBtn.style.opacity = bootLocked ? '0' : '1';
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

    const tabPremium = document.querySelectorAll('.tab-bar .tab-premium');
    tabPremium.forEach(function (el) {
      el.dataset.premiumActive = active ? 'true' : 'false';
    });

    const hambPremium = document.querySelectorAll('.hamburger-premium-btn');
    hambPremium.forEach(function (el) {
      el.dataset.premiumActive = active ? 'true' : 'false';
    });

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

    if (typeof window.syncPremiumTour === 'function') {
      window.syncPremiumTour();
    }

    window.dispatchEvent(
      new CustomEvent('rf:premium-change', { detail: { active: active } })
    );
  }
};

window.rfSyncPremiumUI = RF.premium.syncUI;


// ==============================
// FONTE ÚNICA DE DADOS (receitas)
// ==============================
const ALL_RECIPES = (typeof RECIPES !== 'undefined' && Array.isArray(RECIPES)) ? RECIPES : [];
let allRecipes = ALL_RECIPES;


function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

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

let _premiumTimeout = null;
let _premiumInterval = null;

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
const creditsText = document.getElementById('credits-text');

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

const mealSelectorModal = document.getElementById('meal-selector-modal');
const mealSelectorSubtitle = document.getElementById('meal-selector-subtitle');

// ==============================
// MODAL HELPERS
// ==============================
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
// CORE BUSINESS RULES
// ==============================
function canAccessRecipe(recipeId) {
  if (isPremium) return true;
  if (unlockedRecipes.includes(recipeId)) return true;
  return credits > 0;
}

function ensureRecipeAccess(recipeId) {
  if (isPremium || unlockedRecipes.includes(recipeId)) return true;

  if (credits > 0) {
    openConfirmCreditModal(recipeId);
    return false;
  }

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

  pendingRecipeId = null;
};

window.confirmUnlockRecipe = function () {
  if (!pendingRecipeId) return;

  const id = String(pendingRecipeId);

  const c = (typeof getCreditsSafe === 'function')
    ? getCreditsSafe()
    : (Number.isFinite(credits) ? credits : 0);

  if (isPremium !== true) {
    if (c <= 0) {
      if (typeof window.closeConfirmCreditModal === 'function') {
        window.closeConfirmCreditModal();
      }
      if (typeof window.openPremium === 'function') window.openPremium('no-credits');
      else if (typeof window.openPremiumModal === 'function') window.openPremiumModal('no-credits');
      return;
    }

    credits = c - 1;

    if (typeof persistCredits === 'function') persistCredits();
    else localStorage.setItem('fit_credits', String(credits));

    if (typeof unlockRecipe === 'function') unlockRecipe(id);
  }

  if (typeof window.closeConfirmCreditModal === 'function') {
    window.closeConfirmCreditModal();
  } else {
    const modal = document.getElementById('confirm-credit-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  pendingRecipeId = null;

  try { updateUI(); } catch (_) {}
  try { renderRecipes(); } catch (_) {}

  try {
    if (typeof _rfPrefetchImage === 'function' && typeof _rfGetRecipeHeroUrlById === 'function') {
      _rfPrefetchImage(_rfGetRecipeHeroUrlById(id));
    }
  } catch (_) {}

  requestOpenRecipe(id);
};


// loadUserData()
async function loadUserData() {
  try {
    if (hasPendingCheckout()) {
      sanitizeSuspiciousPaidPremium('startup-with-pending-checkout');
      if (!isCheckoutPendingRecent(45 * 60 * 1000)) {
        clearCheckoutPendingState();
      }
    }

    const flaggedAsPremium =
      (window.RF && RF.premium && typeof RF.premium.isActive === 'function')
        ? RF.premium.isActive()
        : (localStorage.getItem('fit_premium') === 'true');

    if (flaggedAsPremium && typeof isPremiumValidNow === 'function' && !isPremiumValidNow()) {
      if (typeof clearPremiumState === 'function') {
        clearPremiumState();
      } else {
        localStorage.setItem('fit_premium', 'false');
        localStorage.setItem('fit_premium_token', '');
        localStorage.setItem('fit_premium_expires', '');
      }
    }

    const tokenResult = await storage.get('fit_premium_token');
    const expiresResult = await storage.get('fit_premium_expires');

    premiumToken = (tokenResult && tokenResult.value) ? tokenResult.value : null;

    const expiresStr = (expiresResult && expiresResult.value) ? String(expiresResult.value) : '';
    premiumExpires = expiresStr ? parseInt(expiresStr, 10) : null;
    if (!Number.isFinite(premiumExpires)) premiumExpires = null;

    if (typeof isPremiumValidNow === 'function') {
      isPremium = !!isPremiumValidNow();
      localStorage.setItem('fit_premium', isPremium ? 'true' : 'false');
    } else {
      isPremium = (localStorage.getItem('fit_premium') === 'true');
    }

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

  try { updateUI(); } catch (_) {}
  try { if (typeof updatePremiumButtons === 'function') updatePremiumButtons(); } catch (_) {}

  try { updateShoppingCounter(); } catch (_) {}
  try { initSliderAndCategories(); } catch (_) {}
  try { renderRecipes(); } catch (_) {}
  try { setupRecipeHeroPrefetch(); } catch (_) {}
  try { setupRecipeGridClickGuard(); } catch (_) {}

  try {
    if (typeof syncPremiumFromCore === 'function') {
      syncPremiumFromCore();
    } else if (window.RF && RF.premium && typeof RF.premium.syncUI === 'function') {
      RF.premium.syncUI();
    }
  } catch (_) {}

  try {
    if (typeof _setupPremiumTimers === 'function' && isPremium && premiumExpires && premiumExpires > Date.now()) {
      _setupPremiumTimers();
    }
  } catch (_) {}

  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (_) {}

  try {
    if (window.__rfBootLoader && typeof window.__rfBootLoader.finish === 'function') {
      window.__rfBootLoader.finish();
    } else {
      document.documentElement.classList.remove('rf-ui-booting');
    }
    if (typeof window.__rfUnlockBadgesNow === 'function') {
      window.__rfUnlockBadgesNow(650);
    } else {
      document.documentElement.classList.remove('rf-badge-lock');
    }
  } catch (_) {}
}


async function saveUserData() {
  try {
    if (isPremium && premiumToken) {
      await storage.set('fit_premium', 'true');
      await storage.set('fit_premium_token', premiumToken);
      if (premiumExpires) {
        await storage.set('fit_premium_expires', premiumExpires.toString());
      }
    } else {
      await storage.set('fit_credits', credits.toString());
      await storage.set('fit_unlocked', JSON.stringify(unlockedRecipes));
      await storage.set('fit_premium', 'false');
      try { localStorage.removeItem('fit_premium_source'); } catch (_) {}
    }
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
  }
}

async function saveShoppingList() {
  try {
    await storage.set('fit_shopping', JSON.stringify(shoppingList));
    updateShoppingCounter();
  } catch (e) {}
}

async function saveWeekPlan() {
  try {
    await storage.set('fit_weekplan', JSON.stringify(weekPlan));
  } catch (e) {}
}


// ==============================
// UI (Badge / Premium)
// ==============================
function updateUI() {
  try {

    if (isPremium && !isPremiumValidNow()) {
      forceFreeCleanup();
    }

    if (!creditsBadge) return;

    if (isPremium) {
      document.body.classList.remove('free-user');
      document.body.classList.add('premium-active');

      creditsBadge.classList.add('premium');

      const overlay = creditsBadge.closest('.slider-badges-overlay');
      if (overlay) {
        overlay.style.position = 'absolute';
        overlay.style.top = '12px';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.width = '100%';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.transform = 'none';
        overlay.style.zIndex = '12';
      }
      creditsBadge.style.position = 'static';
      creditsBadge.style.left = 'auto';
      creditsBadge.style.top = 'auto';
      creditsBadge.style.transform = 'none';

      let badgeText = 'Premium';
      if (premiumExpires) {
        const daysLeft = Math.ceil((premiumExpires - Date.now()) / (1000 * 60 * 60 * 24));
        const userPlan = String(localStorage.getItem('fit_premium_plan') || '').trim().toLowerCase();

        if (userPlan === 'monthly' || userPlan === 'mensal') {
          badgeText = 'Premium Mensal';
        } else if (userPlan === 'annual' || userPlan === 'anual' || userPlan === 'yearly') {
          badgeText = 'Premium Anual';
        } else if (daysLeft > 0) {
          badgeText = `Premium (${daysLeft} Dias)`;
        }
      }

      creditsBadge.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span>${badgeText}</span>
      `;

      if (premiumBtn) {
        premiumBtn.style.setProperty('display', 'none', 'important');
        premiumBtn.style.visibility = 'visible';
        premiumBtn.style.opacity = '1';
        premiumBtn.offsetHeight;
      }

    } else {
      document.body.classList.add('free-user');
      document.body.classList.remove('premium-active');

      creditsBadge.classList.remove('premium');
      creditsBadge.innerHTML = `
        <span id="credits-text">&nbsp${credits} Créditos &nbsp</span>
      `;

      const overlay = creditsBadge.closest('.slider-badges-overlay');
      if (overlay) {
        overlay.style.position = '';
        overlay.style.top = '';
        overlay.style.left = '';
        overlay.style.right = '';
        overlay.style.width = '';
        overlay.style.display = '';
        overlay.style.justifyContent = '';
        overlay.style.alignItems = '';
        overlay.style.transform = '';
        overlay.style.zIndex = '';
      }
      creditsBadge.style.position = '';
      creditsBadge.style.left = '';
      creditsBadge.style.top = '';
      creditsBadge.style.transform = '';

      if (premiumBtn) {
        premiumBtn.style.display = 'block';
        premiumBtn.offsetHeight;
      }
    }

    creditsBadge.classList.add('ready');

    try { if (typeof updateGreeting === 'function') updateGreeting(); } catch (_) {}

    if (typeof updatePremiumButtons === 'function') {
      updatePremiumButtons();
    }

  } catch (error) {
    console.error('Erro em updateUI:', error);

    if (typeof updatePremiumButtons === 'function') {
      updatePremiumButtons();
    }
  }
}


function updateShoppingCounter() {
  if (!shoppingCounter) return;

  const count = Array.isArray(shoppingList) ? shoppingList.length : 0;

  if (count > 0) {
    shoppingCounter.textContent = count;
    shoppingCounter.classList.remove('hidden');
  } else {
    shoppingCounter.classList.add('hidden');
  }

  updatePlannerDot(count);
  updatePlannerMenuShoppingBadge(count);
}


window.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof updateShoppingCounter === 'function') {
      updateShoppingCounter();
    }
  } catch (_) {}
});


(function plannerDotBootstrap(){
  if (!document.getElementById('planner-dot-style')) {
    const style = document.createElement('style');
    style.id = 'planner-dot-style';
    style.textContent = `
      .planner-dot {
        position: absolute;
        top: 6px;
        left: 62px;
        right: 14px;
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: #ef4444;
        box-shadow: 0 0 0 2px rgba(255,255,255,.9);
        pointer-events: none;
      }
      .planner-dot.hidden { display: none !important; }
    `;
    document.head.appendChild(style);
  }
})();

function getPlannerTabButton() {
  const tabbar = document.querySelector('.tab-bar');
  if (!tabbar) return null;

  return Array.from(tabbar.querySelectorAll('button')).find(btn =>
    btn.querySelector('svg.lucide-calendar, svg.lucide.lucide-calendar')
  ) || null;
}

function ensurePlannerDotEl() {
  const btn = getPlannerTabButton();
  if (!btn) return null;

  const cs = getComputedStyle(btn);
  if (cs.position === 'static') btn.style.position = 'relative';

  let dot = btn.querySelector('.planner-dot');
  if (!dot) {
    dot = document.createElement('span');
    dot.className = 'planner-dot hidden';
    btn.appendChild(dot);
  }
  return dot;
}

function updatePlannerDot(shoppingCount) {
  const dot = ensurePlannerDotEl();
  if (!dot) return;

  if ((shoppingCount || 0) > 0) dot.classList.remove('hidden');
  else dot.classList.add('hidden');
}


// ==============================
// SLIDER + CATEGORIAS
// ==============================
let sliderAutoplay = null;

function initSliderAndCategories() {
  if (!allRecipes || allRecipes.length === 0) return;

  if (sliderTrack && sliderDots) {
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

    sliderDots.innerHTML = featuredRecipes.map((_, idx) => `
      <button class="slider-dot-new ${idx === 0 ? 'active' : ''}" type="button" data-slide-idx="${idx}" aria-label="Ir para slide ${idx + 1}"></button>
    `).join('');

    if (!sliderDots.dataset.dotsBound) {
      sliderDots.dataset.dotsBound = '1';
      sliderDots.addEventListener('click', function (e) {
        const btn = e.target.closest?.('[data-slide-idx]');
        if (!btn) return;
        const idx = parseInt(btn.getAttribute('data-slide-idx') || '0', 10);

        if (typeof window.goToSlideNew === 'function') {
          window.goToSlideNew(idx);
          return;
        }

        const slideW = sliderTrack.querySelector('.slide-new')?.getBoundingClientRect().width || 0;
        sliderTrack.style.transition = 'transform 260ms ease';
        sliderTrack.style.transform = `translate3d(${-idx * slideW}px,0,0)`;

        Array.from(sliderDots.querySelectorAll('.slider-dot-new')).forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }, { passive: true });
    }

    if (!sliderTrack.dataset.tapBound) {
      sliderTrack.dataset.tapBound = '1';

      let startX = 0;
      let startY = 0;
      let moved = false;

      const MOVE_THRESHOLD = 12;

      function openFromTarget(target) {
        const slide = target.closest?.('[data-recipe-id]');
        if (!slide) return;

        const id = slide.getAttribute('data-recipe-id');
        if (!id) return;

        if (typeof window.requestOpenRecipe === 'function') {
          window.requestOpenRecipe(String(id));
        } else if (typeof window.openConfirmCreditModal === 'function') {
          window.openConfirmCreditModal(String(id));
        } else {
          console.warn('[slider] requestOpenRecipe/openConfirmCreditModal não encontrados');
        }
      }

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
        if (moved) return;
        openFromTarget(e.target);
      }, { passive: true });

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

    if (typeof setupHeroSliderDrag === 'function') {
      try { setupHeroSliderDrag(); } catch (_) {}
    }
  }

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

function updateSlider() {
  if (!sliderTrack) return;
  sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  document.querySelectorAll('.slider-dot-new').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}

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


window.filterByCategory = function(category, element) {
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


function getIconFromIngredientName(name) {
  if (!name) return 'utensils';

  const nameLower = name.toLowerCase();

  if (nameLower.includes('frango') || nameLower.includes('peito') || nameLower.includes('coxa')) return 'drumstick';
  if (nameLower.includes('carne') || nameLower.includes('boi') || nameLower.includes('patinho')) return 'beef';
  if (nameLower.includes('peixe') || nameLower.includes('salmão') || nameLower.includes('atum')) return 'fish';
  if (nameLower.includes('camarão')) return 'fish';
  if (nameLower.includes('ovo')) return 'egg';
  if (nameLower.includes('whey') || nameLower.includes('proteína')) return 'dumbbell';
  if (nameLower.includes('banana')) return 'banana';
  if (nameLower.includes('morango') || nameLower.includes('framboesa')) return 'cherry';
  if (nameLower.includes('maçã')) return 'apple';
  if (nameLower.includes('limão') || nameLower.includes('lima')) return 'citrus';
  if (nameLower.includes('laranja')) return 'orange';
  if (nameLower.includes('abacate')) return 'leaf';
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
  if (nameLower.includes('aveia') || nameLower.includes('granola')) return 'wheat';
  if (nameLower.includes('arroz')) return 'wheat';
  if (nameLower.includes('macarrão') || nameLower.includes('massa')) return 'wheat';
  if (nameLower.includes('pão') || nameLower.includes('torrada')) return 'wheat';
  if (nameLower.includes('leite')) return 'milk';
  if (nameLower.includes('queijo')) return 'milk';
  if (nameLower.includes('iogurte')) return 'milk-off';
  if (nameLower.includes('azeite') || nameLower.includes('óleo')) return 'droplets';
  if (nameLower.includes('manteiga')) return 'square';
  if (nameLower.includes('amendoim') || nameLower.includes('castanha')) return 'nut';
  if (nameLower.includes('sal')) return 'sparkles';
  if (nameLower.includes('canela')) return 'wheat';
  if (nameLower.includes('erva') || nameLower.includes('orégano') || nameLower.includes('alecrim')) return 'leaf';
  if (nameLower.includes('tempero')) return 'sparkles';
  if (nameLower.includes('mostarda') || nameLower.includes('molho')) return 'droplet';
  if (nameLower.includes('mel')) return 'droplet';
  if (nameLower.includes('açúcar')) return 'candy';
  if (nameLower.includes('chocolate')) return 'candy';
  if (nameLower.includes('açaí')) return 'ice-cream';
  if (nameLower.includes('polpa')) return 'package';
  if (nameLower.includes('coco')) return 'palmtree';
  if (nameLower.includes('café')) return 'coffee';
  if (nameLower.includes('chá')) return 'cup-soda';
  if (nameLower.includes('água')) return 'droplet';
  if (nameLower.includes('suco')) return 'glass-water';

  return 'chef-hat';
}


// ================================
// ACCESS CORE
// ================================

function getUnlockedSet() {
  if (!Array.isArray(unlockedRecipes)) unlockedRecipes = [];
  return new Set(unlockedRecipes);
}

function persistUnlocked() {
  try {
    localStorage.setItem('fit_unlocked', JSON.stringify(unlockedRecipes || []));
  } catch (_) {}
}

function persistCredits() {
  try {
    localStorage.setItem('fit_credits', String(credits ?? 3));
  } catch (_) {}
}

function isRecipeUnlocked(recipeId) {
  const s = getUnlockedSet();
  return s.has(String(recipeId));
}

function unlockRecipe(recipeId) {
  const id = String(recipeId);
  if (!Array.isArray(unlockedRecipes)) unlockedRecipes = [];
  if (!unlockedRecipes.includes(id)) {
    unlockedRecipes.push(id);
    persistUnlocked();
  }
}

function canAccessRecipe(recipeId) {
  if (isPremium === true) return true;
  if (isRecipeUnlocked(recipeId)) return true;
  return (Number.isFinite(credits) ? credits : 0) > 0;
}


// ================================
// UI/REGRA OFICIAL — Lock & CTA
// ================================

function getCreditsSafe() {
  return Number.isFinite(credits) ? credits : 0;
}

function shouldShowLock(recipeId) {
  if (isPremium === true) return false;
  const c = getCreditsSafe();
  if (c > 0) return false;
  return !isRecipeUnlocked(recipeId);
}

function shouldShowUnlockCTA(recipeId) {
  if (isPremium === true) return false;
  if (isRecipeUnlocked(recipeId)) return false;
  const c = getCreditsSafe();
  return c > 0;
}


function decideRecipeOpenAction(recipeId) {
  const id = String(recipeId);

  if (isPremium === true) {
    return { action: 'open', id };
  }

  if (typeof isRecipeUnlocked === 'function' && isRecipeUnlocked(id)) {
    return { action: 'open', id };
  }

  const c = (typeof getCreditsSafe === 'function')
    ? getCreditsSafe()
    : (Number.isFinite(credits) ? credits : 0);

  if (c > 0) {
    return { action: 'confirm-credit', id };
  }

  return { action: 'premium', id };
}

function requestOpenRecipe(recipeId) {
  const decision = decideRecipeOpenAction(recipeId);

  if (!decision || !decision.action) return;

  switch (decision.action) {
    case 'open':
      renderRecipeDetail(decision.id);
      break;

    case 'confirm-credit':
      if (typeof window.openConfirmCreditModal === 'function') {
        window.openConfirmCreditModal(decision.id);
      }
      break;

    case 'premium':
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
// PREFETCH HERO IMAGES
// ================================
const _rfPrefetchCache = new Set();

function _rfPrefetchImage(url) {
  if (!url || typeof url !== 'string') return;
  if (_rfPrefetchCache.has(url)) return;

  _rfPrefetchCache.add(url);

  try {
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = url;
  } catch (e) {}
}

function _rfGetRecipeHeroUrlById(recipeId) {
  const id = String(recipeId);
  const recipe = (Array.isArray(allRecipes) ? allRecipes : []).find(r => String(r.id) === id);
  if (!recipe) return null;

  return recipe.images?.hero || recipe.image || null;
}

function setupRecipeHeroPrefetch() {
  if (!recipeGrid) return;

  if (recipeGrid.dataset.heroPrefetchAttached === '1') return;
  recipeGrid.dataset.heroPrefetchAttached = '1';

  function prefetchFromTarget(target) {
    const card = target.closest?.('[data-recipe-id]');
    if (!card) return;

    const id = card.getAttribute('data-recipe-id');
    if (!id) return;

    const heroUrl = _rfGetRecipeHeroUrlById(id);
    if (!heroUrl) return;

    _rfPrefetchImage(heroUrl);
  }

  recipeGrid.addEventListener('pointerenter', (e) => {
    prefetchFromTarget(e.target);
  }, true);

  recipeGrid.addEventListener('touchstart', (e) => {
    prefetchFromTarget(e.target);
  }, { passive: true });

  recipeGrid.addEventListener('focusin', (e) => {
    prefetchFromTarget(e.target);
  });
}


function setupRecipeGridClickGuard() {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;

  if (grid.dataset.clickGuardAttached === '1') return;
  grid.dataset.clickGuardAttached = '1';

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('[data-recipe-id]');
    if (!card) return;

    const recipeId = card.getAttribute('data-recipe-id');
    if (!recipeId) return;

    if (typeof requestOpenRecipe === 'function') {
      requestOpenRecipe(String(recipeId));
    } else {
      console.warn('[setupRecipeGridClickGuard] requestOpenRecipe não encontrado.');
    }
  });
}


function initHomeUI() {
  setupIngredientDropdown();
}


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

function parseAdvancedFilters(raw) {
  let text = String(raw || '').trim();
  const filters = { maxCalories: null, minProtein: null, maxTime: null };

  const mCal = text.match(/\b(cal|calorias)\s*<=\s*(\d+)\b/i);
  if (mCal && mCal[2]) {
    const n = Number(mCal[2]);
    if (Number.isFinite(n)) filters.maxCalories = n;
    text = text.replace(mCal[0], '').trim();
  }

  const mProt = text.match(/\b(prot|proteina|proteína)\s*>=\s*(\d+)\b/i);
  if (mProt && mProt[2]) {
    const n = Number(mProt[2]);
    if (Number.isFinite(n)) filters.minProtein = n;
    text = text.replace(mProt[0], '').trim();
  }

  const mTime = text.match(/\b(tempo)\s*<=\s*(\d+)\b/i);
  if (mTime && mTime[2]) {
    const n = Number(mTime[2]);
    if (Number.isFinite(n)) filters.maxTime = n;
    text = text.replace(mTime[0], '').trim();
  }

  return { cleanedText: text, filters };
}


function renderRecipes() {
  if (!recipeGrid || !Array.isArray(allRecipes) || allRecipes.length === 0) return;

  function rfNorm(v) {
    return String(v || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  const selTags = Array.from(document.querySelectorAll('#rfTagsGrid .rf-chip.is-active'))
    .map(el => rfNorm(el.getAttribute('data-tag')))
    .filter(Boolean);

  const selObjectives = Array.from(document.querySelectorAll('#rfObjChips .rf-chip.is-active'))
    .map(el => rfNorm(el.getAttribute('data-value')))
    .filter(Boolean);

  const selDietary = Array.from(document.querySelectorAll('#rfDietChips .rf-chip.is-active'))
    .map(el => rfNorm(el.getAttribute('data-value')))
    .filter(Boolean);

  function recipeTagSet(recipe) {
    const set = new Set();

    if (Array.isArray(recipe?.tags)) {
      recipe.tags.forEach(t => {
        const k = rfNorm(t);
        if (k) set.add(k);
      });
    }

    if (Array.isArray(recipe?.searchMeta?.objectives)) {
      recipe.searchMeta.objectives.forEach(t => {
        const k = rfNorm(t);
        if (k) set.add(k);
      });
    }

    const d = recipe?.searchMeta?.dietary;
    if (d && typeof d === 'object') {
      Object.keys(d).forEach(key => {
        if (d[key] === true) set.add(rfNorm(key));
      });
      if (d.vegan === true) set.add('vegano');
    }

    return set;
  }

  const q = (searchTerm || '').trim().toLowerCase();
  const cat = (selectedCategory || '').trim();
  const ingTokens = Array.isArray(searchIngredients) ? searchIngredients : [];
  const f = advancedFilters || { maxCalories: null, minProtein: null, maxTime: null };

  let filtered = allRecipes.filter(recipe => {
    if (cat) {
      const recipeCat = String(recipe?.category || '');
      const catOk =
        recipeCat === cat ||
        (cat === 'Almoço/Janta' && (recipeCat === 'Almoço' || recipeCat === 'Jantar'));
      if (!catOk) return false;
    }

    if (q) {
      const name = String(recipe?.name || '').toLowerCase();
      if (!name.includes(q)) return false;
    }

    if (ingTokens.length > 0) {
      const hay = getRecipeIngredientsHaystack(recipe);
      const allMatch = ingTokens.every(t => hay.includes(t));
      if (!allMatch) return false;
    }

    if (selTags.length || selObjectives.length || selDietary.length) {
      const set = recipeTagSet(recipe);

      if (selTags.length > 0) {
        for (let i = 0; i < selTags.length; i++) {
          if (!set.has(selTags[i])) return false;
        }
      }

      if (selDietary.length > 0) {
        for (let i = 0; i < selDietary.length; i++) {
          if (!set.has(selDietary[i])) return false;
        }
      }

      if (selObjectives.length > 0) {
        let ok = false;
        for (let i = 0; i < selObjectives.length; i++) {
          if (set.has(selObjectives[i])) { ok = true; break; }
        }
        if (!ok) return false;
      }
    }

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

  if (!filtered || filtered.length === 0) {
    recipeGrid.innerHTML = `
      <div class="rf-empty-state">
        <h3>Nenhuma receita encontrada</h3>
        <p>Não encontramos nenhuma receita com os filtros usados. Tente remover uma tag, ajustar os valores ou limpar os filtros.</p>
      </div>
    `;
    return;
  }

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
                `
                : `
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                `
            }
          </button>
        </div>
      </div>
    `;
  }).join('');
}


function viewRecipe(recipeId) {
  const id = String(recipeId);

  if (typeof requestOpenRecipe === 'function') {
    requestOpenRecipe(id);
    return;
  }

  if (typeof renderRecipeDetail === 'function') {
    renderRecipeDetail(id);
    return;
  }

  console.warn('[viewRecipe] requestOpenRecipe/renderRecipeDetail não encontrados.');
}


// ==============================
// DETALHE DA RECEITA
// ==============================
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
          Lista de compras
        </button>
        <br>
        <p class="planner-subtitle" style="display: block; margin-top: -0.5rem; clear: both;">Aproveite para adicionar os ingredientes desta receita na Lista de compras</p>
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
        <p class="planner-subtitle">Selecione o dia da semana que você quer fazer esta receita</p>
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

            const iconName = ing.icon || getIconFromIngredientName(ing.text || ing.name || ing.quantity);
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

  if (typeof lucide !== 'undefined') lucide.createIcons();

  const slider = document.getElementById('heroSlider');
  const categories = document.querySelector('.categories-new');

  recipeGrid.classList.add('fade-out');
  if (slider) slider.classList.add('fade-out');
  if (categories) categories.classList.add('fade-out');

  setTimeout(() => {
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

    recipeDetail.classList.remove('hidden');
    recipeDetail.classList.add('fade-in');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
}


window.closeRecipeDetail = function() {
  const recipeDetailEl = document.getElementById('recipe-detail');
  const recipeGridEl = document.getElementById('recipe-grid');

  if (!recipeDetailEl || !recipeGridEl) return;

  const slider = document.getElementById('heroSlider');
  const categories = document.querySelector('.categories-new');

  recipeDetailEl.classList.add('fade-out');

  setTimeout(() => {
    recipeDetailEl.classList.add('hidden');
    recipeDetailEl.classList.remove('fade-out', 'fade-in');

    currentRecipe = null;

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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
};


window.closeRecipeDetailAndFilter = function(category) {
  const recipeDetailEl = document.getElementById('recipe-detail');
  const recipeGridEl = document.getElementById('recipe-grid');

  if (!recipeDetailEl || !recipeGridEl) return;

  const slider = document.getElementById('heroSlider');
  const categories = document.querySelector('.categories-new');

  recipeDetailEl.classList.add('fade-out');

  setTimeout(() => {
    recipeDetailEl.classList.add('hidden');
    recipeDetailEl.classList.remove('fade-out', 'fade-in');

    currentRecipe = null;

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

    searchTerm = category;
    renderRecipes();

    document.querySelectorAll('.category-card-new').forEach(card => {
      card.classList.remove('active');
      if (card.textContent.trim() === category) {
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });

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

window.addToWeekPlan = function(day, recipeId) {
  console.log('[PLANNER] Abrindo seletor:', { day, recipeId });

  selectedDayForPlanner = day;
  selectedRecipeForPlanner = recipeId;

  const recipe = allRecipes.find(r => r.id === recipeId);
  if (mealSelectorSubtitle && recipe) {
    mealSelectorSubtitle.textContent = `${day} - ${recipe.name}`;
  }

  const mealModal = document.getElementById('meal-selector-modal');
  if (mealModal) {
    mealModal.classList.remove('hidden');
    mealModal.style.pointerEvents = 'auto';
    document.body.classList.add('modal-open');

    console.log('[PLANNER] Modal aberto');
  }

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

  if (!selectedDayForPlanner || !selectedRecipeForPlanner) {
    console.error('[PLANNER] Erro: Variáveis não definidas!', {
      selectedDay: selectedDayForPlanner,
      selectedRecipe: selectedRecipeForPlanner
    });
    return;
  }

  const recipe = allRecipes.find(r => r.id === selectedRecipeForPlanner);

  if (!recipe) {
    console.error('[PLANNER] Erro: Receita não encontrada!', {
      recipeId: selectedRecipeForPlanner
    });
    return;
  }

  const key = `${selectedDayForPlanner}-${meal}`;
  weekPlan[key] = recipe;

  saveWeekPlan();

  console.log('[PLANNER] Receita salva:', { key, recipe: recipe.name });

  showNotification(
    'Receita Adicionada!',
    `${recipe.name} adicionado para\n${selectedDayForPlanner} - ${meal}`
  );

  window.closeMealSelector();

  console.log('[PLANNER] Modal fechado, processo concluído');
};

window.closeMealSelector = function() {
  const modal = document.getElementById('meal-selector-modal');

  if (modal) {
    modal.classList.add('hidden');
    modal.style.pointerEvents = 'auto';
  }

  selectedDayForPlanner = null;
  selectedRecipeForPlanner = null;

  document.body.classList.remove('modal-open');

  console.log('[MEAL SELECTOR] Modal fechado e variáveis limpas');
};


function renderWeekPlanner() {
  const content = document.getElementById('week-planner-content');
  if (!content) return;

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
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
