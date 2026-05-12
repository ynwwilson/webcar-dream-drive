// WebCar — catálogo de veículos
// Dados extraídos do site real webcarmg.com.br em 2026-05-11
// Total: 40 carros, 680 fotos em alta resolução

export type Car = {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  year: number;
  yearFabricacao: number | null;
  price: number;
  km: number;
  fuel: "Flex" | "Diesel" | "Gasolina" | "Elétrico" | "Híbrido";
  transmission: "Automático" | "Manual";
  color: string;
  doors: number;
  image: string;
  gallery: string[];
  description: string;
  options: string[];
};

// Helper pra gerar galeria de imagens automaticamente (WebP full quality)
const gallery = (slug: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/cars/${slug}/${String(i + 1).padStart(2, "0")}.webp`);

// Helper pra extrair opcionais comuns da descrição
const extractOptions = (desc: string): string[] => {
  const opts: string[] = [];
  if (/couro/i.test(desc)) opts.push("Bancos em couro");
  if (/teto solar/i.test(desc)) opts.push("Teto solar");
  if (/4x4/i.test(desc)) opts.push("Tração 4x4");
  if (/ar.digital|dual zone/i.test(desc)) opts.push("Ar-condicionado digital");
  if (/c[âa]mera de r[ée]|c[âa]mera 360/i.test(desc)) opts.push("Câmera de ré");
  if (/Apple CarPlay/i.test(desc)) opts.push("Apple CarPlay");
  if (/Android Auto/i.test(desc)) opts.push("Android Auto");
  if (/multim[íi]dia/i.test(desc)) opts.push("Multimídia touchscreen");
  if (/dire[çc][ãa]o el[ée]trica/i.test(desc)) opts.push("Direção elétrica");
  if (/autônom|adaptativ|piloto/i.test(desc)) opts.push("Piloto automático");
  if (/turbo/i.test(desc)) opts.push("Motor turbo");
  if (/AMG|M Sport|RS|esportiv/i.test(desc)) opts.push("Pacote esportivo");
  return opts.slice(0, 6);
};

// Helper pra construir 1 carro
const car = (
  id: string,
  slug: string,
  brand: string,
  model: string,
  year: number,
  yearFabricacao: number | null,
  price: number,
  km: number,
  fuel: Car["fuel"],
  transmission: Car["transmission"],
  color: string,
  description: string,
  photoCount: number,
  doors = 4,
): Car => ({
  id,
  brand,
  model,
  fullName: `${brand} ${model} ${year}`,
  year,
  yearFabricacao,
  price,
  km,
  fuel,
  transmission,
  color,
  doors,
  image: `/cars/${slug}/01-thumb.webp`,
  gallery: gallery(slug, photoCount),
  description,
  options: extractOptions(description),
});

// ════════════════════════════════════════════════════════
// 40 CARROS — ordenados por preço descendente
// ════════════════════════════════════════════════════════

export const cars: Car[] = [
  car("944522", "944522-ford-ranger-limited", "Ford", "Ranger Limited+ V6", 2026, null, 319900, 11100, "Diesel", "Automático", "Prata", "Ford Ranger Limited+ 3.0 V6 Turbo Diesel 4x4 Automática. Motor V6 bruto com desempenho impressionante, tração 4x4, versão topo de linha com bancos em couro premium.", 23),
  car("962043", "962043-ram-1500-rebel-v8", "RAM", "1500 Rebel V8 HEMI", 2022, 2022, 305900, 68100, "Gasolina", "Automático", "Cinza", "Ram 1500 Rebel 5.7 HEMI V8 4x4 com motor de ~400 cv, tração 4x4, câmbio automático, bancos em couro premium, multimídia com Apple CarPlay.", 29),
  car("943495", "943495-ford-ranger", "Ford", "Ranger XLT V6", 2026, null, 264900, 35000, "Diesel", "Automático", "Cinza", "Ford Ranger XLT 3.0 V6 Turbo Diesel 4x4 Automática. Motor potente, tração 4x4, câmbio automático, versão XLT completa com multimídia SYNC, Apple CarPlay, Android Auto, câmera de ré.", 22),
  car("951701", "951701-bmw-ix3", "BMW", "iX3 M Sport", 2023, 2022, 249900, 74600, "Elétrico", "Automático", "Cinza", "BMW iX3 M Sport 100% elétrico. Autonomia ~460km, carregamento rápido DC, teto solar, couro, Apple CarPlay, câmeras 360°, piloto automático adaptativo.", 25),
  car("957803", "957803-chevrolet-s10-ltz-v3", "Chevrolet", "S10 LTZ Diesel", 2024, 2023, 199900, 81300, "Diesel", "Automático", "Prata", "Chevrolet S10 LTZ 2.8 Turbo Diesel 4x4 Automática Cabine Dupla. Motor turbo diesel com alto torque, tração 4x4, câmbio automático, versão topo de linha com couro.", 17),
  car("956666", "956666-chevrolet-s10-hcountry", "Chevrolet", "S10 High Country", 2023, 2022, 192900, 80800, "Diesel", "Automático", "Preta", "Chevrolet S10 High Country 2.8 Turbo Diesel 4x4 cabine dupla. Motor turbo diesel com alto torque, tração 4x4, câmbio automático, bancos em couro premium, multimídia com Apple CarPlay.", 16),
  car("957671", "957671-toyota-hilux-srv", "Toyota", "Hilux SRV", 2021, 2020, 189900, 58300, "Flex", "Automático", "Branca", "Toyota Hilux SRV 2.7 Flex Automática Cabine Dupla. Motor 2.7 Flex 16V, tração 4x2, versão SRV completa, ar digital, bancos em couro, Apple CarPlay e Android Auto.", 21),
  car("872684", "872684-ram-rampage-rebel", "RAM", "Rampage Rebel", 2024, 2024, 189900, 40970, "Diesel", "Automático", "Prata", "Picape moderna e robusta com motor 2.0 Turbo Diesel, câmbio automático, tração 4x4, bancos em couro, central multimídia com touchscreen, Bluetooth, Apple CarPlay e Android Auto.", 14),
  car("941791", "941791-chevrolet-s10-ltz-v2", "Chevrolet", "S10 LTZ", 2024, null, 189900, 107100, "Diesel", "Automático", "Cinza", "Chevrolet S10 LTZ 2.8 Turbo Diesel 4x4 Automática. Motor potente, tração 4x4, interior em couro, Apple CarPlay, câmera de ré.", 17),
  car("957708", "957708-toyota-hilux-sw4", "Toyota", "Hilux SW4 SRX", 2016, 2016, 188900, 185900, "Diesel", "Automático", "Branca", "Toyota Hilux SW4 SRX 2.8 Turbo Diesel 4x4 Automática. Motor forte e econômico, tração 4x4 com reduzida, versão topo de linha SRX com bancos em couro e câmera de ré.", 19),
  car("898385", "898385-chevrolet-s10", "Chevrolet", "S10 LTZ Diesel", 2023, 2022, 179900, 93500, "Diesel", "Automático", "Branca", "Chevrolet S10 Pick-Up LTZ 2.8 TDI 4x4 CD com motor turbo diesel, câmbio automático, tração 4x4, cabine dupla, ar digital, bancos em couro, multimídia touchscreen.", 13),
  car("952407", "952407-jeep-commander-overland", "Jeep", "Commander Overland", 2023, 2022, 175900, 66800, "Diesel", "Automático", "Cinza", "Jeep Commander Overland TD380 2.0 Turbo Diesel 4x4 Automática. SUV 7 lugares com motor turbo diesel forte e econômico, tração 4x4, câmbio automático 9 marchas, teto solar panorâmico.", 21),
  car("962493", "962493-chevrolet-trailblazer", "Chevrolet", "Trailblazer Premier", 2020, 2019, 174900, 135900, "Diesel", "Automático", "Prata", "Chevrolet Trailblazer Premier 2.8 Turbo Diesel Automática. SUV 7 lugares com tração 4x4, motor turbo diesel, câmbio automático, versão topo de linha Premier com bancos em couro.", 16),
  car("946446", "946446-toyota-hilux-cd-sr", "Toyota", "Hilux CD SR", 2019, null, 163900, 163100, "Flex", "Automático", "Branca", "Toyota Hilux SR 2.7 Flex Automática Cabine Dupla. Picape ideal para quem busca durabilidade, conforto e ótimo valor de revenda. Motor 2.7 Flex 16V.", 15),
  car("957992", "957992-fiat-toro-t270", "Fiat", "Toro Volcano T270", 2025, 2024, 149900, 28700, "Flex", "Automático", "Cinza", "Fiat Toro Volcano 1.3 T270 Turbo Flex Automática. Motor turbo flex econômico, câmbio automático, versão completa com tecnologia, ar digital dual zone, bancos em couro, multimídia com Apple CarPlay e Android Auto, câmera de ré, garantia de fábrica.", 15),
  car("889314", "889314-vw-amarok-highline", "Volkswagen", "Amarok Highline V6", 2020, 2019, 139900, 132800, "Diesel", "Automático", "Preta", "Picape potente, confortável e bem equipada com motor 3.0 V6 Turbo Diesel, tração 4x4, versão Highline, ar digital, bancos em couro, multimídia touchscreen.", 14),
  car("956531", "956531-mercedes-c250-sport", "Mercedes-Benz", "C-250 Sport", 2015, 2015, 134900, 105700, "Gasolina", "Automático", "Preta", "Mercedes-Benz C-250 Sport 2.0 Turbo com 211 cv, teto solar, bancos em couro, câmera de ré, rodas de liga leve e kit AMG.", 21),
  car("914708", "914708-honda-civic", "Honda", "Civic EXL", 2021, 2020, 129900, 92275, "Flex", "Automático", "Cinza", "Motor 2.0 Flex 16V potente e econômico. Câmbio automático CVT. Versão EXL com bancos em couro, Apple CarPlay, Android Auto, ar digital dual zone.", 14),
  car("958405", "958405-fiat-toro-t270-v2", "Fiat", "Toro Volcano T270", 2023, 2023, 129900, 88200, "Flex", "Automático", "Cinza", "Fiat Toro Volcano 1.3 T270 Turbo Flex Automática com motor turbo forte e econômico, tração 4x2, pacote tecnologia, couro, Apple CarPlay, Android Auto e câmera de ré.", 13),
  car("944808", "944808-kia-sorento", "Kia", "Sorento V6", 2018, 2017, 124900, 149100, "Gasolina", "Automático", "Branca", "Motor 3.3 V6 270cv, tração 4x2, 7 lugares, ar-condicionado digital dual zone, bancos em couro, câmera de ré, rodas de liga leve.", 21),
  car("952261", "952261-fiat-strada-ultra", "Fiat", "Strada Ultra Turbo", 2024, 2024, 119900, 76200, "Flex", "Automático", "Branca", "Fiat Strada Ultra 1.0 Turbo Flex Automática Cabine Dupla com motor 1.0 Turbo, câmbio CVT, ar-condicionado, direção elétrica, bancos em couro, multimídia com Apple CarPlay e Android Auto.", 17),
  car("952586", "952586-honda-city-touring", "Honda", "City Sedan Touring", 2023, 2023, 112900, 38900, "Flex", "Automático", "Preta", "Honda City Sedan Touring 1.5 Flex com motor econômico, câmbio CVT, versão topo de linha, ar digital, bancos em couro, multimídia com Apple CarPlay.", 17),
  car("967973", "967973-nissan-kicks", "Nissan", "Kicks Advance", 2024, 2024, 108900, 39600, "Flex", "Automático", "Branca", "Nissan Kicks Advance 1.6 Flex Automático com motor econômico, câmbio CVT, ar digital, direção elétrica, multimídia com Apple CarPlay/Android Auto, câmera de ré e airbags.", 17),
  car("965107", "965107-toyota-corolla", "Toyota", "Corolla XEi", 2019, 2018, 105900, 87600, "Flex", "Automático", "Branca", "Toyota Corolla XEi 2.0 Flex com motor 16V, câmbio CVT, versão completa com ar digital, bancos em couro, câmera de ré e 4 pneus novos.", 16),
  car("935239", "935239-toyota-corolla-xei-v2", "Toyota", "Corolla XEi", 2019, 2018, 103900, 144400, "Flex", "Automático", "Branca", "Toyota Corolla XEi 2.0 Flex com motor 16V, direção elétrica, ar digital, bancos em couro, multimídia Bluetooth/USB, câmera de ré, rodas liga leve.", 16),
  car("948428", "948428-fiat-strada-volcano", "Fiat", "Strada Volcano", 2022, 2022, 103900, 87700, "Flex", "Manual", "Branca", "Fiat Strada Volcano 1.3 Flex Cabine Dupla com motor econômico, ar-condicionado, direção elétrica, multimídia com Apple CarPlay e Android Auto, câmera de ré, pneus novos.", 17),
  car("967285", "967285-toyota-corolla-xrs", "Toyota", "Corolla XRS", 2018, 2017, 102900, 146200, "Flex", "Automático", "Branca", "Motor 2.0 Flex 16V com câmbio automático CVT. Versão XRS com visual esportivo, ar digital dual zone, bancos em couro, câmera de ré e sensores.", 16),
  car("961823", "961823-fiat-toro-volcano-v2", "Fiat", "Toro Volcano 4x4 Diesel", 2019, 2018, 96900, 112900, "Diesel", "Automático", "Branca", "Fiat Toro Volcano 2.0 Turbo Diesel 4x4 Automática. Picape com motor de alto torque, tração integral, versão Volcano completa, ar digital, bancos em couro, câmera de ré.", 18),
  car("905085", "905085-honda-hrv", "Honda", "HR-V Touring", 2018, 2017, 96900, 118400, "Flex", "Automático", "Vermelha", "SUV completo, confortável e muito confiável. Motor 1.8 Flexone 16V, câmbio automático, versão Touring, ar digital, bancos em couro, multimídia touchscreen.", 12),
  car("964699", "964699-chevrolet-tracker", "Chevrolet", "Tracker LT Turbo", 2023, 2023, 95900, 50100, "Flex", "Automático", "Branca", "Chevrolet Tracker LT 1.0 Turbo Flex Automática. Motor econômico e eficiente, câmbio automático, apenas 50 mil km, rodas Premier, OnStar, multimídia com Apple CarPlay.", 17),
  car("956740", "956740-fiat-toro", "Fiat", "Toro Volcano Diesel", 2018, 2017, 94900, 91100, "Diesel", "Automático", "Preta", "Fiat Toro Volcano 2.0 Turbo Diesel 4x4 Automática. Motor 2.0 Turbo Diesel, tração 4x4, versão Volcano muito completa com ar digital, bancos em couro, câmera de ré e sensores.", 13),
  car("952732", "952732-honda-city-lx", "Honda", "City Sedan LX", 2021, 2020, 89900, 89500, "Flex", "Automático", "Branca", "Honda City Sedan LX 1.5 Flex 16V com câmbio automático CVT. Motor econômico e eficiente, bem equipado com ar-condicionado, direção elétrica, câmera de ré e sistema de segurança completo.", 16),
  car("846103", "846103-chevrolet-onix-premier", "Chevrolet", "Onix Plus Premier", 2024, 2023, 86900, 75200, "Flex", "Automático", "Prata", "Chevrolet Onix Sedan Plus Premier 1.0 Turbo. Sedã moderno, econômico e cheio de tecnologia com motor turbo, câmbio automático e versão premier.", 15),
  car("947172", "947172-hyundai-ix35", "Hyundai", "ix35 GL", 2019, null, 86900, 130500, "Flex", "Automático", "Cinza", "SUV confortável com motor 2.0 Flex 16V, câmbio automático, tração 4x2. Bem equipado com ar-condicionado, direção elétrica, multimídia Bluetooth, câmera de ré e rodas de liga leve.", 17),
  car("965540", "965540-vw-polo", "Volkswagen", "Polo Comfortline TSI", 2022, 2021, 86900, 67900, "Flex", "Automático", "Branca", "Volkswagen Polo Comfortline 200 TSI 1.0 Flex Automático. Motor 1.0 Turbo econômico e ágil, câmbio automático, versão muito completa com ar digital, direção elétrica, multimídia com Apple CarPlay.", 14),
  car("964088", "964088-hyundai-creta", "Hyundai", "Creta Attitude", 2020, 2019, 84900, 113000, "Flex", "Automático", "Branca", "Hyundai Creta Attitude 1.6 Flex Automático com motor econômico e confiável, ar-condicionado, direção elétrica, câmera de ré, airbags e freios ABS.", 15),
  car("943985", "943985-chevrolet-onix-ltz", "Chevrolet", "Onix Plus LTZ Turbo", 2024, null, 81900, 50100, "Flex", "Automático", "Branca", "Sedan ideal para quem busca baixo consumo, tecnologia e conforto. Motor 1.0 Turbo Flex 12V, câmbio automático, versão LTZ completa com MyLink, Android Auto e Apple CarPlay.", 17),
  car("904134", "904134-jeep-renegade", "Jeep", "Renegade Longitude", 2016, 2016, 66900, 97000, "Flex", "Automático", "Prata", "SUV compacto Jeep Renegade Longitude com motor 1.8 Flex 16V, câmbio automático, versão premium, ar-condicionado, multimídia com Bluetooth e USB.", 14),
  car("946761", "946761-hyundai-hb20-style", "Hyundai", "HB20 C.Style", 2016, 2015, 61900, 73300, "Flex", "Automático", "Branca", "Hyundai HB20 C.Style/C.Plus 1.6 Flex 16V automático. Motor 1.6 Flex econômico, ar-condicionado, direção elétrica, vidros e travas elétricas, multimídia.", 14),
  car("958049", "958049-hyundai-hb20-cplus", "Hyundai", "HB20 C.Plus", 2019, 2019, 59900, 98300, "Flex", "Manual", "Prata", "Hyundai HB20 1.6 Flex Manual com baixo custo de manutenção. Motor 1.6 Flex 16V, ar-condicionado, direção elétrica, vidros e travas elétricas, central multimídia, airbags e freios ABS.", 16),
];

// ════════════════════════════════════════════════════════
// HELPERS PRA USAR NOS COMPONENTES
// ════════════════════════════════════════════════════════

export const getCarById = (id: string): Car | undefined =>
  cars.find((c) => c.id === id);

export const getCarsByBrand = (brand: string): Car[] =>
  cars.filter((c) => c.brand.toLowerCase() === brand.toLowerCase());

export const getBrands = (): string[] =>
  [...new Set(cars.map((c) => c.brand))].sort();

// Top 8 mais caros pra destacar no hero / página inicial
export const carsDestaque: Car[] = cars.slice(0, 8);

// Carros até 100k (filtro "econômicos")
export const carsAteCemMil = cars.filter((c) => c.price <= 100000);

// Estatísticas pra usar no site
export const stats = {
  totalCarros: cars.length,
  totalFotos: cars.reduce((acc, c) => acc + c.gallery.length, 0),
  totalMarcas: new Set(cars.map((c) => c.brand)).size,
  precoMin: Math.min(...cars.map((c) => c.price)),
  precoMax: Math.max(...cars.map((c) => c.price)),
};

// ════════════════════════════════════════════════════════
// FORMATTERS
// ════════════════════════════════════════════════════════

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const formatKM = (v: number) => v.toLocaleString("pt-BR") + " km";
