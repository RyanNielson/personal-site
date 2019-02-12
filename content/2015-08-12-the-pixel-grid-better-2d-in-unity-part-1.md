---
layout: post
title: Snapping Objects to the Pixel Grid - Better 2D in Unity Part 1
description: "Unity is a great engine, but using it for 2D games isn't always ideal. This post will demonstrate how to lock objects and sprites to the pixel grid to solve some rendering issues."
tags: [game development, unity]
comments: true
share: true
---

Unity is a fantastic engine, but its history as a 3D engine sometimes shows when using it to develop 2D games. This is especially apparent when games use a pixel art style. This series will demonstrate some common problems, and provide solutions to make developing 2D games in Unity easier.

This first post in the series will focus on the pixel grid and how to lock items to it. Unity uses floating point positions for objects, unlike many 2D specific engines which use pixel locations. This means that sub-pixel movement is a common problem in Unity games and can lead to rendering artifacts or inconsistent visuals. Sub-pixel movement refers to objects moving between pixels causing pixels to not align properly. Though this may not always be an issue, depending on your game it can be an eyesore. The image below is an example of sub-pixel movement leading to pixels on the screen not lining up properly.

The first image is an example of sub-pixel character movement where the player sprite pixels aren't lined up properly with other pixels in the scene. The second is a gif that shows how sub-pixel camera movement can lead to strange rendering artifacts where pixels have different widths. It's subtle in the gif, but if you focus on the ground sprite pixels you can see them changing width as the camera moves.

![Sub-pixel Movement](/assets/images/2015-08-12/subpixel.png "The bottom of the character is an example of sub-pixel movement.")

![Sub-pixel Camera](/assets/images/2015-08-12/subpixelcamera.gif "And example of sub-pixel camera movement.")

I've created a simple script that you can add to child objects to lock their positions to a grid. For example, you'd have a parent GameObject which handles the player's movement, and a child GameObject that contains a SpriteRenderer. This ensure that the player can move in a sub-pixel way ensuring smooth movement, while still locking the sprite to the pixel grid.

```csharp
using UnityEngine;

public class SnapToPixelGrid : MonoBehaviour 
{
    [SerializeField]
    private int pixelsPerUnit = 16;

    private Transform parent;

    private void Start()
    {
        parent = transform.parent;
    }

    /// <summary>
    /// Snap the object to the pixel grid determined by the given pixelsPerUnit.
    /// Using the parent's world position, this moves to the nearest pixel grid location by 
    /// offseting this GameObject by the difference between the parent position and pixel grid.
    /// </summary>
    private void LateUpdate() 
    {
        Vector3 newLocalPosition = Vector3.zero;

        newLocalPosition.x = (Mathf.Round(parent.position.x * pixelsPerUnit) / pixelsPerUnit) - parent.position.x;
        newLocalPosition.y = (Mathf.Round(parent.position.y * pixelsPerUnit) / pixelsPerUnit) - parent.position.y;

        transform.localPosition = newLocalPosition;
    }
}

```

`LateUpdate()` runs every frame after all `Update()` calls are completed, and offsets the GameObject so it lies on the pixel grid determined by `pixelsPerGrid` and it's parent's location.

Download the [Windows demo](/assets/downloads/pixelgrid_windows.zip) or [Mac demo](/assets/downloads/pixelgrid_mac.zip) to see this in action. You can also download the [example project](/assets/downloads/pixelgrid.zip) to experiment with the script.

Hopefully this approach is enough to get you started and alleviate any 2D pixel art rendering issues. If you have any further questions please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment below. 
