import React, {Component} from 'react';
import './App.css';
import GraphicalCuration from "@wormbase/graphical-curation";
import {WBAutocomplete} from '@wormbase/graphical-curation/lib/autocomplete.js'

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
                    {value: 'Reporter gene'}, {value: 'Western Blot'}, {value: 'Northern blot'}, {value: 'RT-PCR'}],
            ANATOMY_FUNCTION_ASSAYS: [{value: 'Expression_mosaic'}, {value: 'Genetic_mosaic'}, {value: 'Laser_ablation'},
                {value: 'Optogenetic'}, {value: 'Blastomere_isolation'}, {value: 'Genetic_ablation'}]
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
            phenotype: { value: "high_sodium_chloride_concentration_osmotic_avoidance_defective", modId: "WBPhenotype:0001677", options: {'Autonomous': true, 'Nonautonomous': false} },
            gene: { value: 'unc-61', modId: 'WBGene00006795' },
            anatomyTerms: [{ value: 'pharynx', modId: 'WBbt:0003681',  options: {'Insufficient': true, 'Unnecessary': false}}],
            involved: 'not_involved',
            assay: {value: 'Blastomere Isolation'},
            evidence: 'WBPaper00045678',
            remarks: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Curabitur eget tellus enim. Quisque placerat finibus nunc, eu laoreet ligula dictum et. In in quam et neque rhoncus dignissim. Suspendisse et nisi orci. Maecenas ac quam venenatis, faucibus est in, vulputate eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit sollicitudin ligula, ut pretium ipsum. Nulla vel ante rhoncus, congue purus sed, consectetur nisi. Fusce tempor lorem quis mattis molestie. Sed metus ligula, blandit non eros et, lacinia venenatis tellus. Maecenas nec lorem risus.'],
            noctuamodels: [],
            genotypes: ["test", "test2"],
            authorstatements: [],
            dateAssigned: Date.now()
        }]
        const phenotypeAnnotations = [{
            annotationId: 1,
            object: { value: 'ttTi5605', modId: 'WBVar00254893' },
            phenotypeTerms: [{ value: "L1-specific epitope", modId: "WBPhenotype:0001677" }],
            anatomyTerms: [{ value: 'pharynx', modId: 'WBbt:0003681'}],
            lifeStages: [{ value: 'L3', modId: 'WBls:0000035' }],
            evidence: 'WBPaper00001254',
            phenotypeStatement: 'test',
            dateAssigned: Date.now()
        }]


        return(
            <GraphicalCuration entities={entities} error={false} expressionAnnotations={exprAnnotations}
                               evidence={"WBPaper00000000"}
                               anatomyFunctionAnnotations={anatomyFuncAnnotations}
                               phenotypeAnnotations={phenotypeAnnotations}
                               autocompleteObj={new WBAutocomplete('http://tazendra.caltech.edu/~azurebrd/cgi-bin/forms/datatype_objects.cgi?action=autocompleteXHR&objectType=')}
                               showExpressionCuration={false}
                               annotationsSaved={annotations => {console.log(annotations)}}
                               loading={false}
            />
        );
    }
}

export default App;
