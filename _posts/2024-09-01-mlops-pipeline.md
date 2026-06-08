---
layout: post
title: "MLOps Pipeline — Full Stack from Scratch"
date: 2024-09-01 09:00:00 +0100
categories: [Projet_Data, Ecole]
tags: [Python, FastAPI, MLflow, DVC, Docker, Kubernetes, GitHub-Actions, Evidently, Prometheus, Grafana, MLOps, Auto-formation, Rigueur]
permalink: /projects/mlops-pipeline/
---

<div class="lang-block lang-en" markdown="1">

# 🟡 MLOps Pipeline — Full Stack from Scratch
**Personal project · Structured self-training · Work in Progress**

![WIP](https://img.shields.io/badge/WIP-Phase%203%2F4-orange?style=flat-square)

---

## Why This Project

MLOps is not a tool — it's a discipline. The best way to understand it is to build the full stack from scratch, making real engineering decisions at each layer rather than following a tutorial that makes them for you.

This project is structured self-training: starting from a data science notebook, building layer by layer toward a fully monitored, drift-detecting, production-grade system. Each phase introduces the complexity that gets glossed over in courses.

---

## Roadmap

| Phase | Status | Goal | Key Tools |
|---|---|---|---|
| **1 — Baseline** | ✅ Done | Reproducible env · preprocessing · ML model · FastAPI · unit tests | FastAPI · pytest · venv |
| **2 — Tracking** | ✅ Done | Experiment tracking · data versioning · microservices split | MLflow · DVC |
| **3 — Infrastructure** | 🔄 In Progress | Containerization · Kubernetes · end-to-end CI/CD | Docker · K8s · GitHub Actions |
| **4 — Monitoring** | 📋 Planned | Drift detection · real-time metrics · automated model updates | Evidently · Prometheus · Grafana |

---

## Target Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          CI/CD PIPELINE                         │
│          GitHub Actions · Ruff · pytest · SonarQube             │
└──────────────────────────┬──────────────────────────────────────┘
                           │ on merge to main
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      KUBERNETES CLUSTER                         │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   FastAPI API   │  │  ML Service  │  │   Data Service   │  │
│  │    (:8000)      │  │  (inference) │  │  (DVC + MinIO)   │  │
│  └─────────────────┘  └──────────────┘  └──────────────────┘  │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │     MLflow      │  │   Evidently  │  │  Prometheus      │  │
│  │   (tracking)    │  │   (drift)    │  │  + Grafana       │  │
│  └─────────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## What Each Phase Actually Teaches

**Phase 1 → 2:** the gap between "it runs on my machine" and "it's trackable and reproducible by anyone on the team."

**Phase 2 → 3:** the gap between "it's reproducible" and "it deploys reliably in any environment."

**Phase 3 → 4:** the gap between "it's deployed" and "we know when it starts to degrade."

Each transition is a real engineering problem. The point of this project is to hit each wall deliberately, understand why it exists, and engineer through it.

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟡 Pipeline MLOps — Stack complète from scratch
**Projet personnel · Auto-formation structurée · En cours**

![WIP](https://img.shields.io/badge/WIP-Phase%203%2F4-orange?style=flat-square)

---

## Pourquoi ce projet

MLOps n'est pas un outil — c'est une discipline. La meilleure façon de la comprendre est de construire la stack complète from scratch, en prenant de vraies décisions d'ingénierie à chaque couche plutôt qu'en suivant un tutoriel qui les prend à ta place.

Ce projet est une auto-formation structurée : partir d'un notebook data science, construire couche par couche vers un système entièrement monitoré, à détection de drift, de niveau production. Chaque phase introduit la complexité que les cours survolent.

---

## Roadmap

| Phase | Statut | Objectif | Outils clés |
|---|---|---|---|
| **1 — Baseline** | ✅ Terminé | Env reproductible · prétraitement · modèle ML · FastAPI · tests unitaires | FastAPI · pytest · venv |
| **2 — Tracking** | ✅ Terminé | Suivi d'expériences · versionnement données · décomposition microservices | MLflow · DVC |
| **3 — Infrastructure** | 🔄 En cours | Containerisation · Kubernetes · CI/CD bout-en-bout | Docker · K8s · GitHub Actions |
| **4 — Monitoring** | 📋 Planifié | Détection de drift · métriques temps réel · mises à jour automatiques du modèle | Evidently · Prometheus · Grafana |

---

## Architecture cible

```
┌─────────────────────────────────────────────────────────────────┐
│                       PIPELINE CI/CD                            │
│          GitHub Actions · Ruff · pytest · SonarQube             │
└──────────────────────────┬──────────────────────────────────────┘
                           │ au merge sur main
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CLUSTER KUBERNETES                         │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   API FastAPI   │  │ Service ML   │  │  Service Data    │  │
│  │    (:8000)      │  │  (inférence) │  │  (DVC + MinIO)   │  │
│  └─────────────────┘  └──────────────┘  └──────────────────┘  │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │     MLflow      │  │   Evidently  │  │  Prometheus      │  │
│  │   (tracking)    │  │   (drift)    │  │  + Grafana       │  │
│  └─────────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Ce qu'apprend chaque phase

**Phase 1 → 2 :** le fossé entre "ça tourne sur ma machine" et "c'est traçable et reproductible par n'importe qui dans l'équipe."

**Phase 2 → 3 :** le fossé entre "c'est reproductible" et "ça se déploie de façon fiable dans n'importe quel environnement."

**Phase 3 → 4 :** le fossé entre "c'est déployé" et "on sait quand ça commence à se dégrader."

Chaque transition est un vrai problème d'ingénierie. L'intérêt de ce projet est de se heurter délibérément à chaque mur, de comprendre pourquoi il existe, et de l'ingénier pour le traverser.

</div>
