export const creatureTypes=['Aberration','Artificiel','Bête (animal)','Céleste','Dragon','Élémentaire','Fée','Fiélon','Géant','Humanoïde','Monstruosité','Mort-vivant','Plante','Vase'];
export const challengeRatings=[0,0.125,0.25,0.5,...Array.from({length:30},(_,i)=>i+1)];
export function formatChallenge(value){return value==null?'Non renseigné':({0.125:'1/8',0.25:'1/4',0.5:'1/2'}[value]??String(value));}
export const normalized=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
export function validCreatureMetadata(sheet){
 return (sheet.creatureType===undefined || sheet.creatureType==='' || creatureTypes.includes(sheet.creatureType)) &&
   (sheet.challengeRating==null || challengeRatings.includes(sheet.challengeRating)) &&
   (sheet.xp==null || Number.isFinite(sheet.xp)&&sheet.xp>=0);
}
export function filterLibrary(sheets,monsters,{search='',source='',kind='',type='',challenge=''}={}) {
 const personal=sheets.map(s=>({...s,librarySource:'personal'}));
 const builtIn=monsters.map(s=>({...s,librarySource:'bestiary'}));
 return [...personal,...builtIn].filter(s=>(!source||s.librarySource===source)&&(!kind||s.kind===kind)&&
   (!type||s.kind==='Créature'&&s.creatureType===type)&&
   (challenge===''||s.kind==='Créature'&&s.challengeRating!=null&&s.challengeRating===Number(challenge))&&
   normalized(s.name).includes(normalized(search))).sort((a,b)=>a.name.localeCompare(b.name,'fr'));
}
