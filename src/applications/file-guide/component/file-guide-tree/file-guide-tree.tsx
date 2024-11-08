import { FC } from 'react';
import css from './file-guide-tree.module.css';
import { useSelector } from '../../../../services/types/hooks';
import FileGuideTreeNode from '../file-guide-tree-node/file-guide-tree-node';

export const FileGuideTree:FC = () => {
    const fileStructure = useSelector((store) => store.fileStructure.data);
     
    return (
        <div>
          {fileStructure.children.map((item:any) => <FileGuideTreeNode key={item.id} node={item} />
          )}
        </div>
      );
}

export default FileGuideTree;