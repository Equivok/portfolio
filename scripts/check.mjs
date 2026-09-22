import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const widths = [320, 375, 768, 1024, 1440];

const errors = [];

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[w=${width}] console error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[w=${width}] pageerror: ${err.message}`));

  await page.goto(BASE, { waitUntil: 'networkidle' });

  // Pas de débordement horizontal
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (overflow) errors.push(`[w=${width}] Débordement horizontal détecté sur la page d'accueil`);

  // Boutons de secours accessibles présents
  const projBtn = await page.getByRole('button', { name: 'Projets' }).first();
  await projBtn.waitFor({ state: 'visible', timeout: 10000 });

  // Ouvre la modale Projets via le bouton accessible
  await projBtn.click();
  const projectsDialog = page.locator('[role="dialog"][aria-labelledby="projectsModalTitle"]');
  await projectsDialog.waitFor({ state: 'visible', timeout: 5000 });
  const ariaModal = await projectsDialog.getAttribute('aria-modal');
  if (ariaModal !== 'true') errors.push(`[w=${width}] aria-modal manquant sur la modale Projets`);

  // Échap ferme la modale
  await page.keyboard.press('Escape');
  await projectsDialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
    errors.push(`[w=${width}] La modale Projets ne se ferme pas avec Échap`);
  });

  // Modale CV
  await page.getByRole('button', { name: 'CV', exact: true }).first().click();
  const cvDialog = page.locator('[role="dialog"][aria-labelledby="cvModalTitle"]');
  await cvDialog.waitFor({ state: 'visible', timeout: 5000 });
  const cvOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (cvOverflow) errors.push(`[w=${width}] Débordement horizontal détecté avec la modale CV ouverte`);
  await page.keyboard.press('Escape');
  await cvDialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
    errors.push(`[w=${width}] La modale CV ne se ferme pas avec Échap`);
  });

  // Modale Contact + bouton copier
  await page.getByRole('button', { name: 'Contact', exact: true }).first().click();
  const contactDialog = page.locator('[role="dialog"][aria-labelledby="contactModalTitle"]');
  await contactDialog.waitFor({ state: 'visible', timeout: 5000 });
  await page.keyboard.press('Escape');
  await contactDialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
    errors.push(`[w=${width}] La modale Contact ne se ferme pas avec Échap`);
  });

  // Page projet
  await page.goto(`${BASE}/projets/nova-banking-app`, { waitUntil: 'networkidle' });
  const title = await page.title();
  if (!title.includes('Nova')) errors.push(`[w=${width}] Titre de la page projet incorrect : ${title}`);
  const projOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (projOverflow) errors.push(`[w=${width}] Débordement horizontal détecté sur la page projet`);

  await page.close();
}

await browser.close();

if (errors.length > 0) {
  console.error('ERREURS TROUVÉES :');
  errors.forEach((e) => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('OK — Aucune erreur détectée sur les largeurs testées.');
}
