---
layout: post
title: "VBA Automation — Survey Data Processing"
date: 2023-11-03 9:00:00 +0300
categories: [Projet_Data, Personnel]
tags: [Excel, VBA, Automatisation, Débrouillardise]
---

<div class="lang-block lang-en" markdown="1">

## VBA Automation — Survey Data Processing
**Personal project · Problem-solving · Excel Scripts**

---

### Context

A food waste awareness survey generated text responses on a 5-point scale ("not at all" → "enormously"). The data needed to be numeric for analysis — 8 categories, ~100 respondents, manual conversion was not an option.

Built an Excel Script to automate the full pipeline: text-to-number conversion, per-question averages, and a formatted summary table across all 8 waste categories (food, energy, electronics, plastic, water, natural resources × 3).

---

### Script (excerpt)

```javascript
function main(workbook: ExcelScript.Workbook) {
  let sheet = workbook.getActiveWorksheet();
  sheet.replaceAll("Énormément", "4", { completeMatch: false, matchCase: false });
  sheet.replaceAll("beaucoup",   "3", { completeMatch: false, matchCase: false });
  sheet.replaceAll("Moyennement","2", { completeMatch: false, matchCase: false });
  sheet.replaceAll("Légèrement", "1", { completeMatch: false, matchCase: false });
  sheet.replaceAll("Pas du tout","0", { completeMatch: false, matchCase: false });
  // compute averages → move to summary sheet
}
```

**Stack:** Excel · ExcelScript (VBA/Office 365)

---

### Outcome

Automated conversion of ~100 text responses across 8 categories. Summary table generated in a separate sheet with formatted averages. Analysis-ready in seconds instead of hours.

*What it shows: when data isn't in the right format and manual conversion doesn't scale, I write the tool.*

</div>

<div class="lang-block lang-fr" markdown="1">

## Automatisation VBA — Traitement de données d'enquête
**Projet personnel · Résolution de problème · Excel Scripts**

---

### Contexte

Un questionnaire sur la sensibilisation au gaspillage générait des réponses textuelles sur une échelle à 5 niveaux ("pas du tout" → "énormément"). Les données devaient être numériques pour l'analyse — 8 catégories, ~100 répondants, la conversion manuelle n'était pas envisageable.

Script Excel développé pour automatiser tout le pipeline : conversion texte → chiffre, moyennes par question, tableau récapitulatif formaté sur 8 catégories de gaspillage (alimentaire, énergétique, électronique, plastique, eau, ressources naturelles × 3).

---

### Script (extrait)

```javascript
function main(workbook: ExcelScript.Workbook) {
  let sheet = workbook.getActiveWorksheet();
  sheet.replaceAll("Énormément", "4", { completeMatch: false, matchCase: false });
  sheet.replaceAll("beaucoup",   "3", { completeMatch: false, matchCase: false });
  sheet.replaceAll("Moyennement","2", { completeMatch: false, matchCase: false });
  sheet.replaceAll("Légèrement", "1", { completeMatch: false, matchCase: false });
  sheet.replaceAll("Pas du tout","0", { completeMatch: false, matchCase: false });
  // calcul des moyennes → déplacement vers feuille récapitulative
}
```

**Stack :** Excel · ExcelScript (VBA/Office 365)

---

### Résultat

Conversion automatisée de ~100 réponses textuelles sur 8 catégories. Tableau récapitulatif généré dans une feuille séparée avec moyennes formatées. Données prêtes pour analyse en quelques secondes au lieu de plusieurs heures.

*Ce que ça montre : quand les données ne sont pas dans le bon format et que la conversion manuelle ne passe pas à l'échelle, j'écris l'outil.*

</div>
