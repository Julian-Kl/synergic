import { atomRegistry } from "../atomRegistry"

export const isAtomInRegistry = (atomName: string): boolean => {
    return atomName in atomRegistry
}