---
category : Algorithm
tags : [binary search, algorithm, tutorial]
use_math : true
date: 2018-12-17
title: "Super Washing Machine"
draft: false
---

Recently I read a post saying that many interviewees of Amazon have been stuck by a problem called [*Super Washing Machine*][1]. The following are some solutions for this problem.

## **Problem description**
You have **n** super washing machines on a line. Initially, each washing machine has some dresses or is empty.

For each **move**, you could choose **any m** (1 ≤ m ≤ n) washing machines, and pass **one dress** of each washing machine to one of its adjacent washing machines **at the same time**.

Given an integer array representing the number of dresses in each washing machine from left to right on the line, you should find the **minimum number** of moves to make all the washing machines have the same number of dresses. If it is not possible to do it, return -1.

#### **Example 1** ####

    Input: [1,0,5]
    Output: 3
    Explanation: 
    1st move:    1     0 <-- 5    =>    1     1     4
    2nd move:    1 <-- 1 <-- 4    =>    2     1     3    
    3rd move:    2     1 <-- 3    =>    2     2     2

#### **Example 2** ####

    Input: [0,3,0]
    Output: 2
    Explanation: 
    1st move:    0 <-- 3     0    =>    1     2     0    
    2nd move:    1     2 --> 0    =>    1     1     1

#### **Example 3** ####

    Input: [0,2,0]
    Output: -1
    Explanation: 
    It's impossible to make all the three washing machines have the same number of dresses. 

#### **Note** ####
    1. The range of n is [1, 10000].
    2. The range of dresses number in a super washing machine is [0, 1e5].

## **Thoughts** ##
The first thing we need to do to solve this problem is to calculate the final number of dresses in each machine. This is very easy to get, which should be the sum of dresses in all machines divided by count of machines. If the sum of dresses cannot be divided by the count of machines, then there is no solution. Otherwise, we must a solution. 

The second thing we need do is to get the minimum number of moves to make all machines has the same number of dresses. I saw the solutions in other posts have a common lemma that **the minimum number of moves is the maximum number of necessary operations on every machine**. And they implement their solutions based on this lemma. So what is the minimum number of moves for each machine and how could it be the final result? To make it easier to illustrate, the following background is introduced.

#### Background ####
There are $n$ super washing machines and each machine originally has $x_i$ dresses inside where $i$ means the $i$th machine. The sum of dresses $\sum_{i=1}^{n} x_i$ can be divided by the count of washing machines $n$. To make it to easier to illustrate, I would just use $s$ as the sum of dresses and $r$ as the final number of dresses in each machine directly in the following proof. Additionaly, we assume $p_i$ is the minimum necessary steps for the $i$th machine to have $r$ dresses.

## **Solution 1** ##
The idea of this solution is to find out the minimum number of moves for each machine and pick up the maximum one from then as the result. 

Assume the $L_i$ is the sum of dresses from machine 1 to $i-1$, $R_i$ is the sum of dresses from machine $i+1$ to $n$.

If $L_i<(i-1) \cdot r$ and $R_i<(n-i) \cdot r$, then machine $i$ should export dresses to both sides. The necessary steps of machine $i$ is $p_i=abs(L_i-(i-1) \cdot r)+abs(R_i-(n-i) \cdot r)$.

If $L_i \\geq (i-1) \cdot r$ and $R_i \\geq (n-i) \cdot r$, then machine $i$ can get dresses from both side at the same time. The necessary steps of machine $i$ is $p_i=max(abs(L_i-(i-1) \cdot r),abs(R_i-(n-i) \cdot r))$.

If $L_i \\geq (i-1) \cdot r$ and $R_i < (n-i) \cdot r$, or $L_i < (i-1) \cdot r$ and $R_i \\geq (n-i) \cdot r$, then machine $i$ can get dresses from one side and export dresses to the other side. The necessary steps of machine $i$ is $p_i=max(abs(L_i-(i-1) \cdot r),abs(R_i-(n-i) \cdot r))$.

### Can we make n machines to have $r$ dresses in each of them using $max(p_i)$ steps? ###

When n = 1, assume we have a virtual machine next to the 1st machine to provide extra dresses to the 1st machine or collect redundant dresses from the 1st machine. It is easy to see from Fig. 1 that we can use $p_1=abs(r-x_1)$ to accomplish this task, which is the $max(p_i)$ when n is 1.

{% include custom/image.html img="/assets/img/post/super_washing_machine/1_to_virtual.png" title="Fig. 1" caption="Fig. 1" %}

