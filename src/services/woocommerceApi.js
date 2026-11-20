import axios from 'axios';
import { WOOCOMMERCE_CONFIG, hasValidKeys } from '../config/woocommerce';
import { NFIL3D_PRODUCTS } from '../data/nfil3dData';

/**
 * Service to communicate with NFIL3D.com WooCommerce API
 */
class WooCommerceService {
  constructor() {
    this.client = axios.create({
      baseURL: `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/${WOOCOMMERCE_CONFIG.apiVersion}`,
      timeout: WOOCOMMERCE_CONFIG.timeout,
    });
  }

  /**
   * Fetch products from WooCommerce API or fallback to local catalog
   */
  async getProducts(params = {}) {
    if (!hasValidKeys()) {
      console.log('ℹ️ Using NFIL3D preloaded catalog (Add WooCommerce keys in src/config/woocommerce.js to fetch live data)');
      return {
        isLive: false,
        data: NFIL3D_PRODUCTS,
      };
    }

    try {
      const response = await this.client.get('/products', {
        params: {
          consumer_key: WOOCOMMERCE_CONFIG.consumerKey,
          consumer_secret: WOOCOMMERCE_CONFIG.consumerSecret,
          per_page: 30,
          ...params,
        },
      });

      // Format WooCommerce product to match app schema
      const formatted = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.categories?.[0]?.slug || 'filaments',
        price: parseFloat(item.price || item.regular_price || 0),
        originalPrice: parseFloat(item.regular_price || item.price || 0),
        rating: parseFloat(item.average_rating || '4.8'),
        reviewsCount: item.rating_count || 12,
        image: item.images?.[0]?.src || 'https://via.placeholder.com/400',
        inStock: item.stock_status === 'instock',
        description: item.short_description?.replace(/<[^>]*>?/gm, '') || item.name,
        specs: {
          material: item.attributes?.find((a) => a.name.toLowerCase().includes('material'))?.options?.[0] || '1.75mm',
          nozzleTemp: '190°C - 230°C',
          bedTemp: '50°C - 70°C',
        },
        colors: item.attributes?.find((a) => a.name.toLowerCase().includes('color'))?.options || ['Standard'],
      }));

      return {
        isLive: true,
        data: formatted,
      };
    } catch (error) {
      console.warn('⚠️ WooCommerce API connection failed, serving cached NFIL3D catalog:', error.message);
      return {
        isLive: false,
        data: NFIL3D_PRODUCTS,
      };
    }
  }
}

export const wooService = new WooCommerceService();
