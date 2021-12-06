import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Button, Slider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Grid, { GridSize } from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { ComponentGrid } from '../../../types/AtomicCompound'
import { GridCell } from './gridCell/GridCell'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    padding: 0,
    borderRadius: 0,
}))

export const GridComposer: React.FC = () => {
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const [gridElements, setGridElements] = useState<ComponentGrid[]>([])
    const [
        gridContainerNumerator,
        setGridContainerNumerator,
    ] = useState<GridSize>(12)
    const gridContainerDenominator = 12

    useEffect(() => {
        if (typeof currentEditedComponent?.component?.grid != 'undefined') {
            setGridElements(currentEditedComponent?.component?.grid)
        }
        if (currentEditedComponent?.component?.type === 'molecules') {
            setGridContainerNumerator(6)
        } else if (currentEditedComponent?.component?.type === 'organisms') {
            setGridContainerNumerator(12)
        }
    }, [currentEditedComponent?.component])

    const addGridElement = async () => {
        if (gridElements != null) {
            gridElements.push({
                size: 3,
                settings: [],
                components: [],
            })
        } else {
            setGridElements([
                {
                    size: 3,
                    settings: [],
                    components: [],
                },
            ])
        }

        const response = await fetchApi(
            `${builderApiUrl}/${currentEditedComponent?.component?.type}/${currentEditedComponent?.component?.id}`,
            'PUT',
            {
                grid: gridElements,
            }
        )

        if (!response.loading) {
            setGridElements([...gridElements])
        }
    }

    const selectGridCell = (component: ComponentGrid, index: number) => {
        currentEditedGridCell?.setComponent(component)
        currentEditedGridCell?.setId(index)
    }

    return (
        <>
            {currentEditedComponent?.component && (
                <>
                    <Box sx={{ flexGrow: 1}}>
                        <Grid container spacing={1}>
                            <Grid item xs='auto'>
                                <Typography variant='body1'>
                                    Display Width
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                            <Slider
                                    value={gridContainerNumerator as number}
                                    onChange={(
                                        event: Event,
                                        newValue: number | number[]
                                    ) => {
                                        setGridContainerNumerator(
                                            newValue as GridSize
                                        )
                                    }}
                                    step={1}
                                    marks
                                    min={1}
                                    max={gridContainerDenominator}
                                />
                            </Grid>

                        </Grid>
                    </Box>

                    {/* Container for the Grid Composer */}
                    <Grid
                        container
                        spacing={0}
                        columns={gridContainerDenominator}
                        style={{
                            paddingTop: 40,
                            paddingLeft: 0,
                            height: 700,
                            backgroundColor: 'lightgray',
                            overflowY: 'scroll',
                        }}
                    >
                        <Grid
                            item
                            xs={gridContainerNumerator}
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <Item>
                                {/* Grid Builder */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={0}>
                                        {currentEditedComponent?.component
                                            ?.grid &&
                                            currentEditedComponent?.component?.grid.map(
                                                (
                                                    gridElement: ComponentGrid,
                                                    index
                                                ) => {
                                                    if (
                                                        currentEditedGridCell?.id !=
                                                        index
                                                    ) {
                                                        return (
                                                            <Grid
                                                                key={index}
                                                                item
                                                                xs={
                                                                    gridElement.size
                                                                }
                                                                onClick={() =>
                                                                    selectGridCell(
                                                                        gridElement,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <GridCell
                                                                    key={index}
                                                                    gridElement={
                                                                        gridElement
                                                                    }
                                                                    selected={
                                                                        index ===
                                                                        currentEditedGridCell?.id
                                                                    }
                                                                />
                                                            </Grid>
                                                        )
                                                    } else {
                                                        return (
                                                            <Grid
                                                                key={index}
                                                                item
                                                                xs={
                                                                    currentEditedGridCell
                                                                        ?.component
                                                                        ?.size
                                                                }
                                                            >
                                                                <GridCell
                                                                    key={index}
                                                                    gridElement={
                                                                        gridElement
                                                                    }
                                                                    selected={
                                                                        index ===
                                                                        currentEditedGridCell?.id
                                                                    }
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                }
                                            )}
                                        <Grid
                                            item
                                            xs={2}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            <Button
                                                variant='contained'
                                                onClick={addGridElement}
                                            >
                                                <AddCircleIcon fontSize='medium' />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}
