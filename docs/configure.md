#Configure your package for your SharePoint environment
Before you build your package for the first time, you need to configure it for the SharePoint environments you want to support.

There are two ways you can configure and deploy your package:

  - [Support both SharePoint Online and SharePoint on-premises](https://github.com/nintexplatform/nwc-solution-starter/blob/main/docs/configure.md#SharePoint-On-Premises-and-SharePoint-Online)
    - This requires using an older version of the SharePoint Framework to support SharePoint 2016  
  - [Support SharePoint Online only](https://github.com/nintexplatform/nwc-solution-starter/blob/main/docs/configure.md#sharepoint-online-only)
    - If you are only using SharePoint online, you can configure the package to bundle all required files into one upload to make your installation process simpler.


# SharePoint On-Premises and SharePoint Online

To support SharePoint On-Premises, you will need to upload additional supporting files after installing your package.

1. Add your developer details.
1. Configure your App Catalog location.
1. [Build your package](./build.md).
1. Install your package and upload the additional supporting files. See [Install your package](./install.md).

## Add your developer details
Add the details of your privacy policy, terms of use, and Microsoft Partner Network Id to the package details.

1. In the project  you have downloaded from the repository, navigate to the **/config** folder.
1. Open the **package-solution.json** file.
2. Look for the section that starts with `"developer"`.
   
   If it's not there, copy and paste the below code before the `"paths"` section:
   
   ```javascript
   "developer": {
      "name": "",
      "websiteUrl": "",
      "privacyUrl": "",
      "termsOfUseUrl": "",
      "mpnId": ""
    },
   ```
2. Add your details inside the quotation marks for each field described below, and save the file.

   
|Field|Description|
|-----|-----------|
|name|Your organization or developer's name.|
|websiteUrl|The organization website. |
|privacyUrl|The URL of your privacy policy for users of your SharePoint app.|
|termsOfUseUrl|The URL of your terms of use for users of your SharePoint app.|
|mpnId|Your Microsoft Partner Network ID.|

## Configure the App Catalog location

Check whether your SharePoint environment is using the default location for the App Catalog.

In your SharePoint environment:
1. Navigate to the App Catalog in your browser and examine the URL:

   If the address starts with `{your SharePoint domain}/sites/appcatalog/` then you are using the default location. You are ready to build your package.
1. If the address does not start with  `{your SharePoint domain}/sites/appcatalog/` then copy the part of the URL that comes after `/sites/`.

   For example, if the URL was`{your SharePoint domain}/sites/apps/{Rest of the URL}` you would copy **apps**.
1. In the project  you have downloaded from the repository, navigate to the **/config** folder.
1. Open the **write-manifest.json** file.
1. Find the line that starts with `"cdnBasePath"`.
1. Select the **appcatalogue** part of the value: "/sites/`appcatalog`/CDN/nwctasksforms".
1. Paste the URL-part you copied earlier.

   For example, if your App Catalogue location was **apps**:  

    ```javascript	
    {
      "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
      "cdnBasePath": "/sites/apps/CDN/nwctasksforms"
    }
    ```
1. Save and close the file.

You're now ready to [build your package](./build.md).

<br/>
<br/>
<br/>

# SharePoint Online Only

If you will only use the package in SharePoint online, you can configure the package to include any additional files. You won't need to upload any additional files after installing.

1. Add your developer details.
1. Configure the package for SharePoint Online only.
1. [Build your package](./build.md).
1. Install your package. You will not need to upload additional files. See [Install your package](./install.md).

_Note:_ If you need to support SharePoint on-premesis, you must use the instructions for SharePoint On-Premesis above.


## Add your developer details
Add the details of your privacy policy, terms of use, and Microsoft Partner Network Id to the package details.

1. In the project  you have downloaded from the repository, navigate to the **/config** folder.
1. Open the **package-solution.json** file.
2. Look for the section that starts with `"developer"`.
   
   If it's not there, copy and paste the below code before the `"paths"` section:
   
   ```javascript
   "developer": {
      "name": "",
      "websiteUrl": "",
      "privacyUrl": "",
      "termsOfUseUrl": "",
      "mpnId": ""
    },
   ```
2. Add your details inside the quotation marks for each field described below, and save the file.
   
|Field|Description|
|-----|-----------|
|name|Your organization or developer's name.|
|websiteUrl|The organization website. |
|privacyUrl|The URL of your privacy policy for users of your SharePoint app.|
|termsOfUseUrl|The URL of your terms of use for users of your SharePoint app.|
|mpnId|Your Microsoft Partner Network ID.|


## Configure the package for SharePoint Online only
  - Update Node version.
  - Configure the package to use more recent frameworks and libraries.
  - Retrieve the additional files that would normally be uploaded to a CDN.
  - Configure the package to combine all JSON and javascript files into the package rather than using a CDN.
  - Remove the CDN path from the configuration.
  
### Switch your version of Node to v10
Using NVM or NODIST (or 'n' if you are developing on a Mac), switch to Node v10.


### Update frameworks and libraries
The package for SharePoint Online can make use of more recent versions of frameworks and libraries.
1. Open the **package.json** file in the top-level folder of the repository.
1. Find and update the following `@microsoft` values:

	```javascript
		"@microsoft/sp-core-library": "~1.11.0.0",
		"@microsoft/sp-lodash-subset": "~1.11.0.0",
		"@microsoft/sp-webpart-base": "~1.11.0.0",
	```
1. Find and update the following `react` values:

	```javascript	
		"react": "15.4.2",               
		"react-dom": "15.4.2"        
	```


### Retrieve the content to be combined into the package
1. In the console, type the following commands, each command followed by the **Enter** key.
   1. `npm i`
   2. `npm audit fix`
   3. `npm i @microsoft/sp-tslint-rules`
   4. `npm i @microsoft/rush-stack-compiler-3.2`


### Configure the package to combine all JSON and javascript

1. Open the **package-solution.json** file in the **/config** folder of the repository.
1. Add the following line: `"includeClientSideAssets": true`.

  ```javascript  
  {
    "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
    "solution": {
      "name": "Nintex Solution Starter - NWC Tasks and Forms",
      "id": "4cc1a9b3-bbe0-4db5-b97f-433c5562b052",
      "version": "1.0.0.0",
      "includeClientSideAssets": true,
      "developer": {
        "name": "",
        "websiteUrl": "",
        "privacyUrl": "",
        "termsOfUseUrl": "",
        "mpnId": ""
      }
    },
    "paths": {
      "zippedPackage": "solution/nwc-tasks-forms.sppkg"
    }
  }
```

### Reset the CDN path
Because you have configured the package to contain all JSON and javascript, you can remove the CDN.

1. Open the **write-manifests.json** file in the **/config** folder of the repository.
1. Find the line that starts with `"cdnBasePath"`.
1. Change the value to `"<!-- PATH TO CDN -->"`.

    ```javascript	
    {
      "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
      "cdnBasePath": "<!-- PATH TO CDN -->"
    }
    ```

You're now ready to [build your package](./build.md).
