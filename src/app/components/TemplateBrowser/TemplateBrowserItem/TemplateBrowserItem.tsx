import React from 'react'
import { Button, Grid, Paper, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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


interface Props {
    children: string
    id?: number
    selected?: boolean
    deleteTemplate?: (id: number) => void
}

export const TemplateBrowserItem: React.FC<Props> = (props: Props) => {
    const handleDelete = () => {
        if (props.id && props.deleteTemplate) {
            props.deleteTemplate(props.id)
        }
    }

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
    } else {
        return <DefaultItem>{props.children}</DefaultItem>
    }
}
