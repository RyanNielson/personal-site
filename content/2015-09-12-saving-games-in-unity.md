---
layout: post
title: Saving Games in Unity
description: "Unity doesn't have a nice built-in way to save games, so let's fix that."
tags: [game development, unity]
comments: true
share: true
---

Unity has ways to save game data like [PlayerPrefs](http://docs.unity3d.com/ScriptReference/PlayerPrefs.html) but it is quite limited and can store information in strange locations on certain platforms. In this post, I'll demonstrate a more object oriented approach that allows you to save almost any kind of data structure to a file. This method is going to be based off of how [Unreal Engine 4 handles saving games](https://docs.unrealengine.com/latest/INT/Gameplay/SaveGame/).

To start, we'll create a `SaveGame` object that will be used as an abstract base class for all of our saved game objects. This class is marked as `[Serializable]` so that C# is able to serialize it, and it's also marked as abstract because we won't be using it directly to save games.

```csharp
using System;

[Serializable]
public abstract class SaveGame
{
}
```

Next comes the static `SaveGameSystem` class that does most of the heavy lifting of saving, loading, and deleting save files.

```csharp
using UnityEngine;
using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

public static class SaveGameSystem
{
    public static bool SaveGame(SaveGame saveGame, string name)
    {
        BinaryFormatter formatter = new BinaryFormatter();

        using (FileStream stream = new FileStream(GetSavePath(name), FileMode.Create))
        {
            try
            {
                formatter.Serialize(stream, saveGame);
            }
            catch (Exception)
            {
                return false;
            }
        }

        return true;
    }

    public static SaveGame LoadGame(string name)
    {
        if (!DoesSaveGameExist(name))
        {
            return null;
        }

        BinaryFormatter formatter = new BinaryFormatter();
   
        using (FileStream stream = new FileStream(GetSavePath(name), FileMode.Open))
        {
            try
            {
                return formatter.Deserialize(stream) as SaveGame;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }

    public static bool DeleteSaveGame(string name)
    {
        try
        {
            File.Delete(GetSavePath(name));
        }
        catch (Exception)
        {
            return false;
        }

        return true;
    }

    public static bool DoesSaveGameExist(string name)
    {
        return File.Exists(GetSavePath(name));
    }

    private static string GetSavePath(string name)
    {
        return Path.Combine(Application.persistentDataPath, name + ".sav");
    }
}
```

The `SaveGame` method takes a `SaveGame` object and a name, and saves it to a file. The `LoadGame` method takes a name and loads the file back into a usable `SaveGame` object. The `DeleteGame` method takes a name and deletes the associated save game file. All of these methods use `GetSavePath` to determine where the save game file should be located. By default, it's saved to the [Application.persistantDataPath](http://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) which is different on each platform. On Windows, it should be located somewhere similar to `C:\Users\[username]\AppData\LocalLow\[companyname]\[projectname]`. If you want to customize the saved game location, just modify this method.

Finally, create a custom class to store save game data that will be written to a file. This class should be marked as `[Serializable]` and inherit from the `SaveGame` class. It should contain any fields you wish to save to a file. By default C#'s `BinaryFormatter` class serializes all public and private fields, and public and private properties. To prevent a field from being serialized, it should be marked with the `[NonSerialized]` attribute.

```csharp
using System;

[Serializable]
public class MySaveGame : SaveGame
{
    public string playerName = "Ryan";

    public int HighScore { get; set; }

    [NonSerialized]
    public string secret = "Nope";
}
```

Below is an example of how you could use this system to save and load a saved game.

```
// Saving a saved game.
MySaveGame mySaveGame1 = new MySaveGame();
mySaveGame1.playerName = "Ryan";
mySaveGame1.HighScore = 1000000;
mySaveGame1.secret = Random.Range(0, 1000).ToString();
SaveGameSystem.SaveGame(mySaveGame1, "MySaveGame"); // Saves as MySaveGame.sav

// Loading a saved game.
MySaveGame mySaveGame2 = SaveGameSystem.LoadGame("MySaveGame") as MySaveGame;
Debug.Log(mySaveGame2.playerName); // Will log Ryan
Debug.Log(mySaveGame2.HighScore);  // Will log 1000000
Debug.Log(mySaveGame2.secret);     // Will log null since this field was marked [NonSerialized]

// Deleting a saved game.
SaveGameSystem.DeleteSaveGame("MySaveGame");
```

I think this approach is much better than using [PlayerPrefs](http://docs.unity3d.com/ScriptReference/PlayerPrefs.html) because of its added flexibility, and hopefully you do as well. If you have any further questions please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment below. 
