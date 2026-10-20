import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {filterLibrary,formatChallenge,validCreatureMetadata,creatureTypes} from './bestiary.js';
const monsters=JSON.parse(fs.readFileSync(new URL('./data/bestiary.json',import.meta.url),'utf8'));
test('Le catalogue contient les 334 entrées SRD, avec données utilisables et types français',()=>{
 assert.equal(monsters.length,334);assert.equal(new Set(monsters.map(m=>m.id)).size,334);
 for(const m of monsters){assert.ok(validCreatureMetadata(m),m.name);assert.ok(creatureTypes.includes(m.creatureType));assert.ok(m.maxHp>0);assert.ok(m.ac>0);assert.equal(m.stats.length,6);assert.ok(m.stats.every(n=>n>=1&&n<=30));assert.equal(typeof m.actions,'string');assert.ok(m.traits);assert.ok(!/<\/?\w|\[\[|@UUID/.test(m.actions+m.traits),m.name);}
});
test('Les filtres combinent nom sans accents, type et FP, y compris les fractions et FP 0',()=>{
 assert.ok(filterLibrary([],monsters,{search:'squelette',type:'Mort-vivant',challenge:'0.25'}).length>0);
 const zero=filterLibrary([],monsters,{type:'Bête (animal)',challenge:'0'});assert.ok(zero.length>0);assert.ok(zero.every(m=>m.challengeRating===0));
 assert.ok(filterLibrary([],monsters,{search:'elementaire'}).length>0);
 assert.equal(formatChallenge(0.125),'1/8');assert.equal(formatChallenge(0.25),'1/4');assert.equal(formatChallenge(0.5),'1/2');assert.equal(formatChallenge(0),'0');
});
test('Les fiches personnelles et anciennes coexistent avec le catalogue sans être modifiées',()=>{
 const old={id:'pj',name:'Éléa',kind:'PJ'};const sheets=[old];
 assert.deepEqual(filterLibrary(sheets,monsters,{source:'personal',kind:'PJ'}).map(m=>m.id),['pj']);
 assert.equal(filterLibrary(sheets,monsters,{type:'Dragon'}).some(m=>m.id==='pj'),false);
 assert.equal(validCreatureMetadata(old),true);assert.deepEqual(old,{id:'pj',name:'Éléa',kind:'PJ'});
 assert.equal(validCreatureMetadata({challengeRating:'1/4'}),false);
});
test('Les créatures représentatives conservent FP, PX, attaques et capacités spéciales',()=>{
 const goblin=monsters.find(m=>m.id==='srd-goblin');assert.equal(goblin.challengeRating,0.25);assert.equal(goblin.xp,50);assert.match(goblin.actions,/Cimeterre/);assert.match(goblin.traits,/Fuite agile/);
 const dragon=monsters.find(m=>m.id==='srd-adult-red-dragon');assert.equal(dragon.challengeRating,17);assert.match(dragon.actions,/Souffle de feu/);assert.match(dragon.actions,/gendaires/i);
 assert.equal(monsters.find(m=>m.id==='srd-tarrasque').challengeRating,30);
 assert.match(monsters.find(m=>m.id==='srd-aboleth').traits,/Maladie des tentacules/);
});
