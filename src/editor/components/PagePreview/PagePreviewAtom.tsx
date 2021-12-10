import { Paper } from '@mui/material'
import styled from '@mui/styled-engine'
import React, { useContext } from 'react'
import { atomRegistry } from '../../../resources/components/atoms/atomRegistry'
import { SelectedAtom } from '../../contexts/PageEditor/SelectedAtom'
import { SelectedPage } from '../../contexts/PageEditor/SelectedPage'
import { updatePageContent } from '../../services/pages/updatePageContent'
import { PageAtom } from '../../types/Page'

export const DefaultAtomPreviewContainer = styled(Paper)(() => ({
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
    component: PageAtom
    locator: (string | number)[]
}

export const PageAtomPreview: React.FC<Props> = (props: Props) => {
    const selectedPage = useContext(SelectedPage)
    const selectedAtom = useContext(
        SelectedAtom
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
        if (selectedAtom?.atom) {
            const componentName = selectedAtom?.atom?.name
            if (componentName in atomRegistry) {
                const block = atomRegistry[componentName]

                if (selectedPage?.page) {
                    let entry: any = selectedPage?.page
                    const steps: any[] = []
                    steps.push(entry)

                    props.locator.forEach((locatorEntry) => {
                        entry = entry[locatorEntry]
                        steps.push(entry)
                    })

                    let component: React.FC<any>
                    if ('text' in entry.props) {
                        component = block.editableComponent

                        const saveChanges = async (value: string) => {
                            entry.props.text = value
                            // TODO change props text to all props on a page level

                            const stepsInverted = [...steps].reverse()

                            let newStepValue: any = entry.props
                            stepsInverted.forEach((stepValue) => {
                                newStepValue = stepValue
                            })

                            const updatedCurrentEditedPage = newStepValue

                            if (selectedPage?.page) {
                                const response = await updatePageContent(
                                    selectedPage.page.id,
                                    updatedCurrentEditedPage.content
                                )

                                if (!response.loading) {
                                    selectedPage?.setPage(
                                        updatedCurrentEditedPage
                                    )
                                    selectedAtom.setAtom(null)
                                    selectedAtom.setLocator(
                                        null
                                    )
                                }
                            }
                        }

                        entry.props.saveChanges = saveChanges
                    } else {
                        component = block.component
                    }
                    return React.createElement(component, entry.props)
                } else {
                    console.log('No page currently edited')
                }
            }
        }
    }

    const editAtomContent = () => {
        selectedAtom?.setAtom(props.component)
        selectedAtom?.setLocator(props.locator)
    }

    if (selectedAtom?.locator === props.locator) {
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
