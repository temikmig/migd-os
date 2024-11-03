export type TNavBarIcon = {
    id: string;
    sortable?: boolean;
    isPined?: boolean;
}

export type TWindow = {
    title: string;
    id: string;
    properties: {
        width: number;
        height: number;
        top: number;
        left: number;
    }
    winStates: {
        isExpand: boolean;
        isCollapse: boolean;
        isDragging: boolean;
        isActive: boolean;
        isScreenActive: boolean;
    }
    winProps: TWinProps,
    refs: any,
    application: string;
    applicationId?: string;
    structureId?: string;
}

export type TWinProps = {
    maxWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    minHeight?: number;
    canExpand?: boolean;
    canCollapse?: boolean;
    canResize?: boolean;
}