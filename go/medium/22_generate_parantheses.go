// https://leetcode.com/problems/generate-parentheses/description
// 22. Generate Parentheses
// Solved
// Medium
// Topics
// Companies
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

// Constraints:

// 1 <= n <= 8

package main

func GenerateParenthesis(n int) []string {
	res := []string{}

	var backtrack func(openCount int, closeCount int, output string)
	backtrack = func(openCount int, closeCount int, output string) {
		if len(output) == 2*n {
			res = append(res, output)
			return
		}

		if openCount < n {
			backtrack(openCount+1, closeCount, output+"(")
		}
		if openCount > closeCount {
			backtrack(openCount, closeCount+1, output+")")
		}
	}

	backtrack(0, 0, "")
	return res
}
