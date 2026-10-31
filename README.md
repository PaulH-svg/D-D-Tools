# La Table du MJ

Outil local en français pour le suivi des combats D&D 5e (2014), réservé au MJ. Aucun lancer de dés, compte utilisateur, service externe ou dépendance npm.

## Lancer

Prérequis : Python 3. Depuis le dossier du projet :

```sh
python3 -m http.server 5173 --bind 127.0.0.1
```

Ouvrir l’adresse locale du serveur dans son navigateur. `npm start` lance la même commande si Node.js est installé. Garder le même navigateur, profil, hôte et port pour retrouver la sauvegarde. Le serveur est réservé à la machine locale.

## Utilisation

1. Préparer et nommer une rencontre dans « Rencontres », puis créer les fiches PJ et PNJ dans « Fiches », avec caractéristiques, compétences, attaques, sorts et traits. Le catalogue local propose 588 profils en français : 334 entrées du SRD 5.1 de 2014 et 254 profils de campagne supplémentaires.
2. Ajouter les participants à la rencontre ; une créature peut être ajoutée plusieurs fois.
3. Saisir l’initiative commune des monstres et les initiatives individuelles des PJ et PNJ, puis commencer le combat. À initiative égale, les PJ/PNJ jouent avant le groupe de monstres ; les égalités dans chacun de ces ensembles sont départagées alphabétiquement.
4. Cliquer sur un participant pour consulter sa fiche compacte en deux colonnes et gérer ses PV, CA, états, épuisement et notes. Le menu « Appliquer un état » ajoute un état et affiche ses effets ; la croix le retire. « ? Règles des états » ouvre le référentiel des 14 états et de l’épuisement (2014), consultable même sans état actif. Les niveaux d’épuisement affichent tous les effets cumulés. Le bouton « Tour suivant » suit l’ordre d’initiative, ignore les participants à 0 PV et incrémente les rounds.
5. Exporter régulièrement une sauvegarde JSON. L’import remplace les fiches et toutes les rencontres après confirmation.

Les fiches du catalogue et les copies en combat sont indépendantes. Les états et l’épuisement sont des marqueurs : leurs effets mécaniques sont appliqués manuellement par le MJ. Les PJ à 0 PV sont ignorés par le passage des tours ; leurs sauvegardes contre la mort restent à suivre à la table. La mort n’est pas automatiquement déduite d’un état. Les durées se suivent dans les effets de sorts et les notes ; la concentration liée aux participants apparaît sur la fiche du lanceur.

Les informations détaillées sont réparties entre « Actions & sorts », « Traits & sens » et « Notes » pour garder une fiche compacte. Sur ordinateur, les actions très longues défilent dans leur panneau ; sur téléphone, les colonnes sont empilées pour rester lisibles. Les PV, la CA, les caractéristiques et le prochain tour restent directement accessibles.

## Données et confidentialité

Les données sont stockées dans le localStorage du navigateur, pas dans le dépôt ni sur le serveur Python. Une suppression des données du navigateur ou l’utilisation d’un autre profil peut les faire disparaître. L’export JSON permet leur transfert et leur sauvegarde. En cas d’échec du stockage, un message demande d’exporter les données.

Le fichier SRD contient 334 entrées (créatures, PNJ et variantes de formes) du *System Reference Document 5.1*, par Wizards of the Coast LLC, sous licence CC BY 4.0. Les textes français sont adaptés de la traduction communautaire pour FoundryVTT (adgranger et contributeurs), avec licence MIT conservée dans `licenses/`. Voir [SOURCES.md](SOURCES.md) pour les versions exactes, adaptations et crédits. Les profils de La Tombe de l’Annihilation sont conservés dans un fichier de campagne séparé ; les autres suppléments ne sont pas inclus. Aucune ressource distante n’est chargée au démarrage.

Conserver le dossier `data` à côté de `index.html` : `bestiary.json` contient le SRD et `tomb-of-annihilation.json` les compléments de campagne. Les fiches personnelles sont indépendantes du catalogue intégré et restent sauvegardées dans le navigateur. Une mise à jour du catalogue ne les écrase pas.

## Vérifications

Node.js 18+ pour exécuter `npm test` (moteur de combat). Aucun paquet à installer. L’interface doit aussi être vérifiée dans un navigateur : création et modification de fiches, ajout de doublons, initiative, dégâts/soins, états, passage des tours, rechargement, export/import.

## Effets de sorts

