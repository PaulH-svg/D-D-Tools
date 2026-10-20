export function damage(p, amount) { p.hp = Math.max(0, Math.min(p.maxHp, p.hp + amount)); }
export function ordered(participants) { return [...participants].sort((a,b)=>b.initiative-a.initiative || a.name.localeCompare(b.name,'fr')); }
export function advance(combat) {
 const list=ordered(combat.participants); if(!list.some(p=>p.hp>0)) return;
 let index=list.findIndex(p=>p.id===combat.active);
 for(let i=0;i<list.length;i++){ index++; if(index>=list.length){index=0;combat.round++;} if(list[index].hp>0){combat.active=list[index].id;return;} }
}
export const conditions=['Aveuglé','Charmé','Assourdi','Effrayé','Empoigné','Incapable d’agir','Invisible','Paralysé','Pétrifié','Empoisonné','À terre','Entravé','Étourdi','Inconscient'];
export const examples=[
 {id:'gobelin',name:'Gobelin',kind:'Créature',maxHp:7,ac:15,speed:'9 m',stats:[8,14,10,10,8,8],skills:'Discrétion +6',actions:'Cimeterre : +4 au toucher, allonge 1,50 m, une cible. Dégâts : 1d6 + 2 tranchants.\nArc court : +4 au toucher, portée 24/96 m. Dégâts : 1d6 + 2 perforants.',traits:'Fuite agile : peut Se désengager ou Se cacher par une action bonus.'},
 {id:'squelette',name:'Squelette',kind:'Créature',maxHp:13,ac:13,speed:'9 m',stats:[10,14,15,6,8,5],skills:'Vision dans le noir 18 m. Perception passive 9.',actions:'Épée courte : +4 au toucher, allonge 1,50 m. Dégâts : 1d6 + 2 perforants.\nArc court : +4 au toucher, portée 24/96 m. Dégâts : 1d6 + 2 perforants.',traits:'Vulnérabilité : contondant. Immunités : poison ; états épuisement et empoisonné.'},
 {id:'loup',name:'Loup',kind:'Créature',maxHp:11,ac:13,speed:'12 m',stats:[12,15,12,3,12,6],skills:'Discrétion +4, Perception +3',actions:'Morsure : +4 au toucher, allonge 1,50 m. Dégâts : 2d4 + 2 perforants. La cible doit réussir un jet de sauvegarde de Force DD 11 ou tomber à terre.',traits:'Odorat et ouïe aiguisés : avantage aux tests de Perception correspondants. Tactique de groupe : avantage aux attaques si un allié non incapable d’agir est à 1,50 m de la cible.'}
];

// Même ordre, mêmes exclusions et même changement de round que « Tour suivant ».
export function upcomingTurns(combat, count = 3) {
  const cursor = {...combat, participants: combat.participants};
  const result = [];
  if (!cursor.participants.some(p => p.hp > 0)) return result;
  if (!cursor.started) cursor.active = null;
  for (let i = 0; i < count; i++) {
    advance(cursor);
    const participant = cursor.participants.find(p => p.id === cursor.active);
    if (participant) result.push({participant, round: cursor.round});
  }
  return result;
}
