import React from 'react'
import { Box, Button, Grid, Paper, styled } from '@mui/material'
import { atomRegistry } from '../../../../builder/components/atoms/atomRegistry'
import { moleculeRegistry } from '../../../../builder/components/molecule/moleculeRegistry'
import { componentMetadata } from '../../../../builder/types/componentMetadata'
import AddCircleIcon from '@mui/icons-material/AddCircle'

interface Props {
    components: 'atom' | 'molecule' | 'organism'
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'solid 1px darkblue',
}))

export const ComponentList: React.FC<Props> = (props: Props) => {
    let registry: componentMetadata[] = []

    switch (props.components) {
        case 'atom':
            registry = atomRegistry
            break
        case 'molecule':
            registry = moleculeRegistry
            break
        default:
            break
    }

    const renderAddButton = () => {
        if (
            props.components === 'molecule' ||
            props.components === 'organism'
        ) {
            return (
                <Grid item xs={2}>
                    <Button variant='contained' href='#contained-buttons'>
                        <AddCircleIcon fontSize='medium' />
                    </Button>
                </Grid>
            )
        } else {
            return
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {registry.map((component) => (
                    <Grid key={component.name} item xs={2}>
                        <Item>{component.name}</Item>
                    </Grid>
                ))}
                {renderAddButton()}
            </Grid>
        </Box>
    )
}
