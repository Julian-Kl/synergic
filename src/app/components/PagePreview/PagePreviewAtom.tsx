import { Paper } from '@mui/material'
import styled from '@mui/styled-engine'
import React, { useContext } from 'react'
import { atomRegistry } from '../../../builder/components/atoms/atomRegistry'
import { CurrentEditedPageContext } from '../../contexts/CurrentEditedPage'
import { CurrentEditedPageAtomContext } from '../../contexts/CurrentEditedPageAtom'
import { structureAtom } from '../../types/PageData'

export const DefaultAtomPreviewContainer= styled(Paper)(() => ({
    boxShadow: 'none',
    ':hover': {
        border: 'solid 1px rgba(25,118,210, .5)',
    },
    border: 'solid 1px transparent',
    borderRadius: 0,
}))

export const ActiveAtomPreviewContainer = styled(Paper)(() => ({
    boxShadow: 'none',
    border: 'solid 1px rgba(25,118,210, .5)',
    borderRadius: 0,
}))


interface Props {
    component: structureAtom
    locator: (string | number)[]
}

export const PageAtomPreview: React.FC<Props> = (props: Props) => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    const currentEditedPageAtomContext = useContext(
        CurrentEditedPageAtomContext
    )

    const renderPreview = () => {
        const componentName = props.component.name
        if (componentName in atomRegistry) {
            const block = atomRegistry[componentName]
            return React.createElement(block.component, props.component.props)
        } else {
            console.log(`Component with name ${props.component.name} not found`)
        }
    }

    const renderEditablePreview = () => {
        if (currentEditedPageAtomContext?.atom) {
            const componentName = currentEditedPageAtomContext?.atom?.name
            if (componentName in atomRegistry) {
                const block = atomRegistry[componentName]

                if (currentEditedPage?.page) {
                    let entry: any = currentEditedPage?.page
                    props.locator.forEach((locatorEntry, index) => {
                        entry = entry[props.locator[index]]
                    })


                    // TODO Add different rendering for the currently edited component
                    console.log('Atom Props:')
                    console.log(entry.props)

                    if ('text' in entry.props) {
                        console.log(entry.props.text)

                        
                    }
                    return React.createElement(block.component, entry.props)


                } else {
                    console.log('No page currently edited')
                }
            }
        }
    }

    const editAtomContent = () => {
        currentEditedPageAtomContext?.setAtom(props.component)
        currentEditedPageAtomContext?.setLocator(props.locator)
    }

    if (currentEditedPageAtomContext?.locator === props.locator) {
        return (
            <ActiveAtomPreviewContainer onClick={editAtomContent}>
                {renderEditablePreview()}
            </ActiveAtomPreviewContainer>
        )
    } else {
        return (
            <DefaultAtomPreviewContainer onClick={editAtomContent}>
                {renderPreview()}
            </DefaultAtomPreviewContainer>
        )
    }
}
