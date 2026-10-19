# La Table du MJ

Outil local en français pour le suivi des combats D&D 5e (2014), réservé au MJ. Aucun lancer de dés, compte utilisateur, service externe ou dépendance npm.

## Lancer

Prérequis : Python 3. Depuis le dossier du projet :

```sh
python3 -m http.server 5173 --bind 127.0.0.1
```

Ouvrir l’adresse locale du serveur dans son navigateur. `npm start` lance la même commande si Node.js est installé. Garder le même navigateur, profil, hôte et port pour retrouver la sauvegarde. Le serveur est réservé à la machine locale.

## Utilisation

1. Créer les fiches PJ dans « Fiches », avec caractéristiques, compétences, attaques, sorts et traits. Trois exemples de créatures sont fournis.
2. Ajouter les participants à la rencontre ; une créature peut être ajoutée plusieurs fois.
3. Saisir chaque initiative puis commencer le combat. Les égalités sont départagées alphabétiquement ; ajuster les initiatives manuellement si nécessaire.
4. Cliquer sur un participant pour consulter sa fiche compacte en deux colonnes et gérer ses PV, CA, états, épuisement et notes. Le menu « Appliquer un état » ajoute un état et affiche ses effets ; la croix le retire. « ? Règles des états » ouvre le référentiel des 14 états et de l’épuisement (2014), consultable même sans état actif. Les niveaux d’épuisement affichent tous les effets cumulés. Le bouton « Tour suivant » suit l’ordre d’initiative, ignore les participants à 0 PV et incrémente les rounds.
5. Exporter régulièrement une sauvegarde JSON. L’import remplace les fiches et la rencontre après confirmation.

Les fiches du catalogue et les copies en combat sont indépendantes. Les états et l’épuisement sont des marqueurs : leurs effets mécaniques sont appliqués manuellement par le MJ. Les PJ à 0 PV sont ignorés par le passage des tours ; leurs sauvegardes contre la mort restent à suivre à la table. La mort n’est pas automatiquement déduite d’un état. Les durées et la concentration se suivent dans les notes.

La fiche standard tient sur un écran de 1366 × 768, y compris avec un état comme la paralysie. Les fiches longues ou de nombreux états peuvent nécessiter du défilement ; sur téléphone, les colonnes sont empilées pour rester lisibles.

## Données et confidentialité

Les données sont stockées dans le localStorage du navigateur, pas dans le dépôt ni sur le serveur Python. Une suppression des données du navigateur ou l’utilisation d’un autre profil peut les faire disparaître. L’export JSON permet leur transfert et leur sauvegarde. En cas d’échec du stockage, un message demande d’exporter les données.

Le bestiaire initial est limité à trois exemples, adaptés en français du *System Reference Document 5.1*, par Wizards of the Coast LLC, sous licence CC BY 4.0 : https://dnd.wizards.com/resources/systems-reference-document et https://creativecommons.org/licenses/by/4.0/ . Ces adaptations sont abrégées et ne sont pas des traductions officielles. Le catalogue complet en ligne et l’import de bestiaire ne sont pas encore intégrés. Aucune ressource distante n’est chargée au démarrage.

## Vérifications

Node.js 18+ pour exécuter `npm test` (moteur de combat). Aucun paquet à installer. L’interface doit aussi être vérifiée dans un navigateur : création et modification de fiches, ajout de doublons, initiative, dégâts/soins, états, passage des tours, rechargement, export/import.
