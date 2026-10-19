import {spellEffectById} from './spell-effects.js';
const normalizedName = name => String(name || '').trim().normalize('NFC').toLocaleLowerCase('fr');

// Les anciennes sauvegardes ne disposent que du nom du lanceur.
// Un nom ambigu n'est jamais rattaché arbitrairement à un participant.
export function effectCasterId(participants, effect) {
  if (effect.sourceId !== undefined) {
    return participants.some(p => p.id === effect.sourceId) ? effect.sourceId : null;
  }
  const name = normalizedName(effect.source);
  if (!name) return null;
  const matches = participants.filter(p => normalizedName(p.name) === name);
  return matches.length === 1 ? matches[0].id : null;
}

export function castSpellGroups(participants, casterId) {
  const groups = new Map();
  for (const target of participants) {
    for (const effect of target.spellEffects || []) {
      if (effectCasterId(participants, effect) !== casterId) continue;
      const rule = spellEffectById.get(effect.catalogId);
      if (!rule) continue;
      const key = `${rule.spell}:${effect.concentration}`;
      if (!groups.has(key)) groups.set(key, {spell: rule.spell, name: rule.name, concentration: effect.concentration, targets: []});
      groups.get(key).targets.push({id: target.id, name: target.name, duration: effect.duration});
    }
  }
  return [...groups.values()];
}

export function endConcentration(participants, casterId) {
  // Résoudre toutes les anciennes références avant de modifier les effets.
  const retained = participants.map(target => (target.spellEffects || []).filter(effect =>
    !effect.concentration || effectCasterId(participants, effect) !== casterId));
  participants.forEach((target, i) => { if (target.spellEffects) target.spellEffects = retained[i]; });
}
