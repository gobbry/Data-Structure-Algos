// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Solved
// Medium
// Topics
// Companies
// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

// Example 1:

// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
// Example 2:

// Input: preorder = [-1], inorder = [-1]
// Output: [-1]

// Constraints:

// 1 <= preorder.length <= 3000
// inorder.length == preorder.length
// -3000 <= preorder[i], inorder[i] <= 3000
// preorder and inorder consist of unique values.
// Each value of inorder also appears in preorder.
// preorder is guaranteed to be the preorder traversal of the tree.
// inorder is guaranteed to be the inorder traversal of the tree.
package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func BuildTree(preorder []int, inorder []int) *TreeNode {
	// Create map for O(1) lookup of inorder indices
	inorderMap := make(map[int]int)
	for i, val := range inorder {
		inorderMap[val] = i
	}

	// Helper function to build tree recursively
	var build func(preStart, preEnd, inStart, inEnd int) *TreeNode
	build = func(preStart, preEnd, inStart, inEnd int) *TreeNode {
		if preStart > preEnd {
			return nil
		}

		// Root is first element of preorder
		root := &TreeNode{Val: preorder[preStart]}

		// Find root position in inorder using map
		mid := inorderMap[preorder[preStart]]
		leftSize := mid - inStart

		// Recursively build left and right subtrees
		root.Left = build(preStart+1, preStart+leftSize, inStart, mid-1)
		root.Right = build(preStart+leftSize+1, preEnd, mid+1, inEnd)

		return root
	}

	return build(0, len(preorder)-1, 0, len(inorder)-1)

	// if len(preorder) == 0 || len(inorder) == 0 {
	// 	return nil
	// }

	// root := &TreeNode{Val: preorder[0]}
	// var mid int
	// for idx, o := range inorder {
	// 	if o == preorder[0] {
	// 		mid = idx
	// 	}
	// }
	// root.Left = BuildTree(preorder[1:mid+1], inorder[:mid])
	// root.Right = BuildTree(preorder[mid+1:], inorder[mid+1:])
	// return root
}
