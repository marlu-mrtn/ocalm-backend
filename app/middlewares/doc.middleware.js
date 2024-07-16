import expressJSDocSwagger from "express-jsdoc-swagger";

// typedefs.js
/**
 * @typedef {object} User
 * @property {integer} id.required - ID de l’utilisateur
 * @property {string} username.required - Nom de l’utilisateur
 * @property {string} email.required - Email de l’utilisateur
 * @property {string} password - Mot de passe de l’utilisateur
 */

/**
 * @typedef {object} ApiError
 * @property {integer} status.required - Code de statut HTTP
 * @property {string} message.required - Message d’erreur
 */

/**
 * @typedef {object} Place
 * @property {integer} id.required - ID de la place
 * @property {string} name - Nom de la place
 * @property {string} description - Description de la place
 * @property {array<string>} journey - Itinéraire de la place
 */

const options = {
  info: {
    version: '1.0.0',
    title: 'O-calm API',
    description: 'Les meilleurs coins de verdure faciles d\'accès !',
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'ID de l’utilisateur' },
          username: { type: 'string', description: 'Nom de l’utilisateur' },
          email: { type: 'string', description: 'Email de l’utilisateur' },
          password: { type: 'string', description: 'Mot de passe de l’utilisateur' }
        },
        required: ['id', 'username', 'email']
      },
      ApiError: {
        type: 'object',
        properties: {
          status: { type: 'integer', description: 'Code de statut HTTP' },
          message: { type: 'string', description: 'Message d’erreur' }
        },
        required: ['status', 'message']
      },
      Place: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'ID de la place' },
          name: { type: 'string', description: 'Nom de la place' },
          description: { type: 'string', description: 'Description de la place' },
          journey: { type: 'array', items: { type: 'string' }, description: 'Trajet pour accéder à la place' },
          created_at: { type: 'string', format: 'date-time', description: 'Date de création' },
          updated_at: { type: 'string', format: 'date-time', description: 'Date de mise à jour' }
        },
        required: ['id', 'name']
      }
    }
  },
  baseDir: './app',
  filesPattern: ['./controllers/**/*.js', './routers/**/*.js'],
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
};

export default (app) => expressJSDocSwagger(app)(options);
