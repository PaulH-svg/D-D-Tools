import test from 'node:test';
import assert from 'node:assert/strict';
import {damage,ordered,advance} from './combat.js';
test('Les dégâts et soins restent entre zéro et le maximum',()=>{const p={hp:7,maxHp:10};damage(p,-12);assert.equal(p.hp,0);damage(p,25);assert.equal(p.hp,10);});
test('Initiative décroissante avec égalités stables par nom',()=>{const list=[{name:'Z',initiative:10},{name:'B',initiative:20},{name:'A',initiative:20}];assert.deepEqual(ordered(list).map(p=>p.name),['A','B','Z']);assert.equal(list[0].name,'Z');});
test('Le tour ignore les vaincus et incrémente le round au bouclage',()=>{const c={round:1,active:'a',participants:[{id:'a',name:'A',hp:4,initiative:20},{id:'b',name:'B',hp:0,initiative:15},{id:'c',name:'C',hp:2,initiative:10}]};advance(c);assert.equal(c.active,'c');assert.equal(c.round,1);advance(c);assert.equal(c.active,'a');assert.equal(c.round,2);});
test('Un combat sans survivant ne boucle pas',()=>{const c={round:2,active:'a',participants:[{id:'a',hp:0}]};advance(c);assert.equal(c.round,2);});

test('L’aperçu des prochains tours suit le moteur, saute les vaincus et annonce le nouveau round sans mutation',async()=>{
 const {upcomingTurns}=await import('./combat.js');
 const c={round:2,started:true,active:'b',participants:[{id:'a',name:'A',initiative:20,hp:10},{id:'b',name:'B',initiative:15,hp:8},{id:'c',name:'C',initiative:10,hp:0}]};
 const before=structuredClone(c);assert.deepEqual(upcomingTurns(c,3).map(t=>[t.participant.id,t.round]),[['a',3],['b',3],['a',4]]);assert.deepEqual(c,before);
 c.started=false;c.round=1;assert.equal(upcomingTurns(c,1)[0].participant.id,'a');
 c.participants.forEach(p=>p.hp=0);assert.deepEqual(upcomingTurns(c),[]);
});
test('Un unique survivant est annoncé à son prochain round',async()=>{
 const {upcomingTurns}=await import('./combat.js');
 const c={started:true,active:'a',round:1,participants:[{id:'a',name:'A',initiative:10,hp:5}]};assert.equal(upcomingTurns(c,1)[0].round,2);
});
