import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Button, Slider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Grid, { GridSize } from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import { SelectedCompound } from '../../../../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCell } from '../../../../../contexts/CompoundEditor/SelectedGridCell'
import { updateCompoundGrid } from '../../../../../services/compounds/updateCompoundGrid'
import { CompoundGrid } from '../../../../../types/Compound'
import { GridCellPreview } from '../GridCellPreview/GridCellPreview'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    padding: 0,
    borderRadius: 0,
}))

export const CompoundPreview: React.FC = () => {
    const selectedCompound = useContext(SelectedCompound)
    const selectedGridCell = useContext(SelectedGridCell)
    const [gridElements, setGridElements] = useState<CompoundGrid[]>([])
    const [
        gridContainerNumerator,
        setGridContainerNumerator,
    ] = useState<GridSize>(12)
    const gridContainerDenominator = 12

    useEffect(() => {
        if (typeof selectedCompound?.compound?.grid != 'undefined') {
            setGridElements(selectedCompound?.compound?.grid)
        }
        if (selectedCompound?.compound?.type === 'molecules') {
            setGridContainerNumerator(6)
        } else if (selectedCompound?.compound?.type === 'organisms') {
            setGridContainerNumerator(12)
        }
    }, [selectedCompound?.compound])

    const addGridElement = async () => {
        if (selectedCompound?.compound) {
            const newGridElement: CompoundGrid = {
                size: 3,
                components: [],
            }

            if (gridElements != null) {
                gridElements.push(newGridElement)
            } else {
                setGridElements([newGridElement])
            }

            const response = await updateCompoundGrid(
                selectedCompound?.compound?.id,
                selectedCompound?.compound?.type,
                gridElements
            )

            if (!response.loading) {
                setGridElements([...gridElements])
            }
        }
    }

    const selectGridCell = (component: CompoundGrid, index: number) => {
        selectedGridCell?.setGridCell(component)
        selectedGridCell?.setId(index)
    }

    return (
        <>
            {selectedCompound?.compound && (
                <>
                    <Box sx={{ flexGrow: 1 }}>
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
                                        {selectedCompound?.compound
                                            ?.grid &&
                                            selectedCompound?.compound?.grid.map(
                                                (
                                                    gridElement: CompoundGrid,
                                                    index
                                                ) => {
                                                    if (
                                                        selectedGridCell?.id !=
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
                                                                <GridCellPreview
                                                                    key={index}
                                                                    gridElement={
                                                                        gridElement
                                                                    }
                                                                    selected={
                                                                        index ===
                                                                        selectedGridCell?.id
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
                                                                    selectedGridCell
                                                                        ?.gridCell
                                                                        ?.size
                                                                }
                                                            >
                                                                <GridCellPreview
                                                                    key={index}
                                                                    gridElement={
                                                                        gridElement
                                                                    }
                                                                    selected={
                                                                        index ===
                                                                        selectedGridCell?.id
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
