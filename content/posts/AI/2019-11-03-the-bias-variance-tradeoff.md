---
category : 
tags : [learning, tutorial]
use_math : true
date: 2019-11-03
title: "The Bias Variance Tradeoff"
draft: false
---

The bais and variance tradeoff is an essential idea of machine learning to understand the generalization error of the classifier. By understanding the components of the generlization error, we can improve the classifier more intuitively instead of changing parameters somehow randomly. 

## **Background**
There is a dataset $D=\\{(\mathbf{x_1},y_1),...,(\mathbf{x_n},y_n)\\}$, drawn from one distribution $P(X,Y)$, where vector $\mathbf{x}$ could be some features of a house, such as number of bedrooms, square footage, and $y$ could be the price of the house. In real world, there may be some scenarios that two houses with the same features have different prices. To define this scenario, the expected label is used:

**Expected Label**
\begin{equation}
\bar{y} = E_{y|\mathbf{x}}[Y] = \int_{y}{yPr\(y|\mathbf{x}\)}
\end{equation}

the expected value $\bar{y}$ is calculated based on the different value of $y$ and distributions given a feature vector $\mathbf{x}$.

Now assume there is a machine learning algorithm $\mathbf{A}$, and $h_{D}$ is the classifier trained by algorithm $\mathbf{A}$ using a traning set $D$ as $h_{D}=\mathbf{A}\(D\)$.
For a given classifier $h_{D}$, we can calculates its generalization error (as measured in square loss) for distribution $P(X, Y)$ as follows:

**Expected Test Error**
\begin{equation}
E_{\(\mathbf{x},y\)\sim P(X,Y)}\[\(h_D\(\mathbf{x}\)-y\)^2\]=\int_{y}{\int_{\mathbf{x}}{\(h_D{\(\mathbf{x}\)}-y\)^2}Pr(\mathbf{x}, y)\partial{\mathbf{x}}\partial{y}}
\end{equation}

Previously, $h_{D}$ is the result based on one specific training data $D$, which is just a random variable drawn from $P^{n}$. Furthermore to analyze the generalization error of a machine learning algorithm, we need to have its expected classifier. We can compute the expecteed classifier as follows: 

**Expected Classifier**
\begin{equation}
\bar{h}=E_{D\sim P^{n}}[h_D]=\int_{D}{h_DPr(D)\partial{D}}
\end{equation}

where $Pr(D)$ is the probability of drawing $D$ from $P^{n}$.

Then the expected test error of machine learning algorithm $A$ can be computed as follows:

**Expected Test Error**
\begin{equation}
E_{\(\mathbf{x},y\)\sim P(X,Y)}\[\(\bar{h}\(\mathbf{x}\)-y\)^2\]=\int_{y}{\int_{\mathbf{x}}{\(\bar{h}{\(\mathbf{x}\)}-y\)^2}Pr(\mathbf{x}, y)\partial{\mathbf{x}}\partial{y}}  \\
\end{equation}
\begin{equation}
E_{D\sim P^{n}}E_{\(\mathbf{x},y\)\sim P(X,Y)}\[\(h_D\(\mathbf{x}\)-y\)^2\]=\int_{D}\int_{y}{\int_{\mathbf{x}}{\(h_D{\(\mathbf{x}\)}-y\)^2}Pr(\mathbf{x}, y)Pr(D)\partial{\mathbf{x}}\partial{y}\partial{D}}
\end{equation}

## **Decomposition of Expected Test Error**
$$
\begin{align}
E_{D,\mathbf{x},y}[(h_D(\mathbf{x})-y)^2] &= E_{D,\mathbf{x},y}[[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))+(\bar{h}(\mathbf{x})-y)]^2] \\
 &= E_{D,\mathbf{x},y}[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))^2] + E_{D,\mathbf{x},y}[((\bar{h}(\mathbf{x})-y)^2] + 2E_{D,\mathbf{x},y}[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))(\bar{h}(\mathbf{x})-y)] \\
 &= \underbrace{E_{D,\mathbf{x}}[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))^2]}_{\text{variance}} + E_{\mathbf{x},y}[((\bar{h}(\mathbf{x})-y)^2] + 2E_{D,\mathbf{x},y}[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))(\bar{h}(\mathbf{x})-y)]
\end{align}
$$

The first term is equal to the expecteed variance if we use different classifier to predict the result.

The third term of the above equation is equal to 0 since 

$$
\begin{align}
E_{D,\mathbf{x},y}[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))(\bar{h}(\mathbf{x})-y)] &= E_{\mathbf{x},y}[E_D[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))(\bar{h}(\mathbf{x})-y)]] \\
 &= E_{\mathbf{x},y}[(\bar{h}(\mathbf{x})-\bar{h}(\mathbf{x}))(\bar{h}(\mathbf{x})-y)] \\
 &= 0
\end{align}
$$

To decomposite the second term, we can get

$$
\begin{align}
E_{\mathbf{x},y}[((\bar{h}(\mathbf{x})-y)^2] &= E_{\mathbf{x},y}[[(\bar{h}(\mathbf{x})-\bar{y}(\mathbf{x}))+(\bar{y}(\mathbf{x})-y)]^2] \\
 &= E_{\mathbf{x},y}[(\bar{h}(\mathbf{x})-\bar{y}(\mathbf{x}))^2] + E_{\mathbf{x},y}[(\bar{y}(\mathbf{x})-y)^2] + 2E_{\mathbf{x},y}[(\bar{h}(\mathbf{x})-\bar{y}(\mathbf{x}))(\bar{y}(\mathbf{x})-y)] \\
 &= E_{\mathbf{x},y}[(\bar{h}(\mathbf{x})-\bar{y}(\mathbf{x}))^2] + E_{\mathbf{x},y}[(\bar{y}(\mathbf{x})-y)^2]
\end{align}
$$

So the Expected Test Error can be represented by 

$$
\begin{align}
E_{D,\mathbf{x},y}[(h_D(\mathbf{x})-y)^2] = \underbrace{E_{D,\mathbf{x}}[(h_D(\mathbf{x})-\bar{h}(\mathbf{x}))^2]}_{\text{variance}} 
 + \underbrace{E_{\mathbf{x},y}[(\bar{h}(\mathbf{x})-\bar{y}(\mathbf{x}))^2]}_{\text{bias}}
 + \underbrace{E_{\mathbf{x},y}[(\bar{y}(\mathbf{x})-y)^2]}_{\text{noise}}
\end{align}
$$

## **Reference**
[http://www.cs.cornell.edu/courses/cs4780/2018fa/lectures/lecturenote12.html](http://www.cs.cornell.edu/courses/cs4780/2018fa/lectures/lecturenote12.html)
[http://scott.fortmann-roe.com/docs/BiasVariance.html](http://scott.fortmann-roe.com/docs/BiasVariance.html)
[https://liam.page/2017/03/25/bias-variance-tradeoff/](https://liam.page/2017/03/25/bias-variance-tradeoff/)