---
category : iOS
tags : [iOS, learning, apple, tutorial]
date: 2013-10-05
title: "Strong Autoreleasing"
draft: false
---


## **Pass a pointer reference as argument**


By default, we pass a pointer reference using Objective-C like this:


    - (void) testReference:(NSObject **) object


When compiling, the compiler will add the default key word \_\_autoreleasing for us to inform how to deal with this pointer reference like this:


    - (void) testReference:(NSObject * __autoreleasing *) object


So we can also add key word \_\_strong explictly by ourself:


    - (void) testReference:(NSObject * __strong *) object


## **What's the difference?**


    NSObject *object = [[NSObject alloc] init];
    [self testReference:&object];


When using \_\_autoreleasing to decorate the pointer reference of `object`, the code above will be transformed into:


    NSObject *object = [[NSobject alloc] init];
    NSObject * __autoreleasing tmp = object;
    [self testReference:&object];
    object = tmp;


Obviously, \_\_autoreleasing will copy a referenc of the origin pointer reference than pass the copy one to function. When the function finished, the new value of the copy reference will be copied back to the origin one.
But \_\_strong will pass the origin reference to the function.

###Why use \_\_autoreleasing as default choice?


It is because if using \_\_strong as default one, some references of weak pointer may cause logic problem when using a \_\_strong pointer to copy their value.


## **Links**


[What are the advantages of declaring method arguments autoreleasing][1]

[Handling pointer to pointer ownership issues in arc][2]

 [1]: http://stackoverflow.com/questions/14554121/what-are-the-advantages-of-declaring-method-arguments-autoreleasing
 [2]: http://stackoverflow.com/questions/8814718/handling-pointer-to-pointer-ownership-issues-in-arc

