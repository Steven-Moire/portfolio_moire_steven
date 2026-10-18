# Predictive Maintenance: Industrial Cold Chain (PoC)
> Proof of concept · International pharmaceutical group

Anomaly detection proof of concept on 15 cold-chain units, not deployed to production. Machine learning and deep learning were tried first, with disappointing results. The final approach is a weighted rule system built from the equipment technical documentation (score out of 100, score ranges mapped to anomaly categories, 75 to 80% detection), with an unsupervised Isolation Forest layer on top. Scoring exposed through a FastAPI service.

Stack: Python · Scikit-learn · FastAPI · Docker · Kubernetes

**[Full documentation →](https://steven-moire.github.io/portfolio_moire_steven/projects/predictive-maintenance/)**

---

# Maintenance prédictive : chaîne du froid industrielle (PoC)
> Preuve de concept · Groupe pharmaceutique international

Preuve de concept de détection d'anomalies sur 15 équipements de chaîne du froid, non déployée en production. Machine learning puis deep learning ont été essayés en premier, avec des résultats décevants. L'approche retenue est un système de règles pondérées construit à partir de la documentation technique des équipements (score sur 100, plages de score associées aux catégories d'anomalies, 75 à 80 % de détection), avec une couche Isolation Forest non supervisée par-dessus. Scoring exposé via un service FastAPI.

Stack : Python · Scikit-learn · FastAPI · Docker · Kubernetes

**[Documentation complète →](https://steven-moire.github.io/portfolio_moire_steven/projects/predictive-maintenance/)**
