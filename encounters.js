import {conditions} from './combat.js';
import {validCreatureMetadata} from './bestiary.js';
import {validSpellEffects} from './spell-effects.js';

export const participantKinds = ['PJ', 'PNJ', 'Créature'];
// PNJ génériques du SRD. Un humanoïde n'est pas nécessairement un PNJ :
// gobelins et orcs restent des monstres à initiative commune.
const srdNPCs = new Set(['acolyte','archmage','assassin','bandit','bandit-captain',
  'berserker','commoner','cultist','cult-fanatic','druid','gladiator','guard',
  'knight','mage','noble','priest','scout','spy','thug','tribal-warrior','veteran']);
export function defaultKind(sheet) {
  if (sheet.kind === 'PJ' || sheet.kind === 'PNJ') return sheet.kind;
  return srdNPCs.has(sheet.srdIndex || sheet.sheetId?.replace(/^srd-/, '')) ? 'PNJ' : 'Créature';
}
export const isGroupedMonster = participant => participant.kind === 'Créature';
const validInitiative = n => Number.isFinite(n) && n >= -99 && n <= 999;
export function setMonsterInitiative(combat, value) {
  if (!validInitiative(value)) throw new Error('Initiative invalide');
  combat.monsterInitiative = value;
  for (const participant of combat.participants) {
    if (isGroupedMonster(participant)) participant.initiative = value;
  }
}
export function changeParticipantKind(combat, participant, kind) {
  if (!participantKinds.includes(kind)) throw new Error('Rôle invalide');
  participant.kind = kind;
  if (isGroupedMonster(participant) && combat.monsterInitiative != null) participant.initiative = combat.monsterInitiative;
}
export function makeEncounter(name = 'Rencontre 1') {
  return {id: crypto.randomUUID(), name, combat: {participants: [], round: 1, active: null, started: false, monsterInitiative: 0}};
}
export function initialState() {
  const encounter = makeEncounter();
  return {version: 2, sheets: [], encounters: [encounter], activeEncounterId: encounter.id};
}
export function activeEncounter(state) {
  return state.encounters.find(encounter => encounter.id === state.activeEncounterId);
}
export function duplicateEncounter(encounter, name) {
  const copy = makeEncounter(name);
  copy.combat.participants = encounter.combat.participants.map(participant => ({
    ...structuredClone(participant), id: crypto.randomUUID(), hp: participant.maxHp,
    initiative: 0, conditions: [], exhaustion: 0, notes: '', spellEffects: []
  }));
  return copy;
}
export function encounterStatus(encounter) {
  const c = encounter.combat;
  if (!c.participants.length) return 'À préparer';
  if (!c.started) return 'Préparée';
  return c.participants.some(p => p.hp > 0) ? 'En cours' : 'Terminée';
}
export function validSheet(p) {
  return !!(p && validCreatureMetadata(p) && typeof p.id === 'string' && p.id.length > 0 &&
    typeof p.name === 'string' && participantKinds.includes(p.kind) &&
    Number.isFinite(p.maxHp) && p.maxHp >= 1 && Number.isFinite(p.ac) &&
    Array.isArray(p.stats) && p.stats.length === 6 && p.stats.every(n => Number.isInteger(n) && n >= 1 && n <= 30) &&
    ['speed','skills','actions','traits'].every(key => typeof p[key] === 'string'));
}
export function validCombat(c) {
  return !!(c && Array.isArray(c.participants) && c.participants.every(p => validSheet(p) &&
    Number.isFinite(p.hp) && p.hp >= 0 && p.hp <= p.maxHp && Number.isFinite(p.initiative) &&
    Array.isArray(p.conditions) && p.conditions.every(condition => conditions.includes(condition)) &&
    validSpellEffects(p.spellEffects) && Number.isInteger(p.exhaustion) && p.exhaustion >= 0 && p.exhaustion <= 6 &&
    (p.notes === undefined || typeof p.notes === 'string')) &&
    Number.isInteger(c.round) && c.round > 0 && typeof c.started === 'boolean' &&
    (c.active === null || c.participants.some(p => p.id === c.active)) &&
    (c.monsterInitiative == null || validInitiative(c.monsterInitiative)) &&
    new Set(c.participants.map(p => p.id)).size === c.participants.length);
}
export function validState(state) {
  return !!(state && state.version === 2 && Array.isArray(state.sheets) && state.sheets.every(validSheet) &&
    new Set(state.sheets.map(s => s.id)).size === state.sheets.length &&
    Array.isArray(state.encounters) && state.encounters.length > 0 && state.encounters.every(e =>
      e && typeof e.id === 'string' && e.id.length > 0 && typeof e.name === 'string' &&
      e.name.trim().length > 0 && e.name.length <= 100 && validCombat(e.combat)) &&
    new Set(state.encounters.map(e => e.id)).size === state.encounters.length &&
    state.encounters.some(e => e.id === state.activeEncounterId));
}
function normalizeCombat(combat) {
  for (const participant of combat.participants) participant.kind = defaultKind(participant);
  if (combat.monsterInitiative === undefined) {
    const initiatives = [...new Set(combat.participants.filter(isGroupedMonster).map(p => p.initiative))];
    // Ne pas écraser les initiatives différentes d'un combat déjà en cours.
    combat.monsterInitiative = initiatives.length > 1 ? null : (initiatives[0] ?? 0);
  }
  if (combat.monsterInitiative !== null) setMonsterInitiative(combat, combat.monsterInitiative);
}
export function loadState(value) {
  let result;
  if (value && (value.version === 2 || Object.hasOwn(value, 'encounters'))) {
    if (!validState(value)) throw new Error('Sauvegarde de rencontres invalide');
    result = structuredClone(value);
  } else {
    if (!value || !Array.isArray(value.sheets) || !value.sheets.every(validSheet) ||
        new Set(value.sheets.map(p => p.id)).size !== value.sheets.length || !validCombat(value.combat)) {
      throw new Error('Ancienne sauvegarde invalide');
    }
    const encounter = {...makeEncounter('Rencontre importée'), combat: structuredClone(value.combat)};
    result = {version: 2, sheets: structuredClone(value.sheets), encounters: [encounter], activeEncounterId: encounter.id};
  }
  for (const encounter of result.encounters) normalizeCombat(encounter.combat);
  return result;
}
