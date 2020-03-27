export const getTextMinedEntitiesState = store => store.textMinedEntities;

export const getGenes = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).genes : [];
export const getAnatomyTerms = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).anatomyTerms : [];
export const getLifeStages = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).lifeStages : [];
export const getAssays = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).assays : [];

export const isLoading = store => getTextMinedEntitiesState(store) ? getTextMinedEntitiesState(store).loading : false;
