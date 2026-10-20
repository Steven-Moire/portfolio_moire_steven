---
layout: post
title: "Predictive Maintenance: Industrial Cold Chain (PoC)"
title_fr: "Maintenance prédictive : chaîne du froid industrielle"
description: "Anomaly detection proof of concept on 15 cold-chain units: weighted rules from equipment documentation + unsupervised Isolation Forest layer. Not deployed to production."
description_fr: "Preuve de concept de détection d'anomalies sur 15 équipements de chaîne du froid : règles pondérées issues de la documentation équipements + couche Isolation Forest non supervisée. Non déployée en production."
date: 2025-09-01 09:00:00 +0100
categories: [Projet_Data, Professionnel]
tags: [Python, Scikit-learn, FastAPI, Docker, Kubernetes, Isolation-Forest, PoC, GxP, Détection-anomalies, Système-à-règles, Apprentissage-non-supervisé]
permalink: /projects/predictive-maintenance/
---

<div class="lang-block lang-en" markdown="1">

# Predictive Maintenance: Industrial Cold Chain
**International pharmaceutical group · Proof of concept · Anomaly detection**

> Source code is confidential (regulated industrial environment). This document covers architecture, modelling decisions, and results of a proof of concept that was not deployed to production.

---

## Context

The site's cold-chain equipment needed continuous monitoring to detect anomalies before failure. In a pharmaceutical environment, cold-chain failures can cause product degradation, so the business case for early detection is direct and measurable.

The proof of concept covered **15 cold-chain units**, which naturally split into **3 behavioral families**:
- Cycling: periodic temperature patterns (regular oscillation)
- Cold storage: stable low temperature
- Isothermal: minimal variation

---

## Architecture: Weighted Rules + Unsupervised Layer

```
┌─────────────────────────────────────────────────────────────┐
│           DATA INGESTION (temperature readings)             │
│                  15 cold-chain units                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PREPROCESSING                            │
│        Resampling · Feature engineering · Windowing         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                WEIGHTED RULES ENGINE                        │
│     Rules from the equipment technical documentation        │
│              Weighted score out of 100                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│          ISOLATION FOREST LAYER (unsupervised)              │
│      Flags patterns the rules do not describe               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  ANOMALY CLASSIFICATION                     │
│   Score ranges → normal · warning · critical · suspect      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SCORING API                              │
│          FastAPI service · Docker · Kubernetes              │
└─────────────────────────────────────────────────────────────┘
```

---

## How the Approach Evolved

**1. Machine learning, then deep learning.** Both were tried first, with disappointing results.

**2. A weighted rule system built from the technical documentation.** The rules were built through a statistical analysis of the equipment technical documentation. Each documented condition became a weighted rule; the rules combine into a **score out of 100**, and **score ranges map to anomaly categories**. Every alert can be traced back to the documented rule that triggered it. Visual inspection of the curves could separate the normal cycle from deviations, but a deviation is not always an anomaly: opening a door, for example, causes a spike that belongs to normal operation.

**3. An unsupervised Isolation Forest layer on top.** Rules only catch what the documentation anticipates. An Isolation Forest layer, unsupervised so it needs no labels, was added on top of the rule score to surface unusual patterns the rules do not describe.

---

## Stack

| Layer | Technology |
|---|---|
| Rules engine | Python · weighted scoring from equipment documentation |
| Unsupervised layer | Scikit-learn · Isolation Forest |
| API | FastAPI |
| Infrastructure | Docker · Kubernetes |

---

## Results

| Parameter | Value |
|---|---|
| Scope | 15 cold-chain units |
| Behavioral families | 3 (cycling, cold storage, isothermal) |
| Alert traceability | Each alert linked to the documented rule that triggered it |
| Status | Proof of concept, not deployed to production |

</div>

<div class="lang-block lang-fr" markdown="1">

# Maintenance prédictive : chaîne du froid industrielle
**Groupe pharmaceutique international · Preuve de concept · Détection d'anomalies**

> Code source confidentiel (environnement industriel réglementé). Ce document couvre l'architecture, les choix de modélisation et les résultats d'une preuve de concept qui n'a pas été déployée en production.

---

## Contexte

Les équipements de chaîne du froid du site nécessitaient une surveillance continue pour détecter les anomalies avant toute défaillance. Dans un environnement pharmaceutique, une rupture de chaîne du froid peut entraîner la dégradation des produits : le business case pour la détection précoce est direct et mesurable.

La preuve de concept portait sur **15 équipements de chaîne du froid**, répartis naturellement en **3 familles comportementales** :
- Cyclique : oscillation thermique périodique
- Stockage froid : température basse stable
- Isotherme : variation minimale

---

## Architecture : règles pondérées + couche non supervisée

```
┌─────────────────────────────────────────────────────────────┐
│           INGESTION (relevés de température)                │
│              15 équipements chaîne du froid                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRÉTRAITEMENT                            │
│        Rééchantillonnage · Feature engineering · Windowing  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              MOTEUR DE RÈGLES PONDÉRÉES                     │
│   Règles issues de la documentation technique équipements   │
│                Score pondéré sur 100                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│        COUCHE ISOLATION FOREST (non supervisée)             │
│   Signale les comportements que les règles ne décrivent pas │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 CLASSIFICATION D'ANOMALIES                  │
│   Plages de score → normal · warning · critical · suspect   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API DE SCORING                           │
│          Service FastAPI · Docker · Kubernetes              │
└─────────────────────────────────────────────────────────────┘
```

---

## Comment l'approche a évolué

**1. Machine learning, puis deep learning.** Les deux ont été essayés en premier, avec des résultats décevants.

**2. Un système de règles pondérées construit à partir de la documentation technique.** Les règles ont été construites par un travail statistique sur la documentation technique des équipements. Chaque condition documentée est devenue une règle pondérée ; les règles se combinent en un **score sur 100**, et des **plages de score correspondent aux catégories d'anomalies**. Chaque alerte se rattache à la règle documentée qui l'a déclenchée. À l'œil, on distinguait sur les courbes le cycle normal des écarts, mais un écart n'est pas toujours une anomalie : une ouverture de porte, par exemple, provoque un pic qui relève du fonctionnement normal.

**3. Une couche Isolation Forest non supervisée par-dessus.** Les règles ne voient que ce que la documentation anticipe. Une couche Isolation Forest, non supervisée donc sans besoin de labels, a été ajoutée par-dessus le score des règles pour faire ressortir les comportements inhabituels qu'elles ne décrivent pas.

---

## Stack

| Couche | Technologie |
|---|---|
| Moteur de règles | Python · score pondéré issu de la documentation équipements |
| Couche non supervisée | Scikit-learn · Isolation Forest |
| API | FastAPI |
| Infrastructure | Docker · Kubernetes |

---

## Résultats

| Paramètre | Valeur |
|---|---|
| Périmètre | 15 équipements de chaîne du froid |
| Familles comportementales | 3 (cyclique, stockage froid, isotherme) |
| Traçabilité des alertes | Chaque alerte rattachée à la règle documentée qui l'a déclenchée |
| Statut | Preuve de concept, non déployée en production |

</div>
