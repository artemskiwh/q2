// ===== TYAG МОСКВА — UI / cart / favorites / age modal =====
'use strict';

/* ---------- ICONS ---------- */
const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.3-9.3-8.5C1.3 9.6 2 6 5 4.5 7.4 3.4 10.2 4.4 12 6.5c1.8-2.1 4.6-3.1 7-2 3 1.5 3.7 5.1 2.3 8C19 16.7 12 21 12 21z"/></svg>',
  cart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2.4l2.7 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.4L21.5 7H6"/></svg>',
  user:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/></svg>',
  grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  trash:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="m19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  plus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  minus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
  truck:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16V6a1 1 0 0 1 1-1h11v11"/><path d="M15 8h4l3 4v4h-3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  card:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-17.6-17.6A2 2 0 0 1 4.2 2H7a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7.9 9.7a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6A2 2 0 0 1 22 17Z"/></svg>',
  pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  tg:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.94 15.96l-.4 5.66c.58 0 .82-.25 1.12-.55l2.68-2.56 5.56 4.07c1.02.56 1.74.27 2.02-.94L23.99 1.7c.34-1.5-.54-2.1-1.53-1.73L.91 8.5c-1.46.57-1.44 1.38-.25 1.75l5.55 1.73L19.12 4.2c.6-.4 1.16-.18.7.22"/></svg>',
  vk:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.2 18.4c-7.5 0-11.8-5.2-12-13.7h3.8c.1 6.3 2.9 9 5.1 9.5V4.7h3.5v5.4c2.2-.2 4.5-2.7 5.3-5.4h3.5c-.6 3.3-3.1 5.8-4.9 6.9 1.8.9 4.7 3 5.8 6.8h-3.9c-.9-2.7-3-4.9-5.8-5.1v5.1h-.4Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6 0-1.7-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5 0-.2-.6-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.9 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.4 0-.2-.2-.3-.5-.5ZM12 2A10 10 0 0 0 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.2 1.2 4.9 1.2A10 10 0 0 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20Z"/></svg>',
  package:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="m3 8 9 5v9"/><path d="M21 8v8l-9 5"/></svg>',
  battery:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11h2"/></svg>',
  bottle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v3l1.5 2c.3.4.5.9.5 1.4V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9.4c0-.5.2-1 .5-1.4L9 6V3Z"/><path d="M7 13h10"/></svg>',
  drop:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12Z"/></svg>',
  tools:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L22 14a8 8 0 0 1-8 8L9 17a3 3 0 0 1 0-4l5-5 .7-1.7Z"/><path d="m4 13 5 5"/><path d="m2 21 3-3"/></svg>',
  flame:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.4 0 2.5-1.1 2.5-2.5 0-1.4-1.9-3.3-1-5.4 1.6 1.6 4 3 4 5.4a5.5 5.5 0 0 1-11 0c0-3 5-6.5 4-12 4 2.5 8 6 8 10"/></svg>'
};

/* ---------- CATEGORY ICONS ---------- */
function categoryIcon(id) {
  switch (id) {
    case 'disposable':  return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="8" width="20" height="48" rx="6"/><rect x="26" y="14" width="12" height="10" rx="2" fill="currentColor" opacity="0.2"/><circle cx="32" cy="48" r="3"/></svg>';
    case 'pod':         return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="36" height="36" rx="6"/><rect x="22" y="22" width="20" height="14" rx="2" fill="currentColor" opacity="0.15"/><circle cx="32" cy="44" r="2"/></svg>';
    case 'liquid':      return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 10h16v6l4 6v28a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V22l4-6V10Z"/><path d="M20 32h24"/><path d="M28 10v6h8v-6"/></svg>';
    case 'accessory':   return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22"/><path d="M22 30c0-3 2-6 6-6"/><path d="M42 36c0 3-3 6-6 6"/><circle cx="32" cy="32" r="4" fill="currentColor"/></svg>';
    case 'consumable':  return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 18h28v8l-4 24a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4l-4-24v-8Z"/><path d="M14 14h36"/><path d="M28 30v12"/><path d="M36 30v12"/></svg>';
    default:            return ICON.grid;
  }
}

