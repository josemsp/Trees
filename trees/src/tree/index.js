import "./index.css";
import TreeNode from "./TreeNode";
import dataJSON from './data.json'
import { useState } from "react";

export default function Tree () {
  const [data, setData] = useState(dataJSON)

  const copyObject = (obj) => JSON.parse(JSON.stringify(obj))

  const handleAdd = ({ father, name }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, name, addChildren)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
    }
  }

  const addChildren = (_element, name) => {
    _element.children = [
      ..._element.children,
      { node: name }
    ]
    return _element
  }

  const handleDelete = ({ father, node }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, node, deleteChildren)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
    }
  }

  const deleteChildren = (_element, name) => {
    _element.children = _element.children.filter(n => n.node !== name)
    return _element
  }

  const addInput = ({ father, node }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, node, setChildren)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
    }
  }

  const setChildren = (_element, name) => {
    let _node = _element.children.find(n => n.node === name)
    _node.children = []
    return _element
  }

  const searchInTree = (element, nodeToFind, name, action) => {
    if (element.node === nodeToFind) {
      element = { ...action(element, name) }
      return element
    } else if (element.children !== undefined) {
      let index = 0
      let result = null
      for (index = 0; result === null && index < element.children.length; index++) {
        result = searchInTree(element.children[index], nodeToFind, name, action)
      }
      if (result) return element
    }
    return null
  }

  return (
    <div className="indent">
      <TreeNode
        {...data}
        addChildren={handleAdd}
        deleteChildren={handleDelete}
        addInput={addInput}
      />
    </div>
  );
}
