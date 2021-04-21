# Build the package

_Note:_ Before you build your package for the first time, make sure you configure it for the SharePoint environment you want to support. You can:

  - [Support both SharePoint Online and SharePoint on-premises](https://github.com/nintexplatform/nwc-solution-starter/blob/main/docs/configure.md#SharePoint-On-Premises-and-SharePoint-Online)
    - This requires using an older version of the SharePoint Framework to support SharePoint 2016  
  - [Support SharePoint Online only](https://github.com/nintexplatform/nwc-solution-starter/blob/main/docs/configure.md#sharepoint-online-only)
    - If you are only using SharePoint online, you can configure the package to bundle all required files into one upload to make your installation process much simpler.

We recommend using a code editor that provides a console, such as [Visual Studio Code](https://code.visualstudio.com/), [Atom](https://atom.io/) or [Webstorm](https://www.jetbrains.com/webstorm) for building and debugging.

## Create and trust a developer certificate

When debugging the package for the first time, you must first create and trust a developer certificate.
1. In the console, type the following commands, each command followed by the **Enter** key.
   1. `gulp trust-dev-cert`
   1. `set NODE_NO_HTTP2=1 && gulp serve`

You only need to run these commands once. 

For more help getting started building and debugging SharePoint packages, see [Microsoft SharePoint developer tutorials](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment).

## Build your package
Once you have configured your package and created a developer certificate, you can build the package.

_Note:_ If you are supporting SharePoint on-premesis, you must use Node v6. Use NODIST (or 'n' if developing on a Mac) to switch Node versions. Check [nodejs.org](https://nodejs.org/dist/latest-v6.x/) for the latest v6 version.

To build your package:
1. In the console, type the following commands, each command followed by the **Enter** key.
- `gulp clean`
- `gulp build`
  -  Note: Depending on your version of gulp you may need to update to the latest version by using `gulp --upgrade` and then remove `"no-use-before-declare": true` from the `tslint.json` file before running `gulp build` again. 
- `gulp bundle --ship`
- `gulp package-solution --ship`

