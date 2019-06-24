# spa-react-liferay-dxp-headless

A very simple example of React with Liferay DXP Headless API

- demo.html is a react spa without JSX getting a content already rendered from liferay and only displaying it in react.
- demo2.html is a react spa with JSX (using babel) getting a content not rendered yet (only structured content) from liferay and rendering it in react.
- demo3.html (plus) an example of filtering structured-contents by keywords

How to integrate with Liferay DXP 7.2

1. Start your Liferay DXP 7.2
2. Login with user test@liferay.com, update the password to: `teste` (!Important: this user/password is going to be used by the react application, that's why you must to config it correctly)
3. Config your Liferay DXP for allow CORS: You can go to System Settings -> Security Tools -> Portal Cross Resource Origin Sharing (CORS)
4. Create a structure using the example: https://gist.github.com/marceltanuri/415011efb0ff711fe2f6c90812a8340b
5. Create a new webcontent based on the structure above
6. Set a tag 'promocao' to the new webcontent
7. If needed, edit the file /js/demo3.js and set your Liferay DXP domain (default is localhost:8080). Also set your siteId (default is 20123)
8. Open your react sigle page demo3.html.
9. All contents with the tag 'promocao' will be rendered on it.