L’onglet **Effets de sorts**, à côté d’**États & épuisement**, propose 30 effets issus des sorts du SRD 5.1 (2014) : bonus/malus, protections, modifications de vitesse ou de taille, résistances, PV temporaires, etc. Ouvrir le catalogue, choisir un sort et lire son résumé avant de l’appliquer au participant sélectionné. Renseigner le lanceur, la durée, la concentration et les précisions utiles (bonus, variante, résistance choisie, PV temporaires restants…).

Les effets actifs sont repliables pour conserver une fiche compacte. Cliquer sur leur nom pour lire leurs conséquences, sur « Modifier le suivi » pour changer leurs indications, ou sur la croix pour les retirer. Les effets sont sauvegardés et inclus dans l’export JSON ; les anciennes sauvegardes restent compatibles.

Le suivi des conséquences et des échéances est manuel : les chiffres de la fiche ne changent pas automatiquement. Aucun jet de dé n’est effectué. Voir [SOURCES.md](SOURCES.md) pour la liste des références et les limites du suivi.

## Lanceurs et concentration

Dans la fenêtre d’un effet de sort, sélectionner le **Lanceur dans le combat**. Le lien utilise le participant précis : deux créatures de même nom restent distinctes. Pour une source extérieure au combat, choisir « Autre / hors combat » et saisir son nom.

La fiche du lanceur affiche un bandeau **Concentration** avec le sort maintenu et ses cibles, même dans l’onglet des états. La liste d’initiative le signale également. L’onglet **Effets de sorts** distingue les **Sorts lancés** des **Effets reçus**, y compris les sorts sans concentration. Les noms de cibles sont cliquables.

**Rompre la concentration** retire, après confirmation, les effets à concentration liés à ce lanceur sur toutes les cibles du combat. Les sorts sans concentration et ceux des autres lanceurs sont conservés. Retirer une cible ou un effet actualise immédiatement le bandeau ; il disparaît après le dernier effet à concentration. Les jets de sauvegarde, échéances et conséquences mécaniques restent manuels. Si plusieurs sorts à concentration sont indiqués pour le même lanceur, un avertissement rappelle la règle ; aucun n’est supprimé sans action du MJ.

Les anciens effets avec un nom saisi en texte sont reconnus si ce nom correspond à un seul participant (sans tenir compte des majuscules ou des espaces autour). En cas de doublon ou d’absence de correspondance, modifier l’effet et sélectionner le bon lanceur. Les liens sont inclus dans les sauvegardes JSON. Après retrait d’un lanceur du combat, ses effets sur les autres cibles restent présents pour permettre au MJ de décider de leur sort ; sa fiche n’est plus liée.

## Bestiaire, filtres et facteur de puissance

Dans **Fiches**, choisir le catalogue (bestiaire SRD, fiches personnelles ou les deux), le type de participant, le type de créature et le FP. La recherche par nom ignore les accents. Les filtres se combinent et les résultats sont paginés par 24 fiches.

**Consulter** affiche les statistiques, compétences, attaques et traits. **Personnaliser** crée une copie modifiable dans les fiches personnelles ; la base SRD reste intacte. Les fiches personnalisées peuvent aussi recevoir un type et un FP. **Au combat** ajoute une copie indépendante à la rencontre. Depuis le combat, **Ouvrir le bestiaire** permet de rechercher des adversaires.

Le **facteur de puissance (FP)** est l’indice de danger d’une créature dans les règles 2014 ; 1/8, 1/4 et 1/2 sont de vraies valeurs fractionnaires. Le nombre de **PX** associé est également affiché. Le FP n’est pas un niveau de PJ ni un calcul de difficulté globale : le nombre de monstres, leur composition et les circonstances comptent.

## Aperçu des prochains tours

Le bandeau au-dessus du combat affiche **Maintenant → Ensuite → Puis**, avec le round prévu. La prochaine fiche est repérée en vert dans l’ordre d’initiative, la fiche active en doré. Cliquer sur le bandeau consulte une fiche sans faire avancer le combat. Les participants à 0 PV sont ignorés, comme par « Tour suivant ». Avant le démarrage, le bandeau annonce les premiers participants selon les initiatives saisies. À initiative égale, les PJ et PNJ précèdent les monstres, afin de conserver les monstres ensemble ; l’ordre alphabétique départage chaque ensemble.

## Préparer plusieurs combats

