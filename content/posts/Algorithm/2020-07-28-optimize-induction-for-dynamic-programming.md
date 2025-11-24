---
category : Algorithm
tags : [binary search, algorithm, tutorial]
date: 2020-07-28
title: "Optimize Induction For Dynamic Programming"
draft: false
---

Recently I reviewed some dynamic programming problems and found I was still lack of the ability to come up with the most optimized solution or induction in some cases. So I tried to find out a generic method to optimize one simple basic induction so that I can use it to optimize my dynamic programming model in the future.

## **Complete Knapsack Problem**

Given `n` items and their weights and values are `w[i]`, `v[i]`. We need to put some of them into a knapsack of capacity `W`to get the maximum total value in the knapsack. Each item can be picked any times.

The straightforward dynamic programming induction for this problem is

```
dp[i + 1, j] = max(dp[i, j - k * w[i + 1]] + k * v[i + 1]), where k >= 0
```

where `dp[i, j]` means the maximum value if we just use the first `i` items and the capacity limitation is `j`.

This induction is very straightforward, it shows that we can calculate the `i+1`th item case based previous calcuation results. But this isn't the optimized induction for this problem since we need to calculate `k` times to find out the maximum value. We can dive deep more to see whether it is possible to utilize the calculation results from the `dp[i + 1, j - w[i + 1]]` too, where

```
dp[i + 1, j - w[i + 1]] = max(dp[i, j - w[i + 1] - k * w[i + 1]] + k * v[i + 1]), where k >=0
```

Now we try to do some modifications on our basic indcution

```
dp[i + 1, j] = max(dp[i, j - k * w[i + 1]] + k * v[i + 1]), where k >= 0
             = max(dp[i, j] for k == 0, dp[i, j - k * w[i + 1]] + k * v[i + 1] for k >= 1)
             = max(dp[i, j] for k == 0, dp[i, j - w[i + 1] - k * w[i + 1]] + k * v[i + 1] + v[i + 1]  for k >= 0)
             = max(dp[i, j] for k == 0, max(dp[i, j - w[i + 1] - k * w[i + 1]] + k * v[i + 1] + v[i + 1]) for k >= 0)
             = max(dp[i, j], dp[i + 1, j - w[i + 1]] + v[i + 1])
```

Then we just need to compare two calcuation results within the calculation iteration for one item.

## **Sum Calculation Problem**
Give `n` unique number `a[i]` and each of them has `m[i]` copies. We need to justify whether it is possible to select some of these numbers to make them sum up to `K` exactly.

The straightforward dynamic programming induction for this problem is

```
dp[i + 1, j] = Or(dp[i, j - k * a[i + 1]] for 0<=k<=min(m[i + 1], j / a[i + 1]))
```

where `dp[i, j]` is the boolean value to represent whether it is possible to use first `i` items to get a sum equal to `j`. We would meet the same problem here as in Complete Knapsack Problem, that we need to calculate `k` items with the iteration of each item. Let's do the similiar modifications to the basic induction to see whether there is any optimizations.

```
dp[i + 1, j] = Or(dp[i, j - k * a[i + 1]] for 0<=k<=min(m[i + 1], j / a[i + 1]))
             = Or(dp[i, j] for k == 0, dp[i, j - k * a[i + 1]] for 1<=k<=min(m[i + 1], j / a[i + 1]))
             = Or(dp[i, j] for k == 0, dp[i, j - a[i + 1] - k * a[i + 1]] for 0<=k<=min(m[i + 1], j / a[i + 1]) - 1)
             = Or(dp[i, j], dp[i + 1, j - a[i + 1]] if we can select one more a[i + 1])
```

Seems like we can just compare `dp[i, j]` and `dp[i + 1, j - a[i + 1]]` to get what we want now. But this isn't end. There is one problem in this induction that we don't know whether we can select `a[i + 1]` one more time based on `d[i + 1, j - a[i + 1]]` case. This problem can be solved just by storing the remaining number of `a[i + 1]` in the `dp[i + 1, *]` instead of the boolean value. In dynamic programming, storing boolean value in the dp table is sometimes wasting our space.