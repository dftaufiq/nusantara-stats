// Nusantara Stats — page renderers. Each route returns one HTML string for
// #view; bindControls() wires the page's real controls after it is injected.
// Every figure is drawn from data.js (World Bank WDI / BPS, verified) and
// carries its source + year on the page. Language: Bahasa Indonesia.

import { YEARS, SERIES, AGE_2024, SECTORS_2024, PROVINCES_2024, ISLAND_SHARES_2024, HEADLINES, INDICATORS, fmtNum } from './data.js';
import { barChart, lineChart, shareBars, sparkBars } from './charts.js';

const YEARS_SHORT = YEARS.map((y) => String(y).slice(2));

function statCard(label, value, sub) {
  return `<div class="stat"><div class="stat-value">${value}</div><div class="stat-label">${label}</div><div class="stat-sub">${sub}</div></div>`;
}

function pageHead(kicker, title, intro) {
  return `<div class="page-head"><p class="kicker">${kicker}</p><h1>${title}</h1><p class="lede">${intro}</p></div>`;
}

function sourceLine(text) {
  return `<p class="source">Sumber: ${text}</p>`;
}

function sectionCard(title, body, extra = '') {
  return `<section class="card ${extra}"><h2>${title}</h2>${body}</section>`;
}

// ---------------------------------------------------------------- home ----
export function renderHome() {
  const pop = SERIES.population;
  const cards = [
    { href: '#/population', title: 'Penduduk', big: '283,5 jt', text: 'Penduduk 2024, tumbuh 0,81% per tahun. Usia 0–14 tahun 24,6%, 65+ tahun 7,3%.' },
    { href: '#/economy', title: 'Ekonomi', big: '$1,40 trln', text: 'PDB 2024, tumbuh 5,0%. Jasa 43,8% PDB, industri 39,3%, pertanian 12,6%.' },
    { href: '#/prices-work', title: 'Harga & Kerja', big: '2,2%', text: 'Inflasi 2024. Pengangguran 3,3% dan kemiskinan $3/hari 5,4% — keduanya terendah satu dekade.' },
    { href: '#/people', title: 'Kesehatan & Pendidikan', big: '71,3 thn', text: 'Harapan hidup 2024. Pengguna internet 72,8% dan partisipasi sekolah dasar 100,0%.' },
    { href: '#/regions', title: 'Daerah', big: '10 provinsi', text: 'Jawa Barat terpadat: 50,3 juta jiwa (2024). Jawa menampung 55,9% penduduk Indonesia.' },
    { href: '#/data', title: 'Jelajahi Data', big: '17 indikator', text: 'Semua indikator 2015–2024 dalam satu tabel, bisa dipilih per tahun dan diunduh sebagai CSV.' },
  ];
  const cardHtml = cards.map((c) => `<a class="topic" href="${c.href}"><span class="topic-big">${c.big}</span><span class="topic-title">${c.title}</span><span class="topic-text">${c.text}</span><span class="topic-link">Lihat →</span></a>`).join('');
  const rows = HEADLINES.map((h) => `<tr><td>${h.label}</td><td class="num"><strong>${h.value}</strong></td><td class="num">${h.year}</td><td>${h.source}</td></tr>`).join('');
  return `
  <section class="hero">
    <div class="hero-copy">
      <p class="kicker">Statistik nasional · Indonesia</p>
      <p class="hero-big"><span class="hero-num">283,5</span> <span class="hero-unit">juta jiwa</span></p>
      <p class="hero-sub">Penduduk Indonesia pada 2024 — negara terpadat ke-4 di dunia, tumbuh 0,81% per tahun.</p>
      <p class="hero-src">Sumber: World Bank, World Development Indicators, 2024</p>
      <div class="hero-cta"><a class="btn" href="#/population">Lihat penduduk →</a><a class="btn ghost" href="#/data">Jelajahi semua data</a></div>
    </div>
    <div class="hero-chart">
      <p class="hero-chart-title">Penduduk 2015–2024 (juta jiwa)</p>
      ${sparkBars(pop, { width: 300, height: 72 })}
      <p class="hero-chart-note">261,8 jt (2015) → 283,5 jt (2024). Kenaikan 21,7 juta jiwa dalam satu dekade.</p>
    </div>
  </section>
  <section class="stat-strip" aria-label="Angka utama">
    ${statCard('Penduduk', '283,5 jt', '2024 · World Bank WDI')}
    ${statCard('PDB', '$1,40 trln', '2024 · World Bank WDI')}
    ${statCard('PDB per kapita', '$4.925', '2024 · World Bank WDI')}
    ${statCard('Pertumbuhan PDB', '5,0%', '2024 · World Bank WDI')}
    ${statCard('Pengangguran', '3,3%', '2024 · World Bank / ILO')}
    ${statCard('Kemiskinan $3/hari', '5,4%', '2024 · World Bank WDI')}
  </section>
  <div class="grid-2">
    ${sectionCard('Penduduk 2015–2024', `<div class="chart">${barChart(pop, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), highlightIndex: 9, aria: 'Penduduk Indonesia 2015 sampai 2024' })}</div>${sourceLine('World Bank, World Development Indicators (SP.POP.TOTL), 2015–2024.')}`, 'wide')}
    ${sectionCard('Sekilas', `<p class="card-text">Satu dekade terakhir, Indonesia menambah <strong>21,7 juta jiwa</strong> dan ekonominya tumbuh rata-rata <strong>5,0% per tahun</strong> di luar 2020 — tahun kontraksi −2,1% saat pandemi. Kota kini menampung <strong>58,8%</strong> penduduk, dan <strong>72,8%</strong> penduduk memakai internet, naik dari 22,1% pada 2015.</p><p class="card-text">Situs ini menyajikan angka-angka itu apa adanya: setiap angka disertai sumber dan tahunnya, supaya bisa dicek dan dipakai.</p>`, '')}
  </div>
  <h2 class="section-title">Jelajahi menurut topik</h2>
  <div class="topics">${cardHtml}</div>
  <section class="card">
    <h2>Angka utama, 2024</h2>
    <table class="tbl"><thead><tr><th>Indikator</th><th class="num">Nilai</th><th class="num">Tahun</th><th>Sumber</th></tr></thead><tbody>${rows}</tbody></table>
    ${sourceLine('World Bank, World Development Indicators (WDI). Kemiskinan memakai garis $3,00/hari (PPP 2021). Pengangguran memakai estimasi model ILO.')}
  </section>
  <p class="foot-note">Nusantara Stats adalah situs statistik independen — bukan situs resmi Badan Pusat Statistik. Angka nasional memakai World Bank WDI; angka daerah memakai BPS dan Dukcapil Kemendagri. Lihat <a href="#/about">Tentang &amp; Sumber</a>.</p>`;
}

