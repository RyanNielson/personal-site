---
layout: post
title: Fixing Gaps Between Sprites - Better 2D in Unity Part 2
description: "In Unity adjacent sprites often have gaps or spaces between them.Unity's built in sprite packer is a great way to solve this problem."
tags: [game development, unity]
comments: true
share: true
---

The [first post](/2015/08/the-pixel-grid-better-2d-in-unity-part-1/) in this series focused on the locking objects to the pixel grid. This time around I'll be focusing on issues related to side by side sprite rendering.

When working on 2D games in Unity using sprites, you may notice strange spaces or gaps between sprites. These are most notable when sprites are placed beside one another. This issue may not be noticeable immedately, but becomes most apparent at certain resolutions or when moving the camera as shown below.

![Sprites With Gaps](/assets/images/2015-10-08/sprite_seams.gif "Seams between sprites become obvious when moving the camera.")

This is quite easy to fix by using sprite packing software, which Unity 5 includes out of the box. The Unity sprite packer combines all sprites together into a single atlas, which can improve performance. Another side effect is that it duplicates the outer pixels of each sprite and adds them as padding in the packed atlas, solving the gap issue.

Enabling sprite packing is quite simple. First make sure the sprite packer is enabled by clicking on `Edit > Project Settings > Editor` in the toolbar and setting the sprite packer mode to "Always Enabled." Next, click on a sprite or sprite sheet in the project window, which will open the import settings in the inspector, and add a packing tag. In my case I just used the tag "Tiles", but you can use whatever you want. Sprites with identical packing tags will be added to the same atlas.

![Sprite Inspector](/assets/images/2015-10-08/sprite_inspector.png "We need to set a packing tag to use the sprite packer.")

You can view the atlas that Unity has created by clicking on `Window > Sprite Packer` in the toolbar. If there's nothing there, just click the pack button in the upper-left corner. Unity doesn't create the atlas until you manually click pack, or you run the game. Unity will regenerate atlases whenever play is pressed, or the game is built.

With an atlas created by setting a packing tag, the gaps between sprites are now gone as shown below. The gaps may still be shown in the game window when editing, but they will disappear when in playing the game. It seems that Unity only uses atlases in play mode.

![Sprites With No Gaps](/assets/images/2015-10-08/sprite_no_seams.gif "The sprite packer fixes the gap issue.")

I've found that the Unity sprite packer works perfectly fine for all my needs. If you have any further questions please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment below. 
