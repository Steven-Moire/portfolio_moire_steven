---
layout: post
title: "Nutrition App — Meal Planning & Nutritional Tracking"
date: 2025-06-01 09:00:00 +0100
categories: [Projet_Data, Personnel]
tags: [Python, Flask, JSON, CIQUAL, Débrouillardise, Auto-formation]
permalink: /projects/nutrition-app/
---

<div class="lang-block lang-en" markdown="1">

# 🟡 Nutrition App — Meal Planning & Nutritional Tracking
**Personal project · Flask prototype · In development**

---

## Context

A personal project built from a practical need: planning meals for the week, tracking nutritional intake without an app that sells your data, and building on a real reference dataset (CIQUAL — the French national food composition database published by ANSES).

---

## Features

| Feature | Status |
|---|---|
| CIQUAL ingredient database (345 items · full nutritional values) | ✅ Implemented |
| Recipe library (64 historical recipes encoded in JSON) | ✅ Implemented |
| Weekly batch cooking planner | 🔄 In progress |
| Per-meal nutritional tracking | 🔄 In progress |
| Shopping list generation | 📋 Planned |

---

## Data Model

```
Ingredient
  ├── id (CIQUAL code)
  ├── name
  ├── calories  (kcal / 100g)
  ├── proteins  (g / 100g)
  ├── carbs     (g / 100g)
  ├── fat       (g / 100g)
  └── fiber     (g / 100g)

Recipe
  ├── id
  ├── name
  ├── ingredients: [{ ingredient_id, quantity_g }]
  └── computed_nutritional_profile

MealPlan
  ├── week
  ├── days: { monday: [recipe_id, ...], ... }
  └── weekly_nutritional_summary
```

---

## Stack

| Layer | Technology |
|---|---|
| Backend | Flask (Python) |
| Frontend | Jinja2 templates |
| Data | CIQUAL JSON · Recipe JSON (64 recipes) |

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟡 Application Nutrition — Planification repas & suivi nutritionnel
**Projet personnel · Prototype Flask · En développement**

---

## Contexte

Projet personnel né d'un besoin concret : planifier les repas de la semaine, tracker les apports nutritionnels sans application qui revend les données, en s'appuyant sur un vrai dataset de référence (CIQUAL — base de composition nutritionnelle des aliments publiée par l'ANSES).

---

## Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| Base CIQUAL (345 ingrédients · valeurs nutritionnelles complètes) | ✅ Implémenté |
| Bibliothèque de recettes (64 recettes historiques encodées en JSON) | ✅ Implémenté |
| Planificateur de batch cooking hebdomadaire | 🔄 En cours |
| Suivi nutritionnel par repas | 🔄 En cours |
| Génération de liste de courses | 📋 Planifié |

---

## Modèle de données

```
Ingrédient
  ├── id (code CIQUAL)
  ├── nom
  ├── calories  (kcal / 100g)
  ├── protéines (g / 100g)
  ├── glucides  (g / 100g)
  ├── lipides   (g / 100g)
  └── fibres    (g / 100g)

Recette
  ├── id
  ├── nom
  ├── ingrédients: [{ ingredient_id, quantite_g }]
  └── profil_nutritionnel_calculé

PlanRepas
  ├── semaine
  ├── jours: { lundi: [recette_id, ...], ... }
  └── bilan_nutritionnel_hebdomadaire
```

---

## Stack

| Couche | Technologie |
|---|---|
| Backend | Flask (Python) |
| Frontend | Templates Jinja2 |
| Données | JSON CIQUAL · JSON recettes (64 recettes) |

</div>
