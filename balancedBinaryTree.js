const Node = value => {
    
    let data = value
    let left = null
    let right = null
    
    return {
        data,
        left,
        right
    }
}

function Tree(array) {
    const sortedArray = removeDuplicates(mergeSort(array))
    const buildTree = (array = sortedArray, start = 0, end = array.length-1) => {
        if (start > end) return null
        else {
            const middle = Math.floor((start + end) / 2)
            const rootNode = Node(array[middle])
            rootNode.left = buildTree(array, start, middle - 1)
            rootNode.right = buildTree(array, middle + 1, end)
            return rootNode
        }
    }
    
    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

    const insertValue = (value, root) => {
        if (!root) return Node(value)
        if (value === root.data) return console.log("value already exists")
        if (!root.left && value < root.data) return root.left = Node(value)
        if (!root.right && value > root.data) return root.right = Node(value)
        
        if (root.left && value < root.data) return insertValue(value, root.left)
        if (root.right && value > root.data) return insertValue(value, root.right)
        console.log("done")
    }

    
    const deleteValue = (root, value) => {
        if (!root) return console.log("empty tree or value not found")
        else if (!root.left && !root.right && root.data !== value) return console.log("value not found")
        else if (!root.left && !root.right && root.data === value) return root = null
        else if (!root.left && root.right && root.data === value) {
            root = root.right
            root.right = root.right.right
            console.log("right child case")
        } else if (root.left && !root.right && root.data === value) {
            root = root.left
            root.left = root.left.left
            console.log("left child case")
        } else if (root.left && root.right && root.data === value) {
            root = root.right
            root.right = root.right.right
            console.log("2 children case")
        } else if (value > root.data) return deleteValue(root.right, value)
        else if (value < root.data) return deleteValue(root.left, value)
        
        return root
    }
    
    function getDepth(root, value, depthLevel = 0) {
        if (typeof findNode(root, value) !== 'object') return console.log("value not found")
        if (value === root.data) return console.log(depthLevel === 0 ? "Root node (depth: 0)" : `Depth level: ${depthLevel}`)
        
        while (value !== root.data) {
            if (value > root.data) {
                console.log(root)
                return getDepth (root = root.right, value, depthLevel += 1)
            } else if (value < root.data) {
                console.log(root)
                return getDepth (root = root.left, value, depthLevel += 1)
            }
        }
    }
    
    function getHeight(root, value = root.data, leftHeight = 0, rightHeight = 0) {
        if (!root) return 0;
        if (typeof findNode(root, value) !== 'object') return console.log("value not found")
        
        if (value > root.data) {
            getHeight(root = root.right, value)
        } else if (value < root.data) {
            getHeight(root = root.left, value)
        } else if (value === root.data) {
             let currentNode = root
        
            while (currentNode.left) {
                getHeight(currentNode.left, value, ++leftHeight)
            }
            
            while (currentNode.right) {
                getHeight(currentNode.right, value, ++rightHeight)
            }
            
            return Math.max(leftHeight, rightHeight)
        }
    }        
        // if (value > root.data) {
        //     return getHeight(root.right, value)
        // } else if (value < root.data) {
        //     return getHeight(root.left, value)
        // } else if (!root.left && !root.right) {
        //     return 0
        // }
        // let leftHeight = root.left ? getHeight(root.left) : 0;
        // let rightHeight = root.right ? getHeight(root.right) : 0;
        // return Math.max(leftHeight, rightHeight) + 1;
    
    
        // let leftHeight = 0
        // let rightHeight = 0
        // let currentNode = root
        // while (currentNode) {
        //     currentNode = currentNode.left
        //     leftHeight += 1
        // }
        // while (currentNode) {
        //     currentNode = currentNode.right
        //     rightHeight += 1
        // }
        // return Math.max(leftHeight, rightHeight);
    
    function isBalanced(root, leftHeight = 0, rightHeight = 0) {
        if (!root) return console.log("hello")
        if (root.left && root.right) {
            console.log(root.data)
            isBalanced(root = root.left, ++leftHeight)
            console.log(root.data)
            isBalanced(root = root.right, ++rightHeight)
            console.log(root.data)
        }   
    }

    function inorder(root) {
        let inorderArray = [];
        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            inorderArray.push(node.data);
            traverse(node.right);
        }
        traverse(root);
        console.log(inorderArray);
        return inorderArray;
    }
    
    function preorder(root) {
        let preorderArray = [];

        function traverse(node) {
            if (!node) return;
            preorderArray.push(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(root);
        console.log(preorderArray);
        return preorderArray;
    }
    
    function postorder(root) {
        let postorderArray = [];

        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            postorderArray.push(node.data);
        }

        traverse(root);

        console.log(postorderArray);
        return postorderArray;
    }

    function findNode(root, value) {
        if (!root) {
            return console.log("value not found")
        } else if (value > root.data) {
            return findNode(root.right, value)
        } else if (value < root.data) {
            return findNode(root.left, value)
        }
        console.log(root)
        return root
    }
    
    return {
        buildTree,
        prettyPrint,
        insertValue,
        deleteValue,
        findNode,
        getDepth,
        getHeight,
        inorder,
        preorder,
        postorder,
        isBalanced,
    }
}

function mergeSort(array) {
    if (array.length < 2) return array
    const middle = Math.floor(array.length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(leftArray, rightArray) {
    let leftCounter = 0
    let rightCounter = 0
    let sortedArray = []
    while (leftCounter < leftArray.length && rightCounter < rightArray.length) {
        if (leftArray[leftCounter] < rightArray[rightCounter]) {
            sortedArray.push(leftArray[leftCounter])
            leftCounter++
        } else {
            sortedArray.push(rightArray[rightCounter])
            rightCounter++
        }
    }
     return [...sortedArray, ...leftArray.slice(leftCounter), ...rightArray.slice(rightCounter)]
}

function removeDuplicates(array) {
    let newArray = []
    for (let i=0; i < array.length; i++) {
        if (array[i] == array[i + 1]) continue
        newArray.push(array[i])
    }
    return newArray
}

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 101, 100, 102, 103, 104, 105, 106])
const treeNodes = tree.buildTree()
tree.prettyPrint(treeNodes)