L’onglet **Rencontres** regroupe les combats enregistrés. **Préparer un combat** crée une rencontre vide que l’on peut nommer, composer et régler avant la partie. Dans le combat, le menu **Rencontre** permet de passer directement de l’une à l’autre. Le bestiaire indique le nom du combat dans lequel il ajoutera les participants.

Chaque rencontre garde ses propres participants, PV, CA modifiées, états, effets de sorts, notes, initiatives, round et tour en cours. Changer de rencontre ne remet rien à zéro ; la rencontre sélectionnée est retrouvée après rechargement. Les fiches personnelles sont communes à toutes les rencontres, mais les copies de combat évoluent indépendamment : les blessures ne sont pas transférées automatiquement d’un combat à l’autre.

**Dupliquer** prépare un nouveau combat avec la même composition et les mêmes valeurs maximum. Les PV sont restaurés, les initiatives reviennent à 0, les états, l’épuisement, les effets et les notes de combat sont effacés ; le suivi repart au round 1. La rencontre d’origine reste intacte. **Renommer** conserve le suivi ; **Supprimer** exige une confirmation et supprime uniquement la rencontre choisie. Après suppression de la dernière, une rencontre vide est créée.

L’export JSON contient **toutes les rencontres**, la sélection actuelle et les fiches personnelles. Les anciennes sauvegardes à un seul combat sont importées dans une « Rencontre importée », sans perdre le suivi. Si les anciens monstres avaient des initiatives différentes, elles restent en place jusqu’à la saisie d’une initiative commune.

## Initiative commune des monstres et initiatives individuelles

Une seule case **Initiative commune des monstres** règle l’ensemble des participants dont le rôle est **Monstre** dans la rencontre. Elle s’applique aussi aux monstres ajoutés ensuite ; chaque rencontre possède sa propre valeur. Les monstres continuent à jouer l’un après l’autre, avec le même score d’initiative. Aucun jet de dé n’est effectué.

Les **PJ** et **PNJ** gardent une case individuelle. Les PNJ génériques du SRD (gardes, bandits, mages, prêtres, etc.) sont reconnus automatiquement ; cela ne concerne pas tous les humanoïdes : un gobelin reste par défaut un monstre. Les fiches personnelles peuvent être créées avec le type PNJ.

Dans la fiche d’un participant, **Rôle dans ce combat** permet de choisir Monstre, PNJ ou PJ sans modifier sa fiche du catalogue. Passer au rôle Monstre adopte l’initiative commune ; passer au rôle PNJ ou PJ conserve le score actuel et le rend modifiable individuellement.

## La Tombe de l’Annihilation

Dans **Fiches → Campagne**, choisir **La Tombe de l’Annihilation**. Les filtres de nom, type, PJ/PNJ/créature et FP restent combinables. Les noms anglais disponibles (Acererak, Dragonbait, etc.) et les variantes orthographiques sont aussi recherchables.

Le catalogue ajoute **254 profils** au SRD : les **60 blocs de l’annexe D**, les profils en prose, les créatures citées renvoyant au Monster Manual, les PNJ et variantes des chapitres ainsi que les profils simplifiés des courses. **147 profils SRD existants** sont rattachés à la campagne sans être dupliqués. Cela donne 401 résultats pour cette campagne et 588 profils intégrés au total. Le relevé détaillé figure dans [TOA-COVERAGE.md](TOA-COVERAGE.md).

**Consulter** affiche la provenance et les pages du livre fourni. Les valeurs corrigées ou complétées sont signalées : la tortue serpentine géante a un bloc incomplet dans le PDF ; la CA du ptérosaurien comporte une inversion 21/12. Les caractéristiques non publiées, notamment celles de Na et de certaines montures de course, restent « — / non indiqué », sans score fictif. Leur FP n’est pas inventé.

Les variantes sont des fiches indépendantes : Syndra commence avec un maximum de 79 PV, Ras Nsi avec 107 PV et Jessamine avec 58 PV. Orvex est ajouté avec 3 PV restants et 3 niveaux d’épuisement ; Laz et Malkar avec 1 PV restant, 5 niveaux d’épuisement et les yeux bandés. Ces états initiaux s’appliquent lors de l’ajout depuis le catalogue. Les pertes quotidiennes de PV dues à la malédiction restent manuelles. Une duplication de rencontre restaure les PV maximum et efface les états comme auparavant.

Les profils personnalisés gardent leur rattachement à la campagne. Le catalogue ne contient ni le PDF ni le récit complet de l’aventure. Les profils de campagne ne font pas partie du SRD et n’héritent pas de sa licence CC BY.
