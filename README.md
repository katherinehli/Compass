# Compass


## Setup
Requirements |
------------ |
Yarn 
React Native v0.63.4 (Either installed globally or through `yarn add react-native@0.63.4)
Cocoapods 1.10.1 (`sudo gem install cocoapods`, check with `pod --version` in the ios subdirectory)
XCode simulators (ideally 12.4 or 13.x)
XCode 12.4 (Can be retrieved by making an Apple developer account)
XCode command line tools (`xcode-select --install`, then select it in Xcode's app under Prefereces -> Locations -> Command Line tools)
Node 10 (at least)
Watchman (`brew install watchman`)
detox-cli (`npm install -g detox-cli`)
[applesimutils](https://github.com/wix/Detox/blob/master/docs/Introduction.IosDevEnv.md)
#### STEPS: 

1) Navigate to the app folder `cd compass` and do `yarn install` to grab Node Module dependencies.
> If you do not have `yarn`, install it by doing `npm i -g yarn`.
2) Navigate to the ios folder `cd ios` and do `pod install` to install ios-specific dependencies.
> If you do not have `pod`, install it by doing `sudo gem install cocoapods`. If it doesn't work, it may have to do with your XCode version.
3) navigate back to the `compass` folder in the root directory, and do `react-native run-ios` or `npx react-native run-ios` (if you've installed `react-native` through `yarn add`). 


## Important
##### Do not install new packages by `npm install` directly (except for any global installations with the -g flag), we are using `yarn`, so whenever you see a page that says `npm install ...` just do `yarn add <component name>`
