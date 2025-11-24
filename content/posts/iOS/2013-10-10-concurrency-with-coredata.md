---
category : iOS
tags : [iOS, learning, apple, tutorial]
date: 2013-10-10
title: "Concurrency With Coredata"
draft: false
---

I get a crash log `'Error - null [reason] - Statement is still active'` in today project, then I found it is about the problem caused when using the same NSManagedObject in two separate thread. 

## The sample code

    @interface CustomViewController : UIViewController
    @property (nonatomic, assign) NSManagedObject *anObject;
    

`CustomViewController` has a member variable kind of NSManagedObject `anObject`, then assign a value to `anObject` in `viewDidLoad`

    - (void) viewDidLoad
    {
      ...
      self.anObject = ...;
      ...
    }
    

`anObject` is used in another method `customMethod` and made some changes in an non-main thread

    - (void) customMethod
    {
      ...
      dispatch_async(dispatch_get_global_queue(dispatch_queue_pority, 0),
      ^{
         ....
         [self.anObject changeValue];
         ....
       }
      );
      ...
    }
    

Then the program will sometime crash, why?

## Don't use the same NSManagedObject across two different threads

The most problem in code above is that i use a NSManagedObject from the main thread in another thread, [Concurrency with Core Data][1] says it is not proper to use the same NSManagedObject across two different threads. If you want to do like this way, you should take the promblems of synchronice into consideration by yourself. So, if you want to use the NSManagedObject from the main thread in another thread, you can use the `ObjectID` to refetch the NSManagedObject from the thread, and it will be OK.

## Links

[Core data statement is still active][2]

 [1]: https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/CoreData/Articles/cdConcurrency.html#//apple_ref/doc/uid/TP40003385-SW1
 [2]: http://stackoverflow.com/questions/7883746/core-data-statement-is-still-active

