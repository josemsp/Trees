import { useState } from "react";

const TreeNode = (props) => {
  const { node, children, dots = '', father, addChildren, deleteChildren, addInput } = props
  let name = Array.from(node || '')
  name.splice(1, 0, dots)
  name = name.join('')

  const [text, setText] = useState('')

  const handleText = (event) => setText(event.target.value)

  const handleKeyUp = (event) => {
    const keycode = event.keyCode;
    const code = event.code;

    if (text !== '' && (keycode === '13' || code === 'Enter')) {
      addChildren({ father: node, name: text })
      setText('')
    }
  }

  const handleDelete = () => deleteChildren({ father, node })

  const handleAddInput = () => addInput({ father, node: node })

  return (
    <div className='tree-node'>
      {`${name}`}

      {father &&
        <div className="options">
          <span role="img" aria-label="cross" onClick={handleDelete}>❌</span>
          {!children && <span role="img" aria-label="cross" onClick={handleAddInput}>➕</span>}
        </div>
      }

      {children &&
        <div key={node.node} className="indent">
          {children.map((_node) => (
            <TreeNode
              {..._node}
              dots={`${dots}.`}
              father={node}
              addChildren={addChildren}
              deleteChildren={deleteChildren}
              addInput={addInput}
            />
          ))}
        </div>
      }
      {children && <input type="text" value={text} onChange={handleText} onKeyUp={handleKeyUp} />}
    </div>
  );
};

export default TreeNode;
