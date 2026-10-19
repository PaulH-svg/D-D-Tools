// Résumés adaptés du SRD 5.1, règles 2014. Voir SOURCES.md.
export const spellEffects = [
  {
    "id": "bless",
    "spell": "bless",
    "name": "Bénédiction",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Ajoute 1d4 aux jets d’attaque et de sauvegarde. Aucun bonus aux tests de caractéristique."
    ]
  },
  {
    "id": "bane",
    "spell": "bane",
    "name": "Fléau",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Après échec à la sauvegarde de Charisme initiale : soustrait 1d4 aux jets d’attaque et de sauvegarde."
    ]
  },
  {
    "id": "guidance",
    "spell": "guidance",
    "name": "Assistance",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Ajoute 1d4 à un seul test de caractéristique, avant ou après le jet. Le sort prend fin après utilisation."
    ]
  },
  {
    "id": "resistance",
    "spell": "resistance",
    "name": "Résistance",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Ajoute 1d4 à un seul jet de sauvegarde, avant ou après le jet. Le sort prend fin après utilisation."
    ]
  },
  {
    "id": "shield",
    "spell": "shield",
    "name": "Bouclier",
    "duration": "Jusqu’au début du prochain tour du lanceur",
    "concentration": false,
    "rules": [
      "+5 à la CA, y compris contre l’attaque déclenchante. Aucun dégât des projectiles magiques."
    ]
  },
  {
    "id": "shield-of-faith",
    "spell": "shield-of-faith",
    "name": "Bouclier de la foi",
    "duration": "Jusqu’à 10 minutes",
    "concentration": true,
    "rules": [
      "+2 à la CA."
    ]
  },
  {
    "id": "mage-armor",
    "spell": "mage-armor",
    "name": "Armure du mage",
    "duration": "8 heures",
    "concentration": false,
    "rules": [
      "Sans armure : CA de base égale à 13 + modificateur de Dextérité ; ce n’est pas un bonus ajouté à la CA existante.",
      "Prend fin si la cible revêt une armure ou si le lanceur le dissipe par une action."
    ]
  },
  {
    "id": "aid",
    "spell": "aid",
    "name": "Aide",
    "duration": "8 heures",
    "concentration": false,
    "rules": [
      "PV actuels et maximum augmentés de 5, plus 5 par niveau d’emplacement au-delà du niveau 2. Ce ne sont pas des PV temporaires.",
      "Noter le bonus choisi et ajuster les PV manuellement, à l’application et à la fin."
    ]
  },
  {
    "id": "false-life",
    "spell": "false-life",
    "name": "Simulacre de vie",
    "duration": "1 heure",
    "concentration": false,
    "rules": [
      "Gagne 1d4 + 4 PV temporaires, plus 5 par niveau d’emplacement au-delà du niveau 1.",
      "Les PV temporaires ne se cumulent pas : choisir de conserver les anciens ou les nouveaux ; ils ne sont pas des soins. Noter le total restant."
    ]
  },
  {
    "id": "heroism",
    "spell": "heroism",
    "name": "Héroïsme",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Immunité à l’état effrayé. Au début de chaque tour, reçoit des PV temporaires égaux au modificateur de caractéristique d’incantation du lanceur.",
      "Ces PV temporaires ne se cumulent pas. Ceux qui restent de ce sort disparaissent à sa fin."
    ]
  },
  {
    "id": "haste",
    "spell": "haste",
    "name": "Hâte",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Vitesse doublée, +2 à la CA, avantage aux sauvegardes de Dextérité.",
      "Une action supplémentaire par tour, limitée à Attaquer (une seule attaque d’arme), Foncer, Se désengager, Se cacher ou Utiliser un objet.",
      "À la fin du sort : ne peut ni se déplacer ni effectuer d’action jusqu’à la fin de son prochain tour (donc pas d’action bonus non plus). Suivre cette léthargie dans les notes."
    ]
  },
  {
    "id": "slow",
    "spell": "slow",
    "name": "Lenteur",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Après échec à une sauvegarde de Sagesse : vitesse divisée par deux, −2 à la CA et aux sauvegardes de Dextérité ; aucune réaction.",
      "À son tour : une action OU une action bonus, pas les deux ; une seule attaque de corps à corps ou à distance au maximum.",
      "Sort avec temps d’incantation d’une action : sur 11+ au d20, retardé au prochain tour ; il faut alors consacrer son action à le terminer, sinon le sort est perdu.",
      "Nouvelle sauvegarde de Sagesse en fin de chaque tour ; réussite : fin de l’effet sur cette cible."
    ]
  },
  {
    "id": "enlarge-reduce",
    "spell": "enlarge-reduce",
    "name": "Agrandissement",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Variante Agrandissement : une catégorie de taille de plus, dimensions doublées et poids multiplié par huit (selon la place disponible).",
      "Avantage aux tests et sauvegardes de Force ; les attaques avec les armes agrandies infligent 1d4 de dégâts supplémentaires.",
      "Cible non consentante : sauvegarde de Constitution initiale ; réussite : aucun effet."
    ]
  },
  {
    "id": "enlarge-reduce-reduce",
    "spell": "enlarge-reduce",
    "name": "Rapetissement",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Variante Rapetissement : une catégorie de taille de moins, dimensions divisées par deux et poids divisé par huit.",
      "Désavantage aux tests et sauvegardes de Force ; les attaques avec les armes réduites infligent 1d4 de dégâts en moins (minimum 1).",
      "Cible non consentante : sauvegarde de Constitution initiale ; réussite : aucun effet."
    ]
  },
  {
    "id": "faerie-fire",
    "spell": "faerie-fire",
    "name": "Lueurs féeriques",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Après échec à la sauvegarde de Dextérité initiale : les attaques contre la cible ont l’avantage si l’attaquant la voit.",
      "La cible ne bénéficie pas de l’invisibilité et émet une lumière faible dans un rayon de 3 m."
    ]
  },
  {
    "id": "blur",
    "spell": "blur",
    "name": "Flou",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Les attaques contre la cible ont le désavantage.",
      "Sans effet sur un attaquant qui ne dépend pas de la vue (ex. vision aveugle) ou qui voit à travers les illusions (ex. vision véritable)."
    ]
  },
  {
    "id": "mirror-image",
    "spell": "mirror-image",
    "name": "Image miroir",
    "duration": "1 minute",
    "concentration": false,
    "rules": [
      "Trois doubles illusoires. À chaque attaque qui cible le bénéficiaire, un d20 redirige vers un double sur 6+ avec 3 doubles, 8+ avec 2, 11+ avec 1.",
      "CA d’un double : 10 + modificateur de Dextérité. Une attaque qui le touche le détruit ; les autres dégâts et effets sont ignorés. Noter les doubles restants.",
      "Prend fin quand tous les doubles sont détruits. Aucun effet si l’attaquant ne voit pas, utilise un autre sens que la vue, ou perçoit les illusions comme fausses."
    ]
  },
  {
    "id": "barkskin",
    "spell": "barkskin",
    "name": "Peau d’écorce",
    "duration": "Jusqu’à 1 heure",
    "concentration": true,
    "rules": [
      "La CA ne peut pas être inférieure à 16, quelle que soit l’armure portée. Ce n’est pas un bonus de +16 à la CA."
    ]
  },
  {
    "id": "stoneskin",
    "spell": "stoneskin",
    "name": "Peau de pierre",
    "duration": "Jusqu’à 1 heure",
    "concentration": true,
    "rules": [
      "Résistance aux dégâts contondants, perforants et tranchants non magiques."
    ]
  },
  {
    "id": "protection-from-energy",
    "spell": "protection-from-energy",
    "name": "Protection contre une énergie",
    "duration": "Jusqu’à 1 heure",
    "concentration": true,
    "rules": [
      "Résistance à un type choisi : acide, froid, feu, foudre ou tonnerre. Noter le type choisi."
    ]
  },
  {
    "id": "protection-from-evil-and-good",
    "spell": "protection-from-evil-and-good",
    "name": "Protection contre le mal et le bien",
    "duration": "Jusqu’à 10 minutes",
    "concentration": true,
    "rules": [
      "Protection contre aberrations, célestes, élémentaires, fées, fiélons et morts-vivants : leurs attaques contre la cible ont le désavantage.",
      "Ils ne peuvent ni la charmer, ni l’effrayer, ni la posséder. Si un tel effet est déjà actif, avantage aux nouvelles sauvegardes pour y mettre fin."
    ]
  },
  {
    "id": "warding-bond",
    "spell": "warding-bond",
    "name": "Lien de protection",
    "duration": "1 heure",
    "concentration": false,
    "rules": [
      "Tant que la cible est à 18 m ou moins du lanceur : +1 à la CA et aux sauvegardes, résistance à tous les dégâts.",
      "Chaque fois que la cible subit des dégâts, le lanceur subit autant de dégâts. À suivre manuellement sur les deux fiches.",
      "Prend fin si le lanceur tombe à 0 PV, si la distance dépasse 18 m, si le sort est relancé sur l’un des deux, ou si le lanceur le dissipe par une action."
    ]
  },
  {
    "id": "sanctuary",
    "spell": "sanctuary",
    "name": "Sanctuaire",
    "duration": "1 minute",
    "concentration": false,
    "rules": [
      "Une créature qui cible le bénéficiaire par une attaque ou un sort nuisible doit réussir une sauvegarde de Sagesse, sinon elle choisit une autre cible ou perd l’attaque ou le sort.",
      "Ne protège pas des effets de zone. Prend fin si le bénéficiaire attaque, lance un sort qui affecte un ennemi ou inflige des dégâts à une autre créature (errata 2014)."
    ]
  },
  {
    "id": "death-ward",
    "spell": "death-ward",
    "name": "Protection contre la mort",
    "duration": "8 heures",
    "concentration": false,
    "rules": [
      "La première fois que des dégâts feraient tomber la cible à 0 PV, elle tombe à 1 PV à la place, puis le sort prend fin.",
      "Si un effet la tuerait instantanément sans dégâts, cet effet est annulé et le sort prend fin. Ne s’applique pas automatiquement dans l’outil."
    ]
  },
  {
    "id": "freedom-of-movement",
    "spell": "freedom-of-movement",
    "name": "Liberté de mouvement",
    "duration": "1 heure",
    "concentration": false,
    "rules": [
      "Le terrain difficile n’affecte pas les déplacements. La magie ne peut ni réduire la vitesse, ni paralyser, ni entraver la cible.",
      "Dépenser 1,50 m de déplacement permet d’échapper automatiquement aux entraves non magiques (dont une empoignade).",
      "Être sous l’eau ne pénalise ni les déplacements ni les attaques."
    ]
  },
  {
    "id": "fly",
    "spell": "fly",
    "name": "Vol",
    "duration": "Jusqu’à 10 minutes",
    "concentration": true,
    "rules": [
      "Vitesse de vol de 18 m.",
      "À la fin du sort, une cible encore en l’air tombe, sauf si elle peut empêcher sa chute."
    ]
  },
  {
    "id": "longstrider",
    "spell": "longstrider",
    "name": "Grand pas",
    "duration": "1 heure",
    "concentration": false,
    "rules": [
      "Vitesse augmentée de 3 m."
    ]
  },
  {
    "id": "magic-weapon",
    "spell": "magic-weapon",
    "name": "Arme magique",
    "duration": "Jusqu’à 1 heure",
    "concentration": true,
    "rules": [
      "L’arme non magique touchée devient magique ; +1 aux attaques et dégâts avec cette arme.",
      "Bonus de +2 avec un emplacement de niveau 4 ou 5, +3 au niveau 6 ou plus. Noter l’arme et le bonus."
    ]
  },
  {
    "id": "enhance-ability",
    "spell": "enhance-ability",
    "name": "Amélioration de caractéristique",
    "duration": "Jusqu’à 1 heure",
    "concentration": true,
    "rules": [
      "Choisir une variante et la noter. Avantage aux tests de la caractéristique choisie, pas aux attaques ni aux sauvegardes.",
      "Endurance de l’ours (CON) : 2d6 PV temporaires, perdus à la fin. Force du taureau (FOR) : capacité de charge doublée.",
      "Grâce féline (DEX) : aucun dégât de chute de 6 m ou moins si la cible n’est pas incapable d’agir. Splendeur de l’aigle (CHA), ruse du renard (INT), sagesse du hibou (SAG) : avantage aux tests correspondants."
    ]
  },
  {
    "id": "bestow-curse",
    "spell": "bestow-curse",
    "name": "Malédiction",
    "duration": "Jusqu’à 1 minute",
    "concentration": true,
    "rules": [
      "Après échec à une sauvegarde de Sagesse, choisir UNE variante : désavantage aux tests et sauvegardes d’une caractéristique ; désavantage aux attaques contre le lanceur ; sauvegarde de Sagesse en début de tour, l’action étant perdue en cas d’échec ; ou +1d8 nécrotiques infligés par les attaques et sorts du lanceur.",
      "Délivrance des malédictions met fin à l’effet. Variantes supplémentaires possibles avec accord du MJ.",
      "Emplacement 4 : concentration, 10 minutes maximum ; 5–6 : 8 heures ; 7–8 : 24 heures ; 9 : jusqu’à dissipation. À partir du niveau 5, pas de concentration. Adapter durée et concentration dans le suivi."
    ]
  }
];
export const spellEffectById = new Map(spellEffects.map(effect => [effect.id, effect]));

// Anciennes sauvegardes : le champ absent équivaut à aucun effet de sort.
export function validSpellEffects(effects) {
  if (effects === undefined) return true;
  return Array.isArray(effects) && effects.length <= spellEffects.length &&
    effects.every(e => e && spellEffectById.has(e.catalogId) &&
      typeof e.source === 'string' && e.source.length <= 200 &&
      (e.sourceId === undefined || e.sourceId === null || (typeof e.sourceId === 'string' && e.sourceId.length > 0 && e.sourceId.length <= 200)) &&
      typeof e.duration === 'string' && e.duration.length <= 200 &&
      typeof e.note === 'string' && e.note.length <= 2000 &&
      typeof e.concentration === 'boolean') &&
    new Set(effects.map(e => spellEffectById.get(e.catalogId)?.spell)).size === effects.length;
}
