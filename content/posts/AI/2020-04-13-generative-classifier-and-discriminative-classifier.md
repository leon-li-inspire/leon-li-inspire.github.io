---
category :
tags : [learning, tutorial]
use_math : true
date: 2020-04-13
title: "Generative Classifier And Discriminative Classifier"
draft: false
---

Recently I was learning the **naive bayes classifier** and learnt there are two categories of classifiers to estimate the distribution $P(Y\|X)$ based on the given data, **Generative Classifier** and **Discriminative Classifier**.

I am puzzled on the differences between these two classifiers at the beginning, since their goals are same and their equations are similar. Besides, I also found there are two estimation methods, namely **MAP (Maximum  A  Posteriori)** and **MLE(Maximum Likelihood Estimation)** show up quite often when using these two classifiers. What's the relationships between them?

So, I will try to sum up some of my findings during my exploring the correct path to understand these two classifiers and two estimation methods in this post.

&nbsp;

## **Overview**

There is a dataset $D=\\{(\mathbf{x_1},y_1),...,(\mathbf{x_n},y_n)\\}$ drawn from distribution $P(X,Y)$, and our purpose is to estimate $P(Y\|X)$ so that we can predicate the label $y$ from any features $\mathbf{x}$.

Both **Generative Classifier** and **Discriminative Classifier** are used to learn the **conditional probability** $P(Y\|X)$. But their way to learn that is different. A **Generative Classifier** first learns the **joint probability** $P(X, Y)$ and uses the **Bayes Theorem** to calculate the **conditional probability** $P(Y\|X)$ while A **Discriminative Classifier** learns the $P(Y\|X)$ directly.

And **MLE** and **MAP** are the method used to learn the **joint probability** or **conditional probability** we mentioned in that two classifiers.

&nbsp;

## **Generative Classifier**

In **Generative Classifier**, the **joint probability** $P(X, Y)$ is calculated by
\begin{equation}
P(X, Y) = \dfrac{P(Y)P(X\|Y)}{\sum_{Y'}{P(Y')P(X|Y')}}
\end{equation}

So we need to learn $P(Y)$ and $P(X\|Y)$ first, the followings are the steps

1. Assume some functional form for $P(Y)$ and $P(X\|Y)$

    * Assume $P(Y) \approx P(Y \| \theta) = f(Y, \theta)$. $\theta$ represents the parameters or hypothesis we assumed for the real distributoin $P(X,Y)$.
    * There is a debat for the explanation of $\theta$ here between frequentist and Bayesian inference. Bayesian approach believes that $\theta$ is a random variable which can have its own distribution $P(\theta)$, meanwhile frequentist approach thinks $\theta$ is a inner unknown variable which associated with the distribution $P(X,Y)$.
    * $f$ is a function assumed by us.
    * The same to $P(X\|Y)$, assume $P(X\|Y) \approx P(X\|Y, \theta) = g(X, Y, \theta)$.

2. Estimate parameters $\theta$ of $P(Y \| \theta)$ and $P(X\|Y, \theta)$ based on the dataset $D$.
    * We can use either **MLE** or **MAP** to learn
    * If use **MLE**, we are trying to find the $\theta = argmax_{\theta}{P(D\|\theta)}$
    * If use **MAP**, we are trying to find the $\theta = argmax_{\theta}{P(\theta \| D)} = argmax_{\theta}{P(D\|\theta)P(\theta)}$
    * If use **MAP**, we will be Bayesian since we believe there is a distribution $P(\theta)$ for $\theta$.

3. Use Bayes rule to calculate $P(X\|Y)$

&nbsp;

## **Discriminative Classifier**

In **Discriminative Classifier**, the **conditional probability** $P(Y\|X)$ is learnt directly, the followings are the steps

1. Assume some functional form for $P(Y\|X)$
    * Assume $P(Y\|X) \approx P((Y\|X, \theta) = f(X, Y, \theta)$.

2. Estimate parameters $\theta$ of $P(Y\|X, \theta)$ based on the dataset $D$
    * We can use either **MLE** or **MAP** to learn too, the detail method is same as the methods in **Generative Classifier**.

&nbsp;

## **Reference**

[https://machinelearningmastery.com/logistic-regression-with-maximum-likelihood-estimation/](https://machinelearningmastery.com/logistic-regression-with-maximum-likelihood-estimation/)
[http://www.cs.cornell.edu/courses/cs4780/2018fa/lectures/lecturenote04.html](http://www.cs.cornell.edu/courses/cs4780/2018fa/lectures/lecturenote04.html)
[https://medium.com/@mlengineer/generative-and-discriminative-models-af5637a66a3](https://medium.com/@mlengineer/generative-and-discriminative-models-af5637a66a3)
