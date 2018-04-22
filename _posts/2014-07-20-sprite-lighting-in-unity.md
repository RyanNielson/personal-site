---
layout: post
title: Sprite Lighting in Unity
description: "By default Unity doesn't support lighting on sprites. Luckily, this issue is easy to correct using a custom material."
tags: [game development, unity]
comments: true
share: true
---

With the release of Unity 4.3, built in support for 2D sprites was added. This makes it easy to import, animate, and render sprites. Unfortunetely, by default the Unity sprite renderer does not support lighting. This means that putting lights in your scene will not have any affect on the rendered image. Luckily, this behaviour is easy to correct on a per-sprite basis.

I've started with a blank project and imported the `2D/Sprites` folder from the [Standard Assets](https://www.assetstore.unity3d.com/en/#!/content/14474) in the asset store. I then placed a few instances of the `prototype_green_2x2` sprite and a point light in the middle of the scene, and you can see that there is no lighting applied to the sprites.

![Unlit Sprites](/public/images/2014-07-20/unlit_sprites.png "Unlit sprites")

To get lighting to working on sprites, it's just a matter of creating a material and changing its shader to `Sprites/Diffuse` in the shader dropdown in the inspector. You can now drag and drop the new material into the material section of the Sprite Renderer component of any sprite you want to be affected by lighting. Also, ensure that your light is in front of any sprites that should be affected by lighting. In the example below, the blocks on the right have the new lit material, while the blocks on the left do not.

![Lit Sprites](/public/images/2014-07-20/lit_sprites.png "Lit sprites")

I hope you found this short post helpful. If you have any further questions please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment on this post's page. 
