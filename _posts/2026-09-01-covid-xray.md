---
layout: post
title: "COVID X-Ray Classification: MLOps Pipeline"
title_fr: "Classification radiographies COVID : Pipeline MLOps"
description: "4-class CNN (Keras) on 42K chest X-rays with Grad-CAM: 88% accuracy on a 1,169-image evaluation set. Team project: 8 containerized services, CI/CD, MLflow, DVC, Prometheus and Grafana monitoring."
description_fr: "CNN 4 classes (Keras) sur 42 000 radios thoraciques avec Grad-CAM : 88 % d'accuracy sur un jeu d'évaluation de 1 169 images. Projet d'équipe : 8 services conteneurisés, CI/CD, MLflow, DVC, monitoring Prometheus et Grafana."
date: 2026-09-01 09:00:00 +0200
categories: [Projet_Data, Ecole]
tags: [Python, TensorFlow, Keras, Streamlit, DVC, MLflow, Docker, Kubernetes, FastAPI, MinIO, Prometheus, Grafana, Evidently, Grad-CAM, MLOps, Computer-Vision, Interprétabilité]
permalink: /projects/covid-xray/
redirect_from:
  - /projects/mlops-pipeline/
---

<div class="lang-block lang-en" markdown="1">

# COVID X-Ray Classification: MLOps Pipeline
**Academic team project · École Liora · March to September 2026**

