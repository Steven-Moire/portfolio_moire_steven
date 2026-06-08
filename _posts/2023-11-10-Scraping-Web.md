---
layout: post
title: "Python Scraper — Job Listings (Waalaxy Clone)"
date: 2023-11-10 9:00:00 +0300
categories: [Projet_Data, Ecole]
tags: [Python, Scraping, BeautifulSoup, CSV, SQL]
---

<div class="lang-block lang-en" markdown="1">

## Python Scraper — Job Listings (Waalaxy Clone)
**School project · BeautifulSoup · First Python data pipeline**

---

### Context

School project: build a minimal clone of Waalaxy (a LinkedIn prospecting tool). Objective — scrape job listings, structure the data in CSV, then make it queryable with SQL.

This was the first time I built a data pipeline from scratch in Python.

---

### Pipeline

```
JobbyJobba (job listings site)
    → BeautifulSoup (HTML extraction)
    → Structured records: title · URL · date · city
    → CSV output
    → SQL queries (planned)
```

**Extraction (excerpt):**

```python
from bs4 import BeautifulSoup
import requests, csv

URL = "https://www.jobijoba.com/fr/query/?what=Data+analyst"
soup = BeautifulSoup(requests.get(URL, headers=HEADERS).content, 'html5lib')

records = []
for offer in soup.findAll('div', attrs={'class': 'offer'}):
    records.append({
        'title': offer.h3.text,
        'url':   offer.a['href'],
        'date':  offer.find('span', class_='publication_date').get_text(strip=True),
        'city':  offer.find('span', class_='icon-map-marker')
                      .find_previous('span', class_='feature')
                      .get_text(strip=True)
    })
```

**Stack:** Python · requests · BeautifulSoup · csv · SQL (planned)

---

### Status

Phase 1 (scraping + CSV) complete. The SQL querying layer was planned but not implemented — the project moved to a different scope before I got there.

*What it shows: first end-to-end data collection pipeline in Python, structured problem decomposition.*

</div>

<div class="lang-block lang-fr" markdown="1">

## Scraper Python — Offres d'emploi (clone Waalaxy)
**Projet scolaire · BeautifulSoup · Premier pipeline de données Python**

---

### Contexte

Projet scolaire : construire un clone minimal de Waalaxy (outil de prospection LinkedIn). Objectif — scraper des offres d'emploi, structurer les données en CSV, puis les rendre requêtables en SQL.

C'était la première fois que je construisais un pipeline de données complet en Python.

---

### Pipeline

```
JobbyJobba (site d'offres d'emploi)
    → BeautifulSoup (extraction HTML)
    → Enregistrements structurés : titre · URL · date · ville
    → Sortie CSV
    → Requêtes SQL (prévu)
```

**Extraction (extrait) :**

```python
from bs4 import BeautifulSoup
import requests, csv

URL = "https://www.jobijoba.com/fr/query/?what=Data+analyst"
soup = BeautifulSoup(requests.get(URL, headers=HEADERS).content, 'html5lib')

records = []
for offer in soup.findAll('div', attrs={'class': 'offer'}):
    records.append({
        'title': offer.h3.text,
        'url':   offer.a['href'],
        'date':  offer.find('span', class_='publication_date').get_text(strip=True),
        'city':  offer.find('span', class_='icon-map-marker')
                      .find_previous('span', class_='feature')
                      .get_text(strip=True)
    })
```

**Stack :** Python · requests · BeautifulSoup · csv · SQL (prévu)

---

### Statut

Phase 1 (scraping + CSV) terminée. La couche SQL était prévue mais non implémentée — le projet a évolué vers un autre périmètre avant d'y arriver.

*Ce que ça montre : premier pipeline complet de collecte de données en Python, décomposition structurée d'un problème.*

</div>
