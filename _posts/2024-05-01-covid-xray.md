---
layout: post
title: "COVID X-Ray Classification — MLOps Pipeline"
date: 2024-05-01 09:00:00 +0100
categories: [Projet_Data, Ecole]
tags: [Python, PyTorch, Keras, Streamlit, DVC, MLflow, Docker, Kubernetes, FastAPI, MinIO, Grad-CAM, Autonomie, MLOps, Vulgarisation]
permalink: /projects/covid-xray/
---

<div class="lang-block lang-en" markdown="1">

# 🟢 COVID X-Ray Classification — MLOps Pipeline
**Academic project · École Liora · Deep learning + full MLOps infrastructure**

> GitHub: [Data-Team-DST/docker_covid](https://github.com/Data-Team-DST/docker_covid) (public)

---

## Context

4-class classification of chest X-rays using deep learning, then industrialized into a production-grade MLOps pipeline with 9 containerized microservices, CI/CD, experiment tracking, and data versioning.

This project started as a data science exercise and was pushed all the way to a deployable, monitored infrastructure — which is the point.

---

## Dataset

| Class | Description |
|---|---|
| COVID-19 | X-rays positive for COVID-19 |
| Lung Opacity | Pulmonary opacity (non-COVID) |
| Normal | Healthy chest X-rays |
| Viral Pneumonia | Viral pneumonia (non-COVID) |

- **Total images:** 42,330
- **Volume:** ~806 MB (tracked via DVC)
- **Source:** Kaggle (public dataset)

---

## ML Pipeline

```
Raw images
    → Preprocessing (normalization, resize)
    → Data augmentation (rotation, flip, zoom)
    → CNN training (Keras / PyTorch)
    → Hyperparameter optimization
    → Grad-CAM interpretability maps
    → Streamlit demo interface
```

---

## MLOps Infrastructure — 9 Containerized Services

```
┌───────────────────────────────────────────────────────────────┐
│                   CLIENT (Streamlit :8501)                    │
└────────────────────────┬──────────────────────────────────────┘
                         │ REST
                         ▼
┌───────────────────────────────────────────────────────────────┐
│               FastAPI Backend (:8000)                         │
│           Keras model inference · predictions                 │
└────┬──────────────────┬──────────────────────┬───────────────┘
     │                  │                      │
     ▼                  ▼                      ▼
┌─────────┐   ┌──────────────────┐   ┌──────────────────┐
│ MLflow  │   │  DVC Service     │   │  MinIO Storage   │
│ (:5000) │   │   (:5001)        │   │   (:9001)        │
└─────────┘   └──────────────────┘   └──────────────────┘
     │
     ▼
┌─────────┐   ┌──────────────────┐
│ Log Svc │   │   Dashboard      │
│ (:5002) │   │   (:5050)        │
└─────────┘   └──────────────────┘
```

---

## Grad-CAM — Interpretability

Grad-CAM generates heatmaps highlighting which regions of the X-ray drove the model's prediction. In a medical imaging context, interpretability is not a nice-to-have — it's the difference between a tool a clinician can interrogate and a black box they won't trust.

---

## Stack

| Layer | Technology |
|---|---|
| Deep Learning | PyTorch · TensorFlow/Keras · OpenCV |
| Interpretability | Grad-CAM |
| Frontend | Streamlit (multi-page) |
| Backend API | FastAPI |
| Experiment tracking | MLflow |
| Data versioning | DVC |
| Object storage | MinIO |
| CI/CD | GitHub Actions · Ruff · Black · isort |
| Infrastructure | Docker · Docker Compose · Kubernetes |

---

## Results

> Detailed metrics (accuracy, F1 per class, confusion matrix) available in `evaluation_report.json` in the repository.

---

## Development Phases

| Phase | Status | Scope |
|---|---|---|
| 1 — Baseline | ✅ Done | Env setup · preprocessing · baseline CNN · FastAPI · unit tests |
| 2 — Tracking | ✅ Done | MLflow · DVC · microservices decomposition |
| 3 — Infrastructure | 🔄 In progress | Kubernetes · full CI/CD · end-to-end orchestration |
| 4 — Monitoring | 📋 Planned | Prometheus · Grafana · Evidently drift detection |

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟢 Classification radiographies COVID — Pipeline MLOps
**Projet académique · École Liora · Deep learning + infrastructure MLOps complète**

> GitHub : [Data-Team-DST/docker_covid](https://github.com/Data-Team-DST/docker_covid) (public)

---

## Contexte

Classification 4 classes de radiographies thoraciques par deep learning, puis industrialisation en pipeline MLOps de niveau production avec 9 microservices containerisés, CI/CD, suivi d'expériences et versionnement des données.

Ce projet a démarré comme un exercice de data science et a été poussé jusqu'à une infrastructure déployable et monitorée — c'est ça l'intérêt.

---

## Dataset

| Classe | Description |
|---|---|
| COVID-19 | Radios positives au COVID-19 |
| Lung Opacity | Opacité pulmonaire (non-COVID) |
| Normal | Radios thoraciques saines |
| Viral Pneumonia | Pneumonie virale (non-COVID) |

- **Images totales :** 42 330
- **Volume :** ~806 Mo (suivi via DVC)
- **Source :** Kaggle (dataset public)

---

## Pipeline ML

```
Images brutes
    → Prétraitement (normalisation, redimensionnement)
    → Augmentation de données (rotation, flip, zoom)
    → Entraînement CNN (Keras / PyTorch)
    → Optimisation des hyperparamètres
    → Cartes d'interprétabilité Grad-CAM
    → Interface de démo Streamlit
```

---

## Infrastructure MLOps — 9 services containerisés

```
┌───────────────────────────────────────────────────────────────┐
│                   CLIENT (Streamlit :8501)                    │
└────────────────────────┬──────────────────────────────────────┘
                         │ REST
                         ▼
┌───────────────────────────────────────────────────────────────┐
│               Backend FastAPI (:8000)                         │
│           Inférence modèle Keras · prédictions                │
└────┬──────────────────┬──────────────────────┬───────────────┘
     │                  │                      │
     ▼                  ▼                      ▼
┌─────────┐   ┌──────────────────┐   ┌──────────────────┐
│ MLflow  │   │  Service DVC     │   │  Stockage MinIO  │
│ (:5000) │   │   (:5001)        │   │   (:9001)        │
└─────────┘   └──────────────────┘   └──────────────────┘
     │
     ▼
┌─────────┐   ┌──────────────────┐
│ Logs    │   │   Dashboard      │
│ (:5002) │   │   (:5050)        │
└─────────┘   └──────────────────┘
```

---

## Grad-CAM — Interprétabilité

Grad-CAM génère des heatmaps montrant quelles régions de la radio ont orienté la prédiction du modèle. Dans un contexte d'imagerie médicale, l'interprétabilité n'est pas un bonus — c'est la différence entre un outil qu'un clinicien peut interroger et une boîte noire qu'il ne va pas utiliser.

---

## Stack

| Couche | Technologie |
|---|---|
| Deep Learning | PyTorch · TensorFlow/Keras · OpenCV |
| Interprétabilité | Grad-CAM |
| Frontend | Streamlit (multi-pages) |
| Backend API | FastAPI |
| Suivi d'expériences | MLflow |
| Versionnement données | DVC |
| Stockage objets | MinIO |
| CI/CD | GitHub Actions · Ruff · Black · isort |
| Infrastructure | Docker · Docker Compose · Kubernetes |

---

## Résultats

> Métriques détaillées (accuracy, F1 par classe, matrice de confusion) disponibles dans `evaluation_report.json` dans le dépôt.

---

## Phases de développement

| Phase | Statut | Périmètre |
|---|---|---|
| 1 — Baseline | ✅ Terminé | Setup env · prétraitement · CNN baseline · FastAPI · tests unitaires |
| 2 — Tracking | ✅ Terminé | MLflow · DVC · décomposition en microservices |
| 3 — Infrastructure | 🔄 En cours | Kubernetes · CI/CD complet · orchestration bout-en-bout |
| 4 — Monitoring | 📋 Planifié | Prometheus · Grafana · détection de drift Evidently |

</div>
