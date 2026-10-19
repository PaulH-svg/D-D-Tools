import test from 'node:test';
import assert from 'node:assert/strict';
import {damage,ordered,advance} from './combat.js';
test('Les dégâts et soins restent entre zéro et le maximum',()=>{const p={hp:7,maxHp:10};damage(p,-12);assert.equal(p.hp,0);damage(p,25);assert.equal(p.hp,10);});
test('Initiative décroissante avec égalités stables par nom',()=>{const list=[{name:'Z',initiative:10},{name:'B',initiative:20},{name:'A',initiative:20}];assert.deepEqual(ordered(list).map(p=>p.name),['A','B','Z']);assert.equal(list[0].name,'Z');});
test('Le tour ignore les vaincus et incrémente le round au bouclage',()=>{const c={round:1,active:'a',participants:[{id:'a',name:'A',hp:4,initiative:20},{id:'b',name:'B',hp:0,initiative:15},{id:'c',name:'C',hp:2,initiative:10}]};advance(c);assert.equal(c.active,'c');assert.equal(c.round,1);advance(c);assert.equal(c.active,'a');assert.equal(c.round,2);});
test('Un combat sans survivant ne boucle pas',()=>{const c={round:2,active:'a',participants:[{id:'a',hp:0}]};advance(c);assert.equal(c.round,2);});
