# Références des règles

L’outil utilise les règles D&D 5e **2014**, pas les révisions de 2024.

## Effets de sorts

Le catalogue contient **30 entrées issues de 29 sorts**, avec Agrandissement et Rapetissement présentés séparément. Il s’agit d’une sélection pour le suivi des combats, pas d’un catalogue exhaustif de sorts. Les effets qui se résument à un état (par exemple la paralysie) peuvent être suivis dans l’onglet des états.

Les durées, la concentration et les effets ont été vérifiés dans les données anglaises 2014 du projet 5e-bits/5e-database :

- https://github.com/5e-bits/5e-database/blob/a6212beb4b278917c2cff41c2b04c4ef4f3e0d6f/src/2014/en/5e-SRD-Spells.json
- Référence principale : *System Reference Document 5.1*, Wizards of the Coast LLC : https://dnd.wizards.com/resources/systems-reference-document
- Licence CC BY 4.0 : https://creativecommons.org/licenses/by/4.0/
- Sanctuaire : rappel incluant la correction des errata du Manuel des joueurs 2014 : infliger des dégâts à une autre créature termine aussi le sort. https://media.wizards.com/2018/dnd/downloads/PH-Errata.pdf

Les textes de l’application sont des résumés et adaptations en français, pas une reproduction intégrale ni une traduction officielle. Les indications de distance sont converties en mètres. Les cibles possibles, portées, composantes et modalités complètes d’incantation restent à consulter dans les règles du sort ; le catalogue décrit le suivi d’un effet déjà appliqué. Certains effets (ex. Malédiction) changent de durée et de concentration avec le niveau d’emplacement : ces champs sont modifiables.

## Fonctionnement du suivi

Les bonus, pénalités, résistances, PV temporaires, jets de sauvegarde, échéances et pertes de concentration sont **gérés manuellement par le MJ**. Ajouter un effet ne modifie pas la CA, les PV, la vitesse ou les états ; le retirer ne restaure pas ces valeurs automatiquement. Aucun dé n’est lancé par l’outil.

Un effet est rattaché à la cible. Le champ « Lanceur dans le combat » relie l’effet à un participant précis et affiche le suivi sur sa fiche. « Autre / hors combat » permet une source textuelle. Cocher concentration ne signifie pas que la cible se concentre. Ajouter ou retirer un effet sur une cible actualise l’affichage du lanceur, sans retirer les effets des autres cibles. « Rompre la concentration » retire après confirmation tous les effets à concentration de ce lanceur dans le combat. Le lanceur doit normalement cesser son premier sort à concentration pour en maintenir un autre ; un avertissement signale les conflits, sans suppression automatique.

Un même sort n’apparaît qu’une fois par cible, y compris ses variantes. Si plusieurs applications se chevauchent, le MJ suit l’effet le plus puissant (ou le plus récent à puissance égale) et les durées dans les précisions. Des sorts différents peuvent coexister ; cela ne garantit pas que tous leurs effets se cumulent. Les PV temporaires, par exemple, ne s’additionnent pas.
