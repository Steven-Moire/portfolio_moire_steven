---
layout: post
title: "Smart Doc Reduction — GxP RAG Pipeline"
date: 2026-01-15 09:00:00 +0100
categories: [Projet_Data, Professionnel]
tags: [Python, RAG, NLP, HuggingFace, HDBSCAN, Docker, FastAPI, LLM, Mistral, Embeddings, GxP, Rigueur, Démarche-scientifique]
permalink: /projects/smart-doc-reduction/
---

<div class="lang-block lang-en" markdown="1">

# 🟢 Smart Doc Reduction — GxP Document RAG Pipeline
**International pharmaceutical group · CAC 40 · On-premise NLP in a closed network**

> Source code is confidential (regulated industrial environment). This document covers pipeline architecture and technical decisions.

---

## Context

A regulated industrial site had accumulated ~500 Standard Operating Procedures (SOPs) and Work Instructions (WINs) across multiple GxP document management systems. Over time, documents had diverged, duplicated, and become inconsistent — both a compliance risk and a maintenance burden.

**Objective:** identify redundant documents, surface clusters of similar procedures, and generate a rationalization proposal that quality teams could act on.

**The hard constraint: 100% on-premise.** No document could leave the closed network. Every model had to run on local infrastructure — no OpenAI API, no HuggingFace Inference Endpoints, no external calls of any kind.

Running a full RAG pipeline under these constraints is uncommon engineering.

---

## Architecture — On-Premise RAG Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│            SOURCE DOCUMENTS (~500 SOPs & WINs)              │
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
│           All models run on-premise — no API calls          │
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
│             LLM SYNTHESIS (Mistral 7B Instruct)             │
│    Quantized · Local inference · Rationalization report     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     OUTPUT REPORT                           │
│    Cluster map · Duplicate candidates · Merge proposals     │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Decisions

### Why HDBSCAN over K-Means

K-Means requires you to specify `k` — the number of clusters — upfront. In a document rationalization context, the number of meaningful topic groups is unknown and should emerge from the data, not be imposed on it.

HDBSCAN:
- Discovers clusters of arbitrary shape and density
- Explicitly marks outliers (noise) rather than forcing them into a cluster
- Scales well to embedding spaces with ~500 documents
- Requires no assumption about the number of procedure families

### Why `multilingual-e5-large`

The document corpus mixed French technical procedures with English standards (ISO references, supplier specifications). A monolingual embedding model would have failed to cluster semantically similar content written in different languages. `multilingual-e5-large` is state-of-the-art for cross-lingual semantic similarity and runs efficiently on a local GPU.

### Why Mistral 7B Instruct (quantized)

4-bit quantization fits comfortably in the available local GPU memory while producing coherent, structured synthesis. The quantization tradeoff (minor quality degradation vs. feasibility on local hardware) was the right call given the infrastructure constraint.

---

## Stack

| Layer | Technology |
|---|---|
| Embeddings | `intfloat/multilingual-e5-large` (local HuggingFace inference) |
| Clustering | HDBSCAN |
| LLM synthesis | Mistral 7B Instruct (quantized, local) |
| Document extraction | Python (PDF/DOCX parsing) |
| API | FastAPI |
| Infrastructure | Docker |

---

## GxP Compliance & On-Premise Constraints

- **Zero data exfiltration** — all models run on local GPU infrastructure, no document ever left the network
- **Audit trail** — every extraction, embedding, and classification step is logged for compliance traceability
- **Validated environment** — pipeline changes required a qualification cycle before deployment

This is one of the rare cases where a full RAG pipeline (embedding → clustering → LLM synthesis) operates entirely in a closed, regulated environment.

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟢 Smart Doc Reduction — Pipeline RAG documentaire GxP
**Groupe pharmaceutique international · CAC 40 · NLP on-premise en réseau fermé**

> Code source confidentiel (environnement industriel réglementé). Ce document couvre l'architecture du pipeline et les décisions techniques.

---

## Contexte

Un site industriel réglementé avait accumulé ~500 SOPs (Standard Operating Procedures) et modes opératoires à travers plusieurs systèmes de gestion documentaire GxP. Au fil du temps, les documents avaient divergé, été dupliqués et présentaient des incohérences — à la fois un risque de conformité et un problème de maintenance.

**Objectif :** identifier les documents redondants, faire émerger des clusters de procédures similaires, et générer une proposition de rationalisation que les équipes qualité pourraient exploiter.

**Contrainte forte : 100% on-premise.** Aucun document ne pouvait quitter le réseau fermé. Chaque modèle devait tourner sur l'infrastructure locale — pas d'API OpenAI, pas d'HuggingFace Inference Endpoints, aucun appel externe.

Faire tourner un pipeline RAG complet sous ces contraintes est de l'ingénierie hors des sentiers battus.

---

## Architecture — Pipeline RAG on-premise

```
┌─────────────────────────────────────────────────────────────┐
│         DOCUMENTS SOURCE (~500 SOPs & modes opératoires)    │
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
│           Tous les modèles on-premise — zéro appel API      │
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
│          SYNTHÈSE LLM (Mistral 7B Instruct)                 │
│    Quantisé · Inférence locale · Rapport de rationalisation │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     RAPPORT DE SORTIE                       │
│    Carte des clusters · Doublons · Propositions de fusion   │
└─────────────────────────────────────────────────────────────┘
```

---

## Décisions techniques

### Pourquoi HDBSCAN et pas K-Means

K-Means exige de spécifier `k` à l'avance. Dans un contexte de rationalisation documentaire, le nombre de groupes thématiques pertinents est inconnu et doit émerger des données, pas être imposé.

HDBSCAN :
- Découvre des clusters de forme et densité arbitraires
- Marque explicitement les outliers (bruit) au lieu de les forcer dans un cluster
- Passe à l'échelle sur des espaces d'embeddings de ~500 documents
- Aucune hypothèse sur le nombre de familles de procédures

### Pourquoi `multilingual-e5-large`

Le corpus mixait des procédures techniques françaises et des normes anglaises (références ISO, specs fournisseurs). Un modèle d'embeddings monolingue aurait échoué à clustériser du contenu sémantiquement similaire écrit dans des langues différentes. `multilingual-e5-large` est l'état de l'art pour la similarité sémantique cross-linguale et tourne efficacement sur GPU local.

### Pourquoi Mistral 7B Instruct (quantisé)

La quantification 4-bit tient confortablement dans la mémoire GPU locale disponible tout en produisant une synthèse cohérente et structurée. Le compromis quantification (légère dégradation de qualité vs faisabilité sur hardware local) était le bon choix face à la contrainte d'infrastructure.

---

## Stack

| Couche | Technologie |
|---|---|
| Embeddings | `intfloat/multilingual-e5-large` (inférence HuggingFace locale) |
| Clustering | HDBSCAN |
| Synthèse LLM | Mistral 7B Instruct (quantisé, local) |
| Extraction documents | Python (parsing PDF/DOCX) |
| API | FastAPI |
| Infrastructure | Docker |

---

## Conformité GxP & contraintes on-premise

- **Zéro exfiltration** — tous les modèles tournent sur GPU local, aucun document n'a quitté le réseau
- **Piste d'audit** — chaque étape d'extraction, d'embedding et de classification est loguée pour la traçabilité compliance
- **Environnement validé** — les changements du pipeline nécessitaient un cycle de qualification avant déploiement

C'est l'un des rares cas où un pipeline RAG complet (embedding → clustering → synthèse LLM) fonctionne entièrement dans un environnement fermé et réglementé.

</div>
