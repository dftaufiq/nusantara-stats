// Nusantara Stats — all figures verified live against the World Bank Open Data
// API (api.worldbank.org, WDI) on 2026-11-27, plus BPS 2024 province figures
// and Dukcapil DKB Semester I 2024 island shares. Every figure shown on the
// site carries its source and year next to it. No figure here is guessed:
// where the World Bank has no value for a year, the series stops at the last
// verified year and the page says so.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Each series is indexed by YEARS (2015..2024) unless noted otherwise.
export const SERIES = {
  // Population, total (millions). WDI SP.POP.TOTL.
  population: [261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5],
  // Population growth (annual %). WDI SP.POP.GROW.
  popGrowth: [1.12, 1.07, 1.02, 0.97, 0.94, 0.85, 0.70, 0.75, 0.84, 0.81],
  // Urban population (% of total). WDI SP.URB.TOTL.IN.ZS.
  urban: [53.2, 53.8, 54.5, 55.1, 55.7, 56.3, 56.9, 57.5, 58.1, 58.8],
  // Population density (people per sq km). WDI EN.POP.DNST.
  density: [139.4, 140.9, 142.4, 143.8, 145.1, 146.4, 146.2, 147.3, 148.6, 149.8],
  // Fertility rate (births per woman). WDI SP.DYN.TFRT.IN.
  fertility: [2.35, 2.31, 2.25, 2.22, 2.21, 2.19, 2.17, 2.15, 2.13, 2.12],
  // GDP (current US$, trillions). WDI NY.GDP.MKTP.CD.
  gdp: [0.861, 0.932, 1.016, 1.042, 1.119, 1.059, 1.187, 1.319, 1.371, 1.396],
  // GDP per capita (current US$). WDI NY.GDP.PCAP.CD.
  gdpPerCapita: [3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925],
  // GDP growth (annual %). WDI NY.GDP.MKTP.KD.ZG.
  gdpGrowth: [4.9, 5.0, 5.1, 5.2, 5.0, -2.1, 3.7, 5.3, 5.0, 5.0],
  // GNI per capita, Atlas method (current US$). WDI NY.GNP.PCAP.CD.
  gniPerCapita: [3390, 3370, 3490, 3810, 4020, 3850, 4130, 4520, 4810, 4920],
  // Exports of goods and services (% of GDP). WDI NE.EXP.GNFS.ZS.
  exports: [21.2, 19.1, 20.2, 21.0, 18.6, 17.3, 21.4, 24.5, 21.8, 22.3],
  // Imports of goods and services (% of GDP). WDI NE.IMP.GNFS.ZS.
  imports: [20.8, 18.3, 19.2, 22.1, 19.0, 15.6, 18.8, 21.0, 19.7, 20.5],
  // Inflation, consumer prices (annual %). WDI FP.CPI.TOTL.ZG.
  cpi: [6.4, 3.5, 3.8, 3.2, 3.0, 1.9, 1.6, 4.2, 3.7, 2.2],
  // Unemployment, total (% of labour force, modelled ILO estimate). WDI SL.UEM.TOTL.ZS.
  unemployment: [4.5, 4.3, 3.8, 4.4, 3.6, 4.3, 3.8, 3.5, 3.3, 3.3],
  // Poverty headcount at $3.00/day (2021 PPP, % of population). WDI SI.POV.DDAY.
  poverty: [21.6, 18.0, 14.8, 12.5, 10.9, 9.8, 8.6, 7.9, 6.7, 5.4],
  // Individuals using the Internet (% of population). WDI IT.NET.USER.ZS.
  internet: [22.1, 25.4, 32.3, 39.9, 47.7, 53.7, 62.1, 66.5, 69.2, 72.8],
  // Life expectancy at birth (years). WDI SP.DYN.LE00.IN.
  lifeExpectancy: [69.5, 69.7, 70.0, 70.1, 70.3, 68.8, 67.5, 70.9, 71.1, 71.3],
  // School enrolment, primary (% gross). WDI SE.PRM.ENRR.
  primaryEnrolment: [108.0, 105.9, 104.4, 103.3, 101.3, 101.0, 100.3, 98.7, 98.2, 100.0],
  // Current health expenditure (% of GDP). WDI SH.XPD.CHEX.GD.ZS.
  // World Bank has no 2024 value yet (latest verified: 2023, 2.7%).
  healthSpend: [2.9, 3.0, 2.9, 2.9, 2.9, 3.4, 3.7, 2.7, 2.7],
  healthSpendYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
};

// Age structure, 2024 (% of total population). WDI SP.POP.0014.TO.ZS /
// SP.POP.65UP.TO.ZS; the 15–64 share is the remainder (100 − 24.6 − 7.3).
export const AGE_2024 = [
  { label: '0–14 tahun', value: 24.6, note: 'World Bank WDI, 2024' },
  { label: '15–64 tahun', value: 68.1, note: 'Sisa dari 100% (World Bank WDI, 2024)' },
  { label: '65+ tahun', value: 7.3, note: 'World Bank WDI, 2024' },
];

// GDP by sector, 2024 (% of GDP). WDI NV.AGR.TOTL.ZS / NV.IND.TOTL.ZS /
// NV.SRV.TOTL.ZS. The three shares sum to 95.7%; the remaining 4.3% is net
// taxes on products, which WDI does not attribute to a sector.
export const SECTORS_2024 = [
  { label: 'Jasa', value: 43.8, note: 'World Bank WDI, 2024' },
  { label: 'Industri (termasuk konstruksi)', value: 39.3, note: 'World Bank WDI, 2024' },
  { label: 'Pertanian, kehutanan & perikanan', value: 12.6, note: 'World Bank WDI, 2024' },
];

