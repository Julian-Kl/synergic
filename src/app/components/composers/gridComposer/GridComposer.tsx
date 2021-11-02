import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid, { GridSize } from '@mui/material/Grid'
import { Slider, Typography } from '@mui/material'

interface GridElement {
    size: GridSize
}

interface ComposedGrid {
    gridElements: GridElement[]
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

    const gridContainerDenominator = 12

    const gridElements: GridElement[] = [
        { size: 3 },
        { size: 6 },
        { size: 5 },
        { size: 12 },
    ]

    return (
        <>
            <Typography variant='h4' component='h1' gutterBottom>
                Grid Composer
            </Typography>

            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='body1' gutterBottom>
                            Grid Container Display Width
                        </Typography>
                        <Slider
                            value={gridContainerNumerator as number}
                            onChange={(event: Event, newValue: number | number[]) => {
                                setGridContainerNumerator(newValue as GridSize)
                            }}
                            step={1}
                            marks
                            min={1}
                            max={gridContainerDenominator}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='body1' gutterBottom>
                            Grid Spacing
                        </Typography>
                        <Slider
                            value={gridSpacing}
                            onChange={(event: Event, newValue: number | number[]) => {
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

            <div style={{ height: 60 }}></div>

            {/* Container for the Grid Composer */}
            <Grid container spacing={0} columns={gridContainerDenominator}>
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
                                    <Grid
                                        key={index}
                                        item
                                        xs={gridElement.size}
                                    >
                                        <Item>xs={gridElement.size}</Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </>
    )
}
