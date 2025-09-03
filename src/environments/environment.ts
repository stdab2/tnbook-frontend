export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  uiBaseUrl: 'http://localhost:4200',
  oauth2AuthorizeUri: '/oauth2/authorize',

  accessTokenKey: 'accessToken',
  accessTokenHeader: 'Authorization',

  googleRedirectUri: 'http://localhost:8080/oauth2/callback/google',
  googleAuthUrl: 'http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/oauth2/google/redirect'
};