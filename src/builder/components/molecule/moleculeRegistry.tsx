import { componentMetadata } from '../../types/componentMetadata'
import { ExampleMolecule } from './exampleMolecule/ExampleMolecule'

export const moleculeRegistry: componentMetadata[] = [
    {
        name: 'ExampleMolecule',
        props: {
            components: 'ReactNode'
        },
        component: ExampleMolecule,
    }
]
