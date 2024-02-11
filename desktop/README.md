# Apollo
#### cross-platform file sharing for everybody
<br>
<br>
`
    🚧 Apollo is currently a work in progress
`
<br>
<br>

## Why Apollo
To put it simply? File sharing. I'm primary a Windows and linux user and sometimes I look over at the iOS/MacOS users and see the ease they have in sharing files across their devices and I thought, why can't the rest of us have this on our own devices and possibly on the others as well , So I got to building , like every developer does when they have an idea.<br>
Apollo , was born more out of interest than of necessity to be frank.Apollo the project name originally began as a toy project I used to explore ftp in Golang and Rust just to see how complex it could be without any packages *spoiler , it's very hard*. Then I instantly thought of how it could be used when I had a working demo , and took the name and gave it to the desktop app instead.<br>

<br>

## The Engine Room
#### How is Apollo being built.
Apollo is an primary an electron app built using the [Electrostatic Stack](https://github.com/Inalegwu/ElectroStatic), a bespoke stack for building electron apps quickly using some of the best tools in the Ecosystem
<br>


#### Contributing to Apollo
Contributions will be welcome to Apollo when it has come out of its' early days of development and is working towards a release.<br>
Why ? You may ask , well I need to know what people are thinking before I can let them contribute , which means I need to know that you've used the app and encountered an Issue and this can only be done when the app is at least in alpha.<br><br>
*Contributors must first be users*



#### Project Structure
Apollo is structured to make finding code related to certain sections easy.<br>
*You know your TRPC Routers live in /routers and more.*
```
src:
    - assets:
        - fonts : App Fonts for UI
    - shared:
        - routers : TRPC Routers for IPC
        - config.ts : Config for TRPC and Tanstack-Query
        - context.ts : Context Definition for TRPC
        - types.ts : Custom Types
        - utils.ts : Utility functions
    - web:
        - components: UI Components
        - routes : Pages of the App
        - state : state slices

```