/* ---------- VAPE DEVICE SVG (стилизация под фото в каталоге) ---------- */
function vapeSvg(p) {
  const accent = p.accent || '#22D3C7';
  const shell  = p.shellColor || '#161a22';
  const style  = p.deviceStyle || 'omega-bar';
  const h1 = p.hue ?? 200, h2 = p.hue2 ?? 280;

  // Универсальный фон-«ауру» под устройство
  const aura = `
    <defs>
      <radialGradient id="aura-${p.id}" cx="50%" cy="55%" r="65%">
        <stop offset="0%"  stop-color="hsl(${h1},85%,55%)" stop-opacity="0.55"/>
        <stop offset="55%" stop-color="hsl(${h2},80%,40%)" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="hsl(${h2},60%,12%)" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="shell-${p.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${shell}"/>
        <stop offset="100%" stop-color="#000"/>
      </linearGradient>
      <linearGradient id="screen-${p.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stop-color="${accent}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0.35"/>
      </linearGradient>
      <linearGradient id="hl-${p.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="50%" stop-color="#fff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="115" r="98" fill="url(#aura-${p.id})"/>
  `;

  if (style === 'rounded-pod') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="62" y="30" width="76" height="160" rx="22" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.35"/>
        <rect x="68" y="36" width="64" height="32" rx="10" fill="${accent}" opacity="0.18"/>
        <rect x="72" y="40" width="56" height="24" rx="8" fill="${accent}" opacity="0.35"/>
        <circle cx="100" cy="166" r="10" fill="#000" stroke="${accent}" stroke-opacity="0.6"/>
        <rect x="86" y="74" width="28" height="84" rx="3" fill="#fff" opacity="0.05"/>
        <rect x="62" y="40" width="76" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'omega-bar') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="58" y="22" width="84" height="176" rx="16" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.4"/>
        <rect x="68" y="34" width="64" height="44" rx="8" fill="#000"/>
        <rect x="74" y="40" width="52" height="32" rx="4" fill="url(#screen-${p.id})"/>
        <text x="100" y="62" text-anchor="middle" font-family="Oswald, sans-serif" font-size="14" font-weight="700" fill="#000" opacity="0.7">${(p.puffs/1000)|0}K</text>
        <rect x="76" y="90" width="48" height="80" rx="4" fill="#fff" opacity="0.04"/>
        <rect x="80" y="178" width="40" height="10" rx="2" fill="${accent}" opacity="0.5"/>
        <rect x="58" y="32" width="84" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'big-screen') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="48" y="28" width="104" height="170" rx="18" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.4"/>
        <rect x="58" y="40" width="84" height="62" rx="6" fill="#000"/>
        <rect x="64" y="46" width="72" height="50" rx="3" fill="url(#screen-${p.id})"/>
        <text x="100" y="78" text-anchor="middle" font-family="Oswald, sans-serif" font-size="20" font-weight="800" fill="#000" opacity="0.75">${(p.puffs/1000)|0}K</text>
        <rect x="64" y="112" width="72" height="68" rx="4" fill="#fff" opacity="0.06"/>
        <circle cx="100" cy="190" r="3" fill="${accent}" opacity="0.6"/>
        <rect x="48" y="38" width="104" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'pod-screen') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="64" y="28" width="72" height="172" rx="14" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.4"/>
        <rect x="74" y="40" width="52" height="36" rx="4" fill="#000"/>
        <rect x="78" y="44" width="44" height="28" rx="2" fill="url(#screen-${p.id})"/>
        <text x="100" y="64" text-anchor="middle" font-family="Oswald, sans-serif" font-size="14" font-weight="700" fill="#000" opacity="0.75">${p.puffs ? ((p.puffs/1000)|0)+'K' : ''}</text>
        <rect x="74" y="86" width="52" height="96" rx="4" fill="#fff" opacity="0.04"/>
        <rect x="84" y="184" width="32" height="10" rx="2" fill="${accent}" opacity="0.5"/>
        <rect x="64" y="36" width="72" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'slim-stick') {
    const bg = shell.startsWith('#F') || shell.startsWith('#f') || shell.startsWith('#E') || shell.startsWith('#e')
      ? '#FFFFFF' : shell;
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="78" y="16" width="44" height="188" rx="22" fill="${bg}" stroke="${accent}" stroke-opacity="0.4"/>
        <circle cx="100" cy="30" r="7" fill="${accent}" opacity="0.8"/>
        <rect x="86" y="46" width="28" height="120" rx="3" fill="#000" opacity="0.06"/>
        <rect x="92" y="174" width="16" height="20" rx="2" fill="#000" opacity="0.1"/>
        <rect x="78" y="22" width="44" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'box-mod') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="42" y="60" width="116" height="124" rx="14" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.5"/>
        <rect x="76" y="26" width="48" height="40" rx="6" fill="${shell}" stroke="${accent}" stroke-opacity="0.5"/>
        <ellipse cx="100" cy="26" rx="14" ry="5" fill="#000"/>
        <rect x="56" y="80" width="42" height="42" rx="4" fill="#000"/>
        <rect x="60" y="84" width="34" height="34" rx="2" fill="url(#screen-${p.id})"/>
        <circle cx="130" cy="120" r="8" fill="#0a0a0a" stroke="${accent}" stroke-opacity="0.6"/>
        <circle cx="130" cy="120" r="3" fill="${accent}"/>
        <rect x="56" y="140" width="88" height="6" rx="2" fill="#fff" opacity="0.06"/>
        <rect x="56" y="154" width="88" height="6" rx="2" fill="#fff" opacity="0.06"/>
        <rect x="42" y="68" width="116" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'pod-stick') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="74" y="14" width="52" height="190" rx="14" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.4"/>
        <rect x="82" y="26" width="36" height="76" rx="4" fill="#000"/>
        <rect x="86" y="30" width="28" height="68" rx="2" fill="url(#screen-${p.id})" opacity="0.4"/>
        <rect x="82" y="112" width="36" height="78" rx="4" fill="#fff" opacity="0.06"/>
        <circle cx="100" cy="196" r="3" fill="${accent}" opacity="0.7"/>
        <rect x="74" y="22" width="52" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'liquid-bottle') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g>
        <rect x="86" y="14" width="28" height="20" rx="3" fill="${shell}" stroke="${accent}" stroke-opacity="0.4"/>
        <rect x="80" y="34" width="40" height="14" rx="3" fill="${shell}" stroke="${accent}" stroke-opacity="0.4"/>
        <path d="M70 56 L130 56 L138 76 L138 192 Q138 204 126 204 L74 204 Q62 204 62 192 L62 76 Z" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.5"/>
        <rect x="70" y="100" width="60" height="80" rx="4" fill="${accent}" opacity="0.12"/>
        <text x="100" y="130" text-anchor="middle" font-family="Oswald, sans-serif" font-size="14" font-weight="700" fill="${accent}" opacity="0.9">${(p.brand || '').slice(0,8)}</text>
        <text x="100" y="152" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="${accent}" opacity="0.7">${p.volume ? p.volume+' ML' : ''}</text>
        <text x="100" y="172" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="${accent}" opacity="0.7">SALT</text>
        <rect x="70" y="62" width="60" height="6" rx="3" fill="url(#hl-${p.id})"/>
      </g>
    </svg>`;
  }

  if (style === 'accessory') {
    return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
      <g stroke="${accent}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <rect x="40" y="90" width="120" height="40" rx="20"/>
        <path d="M60 110 Q100 60 140 110"/>
        <circle cx="60" cy="110" r="6" fill="${accent}"/>
        <circle cx="140" cy="110" r="6" fill="${accent}"/>
      </g>
    </svg>`;
  }

  // consumable: картриджи
  return `<svg viewBox="0 0 200 220" class="vape-svg" xmlns="http://www.w3.org/2000/svg">${aura}
    <g>
      <rect x="50" y="50" width="32" height="120" rx="6" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.5"/>
      <rect x="84" y="50" width="32" height="120" rx="6" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.5"/>
      <rect x="118" y="50" width="32" height="120" rx="6" fill="url(#shell-${p.id})" stroke="${accent}" stroke-opacity="0.5"/>
      <rect x="58" y="60" width="16" height="44" rx="2" fill="${accent}" opacity="0.35"/>
      <rect x="92" y="60" width="16" height="44" rx="2" fill="${accent}" opacity="0.35"/>
      <rect x="126" y="60" width="16" height="44" rx="2" fill="${accent}" opacity="0.35"/>
    </g>
  </svg>`;
}

