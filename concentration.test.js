import test from 'node:test';
import assert from 'node:assert/strict';
import {effectCasterId,castSpellGroups,endConcentration} from './concentration.js';
import {validSpellEffects} from './spell-effects.js';
const effect=(sourceId='pj',catalogId='slow',concentration=true)=>({catalogId,source:'Lyra',sourceId,concentration,duration:'1 minute',note:''});
const combat=()=>[{id:'pj',name:'Lyra'},{id:'other',name:'Nora'}, {id:'g1',name:'Gobelin',spellEffects:[effect(),effect('other','bless')]},{id:'g2',name:'Gobelin 2',spellEffects:[effect(),effect('pj','shield',false)]}];
test('La fiche du lanceur regroupe un sort à concentration et ses différentes cibles',()=>{
 const groups=castSpellGroups(combat(),'pj');
 assert.equal(groups.length,2);
 assert.deepEqual(groups[0].targets.map(t=>t.id),['g1','g2']);
 assert.equal(groups[0].name,'Lenteur');assert.equal(groups[0].concentration,true);
 assert.equal(groups[1].concentration,false);
});
test('Les identifiants distinguent deux lanceurs de même nom et résistent au renommage',()=>{
 const list=combat();list[1].name='Lyra';
 assert.equal(effectCasterId(list,effect()),'pj');
 list[0].name='Lyra la sage';assert.equal(effectCasterId(list,effect()),'pj');
});
test('Un ancien nom est relié seulement s’il correspond sans ambiguïté à un participant',()=>{
 const list=combat();const legacy={...effect(),source:'  LYRA  '};delete legacy.sourceId;
 assert.equal(effectCasterId(list,legacy),'pj');
 list[1].name='Lyra';assert.equal(effectCasterId(list,legacy),null);
 assert.equal(effectCasterId(list,{source:''}),null);
});
test('Un lanceur supprimé ne se rattache pas à un autre de même nom',()=>{
 const list=combat().filter(p=>p.id!=='pj');list[0].name='Lyra';
 assert.equal(effectCasterId(list,effect()),null);
 assert.deepEqual(castSpellGroups(list,'pj'),[]);
});
test('Rompre la concentration retire toutes ses cibles, mais conserve les autres sorts',()=>{
 const list=combat();endConcentration(list,'pj');
 assert.deepEqual(list[2].spellEffects.map(e=>e.catalogId),['bless']);
 assert.deepEqual(list[3].spellEffects.map(e=>e.catalogId),['shield']);
 assert.equal(castSpellGroups(list,'pj').some(g=>g.concentration),false);
});
test('Retirer la dernière cible, changer le lanceur ou décocher concentration actualise le suivi',()=>{
 const list=combat();list[3].spellEffects=[];list[2].spellEffects[0].sourceId='other';
 assert.deepEqual(castSpellGroups(list,'pj'),[]);
 list[2].spellEffects[0].sourceId='pj';list[2].spellEffects[0].concentration=false;
 assert.equal(castSpellGroups(list,'pj')[0].concentration,false);
 list[2].spellEffects.shift();assert.deepEqual(castSpellGroups(list,'pj'),[]);
});
test('Les liens du lanceur sont conservés en JSON et leur type est validé à l’import',()=>{
 assert.equal(validSpellEffects(JSON.parse(JSON.stringify([effect()]))),true);
 assert.equal(validSpellEffects([{...effect(),sourceId:null}]),true);
 for(const sourceId of [12,{},'',true,'x'.repeat(201)])assert.equal(validSpellEffects([{...effect(),sourceId}]),false);
});
test('Un effet sur soi est visible sur sa propre fiche ; une source extérieure homonyme reste extérieure',()=>{
 const list=combat();list[0].spellEffects=[effect('pj','haste')];
 assert.equal(castSpellGroups(list,'pj').find(g=>g.spell==='haste').targets[0].id,'pj');
 assert.equal(effectCasterId(list,{...effect(),sourceId:null}),null);
});
