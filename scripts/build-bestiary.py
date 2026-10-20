"""Convertit deux sources épinglées en catalogue local. Voir SOURCES.md.
Usage: python3 scripts/build-bestiary.py /chemin/5e-database /chemin/traduction-2.2.2.5
"""
import json,re,sys,html
from pathlib import Path
from html.parser import HTMLParser
class Plain(HTMLParser):
 def __init__(self):super().__init__();self.parts=[]
 def handle_starttag(self,tag,attrs):
  if tag in ['p','br','h1','h2','h3','section','li']:self.parts.append('\n')
 def handle_endtag(self,tag):
  if tag in ['p','h1','h2','h3','section','li']:self.parts.append('\n')
 def handle_data(self,data):self.parts.append(data)
def text(s):
 p=Plain();p.feed(s);s=html.unescape(''.join(p.parts));s=re.sub(r'@\w+\[[^\]]+\]\{([^}]+)\}',r'\1',s);s=re.sub(r'\[\[[^\]]+\]\]', '',s)
 return re.sub(r'\n\s*\n+', '\n\n',s).strip().replace('<créature>', 'la créature')
def norm(s):return re.sub(r'\s*\(.*?\)','',s).lower().replace(' attack','').replace('s','')
source,translated=map(Path,sys.argv[1:]);ms=json.loads((source/'src/2014/en/5e-SRD-Monsters.json').read_text());fr=json.loads((translated/'compendium_fr/dnd5e.monsters.json').read_text())['entries'];features=json.loads((translated/'compendium_fr/dnd5e.monsterfeatures.json').read_text())['entries']
types={'aberration':'Aberration','beast':'Bête (animal)','celestial':'Céleste','construct':'Artificiel','dragon':'Dragon','elemental':'Élémentaire','fey':'Fée','fiend':'Fiélon','giant':'Géant','humanoid':'Humanoïde','monstrosity':'Monstruosité','ooze':'Vase','plant':'Plante','undead':'Mort-vivant','swarm of Tiny beasts':'Bête (animal)'}
skills={'acrobatics':'Acrobaties','animal-handling':'Dressage','arcana':'Arcanes','athletics':'Athlétisme','deception':'Tromperie','history':'Histoire','insight':'Intuition','intimidation':'Intimidation','investigation':'Investigation','medicine':'Médecine','nature':'Nature','perception':'Perception','performance':'Représentation','persuasion':'Persuasion','religion':'Religion','sleight-of-hand':'Escamotage','stealth':'Discrétion','survival':'Survie'}
abilities={'str':'FOR','dex':'DEX','con':'CON','int':'INT','wis':'SAG','cha':'CHA'}
speeds={'walk':'Marche','fly':'Vol','swim':'Nage','burrow':'Creusement','climb':'Escalade'}
forms={'Vampire Form':'forme de vampire','Bat Form':'forme de chauve-souris','Mist Form':'forme de brume','Bear Form':'forme d’ours','Human Form':'forme humaine','Hybrid Form':'forme hybride','Boar Form':'forme de sanglier','Rat Form':'forme de rat','Tiger Form':'forme de tigre','Wolf Form':'forme de loup'}
out=[];failures=[]
for m in ms:
 base=m['name'].split(',')[0];t=fr[base];name=t['name']
 if ',' in m['name']:name+=' ('+forms[m['name'].split(', ')[1]]+')'
 raw=t.get('description','');desc=text(raw);full='Points de vie' in raw and 'actions' in raw.lower()
 acts=[];traits=[]
 if full:
  sections=re.split(r'(?im)\b(ACTIONS L[ÉE]GENDAIRES|ACTIONS|R[ÉE]ACTIONS)\b',desc)
  header=sections[0]
  # Traits : toutes les capacités qui suivent la ligne de puissance.
  parts=re.split(r'Puissance\s+[^\n]+',header,maxsplit=1,flags=re.I)
  if len(parts)>1:traits.append(parts[1].strip())
  # Immunités, sens et langues de la fiche française.
  extra=re.search(r'(?:Jets de sauvegarde|Compétences|Vulnérabilités|Résistances|Immunités|Sens|Langues).*?(?=Puissance)',header,re.S)
  if extra:traits.insert(0,extra.group().strip())
  for i in range(1,len(sections)-1,2):acts.append(sections[i].capitalize()+'\n'+sections[i+1].strip())
 else:
  for cat,label in [('special_abilities','Traits'),('actions','Actions'),('reactions','Réactions'),('legendary_actions','Actions légendaires')]:
   items=[]
   for a in m.get(cat,[]):
    v=next((v for k,v in t.get('items',{}).items() if norm(k)==norm(a['name'])),None) or features.get(a['name'])
    if v:items.append(v.get('name',a['name'])+' — '+text(v.get('description','')))
    elif m['index']=='acolyte' and a['name']=='Club':items.append('Gourdin — Attaque au corps à corps : +2 au toucher, allonge 1,50 m. Dégâts : 2 (1d4) contondants.')
    elif m['index']=='succubus-incubus' and a['name'].startswith('Claw'):items.append('Griffes (forme de fiélon uniquement) — Attaque au corps à corps : +5 au toucher, allonge 1,50 m. Dégâts : 6 (1d6 + 3) tranchants.')
    else:failures.append((m['index'],a['name']))
   if items:(traits if cat=='special_abilities' else acts).append(label+'\n'+'\n\n'.join(items))
  # Rappels des sens et défenses : les données de ces fiches se retrouvent dans les capacités ; vérifier la source complète si nécessaire.
 if not full:
  notes={'Aboleth':'Vision dans le noir 36 m ; Perception passive 20. Langues : profond ; télépathie 36 m.', 'Acolyte':'Perception passive 12. Une langue au choix (généralement le commun).', 'Frog':'Vision dans le noir 9 m ; Perception passive 11. Aucune langue.', 'Giant Rat (Diseased)':'Vision dans le noir 18 m ; Perception passive 10. Aucune langue.', 'Sea Horse':'Perception passive 10. Aucune langue.', 'Succubus/Incubus':'Vision dans le noir 18 m ; Perception passive 15. Langues : abyssal, commun, infernal ; télépathie 18 m. Résistances : froid, feu, foudre, poison et dégâts contondants, perforants et tranchants des armes non magiques.'}
  traits.insert(0,notes[m['name']])
  if m['name']=='Aboleth':traits.append('Maladie des tentacules : après 1 minute, la peau devient translucide et visqueuse. La cible ne récupère des PV que sous l’eau. Hors de l’eau, elle subit 6 (1d12) dégâts d’acide toutes les 10 minutes, sauf si sa peau est humidifiée dans cet intervalle. Après la première minute, seul Guérison ou un autre sort de niveau 6 ou plus qui soigne les maladies élimine cette maladie.')
 stats=[m[k] for k in ['strength','dexterity','constitution','intelligence','wisdom','charisma']]
 prof=[]
 for p in m['proficiencies']:
  k=p['proficiency']['index'];n='Sauvegarde '+abilities[k[-3:]] if k.startswith('saving-throw-') else skills[k.removeprefix('skill-')]
  prof.append(n+' '+('+' if p['value']>=0 else '')+str(p['value']))
 speed=[]
 for k,v in m['speed'].items():
  if k in speeds:
   n=float(re.search(r'[\d.]+',v).group())*.3;speed.append(speeds[k]+' '+f'{n:g}'.replace('.',',')+' m')
 if m['speed'].get('hover'):speed.append('vol stationnaire')
 out.append(dict(id='srd-'+m['index'],srdIndex=m['index'],name=name,kind='Créature',creatureType=types[m['type']],challengeRating=m['challenge_rating'],xp=m['xp'],maxHp=m['hit_points'],ac=m['armor_class'][0]['value'],speed=' · '.join(speed),stats=stats,skills=' · '.join(prof) or 'Aucun bonus de compétence ou de sauvegarde indiqué.',actions='\n\n'.join(acts),traits='\n\n'.join(x for x in traits if x),origin='SRD 5.1 · 2014'))
assert not failures,failures
assert len(out)==334 and len({m['id'] for m in out})==334
assert all(m['actions'] or not src.get('actions') for m,src in zip(out,ms))
Path('data/bestiary.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('334 fiches générées, aucune action ni capacité sans traduction.')
