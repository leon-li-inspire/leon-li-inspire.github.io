---
category :
tags : [learning, tutorial]
use_math : true
date: 2020-05-26
title: "Tiny Url System"
draft: false
---

TinyURL system design is a fairly classic interview question since it can test the abilities of one interviewee from many aspects. This post is to record the idea and tips what I learnt from websites to solve this problems.

## **Idea**
This TinyURL system needs to provide two basic functions, return a short url based on a given long url and return the corresponding long url based on previously return short url. It looks quite easy, the key point is just to create a bidirectional mapping between short url and long url.

How about using one hash algorithm directly on the long url, get a short string and create one map using the short string as key and the long string as value? This solution sounds doable and straight forward. But one thing need to be remembed that this solution doesn't prevent the hash collisoin for one hundred percent. It is possible two long urls may have the same hashed short url. I know the possibility is low if using modern hash algorithm, but seems like we have better choices.

Using an auto incremental number as the intermediary is quite useful in this case. We first transfer the long url to a unqiue number in our system, then transfer the unique number to a short url. Since the number is auto incremental in the system so that there is one to one relationship between long url and the unique number. Then, how do we transfer this unique number to a short url and ensure there is an one to one relationship between them too?

Remember how do we transfer one binary number to one decimal number? Yes, we can do the similar thing to transfer this unique decimal number to a 62 hex number, where each number can be represented by a character in `[a-zA-Z0-9]`.


## **How to make it scalable**
To make this TinyURL system distributed, we need to ensure the auto incremental number used to generate the short url is synchronous with the whole cluster. Of course, we can involve one lock sub system to help us accomplish this requirement. But are we misusing a good materials for minor purposes? Actually, we can just split this auto incremental number in multipe range pieces and assign them to different hosts. For example, host A is responsible for the number in `[0-9999]` and host B is responsible for the number in `[10000-19999]`. So we can distribute incoming requests to different hosts and don't need care about how to sync up their auto incremental numbers.


## **301 or 302**
Now we have the mapping between short url and long url, the remain problem is how do we redirect the client to the long url when a short url is provided. There are two http status code we can use, `301` and `302`. `301` means the request resource has been moved to the new url permenantly, meanwhile `302` means the request resource is just moved to another url temporarily. Since the mapping of short url and long url is dynamic and changable, so the `302` would be more suitable in this case.

## **Useful links**
[How do i create a url shortener?](https://stackoverflow.com/questions/742013/how-do-i-create-a-url-shortener)

[301 vs 302](https://stackoverflow.com/questions/1393280/http-redirect-301-permanent-vs-302-temporary)

[How to implement tiny url system?](https://www.zhihu.com/question/29270034)

[Related leetcode](https://leetcode.com/problems/encode-and-decode-tinyurl/)