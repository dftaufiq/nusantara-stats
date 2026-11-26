// Nusantara Stats — hand-drawn SVG charts. No library, no network: every
// chart is built from the verified series in data.js and rendered as inline
// SVG, so the page works from its own files alone.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Vertical bar chart with value labels on every bar and a year axis.
// values: number[], labels: string[] (same length), opts: {height, color,
// highlightIndex, format, yLabel}.
export function barChart(values, labels, opts = {}) {
  const w = 760;
  const h = opts.height || 260;
  const padL = 46;
  const padB = 30;
  const padT = 26;
  const padR = 10;
  const color = opts.color || '#0e5a52';
  const hiColor = opts.highlightColor || '#e8a020';
  const fmt = opts.format || ((v) => String(v));
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const n = values.length;
  const slot = plotW / n;
  const bw = Math.min(44, slot * 0.62);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || 'Diagram batang')}">`;
  // Gridlines: 4 rows.
  for (let g = 0; g <= 4; g++) {
    const v = min + (span * g) / 4;
    const y = padT + plotH - ((v - min) / span) * plotH;
    s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="#d8d3c4" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5a655f">${esc(fmt(v))}</text>`;
  }
  values.forEach((v, i) => {
    const x = padL + slot * i + (slot - bw) / 2;
    const bh = ((v - min) / span) * plotH;
    const y = padT + plotH - bh;
    const fill = i === opts.highlightIndex ? hiColor : color;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2b2a">${esc(fmt(v))}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5a655f">${esc(labels[i])}</text>`;
  });
  s += '</svg>';
  return s;
}

// Line chart with dots and value labels, for series that cross zero (growth).
export function lineChart(values, labels, opts = {}) {
  const w = 760;
  const h = opts.height || 260;
  const padL = 46;
  const padB = 30;
  const padT = 28;
  const padR = 16;
  const color = opts.color || '#0e5a52';
  const fmt = opts.format || ((v) => String(v));
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const n = values.length;
  const px = (i) => padL + (plotW * i) / (n - 1);
  const py = (v) => padT + plotH - ((v - min) / span) * plotH;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || 'Diagram garis')}">`;
  for (let g = 0; g <= 4; g++) {
    const v = min + (span * g) / 4;
    const y = py(v);
    s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="#d8d3c4" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5a655f">${esc(fmt(v))}</text>`;
  }
  // Zero line, heavier, when the series crosses zero.
  if (min < 0) {
    s += `<line x1="${padL}" y1="${py(0).toFixed(1)}" x2="${w - padR}" y2="${py(0).toFixed(1)}" stroke="#8a938e" stroke-width="1.5"/>`;
  }
  const pts = values.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    const cx = px(i);
    const cy = py(v);
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="#f6f4ec" stroke="${color}" stroke-width="2.5"/>`;
    const above = cy - 12 < padT - 4;
    s += `<text x="${cx.toFixed(1)}" y="${(above ? cy + 18 : cy - 10).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2b2a">${esc(fmt(v))}</text>`;
    s += `<text x="${cx.toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5a655f">${esc(labels[i])}</text>`;
  });
  s += '</svg>';
  return s;
}

// Horizontal bars for shares (sectors, age structure, islands). rows:
// [{label, value, note}]. Values are percentages of a stated whole.
export function shareBars(rows, opts = {}) {
  const w = 760;
  const rowH = opts.rowHeight || 52;
  const h = rows.length * rowH + 14;
  const labelW = opts.labelWidth || 250;
  const padR = 64;
  const color = opts.color || '#0e5a52';
  const max = opts.max || 100;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || 'Diagram batang horizontal')}">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - padR) * r.value) / max;
    s += `<text x="0" y="${y + 19}" font-size="13.5" font-weight="600" fill="#1c2b2a">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y + 4}" width="${Math.max(bw, 2).toFixed(1)}" height="20" rx="4" fill="${i === 0 ? '#e8a020' : color}"/>`;
    s += `<text x="${(labelW + bw + 8).toFixed(1)}" y="${y + 20}" font-size="13.5" font-weight="700" fill="#1c2b2a">${r.value.toLocaleString('id-ID')}%</text>`;
  });
  s += '</svg>';
  return s;
}

// Tiny sparkline bars for the hero panel (population 2015–2024).
export function sparkBars(values, opts = {}) {
  const w = opts.width || 300;
  const h = opts.height || 64;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const n = values.length;
  const slot = w / n;
  const bw = Math.max(6, slot * 0.55);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Tren penduduk 2015–2024">`;
  values.forEach((v, i) => {
    const bh = 8 + ((v - min) / span) * (h - 12);
    const x = slot * i + (slot - bw) / 2;
    s += `<rect x="${x.toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${i === n - 1 ? '#e8a020' : '#ffffff'}" opacity="${i === n - 1 ? 1 : 0.55}"/>`;
  });
  s += '</svg>';
  return s;
}
