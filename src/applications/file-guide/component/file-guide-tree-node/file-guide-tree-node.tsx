import { FC, useState } from 'react';
import css from './file-guide-tree-node.module.css';
import * as appsList from '../../../../applications';

type T = {
  node: any;
}

export const FileGuideTreeNode:FC<T> = ({node}) => {
  const { id, children, title, type, application, content } = node;
  
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  const apps = appsList;

  const currentIcon = eval('apps.'+application+'.appIcon');

  const icon = (id=='id-recyclebin'?'apps-icons/delete-bin.svg':(id=='id-desktop'?'apps-icons/desktop.svg':(id=='id-images'?'apps-icons/images.svg':currentIcon)));

    
  return (

    <>
      {type=='folder'&&
      <>
      <div onClick={handleClick} className={css.fileGuideNodeItem} style={{ marginBottom: "5px" }}>
        <img src={icon} />
        <span>{title}</span>
      </div>
      {showChildren&&children&&
      <ul className={css.fileGuideNodeList}>
        {children&&children.map((childNode:any) => <FileGuideTreeNode key={childNode.id} node={childNode} />)}
      </ul>
      }
      </>
    }
    </>

  );
}

export default FileGuideTreeNode;