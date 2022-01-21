import "./index.css";
import TreeNode from "./TreeNode";
// import dataJSON from './data.json'
import { useEffect, useState } from "react";

export default function Tree () {
  const [data, setData] = useState([])
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch('https://api.jsonbin.io/v3/b/61e4c327ba87c130e3e980ec/latest', {
      method: 'GET',
      headers: { 'X-Master-Key': "$2b$10$obaQjMVzT/bmdka6gY6JvOg1JDCBbaE56uWiKFydM9zs.IKoLylLe" }
    })
      .then(async res => {
        const response = await res.json()
        setData(response.record)
      })
      .catch(e => {
        // console.log('error', e)
        setData([])
      })
  }

  const updateData = (body) => {
    fetch("https://api.jsonbin.io/v3/b/61e4c327ba87c130e3e980ec", {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2b$10$obaQjMVzT/bmdka6gY6JvOg1JDCBbaE56uWiKFydM9zs.IKoLylLe"
      },
      method: "PUT"
    })
      .then(async res => {
        const response = await res.json()
        setData(response.record)
      })
      .catch(e => {
        // console.log('error', e)
        setData([])
      })
  };

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

  const debounce = (callback, wait) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  const hanldeClick = debounce(() => {
    setDisableButton(true)
    updateData(data)
    setDisableButton(false)
  }, 2000)

  return (
    <div className="indent">
      <TreeNode
        {...data}
        addChildren={handleAdd}
        deleteChildren={handleDelete}
        addInput={addInput}
      />
      <button
        onClick={hanldeClick}
        disabled={disableButton}
      >Save Tree</button>
    </div>
  );
}
