import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Paper, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Atom, AtomEntry } from '../../../../types/Atom';
import { Compound } from '../../../../types/Compound';

export const DefaultItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.primary.main}`,
    ':hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        cursor: 'pointer',
    },
}))

export const SelectedItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
}))

export const AddAbleItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
}))

interface Props {
    children: string
    isAddAble: boolean
    addComponentToCell: (component: Atom | Compound) => void
    id?: number
    selected?: boolean
    deleteComponent?: (id: number) => void
    index?: number
    component: AtomEntry | Compound
}

export const BrowserItem: React.FC<Props> = (props: Props) => {
    const [component, setComponent] = useState<Atom | Compound>(props.component)

    const handleDelete = () => {
        if (props.id && props.deleteComponent) {
            props.deleteComponent(props.id)
        }
    }

    useEffect(() => {
        if(props.component.type === 'atoms') {
            props.component as AtomEntry
            const defaultAtom: Atom = {
                name: props.component.name,
                type: props.component.type,
                props: props.component.props
            }
            setComponent(defaultAtom)
        }
    }, [])


    if (props.selected) {
        return (
            <SelectedItem>
                <Grid container>
                    <Grid item xs={8} style={{ padding: 8 }}>
                        {props.children}{' '}
                    </Grid>
                    <Grid item xs={4} style={{ padding: 0 }}>
                        <Button color='inherit' onClick={() => handleDelete()}>
                            <DeleteIcon fontSize='medium' />
                        </Button>
                    </Grid>
                </Grid>
            </SelectedItem>
        )
    } else if (props.isAddAble) {
        return (
            <AddAbleItem>
                <Grid container>
                    <Grid item xs={8} style={{ padding: 8 }}>
                        {props.children}{' '}
                    </Grid>
                    <Grid item xs={4} style={{ padding: 0 }}>
                        <Button color='inherit' onClick={() => props.addComponentToCell(component)}>
                            <AddIcon fontSize='medium' />
                        </Button>
                    </Grid>
                </Grid>
            </AddAbleItem>
        )
    } else {
        return <DefaultItem>{props.children}</DefaultItem>
    }
}
