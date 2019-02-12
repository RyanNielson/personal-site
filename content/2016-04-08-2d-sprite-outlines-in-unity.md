---
layout: post
title: 2D Sprite Outlines in Unity
description: "This post will demonstrate how to add outlines to sprites in Unity using a custom shader and component."
tags: [game development, unity]
comments: true
share: true
---

#### Note:
Unity 5.6's release made some changes to the default sprite shader which make parts of the shader in the following post invalid. At the bottom of this post you'll find an updated version of the demo project that works in Unity 5.6.

Unity provides a component to outline UI objects, but it doesn't work on world space sprites. This post will demonstrate a simple way to add outlines to sprites using an extended version of the default sprite shader along with a simple component. This could be used to highlight sprites on mouse over, highlight items in the environment, or just to make sprites stand out from their surroundings.

To begin, create a new shader in your project called `Sprite-Outline`. This shader provides all the functionality of the default sprite shader, with the additions to allow sprite outlines.

```
Shader "Sprites/Outline"
{
    Properties
    {
        [PerRendererData] _MainTex ("Sprite Texture", 2D) = "white" {}
        _Color ("Tint", Color) = (1,1,1,1)
        [MaterialToggle] PixelSnap ("Pixel snap", Float) = 0

        // Add values to determine if outlining is enabled and outline color.
        [PerRendererData] _Outline ("Outline", Float) = 0
        [PerRendererData] _OutlineColor("Outline Color", Color) = (1,1,1,1)
    }

    SubShader
    {
        Tags
        {
            "Queue"="Transparent"
            "IgnoreProjector"="True"
            "RenderType"="Transparent"
            "PreviewType"="Plane"
            "CanUseSpriteAtlas"="True"
        }

        Cull Off
        Lighting Off
        ZWrite Off
        Blend One OneMinusSrcAlpha

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile _ PIXELSNAP_ON
            #pragma shader_feature ETC1_EXTERNAL_ALPHA
            #include "UnityCG.cginc"

            struct appdata_t
            {
                float4 vertex   : POSITION;
                float4 color    : COLOR;
                float2 texcoord : TEXCOORD0;
            };

            struct v2f
            {
                float4 vertex   : SV_POSITION;
                fixed4 color    : COLOR;
                float2 texcoord  : TEXCOORD0;
            };

            fixed4 _Color;
            float _Outline;
            fixed4 _OutlineColor;

            v2f vert(appdata_t IN)
            {
                v2f OUT;
                OUT.vertex = mul(UNITY_MATRIX_MVP, IN.vertex);
                OUT.texcoord = IN.texcoord;
                OUT.color = IN.color * _Color;
                #ifdef PIXELSNAP_ON
                OUT.vertex = UnityPixelSnap (OUT.vertex);
                #endif

                return OUT;
            }

            sampler2D _MainTex;
            sampler2D _AlphaTex;
            float4 _MainTex_TexelSize;

            fixed4 SampleSpriteTexture (float2 uv)
            {
                fixed4 color = tex2D (_MainTex, uv);

                #if ETC1_EXTERNAL_ALPHA
                // get the color from an external texture (usecase: Alpha support for ETC1 on android)
                color.a = tex2D (_AlphaTex, uv).r;
                #endif //ETC1_EXTERNAL_ALPHA

                return color;
            }

            fixed4 frag(v2f IN) : SV_Target
            {
                fixed4 c = SampleSpriteTexture (IN.texcoord) * IN.color;

                // If outline is enabled and there is a pixel, try to draw an outline.
                if (_Outline > 0 && c.a != 0) {
                    // Get the neighbouring four pixels.
                    fixed4 pixelUp = tex2D(_MainTex, IN.texcoord + fixed2(0, _MainTex_TexelSize.y));
                    fixed4 pixelDown = tex2D(_MainTex, IN.texcoord - fixed2(0, _MainTex_TexelSize.y));
                    fixed4 pixelRight = tex2D(_MainTex, IN.texcoord + fixed2(_MainTex_TexelSize.x, 0));
                    fixed4 pixelLeft = tex2D(_MainTex, IN.texcoord - fixed2(_MainTex_TexelSize.x, 0));

                    // If one of the neighbouring pixels is invisible, we render an outline.
                    if (pixelUp.a * pixelDown.a * pixelRight.a * pixelLeft.a == 0) {
                        c.rgba = fixed4(1, 1, 1, 1) * _OutlineColor;
                    }
                }

                c.rgb *= c.a;

                return c;
            }
            ENDCG
        }
    }
}
```

Now create a new material called `SpriteOutline` and assign the newly created shader to it in the inspector.

![Sprite Outline Material](/public/images/2016-04-08/material.png)

Next create a new C# script and name it `SpriteOutline`. This component is going to handle updating our material in the editor and at runtime to toggle the outline off or on and also change the color. This component can also be targetted in an animation to enable or disable outlines for specific animation frames or to change the outline color.

```csharp
using UnityEngine;

[ExecuteInEditMode]
public class SpriteOutline : MonoBehaviour {
    public Color color = Color.white;

    private SpriteRenderer spriteRenderer;

    void OnEnable() {
        spriteRenderer = GetComponent<SpriteRenderer>();

        UpdateOutline(true);
    }

    void OnDisable() {
        UpdateOutline(false);
    }

    void Update() {
        UpdateOutline(true);
    }

    void UpdateOutline(bool outline) {
        MaterialPropertyBlock mpb = new MaterialPropertyBlock();
        spriteRenderer.GetPropertyBlock(mpb);
        mpb.SetFloat("_Outline", outline ? 1f : 0);
        mpb.SetColor("_OutlineColor", color);
        spriteRenderer.SetPropertyBlock(mpb);
    }
}
```

Now that the hard work is done, add a few sprites to your scene. Change the material field of the `SpriteRenderer` component to the `SpriteOutline` material created above. You'll also want to add the `SpriteOutline` component to this game object to show a white outline by default. To hide the outline simply disable or remove the component.

![Completed Sprite](/public/images/2016-04-08/gameobject.png)

With all that completed, you should now have a sprite with a white outline. In the inspector you can change the color to anything you'd like, independently from the `SpriteRenderer` color. The custom shader also maintains all existing functionality of the default sprite shader.

![Completed Sprite](/public/images/2016-04-08/outlined.gif)

Please [download the demo project](/public/downloads/sprite_outlines.zip) and play around with it to get a better idea of how this technique looks and works. It contains a single scene with three examples of outlined sprites, one of which is animated.

Shaders can be complicated, but they are very powerful and make it quite easy to implement graphical features, even in 2D. If you have any further questions please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment below.

### Update (June 2, 2016)

Some people have been asking about how to change the thickness of the sprite outlines. Please [download this new demo project](/public/downloads/sprite_outlines_variable.zip) with the changes to add this functionality. Changes were made to both the shader and component. Just adjust the outline size slider on the sprite outline component to change outline size. There is a limited outline size of 16 to prevent issues with shader for loop unrolling. It hasn't been tested throughly, so your results may vary, but it's probably a good place to start.

### Update (April 7, 2017)
Unity 5.6 has been released, and along with that came some changes to the default sprite shader. Unfortunetely this seems to be causing issues with parts of the method used above. Please [download this new demo project](/public/downloads/sprite_outlines_56.zip) which changes the sprite outline shader to incorporate the 5.6 shader changes.
