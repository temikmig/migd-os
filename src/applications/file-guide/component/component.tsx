import { FC, MouseEvent, useContext } from 'react';
import css from './component.module.css';
import { useContextMenu, useSelector } from '../../../services/types/hooks';
import { findNode } from '../../../utils/config';
import FileGuideOptionButton from './file-guide-option-button/file-guide-option-button';
import { SVGIconAdd, SVGIconCopy, SVGIconCut, SVGIconDelete, SVGIconEdit, SVGIconLeft, SVGIconPaste, SVGIconRight } from '../../../ui/svg-icons';
import FileGuideIcon from '../../../components/file-guide-icon/file-guide-icon';
import { fileGuideContext } from '../file-guide';
import { ContextMenu } from '../../../utils/context-menu/context-menu';

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
  
// //   console.log(isOver);
// return(
//     <>
//         <div ref={setNodeRef} className={css.fileGuideCont}>{isOver?'true':'false'}</div>
//     </>
// )

export const Component:FC<T> = ({id, structureId}) => {
    const fileStructure = useSelector((store) => store.fileStructure.data);
    const { title, children } = findNode(structureId, fileStructure);

    const { strId, setStrId, backList, setBackList, forwardList, setForwardList } = useContext(fileGuideContext);

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

    const { showContextMenu, hideContextMenu, contextMenuVisible, menuPosition } = useContextMenu();

    const contextMenuItems = [
        [
            {title: 'Создать папку', action: (e:any) => {}}
        ]
    ];

    const handleContextMenu = (e:MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        showContextMenu(e);
    } 

    return(
        <>
        <div className={css.fileGuideComponent}>
            <div className={css.fileGuideHeader}>FileGuide</div>
            <div className={css.fileGuideContainer}>
                <div className={css.fileGuideNav}>
                    {backList.map((item:string) => item)}
                </div>
                <div className={css.fileGuideContent}>
                    <div className={css.fileGuideContentHeader}>
                        <div className={css.fileGuideContentHeaderTitle}>{title}</div>
                        <div className={css.fileGuideContentHeaderOptions}>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={handleBackStr} active={backList.length>0&&true}><SVGIconLeft /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={handleForwardStr} active={forwardList.length>0&&true}><SVGIconRight /></FileGuideOptionButton>
                            </div>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconAdd />создать</FileGuideOptionButton>
                            </div>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconCopy /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconPaste /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconCut /></FileGuideOptionButton>
                            </div>
                            <div className={css.fileGuideContentHeaderOptionsGroup}>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconEdit /></FileGuideOptionButton>
                                <FileGuideOptionButton handleClick={(e:any) => {}}><SVGIconDelete /></FileGuideOptionButton>
                            </div>
                        </div>
                    </div>
                    <div className={css.fileGuideContentCont} onContextMenu={handleContextMenu}>
                        {children&&children.map((item:any) => 
                            <FileGuideIcon id={item.id} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        <ContextMenu visible={contextMenuVisible} position={menuPosition} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
        </>
    )
}

export default Component;