---
layout: post
title: 2d Collisions in Unity
description: ""
tags: [game development, unity]
comments: true
share: true
---

In Unity 4.3, 2D physics were added to ease the creation of two-dimensional games. Although the 2D physics behave very similarily their 3D counterpart, there are some important differences regarding the messages that are sent to game objects when collisions occur. 

A [matrix](http://docs.unity3d.com/Documentation/Components/class-BoxCollider.html) is provided by Unity that lists what messages are sent to an object when collisions occur, but this is only for 3D physics. Though the 2D physics messages are similar, there are some important differences. The matrices below assumes you're using the 2D variants of colliders and rigidbodies. 

##### Collision detection occurs and Collision2D messages are sent
|  | Static | Rigidbody | Kinematic Rigidbody  | Static Trigger | Rigidbody Trigger | Kinematic Rigidbody Trigger  |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| **Static** |  | X | | | | |
| **Rigidbody** | X | X | X | | | |
| **Kinematic Rigidbody** | | X | | | | |
| **Static Trigger** | | | | | | |
| **Rigidbody Trigger** | | | | | | |
| **Kinematic Rigidbody Trigger** | | | | | | |

##### Trigger2D messages are sent upon collision
|  | Static | Rigidbody | Kinematic Rigidbody  | Static Trigger | Rigidbody Trigger | Kinematic Rigidbody Trigger  |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| **Static** | | | | | X | |
| **Rigidbody** | | | | X | X | X |
| **Kinematic Rigidbody** | | | | | X | |
| **Static Trigger** | | X | | | X | |
| **Rigidbody Trigger** | X | X | X | X | X | X |
| **Kinematic Rigidbody Trigger** | | X | | | X | |


These tables were created after some quick tests when developing my game. If any information is incorrect please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment on this post.

