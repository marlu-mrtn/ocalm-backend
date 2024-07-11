import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: '1.0.0',
    title: 'O-calm API',
    description: 'Les meilleurs coins de verdure faciles dacces !',
  },
  baseDir: import.meta.dirname,
  filesPattern: '../../**/*.js',
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
};

export default (app) => expressJSDocSwagger(app)(options);
