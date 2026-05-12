// Otimiza todas as fotos em public/cars/
// Gera: XX.webp (full, 1200px, q82) + XX-thumb.webp (thumb, 600px, q75)
// Remove os JPEGs originais

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const CARS_DIR = "public/cars";

async function processCar(carDir) {
  const files = await fs.readdir(carDir);
  const jpegs = files.filter((f) => f.endsWith(".jpeg"));
  if (jpegs.length === 0) return { count: 0, savedBytes: 0 };

  let originalBytes = 0;
  let newBytes = 0;

  await Promise.all(
    jpegs.map(async (file) => {
      const filePath = path.join(carDir, file);
      const name = path.basename(file, ".jpeg");
      const fullOut = path.join(carDir, `${name}.webp`);
      const thumbOut = path.join(carDir, `${name}-thumb.webp`);

      const origStat = await fs.stat(filePath);
      originalBytes += origStat.size;

      await Promise.all([
        sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(fullOut),
        sharp(filePath)
          .resize({ width: 600, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(thumbOut),
      ]);

      const [fullStat, thumbStat] = await Promise.all([fs.stat(fullOut), fs.stat(thumbOut)]);
      newBytes += fullStat.size + thumbStat.size;

      await fs.unlink(filePath);
    }),
  );

  return { count: jpegs.length, originalBytes, newBytes };
}

async function main() {
  const dirs = await fs.readdir(CARS_DIR);
  let totalCount = 0;
  let totalOrig = 0;
  let totalNew = 0;

  console.log(`\n→ Processando ${dirs.length} pastas em ${CARS_DIR}/\n`);

  for (const dir of dirs) {
    const fullDir = path.join(CARS_DIR, dir);
    const stat = await fs.stat(fullDir);
    if (!stat.isDirectory()) continue;

    const result = await processCar(fullDir);
    totalCount += result.count;
    totalOrig += result.originalBytes || 0;
    totalNew += result.newBytes || 0;

    const mb = (b) => (b / 1024 / 1024).toFixed(1);
    console.log(`  ✓ ${dir.padEnd(45)} ${result.count} fotos · ${mb(result.originalBytes || 0)}MB → ${mb(result.newBytes || 0)}MB`);
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  const reduction = ((1 - totalNew / totalOrig) * 100).toFixed(1);

  console.log(`\n═══════════════════════════════════════`);
  console.log(`  ${totalCount} fotos processadas`);
  console.log(`  ${mb(totalOrig)}MB → ${mb(totalNew)}MB`);
  console.log(`  Redução: ${reduction}%`);
  console.log(`═══════════════════════════════════════\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
