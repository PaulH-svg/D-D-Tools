import test from 'node:test';
import assert from 'node:assert/strict';
import {validSpellEffects} from './spell-effects.js';
const effect=(catalogId='bless')=>({catalogId,source:'Lyra',duration:'Fin du round 4',note:'Emplacement niveau 2',concentration:true});
test('Les anciennes sauvegardes sans effets de sorts restent compatibles',()=>{
 assert.equal(validSpellEffects(undefined),true);
 assert.equal(validSpellEffects([]),true);
});
test('Le suivi de plusieurs sorts est conservé après un export JSON',()=>{
 const effects=[effect(),{...effect('shield'),concentration:false}];
 assert.equal(validSpellEffects(JSON.parse(JSON.stringify(effects))),true);
});
test('Un même sort ne peut pas être cumulé, même avec une autre variante',()=>{
 assert.equal(validSpellEffects([effect(),effect()]),false);
 assert.equal(validSpellEffects([effect('enlarge-reduce'),effect('enlarge-reduce-reduce')]),false);
});
test('Un import incomplet, inconnu ou de taille excessive est refusé',()=>{
 for(const invalid of [null,{},[null],[{}],[effect('sort-inconnu')],[{...effect(),concentration:'oui'}],[{...effect(),source:'x'.repeat(201)}],[{...effect(),note:'x'.repeat(2001)}]])assert.equal(validSpellEffects(invalid),false);
});