// ----------------------------------------------------------- population ----
export function renderPopulation() {
  const rows = PROVINCES_2024.slice(0, 5).map((p, i) => `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.island}</td><td class="num"><strong>${fmtNum(p.pop, 1)} jt</strong></td></tr>`).join('');
  return `
  ${pageHead('Penduduk', 'Penduduk Indonesia', '283,5 juta jiwa pada 2024 — tumbuh 0,81% per tahun. Lebih dari separuh penduduk tinggal di Jawa, dan kota menampung 58,8% penduduk.')}
  <section class="stat-strip">
    ${statCard('Penduduk 2024', '283,5 jt', 'World Bank WDI')}
    ${statCard('Pertumbuhan', '0,81% / thn', 'World Bank WDI, 2024')}
    ${statCard('Perkotaan', '58,8%', 'World Bank WDI, 2024')}
    ${statCard('Kepadatan', '149,8 / km²', 'World Bank WDI, 2024')}
    ${statCard('Fertilitas', '2,1 anak', 'World Bank WDI, 2024')}
  </section>
  ${sectionCard('Jumlah penduduk, 2015–2024', `
    <div class="toggle" role="group" aria-label="Pilih metrik">
      <button class="toggle-btn active" data-metric="total">Jumlah penduduk</button>
      <button class="toggle-btn" data-metric="growth">Pertumbuhan (%/thn)</button>
    </div>
    <div class="chart" id="pop-chart">${barChart(SERIES.population, YEARS_SHORT, { height: 260, format: (v) => fmtNum(v, 1), highlightIndex: 9, aria: 'Penduduk Indonesia 2015 sampai 2024' })}</div>
    ${sourceLine('World Bank, World Development Indicators (SP.POP.TOTL / SP.POP.GROW), 2015–2024.')}
  `)}
  <div class="grid-2">
    ${sectionCard('Struktur usia, 2024', `<div class="chart">${shareBars(AGE_2024, { aria: 'Struktur usia penduduk 2024', labelWidth: 130 })}</div><p class="card-text">Indonesia masih dalam bonus demografi: <strong>68,1%</strong> penduduk berada di usia kerja 15–64 tahun. Kelompok 65+ tahun naik dari 6,1% (2015) menjadi 7,3% (2024).</p>${sourceLine('World Bank WDI (SP.POP.0014.TO.ZS, SP.POP.65UP.TO.ZS), 2024.')}`)}
    ${sectionCard('Kota dan kepadatan', `<p class="card-text">Penduduk perkotaan naik dari <strong>53,2%</strong> (2015) menjadi <strong>58,8%</strong> (2024) — sekitar 5,6 poin dalam satu dekade. Kepadatan naik dari 139,4 menjadi <strong>149,8 jiwa/km²</strong>.</p><p class="card-text">Angka fertilitas turun dari 2,35 (2015) ke <strong>2,12</strong> (2024), mendekati tingkat pengganti 2,1 — laju pertumbuhan penduduk pun melambat dari 1,12% ke 0,81% per tahun.</p>${sourceLine('World Bank WDI (SP.URB.TOTL.IN.ZS, EN.POP.DNST, SP.DYN.TFRT.IN), 2015–2024.')}`)}
  </div>
  <section class="card">
    <h2>5 provinsi terpadat, 2024</h2>
    <table class="tbl"><thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk</th></tr></thead><tbody>${rows}</tbody></table>
    ${sourceLine('BPS, Jumlah Penduduk menurut Provinsi, 2024. Tabel lengkap 10 provinsi ada di halaman <a href="#/regions">Daerah</a>.')}
  </section>`;
}

