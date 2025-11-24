---
category : iOS
tags : [iOS, learning, apple, tutorial]
date: 2013-10-26
title: "Use Sharepoint On Ios Platform"
draft: false
---

Request is to commuicate with SharePoint Server using iOS, the version of SharePoint is SharePoint 2013

## **SharePoint**

First, we need a SharePoint Server, the host of this server is `http://www.mySharePoint.com`, which is the root site of the whole SharePoint. You can add your own subsite under the root site, like `http://www.mySharePoint.com/mySubsite`.

After getting the url of the Server, then invoke the new SharePoint 2013 [REST api][1] to communicate with the Server.

## **Authentication**

The SharePoint Server I visiting uses Form-Based Authentication, users need to input his username and password when visiting it.
In iOS, you can use `Credential` to authenticate user. First, use `NSURLConnection` to request the Server

    - (void) sendAuthenticateRequest
    {
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:self.sharePointURL]];
        [request setHTTPShouldHandleCookies:YES];
        [request setHTTPMethod:@"POST"];
    
        NSURLConnection *connection = [[NSURLConnection alloc] initWithRequest:request delegate:self startImmediately:YES];
        if (connection == nil)
        {
            dispatch_semaphore_signal(self.sema);
            self.requestCount --;
        }
    }
    
then you will receive an authentication challenge, which is invoked in `NSURLConnectionDelegate`

    - (void) connection:(NSURLConnection *) connection didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *) challenge
    {
        NSLog(@"Did receive authenticating challenge.");
        if (self.challengeCount == 0)
        {
            self.challengeCount ++;
            NSURLCredential *credential = [NSURLCredential credentialWithUser:self.username password:self.password persistence:NSURLCredentialPersistenceForSession];
            [[challenge sender] useCredential:credential forAuthenticationChallenge:challenge];
        }
        else
        {
            NSLog(@"Failed to authenticate");
            [[challenge sender] cancelAuthenticationChallenge:challenge];
            self.challengeCount = 0;
        }
    

}

    - (BOOL) connectionShouldUseCredentialStorage:(NSURLConnection *) connection
    {
        return NO;
    }
    
Then input your username and password, the client will receive a response if the information is correct

    - (void) connection:(NSURLConnection *) connection didReceiveResponse:(NSURLResponse *) response
    {
        self.requestCount --;
        self.challengeCount = 0;
        NSLog(@"Login succeed.");
        self.active = YES;
    
        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
        NSDictionary *fields = [httpResponse allHeaderFields];
        self.authenticateCookies = [NSArray arrayWithObject:[NSDictionary dictionaryWithObject:[fields objectForKey:@"request-id"] forKey:@"request-id"]];
    }
    

After receive response, keep the key-value in the header of the response in your own cookie, which will be used when you requesting the server later. Take a look at [Build mobile apps for other platforms using SharePoint 2013][2] for detail information

## **Get the directory of SharePoint**

Take a example of getting directory of SharePoint here. Using REST api `http://http://www.mySharePoint.com/mySubsite/_api/web/getFolderByServerRelativeUrl('Documents')/files` and `http://http://www.mySharePoint.com/mySubsite/_api/web/getFolderByServerRelativeUrl('Documents')/folders`

The request will return the metadata of all folders and files in the directory you wanted to get like this

     {"d":{
      "__metadata":{,
        "id":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared Documents/folderName/fileName.docx')",
        "uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')",
        "type":"SP.File"
      },
      "Author":{"__deferred":{"uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')/Author"}},
      "CheckedOutByUser":{"__deferred":{"uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')/CheckedOutByUser"}},
      "ListItemAllFields":{"__deferred":{"uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')/ListItemAllFields"}},
      "LockedByUser":{"__deferred":{"uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')/LockedByUser"}},
      "ModifiedBy":{"__deferred":{"uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')/ModifiedBy"}},
      "Versions":{"__deferred":{"uri":"http://<site url>/_api/Web/GetFileByServerRelativeUrl('/Shared%20Documents/folderName/fileName.docx')/Versions"}},
      "CheckInComment":"Revisions to the file.",
      "CheckOutType":2,
      "ContentTag":"{2FBB0C3C-4059-41A2-A5CF-3E076EA0A94C},2,3",
      "CustomizedPageStatus":0,
      "ETag":"\"{2FBB0C3C-4059-41A2-A5CF-3E076EA0A94C},2\"",
      "Exists":true,
      "Length":"20609",
      "Level":1,
      "MajorVersion":1,
      "MinorVersion":0,
      "Name":"fileName.docx",
      "ServerRelativeUrl":"/Shared Documents/folderName/fileName.docx",
      "TimeCreated":"2013-05-16T21:01:23Z",
      "TimeLastModified":"2013-05-18T04:57:32Z",
      "Title":"",
      "UIVersion":512,
      "UIVersionLabel":"1.0"
    }}

## **Tip**

When requesting SharePoint, you may get Internal 500 error, this is a problem of the Server, so you can login to the host of SharePoint, and use localhost to invoke the REST api first, everything will be OK then. But I don't know the reason of this problem yet.

 [1]: http://msdn.microsoft.com/en-us/library/office/apps/jj860569.aspx
 [2]: http://msdn.microsoft.com/en-us/library/jj870858.aspx