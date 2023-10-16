# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num: int) -> int:

# def binarySearch(self, n: int) -> int:
#     start = 0
#     end = n
#     point = getMidPoint(start, end)
#     isCorrect = guess(point)
#     while isCorrect != 0:
#         if isCorrect == -1:
#             end = point - 1
#             point = getMidPoint(start, end)
#         elif isCorrect == 1:
#             start = point + 1
#             point = getMidPoint(start, end)
#         isCorrect = guess(point)

#     return point


def binary_search(arr, low, high, x):

    # Check base case
    if high >= low:

        mid = (high + low) // 2

        # If element is present at the middle itself
        if arr[mid] == x:
            return mid

        # If element is smaller than mid, then it can only
        # be present in left subarray
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)

        # Else the element can only be present in right subarray
        else:
            return binary_search(arr, mid + 1, high, x)

    else:
        # Element is not present in the array
        return -1


def getMidPoint(start: int, end: int) -> int:
    return (end+start)//2