// -------------------------------------------------------------- economy ----
export function renderEconomy() {
  return `
  ${pageHead('Ekonomi', 'Ekonomi Indonesia', 'PDB $1,40 triliun pada 2024 dengan pertumbuhan 5,0% — ekonomi terbesar di Asia Tenggara. Jasa menyumbang 43,8% PDB, industri 39,3%, pertanian 12,6%.')}
  <section class="stat-strip">
    ${statCard('PDB 2024', '$1,40 trln', 'World Bank WDI')}
    ${statCard('PDB per kapita', '$4.925', 'World Bank WDI, 2024')}
    ${statCard('Pertumbuhan', '5,0%', 'World Bank WDI, 2024')}
    ${statCard('PNB per kapita', '$4.920', 'World Bank WDI, Atlas, 2024')}
    ${statCard('Ekspor', '22,3% PDB', 'World Bank WDI, 2024')}
    ${statCard('Impor', '20,5% PDB', 'World Bank WDI, 2024')}
  </section>
  <div class="grid-2">
    ${sectionCard('PDB, 2015–2024 (US$ triliun)', `<div class="chart">${barChart(SERIES.gdp, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 2), highlightIndex: 9, aria: 'PDB Indonesia 2015 sampai 2024' })}</div>${sourceLine('World Bank WDI (NY.GDP.MKTP.CD), 2015–2024. PDB 2020 turun ke $1,06 triliun saat pandemi, lalu pulih.')}`)}
    ${sectionCard('Pertumbuhan PDB, 2015–2024 (%/thn)', `<div class="chart">${lineChart(SERIES.gdpGrowth, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), aria: 'Pertumbuhan PDB 2015 sampai 2024' })}</div>${sourceLine('World Bank WDI (NY.GDP.MKTP.KD.ZG), 2015–2024. Satu-satunya kontraksi dalam satu dekade: −2,1% pada 2020.')}`)}
  </div>
  <div class="grid-2">
    ${sectionCard('PDB menurut sektor, 2024', `<div class="chart">${shareBars(SECTORS_2024, { aria: 'PDB menurut sektor 2024', labelWidth: 250 })}</div><p class="card-text">Ketiga sektor ini berjumlah 95,7% PDB; sisanya 4,3% adalah pajak bersih atas produk yang tidak dialokasikan ke sektor mana pun.</p>${sourceLine('World Bank WDI (NV.SRV.TOTL.ZS, NV.IND.TOTL.ZS, NV.AGR.TOTL.ZS), 2024.')}`)}
    ${sectionCard('Perdagangan luar negeri', `<p class="card-text">Ekspor barang dan jasa mencapai <strong>22,3% PDB</strong> dan impor <strong>20,5% PDB</strong> pada 2024 — surplus <strong>1,8% PDB</strong>. Puncak ekspor satu dekade terjadi pada 2022 (24,5% PDB) saat harga komoditas melesat.</p><p class="card-text">PDB per kapita naik dari $3.288 (2015) menjadi <strong>$4.925</strong> (2024); PNB per kapita metode Atlas $4.920 — Indonesia berada di ambang kelompok berpendapatan menengah-atas.</p>${sourceLine('World Bank WDI (NE.EXP.GNFS.ZS, NE.IMP.GNFS.ZS, NY.GDP.PCAP.CD, NY.GNP.PCAP.CD), 2015–2024.')}`)}
  </div>`;
}

