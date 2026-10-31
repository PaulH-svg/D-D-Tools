import test from 'node:test';
import assert from 'node:assert/strict';
import {examples,ordered,advance,upcomingTurns} from './combat.js';
import {castSpellGroups} from './concentration.js';
import {initialState,loadState,validState,makeEncounter,activeEncounter,duplicateEncounter,
  defaultKind,setMonsterInitiative,changeParticipantKind} from './encounters.js';
const participant=(id,kind='Créature',initiative=0)=>({...structuredClone(examples[0]),id,name:id,kind,
 hp:5,initiative,conditions:['Empoisonné'],exhaustion:1,notes:'Au fond de la salle',spellEffects:[]});
const spell=sourceId=>({catalogId:'slow',source:'Lyra',sourceId,duration:'1 minute',concentration:true,note:'DD 14'});
function legacy() {
 const pj=participant('Lyra','PJ',16),g1=participant('g1','Créature',12),g2=participant('g2','Créature',8);
 g1.spellEffects=[spell(pj.id)];
 return {sheets:[structuredClone(pj)],combat:{round:3,active:g1.id,started:true,participants:[pj,g1,g2]}};
}
test('Migration sans perte : ancien combat, PV, états, sorts, notes, initiatives, tour et sources',()=>{
 const old=legacy(),before=structuredClone(old),state=loadState(old),c=activeEncounter(state).combat;
 assert.ok(validState(state));assert.deepEqual(old,before);assert.equal(state.encounters.length,1);
 assert.equal(c.round,3);assert.equal(c.active,'g1');assert.equal(c.participants[1].hp,5);
 assert.deepEqual(c.participants[1].conditions,['Empoisonné']);assert.equal(c.participants[1].notes,'Au fond de la salle');
 assert.equal(c.monsterInitiative,null);assert.deepEqual(c.participants.map(p=>p.initiative),[16,12,8]);
 assert.equal(castSpellGroups(c.participants,'Lyra')[0].name,'Lenteur');
});
test('Chaque rencontre conserve son état indépendamment lors des changements et après export/import',()=>{
 const state=loadState(legacy()),first=state.encounters[0],second=makeEncounter('Crypte');
 state.encounters.push(second);state.activeEncounterId=second.id;
 second.combat.participants.push(participant('zombie'));setMonsterInitiative(second.combat,18);
 second.combat.round=2;state.activeEncounterId=first.id;
 assert.equal(activeEncounter(state).combat.round,3);assert.equal(second.combat.participants[0].hp,5);
 const restored=loadState(JSON.parse(JSON.stringify(state)));assert.deepEqual(restored,state);
 assert.equal(restored.encounters[1].combat.monsterInitiative,18);
 assert.equal(castSpellGroups(restored.encounters[1].combat.participants,'Lyra').length,0);
});
test('Une duplication prépare un nouveau combat sans blessures ni effets et ne modifie pas son origine',()=>{
 const original=loadState(legacy()).encounters[0],before=structuredClone(original);
 const copy=duplicateEncounter(original,'Seconde embuscade');
 assert.notEqual(copy.id,original.id);assert.deepEqual(original,before);assert.equal(copy.combat.round,1);
 assert.equal(copy.combat.started,false);assert.equal(copy.combat.active,null);assert.equal(copy.combat.monsterInitiative,0);
 for(let i=0;i<copy.combat.participants.length;i++){
  const p=copy.combat.participants[i];assert.notEqual(p.id,original.combat.participants[i].id);
  assert.equal(p.hp,p.maxHp);assert.equal(p.initiative,0);assert.deepEqual(p.spellEffects,[]);
  assert.deepEqual(p.conditions,[]);assert.equal(p.exhaustion,0);assert.equal(p.notes,'');
 }
});
test('L’initiative commune modifie tous les monstres, sans modifier PJ et PNJ',()=>{
 const c=makeEncounter().combat;c.participants=[participant('PJ','PJ',17),participant('PNJ','PNJ',9),participant('g1'),participant('g2')];
 setMonsterInitiative(c,14);assert.deepEqual(c.participants.map(p=>p.initiative),[17,9,14,14]);
 assert.deepEqual(ordered(c.participants).map(p=>p.id),['PJ','g1','g2','PNJ']);
 c.started=true;c.active='PJ';advance(c);assert.equal(c.active,'g1');advance(c);assert.equal(c.active,'g2');
 assert.equal(upcomingTurns(c,1)[0].participant.id,'PNJ');
});
test('Les monstres restent groupés en cas d’égalité avec une initiative individuelle',()=>{
 const list=[participant('Z','Créature',12),participant('M','PNJ',12),participant('A','Créature',12),participant('B','PJ',12)];
 assert.deepEqual(ordered(list).map(p=>p.id),['B','M','A','Z']);
});
test('Un participant peut passer de monstre à PNJ et inversement dans le combat',()=>{
 const c=makeEncounter().combat,p=participant('g1');c.participants=[p];setMonsterInitiative(c,18);
 changeParticipantKind(c,p,'PNJ');p.initiative=7;setMonsterInitiative(c,20);assert.equal(p.initiative,7);
 changeParticipantKind(c,p,'Créature');assert.equal(p.initiative,20);
 assert.throws(()=>changeParticipantKind(c,p,'Autre'));assert.throws(()=>setMonsterInitiative(c,NaN));
});
test('Les PNJ génériques du SRD sont individuels ; un humanoïde comme le gobelin reste un monstre',()=>{
 assert.equal(defaultKind({kind:'Créature',srdIndex:'guard'}),'PNJ');
 assert.equal(defaultKind({kind:'Créature',srdIndex:'goblin',creatureType:'Humanoïde'}),'Créature');
 assert.equal(defaultKind({kind:'Créature',sheetId:'srd-bandit'}),'PNJ');
 assert.equal(defaultKind({kind:'PNJ'}),'PNJ');assert.equal(defaultKind({kind:'PJ',srdIndex:'guard'}),'PJ');
});
test('Les initiatives anciennes identiques sont reconnues ; les différences sont conservées jusqu’à la saisie commune',()=>{
 const old=legacy();old.combat.participants[2].initiative=12;
 assert.equal(activeEncounter(loadState(old)).combat.monsterInitiative,12);
 const mixed=loadState(legacy()),c=activeEncounter(mixed).combat;setMonsterInitiative(c,15);
 assert.deepEqual(c.participants.map(p=>p.initiative),[16,15,15]);
});
test('Un import corrompu dans une rencontre inactive ou avec des identifiants incohérents est refusé',()=>{
 const state=loadState(legacy());state.encounters.push(makeEncounter('Crypte'));
 const bad=structuredClone(state);bad.encounters[1].combat.round=0;assert.throws(()=>loadState(bad));
 const duplicate=structuredClone(state);duplicate.encounters[1].id=duplicate.encounters[0].id;assert.throws(()=>loadState(duplicate));
 const noSelection=structuredClone(state);noSelection.activeEncounterId='absente';assert.throws(()=>loadState(noSelection));
 assert.throws(()=>loadState({...state,encounters:[]}));assert.throws(()=>loadState({version:2,combat:legacy().combat,sheets:[]}));
 assert.ok(validState(initialState()));assert.ok(validState(state));
});
