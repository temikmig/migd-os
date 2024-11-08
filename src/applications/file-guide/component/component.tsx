import { FC, MouseEvent, useContext, useState } from 'react';
import css from './component.module.css';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import { findNode } from '../../../utils/config';
import FileGuideOptionButton from './file-guide-option-button/file-guide-option-button';
import { SVGIconAdd, SVGIconCopy, SVGIconCut, SVGIconDelete, SVGIconEdit, SVGIconLeft, SVGIconPaste, SVGIconRight } from '../../../ui/svg-icons';
import FileGuideIcon from '../../../components/file-guide-icon/file-guide-icon';
import { fileGuideContext } from '../file-guide';
import { ContextMenu } from '../../../utils/context-menu/context-menu';
import { contextMenuContext } from '../../../components/app/app';
import { iconsContext } from '../../../components/content-bar/content-bar';
import FileGuideTree from './file-guide-tree/file-guide-tree';

type T = {
    id: string,
    structureId: string
}

// const { isOver, setNodeRef } = useDroppable({
//     id: "fileGuide",
//     data: {
//         accepts: ['fileGuideIcon'],
//     },
// });
  
// return(
//     <>
//         <div ref={setNodeRef} className={css.fileGuideCont}>{isOver?'true':'false'}</div>
//     </>
// )

export const Component:FC<T> = ({id, structureId}) => {
    const fileStructure = useSelector((store) => store.fileStructure.data);
    const { title, children } = findNode(structureId, fileStructure);

    const { strId, setStrId, backList, setBackList, forwardList, setForwardList } = useContext(fileGuideContext);

    const { activeIcon, setActiveIcon, renameIcon, setRenameIcon } = useContext(iconsContext);

    const handleBackStr = (e:MouseEvent<HTMLDivElement>) => {
        if(backList.length>0) {
            setForwardList([...forwardList, structureId]);
            setStrId(backList[backList.length-1]);
            backList.splice(-1, 1);
            setBackList(backList);
        }
    }

    const handleForwardStr = (e:MouseEvent<HTMLDivElement>) => {
        if(forwardList.length>0) {
            setStrId(forwardList[forwardList.length-1]);
            forwardList.splice(-1, 1);
            setForwardList(forwardList);
            setBackList([...backList, strId])
        }
    }

    const sysStrFlag = activeIcon==id+'-id-recyclebin'||activeIcon==id+'-id-desktop'||activeIcon==id+'-id-images';

    const handleCopyStr = (e:MouseEvent<HTMLDivElement>) => {
        if(activeIcon.startsWith(id)) {
            e.stopPropagation();
            setActiveIcon('');
            setRenameIcon('');
        }
    }

    const handleRenameStr = (e:MouseEvent<HTMLDivElement>) => {
        if(activeIcon.startsWith(id)&&!sysStrFlag) {
            e.stopPropagation();
            setRenameIcon(activeIcon);
        }
    }

    const { showContextMenu, hideContextMenu, setContextMenuItems } = useContext(contextMenuContext);

    const contextMenuItems = [
        [
            {title: 'Создать папку', action: (e:any) => {}}
        ]
    ];

    const handleContextMenu = (e:MouseEvent<HTMLDivElement>) => {
        setContextMenuItems(contextMenuItems);
        showContextMenu(e);
    } 

    const handleOutsideFileGuide = (e:MouseEvent<HTMLDivElement>) => {
        setRenameIcon('');
        if(activeIcon.startsWith(id)) {
            setActiveIcon('');
        }
    } 

    const outsideAlerterRef = useOutsideAlerter(() => {
        // openedWindows.map((id:string) => {
            if(activeIcon.startsWith(id)) {
                setActiveIcon('');
                setRenameIcon('');
            }
        // })
    });

    return(
        <>
        <div className={css.fileGuideComponent} ref={outsideAlerterRef}>
            <div className={css.fileGuideHeader}>FileGuide</div>
            <div className={css.fileGuideContainer}>
                <div className={css.fileGuideNav}>
                    <FileGuideTree />
                </div>
                <div className={css.fileGuideContent}>
                    <div className={css.fileGuideContentHeader}>
                        <div className={css.fileGuideContentHeaderTitle}>{title}</div>
                        <div className={css.fileGuideContentHeaderOptions}>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={handleBackStr} active={backList.length>0}><SVGIconLeft /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={handleForwardStr} active={forwardList.length>0}><SVGIconRight /></FileGuideOptionButton>
                            </div>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={(e:any) => {}} active={!activeIcon.startsWith(id)}><SVGIconAdd />создать папку</FileGuideOptionButton>
                            </div>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={handleCopyStr} active={activeIcon.startsWith(id)&&!sysStrFlag}><SVGIconCopy /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconPaste /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={(e:any) => {}} active={activeIcon.startsWith(id)&&!sysStrFlag}><SVGIconCut /></FileGuideOptionButton>
                            </div>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={handleRenameStr} active={activeIcon.startsWith(id)&&!sysStrFlag}><SVGIconEdit /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={(e:any) => {}} active={activeIcon.startsWith(id)&&!sysStrFlag}><SVGIconDelete /></FileGuideOptionButton>
                            </div>
                        </div>
                    </div>
                    <div className={css.fileGuideContentCont} onMouseDown={handleOutsideFileGuide} onContextMenu={handleContextMenu}>
                        {children.length>0?children.map((item:any) => 
                            <FileGuideIcon basis={id} key={item.id} id={item.id} />
                        ):<div className={css.fileGuideEmpty}>Папка пуста</div>}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Component;