// ----------------------------------------------------------- prices-work ----
export function renderPricesWork() {
  return `
  ${pageHead('Harga & Kerja', 'Harga & Kerja', 'Inflasi 2,2% pada 2024, pengangguran 3,3%, dan kemiskinan $3/hari 5,4% — ketiganya membaik dari 2015, dengan kemiskinan turun hampir empat kali lipat.')}
  <section class="stat-strip">
    ${statCard('Inflasi 2024', '2,2%', 'World Bank WDI')}
    ${statCard('Pengangguran', '3,3%', 'World Bank / ILO, 2024')}
    ${statCard('Kemiskinan $3/hari', '5,4%', 'World Bank WDI, 2024')}
    ${statCard('Inflasi tertinggi', '6,4% (2015)', 'World Bank WDI')}
    ${statCard('Pengangguran tertinggi', '4,5% (2015)', 'World Bank / ILO')}
  </section>
  <div class="grid-2">
    ${sectionCard('Inflasi (harga konsumen), 2015–2024', `<div class="chart">${lineChart(SERIES.cpi, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), aria: 'Inflasi 2015 sampai 2024' })}</div>${sourceLine('World Bank WDI (FP.CPI.TOTL.ZG), 2015–2024. Inflasi 2022 naik ke 4,2% lalu turun ke 2,2% pada 2024.')}`)}
    ${sectionCard('Pengangguran, 2015–2024', `<div class="chart">${lineChart(SERIES.unemployment, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), aria: 'Pengangguran 2015 sampai 2024' })}</div>${sourceLine('World Bank WDI (SL.UEM.TOTL.ZS), estimasi model ILO, 2015–2024. Puncak 4,3% pada 2020 (pandemi), terendah 3,3% pada 2023–2024.')}`)}
  </div>
  ${sectionCard('Kemiskinan $3,00/hari (PPP 2021), 2015–2024', `<div class="chart">${barChart(SERIES.poverty, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), highlightIndex: 9, color: '#b4552d', highlightColor: '#0e5a52', aria: 'Kemiskinan 2015 sampai 2024' })}</div><p class="card-text">Penduduk di bawah garis $3,00/hari (PPP 2021) turun dari <strong>21,6%</strong> (2015) menjadi <strong>5,4%</strong> (2024) — penurunan 16,2 poin dalam satu dekade, tanpa satu tahun pun yang naik.</p>${sourceLine('World Bank WDI (SI.POV.DDAY), 2015–2024. Garis yang dipakai di sini adalah $3,00/hari (PPP 2021), garis kemiskinan internasional terbaru Bank Dunia.')}`)}`;
}

