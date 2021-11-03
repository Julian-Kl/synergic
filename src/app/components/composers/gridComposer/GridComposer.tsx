import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid, { GridSize } from '@mui/material/Grid'
import { Button, Slider, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { GridCell } from './gridCell/GridCell'

interface GridElement {
    size: GridSize
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'solid 1px darkblue',
}))

export const GridComposer: React.FC = () => {

    const [
        gridContainerNumerator,
        setGridContainerNumerator,
    ] = useState<GridSize>(6)

    const [gridSpacing, setGridSpacing] = useState<number>(0)

    const [gridElements, setGridElements] = useState<GridElement[]>([])

    const gridContainerDenominator = 12

    const addGridElement = () => {
        gridElements.push({ size: 3 })
        setGridElements([...gridElements])
    }

    const removeGridElement = (index: number): void => {
        console.log(gridElements.splice (index));
    }

    return (
        <>
            <Typography variant='h4' component='h1' gutterBottom>
                Grid Composer
            </Typography>

            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <Typography variant='body1' gutterBottom>
                            Grid Container Display Width
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
            <Grid container spacing={0} columns={gridContainerDenominator} style={{ marginTop: 60 }}>
                <Grid
                    item
                    xs={gridContainerNumerator}
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <Item>
                        {/* Grid Builder */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={gridSpacing}>
                                {gridElements.map((gridElement, index) => (
                                    <GridCell 
                                    key={index}
                                    size={gridElement.size}
                                    />
                                ))}
                                <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <Button
                                        variant='contained'
                                        onClick={addGridElement}
                                    >
                                        <AddCircleIcon fontSize='medium'/>
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
