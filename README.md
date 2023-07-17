> A loyalty program system designed for online stores, with seamless integration into the Shopify platform. Built on the Fuel Network using Sway, Black Gold aims to improve both customer and seller experience and demonstrate the potential of blockchain-based loyalty programs for web2 platforms.

# Black Gold front-end monorepo

Monorepo for Black Gold front-end projects, including the source code of the Black Gold widget, a Shopify App (admin app and theme extension), and a Shopify headless store.

## About Shopify apps

Before getting started, it's important to get familiar with the Shopify ecosystem, especially apps and theme extensions.
Here is an overview from [the Shopify documentation](https://shopify.dev/docs/apps/getting-started) to help you get more context.

> A Shopify app extends the existing functionality of Shopify. Most Shopify apps are built by third-party developers, not by Shopify. You can build an app to add features to Shopify stores and extend the Shopify admin experience, or to create unique buying experiences for customers. You can also pull Shopify store data into your app, platform, or integration. To tailor experiences to their specific needs, users install Shopify apps to help build their business, integrate with external services, and add features to their Shopify admin.
> ![Shopify apps explained](/public/explaining_shopify_apps_1.webp) > ![Shopify apps explained](/public/explaining_shopify_apps_2.webp)

## 🗂 Folder layout

The main apps are:

- `widget-loyalty-program` a widget for storefronts for buyers to interact with Black Gold Loyalty programs
- `shopify-app` our Shopify app
  - `web` the front-end of our shopify app (accessible to merchants from the store admin panel)
  - `extensions`
    - `widget-loyalty-ui` a theme extension that installs the Black Gold widget in a Shopify theme
- `example-with-headless-shopify-storefront` An example of headless Shopify storefront to demonstrate the widget

## 🏁 Get started

### Pre-requisites

- Have `node` installed ; your version must be `>=16`
- Install dependencies with `pnpm install`
- Have a **[Shopify Partner account](https://partners.shopify.com/signup)**
- Have or [\*\*create a development store](https://shopify.dev/docs/themes/tools/development-stores#create-a-development-store-to-build-and-test-your-theme) with an online Store 2.0 theme installe that uses JSON templates and supports app blocks (eg: Dawn)

### Start...

- To start the widget UI in a sandbox: `pnpm widget:dev`
- To build the widget: `pnpm widget:build`
- To start the Shopify app: `pnpm shopify:app:dev`
- To start the headless Shopify storefront: `pnpm headless-shopify-storefront:dev`

## Apps flow

`widget-loyalty-program` is a **widget** that acts as an middle-man between _buyers_, _merchants_, and _Black Gold smart contract_.

**Merchants** can setup the widget in their **storefront** as a **theme extension** (`shopify-app/extensions/widget-loyalty-ui`) or by adding the necessary code to their website (see `example-with-headless-shopify-storefront`) and can interact with it from the storefront admin panel (`shopify-app/web`).

## Workflow

### In your IDE

1.  `pnpm widget:dev` and start working locally in `widget-loyalty-program` ;
2.  Once you're done, run `pnpm widget:build` ; it will automatically generate the assets from `widget-loyalty-program` in `shopify-app/extensions/widget-loyalty-ui` ;
    Your terminal should print something similar to this :

```
../shopify-app/extensions/widget-loyalty-ui/assets/index-0640a6c2.css   10.61 kB │ gzip:  2.91 kB
../shopify-app/extensions/widget-loyalty-ui/assets/index-a147c8da.js   154.19 kB │ gzip: 52.52 kB
```

3. In `shopify-app/extensions/widget-loyalty-ui/blocks/loyalty_widget.liquid`, copy/paste the name of the previously generated css and js file in the required slots. Your `loyalty_widget.liquid` should look like this :

```
<div style="font-style:16px;position:fixed;bottom:12px;right:12px;" id="blckgld-ltypgrm"></div>
{% schema %}
  {
    "name": "Black Gold",
    "target": "body",
    "javascript": "index-a147c8da.js",
    "stylesheet": "index-0640a6c2.css",
    "settings": []
  }
{% endschema %}
```

4. Start the Shopify app with `shopify:app:dev` ; if you haven't already, install the app in your development store. The instructions should be appear in your terminal.

### In your Shopify partner account

1. In your Shopify partner account, navigate to "Apps > all apps > <your-app-name>" (in our case, `blackgold-loyalty`), then navigate to "Extensions" and click on `<your-extension-name>` (in our case, `widget-loyalty-ui`)
   ![How to navigate to your theme extension in Shopify partner](/public/partner_apps.png)

2. Click on "Create a draft version", then, in your newly created version, click on "Publish" ;
   ![How to publish a theme extension draft in Shopify partner](/public/partner_publish_version.png)

### In your Shopify Admin account

If you haven't done it yet, setup the extension in your theme like so :

1. In your Shopify admin, in the navbar, navigate to "Sales channels > Online stores > themes" and click on "Customize"
2. In the theme editor, in the navbar, navigate to "App embeds"
3. You should see "Black Gold" in the list of App embeds ; toggle it on and it should appear in your storefront
   ![How to enable your theme extension as an app embed in your theme](/public/partner_publish_version.png)