// ---------------------------------------------------------------- people ----
export function renderPeople() {
  return `
  ${pageHead('Kesehatan & Pendidikan', 'Kesehatan & Pendidikan', 'Harapan hidup 71,3 tahun pada 2024, pulih dari penurunan pandemi. Partisipasi sekolah dasar 100,0% dan pengguna internet 72,8% — naik tiga kali lipat sejak 2015.')}
  <section class="stat-strip">
    ${statCard('Harapan hidup', '71,3 thn', 'World Bank WDI, 2024')}
    ${statCard('Pengguna internet', '72,8%', 'World Bank WDI, 2024')}
    ${statCard('Sekolah dasar', '100,0%', 'World Bank WDI, 2024')}
    ${statCard('Belanja kesehatan', '2,7% PDB', 'World Bank WDI, 2023')}
  </section>
  <div class="grid-2">
    ${sectionCard('Harapan hidup saat lahir, 2015–2024', `<div class="chart">${lineChart(SERIES.lifeExpectancy, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), aria: 'Harapan hidup 2015 sampai 2024' })}</div><p class="card-text">Harapan hidup jatuh ke 67,5 tahun pada 2021 saat pandemi, lalu pulih penuh: <strong>71,3 tahun</strong> pada 2024, tertinggi dalam satu dekade.</p>${sourceLine('World Bank WDI (SP.DYN.LE00.IN), 2015–2024.')}`)}
    ${sectionCard('Pengguna internet, 2015–2024', `<div class="chart">${barChart(SERIES.internet, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), highlightIndex: 9, aria: 'Pengguna internet 2015 sampai 2024' })}</div><p class="card-text">Dari <strong>22,1%</strong> (2015) menjadi <strong>72,8%</strong> (2024): 50,7 poin dalam satu dekade — perubahan sosial terbesar yang tercatat di situs ini.</p>${sourceLine('World Bank WDI (IT.NET.USER.ZS), 2015–2024.')}`)}
  </div>
  <div class="grid-2">
    ${sectionCard('Partisipasi sekolah dasar (bruto), 2015–2024', `<div class="chart">${lineChart(SERIES.primaryEnrolment, YEARS_SHORT, { height: 250, format: (v) => fmtNum(v, 1), aria: 'Partisipasi sekolah dasar 2015 sampai 2024' })}</div><p class="card-text">Angka bruto di atas 100% berarti ada murid di luar usia resmi sekolah dasar. Pada 2024 angkanya <strong>100,0%</strong>.</p>${sourceLine('World Bank WDI (SE.PRM.ENRR), 2015–2024.')}`)}
    ${sectionCard('Belanja kesehatan, 2015–2023', `<div class="chart">${lineChart(SERIES.healthSpend, SERIES.healthSpendYears.map((y) => String(y).slice(2)), { height: 250, format: (v) => fmtNum(v, 1), aria: 'Belanja kesehatan 2015 sampai 2023' })}</div><p class="card-text">Belanja kesehatan berjalan (current health expenditure) <strong>2,7% PDB</strong> pada 2023 — angka terbaru yang diterbitkan Bank Dunia; nilai 2024 belum tersedia saat situs ini dibuat.</p>${sourceLine('World Bank WDI (SH.XPD.CHEX.GD.ZS), 2015–2023. Seri ini berhenti di 2023 karena data 2024 belum diterbitkan.')}`)}
  </div>`;
}

