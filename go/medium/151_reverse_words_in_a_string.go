// 151. Reverse Words in a String
// Solved
// Medium
// Topics
// Companies
// Given an input string s, reverse the order of the words.

// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

// Return a string of the words in reverse order concatenated by a single space.

// Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

// Example 1:

// Input: s = "the sky is blue"
// Output: "blue is sky the"
// Example 2:

// Input: s = "  hello world  "
// Output: "world hello"
// Explanation: Your reversed string should not contain leading or trailing spaces.
// Example 3:

// Input: s = "a good   example"
// Output: "example good a"
// Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

// Constraints:

// 1 <= s.length <= 104
// s contains English letters (upper-case and lower-case), digits, and spaces ' '.
// There is at least one word in s.

// Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?

package main

func reverseWords(s string) string {
	bytes := []byte(s)
	length := len(bytes)

	reverse(bytes, 0, length-1)

	start := 0
	for i := 0; i < length; i++ {
		if bytes[i] == ' ' {
			reverse(bytes, start, i-1)
			start = i + 1
		}
	}
	reverse(bytes, start, length-1)

	return cleanSpaces(bytes)

	// words := strings.Fields(s)

	// left := 0
	// right := len(words) - 1
	// for left < right {
	// 	words[left], words[right] = words[right], words[left]
	// 	left++
	// 	right--
	// }
	// return strings.Join(words, " ")
}

func reverse(bytes []byte, start int, end int) {
	for start < end {
		bytes[start], bytes[end] = bytes[end], bytes[start]
		start++
		end--
	}
}

func cleanSpaces(bytes []byte) string {
	length := len(bytes)
	i := 0
	j := 0

	for j < length && bytes[j] == ' ' {
		j++
	}

	for j < length {
		if bytes[j] != ' ' {
			if i > 0 {
				bytes[i] = ' '
				i++
			}
			for j < length && bytes[j] != ' ' {
				bytes[i] = bytes[j]
				i++
				j++
			}
		}
		j++
	}

	return string(bytes[:i])
}