> GitHub: [Data-Team-DST/docker_covid](https://github.com/Data-Team-DST/docker_covid) (public)

---

## Context

4-class classification of chest X-rays with a CNN (Keras), then built out into an MLOps pipeline: containerized microservices, CI/CD, experiment tracking, data versioning and monitoring.

Team project (4 people). My main contributions: the FastAPI backend (including Grad-CAM), the dashboard, the Streamlit interface, the data service, the Docker infrastructure, the CI and the Grafana monitoring dashboard.

---

## Dataset

| Class | Description |
|---|---|
| COVID-19 | X-rays positive for COVID-19 |
| Lung Opacity | Pulmonary opacity (non-COVID) |
| Normal | Healthy chest X-rays |
| Viral Pneumonia | Viral pneumonia (non-COVID) |

- Total images: 42,330
- Volume: ~806 MB (tracked via DVC)
- Source: Kaggle (public dataset)

---

## ML Pipeline

```
Raw images
    → Preprocessing (normalization, resize)
    → Data augmentation (rotation, zoom)
    → CNN training (Keras, parameters in params.yaml, DVC pipeline)
    → Evaluation (accuracy, per-class F1, confusion matrix)
    → Grad-CAM interpretability maps
    → Streamlit interface
```

---

## Services

8 application services and 5 infrastructure services, run with Docker Compose.

| Service | Port | Role |
|---|---|---|
| backend | 8000 | FastAPI: Keras inference, Grad-CAM |
| segmentation-service | 8001 | Lung segmentation |
| data-service | 5001 | Data access and statistics (DVC pull/push/status) |
| dvc-service | 5003 | DVC |
| streamlit | 8501 | User interface |
| trainer | 8888 | Model training |
| mlflow | 5000 | Experiment tracking |
| log-service | 5002 | Logs |
| postgres, minio | 9000 / 9001 | Storage |
| prometheus, grafana | 9090 / 3000 | Monitoring |

---

## Grad-CAM: Interpretability

Grad-CAM generates heatmaps highlighting which regions of the X-ray drove the model's prediction, so a prediction can be checked visually.

---

## Results

Evaluation on 1,169 images:

| Class | F1-score |
|---|---|
| Viral Pneumonia | 0.95 |
| Normal | 0.89 |
| COVID | 0.85 |
| Lung Opacity | 0.84 |
| **Accuracy** | **88.2%** |
| **Macro F1** | **0.88** |

---

## Stack

| Layer | Technology |
|---|---|
| Deep Learning | TensorFlow/Keras · OpenCV |
| Interpretability | Grad-CAM |
| Frontend | Streamlit (multi-page) |
| Backend API | FastAPI |
| Experiment tracking | MLflow |
| Data versioning | DVC |
| Object storage | MinIO |
| Monitoring | Prometheus · Grafana · Evidently (drift) · Locust (load tests) |
| CI/CD | GitHub Actions: lint and tests per service, SonarCloud, image builds, Docker smoke-test |
| Infrastructure | Docker · Docker Compose · Kubernetes manifests |

---

## Development Phases

| Phase | Status | Scope |
|---|---|---|
| 1 · Baseline | Done | Env setup · preprocessing · baseline CNN · FastAPI · unit tests |
| 2 · Tracking | Done | MLflow · DVC · microservices split |
| 3 · Infrastructure | Done | Full CI/CD (lint, tests, SonarCloud, image builds, smoke-test) · Kubernetes manifests |
| 4 · Monitoring | Done | Prometheus · Grafana dashboards under simulated load (Locust) · Evidently drift report |

</div>

<div class="lang-block lang-fr" markdown="1">

# Classification radiographies COVID : Pipeline MLOps
**Projet académique d'équipe · École Liora · mars à septembre 2026**

> GitHub : [Data-Team-DST/docker_covid](https://github.com/Data-Team-DST/docker_covid) (public)

---

## Contexte

Classification 4 classes de radiographies thoraciques avec un CNN (Keras), puis développement en pipeline MLOps : microservices conteneurisés, CI/CD, suivi d'expériences, versionnement des données et monitoring.

Projet d'équipe (4 personnes). Mes principales contributions : le backend FastAPI (dont Grad-CAM), le dashboard, l'interface Streamlit, le data service, l'infrastructure Docker, la CI et le dashboard de monitoring Grafana.

---

## Dataset

| Classe | Description |
|---|---|
| COVID-19 | Radios positives au COVID-19 |
| Lung Opacity | Opacité pulmonaire (non-COVID) |
| Normal | Radios thoraciques saines |
| Viral Pneumonia | Pneumonie virale (non-COVID) |

- Images totales : 42 330
- Volume : ~806 Mo (suivi via DVC)
- Source : Kaggle (dataset public)

---

## Pipeline ML

```
Images brutes
    → Prétraitement (normalisation, redimensionnement)
    → Augmentation de données (rotation, zoom)
    → Entraînement CNN (Keras, paramètres dans params.yaml, pipeline DVC)
    → Évaluation (accuracy, F1 par classe, matrice de confusion)
    → Cartes d'interprétabilité Grad-CAM
    → Interface Streamlit
```

---

## Services

8 services applicatifs et 5 services d'infrastructure, lancés avec Docker Compose.

| Service | Port | Rôle |
|---|---|---|
| backend | 8000 | FastAPI : inférence Keras, Grad-CAM |
| segmentation-service | 8001 | Segmentation pulmonaire |
| data-service | 5001 | Accès et statistiques des données (DVC pull/push/status) |
| dvc-service | 5003 | DVC |
| streamlit | 8501 | Interface utilisateur |
| trainer | 8888 | Entraînement du modèle |
| mlflow | 5000 | Suivi d'expériences |
| log-service | 5002 | Logs |
| postgres, minio | 9000 / 9001 | Stockage |
| prometheus, grafana | 9090 / 3000 | Monitoring |

---

## Grad-CAM : Interprétabilité

Grad-CAM génère des heatmaps montrant quelles régions de la radio ont orienté la prédiction du modèle, ce qui permet de vérifier une prédiction visuellement.

---

## Résultats

Évaluation sur 1 169 images :

| Classe | F1-score |
|---|---|
| Viral Pneumonia | 0,95 |
| Normal | 0,89 |
| COVID | 0,85 |
| Lung Opacity | 0,84 |
| **Accuracy** | **88,2 %** |
| **F1 macro** | **0,88** |

---

## Stack

| Couche | Technologie |
|---|---|
| Deep Learning | TensorFlow/Keras · OpenCV |
| Interprétabilité | Grad-CAM |
| Frontend | Streamlit (multi-pages) |
| Backend API | FastAPI |
| Suivi d'expériences | MLflow |
| Versionnement données | DVC |
| Stockage objets | MinIO |
| Monitoring | Prometheus · Grafana · Evidently (drift) · Locust (tests de charge) |
| CI/CD | GitHub Actions : lint et tests par service, SonarCloud, build des images, smoke-test Docker |
| Infrastructure | Docker · Docker Compose · manifestes Kubernetes |

---

## Phases de développement

| Phase | Statut | Périmètre |
|---|---|---|
| 1 · Baseline | Terminé | Setup env · prétraitement · CNN baseline · FastAPI · tests unitaires |
| 2 · Tracking | Terminé | MLflow · DVC · décomposition en microservices |
| 3 · Infrastructure | Terminé | CI/CD complète (lint, tests, SonarCloud, build des images, smoke-test) · manifestes Kubernetes |
| 4 · Monitoring | Terminé | Dashboards Grafana sous charge simulée (Locust) · rapport de drift Evidently |

</div>
