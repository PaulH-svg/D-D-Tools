export const campaigns=[{id:'toa',name:'La Tombe de l’Annihilation'}];
export function mergeCampaignCatalog(base,campaign) {
  if(!campaign||campaign.id!=='toa'||!Array.isArray(campaign.profiles)||!Array.isArray(campaign.existingReferences))throw new Error('Catalogue de campagne invalide');
  const references=new Map(campaign.existingReferences.map(ref=>[ref.id,ref.pages]));
  const merged=base.map(profile=>references.has(profile.id)?{...profile,campaigns:[...new Set([...(profile.campaigns||[]),campaign.id])],campaignSourcePages:references.get(profile.id)}:profile);
  const ids=new Set(merged.map(p=>p.id));
  for(const profile of campaign.profiles){if(ids.has(profile.id))throw new Error('Identifiant dupliqué dans la campagne');ids.add(profile.id);merged.push(profile);}
  return merged;
}
export function campaignLabel(profile) {
  return (profile.campaigns||[]).map(id=>campaigns.find(c=>c.id===id)?.name).filter(Boolean).join(', ');
}
export function sourceLabelForProfile(profile) {
  if(profile.profileSource)return `${profile.origin} · ${profile.profileSource}${profile.sourcePages?.length?' · p. '+profile.sourcePages.join(', '):''}`;
  return profile.origin||'Fiche personnelle';
}
