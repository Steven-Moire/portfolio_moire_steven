---
layout: post
title: "GxP Document Intelligence: Semantic Clustering & Local LLM"
date: 2026-01-15 09:00:00 +0100
categories: [Projet_Data, Professionnel]
tags: [Python, NLP, HuggingFace, HDBSCAN, Clustering, Embeddings, LLM, Mistral, FastAPI, Flask, Docker, Kubernetes, CI-CD, GxP, Sortie-structurée, On-premise]
pin: true
permalink: /projects/gxp-document-intelligence/
redirect_from:
  - /projects/smart-doc-reduction/
---

<div class="lang-block lang-en" markdown="1">

# GxP Document Intelligence: Semantic Clustering & Local LLM
**International pharmaceutical group · On-premise private cloud · In production**

> Source code is confidential (regulated industrial environment). This document covers pipeline architecture and technical decisions.

---

## Context

A regulated industrial site had accumulated several hundred Standard Operating Procedures (SOPs) and work instructions across multiple GxP document management systems. Over time, documents had diverged, duplicated, and become inconsistent: both a compliance risk and a maintenance burden.

Objective: identify redundant documents, surface clusters of similar procedures, and generate a rationalization proposal that quality teams could act on.

**The hard constraint: 100% on-premise.** No document could leave the closed network. Every model had to run on local infrastructure: no OpenAI API, no HuggingFace Inference Endpoints, no external calls of any kind.

---

## Architecture: On-Premise Semantic Clustering Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│     SOURCE DOCUMENTS (SOPs & work instructions, corpus)     │
│       GxP document management systems (extraction)          │
└──────────────────────────┬──────────────────────────────────┘
                           │  PDF / DOCX extraction
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    TEXT PREPROCESSING                       │
│        Chunking · Cleaning · Language normalization         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              MULTILINGUAL EMBEDDINGS                        │
│      intfloat/multilingual-e5-large (local inference)       │
│           All models run on-premise · no API calls          │
└──────────────────────────┬──────────────────────────────────┘
                           │  Vector similarity matrix
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  HDBSCAN CLUSTERING                         │
│     Density-based · No fixed k · Handles noise natively     │
│     Discovers natural document clusters automatically       │
└──────────────────────────┬──────────────────────────────────┘
                           │  Cluster summaries
                           ▼
┌─────────────────────────────────────────────────────────────┐
│          LLM SYNTHESIS (Mistral 7B Instruct, 4-bit)         │
│   Local inference · Structured JSON output · Retry on       │
│   invalid output · Rationalization report                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     OUTPUT REPORT                           │
│    Cluster map · Duplicate candidates · Merge proposals     │
└─────────────────────────────────────────────────────────────┘
```

The pipeline runs as **6 Python microservices** (FastAPI / Flask): data, embeddings, LLM, quality API, quality app and dashboard. There is no vector database, no retrieval step and no tool calling: embeddings feed the clustering, and the LLM turns each cluster into a structured JSON proposal.

The LLM (Mistral 7B, downloaded from Hugging Face) is called by the other microservices through an internal API. It is **not part of the production deployment**: no production pod hosts it. In production, the tool is used by one quality specialist.

---

## Technical Decisions

### Why HDBSCAN over K-Means

K-Means requires you to specify `k` (the number of clusters) upfront. In a document rationalization context, the number of meaningful topic groups is unknown and should emerge from the data, not be imposed on it.

HDBSCAN:
- Discovers clusters of arbitrary shape and density
- Explicitly marks outliers (noise) rather than forcing them into a cluster
- Scales well to embedding spaces across the full document corpus
- Requires no assumption about the number of procedure families

### Why `multilingual-e5-large`

The document corpus mixed French technical procedures with English standards (ISO references, supplier specifications). A monolingual embedding model would have failed to cluster semantically similar content written in different languages. `multilingual-e5-large` is a strong multilingual model for cross-lingual semantic similarity and runs efficiently on a local GPU.

### Why Mistral 7B Instruct (4-bit quantized)

4-bit quantization fits comfortably in the available local GPU memory. The model is asked for structured JSON output; invalid outputs are detected and retried, so downstream services always receive a parseable result. The quantization tradeoff (minor quality degradation vs. feasibility on local hardware) was the right call given the infrastructure constraint.

---

## Stack

| Layer | Technology |
|---|---|
| Embeddings | `intfloat/multilingual-e5-large` (local HuggingFace inference) |
| Clustering | HDBSCAN |
| LLM synthesis | Mistral 7B Instruct (Hugging Face download, 4-bit quantized, internal API, structured JSON output with retry; not deployed in production) |
| Document extraction | Python (PDF/DOCX parsing) |
| Services | 6 Python microservices (FastAPI / Flask) |
| Infrastructure | Docker · Kubernetes (on-premise private cloud) |
| Users | One quality specialist (production) |
| Quality | 812 unit tests · blocking coverage gate ≥ 70% in CI |
| CI/CD | GitHub Actions · SonarQube · Checkmarx |

---

## GxP Compliance & On-Premise Constraints

- Zero data exfiltration: all models run on local GPU infrastructure, no document ever left the network
- Audit trail: every extraction, embedding, and classification step is logged for compliance traceability
- Validated environment: pipeline changes required a qualification cycle before deployment

The whole pipeline (embedding → clustering → structured LLM synthesis) runs inside the closed network; the LLM step stays outside the production deployment.

</div>

<div class="lang-block lang-fr" markdown="1">

# GxP Document Intelligence : clustering sémantique et LLM local
**Groupe pharmaceutique international · Cloud privé on-premise · En production**

> Code source confidentiel (environnement industriel réglementé). Ce document couvre l'architecture du pipeline et les décisions techniques.

---

## Contexte

Un site industriel réglementé avait accumulé plusieurs centaines de SOPs (Standard Operating Procedures) et modes opératoires à travers plusieurs systèmes de gestion documentaire GxP. Au fil du temps, les documents avaient divergé, été dupliqués et présentaient des incohérences : à la fois un risque de conformité et un problème de maintenance.

Objectif : identifier les documents redondants, faire émerger des clusters de procédures similaires, et générer une proposition de rationalisation que les équipes qualité pourraient exploiter.

**Contrainte forte : 100% on-premise.** Aucun document ne pouvait quitter le réseau fermé. Chaque modèle devait tourner sur l'infrastructure locale : pas d'API OpenAI, pas d'HuggingFace Inference Endpoints, aucun appel externe.

---

## Architecture : pipeline de clustering sémantique on-premise

```
┌─────────────────────────────────────────────────────────────┐
│     DOCUMENTS SOURCE (SOPs & modes opératoires, corpus)     │
│       Systèmes de gestion documentaire GxP (extraction)     │
└──────────────────────────┬──────────────────────────────────┘
                           │  Extraction PDF / DOCX
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRÉTRAITEMENT TEXTE                      │
│        Chunking · Nettoyage · Normalisation langue          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              EMBEDDINGS MULTILINGUES                        │
│      intfloat/multilingual-e5-large (inférence locale)      │
│           Tous les modèles on-premise · zéro appel API      │
└──────────────────────────┬──────────────────────────────────┘
                           │  Matrice de similarité vectorielle
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  CLUSTERING HDBSCAN                         │
│     Densité · Pas de k fixe · Gestion native du bruit       │
│     Découverte automatique des clusters documentaires       │
└──────────────────────────┬──────────────────────────────────┘
                           │  Résumés de clusters
                           ▼
