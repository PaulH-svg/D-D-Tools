import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mergeCampaignCatalog} from './campaigns.js';
import {filterLibrary} from './bestiary.js';
import {validSheet,initialState,activeEncounter,loadState} from './encounters.js';
const base=JSON.parse(fs.readFileSync(new URL('./data/bestiary.json',import.meta.url),'utf8'));
const campaign=JSON.parse(fs.readFileSync(new URL('./data/tomb-of-annihilation.json',import.meta.url),'utf8'));
const find=name=>{const profile=campaign.profiles.find(p=>p.name===name);assert.ok(profile,name);return profile;};
test('Le catalogue de campagne complète le SRD sans doublon ni mutation de sa source',()=>{
 const original=structuredClone(base),merged=mergeCampaignCatalog(base,campaign);
 assert.equal(merged.length,base.length+campaign.profiles.length);assert.equal(new Set(merged.map(p=>p.id)).size,merged.length);assert.deepEqual(base,original);
 const crocodile=merged.find(p=>p.id==='srd-crocodile');assert.ok(crocodile.campaigns.includes('toa'));
 assert.equal(merged.filter(p=>p.id==='srd-crocodile').length,1);
 assert.throws(()=>mergeCampaignCatalog(base,{...campaign,profiles:[base[0]]}));
});
test('Tous les profils de campagne ont des valeurs de combat valides et des références de pages',()=>{
 for(const p of campaign.profiles){assert.ok(validSheet(p),p.name);assert.ok(p.campaigns.includes('toa'),p.name);assert.ok(p.sourcePages.length,p.name);assert.ok(p.sourcePages.every(n=>Number.isInteger(n)&&n>0&&n<=257),p.name);assert.ok(p.actions.trim(),p.name);assert.ok(!/<\/?\w|@UUID|\[\[/.test(p.actions+p.traits),p.name);if(p.startingHp!=null)assert.ok(p.startingHp>=0&&p.startingHp<=p.maxHp,p.name);if(p.startingExhaustion!=null)assert.ok(p.startingExhaustion<=6,p.name);}
});
test('Les 60 blocs de l’annexe D sont couverts, y compris les profils poursuivis dans la colonne voisine',()=>{
 const names=['Acérérak','Aldani (homme-homard)','Almiraj','Artus Cimber','Atropal','Attrape-homme','Bodak','Brontosaure','Chair-à-Dragon','Champion','Chwinga','Crapaudonte','Deinonychus','Dimétrodon','Éblis','Épineux','Escargot écraseur','Garde des couvées yuan-ti','Gargouille géante à quatre bras','Girallon','Grung','Grung guerrier d’élite','Grung sauvage','Guerrier nain albinos','Hadrosaure','Jacouli','Juggernaut de pierre','Kamadan','Kobold ensorceleur des écailles','Kobold inventeur','Liane meurtrière','Liara Portyr','Lierre musqué jaune','Ménestrel tabaxi','Monstre de su','Mwaxanaré','Nuée de larves de la pourriture','Oratrice des cauchemars yuan-ti','Palmier trois-fleurs','Ptérosaurien','Quetzalcoatlus','Ras Nsi','Sauteur géant','Singe volant','Stégosaure','Tortue serpentine géante','Triton du feu guerrier','Triton du feu sorcier d’Imix','Végépygmée','Chef végépygmée','Vélociraptor','Volothamp « Volo » Geddarm','Xandala','Zindar','Zombi ankylosaure','Zombi girallon','Zombi musqué jaune','Zombi tyrannosaure','Zorbo','Chasseur tabaxi'];
 assert.equal(names.length,60);for(const name of names)assert.equal(find(name).profileSource,'Annexe D',name);
 assert.match(find('Acérérak').actions,/ACTIONS LÉGENDAIRES/);assert.match(find('Artus Cimber').actions,/Anneau de/);assert.match(find('Kobold inventeur').actions,/8\. Sac de guêpes/);assert.match(find('Zindar').actions,/Souffle/);assert.match(find('Zorbo').actions,/Griffes/);
});
test('Les profils nommés et les variantes des chapitres conservent leurs PV et conditions propres',()=>{
 assert.equal(find('Ras Nsi').maxHp,107);assert.equal(find('Syndra Silvaine').maxHp,79);assert.equal(find('Jessamine').maxHp,58);assert.equal(find('Roi des Plumes').maxHp,200);assert.equal(find('Nrak').maxHp,40);assert.equal(find('Reine Toba').maxHp,120);
 assert.equal(find('Orvex Ocrammas').startingHp,3);assert.equal(find('Orvex Ocrammas').startingExhaustion,3);assert.equal(find('Laz Tonnetambour').startingHp,1);assert.equal(find('Malkar Grain-de-roche').startingExhaustion,5);assert.deepEqual(find('Voj').startingConditions,['Pétrifié']);
 assert.equal(find('Gardien du tombeau à pointes').ac,17);assert.equal(find('Gardien du tombeau à pointes').challengeRating,6);assert.match(find('Flétri (Gorra)').actions,/Épée longue/);assert.doesNotMatch(find('Flétri (Gorra)').actions,/arbalète/i);
});
test('Les erreurs de recopie sont isolées ; les caractéristiques non publiées restent inconnues',()=>{
 assert.deepEqual(find('Juggernaut de pierre').stats,[22,1,21,2,11,3]);assert.deepEqual(find('Palmier trois-fleurs').stats,[1,10,12,1,10,1]);assert.equal(find('Ptérosaurien').ac,12);assert.match(find('Ptérosaurien').reviewNote,/21/);
 assert.equal(find('Tortue serpentine géante').ac,17);assert.equal(find('Tortue serpentine géante').maxHp,75);assert.ok(find('Tortue serpentine géante').reviewNote);
 assert.deepEqual(find('Na').stats,[null,null,null,null,null,null]);assert.equal(find('Na').ac,10);assert.equal(find('Na').maxHp,3);assert.equal(find('Na').challengeRating,null);
 const racer=find('Tyrannosaure jeune de course');assert.equal(racer.maxHp,46);assert.equal(racer.ac,13);assert.equal(racer.stats[2],17);assert.equal(racer.stats[0],null);
});
test('Les filtres campagne, type, PNJ, danger et noms anglais se combinent',()=>{
 const merged=mergeCampaignCatalog(base,campaign);
 const results=filterLibrary([],merged,{campaign:'toa',type:'Mort-vivant',kind:'PNJ',challenge:'23'});assert.deepEqual(results.map(p=>p.name),['Acérérak']);
 assert.ok(filterLibrary([],merged,{campaign:'toa',search:'acererak'}).some(p=>p.name==='Acérérak'));
 assert.ok(filterLibrary([],merged,{campaign:'toa',search:'Dragonbait'}).some(p=>p.name==='Chair-à-Dragon'));
 const personal={...find('Chwinga'),id:'personnel'};assert.equal(filterLibrary([personal],merged,{campaign:'toa',source:'personal'}).length,1);
});
test('Les scores inconnus sont compatibles avec les sauvegardes de rencontres',()=>{
 const state=initialState(),na=find('Na');activeEncounter(state).combat.participants.push({...na,id:'na-combat',hp:3,initiative:8,conditions:[],exhaustion:0,notes:'',spellEffects:[]});
 const restored=loadState(JSON.parse(JSON.stringify(state)));assert.deepEqual(activeEncounter(restored).combat.participants[0].stats,[null,null,null,null,null,null]);
});