// Ten largest provinces by population, 2024 (millions). BPS 2024, as cited in
// BPS province tables (Jawa Barat 50.345.190; Jawa Timur 41.919.910;
// Jawa Tengah 37.892.280; Sumatera Utara 15.588.500; Banten 12.431.390;
// DKI Jakarta 10,70 jt; Sulawesi Selatan 9,50 jt; Lampung 9,40 jt;
// Sumatera Selatan 8,80 jt; Riau 6,70 jt). Values rounded to 0.1 million.
export const PROVINCES_2024 = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 50.3 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.9 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.9 },
  { name: 'Sumatera Utara', island: 'Sumatra', pop: 15.6 },
  { name: 'Banten', island: 'Jawa', pop: 12.4 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.7 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.5 },
  { name: 'Lampung', island: 'Sumatra', pop: 9.4 },
  { name: 'Sumatera Selatan', island: 'Sumatra', pop: 8.8 },
  { name: 'Riau', island: 'Sumatra', pop: 6.7 },
];

// Population share by island, Semester I 2024 (%). Dukcapil Kemendagri,
// Data Kependudukan Bersih (DKB) Semester I 2024: total 282.477.584 jiwa.
export const ISLAND_SHARES_2024 = [
  { island: 'Jawa', share: 55.9 },
  { island: 'Sumatra', share: 21.8 },
  { island: 'Sulawesi', share: 7.4 },
  { island: 'Kalimantan', share: 6.2 },
  { island: 'Bali & Nusa Tenggara', share: 5.6 },
  { island: 'Papua', share: 2.0 },
  { island: 'Maluku', share: 1.2 },
];

// Headline key figures for the home page, each with its latest verified year.
export const HEADLINES = [
  { label: 'Penduduk', value: '283,5 jt', year: 2024, source: 'World Bank WDI' },
  { label: 'PDB', value: '$1,40 trln', year: 2024, source: 'World Bank WDI' },
  { label: 'PDB per kapita', value: '$4.925', year: 2024, source: 'World Bank WDI' },
  { label: 'Pertumbuhan PDB', value: '5,0%', year: 2024, source: 'World Bank WDI' },
  { label: 'Pengangguran', value: '3,3%', year: 2024, source: 'World Bank / ILO' },
  { label: 'Kemiskinan ($3/hari)', value: '5,4%', year: 2024, source: 'World Bank WDI' },
  { label: 'Harapan hidup', value: '71,3 thn', year: 2024, source: 'World Bank WDI' },
  { label: 'Pengguna internet', value: '72,8%', year: 2024, source: 'World Bank WDI' },
];

// Full indicator catalogue for the data explorer: id, name, unit, series key,
// latest year shown, source. The explorer's year selector re-renders this table.
export const INDICATORS = [
  { id: 'pop', name: 'Jumlah penduduk', unit: 'juta jiwa', key: 'population', source: 'World Bank WDI' },
  { id: 'popgrowth', name: 'Pertumbuhan penduduk', unit: '% per tahun', key: 'popGrowth', source: 'World Bank WDI' },
  { id: 'urban', name: 'Penduduk perkotaan', unit: '% dari total', key: 'urban', source: 'World Bank WDI' },
  { id: 'density', name: 'Kepadatan penduduk', unit: 'jiwa/km²', key: 'density', source: 'World Bank WDI' },
  { id: 'fertility', name: 'Angka fertilitas', unit: 'kelahiran per perempuan', key: 'fertility', source: 'World Bank WDI' },
  { id: 'gdp', name: 'PDB (harga berlaku)', unit: 'US$ triliun', key: 'gdp', source: 'World Bank WDI' },
  { id: 'gdppc', name: 'PDB per kapita', unit: 'US$', key: 'gdpPerCapita', source: 'World Bank WDI' },
  { id: 'gdpgrowth', name: 'Pertumbuhan PDB', unit: '% per tahun', key: 'gdpGrowth', source: 'World Bank WDI' },
  { id: 'gnipc', name: 'PNB per kapita (metode Atlas)', unit: 'US$', key: 'gniPerCapita', source: 'World Bank WDI' },
  { id: 'exports', name: 'Ekspor barang & jasa', unit: '% dari PDB', key: 'exports', source: 'World Bank WDI' },
  { id: 'imports', name: 'Impor barang & jasa', unit: '% dari PDB', key: 'imports', source: 'World Bank WDI' },
  { id: 'cpi', name: 'Inflasi (harga konsumen)', unit: '% per tahun', key: 'cpi', source: 'World Bank WDI' },
  { id: 'unemp', name: 'Pengangguran', unit: '% angkatan kerja (est. ILO)', key: 'unemployment', source: 'World Bank / ILO' },
  { id: 'poverty', name: 'Kemiskinan ($3,00/hari, PPP 2021)', unit: '% penduduk', key: 'poverty', source: 'World Bank WDI' },
  { id: 'internet', name: 'Pengguna internet', unit: '% penduduk', key: 'internet', source: 'World Bank WDI' },
  { id: 'lifeexp', name: 'Harapan hidup saat lahir', unit: 'tahun', key: 'lifeExpectancy', source: 'World Bank WDI' },
  { id: 'enrol', name: 'Partisipasi sekolah dasar (bruto)', unit: '%', key: 'primaryEnrolment', source: 'World Bank WDI' },
];

// Formatting helpers shared by the views.
export function fmtNum(n, decimals = 1) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
export function yearIndex(year) {
  return YEARS.indexOf(year);
}
