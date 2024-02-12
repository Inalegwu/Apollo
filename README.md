# Apollo
#### cross-platform file sharing for everybody
<br>
<br>

```
    🚧 Apollo is currently a work in progress
```

<br>
<br>

## Why Apollo
To put it simply? File sharing. I'm primary a Windows and linux user and sometimes I look over at the iOS/MacOS users and see the ease they have in sharing files across their devices and I thought, why can't the rest of us have this on our own devices and possibly on the others as well , So I got to building , like every developer does when they have an idea.<br>
Apollo , was born more out of interest than of necessity to be frank.Apollo the project name originally began as a toy project I used to explore ftp in Golang and Rust just to see how complex it could be without any packages *spoiler , it's very hard*. Then I instantly thought of how it could be used when I had a working demo , and took the name and gave it to the desktop app instead.<br>

<br>

## The Engine Room
#### How is Apollo being built.
Apollo consists of two parts , The desktop/PC Client and the mobile client

Apollo desktop is an Electron app built using the [Electrostatic Stack](https://github.com/Inalegwu/ElectroStatic), a bespoke stack for building electron apps quickly using some of the best tools in the ecosystem to increase speed of feature delivery and general developer happiness
<br><br>
Apollo Mobile , is a React Native app built using the best tools in the React Native ecosystem to also help speed of feature delivery and general developer happiness.
<br><br>
I'm a strong believer in uing the tools you know to achieve the things you want to , when you need speed
As much as I would have loved to used Tauri to do this or Flutter or Nativescript , these are the tools I use in my everyday development both for work and in other personal projects and I don't see a need to abandon them just yet ,especially when I'm trying to build something quickly.
<br><br>
The entire repository , is a monorepo managed using [Moonrepo](https://moonrepo.dev) , a new monorepo tool built using Rust. I chose it because it allowed me to define a lot of the things I needed myself , whereas tools like Turborepo just spat out a bunch of folders for me which I don't generally enjoy.This repository originally was two separate projects with separate git histories but I managed to assimilate them into this

<br>


#### Contributing to Apollo
Contributions will be welcome to Apollo when it has come out of its' early days of development and is working towards a release.<br>
*Why ?* You may ask , well I need to know what people are thinking before I can let them contribute , which means I need to know that you've used the app and encountered an Issue and this can only be done when the app is at least in alpha.<br><br>
```
    *Contributors must first be users*
```