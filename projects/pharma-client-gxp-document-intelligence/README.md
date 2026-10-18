# GxP Document Intelligence: Semantic Clustering & Local LLM
> Production · International pharmaceutical group

Semantic clustering of several hundred GxP documents (SOPs & work instructions): multilingual embeddings (multilingual-e5-large) + HDBSCAN clustering + local Mistral 7B (Hugging Face download, 4-bit) producing structured JSON with retry, called through an internal API. No vector database, no retrieval. 6 Python microservices, 812 unit tests, blocking coverage gate ≥ 70%. In production on an on-premise private cloud, used by one quality specialist; the LLM itself is not part of the production deployment.

Stack: Python · HuggingFace · HDBSCAN · Mistral 7B (4-bit) · FastAPI · Flask · Docker · Kubernetes · GitHub Actions · SonarQube · Checkmarx

**[Full documentation →](https://steven-moire.github.io/portfolio_moire_steven/projects/gxp-document-intelligence/)**

---

# GxP Document Intelligence : clustering sémantique et LLM local
> Production · Groupe pharmaceutique international

Clustering sémantique de plusieurs centaines de documents GxP (SOPs & modes opératoires) : embeddings multilingues (multilingual-e5-large) + clustering HDBSCAN + Mistral 7B local (téléchargé depuis Hugging Face, 4-bit) produisant un JSON structuré avec relance, appelé via une API interne. Pas de base vectorielle, pas de retrieval. 6 microservices Python, 812 tests unitaires, seuil de couverture bloquant ≥ 70 %. En production sur un cloud privé on-premise, utilisé par une personne de l'équipe qualité ; le LLM lui-même ne fait pas partie du déploiement de production.

Stack : Python · HuggingFace · HDBSCAN · Mistral 7B (4-bit) · FastAPI · Flask · Docker · Kubernetes · GitHub Actions · SonarQube · Checkmarx

**[Documentation complète →](https://steven-moire.github.io/portfolio_moire_steven/projects/gxp-document-intelligence/)**