/* ---------- STORAGE: cart & favorites ---------- */
const CART_KEY = 'tyag_cart';
const FAV_KEY  = 'tyag_favs';
const AGE_KEY  = 'tyag_age18';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
}
function setCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateBadges(); }
function cartCount() {
  const c = getCart();
  return Object.values(c).reduce((s, v) => s + v, 0);
}
function cartTotal() {
  const c = getCart();
  return Object.entries(c).reduce((s, [id, qty]) => {
    const p = findProduct(id);
    return p ? s + p.price * qty : s;
  }, 0);
}
function addToCart(id, qty = 1) {
  const c = getCart();
  c[id] = (c[id] || 0) + qty;
  setCart(c);
}
function removeFromCart(id) {
  const c = getCart();
  delete c[id];
  setCart(c);
}
function setCartQty(id, qty) {
  const c = getCart();
  if (qty <= 0) delete c[id]; else c[id] = qty;
  setCart(c);
}

function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch { return []; }
}
function setFavs(f) { localStorage.setItem(FAV_KEY, JSON.stringify(f)); updateBadges(); }
function toggleFav(id) {
  const f = getFavs();
  const i = f.indexOf(id);
  if (i >= 0) f.splice(i, 1); else f.push(id);
  setFavs(f);
  return f.includes(id);
}
function isFav(id) { return getFavs().includes(id); }

