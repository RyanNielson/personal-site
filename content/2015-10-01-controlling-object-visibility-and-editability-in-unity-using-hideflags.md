---
layout: post
title: Controlling Object Visibility and Editability in Unity Using HideFlags
description: "HideFlags allow you to control object and component editability and visibility."
tags: [game development, unity]
comments: true
share: true
---

Unity game objects and components have an interesting feature called [HideFlags](http://docs.unity3d.com/ScriptReference/HideFlags.html). This allows you to control whether a game object or component is visible, editable, persistent, or any combination thereof.

Both [GameObject](http://docs.unity3d.com/ScriptReference/GameObject.html) and [MonoBehaviour](http://docs.unity3d.com/ScriptReference/MonoBehaviour.html) inherit from the [Object](http://docs.unity3d.com/ScriptReference/Object.html) class which contains the [hideFlags](http://docs.unity3d.com/ScriptReference/Object-hideFlags.html) property. This property can be set 
to any of the valid values in the [HideFlags](http://docs.unity3d.com/ScriptReference/HideFlags.html) enumeration. By default it is set to [HideFlags.None](http://docs.unity3d.com/ScriptReference/HideFlags.None.html). Below are some examples and explanations of various options.

To run these examples, I've created a script that allows you to choose a `HideFlags` value and whether to set it on the game object or component. It sets the `hideFlags` property in OnEnable, so it will run when the game starts, or you can use it in combination with [ExecuteInEditMode](http://docs.unity3d.com/ScriptReference/ExecuteInEditMode.html) to run it while in the editor.

```csharp
using UnityEngine;

public class HideFlagsSetter : MonoBehaviour
{
    public HideFlags customHideFlags;

    public enum Mode
    {
        GameObject,
        Component
    }

    public Mode setOn = Mode.GameObject;

    private void OnEnable()
    {
        if (setOn == Mode.GameObject)
        {
            gameObject.hideFlags = customHideFlags;
        }
        else if (setOn == Mode.Component)
        {
            hideFlags = customHideFlags;
        }
    }
}
```

### HideFlags.HideInHierarchy

This option hides your game object in the hierarchy view, and makes it not selectable in the scene view. This has no effect if set on a component.

![HideFlags.HideInHierarchy](/public/images/2015-10-01/hideinhierarchy.gif "The game object is hidden in the hierarchy when HideFlags.HideInHierarchy is used.")

### HideFlags.HideInInspector

If set on a game object, this option hides all the components in the inspector.

![HideFlags.HideInInspector](/public/images/2015-10-01/hideininspector_gameobject.gif "The game object is hidden in the inspector when HideFlags.HideInInspector is used.")

If set on a component, this option only hides the component in the inspector. 

![HideFlags.HideInInspector](/public/images/2015-10-01/hideininspector_component.gif "The component is hidden in the inspector when HideFlags.HideInInspector is used.")

### HideFlags.NotEditable

If set on a game object, no components will be editable. The object will also not be selectable in the scene.

![HideFlags.NotEditable](/public/images/2015-10-01/noteditable_gameobject.gif "No components on the game object are editable in the inspector when HideFlags.NotEditable is used.")

If set on a component, only that component will not be editable.

![HideFlags.NotEditable](/public/images/2015-10-01/noteditable_component.gif "The component is not editable in the inspector when HideFlags.NotEditable is used.")

Other options include [HideFlags.DontSaveInEditor](http://docs.unity3d.com/ScriptReference/HideFlags.DontSaveInEditor.html), [HideFlags.DontUnloadUnusedAsset](http://docs.unity3d.com/ScriptReference/HideFlags.DontUnloadUnusedAsset.html), [HideFlags.DontSaveInBuild](http://docs.unity3d.com/ScriptReference/HideFlags.DontSaveInBuild.html), [HideFlags.DontSave](http://docs.unity3d.com/ScriptReference/HideFlags.DontSave.html), and [HideFlags.HideAndDontSave](http://docs.unity3d.com/ScriptReference/HideFlags.HideAndDontSave.html) that mainly relate to scene and build persistence that I won't go into detail about here. More information about these can be found in the [HideFlags Documentation](http://docs.unity3d.com/ScriptReference/HideFlags.html). 

You can [download the example project](/public/downloads/hideflags.zip) to experiment with HideFlags using the script and example scene used in this post.

HideFlags can be a very useful tool in preventing the hierarchy from being cluttered and ensuring specific components are not editable. They're quite useful when working on assets in which the component values or game object structure are imporant. If you have any further questions please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment below. 