Now, we assume we can make k machines each have $r$ dresses using $max(p_i)$ steps, where $1 \\leq i \\leq k$.

For the $k+1$th machine:  

#### Condition 1 ####

If $\sum_{i=1}^k{x_i} \\geq k \cdot r$ and $x_{k+1} \\geq r$, then we have  

$L_{k+1} = \sum_{i=1}^k{x_i} \\geq k \cdot r $, and  
$R_{k+1} = \sum_{i=k+2}^{n}{x_i} = n \cdot r - \sum_{i=1}^{k+1}{x_i} \\leq (n-k-1) \cdot r$  
$p_{k+1} = max(abs(L_{k+1}-k \cdot r), abs(R_{k+1}-(n-k-1) \cdot r))$  

The steps among $k$th, $k+1$th and virtual machine should be like Fig. 2. 

{% include custom/image.html img="/assets/img/post/super_washing_machine/k_to_virtual_1.png" title="Fig. 2" caption="Fig. 2" %}

If $L_{k+1}-k \cdot r \\geq R_{k+1}-(n-k-1) \cdot r$, then we can execute the $R_{k+1}-(n-k-1) \cdot r$ steps between $k+1$ and virtual machine at the same time we executing the $L_{k+1}-k \cdot r$ steps between $k$ and $k+1$ machine. So, we don't need any additional steps for this condition compared to the condition we need to make $k$ machines each have $r$ dresses. We can accomplish this task for $k+1$ machines within $max(p_i)$ steps, where $1 \\leq i \\leq k+1$.  

If $L_{k+1}-k \cdot r < R_{k+1}-(n-k-1) \cdot r$, we assume $\Delta = R_{k+1}-(n-k-1) \cdot r - L_{k+1}-k \cdot r$. And our strategy would be we do the first $L_{k+1}-k \cdot r$ steps from $k+1$ to virtual at the same time we do the $L_{k+1}-k \cdot r$ steps from $k$ to $k+1$. And we do the reset $\Delta$ steps at the same time when we do other steps for the first k machines. Then the final steps would be $max(max(p_i), L_(k+1)-k \cdot r + \Delta)$, where $1 \\leq i \\leq k$, whihc is which to $max(p_i)$, where $1 \\leq i \\leq k + 1$. So we still can accomplish this task for $k+1$ machines within $max(p_i)$ steps.  

#### Condition 2 ####

If $\sum_{i=1}^k{x_i} < k \cdot r$ and $x_{k+1} < r$, then we have

$L_{k+1} = \sum_{i=1}^k{x_i} < k \cdot r$, and  
$R_{k+1} = \sum_{i=k+2}^{n}{x_i} = n \cdot r - \sum_{i=1}^{k+1}{x_i} > (n-k-1) \cdot r$  
$p_{k+1} = max(abs(L_{k+1}-k \cdot r), abs(R_{k+1}-(n-k-1) \cdot r))$  

This condition is similar to condition 1, just skip the similar proof. We still can have $r$ dresses for each machine using $max(p_i)$ steps. 

#### Condition 3 ####

If $\sum_{i=1}^k{x_i} \\geq k \cdot r$, $x_{k+1} < r$ and $\sum_{i=1}^{k+1}{x_i} \\geq (k+1) \cdot r$, then we have

$L_{k+1} = \sum_{i=1}^k{x_i} \\geq k \cdot r $, and  
$R_{k+1} = \sum_{i=k+2}^{n}{x_i} = n \cdot r - \sum_{i=1}^{k+1}{x_i} \\leq (n-k-1) \cdot r$  
$p_{k+1} = max(abs(L_{k+1}-k \cdot r), abs(R_{k+1}-(n-k-1) \cdot r))$  

This condition is the same as the condition 1, just skip the similar proof. We still can have $r$ dresses for each machine using $max(p_i)$ steps. 

#### Condition 4 ####

If $\sum_{i=1}^k{x_i} \\geq k \cdot r$, $x_{k+1} < r$ and $\sum_{i=1}^{k+1}{x_i} < (k+1) \cdot r$, then we have  

$L_{k+1} = \sum_{i=1}^{x_i} \\geq k \cdot r$, and  
$R_{k+1} = \sum_{i=k+2}^{n}{x_i} = n \cdot r - \sum_(i=1)^{k+1}{x_i} \\geq (n-k-1) \cdot r$   
$p_{k+1} = max(abs(L_{k+1}-k \cdot r), abs(R_{k+1}-(n-k-1) \cdot r))$  

