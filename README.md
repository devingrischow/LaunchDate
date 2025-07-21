# LaunchDate

A Website that I made for my javascript class final.

What this site does, is when you visit, it calls to a API that fetches detailed lists of information about upcoming rocket launches.

With the list, it then maps it to some styled cards to show the user. Launches are even seperated by general launches and spaceX only launches.

## Powered by a Popular up to Date API

Everything is powered by the API [Launch Library 2, by The Space Devs](https://thespacedevs.com/llapi). Their API is very well designed, with easily readable API documentation, as well as being easily findable as well.

Data from the API is extracted in seperate functions depending on what list is being loaded. Data is handeled similarly, but the card generated is different, depending on if its spaceX of a general launch.

## Design & Use

Everything is designed to be data feed, no information is hard coded.

Custom Handlers are made to help showcase more data easily as well. The most notable example being `Orbit Type`. Orbit Type when called from the API is just a string, but most users might not know what LEO and GEO mean.

My solution was based on the string it would present a image, one that I picked out to show orbit types, but depending on the type it shows a image with the type highlighted.  

## Authors

- [@devingrischow](https://github.com/devingrischow)
