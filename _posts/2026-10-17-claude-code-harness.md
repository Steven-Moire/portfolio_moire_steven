---
layout: post
title: "Claude Code Harness: Working With an AI Coding Agent"
date: 2026-10-17 09:00:00 +0200
categories: [Projet_Data, Personnel]
tags: [Claude-Code, Hooks, Sécurité, Architecture-logicielle, Git]
permalink: /projects/claude-harness/
---

<div class="lang-block lang-en" markdown="1">

# 🔵 Claude Code Harness: Working With an AI Coding Agent
**Personal project · Agent tooling · Daily use**

---

## What This Is

An AI coding agent is only as good as the process around it. Left alone, it guesses scope, refactors things nobody asked for, and declares "done" on a feeling.

**atlas** is my starter template for AI/ML projects. Alongside the service templates, it ships a full [Claude Code](https://claude.com/claude-code) harness: rules, guardrail hooks, specialised agents, skills and slash commands. Every new project starts with the agent already constrained the way I want it to work.

*The repository is private: happy to walk through it in an interview.*

---

## Built On Open Source, Curated

I did not start from scratch. The base is [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) (MIT, Affaan Mustafa), a large community collection. I cut it down to what I actually use, then built on top.

| Component | Installed | What for |
|---|---|---|
| Agents | 28 | Planner, architect, TDD guide, security / Python / FastAPI reviewers… |
| Skills | 101 | Patterns and workflows loaded on demand |
| Commands | 77 | `/plan`, `/code-review`, `/quality-gate`… |
| Rules | 21 | Always-loaded coding, testing and security rules |

Licences are kept apart: the ECC infrastructure stays under its author's MIT licence, my own templates under mine. The merge is documented in a decision record, including the friction it caused.

---

## What I Designed Myself

### 1. A behavioural contract

Seven rules at the top of every `CLAUDE.md`. I did not copy the widely shared "4 rules" for AI agents; I adapted them to multi-service projects:

| Generic advice | My version |
|---|---|
| Ask when uncertain | **Scope first**: list the services impacted, wait for confirmation if more than one |
| Write minimal code | **Service boundaries are red lines**: HTTP `/v1/` only, never a cross-service import |
| Touch only what you must | **No drive-by refactoring**: flag a cleanup, never apply it silently |
| Define done | **Done = objective criteria**: lint, green tests, coverage, clean `git status` |
| *(missing)* | **Read the current code, never memory** |
| *(missing)* | **Anything set aside is tracked** and brought back until I decide to drop it |

### 2. Guardrails as hooks, not wishes

An instruction can be forgotten; a hook cannot.

- **Client-residue guard**: blocks any `git commit` / `git push` whose diff contains a confidential term. It exists because of a real incident: a client identifier slipped into a committed script right after a sanitisation pass. Two lists are merged: past clients live on the machine only, never in a repo; the current project has its own list. Covered by tests.
- **Naming guard**: warns when a Python file's name does not state its role (`_router`, `_service`, `_utils`…), each role having a line budget.
- **Permissions**: force-push denied; push, reset, rebase and `.env` edits always ask a human first.

### 3. Rules that encode real lessons

- Static-analysis rules written after a real scan: cognitive complexity ≤ 15, nesting ≤ 4, mandatory docstrings, and **never "fix" a finding by tricking the scanner**.
- Import discipline (11 rules) against cascading dependencies between layers.

### 4. Rituals and decision records

- `/friday`: weekly audit: quality, security, debt, docs. **Measure and prioritise, never fix on the spot.**
- `/monday`: turns the last audit into a week plan.
- `/passation`: dated handover document, including a non-technical summary.
- `/start-project`: asks the questions that shape the architecture (sensitive data, GPU, local / API / hybrid LLM) before the first line of code.
- Decisions are recorded as ADRs, including a retroactive one when an undocumented choice came back to bite.

---

## What I Learned

- **An agent amplifies the process you give it.** Vague rules give vague results; objective "done" criteria give reviewable work.
- **Guardrails beat instructions** for anything that matters (secrets, confidentiality, irreversible git operations).
- **A guardrail can leak too.** My first list of confidential terms lived in the template, so it shipped with every clone. It now lives on the machine only.
- **Curating is a skill.** Knowing what to remove from a 200+ skill collection matters as much as knowing what to add.

</div>

<div class="lang-block lang-fr" markdown="1">

# 🔵 Harness Claude Code : Travailler avec un agent de code IA
**Projet personnel · Outillage d'agent · Usage quotidien**

---

## Ce que c'est

Un agent de code IA ne vaut que le cadre qu'on lui donne. Livré à lui-même, il devine le périmètre, refactore ce que personne n'a demandé et déclare « terminé » au feeling.

**atlas** est mon template de démarrage pour projets IA/ML. En plus des templates de services, il embarque un harness [Claude Code](https://claude.com/claude-code) complet : règles, hooks garde-fous, agents spécialisés, skills et commandes. Chaque nouveau projet démarre avec un agent déjà cadré comme je veux qu'il travaille.

*Le dépôt est privé : je le présente volontiers en entretien.*

---

## Une base open source, curée

Je ne suis pas parti de zéro. La base est [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) (MIT, Affaan Mustafa), une grande collection communautaire. Je l'ai réduite à ce que j'utilise vraiment, puis j'ai construit par-dessus.

| Composant | Installés | Pour quoi |
|---|---|---|
| Agents | 28 | Planner, architecte, guide TDD, reviewers sécurité / Python / FastAPI… |
| Skills | 101 | Patterns et workflows chargés à la demande |
| Commandes | 77 | `/plan`, `/code-review`, `/quality-gate`… |
| Règles | 21 | Règles de code, tests et sécurité chargées en permanence |

Les licences restent séparées : l'infrastructure ECC sous la licence MIT de son auteur, mes templates sous la mienne. La fusion est documentée dans un enregistrement de décision, frictions comprises.

---

## Ce que j'ai conçu moi-même

### 1. Un contrat comportemental

Sept règles en tête de chaque `CLAUDE.md`. Je n'ai pas copié les « 4 règles » largement partagées pour les agents IA ; je les ai adaptées aux projets multi-services :

| Conseil générique | Ma version |
|---|---|
| Demander en cas de doute | **Périmètre d'abord** : lister les services impactés, attendre confirmation si plus d'un |
| Écrire le minimum de code | **Les frontières de service sont des lignes rouges** : HTTP `/v1/` uniquement, jamais d'import inter-services |
| Ne toucher que le nécessaire | **Zéro refactoring passant** : signaler un nettoyage, ne jamais l'appliquer en silence |
| Définir « terminé » | **Terminé = critères objectifs** : lint, tests verts, couverture, `git status` propre |
| *(absent)* | **Lire le code courant, jamais la mémoire** |
| *(absent)* | **Tout ce qui est mis de côté est tracé** et reproposé jusqu'à ce que je décide de l'abandonner |

### 2. Des garde-fous en hooks, pas en vœux pieux

Une consigne peut s'oublier ; un hook, non.

- **Garde anti-résidus client** : bloque tout `git commit` / `git push` dont le diff contient un terme confidentiel. Il existe à cause d'un vrai incident : un identifiant client s'est glissé dans un script committé juste après un chantier de sanitisation. Deux listes fusionnées : les anciens clients vivent uniquement sur la machine, jamais dans un dépôt ; le projet en cours a sa propre liste. Couvert par des tests.
- **Garde de nommage** : avertit quand le nom d'un fichier Python n'annonce pas son rôle (`_router`, `_service`, `_utils`…), chaque rôle ayant un budget de lignes.
- **Permissions** : force-push interdit ; push, reset, rebase et modification du `.env` demandent toujours l'accord d'un humain.

### 3. Des règles qui encodent de vraies leçons

- Règles d'analyse statique écrites après un vrai scan : complexité cognitive ≤ 15, imbrication ≤ 4, docstrings obligatoires, et **ne jamais « corriger » une alerte en trompant le scanner**.
- Discipline d'import (11 règles) contre les dépendances en cascade entre couches.

### 4. Rituels et enregistrements de décision

- `/friday` : audit hebdomadaire : qualité, sécurité, dette, docs. **Mesurer et prioriser, jamais corriger dans la foulée.**
- `/monday` : transforme le dernier audit en plan de semaine.
- `/passation` : document de passation daté, avec un résumé non technique.
- `/start-project` : pose les questions qui conditionnent l'architecture (données sensibles, GPU, LLM local / API / hybride) avant la première ligne de code.
- Les décisions sont tracées en ADR, y compris une rétroactive, quand un choix non documenté s'est retourné contre moi.

---

## Ce que j'en retiens

- **Un agent amplifie le cadre qu'on lui donne.** Des règles floues donnent des résultats flous ; des critères de « terminé » objectifs donnent un travail relisible.
- **Les garde-fous valent mieux que les consignes** pour tout ce qui compte (secrets, confidentialité, opérations git irréversibles).
- **Un garde-fou peut fuir lui aussi.** Ma première liste de termes confidentiels vivait dans le template : elle partait donc avec chaque clone. Elle vit désormais uniquement sur la machine.
- **Curer est une compétence.** Savoir quoi retirer d'une collection de plus de 200 skills compte autant que savoir quoi ajouter.

</div>
