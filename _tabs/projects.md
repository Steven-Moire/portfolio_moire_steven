---
layout: page
icon: fas fa-folder-open
order: 1
title: Projects
---

<style>
.lang-block { display: none; }
.lang-block.lang-en { display: block; }
html[data-lang="fr"] .lang-block.lang-en { display: none; }
html[data-lang="fr"] .lang-block.lang-fr { display: block; }
#lang-toggle-btn {
  position: fixed; bottom: 2rem; right: 2rem;
  padding: .35rem .85rem; border: 1.5px solid currentColor;
  border-radius: 6px; background: transparent; cursor: pointer;
  font-size: .78rem; font-weight: 700; letter-spacing: .1em;
  opacity: .55; transition: opacity .15s; z-index: 999;
}
#lang-toggle-btn:hover { opacity: 1; }
</style>

<script>
(function () { document.documentElement.dataset.lang = localStorage.getItem('portfolio-lang') || 'en'; })();
</script>

<div class="lang-block lang-en" markdown="1">

## Professional · International Pharmaceutical Group

> *Regulated industrial environment (GxP, compliance) · On-premise AI platform · Closed network*

| Status | Project | Summary | Stack |
|---|---|---|---|
| Production | [**AI Document Generation**]({{ '/projects/doc-generation/' | relative_url }}) | DOCX → Excel pipeline driving the internal LLM through Playwright. Significant performance gain measured in production, two business users. Kubernetes, multi-region. | Python · FastAPI · Playwright · K8s |
| Production | [**GxP Document Intelligence**]({{ '/projects/gxp-document-intelligence/' | relative_url }}) | Semantic clustering of several hundred GxP documents: multilingual embeddings + HDBSCAN, local Mistral 7B with structured JSON output. 6 microservices, in production for one quality specialist. | HuggingFace · HDBSCAN · Mistral 7B |
| PoC | [**Predictive Maintenance**]({{ '/projects/predictive-maintenance/' | relative_url }}) | Anomaly detection proof of concept on 15 cold-chain units: weighted rules from equipment documentation (75 to 80% detection) + unsupervised Isolation Forest layer. Not deployed to production. | Scikit-learn · FastAPI · Docker |

---

## Academic: École Liora

| Status | Project | Summary | Stack |
|---|---|---|---|
| Complete | [**COVID X-Ray Classification**]({{ '/projects/covid-xray/' | relative_url }}) | 42K chest X-rays, 4-class CNN with Grad-CAM + full MLOps infrastructure (9 services). | PyTorch · Keras · Streamlit · DVC |
| In progress | [**MLOps Pipeline**]({{ '/projects/mlops-pipeline/' | relative_url }}) | Full MLOps stack from scratch: 4-phase roadmap. Phase 3/4 in progress. | FastAPI · Kubernetes · MLflow · Evidently |

---

## Personal

| Status | Project | Summary | Stack |
|---|---|---|---|
| In progress | **Légifrance RAG** (in progress) | Hand-built retrieval over French legal texts, no framework: multilingual-e5-large embeddings, Qdrant in Docker. Personal project, no public code yet. | Python · Qdrant · Docker |
| Tooling | [**Claude Code Harness**]({{ '/projects/claude-harness/' | relative_url }}) | Claude Code setup: rules, guardrail hooks, curated agents & skills. | Claude Code · Node.js · Git hooks |
| Template | [**ms-template**]({{ '/projects/ms-template/' | relative_url }}) | Reusable microservices boilerplate: dashboard, centralized logging, SOLID architecture. | Flask · Docker · Bash |
| In progress | [**Nutrition App**]({{ '/projects/nutrition-app/' | relative_url }}) | Meal planning app: 345 CIQUAL ingredients, 64 recipes, nutritional tracking. | Flask · Python |

---


</div>

<div class="lang-block lang-fr" markdown="1">

## Professionnel · Groupe pharmaceutique international

> *Environnement industriel réglementé (GxP, compliance) · Plateforme IA on-premise · Réseau fermé*

| Statut | Projet | Résumé | Stack |
|---|---|---|---|
| Production | [**Génération documentaire IA**]({{ '/projects/doc-generation/' | relative_url }}) | Pipeline DOCX → Excel pilotant le LLM interne via Playwright. Gain de performance significatif mesuré en production, deux utilisateurs métier. Kubernetes multi-région. | Python · FastAPI · Playwright · K8s |
| Production | [**GxP Document Intelligence**]({{ '/projects/gxp-document-intelligence/' | relative_url }}) | Clustering sémantique de plusieurs centaines de documents GxP : embeddings multilingues + HDBSCAN, Mistral 7B local avec sortie JSON structurée. 6 microservices, en production pour une personne de l'équipe qualité. | HuggingFace · HDBSCAN · Mistral 7B |
| PoC | [**Maintenance prédictive**]({{ '/projects/predictive-maintenance/' | relative_url }}) | Preuve de concept de détection d'anomalies sur 15 équipements de chaîne du froid : règles pondérées issues de la documentation équipements (75 à 80 % de détection) + couche Isolation Forest non supervisée. Non déployée en production. | Scikit-learn · FastAPI · Docker |

---

## Académique : École Liora

| Statut | Projet | Résumé | Stack |
|---|---|---|---|
| Terminé | [**Classification radio COVID**]({{ '/projects/covid-xray/' | relative_url }}) | 42 000 radios thoraciques, CNN 4 classes avec Grad-CAM + infrastructure MLOps complète (9 services). | PyTorch · Keras · Streamlit · DVC |
| En cours | [**Pipeline MLOps**]({{ '/projects/mlops-pipeline/' | relative_url }}) | Stack MLOps complète from scratch : roadmap 4 phases. Phase 3/4 en cours. | FastAPI · Kubernetes · MLflow · Evidently |

---

## Personnel

| Statut | Projet | Résumé | Stack |
|---|---|---|---|
| En cours | **RAG Légifrance** (en cours) | Recherche documentaire sur les textes juridiques français codée à la main, sans framework : embeddings multilingual-e5-large, Qdrant en Docker. Projet personnel, pas encore de code public. | Python · Qdrant · Docker |
| Outillage | [**Harness Claude Code**]({{ '/projects/claude-harness/' | relative_url }}) | Configuration Claude Code : règles, hooks garde-fous, agents et skills curés. | Claude Code · Node.js · Git hooks |
| Template | [**ms-template**]({{ '/projects/ms-template/' | relative_url }}) | Boilerplate microservices réutilisable : dashboard, logging centralisé, architecture SOLID. | Flask · Docker · Bash |
| En cours | [**Application Nutrition**]({{ '/projects/nutrition-app/' | relative_url }}) | Application de planification repas : 345 ingrédients CIQUAL, 64 recettes, suivi nutritionnel. | Flask · Python |

---


</div>

<script src="{{ '/assets/js/lang-toggle.js' | relative_url }}"></script>