┌─────────────────────────────────────────────────────────────┐
│          SYNTHÈSE LLM (Mistral 7B Instruct, 4-bit)          │
│   Inférence locale · Sortie JSON structurée · Relance si    │
│   sortie invalide · Rapport de rationalisation              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     RAPPORT DE SORTIE                       │
│    Carte des clusters · Doublons · Propositions de fusion   │
└─────────────────────────────────────────────────────────────┘
```

Le pipeline tourne sous forme de **6 microservices Python** (FastAPI / Flask) : données, embeddings, LLM, API qualité, application qualité et dashboard. Pas de base vectorielle, pas d'étape de retrieval, pas de tool calling : les embeddings alimentent le clustering, et le LLM transforme chaque cluster en proposition JSON structurée.

Le LLM (Mistral 7B, téléchargé depuis Hugging Face) est appelé par les autres microservices via une API interne. Il **ne fait pas partie du déploiement de production** : aucun pod de production ne l'héberge. En production, l'outil est utilisé par une personne de l'équipe qualité.

---

## Décisions techniques

### Pourquoi HDBSCAN et pas K-Means

K-Means exige de spécifier `k` à l'avance. Dans un contexte de rationalisation documentaire, le nombre de groupes thématiques pertinents est inconnu et doit émerger des données, pas être imposé.

HDBSCAN :
- Découvre des clusters de forme et densité arbitraires
- Marque explicitement les outliers (bruit) au lieu de les forcer dans un cluster
- Passe à l'échelle sur des espaces d'embeddings de taille industrielle
- Aucune hypothèse sur le nombre de familles de procédures

### Pourquoi `multilingual-e5-large`

Le corpus mixait des procédures techniques françaises et des normes anglaises (références ISO, specs fournisseurs). Un modèle d'embeddings monolingue aurait échoué à clustériser du contenu sémantiquement similaire écrit dans des langues différentes. `multilingual-e5-large` est un modèle multilingue solide pour la similarité sémantique cross-linguale et tourne efficacement sur GPU local.

### Pourquoi Mistral 7B Instruct (quantisé 4-bit)

La quantification 4-bit tient confortablement dans la mémoire GPU locale disponible. Le modèle doit produire une sortie JSON structurée ; les sorties invalides sont détectées et relancées, pour que les services en aval reçoivent toujours un résultat exploitable. Le compromis quantification (légère dégradation de qualité vs faisabilité sur hardware local) était le bon choix face à la contrainte d'infrastructure.

---

## Stack

| Couche | Technologie |
|---|---|
| Embeddings | `intfloat/multilingual-e5-large` (inférence HuggingFace locale) |
| Clustering | HDBSCAN |
| Synthèse LLM | Mistral 7B Instruct (téléchargé depuis Hugging Face, quantisé 4-bit, API interne, sortie JSON structurée avec relance ; non déployé en production) |
| Extraction documents | Python (parsing PDF/DOCX) |
| Services | 6 microservices Python (FastAPI / Flask) |
| Infrastructure | Docker · Kubernetes (cloud privé on-premise) |
| Utilisateurs | Une personne de l'équipe qualité (production) |
| Qualité | 812 tests unitaires · seuil de couverture bloquant ≥ 70 % en CI |
| CI/CD | GitHub Actions · SonarQube · Checkmarx |

---

## Conformité GxP & contraintes on-premise

- Zéro exfiltration : tous les modèles tournent sur GPU local, aucun document n'a quitté le réseau
- Piste d'audit : chaque étape d'extraction, d'embedding et de classification est loguée pour la traçabilité compliance
- Environnement validé : les changements du pipeline nécessitaient un cycle de qualification avant déploiement

L'ensemble du pipeline (embedding → clustering → synthèse LLM structurée) tourne à l'intérieur du réseau fermé ; l'étape LLM reste hors du déploiement de production.

</div>
