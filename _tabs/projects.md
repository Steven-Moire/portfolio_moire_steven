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

## Professional — International Pharmaceutical Group (CAC 40)

> *Regulated industrial environment (GxP, compliance) · On-premise AI platform · Closed network*

| | Project | Summary | Stack |
|---|---|---|---|
| 🟢 | [**AI Document Generation**]({{ '/projects/doc-generation/' | relative_url }}) | DOCX → Excel pipeline via internal LLM. 58% → 74% performance. In production. | Python · FastAPI · Docker · K8s |
| 🟢 | [**Predictive Maintenance**]({{ '/projects/predictive-maintenance/' | relative_url }}) | Anomaly detection on 15 cold-chain units. Hybrid rules + Isolation Forest. F1=0.778. | Scikit-learn · MLflow · Grafana |
| 🟢 | [**Smart Doc Reduction**]({{ '/projects/smart-doc-reduction/' | relative_url }}) | RAG over 500 GxP documents. On-premise, multilingual embeddings + HDBSCAN. | HuggingFace · HDBSCAN · Mistral 7B |

---

## Academic — École Liora

| | Project | Summary | Stack |
|---|---|---|---|
| 🟢 | [**COVID X-Ray Classification**]({{ '/projects/covid-xray/' | relative_url }}) | 42K chest X-rays, 4-class CNN with Grad-CAM + full MLOps infrastructure (9 services). | PyTorch · Keras · Streamlit · DVC |
| 🟡 | [**MLOps Pipeline**]({{ '/projects/mlops-pipeline/' | relative_url }}) | Full MLOps stack from scratch — 4-phase roadmap. Phase 3/4 in progress. | FastAPI · Kubernetes · MLflow · Evidently |

---

## Personal

| | Project | Summary | Stack |
|---|---|---|---|
| 🔵 | [**ms-template**]({{ '/projects/ms-template/' | relative_url }}) | Reusable microservices boilerplate — dashboard, centralized logging, SOLID architecture. | Flask · Docker · Bash |
| 🟡 | [**Nutrition App**]({{ '/projects/nutrition-app/' | relative_url }}) | Meal planning app — 345 CIQUAL ingredients, 64 recipes, nutritional tracking. | Flask · Python |

---

*🟢 Production / Complete · 🟡 In Progress · 🔵 Template*

</div>

<div class="lang-block lang-fr" markdown="1">

## Professionnel — Groupe pharmaceutique international (CAC 40)

> *Environnement industriel réglementé (GxP, compliance) · Plateforme IA on-premise · Réseau fermé*

| | Projet | Résumé | Stack |
|---|---|---|---|
| 🟢 | [**Génération documentaire IA**]({{ '/projects/doc-generation/' | relative_url }}) | Pipeline DOCX → Excel via LLM interne. 58% → 74% de performance. En production. | Python · FastAPI · Docker · K8s |
| 🟢 | [**Maintenance prédictive**]({{ '/projects/predictive-maintenance/' | relative_url }}) | Détection d'anomalies sur 15 équipements de chaîne du froid. Règles hybrides + Isolation Forest. F1=0,778. | Scikit-learn · MLflow · Grafana |
| 🟢 | [**Smart Doc Reduction**]({{ '/projects/smart-doc-reduction/' | relative_url }}) | RAG sur 500 documents GxP. On-premise, embeddings multilingues + HDBSCAN. | HuggingFace · HDBSCAN · Mistral 7B |

---

## Académique — École Liora

| | Projet | Résumé | Stack |
|---|---|---|---|
| 🟢 | [**Classification radio COVID**]({{ '/projects/covid-xray/' | relative_url }}) | 42 000 radios thoraciques, CNN 4 classes avec Grad-CAM + infrastructure MLOps complète (9 services). | PyTorch · Keras · Streamlit · DVC |
| 🟡 | [**Pipeline MLOps**]({{ '/projects/mlops-pipeline/' | relative_url }}) | Stack MLOps complète from scratch — roadmap 4 phases. Phase 3/4 en cours. | FastAPI · Kubernetes · MLflow · Evidently |

---

## Personnel

| | Projet | Résumé | Stack |
|---|---|---|---|
| 🔵 | [**ms-template**]({{ '/projects/ms-template/' | relative_url }}) | Boilerplate microservices réutilisable — dashboard, logging centralisé, architecture SOLID. | Flask · Docker · Bash |
| 🟡 | [**Application Nutrition**]({{ '/projects/nutrition-app/' | relative_url }}) | Application de planification repas — 345 ingrédients CIQUAL, 64 recettes, suivi nutritionnel. | Flask · Python |

---

*🟢 Production / Terminé · 🟡 En cours · 🔵 Template*

</div>

<script src="{{ '/assets/js/lang-toggle.js' | relative_url }}"></script>
