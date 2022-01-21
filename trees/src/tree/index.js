import "./index.css";
import TreeNode from "./TreeNode";
import dataJSON from './data.json'

export default function Tree () {
  return (
    <div className="indent">
      <TreeNode {...dataJSON} />
    </div>
  );
}
