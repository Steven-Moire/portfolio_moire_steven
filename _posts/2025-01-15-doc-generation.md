---
layout: post
title: "AI Document Generation Pipeline"
date: 2025-01-15 09:00:00 +0100
categories: [Projet_Data, Professionnel]
tags: [Python, FastAPI, Docker, Kubernetes, LLM, CI-CD, Microservices, Scraping, GxP, Rigueur, Itération, Communication]
permalink: /projects/doc-generation/
---

<div class="lang-block lang-en" markdown="1">

# 🟢 AI Document Generation Pipeline
**International pharmaceutical group · CAC 40 · On-premise regulated environment**

> Source code is confidential (regulated industrial environment). This document covers architecture, methodology, and results.

---

## Context

An intermediate-scale industrial pharmaceutical site needed to transform complex DOCX documents into structured Excel tables — a process previously done manually and prone to inconsistency. The hard constraint: **all processing had to happen on an internal AI platform with zero external data exposure** (GxP compliance, no cloud, no external LLM calls).

The project was built, deployed, and iterated in production over several months, with real business teams as end users from day one.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        INPUT                                │
│              DOCX files (authenticated source)              │
└──────────────────────────┬──────────────────────────────────┘
                           │  Ingestion from authenticated source
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   PREPROCESSING SERVICE                     │
│         Extract structure · Clean content · Chunk           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  INTERNAL LLM (on-premise)                  │
│         Structured extraction · Table generation            │
│              Zero external data exposure                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   POST-PROCESSING                           │
│        Validation · Formatting · Excel generation           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        OUTPUT                               │
│              Structured Excel tables                        │
└─────────────────────────────────────────────────────────────┘
```

**Microservices architecture** — each stage is an independent FastAPI service, containerized and orchestrated via Kubernetes with a full CI/CD pipeline.

---

## Stack

| Layer | Technology |
|---|---|
| API | FastAPI (Python) |
| Containerization | Docker · Kubernetes |
| CI/CD | pylint · pytest · SonarQube · GitOps |
| LLM | Internal on-premise model (REST interface) |
| Document ingestion | Ingestion from authenticated source |
| Output | openpyxl / Excel generation |

---

## Results

| Metric | Value |
|---|---|
| Performance gain | **+16 points measured in production** |
| Deployment | Production |
| End users | Real business teams, daily use |

The gain came entirely from structured feedback loops with business users — not from model changes. The prompt architecture and output schema were iterated based on qualitative feedback sessions.

---

## Lessons Learned

**Document ingestion in a closed environment** — handling session-based authentication across multiple service restarts required maintaining auth state in a stateless microservices architecture. Not covered in standard documentation.

**User feedback is a feature** — the performance gain had nothing to do with the LLM. It came from understanding how business users read the output and what "correct" actually meant to them.

**Regulated production is a different discipline** — in a GxP environment, every change to a deployed system triggers a validation cycle. Learning to scope changes tightly — to minimize validation overhead without sacrificing quality — was a key engineering constraint.

</div>

<div class="lang-block lang-fr" markdown="1">

# 🟢 Pipeline de génération documentaire IA
**Groupe pharmaceutique international · CAC 40 · Environnement réglementé on-premise**

> Code source confidentiel (environnement industriel réglementé). Ce document couvre l'architecture, la méthodologie et les résultats.

---

## Contexte

Un site pharmaceutique industriel de taille intermédiaire devait transformer des documents DOCX complexes en tableaux Excel structurés — processus auparavant manuel et source d'incohérences. Contrainte forte : **tout le traitement devait passer par une plateforme IA interne, zéro exposition de données à l'extérieur** (conformité GxP, pas de cloud, pas d'appels LLM externes).

Projet construit, déployé et itéré en production sur plusieurs mois, avec de vraies équipes métier comme utilisateurs depuis le premier jour.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        ENTRÉE                               │
│              Fichiers DOCX (source authentifiée)            │
└──────────────────────────┬──────────────────────────────────┘
                           │  Ingestion depuis source authentifiée
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE PRÉTRAITEMENT                     │
│         Extraction structure · Nettoyage · Chunking         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  LLM INTERNE (on-premise)                   │
│         Extraction structurée · Génération de tableaux      │
│              Zéro exposition de données                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   POST-TRAITEMENT                           │
│        Validation · Formatage · Génération Excel            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        SORTIE                               │
│              Tableaux Excel structurés                      │
└─────────────────────────────────────────────────────────────┘
```

**Architecture microservices** — chaque étape est un service FastAPI indépendant, containerisé et orchestré via Kubernetes avec un pipeline CI/CD complet.

---

## Stack

| Couche | Technologie |
|---|---|
| API | FastAPI (Python) |
| Containerisation | Docker · Kubernetes |
| CI/CD | pylint · pytest · SonarQube · GitOps |
| LLM | Modèle interne on-premise (interface REST) |
| Ingestion documents | Ingestion documentaire depuis source authentifiée |
| Sortie | openpyxl / génération Excel |

---

## Résultats

| Métrique | Valeur |
|---|---|
| Gain de performance | **+16 points mesuré en production** |
| Déploiement | Production |
| Utilisateurs | Équipes métier réelles, usage quotidien |

Le gain est venu exclusivement des boucles de feedback structuré avec les utilisateurs métier — pas de changement de modèle. L'architecture de prompt et le schéma de sortie ont été itérés à partir des sessions de feedback qualitatif.

---

## Leçons apprises

**Ingestion documentaire dans un environnement fermé** — gérer l'authentification par session sur plusieurs redémarrages de services a requis le maintien de l'état d'authentification dans une architecture microservices stateless. Non couvert par la documentation standard.

**Le feedback utilisateur est une feature** — le gain de performance n'avait rien à voir avec le LLM. Il venait de la compréhension de comment les utilisateurs métier lisaient la sortie et de ce que "correct" signifiait réellement pour eux.

**La production réglementée est une discipline différente** — dans un environnement GxP, chaque changement d'un système déployé déclenche un cycle de validation. Apprendre à limiter précisément le périmètre des changements — pour minimiser la charge de validation sans sacrifier la qualité — était une contrainte d'ingénierie clé.

</div>
