export const getTextMinedEntitiesState = store => store.textMinedEntities;

export const getGenes = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).genes : [];
export const getAnatomyTerms = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).anatomyTerms : [];
export const getLifeStages = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).lifeStages : [];
export const getAssays = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).assays : [];

export const genesLoading = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).genesLoading : false;
export const anatomyTermsLoading = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).anatomyTermsLoading : false;
export const lifeStagesLoading = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).lifeStagesLoading : false;
export const assaysLoading = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).assaysLoading : false;