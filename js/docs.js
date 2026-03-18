/**
 * docs.js
 * Documentation site functionality.
 *
 * main.js is loaded as a side-effect via the import — it handles Theme.init(),
 * Nav.init(), and theme toggle wiring automatically at module evaluation time.
 * This file adds docs-specific behaviour only.
 */

// Import as side-effect: main.js self-initialises when imported as a module.
// We only need Theme for the toggle wiring here.
import { Theme } from './main.js';


/* =============================================================================
   ACTIVE SIDEBAR LINK
   Matches on the page filename, ignoring hash fragments.
   ============================================================================= */

function initActiveSidebarLink() {
  const links = document.querySelectorAll('.docs-sidebar__link');
  // Extract just the filename from the current URL, e.g. "layers.html"
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    // Compare only the file portion (before any #hash)
    const linkFile = href.split('#')[0] || 'index.html';
    if (linkFile === currentFile) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}


/* =============================================================================
   ON-THIS-PAGE — active link as you scroll
   ============================================================================= */

function initOnThisPage() {
  const links    = document.querySelectorAll('.docs-on-this-page__link');
  const headings = document.querySelectorAll('.docs-section h2[id], .docs-section h3[id]');

  if (!links.length || !headings.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-10% 0px -80% 0px' }
  );

  headings.forEach(h => observer.observe(h));
}


/* =============================================================================
   CONTAINER QUERY SLIDER
   ============================================================================= */

function initCQSlider() {
  const slider     = document.getElementById('cq-slider');
  const stage      = document.getElementById('cq-stage');
  const widthLabel = document.getElementById('cq-width-label');
  const stateLabel = document.getElementById('cq-state-label');

  if (!slider || !stage) return;

  function update(val) {
    const w = parseInt(val, 10);
    stage.style.width = w + 'px';
    if (widthLabel) widthLabel.textContent = w + 'px';
    if (stateLabel) {
      if (w >= 560)      stateLabel.textContent = '\u2265560px \u2014 wide (3 columns)';
      else if (w >= 380) stateLabel.textContent = '\u2265380px \u2014 medium (2 columns)';
      else               stateLabel.textContent = '<380px \u2014 narrow (stacked)';
    }
  }

  slider.addEventListener('input', () => update(slider.value));
  update(slider.value);
}


/* =============================================================================
   LAYER DEMO
   ============================================================================= */

function initLayerDemo() {
  const card      = document.getElementById('layer-demo-card');
  const btnAdd    = document.getElementById('layer-btn-add');
  const btnRemove = document.getElementById('layer-btn-remove');
  const result    = document.getElementById('layer-result');
  const tagComp   = document.getElementById('layer-tag-components');
  const tagUtil   = document.getElementById('layer-tag-utilities');

  if (!card || !btnAdd) return;

  function set(on) {
    card.classList.toggle('utility-wins', on);

    btnAdd.classList.toggle('is-active', on);
    btnRemove.classList.toggle('is-active', !on);

    if (tagComp) {
      tagComp.className   = on ? 'layer-demo-tag' : 'layer-demo-tag is-components';
      tagComp.textContent = on ? '@layer components \u2014 overridden' : '@layer components \u2014 active';
    }
    if (tagUtil) {
      tagUtil.className   = on ? 'layer-demo-tag is-utilities' : 'layer-demo-tag';
      tagUtil.textContent = on ? '@layer utilities \u2014 WINS' : '@layer utilities \u2014 not applied';
    }
    if (result) {
      result.className   = on ? 'layer-result is-win' : 'layer-result';
      result.textContent = on
        ? '\u2713 Layer order wins.\n\n.utility-wins specificity:          0,1,0\n#layer-demo-card.demo-card specificity: 1,1,0\n\nIn normal CSS the ID rule wins every time.\nWith @layer, utilities is declared AFTER components\n\u2014 so it wins. No !important used anywhere.'
        : 'Click \u201cAdd .utility-wins\u201d to run the demo.';
    }
  }

  btnAdd.addEventListener('click',    () => set(true));
  btnRemove.addEventListener('click', () => set(false));
}


/* =============================================================================
   TOKEN SWATCHES
   Populates the tbody#token-swatch-grid with <tr> rows.
   Each colour swatch uses an inline background-color: var(--token-name) so
   the browser resolves and transitions the value live on theme toggle.
   ============================================================================= */

function initTokenSwatches() {
  const tbody = document.getElementById('token-swatch-grid');
  if (!tbody) return;

  const tokens = [
    { name: '--surface-page',   desc: 'Page background'       },
    { name: '--surface-raised', desc: 'Card / raised surface'  },
    { name: '--surface-sunken', desc: 'Inset / sunken surface' },
    { name: '--text-primary',   desc: 'Primary text'           },
    { name: '--text-secondary', desc: 'Secondary text'         },
    { name: '--text-tertiary',  desc: 'Tertiary / muted text'  },
    { name: '--border-subtle',  desc: 'Subtle border'          },
    { name: '--border-default', desc: 'Default border'         },
    { name: '--accent-default', desc: 'Accent colour'          },
    { name: '--accent-subtle',  desc: 'Accent background'      },
    { name: '--accent-muted',   desc: 'Accent muted'           },
  ];

  tbody.innerHTML = '';

  tokens.forEach(t => {
    const tr = document.createElement('tr');

    // Colour swatch cell — inline background-color:var() so browser resolves live
    const dotCell = document.createElement('td');
    const dot = document.createElement('span');
    dot.className = 'token-dot';
    dot.style.setProperty('background-color', `var(${t.name})`);
    dotCell.appendChild(dot);

    // Token name cell
    const nameCell = document.createElement('td');
    const code = document.createElement('code');
    code.textContent = t.name;
    nameCell.appendChild(code);

    // Description cell
    const descCell = document.createElement('td');
    descCell.textContent = t.desc;
    descCell.className = 'text-tertiary';

    tr.appendChild(dotCell);
    tr.appendChild(nameCell);
    tr.appendChild(descCell);
    tbody.appendChild(tr);
  });
}


/* =============================================================================
   INIT
   main.js has already run Theme.init(), Nav.init(), initThemeToggles(),
   initSmoothScroll(), and initRevealAnimations() at module evaluation time.
   We only need docs-specific initialisers here.
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initActiveSidebarLink();
  initOnThisPage();
  initCQSlider();
  initLayerDemo();
  initTokenSwatches();
});