The steps among $k$th, $k+1$th and virtual machine should be like Fig. 3.  

{% include custom/image.html img="/assets/img/post/super_washing_machine/k_to_virtual_4.png" title="Fig. 3" caption="Fig. 3" %}

It is easy to see that we can execute the steps between $k+1$ machine and virtual machine at the same time we execute the steps for the first $k$ machines, so we can have $r$ dresses for each machine using $max(p_i)$ steps.

#### Condition 5 ####

If $\sum_{i=1}^k{x_i} < k \cdot r$, $x_{k+1} \\geq r$ and $\sum_{i=1}^{k+1}{x_i} \\geq (k+1) \cdot r$, then we have  

$L_{k+1} = \sum_{i=1}^{x_i} < k \cdot r$, and  
$R_{k+1} = \sum_{i=k+2}^{n}{x_i} = n \cdot r - \sum_(i=1)^{k+1}{x_i} \\leq (n-k-1) \cdot r$   
$p_{k+1} = abs(L_{k+1}-k \cdot r)+abs(R_{k+1}-(n-k-1) \cdot r)$ 

The steps among $k$th, $k+1$th and virtual machine should be like Fig. 4.

{% include custom/image.html img="/assets/img/post/super_washing_machine/k_to_virtual_5.png" title="Fig. 4" caption="Fig. 4" %}  

Since we cannot execute the steps between $k+1$ and virtual machine at the same time when we execute the steps between $k$ and $k+1$ machine, so we need $abs(L_{k+1}-k \cdot r)+abs(R_{k+1}-(n-k-1) \cdot r)$ in the worst case. But we still can accompish this task using $max(p_i)$ steps. 

#### Condition 6 ####

If $\sum_{i=1}^k{x_i} < k \cdot r$, $x_{k+1} \\geq r$ and $\sum_{i=1}^{k+1}{x_i} < (k+1) \cdot r$, then we have

$L_{k+1} = \sum_{i=1}^{x_i} < k \cdot r$, and  
$R_{k+1} = \sum_{i=k+2}^{n}{x_i} = n \cdot r - \sum_(i=1)^{k+1}{x_i} > (n-k-1) \cdot r$   
$p_{k+1} = max(abs(L_{k+1}-k \cdot r), abs(R_{k+1}-(n-k-1) \cdot r))$  

This condition is similar to condition 1, just skip the similar proof. We still can have $r$ dresses for each machine using $max(p_i)$ steps.

### Implementation ###

The following implementation is from leetcode [discussion][5]. 

    class Solution {
    public:
        int findMinMoves(vector<int>& machines) {
            int len = machines.size();
            vector<int> sum(len + 1, 0);
            for (int i = 0; i < len; ++i)
                sum[i + 1] = sum[i] + machines[i];

            if (sum[len] % len) return -1;

            int avg = sum[len] / len;
            int res = 0;
            for (int i = 0; i < len; ++i)
            {
                int l = i * avg - sum[i];
                int r = (len - i - 1) * avg - (sum[len] - sum[i] - machines[i]);

                if (l > 0 && r > 0)
                    res = std::max(res, std::abs(l) + std::abs(r));
                else
                    res = std::max(res, std::max(std::abs(l), std::abs(r)));
            }
            return res;
        }
    };


## **Solution 2** ##

The thoughts of this solution is very simliar to the solution 1, but the implementation of this solution is more short and easy. This implementation is from leetcode [discussion][4] too. 

    public class Solution {
        public int findMinMoves(int[] machines) {
            int total = 0; 
            for(int i: machines) total+=i;
            if(total%machines.length!=0) return -1;
            int avg = total/machines.length, cnt = 0, max = 0;
            for(int load: machines){
                cnt += load-avg; //load-avg is "gain/lose"
                max = Math.max(Math.max(max, Math.abs(cnt)), load-avg);
            }
            return max;
        }
    }

[1]: https://leetcode.com/problems/super-washing-machines/
[2]: https://mikecoder.github.io/oj-code/2017/05/08/SuperWashingMachines/
[3]: https://blog.csdn.net/tstsugeg/article/details/62427718
[4]: https://discuss.leetcode.com/topic/79938/super-short-easy-java-o-n-solution
[5]: https://discuss.leetcode.com/topic/79923/c-16ms-o-n-solution-with-trivial-proof
