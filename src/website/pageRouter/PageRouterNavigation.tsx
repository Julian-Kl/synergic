
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../../app/types/Page'

interface Props {
    pageName: string
    setPageName: (name: string) => void
    pages: Page[]
    url: string
}

export const PageRouterNavigation: React.FC<Props> = (props: Props) => {
    
    return (
        
        
            <Box sx={{ width: '100%', backgroundColor: 'lightgray' }}>
                <Box sx={{ maxWidth: 240, marginLeft: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            Page
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={props.pageName}
                            label='Page'
                            onChange={(e) => props.setPageName(e.target.value)}
                        >
                            {props.pages.map(({ name, route }, key) => (
                                <MenuItem
                                    value={name}
                                    key={key}
                                    style={{ padding: 0 }}
                                >
                                    <Link
                                        to={`${props.url}/${route}`}
                                        style={{
                                            width: '100%',
                                            padding: '6px 16px 6px 16px',
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            component='span'
                                        >
                                            {name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
    )
}
