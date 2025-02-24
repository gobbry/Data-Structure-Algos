// 49. Group Anagrams
// Medium
// Topics
// Companies
// Given an array of strings strs, group the
// anagrams
//  together. You can return the answer in any order.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// Explanation:

// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
// Example 2:

// Input: strs = [""]

// Output: [[""]]

// Example 3:

// Input: strs = ["a"]

// Output: [["a"]]

// Constraints:

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] consists of lowercase English letters.
package main

import "sort"

func GroupAnagrams(strs []string) [][]string {
	groups := make(map[string][]string)

	for _, str := range strs {
		bytes := []byte(str)
		sort.Slice(bytes, func(i, j int) bool {
			return bytes[i] < bytes[j]
		})

		sorted := string(bytes)
		groups[sorted] = append(groups[sorted], str)
	}
	results := make([][]string, 0, len(groups))
	for _, group := range groups {
		results = append(results, group)
	}
	return results
}