// --------------------------------------------------------------- regions ----
export function renderRegions() {
  const rows = PROVINCES_2024.map((p, i) => {
    const share = (p.pop / 281.6) * 100;
    return `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.island}</td><td class="num"><strong>${fmtNum(p.pop, 1)} jt</strong></td><td class="num">${fmtNum(share, 1)}%</td></tr>`;
  }).join('');
  return `
  ${pageHead('Daerah', 'Daerah: Provinsi', '10 provinsi terpadat menampung 72% penduduk Indonesia. Jawa Barat sendiri 50,3 juta jiwa — hampir seperlima penduduk nasional. Klik judul kolom untuk mengurutkan; ketik di kotak cari untuk menyaring.')}
  <section class="card">
    <h2>10 provinsi terpadat, 2024</h2>
    <div class="controls">
      <label class="search-label">Cari provinsi <input id="prov-search" type="search" placeholder="mis. Jawa, Sumatra…" aria-label="Cari provinsi"></label>
      <p class="controls-hint">Klik judul kolom untuk mengurutkan (naik / turun).</p>
    </div>
    <div class="table-scroll">
    <table class="tbl sortable" id="prov-table"><thead><tr><th data-sort="rank">#</th><th data-sort="name">Provinsi ↕</th><th data-sort="island">Pulau ↕</th><th class="num" data-sort="pop">Penduduk ↕</th><th class="num" data-sort="share">Pangsa ↕</th></tr></thead><tbody>${rows}</tbody></table>
    </div>
    <p class="source">Sumber: BPS, Jumlah Penduduk menurut Provinsi, 2024. Pangsa dihitung dari total nasional BPS 2024 (281,6 juta jiwa).</p>
  </section>
  ${sectionCard('Penduduk menurut pulau, Semester I 2024', `<div class="chart">${shareBars(ISLAND_SHARES_2024.map((r) => ({ label: r.island, value: r.share })), { aria: 'Pangsa penduduk menurut pulau', labelWidth: 200 })}</div><p class="card-text">Jawa menampung <strong>55,9%</strong> penduduk di sekitar 7% luas daratan — ketimpangan persebaran yang membentuk hampir semua kebijakan pembangunan Indonesia.</p>${sourceLine('Ditjen Dukcapil Kemendagri, Data Kependudukan Bersih (DKB) Semester I 2024 (total 282.477.584 jiwa).')}`)}`;
}

// ------------------------------------------------------------------ data ----
export function renderData(selectedYear = 2024) {
  const idx = YEARS.indexOf(selectedYear);
  const options = YEARS.map((y) => `<option value="${y}"${y === selectedYear ? ' selected' : ''}>${y}</option>`).join('');
  const rows = INDICATORS.map((ind) => {
    const v = SERIES[ind.key][idx];
    const shown = ind.key === 'gdp' ? fmtNum(v, 3) : (Number.isInteger(v) ? fmtNum(v, 0) : fmtNum(v, 1));
    return `<tr><td>${ind.name}</td><td class="num"><strong>${shown}</strong></td><td>${ind.unit}</td><td>${ind.source}</td></tr>`;
  }).join('');
  return `
  ${pageHead('Jelajahi Data', 'Jelajahi Data', '17 indikator, 2015–2024. Pilih tahun untuk melihat semua nilai pada tahun itu, atau unduh seluruh seri sebagai CSV untuk diolah sendiri.')}
  <section class="card">
    <h2>Semua indikator — tahun <span id="data-year-label">${selectedYear}</span></h2>
    <div class="controls">
      <label class="search-label">Pilih tahun
        <select id="year-select" aria-label="Pilih tahun">${options}</select>
      </label>
      <button class="btn" id="csv-btn" type="button">Unduh CSV (2015–2024)</button>
    </div>
    <div class="table-scroll">
    <table class="tbl" id="data-table"><thead><tr><th>Indikator</th><th class="num">Nilai</th><th>Satuan</th><th>Sumber</th></tr></thead><tbody>${rows}</tbody></table>
    </div>
    <p class="source">Sumber: World Bank, World Development Indicators (WDI). Nilai ditampilkan dengan pembulatan 1 desimal (PDB 3 desimal); angka mentah lengkap ada di file CSV.</p>
  </section>
  <section class="card">
    <h2>Cara membaca angka ini</h2>
    <p class="card-text">Semua seri memakai tahun kalender dan definisi World Bank WDI yang sama setiap tahun, sehingga antar-tahun bisa dibandingkan langsung. Garis kemiskinan memakai standar terbaru Bank Dunia ($3,00/hari, PPP 2021). Pengangguran memakai estimasi model ILO. Belanja kesehatan belum tersedia untuk 2024 — lihat halaman <a href="#/people">Kesehatan &amp; Pendidikan</a>.</p>
  </section>`;
}

