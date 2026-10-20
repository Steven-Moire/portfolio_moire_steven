---
layout: post
title: "COVID X-Ray Classification: MLOps Pipeline"
title_fr: "Classification radiographies COVID : Pipeline MLOps"
description: "4-class CNN (Keras) on chest X-rays with Grad-CAM: 88% accuracy on a held-out test set of 1,169 images. Team project: 8 containerized services, CI/CD, MLflow, DVC, Prometheus and Grafana monitoring."
description_fr: "CNN 4 classes (Keras) sur radios thoraciques avec Grad-CAM : 88 % d'accuracy sur un jeu de test de 1 169 images. Projet d'équipe : 8 services conteneurisés, CI/CD, MLflow, DVC, monitoring Prometheus et Grafana."
date: 2026-09-01 09:00:00 +0200
categories: [Projet_Data, Ecole]
tags: [Python, TensorFlow, Keras, U-Net, Streamlit, DVC, MLflow, Docker, Kubernetes, FastAPI, MinIO, Prometheus, Grafana, Evidently, Locust, Grad-CAM, MLOps, Computer-Vision, Interprétabilité]
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

The train/test split is done on the raw images, before any augmentation: the test set only holds original images, never augmented. The run reported below uses a balanced subset of up to 1,500 images per class (5,845 original images): 4,676 for training (18,704 after augmentation) and 1,169 for testing.

---

## Preprocessing

- Images resized to 256 × 256, grayscale
- Lungs masked with the segmentation model, then the image is cropped and padded around the lungs
- Local contrast enhancement with CLAHE
- Augmentation on the training set only (×4): rotation ±15°, zoom 0.9 to 1.1, brightness 0.8 to 1.2, horizontal flip

---

## Two Models

### Classification: CNN

Convolution blocks (Conv2D, BatchNormalization, MaxPooling), then GlobalAveragePooling, a 128-unit dense layer, Dropout 0.5 and a softmax over the 4 classes. Class weights compensate the class imbalance. EarlyStopping (patience 5) and ReduceLROnPlateau control training, which stopped after 18 epochs with 92.2% validation accuracy.

### Segmentation: U-Net

U-Net with a MobileNetV2 encoder pre-trained on ImageNet, trained in two phases: frozen encoder first (8 epochs), then full fine-tuning at a very low learning rate (25 epochs). Batch sizes were reduced (16, then 8 for fine-tuning) to fit the 12 GB GPU. Predicted masks are cleaned afterwards (morphological closing, keeping the two largest components). The model is only registered in the MLflow Model Registry if its validation Dice reaches a minimum threshold.

---

## Pipeline

