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

The site's industrial cold-chain fleet required continuous monitoring to detect anomalies before equipment failure. In a pharmaceutical environment, cold-chain failures can cause product degradation — the business case for early detection is direct and measurable.

The equipment naturally split into **3 behavioral families** requiring distinct models:
- **Famille A** — periodic temperature patterns (regular oscillation)
- **Famille B** — continuous cold storage (stable low temperature)
- **Famille C** — isothermal stability (minimal variation)

---

## Architecture — Hybrid Rules + ML

```
┌─────────────────────────────────────────────────────────────┐
│           DATA INGESTION (temperature readings)             │
│              Industrial cold-chain fleet                    │
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
│  NORMAL · WARNING_A · WARNING_B                             │
│  CRITICAL · SUSPECT                                         │
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

The dataset contained several thousand temporal readings. At that scale, deep learning approaches (LSTM, Autoencoders) carry real risks:

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
| Equipment monitored | Complete industrial fleet |
| Behavioral families | 3 (Famille A, Famille B, Famille C) |
| Dataset size | Several thousand temporal readings |
| Best F1 score | **> 0.75 on validation set** |
| Best config | Optimised via cross-validated grid search |
| Deployment | Production |

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟢 Maintenance prédictive — Chaîne du froid industrielle
**Groupe pharmaceutique international · CAC 40 · Détection d'anomalies en temps réel**

> Code source confidentiel (environnement industriel réglementé). Ce document couvre l'architecture, les décisions de modélisation et les résultats.

---

## Contexte

La flotte industrielle de chaîne du froid du site nécessitait une surveillance continue pour détecter les anomalies avant toute défaillance. Dans un environnement pharmaceutique, une rupture de chaîne du froid peut entraîner la dégradation des produits — le business case pour la détection précoce est direct et mesurable.

Les équipements se répartissaient naturellement en **3 familles comportementales** nécessitant des modèles distincts :
- **Famille A** — oscillation thermique périodique
- **Famille B** — stockage froid continu (température basse stable)
- **Famille C** — stabilité isotherme (variation minimale)

---

## Architecture — Règles métier + ML hybride

```
┌─────────────────────────────────────────────────────────────┐
│           INGESTION (relevés de température)                │
│              Flotte industrielle chaîne du froid            │
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
│  NORMAL · WARNING_A · WARNING_B                             │
│  CRITICAL · SUSPECT                                         │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               ALERTES + MONITORING                          │
│          Dashboard Grafana · métriques Prometheus           │
└─────────────────────────────────────────────────────────────┘
```

---

## Pourquoi Isolation Forest — et pas Deep Learning

Le dataset contenait plusieurs milliers de relevés temporels. À cette échelle, les approches deep learning (LSTM, Autoencoders) comportent des risques réels :

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
| Équipements surveillés | Flotte industrielle complète du site |
| Familles comportementales | 3 (Famille A, Famille B, Famille C) |
| Taille du dataset | Plusieurs milliers de relevés temporels |
| Meilleur score F1 | **Score F1 > 0.75 sur jeu de validation** |
| Meilleure config | Paramètres optimisés via grid search cross-validé |
| Déploiement | Production |

</div>
