import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: '1.0.0',
    title: 'O-calm API',
    description: 'Les meilleurs coins de verdure faciles d acces !',
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'ID de l’utilisateur' },
          name: { type: 'string', description: 'Nom de l’utilisateur' },
          email: { type: 'string', description: 'Email de l’utilisateur' }
        },
        required: ['id', 'name', 'email']
      },
      ApiError: {
        type: 'object',
        properties: {
          status: { type: 'integer', description: 'Code de statut HTTP' },
          message: { type: 'string', description: 'Message d’erreur' }
        },
        required: ['status', 'message']
      }
    }
  },
  baseDir: './app' ,
  filesPattern: './../**/*.js',
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
};

export default (app) => expressJSDocSwagger(app)(options);

