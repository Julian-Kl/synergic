import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ComponentList } from './componentList/ComponentList'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ width: '100%' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

export const ComponentBrowser: React.FC = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                height: 160,
                borderBottom: 2,
                borderColor: 'divider',
            }}
        >
            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    orientation='vertical'
                    aria-label='component browser'
                >
                    <Tab label='Atoms' {...a11yProps(0)} />
                    <Tab label='Molecules' {...a11yProps(1)} />
                    <Tab label='Organisms' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ComponentList components='atom' />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ComponentList components='molecule' />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ComponentList components='organism' />
            </TabPanel>
        </Box>
    )
}