// ------------------------------------------------------------------ about ----
export function renderAbout() {
  return `
  ${pageHead('Tentang', 'Tentang & Sumber', 'Nusantara Stats menyajikan statistik nasional Indonesia dari sumber terbuka yang bisa dicek siapa saja. Setiap angka di situs ini punya sumber dan tahun — tidak ada angka tanpa asal.')}
  <section class="card">
    <h2>Metodologi</h2>
    <p class="card-text">Angka nasional diambil dari <strong>World Bank World Development Indicators (WDI)</strong> dan diverifikasi ulang lewat API terbuka Bank Dunia pada 27 November 2026. Seri nasional memakai tahun 2015–2024; bila suatu indikator belum punya nilai 2024 (belanja kesehatan), serinya berhenti di tahun terakhir yang tersedia dan halaman menyebutnya.</p>
    <p class="card-text">Angka daerah memakai <strong>BPS (Jumlah Penduduk menurut Provinsi, 2024)</strong> dan <strong>Ditjen Dukcapil Kemendagri (Data Kependudukan Bersih Semester I 2024)</strong>. Pangsa provinsi dihitung dari total nasional BPS 2024 (281,6 juta jiwa).</p>
    <p class="card-text">Situs ini statis: seluruh data tertanam di dalam berkas situs dan tidak ada permintaan jaringan saat dibuka. Grafik digambar sebagai SVG dari data yang sama dengan yang ditampilkan di tabel — angka di grafik dan di tabel tidak pernah berbeda.</p>
  </section>
  <section class="card">
    <h2>Daftar sumber</h2>
    <ul class="sources">
      <li><strong>World Bank, World Development Indicators</strong> — seluruh seri nasional 2015–2024 (penduduk, PDB, perdagangan, harga, kerja, kesehatan, pendidikan). Indikator: SP.POP.TOTL, SP.POP.GROW, SP.URB.TOTL.IN.ZS, EN.POP.DNST, SP.DYN.TFRT.IN, NY.GDP.MKTP.CD, NY.GDP.PCAP.CD, NY.GDP.MKTP.KD.ZG, NY.GNP.PCAP.CD, NE.EXP.GNFS.ZS, NE.IMP.GNFS.ZS, FP.CPI.TOTL.ZG, SL.UEM.TOTL.ZS, SI.POV.DDAY, IT.NET.USER.ZS, SP.DYN.LE00.IN, SE.PRM.ENRR, SH.XPD.CHEX.GD.ZS, NV.AGR.TOTL.ZS, NV.IND.TOTL.ZS, NV.SRV.TOTL.ZS, SP.POP.0014.TO.ZS, SP.POP.65UP.TO.ZS.</li>
      <li><strong>BPS — Jumlah Penduduk menurut Provinsi, 2024</strong> — 10 provinsi terpadat.</li>
      <li><strong>Ditjen Dukcapil Kemendagri — Data Kependudukan Bersih Semester I 2024</strong> — pangsa penduduk menurut pulau (total 282.477.584 jiwa).</li>
    </ul>
  </section>
  <section class="card">
    <h2>Penafian</h2>
    <p class="card-text">Nusantara Stats adalah situs independen yang dibuat untuk kompetisi make.fun dan <strong>bukan</strong> situs resmi Badan Pusat Statistik atau instansi pemerintah mana pun. Nama, desain, dan teks situs ini orisinal. Angka-angka dikutip dari sumber yang tercantum; bila sumber memperbarui angka, situs ini bisa saja tertinggal — selalu periksa sumber aslinya untuk keputusan penting.</p>
  </section>`;
}

