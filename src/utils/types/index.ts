export type TNavBarIcon = {
    icon: string;
    main: boolean;
    handleClick?: VoidFunction;
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
    }
    winProps: {
        maxWidth?: number;
        minWidth?: number;
        maxHeight?: number;
        minHeight?: number;
        canExpand?: boolean;
        canCollapse?: boolean;
        canResize?: boolean;
    },
    refs: any,
    application: string;
    applicationId?: string;
}