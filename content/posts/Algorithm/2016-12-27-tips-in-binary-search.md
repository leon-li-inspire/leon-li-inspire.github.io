---
category : Algorithm
tags : [binary search, algorithm, tutorial]
date: 2016-12-27
title: "Tips In Binary Search"
draft: false
---

Sometimes, I feel the confused while dealing with the binary search problem, especially when facing the problem to find the first or last occurrence index to meet certain requirements and I felt so ashamed. After reading the post from [canhazcode][1], I find we can use another way to solve the binary search problem. 

## **Alternative definition**

Say we are searching for the first instance of the number 6 in the following array,

[1, 1, 2, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 10, 10, 11]

We use another way to define this problem, what we need to do is to find the lower bound from the given array which meets the requirement $p(f(x)) \\geq 6$, where $f(x)$ is the function to get the corresponding value from index $x$ and $p(v)$ is the predicate function which means $v \\geq 6$ in this problem. So the binary search code could be

    int firstAppearance(vector<int>& arr, int target) {
        if (arr.size() == 0) return 0;
        int start, end, mid, cand;
        start = 0;
        end = arr.size() - 1;
        while (start <= end) {
            mid = start + (end - start) / 2;
            if (arr[mid] >= target) {
                cand = mid;
                end = mid - 1;
            }
            else {
                start = mid + 1;
            }
        }
        return cand;
    }

Even if there is no the number 6 in the given array, this function will still return a value which is greater than 6. 

If the problem is to find the last occurrence of the number 6, we just need to modify the previous function to find the upper bound

    int lastAppearance(vector<int>& arr, int target) {
        if (arr.size() == 0) return 0;
        int start, end, mid, cand;
        start = 0;
        end = arr.size() - 1;
        while (start <= end) {
            mid = start + (end - start) / 2;
            if (arr[mid] <= target) {
                cand = mid;
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        return cand;
    }

 By keeping this thought in mind and using the lower bound, upper bound and predicate functon, we could avoid many tricks when coding the binary seach solution, such like the infinite loop and incorrect return value.

 [1]: http://canhazcode.blogspot.com/2012/02/we-need-to-talk-about-binary-search.html


