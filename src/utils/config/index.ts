export const defaultIcons = [{
    type: 'file',
    icon: '/apps-icons/file.svg', 
},
{
    type: 'folder', 
    icon: '/apps-icons/folder.svg'
}]

export const DOCUMENT_HEIGHT = window.innerHeight;
export const DOCUMENT_WIDTH = window.innerWidth;

export const FILEGUIDE_APP = '00000000-0000-0000-0000-000000000000';
export const DELETE_BIN_APP = '00000000-0000-0000-0000-000000000001';

export const CALENDAR_BEG = {year: 1900, month: 0};
export const CALENDAR_END =  {year: 2100, month: 11};

export const defaultAppProps = {
    canExpand: false,
    canCollapse: true,
    canResize: false
}

export const defaultAppSizes = {
    width: 500,
    height: 350
}

export function findNode(id:any, currentNode:any):any {
    let currentChild, result;

    if(id==currentNode.id) {
        return currentNode;
    } else {
        for(let i in currentNode.children) {
            currentChild = currentNode.children[i];

            result = findNode(id, currentChild);

            if(result !== false) {
                return result;
            }
        }

        return false;
    }
}