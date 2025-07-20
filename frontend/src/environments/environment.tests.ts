export const environment = {
    // This is the environment configuration for the frontend application.
    apiUrl: 'https://api.test.insy.hs-esslingen.com',

    // Regex to match price format with optional Euro sign
    // Allowed are point and comma as decimal separator, with up to two decimal places
    // A euro sign is optional and can be separated by a space
    // Whitespace is allowed before and after the price
    priceRegEx: /^\s*\d+(?:[.,]\d{1,2})?\s*€?\s*$/,

    clientId: "angular-app-test",
    issuer: "https://auth.insy.hs-esslingen.com/realms/insy",
}
