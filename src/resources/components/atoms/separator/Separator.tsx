import React from 'react'
import { AtomProps, AtomPropsOptions } from '../../../../editor/types/Atom'
import './separator.scss'

export const SeparatorDefaultProps: AtomProps = {}

export const SeparatorPropsOptions: AtomPropsOptions = {
    compoundLevelProps: {},
    pageLevelProps: {},
}

export const Separator: React.FC = () => {
    return <span className='separator'></span>
}

export const EditableSeparator: React.FC = () => {
    return <span className='separator'></span>
}
