# Synergic - Atomic Design Page Builder
## Bachelorthesis Prototype Project by Julian Klummer

## 1. Installation:
clone this project and the depending cms systems in the same root folder:
https://github.com/Julian-Kl/synergic-content-cms
https://github.com/Julian-Kl/synergic-editor-cms

Your folder structure should look like this:
├── Rootfolder
│   ├── synergic
│   ├── synergic-content-cms
│   ├── /synergic-editor-cms

If you miss any necessary packages like npm install them previously.
After cloning install all dependencies of each project with:
```
npm install
```

## 2. Project Startup
Navigate to the folder synergic. There you have several startup options you find in the package.json.
Recommended are the following two:
```
npm run start:allDev
```
Starts the builder react app with webpack dev server and both strapi cms apps simultaniously.


```
npm run start:allServer
```
Starts the builder react app with nodemon and both strapi cms apps simultaniously.
