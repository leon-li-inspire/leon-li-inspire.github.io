---
category : 
tags : [learning, tutorial]
use_math : true
date: 2019-09-17
title: "User Management Roadmap"
draft: false
---

Recently, our team was trying to build a new service and my task was to design the new user management component. During the investigation, I learned many previously unknown concepts, which I didn't have a chane to dive deep on how they really work behind the scene. I would try to sum up some necessary concepts need to understand before designing an user management component.

## **Authentication** vs. **Authorization**
The first but not the last thing, we need to understand the difference between authentication and authorization. They are both two necessary functions one user management component needs to provide. Authentication means our system needs to have the ability to figure out who is the caller. Authorization means our system need to figure out whether the caller has the permission to execute his expected operation on our service. 

Authentication is the process of an entity (the Principal) proving its identity to another entity (the System).

## **Authentication vs. Federation**
https://medium.com/@robert.broeckelmann/authentication-vs-federation-vs-sso-9586b06b1380
LDAP

we called the things happened after Authentication to be Authorization 

## **Reference**
https://medium.com/@robert.broeckelmann/authentication-vs-federation-vs-sso-9586b06b1380
https://w.amazon.com/bin/view/CorpInfra/Systems/CIAHome/CIADev/Federate/Onboarding/Concepts/
