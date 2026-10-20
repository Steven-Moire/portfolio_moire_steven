> *"Ancien enseignant reconverti dans la data, parce que savoir faire, c'est bien. Savoir expliquer pourquoi, c'est mieux."*

# Steven Moire Bordier
### ML Engineer · Data Scientist · AI Engineer

[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](#)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)](#)
[![MLflow](https://img.shields.io/badge/MLflow-0194E2?style=flat-square&logo=mlflow&logoColor=white)](#)
[![TOEIC](https://img.shields.io/badge/TOEIC-865%2F990-005eb8?style=flat-square)](#)

[steven.bordier@gmail.com](mailto:steven.bordier@gmail.com) · [LinkedIn](https://www.linkedin.com/in/steven-moirebordier-490556108/) · Available now

---

## About

Former economics and management teacher who moved into data, with a pedagogical and andragogical mindset. I first went back to studying data analysis, which fits with economics and management. With my accounting and finance specialty, I had already done some SQL, and I taught students in a BTS SIO (a French IT services degree). I had also built my own PC and, when I was younger, done a bit of programming: so I went for it, because it really appealed to me and it fit with what I had done and with who I was.

Teaching first gives me the business side: the client or the company that hires me has a problem, and it has to be solved with performance in mind, which means effectiveness and efficiency. No point doing deep learning if a VBA macro is enough.

2 years as an apprentice in an international pharmaceutical group, in a regulated industrial environment (GxP, compliance). Projects shipped in production on an on-premise private cloud: a GxP document clustering tool and an LLM document-generation pipeline. Also a proof of concept for anomaly detection on cold-chain equipment.

I am looking for a data scientist role, rather focused on model training. But during my apprenticeship I loved the whole architecture side, so I am also looking at AI engineer roles.

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

Before data, I taught economics and management for 2 years, and I keep passing knowledge on: presentations to teams on what AI is and what it is not, short workshops on computer vision and digital twins, and at group level two prompt-optimization workshops (~50 participants) and a webinar on Chinese LLMs (110 participants).

These are complex notions, sometimes disconnected from our everyday reality. I think we are living through a turning point, like the one we went through with the Internet. The goal is to support people, help them and make things understandable, because a tool that is not understood will not be adopted, and that can cause problems. It comes back to the business view.

What struck me most was with high school students (10th grade) on internships: we talk about AI, but for them it stops at GPT and the technology is only 10 years old, when it actually dates back to the 1950s and is a rich field where you can do amazing things.

---

## Tech Stack

| Domain | Tools |
|---|---|
| **ML / DL** | Scikit-learn · Isolation Forest · TensorFlow/Keras (academic) · XGBoost (academic) |
| **NLP / LLM** | HuggingFace Transformers · Mistral 7B · multilingual-e5 · HDBSCAN · structured LLM output · prompt engineering |
| **MLOps** | MLflow · DVC · Prometheus · Grafana · Evidently (academic) |
| **Infra / DevOps** | Docker · Kubernetes · ArgoCD · GitHub Actions · SonarQube · Checkmarx · CI/CD |
| **Data Engineering** | Pandas · NumPy · FastAPI · Flask · Playwright · MinIO (academic) |
| **Visualization / BI** | Power BI · Streamlit · Dash · Plotly |
| **Environments** | On-premise private cloud · GxP-compliant infrastructure · closed networks |

---

## Projects

### Professional · International Pharmaceutical Group

| Status | Project | Summary | Stack |
|---|---|---|---|
| Production | [**AI Document Generation**](projects/pharma-client-doc-generation/) | DOCX → Excel pipeline driving the internal LLM through Playwright. Significant performance gain measured in production. Kubernetes, multi-region. | `Python` `FastAPI` `Playwright` `K8s` |
| Production | [**GxP Document Intelligence**](projects/pharma-client-gxp-document-intelligence/) | Semantic clustering of several hundred GxP documents: multilingual embeddings + HDBSCAN, local Mistral 7B with structured JSON output. 6 microservices, in production. | `HuggingFace` `HDBSCAN` `Mistral 7B` |
| PoC | [**Predictive Maintenance**](projects/pharma-client-predictive-maintenance/) | Anomaly detection proof of concept on 15 cold-chain units: weighted rules from equipment documentation + unsupervised Isolation Forest layer. Not deployed to production. | `Scikit-learn` `FastAPI` `Docker` |

### Academic

| Status | Project | Summary | Stack |
|---|---|---|---|
| Complete | [**COVID X-Ray Classification**](projects/covid-xray-classification/) | 4-class CNN (Keras) on chest X-rays with Grad-CAM: 88% accuracy on a held-out test set. Team project: 8 containerized services, CI/CD, Prometheus and Grafana monitoring. | `Keras` `Streamlit` `DVC` `Grafana` |

### Personal

| Status | Project | Summary | Stack |
|---|---|---|---|
| In progress | **Légifrance RAG** (in progress) | Hand-built retrieval over French legal texts, no framework: multilingual-e5-large embeddings, Qdrant in Docker. Personal project, no public code yet. | `Python` `Qdrant` `Docker` |
| Template | [**atlas**](https://steven-moire.github.io/portfolio_moire_steven/projects/atlas/) | Starter template for AI/ML projects: 7 service templates, blocking CI quality and security checks, curated Claude Code setup. Private repository. | Python · FastAPI · Docker · Helm · Claude Code |
| In progress | [**Nutrition App**](projects/nutrition-app/) | Meal planning app: 345 ingredients (CIQUAL), 64 recipes, nutritional tracking. | `Flask` `Python` |


---

## Contact

- [steven.bordier@gmail.com](mailto:steven.bordier@gmail.com)
- [LinkedIn · Steven Moire Bordier](https://www.linkedin.com/in/steven-moirebordier-490556108/)
- Open to ML Engineer · Data Scientist · AI Engineer roles · **Available now**

---

<sub>Jekyll + Chirpy · GitHub Pages · France France · Theme: MIT  Cotes Chung · content & site code:  Steven Moire Bordier, see [NOTICE](NOTICE.md)</sub>
