import React, {Component} from 'react';
import './App.css';
import GraphicalCuration from "@wormbase/graphical-curation";

class App extends Component{

    render() {
        const entities = {
            PROTEIN: [{ value: 'UNC-59', modId: 'WBGene00006793' }],
            ANATOMY: [
                { value: 'pharynx', modId: 'WBbt:0003681' },
                { value: 'gonad', modId: 'WBbt:0005175' },
                { value: 'sex myoblast', modId: 'WBbt:0008373' },
                { value: 'distal tip cell', modId: 'WBbt:0006865' },
                { value: 'spermatheca', modId: 'WBbt:0005319' },
                { value: 'procorpus', modId: 'WBbt:0003713' },
                { value: 'embryonic cell', modId: 'WBbt:0007028' },
                { value: 'terminal bulb', modId: 'WBbt:0003732' },
                { value: 'sperm', modId: 'WBbt:0006798' },
                { value: 'buccal cavity', modId: 'WBbt:0005255' },
            ],
            EXPRTYPE: [
                { value: 'localization', modId: 'expression' },
                { value: 'antibody', modId: 'Antibody' },
                { value: 'expression', modId: 'expression' },
                { value: 'detected', modId: 'expression' },
            ],
            LIFESTAGE: [
                { value: 'L3', modId: 'WBls:0000035' },
                { value: 'L1', modId: 'WBls:0000024' },
                { value: 'L4', modId: 'WBls:0000038' },
                { value: 'embryo', modId: 'WBls:0000003' },
                { value: 'L2', modId: 'WBls:0000027' },
                { value: 'adult', modId: 'WBls:0000041' },
            ],
            GENE: [
                { value: 'unc-61', modId: 'WBGene00006795' },
                { value: 'unc-59', modId: 'WBGene00006793' },
            ],
            GENEONTOLOGY: [
                { value: 'cell', modId: 'GO:0005623' },
                { value: 'cleavage furrow', modId: 'GO:0032154' },
            ],
            VARIANT: [{ value: 'ttTi5605', modId: 'WBVar00254893' }],
            PHENOTERMS: [
                { value: "L1-specific epitope", modId: "WBPhenotype:0001677" },
                { value: "chemosensory", modId: "WBPhenotype:0001040" }
            ],
            ASSAYS: [{value: 'In situ Hybridization'}, {value: 'Immunohistochemistry'},
                    {value: 'Reporter gene'}, {value: 'Western Blot'}, {value: 'Northern blot'}, {value: 'RT-PCR'}]
        }

        const exprAnnotations = [{
            annotationId: 1,
            gene: { value: 'unc-61', modId: 'WBGene00006795' },
            whenExpressed: [{ value: 'L3', modId: 'WBls:0000035' }],
            assay: {value: 'In situ Hybridization'},
            evidence: '',
            whereExpressed: [{ value: 'pharynx', modId: 'WBbt:0003681' }],
            cellularComponent: [{ value: 'cell', modId: 'GO:0005623'}],
            dateAssigned: Date.now()
        }]

        const anatomyFuncAnnotations = [{
            annotationId: 1,
            phenotype: { value: "L1-specific epitope", modId: "WBPhenotype:0001677" },
            gene: { value: 'unc-61', modId: 'WBGene00006795' },
            anatomyTerms: [{ value: 'pharynx', modId: 'WBbt:0003681',  options: {'Insufficient': true, 'Unnecessary': false}}],
            involved: 'not_involved',
            assay: {value: 'In situ Hybridization'},
            evidence: 'WBPaper00045678',
            remark: '',
            noctuamodel: '',
            genotype: '',
            dateAssigned: Date.now()
        }]

        return(
            <GraphicalCuration entities={entities} error={false} expressionAnnotations={exprAnnotations}
                               anatomyFunctionAnnotations={anatomyFuncAnnotations}
                               annotationsSaved={annotations => {console.log('Annotations received')}}
                               loading={false}
            />
        );
    }
}

export default App;
