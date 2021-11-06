import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid, { GridSize } from '@mui/material/Grid'
import { Button, Slider, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { GridCell } from './gridCell/GridCell'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { ComponentGrid } from '../../../types/ComponentData'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    padding: 0,
    borderRadius: 0,
}))

export const GridComposer: React.FC = () => {
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const [gridSpacing, setGridSpacing] = useState<number>(0)
    const [gridElements, setGridElements] = useState<ComponentGrid[]>([])
    const [
        gridContainerNumerator,
        setGridContainerNumerator,
    ] = useState<GridSize>(8)
    const gridContainerDenominator = 12

    console.log(currentEditedComponent?.component?.grid)

    useEffect(() => {
        if (typeof currentEditedComponent?.component?.grid != 'undefined') {
            setGridElements(currentEditedComponent?.component?.grid)
        }
    })

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

        setGridElements([...gridElements])
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <Typography variant='body1' gutterBottom>
                            Display Width
                        </Typography>
                        <Slider
                            value={gridContainerNumerator as number}
                            onChange={(
                                event: Event,
                                newValue: number | number[]
                            ) => {
                                setGridContainerNumerator(newValue as GridSize)
                            }}
                            step={1}
                            marks
                            min={1}
                            max={gridContainerDenominator}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1' gutterBottom>
                            Grid Spacing
                        </Typography>
                        <Slider
                            value={gridSpacing}
                            onChange={(
                                event: Event,
                                newValue: number | number[]
                            ) => {
                                setGridSpacing(newValue as number)
                            }}
                            step={1}
                            marks
                            min={0}
                            max={12}
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
                    paddingTop: 60,
                    minHeight: '80%',
                    backgroundColor: 'lightgray',
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
                            <Grid container spacing={gridSpacing}>
                                {currentEditedComponent?.component?.grid &&
                                    currentEditedComponent?.component?.grid.map(
                                        (gridElement: ComponentGrid, index) => (
                                            <GridCell
                                                key={index}
                                                size={gridElement.size}
                                            />
                                        )
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
    )
}
