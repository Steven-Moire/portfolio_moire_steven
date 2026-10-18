> *"Ancien enseignant reconverti dans la data, parce que savoir faire, c'est bien. Savoir expliquer pourquoi, c'est mieux."*

# Steven Moire Bordier
### AI Engineer · ML Engineer · MLOps

[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](#)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)](#)
[![MLflow](https://img.shields.io/badge/MLflow-0194E2?style=flat-square&logo=mlflow&logoColor=white)](#)
[![TOEIC](https://img.shields.io/badge/TOEIC-865%2F990-005eb8?style=flat-square)](#)

[steven.bordier@gmail.com](mailto:steven.bordier@gmail.com) · [LinkedIn](https://www.linkedin.com/in/steven-moirebordier-490556108/) · Available now

---

## About

Former teacher turned AI Engineer, with 2 years hands-on in a regulated industrial environment (GxP, pharmaceutical compliance). Projects shipped in production on an on-premise private cloud: a GxP document clustering tool used by a quality specialist, and an LLM document-generation pipeline used by two business users. Also a proof of concept for anomaly detection on cold-chain equipment.

My background in education shapes how I approach technical work: I design for clarity, document my reasoning, and make architectural choices I can defend.

Status: Apprenticeship completed · Available now

---

## Education

| Year | Program |
|---|---|
| 2026 | Master's level (Bac+5), RNCP38587 *Expert en ingénierie de l'intelligence artificielle* (EQF level 7), École Liora |
| 2026 | Machine Learning Engineer certification, Mines Paris - PSL Executive Education |
| 2023–2024 | Bachelor Data Analyst |

## Certifications

| Certification | Result |
|---|---|
| TOEIC Listening & Reading | **865/990 (2024)** |
| Microsoft Applied Skills | Power Automate |
| Microsoft Applied Skills | Power Apps |

## Teaching & Knowledge Sharing

Before data, I taught economics and management for 2 years, and I still teach, to adults now: presentations to teams on what AI is and what it is not, short workshops on computer vision and digital twins, and at group level two prompt-optimization workshops (~50 participants) and a webinar on Chinese LLMs (110 participants). The same habit shaped my projects: the performance gain of the document-generation pipeline came from user feedback, not from the model.

---

## Tech Stack

| Domain | Tools |
|---|---|
| **ML / DL** | Scikit-learn · Isolation Forest · PyTorch (academic) · TensorFlow/Keras (academic) · XGBoost (academic) |
| **NLP / LLM** | HuggingFace Transformers · Mistral 7B · multilingual-e5 · HDBSCAN · structured LLM output · prompt engineering |
| **MLOps** | MLflow · DVC · Evidently (academic) |
| **Infra / DevOps** | Docker · Kubernetes · ArgoCD · GitHub Actions · SonarQube · Checkmarx · CI/CD |
| **Data Engineering** | Pandas · NumPy · FastAPI · Flask · Playwright · MinIO (academic) |
| **Visualization / BI** | Power BI · Streamlit · Dash · Plotly |
| **Environments** | On-premise private cloud · GxP-compliant infrastructure · closed networks |

---

## Projects

### Professional · International Pharmaceutical Group

| Status | Project | Summary | Stack |
|---|---|---|---|
| Production | [**AI Document Generation**](projects/pharma-client-doc-generation/) | DOCX → Excel pipeline driving the internal LLM through Playwright. Significant performance gain measured in production, two business users. Kubernetes, multi-region. | `Python` `FastAPI` `Playwright` `K8s` |
| Production | [**GxP Document Intelligence**](projects/pharma-client-gxp-document-intelligence/) | Semantic clustering of several hundred GxP documents: multilingual embeddings + HDBSCAN, local Mistral 7B with structured JSON output. 6 microservices, in production for one quality specialist. | `HuggingFace` `HDBSCAN` `Mistral 7B` |
| PoC | [**Predictive Maintenance**](projects/pharma-client-predictive-maintenance/) | Anomaly detection proof of concept on 15 cold-chain units: weighted rules from equipment documentation (75 to 80% detection) + unsupervised Isolation Forest layer. Not deployed to production. | `Scikit-learn` `FastAPI` `Docker` |

### Academic

| Status | Project | Summary | Stack |
|---|---|---|---|
| Complete | [**COVID X-Ray Classification**](projects/covid-xray-classification/) | 42K chest X-rays, 4-class CNN with Grad-CAM interpretability + full MLOps infrastructure. | `PyTorch` `Keras` `Streamlit` `DVC` |
| In progress | [**MLOps Pipeline**](projects/mlops-pipeline/) | Full MLOps stack from scratch, 4-phase roadmap. Phase 3/4 in progress. | `FastAPI` `Kubernetes` `MLflow` `Evidently` |

### Personal

| Status | Project | Summary | Stack |
|---|---|---|---|
| In progress | **Légifrance RAG** (in progress) | Hand-built retrieval over French legal texts, no framework: multilingual-e5-large embeddings, Qdrant in Docker. Personal project, no public code yet. | `Python` `Qdrant` `Docker` |
| Tooling | [**Claude Code Harness**](https://steven-moire.github.io/portfolio_moire_steven/projects/claude-harness/) | Claude Code setup: rules, guardrail hooks, curated agents & skills. | `Claude Code` `Node.js` `Git hooks` |
| Template | [**ms-template**](projects/ms-template/) | Reusable microservices boilerplate: dashboard, centralized logging, SOLID architecture. | `Flask` `Docker` `Bash` |
| In progress | [**Nutrition App**](projects/nutrition-app/) | Meal planning app: 345 ingredients (CIQUAL), 64 recipes, nutritional tracking. | `Flask` `Python` |


---

## Contact

- [steven.bordier@gmail.com](mailto:steven.bordier@gmail.com)
- [LinkedIn · Steven Moire Bordier](https://www.linkedin.com/in/steven-moirebordier-490556108/)
- Open to AI Engineer · ML Engineer · MLOps roles · **Available now**

---

<sub>Jekyll + Chirpy · GitHub Pages · France France · Theme: MIT  Cotes Chung · content & site code:  Steven Moire Bordier, see [NOTICE](NOTICE.md)</sub>
