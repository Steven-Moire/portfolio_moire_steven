---
layout: post
title: "Building This Portfolio"
date: 2023-11-08 9:00:00 +0300
categories: [Projet_Data, Personnel]
tags: [Jekyll, GitHub, Développement-Web, Débrouillardise]
---

<div class="lang-block lang-en" markdown="1">

## Building This Portfolio
**Personal project · Jekyll + GitHub Pages · 2023**

---

### Context

2023, searching for an apprenticeship. No web development background. Needed a portfolio. Built one anyway.

Stack: Jekyll (static site generator, Ruby) + Chirpy theme + GitHub Pages. Chose Jekyll on a ChatGPT recommendation. Figured out the rest from documentation, YouTube tutorials, and trial and error.

---

### Problems I actually solved

**Deployment:** GitHub Actions pipeline wasn't obvious — the Jekyll build had to run in CI, not locally. Had to switch Pages source from "Deploy from branch" to "GitHub Actions" and understand why one build succeeded while another failed.

**Google Drive embeds:** links from Drive didn't work embedded — had to learn the difference between `/view?usp=sharing` and `/preview` URLs. Then discovered that my own Google account was bypassing the sharing restrictions, so I tested with a logged-out browser.

**VBA code sharing:** standard backtick code blocks didn't render VBA correctly in this version of Jekyll — ended up providing a direct download link instead.

**Theme customization:** overriding Chirpy's layouts required understanding Jekyll's inheritance system. Created `_layouts/post.html` to extend the default layout without replacing it.

**Stack:** Jekyll · Ruby · GitHub Pages · GitHub Actions · Chirpy

---

### What it shows

I didn't know how to build this. I built it anyway. The same approach applies to every project: identify the gap, find the path, ship it.

</div>

<div class="lang-block lang-fr" markdown="1">

## Construction de ce portfolio
**Projet personnel · Jekyll + GitHub Pages · 2023**

---

### Contexte

2023, en recherche d'alternance. Pas de background en développement web. Besoin d'un portfolio. Je l'ai construit quand même.

Stack : Jekyll (générateur de site statique, Ruby) + thème Chirpy + GitHub Pages. Jekyll découvert via une recommandation de ChatGPT. Le reste appris par documentation, tutoriels YouTube et essais-erreurs.

---

### Problèmes réellement résolus

**Déploiement :** le pipeline GitHub Actions n'était pas évident — le build Jekyll devait tourner en CI, pas en local. Il a fallu basculer la source Pages de "Deploy from branch" vers "GitHub Actions" et comprendre pourquoi un build réussissait pendant qu'un autre échouait.

**Embeds Google Drive :** les liens Drive ne fonctionnaient pas intégrés — différence entre `/view?usp=sharing` et `/preview` à apprendre. Puis découverte que mon propre compte Google contournait les restrictions de partage — tests avec un navigateur non connecté.

**Partage de code VBA :** les blocs backtick standard ne rendaient pas le VBA correctement dans cette version de Jekyll — solution : lien de téléchargement direct.

**Personnalisation du thème :** surcharger les layouts Chirpy nécessitait de comprendre le système d'héritage Jekyll. Création de `_layouts/post.html` pour étendre le layout par défaut sans le remplacer.

**Stack :** Jekyll · Ruby · GitHub Pages · GitHub Actions · Chirpy

---

### Ce que ça montre

Je ne savais pas construire ça. Je l'ai construit quand même. Le même état d'esprit s'applique à tous les projets : identifier le manque, trouver le chemin, livrer.

</div>
