## Development notes

##### Originally built using SPFX 1.1, to support SP2016, SP2019 as well as SharePoint Online.
- When working with SPFX 1.1, node.js must be 6.x
  - Use 'nodist' to switch node versions on Windows, use the 'n' command when working with node on a Mac

Example:
```
$ npm install -g n
$ n 6.17.1
```
- Check here for latest version :  https://nodejs.org/dist/latest-v6.x/
- This is to support SP2016 compatibility - and SPFX 1.1



##### Upload SPPKG to AppCatalog
- After [build](/docs/build.md) step, packaged file located in /sharepoint/solution folder.
- Update SPPKG file to AppCatalog site, within 'Apps for SharePoint'

##### Supporting on-premises with CDN
- Need to make a [Document Library] within SharePoint App Catalog. See _Configure the App Catalog location_ in [build](/docs/build.md) section.
  - Example: _/sites/appcatalog/CDN/nwctaskforms_
- Upload all files from the folder : /temp/deploy
- This is typically 1 JSON, 3 JS files
- NOT from /dist
- This is to allow for cross-support with SP2016.

#### Adding web parts to page
- WebPart will now be available in the gallery
- SharePoint page needs to be a [modern](https://support.microsoft.com/en-us/office/create-and-use-modern-pages-on-a-sharepoint-site-b3d46deb-27a6-4b1e-87b8-df851e503dec) page



#### Update SPFX for SPOnline - for deployment of single SPPKG - to SPO only (OPTIONAL) ;

- If you are using SharePoint Online (only), then you can update to the newest/latest SPFX
- Also, this allows for a single file SPPKG to deploy
- Use NVM or NODIST to use Node v10 (currently 10.24.0)
  - This will be ‘n’ if using a Mac computer
- Update version references - See _Configure your package for SharePoint Online only_ in [build](/docs/build.md) section.
  - Example: within file package.json change the references for SPFX to the latest version (these were set at 1.1.0 - change to 1.11.0)
```
"@microsoft/sp-core-library": "~1.11.0",
"@microsoft/sp-lodash-subset": "~1.11.0",
"@microsoft/sp-webpart-base": "~1.11.0",
```


## Troubleshooting ;
- See [Troubleshooting](/docs/troubleshooting.md) doc.