/* ---------- BADGES ---------- */
function updateBadges() {
  const cc = cartCount();
  const fc = getFavs().length;
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.setAttribute('data-count', cc);
    const b = el.querySelector('.badge');
    if (b) b.textContent = cc;
  });
  document.querySelectorAll('[data-fav-count]').forEach(el => {
    el.setAttribute('data-count', fc);
    const b = el.querySelector('.badge');
    if (b) b.textContent = fc;
  });
}

/* ---------- TOAST ---------- */
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

/* ---------- AGE MODAL ---------- */
function maybeShowAgeModal() {
  if (sessionStorage.getItem(AGE_KEY) === 'yes' || localStorage.getItem(AGE_KEY) === 'yes') return;
  const modal = document.getElementById('age-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function confirmAge(yes) {
  if (yes) {
    localStorage.setItem(AGE_KEY, 'yes');
    sessionStorage.setItem(AGE_KEY, 'yes');
    const modal = document.getElementById('age-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  } else {
    document.body.innerHTML = `
      <div class="age-deny">
        <div class="container">
          <h1>Доступ запрещён</h1>
          <p>Этот сайт предназначен только для лиц старше 18 лет.</p>
        </div>
      </div>
    `;
  }
}

/* ---------- SHARED HEADER / FOOTER ---------- */
function renderHeader(active) {
  return `
    <header class="header">
      <div class="container header-inner">
        <a class="logo" href="/index.html" aria-label="TYAG МОСКВА">
          <span class="logo-stamp">
            <span class="stamp-main">TYAG</span>
            <span class="stamp-sub">МОСКВА</span>
          </span>
        </a>
        <form class="search" role="search" onsubmit="event.preventDefault(); doSearch();">
          <span class="icon">${ICON.search}</span>
          <input id="search-input" type="search" placeholder="Поиск по каталогу" />
        </form>
        <nav class="header-actions">
          <a class="icon-btn" href="/favorites.html" data-fav-count><span class="badge">0</span>${ICON.heart}<span>Избранное</span></a>
          <a class="icon-btn" href="/cart.html" data-cart-count><span class="badge">0</span>${ICON.cart}<span>Корзина</span></a>
        </nav>
      </div>
    </header>
    <nav class="tabs">
      <div class="container tabs-inner">
        <a class="tab ${active==='catalog'?'active':''}" href="/catalog.html">Каталог</a>
        <a class="tab ${active==='about'?'active':''}" href="/about.html">О нас</a>
        <a class="tab ${active==='delivery'?'active':''}" href="/delivery.html">Оплата и доставка</a>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-warning">
          <strong>Внимание!</strong> Продукция содержит никотин. Никотин вызывает зависимость. Запрещено продавать лицам, не достигшим 18 лет.
        </div>
        <div class="footer-grid">
          <div>
            <a class="logo" href="/index.html" style="margin-bottom: 14px; display: inline-flex;">
              <span class="logo-stamp"><span class="stamp-main">TYAG</span><span class="stamp-sub">МОСКВА</span></span>
            </a>
            <p style="color: var(--text-muted); font-size: 13px; margin-top: 12px; line-height: 1.6;">
              Оптовый магазин вейпов в Москве. Только оригинальная продукция, прямые поставки от производителей.
            </p>
            <div class="socials">
              <a href="https://t.me/tyagmoskva" target="_blank" rel="noopener" aria-label="Telegram">${ICON.tg}</a>
              <a href="#" aria-label="WhatsApp">${ICON.whatsapp}</a>
              <a href="#" aria-label="ВКонтакте">${ICON.vk}</a>
            </div>
          </div>
          <div>
            <h4>Каталог</h4>
            <ul>
              <li><a href="/catalog.html?cat=disposable">Одноразовые</a></li>
              <li><a href="/catalog.html?cat=pod">Многоразовые</a></li>
              <li><a href="/catalog.html?cat=liquid">Жидкости</a></li>
              <li><a href="/catalog.html?cat=accessory">Аксессуары</a></li>
              <li><a href="/catalog.html?cat=consumable">Расходники</a></li>
            </ul>
          </div>
          <div>
            <h4>Магазин</h4>
            <ul>
              <li><a href="/about.html">О нас</a></li>
              <li><a href="/delivery.html">Оплата и доставка</a></li>
              <li><a href="/favorites.html">Избранное</a></li>
              <li><a href="/cart.html">Корзина</a></li>
            </ul>
          </div>
          <div>
            <h4>Контакты</h4>
            <ul>
              <li><a href="tel:+79991234567">+7 (999) 123-45-67</a></li>
              <li><a href="https://t.me/tyagmoskva" target="_blank" rel="noopener">@tyagmoskva</a></li>
              <li><a href="mailto:info@tyagmoskva.ru">info@tyagmoskva.ru</a></li>
              <li>Москва, ежедневно 10:00–22:00</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} TYAG МОСКВА. Все права защищены.</span>
          <span>Продажа лицам старше 18 лет.</span>
        </div>
      </div>
    </footer>
    <nav class="bottom-nav">
      <a href="/index.html" class="${page==='home'?'active':''}">${ICON.home}<span>Главная</span></a>
      <a href="/catalog.html" class="${page==='catalog'?'active':''}">${ICON.grid}<span>Каталог</span></a>
      <a href="/favorites.html" class="${page==='favorites'?'active':''}" data-fav-count><span class="badge">0</span>${ICON.heart}<span>Избранное</span></a>
      <a href="/cart.html" class="${page==='cart'?'active':''}" data-cart-count><span class="badge">0</span>${ICON.cart}<span>Корзина</span></a>
      <a href="/about.html" class="${page==='about'?'active':''}">${ICON.user}<span>О нас</span></a>
    </nav>
  `;
}

function renderAgeModal() {
  return `
    <div id="age-modal" class="age-modal hidden" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div class="age-card">
        <div class="age-card-head">
          <div class="age-big">18+</div>
          <div class="age-logo">
            <span class="logo-stamp">
              <span class="stamp-main">TYAG</span>
              <span class="stamp-sub">МОСКВА</span>
            </span>
          </div>
        </div>
        <h2 id="age-title" class="age-title">Вам больше 18 лет?</h2>
        <p class="age-text">
          Данный Сайт не является рекламой, так как предназначен для ограниченного круга лиц,
          а именно для совершеннолетних потребителей табачной продукции (граждан России старше 18 лет)
          для предоставления им достоверной информации об основных потребительских свойствах и
          качественных характеристик табачной продукции и аксессуарах для курения
          (п.1 и п.2 ст.10 Закона «О защите прав Потребителя»).
          Лицам, не достигшим совершеннолетия, пользование Сайтом запрещено.
          (ст. 20 ФЗ №15 «Об охране здоровья граждан..»)
          При переходе на сайт я подтверждаю, что мне уже исполнилось 18 лет, я являюсь потребителем
          табака или иной никотинсодержащей продукции и даю согласие на обработку персональных данных.
        </p>
        <div class="age-actions">
          <button class="btn btn-yes" onclick="confirmAge(true)">Больше 18</button>
          <button class="btn btn-no"  onclick="confirmAge(false)">Меньше 18</button>
        </div>
      </div>
    </div>
  `;
}

/* ---------- PRODUCT CARD ---------- */
function productCard(p) {
  return `
    <a class="product-card" href="/product.html?id=${encodeURIComponent(p.id)}" data-id="${p.id}">
      ${p.popular ? '' : ''}
      <button class="product-fav ${isFav(p.id) ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); onToggleFav('${p.id}', this);" aria-label="В избранное">
        ${isFav(p.id) ? ICON.heartFill : ICON.heart}
      </button>
      <div class="product-image">
        ${p.popular ? '<span class="badge-popular">Хит</span>' : ''}
        ${vapeSvg(p)}
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-flavor">${p.flavor}</div>
      <div class="product-price">${formatPrice(p.price)}</div>
    </a>
  `;
}

function onToggleFav(id, btn) {
  const active = toggleFav(id);
  btn.classList.toggle('active', active);
  btn.innerHTML = active ? ICON.heartFill : ICON.heart;
  toast(active ? 'Добавлено в избранное' : 'Удалено из избранного');
}

/* ---------- CATEGORY CARD ---------- */
function categoryCard(cat) {
  const n = getCategoryCount(cat.id);
  return `
    <a class="cat-card" href="/catalog.html?cat=${cat.id}">
      <div class="cat-card-icon">${categoryIcon(cat.id)}</div>
      <div>
        <div class="cat-card-title">${cat.title}</div>
        <div class="cat-card-count">${n} ${pluralRu(n, 'товар', 'товара', 'товаров')}</div>
      </div>
    </a>
  `;
}

function pluralRu(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

/* ---------- SEARCH ---------- */
function doSearch() {
  const q = document.getElementById('search-input').value.trim();
  if (!q) return;
  location.href = `/catalog.html?q=${encodeURIComponent(q)}`;
}

/* ---------- INIT ---------- */
let page = 'home';
function initLayout(opts = {}) {
  page = opts.page || 'home';
  const headerHost = document.getElementById('site-header');
  const footerHost = document.getElementById('site-footer');
  const modalHost  = document.getElementById('site-modal');
  if (headerHost) headerHost.innerHTML = renderHeader(opts.activeTab || 'catalog');
  if (footerHost) footerHost.innerHTML = renderFooter();
  if (modalHost)  modalHost.innerHTML  = renderAgeModal();
  maybeShowAgeModal();
  updateBadges();
  // preserve search from query
  const q = new URL(location.href).searchParams.get('q');
  if (q) { const s = document.getElementById('search-input'); if (s) s.value = q; }
}
