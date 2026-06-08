---
layout: post
title: "Predictive Maintenance — Industrial Cold Chain"
date: 2025-09-01 09:00:00 +0100
categories: [Projet_Data, Professionnel]
tags: [Python, Scikit-learn, MLflow, DVC, FastAPI, Docker, Kubernetes, Grafana, Prometheus, Evidently, Isolation-Forest, GxP, Rigueur, Démarche-scientifique, Autonomie]
permalink: /projects/predictive-maintenance/
---

<div class="lang-block lang-en" markdown="1">

# 🟢 Predictive Maintenance — Industrial Cold Chain
**International pharmaceutical group · CAC 40 · Real-time anomaly detection**

> Source code is confidential (regulated industrial environment). This document covers architecture, model decisions, and results.

---

## Context

15 industrial thermal enclosures (cold-chain equipment) required continuous monitoring to detect anomalies before equipment failure. In a pharmaceutical environment, cold-chain failures can cause product degradation — the business case for early detection is direct and measurable.

The equipment naturally split into **3 behavioral families** requiring distinct models:
- **CYCLES** — periodic temperature patterns (regular oscillation)
- **FROID** — continuous cold storage (stable low temperature)
- **ISOTHERME** — isothermal stability (minimal variation)

---

## Architecture — Hybrid Rules + ML

```
┌─────────────────────────────────────────────────────────────┐
│           DATA INGESTION (temperature readings)             │
│                  15 thermal enclosures                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PREPROCESSING                            │
│        Resampling · Feature engineering · Windowing         │
└──────────┬────────────────────────────────┬─────────────────┘
           │                                │
           ▼                                ▼
┌─────────────────────┐      ┌──────────────────────────────┐
│   BUSINESS RULES    │      │     ISOLATION FOREST (ML)    │
│ (domain thresholds) │      │  3 models × 3 equipment      │
│                     │      │  families                    │
└──────────┬──────────┘      └──────────────┬───────────────┘
           │                                │
           └────────────────┬───────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  ANOMALY CLASSIFICATION                     │
│  NORMAL · ANOMALIE_CYCLE · ANOMALIE_INSTABLE                │
│  ANOMALIE_FRANCHE · ML_SUSPECT                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               ALERTING + MONITORING                         │
│          Grafana dashboard · Prometheus metrics             │
└─────────────────────────────────────────────────────────────┘
```

---

## Why Isolation Forest — Not Deep Learning

The dataset contained ~10,000 readings. At that scale, deep learning approaches (LSTM, Autoencoders) carry real risks:

- **Overfitting** — small dataset with inherently rare labeled anomalies
- **Interpretability loss** — in a regulated environment, "the neural network flagged this" is not an acceptable root cause for a maintenance alert
- **Maintenance overhead** — a retrained LSTM requires revalidation; Isolation Forest hyperparameters are stable, auditable, and explainable to non-technical stakeholders

Isolation Forest is statistically well-suited for anomaly detection on tabular data at this scale. It makes no distributional assumptions and naturally handles multivariate temperature signals. The choice was deliberate, documented, and defensible to QA teams.

---

## Stack

| Layer | Technology |
|---|---|
| ML | Scikit-learn · Isolation Forest |
| Experiment tracking | MLflow |
| Data versioning | DVC |
| Monitoring | Grafana · Prometheus |
| Drift detection | Evidently |
| API | FastAPI |
| Infrastructure | Docker · Kubernetes · CI/CD |

---

## Results

| Parameter | Value |
|---|---|
| Equipment monitored | 15 thermal enclosures |
| Behavioral families | 3 (CYCLES, FROID, ISOTHERME) |
| Dataset size | ~10,000 readings |
| Best F1 score | **0.778** |
| Best config | `contamination=0.10` · `max_features=0.5` · `n_estimators=200` |
| Deployment | Production |

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟢 Maintenance prédictive — Chaîne du froid industrielle
**Groupe pharmaceutique international · CAC 40 · Détection d'anomalies en temps réel**

> Code source confidentiel (environnement industriel réglementé). Ce document couvre l'architecture, les décisions de modélisation et les résultats.

---

## Contexte

15 enceintes thermiques industrielles (équipements de chaîne du froid) nécessitaient une surveillance continue pour détecter les anomalies avant toute défaillance. Dans un environnement pharmaceutique, une rupture de chaîne du froid peut entraîner la dégradation des produits — le business case pour la détection précoce est direct et mesurable.

Les équipements se répartissaient naturellement en **3 familles comportementales** nécessitant des modèles distincts :
- **CYCLES** — oscillation thermique périodique
- **FROID** — stockage froid continu (température basse stable)
- **ISOTHERME** — stabilité isotherme (variation minimale)

---

## Architecture — Règles métier + ML hybride

```
┌─────────────────────────────────────────────────────────────┐
│           INGESTION (relevés de température)                │
│                  15 enceintes thermiques                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRÉTRAITEMENT                            │
│        Rééchantillonnage · Feature engineering · Windowing  │
└──────────┬────────────────────────────────┬─────────────────┘
           │                                │
           ▼                                ▼
┌─────────────────────┐      ┌──────────────────────────────┐
│   RÈGLES MÉTIER     │      │     ISOLATION FOREST (ML)    │
│ (seuils domaine)    │      │  3 modèles × 3 familles      │
│                     │      │  d'équipements               │
└──────────┬──────────┘      └──────────────┬───────────────┘
           └────────────────┬───────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 CLASSIFICATION D'ANOMALIES                  │
│  NORMAL · ANOMALIE_CYCLE · ANOMALIE_INSTABLE                │
│  ANOMALIE_FRANCHE · ML_SUSPECT                              │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               ALERTES + MONITORING                          │
│          Dashboard Grafana · métriques Prometheus           │
└─────────────────────────────────────────────────────────────┘
```

---

## Pourquoi Isolation Forest — et pas Deep Learning

Le dataset contenait ~10 000 relevés. À cette échelle, les approches deep learning (LSTM, Autoencoders) comportent des risques réels :

- **Surapprentissage** — dataset limité avec des anomalies labellisées rares par nature
- **Perte d'interprétabilité** — dans un environnement réglementé, "le réseau de neurones a signalé ça" n'est pas une cause racine acceptable pour une alerte de maintenance
- **Overhead de maintenance** — un LSTM réentraîné nécessite une revalidation ; les hyperparamètres d'Isolation Forest sont stables, auditables et explicables aux parties prenantes non techniques

Isolation Forest est statistiquement adapté à la détection d'anomalies sur données tabulaires à cette échelle. Aucune hypothèse distributionnelle, gestion naturelle des signaux multivariés de température. Le choix était délibéré, documenté, et défendable auprès des équipes QA.

---

## Stack

| Couche | Technologie |
|---|---|
| ML | Scikit-learn · Isolation Forest |
| Suivi d'expériences | MLflow |
| Versionnement données | DVC |
| Monitoring | Grafana · Prometheus |
| Détection de drift | Evidently |
| API | FastAPI |
| Infrastructure | Docker · Kubernetes · CI/CD |

---

## Résultats

| Paramètre | Valeur |
|---|---|
| Équipements surveillés | 15 enceintes thermiques |
| Familles comportementales | 3 (CYCLES, FROID, ISOTHERME) |
| Taille du dataset | ~10 000 relevés |
| Meilleur score F1 | **0,778** |
| Meilleure config | `contamination=0.10` · `max_features=0.5` · `n_estimators=200` |
| Déploiement | Production |

</div>
