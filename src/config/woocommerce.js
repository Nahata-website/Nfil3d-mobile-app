// Configuration for NFIL3D WooCommerce REST API
export const WOOCOMMERCE_CONFIG = {
  // Base URL of the NFIL3D WordPress / WooCommerce store
  siteUrl: 'https://nfil3d.com',
  
  // Replace these with your actual keys from WooCommerce -> Settings -> Advanced -> REST API
  consumerKey: 'ck_your_consumer_key_here',
  consumerSecret: 'cs_your_consumer_secret_here',
  
  // API Version
  apiVersion: 'wc/v3',
  timeout: 10000,
};

export const hasValidKeys = () => {
  return (
    WOOCOMMERCE_CONFIG.consumerKey &&
    WOOCOMMERCE_CONFIG.consumerKey.startsWith('ck_') &&
    WOOCOMMERCE_CONFIG.consumerKey !== 'ck_your_consumer_key_here' &&
    WOOCOMMERCE_CONFIG.consumerSecret &&
    WOOCOMMERCE_CONFIG.consumerSecret.startsWith('cs_') &&
    WOOCOMMERCE_CONFIG.consumerSecret !== 'cs_your_consumer_secret_here'
  );
};
