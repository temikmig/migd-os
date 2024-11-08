import {
    COPY_STRUCTURE,
    CUT_STRUCTURE,
    RENAME_STRUCTURE,
    DELETE_STRUCTURE
} from '../constants/file-structure'

export interface IRenameStructureAction {
    readonly type: typeof RENAME_STRUCTURE,
    readonly id: string, 
    readonly title: string
}

export const renameStructure = (id:string, title:string):IRenameStructureAction => ({
    type: RENAME_STRUCTURE, 
    id,
    title
});

export type TFileStructureActions =
  | IRenameStructureAction;