```
Raw images
    → Lung segmentation (U-Net) · masking · crop · CLAHE
    → Train/test split on original images
    → Data augmentation (training set only)
    → CNN training (DVC pipeline, MLflow tracking)
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

### Classification (test set: 1,169 images)

| Class | F1-score |
|---|---|
| Viral Pneumonia | 0.95 |
| Normal | 0.89 |
| COVID | 0.85 |
| Lung Opacity | 0.84 |
| **Accuracy** | **88.2%** |
| **Macro F1** | **0.88** |

The main confusion is COVID predicted as Lung Opacity (42 of the 300 COVID images), which explains the lower recall on the COVID class (0.80).

### Segmentation (same test set)

| Masks | Dice | IoU |
|---|---|---|
| Raw | 0.79 | 0.71 |
| Cleaned | 0.87 | 0.76 |

### Load test (Locust)

10 simulated users, each sending one prediction request per second, against a backend capped at 1 CPU and 512 MB (CPU inference). Result: about 0.9 predictions per second, 0 failures out of 50 requests, and a median latency of 8.6 s because requests queue up. The test shows that the CPU is the bottleneck.

---

## Stack

| Layer | Technology |
|---|---|
| Deep Learning | TensorFlow/Keras · OpenCV |
| Segmentation | U-Net (MobileNetV2 encoder) |
| Interpretability | Grad-CAM |
| Frontend | Streamlit (multi-page) |
| Backend API | FastAPI |
| Experiment tracking | MLflow (tracking and model registry) |
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

---

## What Was Hard

On the team side, at first we were not working in an agile way, and it caused problems: what were we supposed to do, what was blocking us from moving forward? Setting up a backlog let us create one branch per user story and split the tasks between us without negatively impacting the others.

Then, the whole MLOps part is much more complex than the data science part: deployment, CI/CD, compliance checks, guardrails, none of it was easy.

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

Le découpage train/test se fait sur les images brutes, avant toute augmentation : le jeu de test ne contient que des images originales, jamais augmentées. L'exécution présentée plus bas utilise un sous-ensemble équilibré de 1 500 images maximum par classe (5 845 images originales) : 4 676 pour l'entraînement (18 704 après augmentation) et 1 169 pour le test.

---

## Prétraitement

- Images redimensionnées en 256 × 256, en niveaux de gris
- Poumons masqués avec le modèle de segmentation, puis image recadrée et complétée autour des poumons
- Amélioration du contraste local avec CLAHE
- Augmentation sur le jeu d'entraînement uniquement (×4) : rotation ±15°, zoom de 0,9 à 1,1, luminosité de 0,8 à 1,2, flip horizontal

---

## Deux modèles

### Classification : CNN

Blocs de convolution (Conv2D, BatchNormalization, MaxPooling), puis GlobalAveragePooling, une couche dense de 128 unités, un Dropout de 0,5 et un softmax sur les 4 classes. Des poids de classes compensent le déséquilibre entre classes. EarlyStopping (patience 5) et ReduceLROnPlateau pilotent l'entraînement, qui s'est arrêté après 18 epochs avec 92,2 % d'accuracy en validation.

### Segmentation : U-Net

U-Net avec un encodeur MobileNetV2 pré-entraîné sur ImageNet, entraîné en deux phases : encodeur gelé d'abord (8 epochs), puis fine-tuning complet avec un pas d'apprentissage très bas (25 epochs). Les tailles de batch ont été réduites (16, puis 8 pour le fine-tuning) pour tenir dans le GPU de 12 Go. Les masques prédits sont ensuite nettoyés (fermeture morphologique, conservation des deux plus grandes composantes). Le modèle n'est enregistré dans le Model Registry MLflow que si son Dice de validation atteint un seuil minimum.

---

## Pipeline

```
Images brutes
    → Segmentation des poumons (U-Net) · masquage · recadrage · CLAHE
    → Découpage train/test sur les images originales
    → Augmentation de données (jeu d'entraînement uniquement)
    → Entraînement CNN (pipeline DVC, suivi MLflow)
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

### Classification (jeu de test : 1 169 images)

| Classe | F1-score |
|---|---|
| Viral Pneumonia | 0,95 |
| Normal | 0,89 |
| COVID | 0,85 |
| Lung Opacity | 0,84 |
| **Accuracy** | **88,2 %** |
| **F1 macro** | **0,88** |

La confusion principale est COVID prédit comme Lung Opacity (42 des 300 images COVID), ce qui explique le rappel plus faible sur la classe COVID (0,80).

### Segmentation (même jeu de test)

| Masques | Dice | IoU |
|---|---|---|
| Bruts | 0,79 | 0,71 |
| Nettoyés | 0,87 | 0,76 |

### Test de charge (Locust)

10 utilisateurs simulés, envoyant chacun une requête de prédiction par seconde, sur un backend limité à 1 CPU et 512 Mo (inférence sur CPU). Résultat : environ 0,9 prédiction par seconde, 0 échec sur 50 requêtes, et une latence médiane de 8,6 s, parce que les requêtes s'accumulent en file d'attente. Le test montre que le CPU est le goulot d'étranglement.

---

## Stack

| Couche | Technologie |
|---|---|
| Deep Learning | TensorFlow/Keras · OpenCV |
| Segmentation | U-Net (encodeur MobileNetV2) |
| Interprétabilité | Grad-CAM |
| Frontend | Streamlit (multi-pages) |
| Backend API | FastAPI |
| Suivi d'expériences | MLflow (suivi et model registry) |
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

---

## Ce qui a été difficile

Côté équipe, au début on ne fonctionnait pas de manière agile, et ça nous posait problème : qu'est-ce qu'on devait faire, qu'est-ce qui était bloquant pour avancer ? Mettre en place un backlog nous a permis de faire une branche par user story et de répartir les tâches entre nous, sans impacter négativement les autres.

Ensuite, toute la partie MLOps est beaucoup plus complexe que la partie data science : la mise en production, la CI/CD, la vérification de conformité, les garde-fous, ce n'était pas de la tarte.

</div>
