---
layout: post
title: "ms-template — Reusable Microservices Boilerplate"
date: 2024-10-01 09:00:00 +0100
categories: [Projet_Data, Personnel]
tags: [Python, Flask, Docker, Bash, Architecture-logicielle, SOLID, Débrouillardise, Rigueur, Pédagogie]
permalink: /projects/ms-template/
---

<div class="lang-block lang-en" markdown="1">

# 🔵 ms-template — Reusable Microservices Boilerplate
**Personal project · Architecture template · Active use**

---

## What This Is

Every new project starts the same way: set up logging, add a dashboard, wire the services together, write the same Bash scripts again. `ms-template` is the answer to that repetition.

```bash
git clone ms-template my-new-project
# Cross-cutting concerns are already wired. Start building domain logic.
```

**Philosophy:** Don't Repeat Yourself at the architecture level. Common infrastructure lives here once. Domain logic lives in the project that clones this. Each service has one responsibility and one reason to change — SOLID applied to the project scaffold, not just to individual classes.

---

## Services

### `ms-dashboard` — Project Dashboard · Flask · port 5050

Centralized view of all running services: status, key metrics, aggregated logs.

| Endpoint | Description |
|---|---|
| `GET /` | Dashboard overview |
| `GET /services` | Service registry and health status |
| `GET /logs` | Aggregated log stream |

### `ms-architecture` — SOLID Compliance Checker · Flask · port 5051

Statically analyzes inter-module dependencies in Python projects and flags SOLID violations. Runs as a CI gate.

| Endpoint | Description |
|---|---|
| `POST /analyze` | Analyze a Python module |
| `GET /report` | Last analysis report |

### `ms-logging` — Centralized Logging · port 5052

Dual-write logging: every service writes to the central log service **and** to a local fallback file.

```
Service A ──► ms-logging (central) ──► central log store
         └──► local/service_a.log  ──► local fallback
```

### `ms-scripts` — Bash Utility Scripts

| Script | What it does |
|---|---|
| `setup_venv.sh` | Virtual environment setup with pinned deps |
| `build_docker.sh` | Standardized Docker build + tag |
| `deploy.sh` | Deployment to target environment |
| `lint.sh` | Ruff + Black + isort in one command |

---

## Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        YOUR PROJECT                           │
│          (git clone ms-template, add domain services)         │
└─────┬─────────────────┬─────────────────────┬────────────────┘
      │                 │                     │
      ▼                 ▼                     ▼
┌───────────┐   ┌──────────────┐   ┌──────────────────────┐
│ms-dashboard│  │  ms-logging  │   │   ms-architecture    │
│  (:5050)  │   │   (:5052)    │   │      (:5051)         │
└───────────┘   └──────────────┘   └──────────────────────┘
               └─────────────────────────────────────────┘
                              ms-scripts/
```

---

## Getting Started

```bash
git clone https://github.com/Steven-Moire/ms-template my-project
cd my-project
rm -rf .git && git init
docker compose up ms-dashboard ms-logging
```

</div>

<div class="lang-block lang-fr" markdown="1">

# 🔵 ms-template — Boilerplate microservices réutilisable
**Projet personnel · Template d'architecture · Utilisation active**

---

## Ce que c'est

Chaque nouveau projet démarre pareil : setup du logging, ajout d'un dashboard, câblage des services, réécriture des mêmes scripts Bash. `ms-template` répond à cette répétition.

```bash
git clone ms-template mon-nouveau-projet
# Les concerns transverses sont déjà câblés. Tu peux passer à la logique métier.
```

**Philosophie :** DRY au niveau architecture. Les concerns transverses vivent ici une fois. La logique métier vit dans le projet qui clone ce template. Chaque service a une responsabilité et une seule raison de changer — SOLID appliqué au scaffold projet, pas seulement aux classes individuelles.

---

## Services

### `ms-dashboard` — Dashboard projet · Flask · port 5050

Vue centralisée de tous les services en cours : statut, métriques clés, logs agrégés.

| Endpoint | Description |
|---|---|
| `GET /` | Vue d'ensemble du dashboard |
| `GET /services` | Registre des services et statut santé |
| `GET /logs` | Flux de logs agrégé |

### `ms-architecture` — Vérificateur conformité SOLID · Flask · port 5051

Analyse statiquement les dépendances inter-modules dans les projets Python et signale les violations SOLID. Tourne comme porte CI.

| Endpoint | Description |
|---|---|
| `POST /analyze` | Analyser un module Python |
| `GET /report` | Dernier rapport d'analyse |

### `ms-logging` — Logging centralisé · port 5052

Logging dual-write : chaque service écrit dans le service de logs central **et** dans un fichier de fallback local.

```
Service A ──► ms-logging (central) ──► stockage logs central
         └──► local/service_a.log  ──► fallback local
```

### `ms-scripts` — Scripts utilitaires Bash

| Script | Ce qu'il fait |
|---|---|
| `setup_venv.sh` | Setup environnement virtuel avec dépendances pinned |
| `build_docker.sh` | Build Docker standardisé + tag |
| `deploy.sh` | Déploiement vers l'environnement cible |
| `lint.sh` | Ruff + Black + isort en une commande |

---

## Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        TON PROJET                             │
│          (git clone ms-template, ajout des services métier)   │
└─────┬─────────────────┬─────────────────────┬────────────────┘
      │                 │                     │
      ▼                 ▼                     ▼
┌───────────┐   ┌──────────────┐   ┌──────────────────────┐
│ms-dashboard│  │  ms-logging  │   │   ms-architecture    │
│  (:5050)  │   │   (:5052)    │   │      (:5051)         │
└───────────┘   └──────────────┘   └──────────────────────┘
               └─────────────────────────────────────────┘
                              ms-scripts/
```

---

## Démarrage rapide

```bash
git clone https://github.com/Steven-Moire/ms-template mon-projet
cd mon-projet
rm -rf .git && git init
docker compose up ms-dashboard ms-logging
```

</div>
