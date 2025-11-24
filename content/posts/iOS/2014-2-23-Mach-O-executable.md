---
category : iOS
tags : [iOS, learning, apple, tutorial]
date: 2014-02-23
title: "Mach O Executable"
draft: false
---

I found an [article][1] about the Mach-O executable run on iOS and OS device. From that article, I picked up some interestings thing about what the compile does and what's inside such an executable. What puzzled me most in this article is the section of 'lazy load' & 'unlazy load' symbol. Here is what I got from this article. 

## **Segments and sections in the executable**

First of all we should get to know the internal structure of an Mach-O executable file. Here we used a very easy sample code from the reference article above. 

Foo.h:
    
    #import <Foundation/Foundation.h>

    @interface Foo : NSObject

    - (void) run;

    @end

Foo.m:
    
    #import "Foo.h"

    @implementation Foo

    - (void) run
    {
        NSLog(@"%@", NSFullUserName());
    }

    @end

helloworld.m:

    #include <stdio.h>
    #import "Foo.h"

    int main (int argc, char *argv[])
    {
        @autoreleasepool {
            Foo *foo = [[Foo alloc] init];
            [foo run];
            return 0;
        }
    }

Compile the sample code directly using the Makefile:
    
    helloworld.out : helloworld.o Foo.o
        xcrun clang helloworld.o Foo.o -Wl, `xcrun --show-sdk-path`/System/Library/Frameworks/Foundation.framework/Foundation

    helloworld.o: helloworld.m Foo.h
        xcrun clang -c helloworld.m

    Foo.o : Foo.m
        xcrun clang -c Foo.m

    clean :
        rm helloworld.out

Then you will found the executable file 'a.out', know see what inside in it:

![Alt text][2]

There are four segments in this executable. The two segments we should get interested in is the '__Text' segment and the '__Data' segment. The '__Text' segment contains our code to be run, and the '__Data' segment is mapped read/write but non-executable like the list of the class used in the object file.

There a '__stubs' and '__stub_helper' sections in the '__Text' segment which are used for the dynamic linker(dyld), and '__nl_symbol_ptr' and '__la_symbol_ptr' section in the '__Data' segment which are non-lazy and lazy symbol pointers.

## **Lazy load and unlazy load**

Now, we see the compile process above step by step. 
First, we compile the 'Foo.m' file and 'helloworld.m' file regardless of the external symbols they use:

    xcrun clang -c helloworld.m
    xcrun clang -c Foo.m

Then we will get two object file 'helloworld.o' & 'Foo.o'. Use 'nm' tool to find how they deal with the undefined symbols. In the 'helloworld.o':

![Alt text][3]

The Class like `_OBJC_CLASS_$_Foo` which described as undefined is the external symbol which unimplemented by the helloworld object file. This kind of external symbol will be resolved by the linker later. 

The same thing happened to the Foo object file:

![Alt text][4]

Now we can see the symbols table in the final a.out and see how the linker resolved undefined symbols:

![Alt text][5]

We can see the original undefined symbol '_OBJC_CLASS_$_Foo' now has been loaded to the '__Data' segment. And other undefined symbols like '_NSLog' has the information about where to find their implemetion. 

In the example above, I thought the '_OBJC_CLASS_$_Foo' was lazy loaded in the 'helloworld.o' object file. After linking 'helloworld.o' and 'Foo.o', the '_OBJC_CLASS_$_FOO' became unlazy loaded because it had been resolved.

[1]: http://www.objc.io/issue-6/mach-o-executables.html
[2]: {{ BASE_PATH }}/assets/img/post/2014-2-23.png
[3]: {{ BASE_PATH }}/assets/img/post/2014-2-23(1).png
[4]: {{ BASE_PATH }}/assets/img/post/2014-2-23(2).png
[5]: {{ BASE_PATH }}/assets/img/post/2014-2-23(3).png