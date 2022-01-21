const TreeNode = (props) => {
  const { node, children, dots = '' } = props
  const name = Array.from(node)
  name.splice(1, 0, dots)

  return (
    <div className='tree-node'>
      {`${name.join('')}`}
      {children &&
        <div key={node.node} className="indent">
          {children.map((node) => (
            <TreeNode
              {...node}
              dots={`${dots}.`}
              father={node}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default TreeNode;
