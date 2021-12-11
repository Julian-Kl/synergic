import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React from 'react'
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
            style={{
                width: '100%',
                overflowY: 'scroll',
            }}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

interface AtomicBrowserProps {
    organisms?: boolean
    isCreateable?: boolean | undefined
}

export const AtomicBrowser: React.FC<AtomicBrowserProps> = (
    props: AtomicBrowserProps
) => {
    const [value, setValue] = React.useState(props.organisms ? 2 : 0)

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
                borderColor: '#1565c0',
            }}
        >
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    orientation='vertical'
                    aria-label='component browser'
                >
                    <Tab label='Atoms' {...a11yProps(0)} disabled={props.organisms} />
                    <Tab label='Molecules' {...a11yProps(1)} disabled={props.organisms} />
                    <Tab label='Organisms' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ComponentList components='atoms' isCreateable={props.isCreateable} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ComponentList components='molecules' isCreateable={props.isCreateable} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ComponentList components='organisms' isCreateable={props.isCreateable} />
            </TabPanel>
        </Box>
    )
}