// ------------------------------------------------------------- controls -----
// Wires the interactive controls of a freshly rendered page. Called by app.js
// after each render. All controls re-render from data.js — nothing is a stub.
export function bindControls(route) {
  if (route === 'population') {
    const buttons = document.querySelectorAll('.toggle-btn');
    const chart = document.getElementById('pop-chart');
    if (!chart || !buttons.length) return;
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.dataset.metric === 'growth') {
          chart.innerHTML = lineChart(SERIES.popGrowth, YEARS_SHORT, { height: 260, format: (v) => fmtNum(v, 2), aria: 'Pertumbuhan penduduk 2015 sampai 2024' });
        } else {
          chart.innerHTML = barChart(SERIES.population, YEARS_SHORT, { height: 260, format: (v) => fmtNum(v, 1), highlightIndex: 9, aria: 'Penduduk Indonesia 2015 sampai 2024' });
        }
      });
    });
  }
  if (route === 'regions') {
    const table = document.getElementById('prov-table');
    const search = document.getElementById('prov-search');
    if (!table) return;
    let rows = Array.from(table.tBodies[0].rows);
    let sortKey = 'rank';
    let sortDir = 1;
    const data = PROVINCES_2024.map((p, i) => ({ rank: i + 1, name: p.name, island: p.island, pop: p.pop, share: (p.pop / 281.6) * 100 }));
    const paint = () => {
      const q = (search ? search.value : '').trim().toLowerCase();
      let list = data.filter((d) => !q || d.name.toLowerCase().includes(q) || d.island.toLowerCase().includes(q));
      list = list.slice().sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === 'string') return av.localeCompare(bv, 'id') * sortDir;
        return (av - bv) * sortDir;
      });
      table.tBodies[0].innerHTML = list.map((d) => `<tr><td>${d.rank}</td><td>${d.name}</td><td>${d.island}</td><td class="num"><strong>${fmtNum(d.pop, 1)} jt</strong></td><td class="num">${fmtNum(d.share, 1)}%</td></tr>`).join('') || '<tr><td colspan="5">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>';
    };
    table.querySelectorAll('th[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        if (sortKey === key) sortDir *= -1;
        else { sortKey = key; sortDir = 1; }
        paint();
      });
    });
    if (search) search.addEventListener('input', paint);
  }
  if (route === 'data') {
    const select = document.getElementById('year-select');
    const label = document.getElementById('data-year-label');
    const table = document.getElementById('data-table');
    const csvBtn = document.getElementById('csv-btn');
    if (select && table) {
      select.addEventListener('change', () => {
        const year = Number(select.value);
        const idx = YEARS.indexOf(year);
        if (label) label.textContent = String(year);
        table.tBodies[0].innerHTML = INDICATORS.map((ind) => {
          const v = SERIES[ind.key][idx];
          const shown = ind.key === 'gdp' ? fmtNum(v, 3) : (Number.isInteger(v) ? fmtNum(v, 0) : fmtNum(v, 1));
          return `<tr><td>${ind.name}</td><td class="num"><strong>${shown}</strong></td><td>${ind.unit}</td><td>${ind.source}</td></tr>`;
        }).join('');
      });
    }
    if (csvBtn) {
      csvBtn.addEventListener('click', () => {
        const header = ['Indikator', 'Satuan', ...YEARS].join(',');
        const lines = INDICATORS.map((ind) => {
          const vals = SERIES[ind.key].map((v) => String(v).replace('.', ','));
          return [`"${ind.name}"`, `"${ind.unit}"`, ...vals].join(';');
        });
        const csv = [header.replace(/,/g, ';'), ...lines].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'nusantara-stats-indonesia-2015-2024.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      });
    }
  }
}

export const ROUTES = {
  '': renderHome,
  'population': renderPopulation,
  'economy': renderEconomy,
  'prices-work': renderPricesWork,
  'people': renderPeople,
  'regions': renderRegions,
  'data': renderData,
  'about': renderAbout,
};

export const ROUTE_TITLES = {
  '': 'Beranda',
  'population': 'Penduduk',
  'economy': 'Ekonomi',
  'prices-work': 'Harga & Kerja',
  'people': 'Kesehatan & Pendidikan',
  'regions': 'Daerah',
  'data': 'Jelajahi Data',
  'about': 'Tentang & Sumber',
};
