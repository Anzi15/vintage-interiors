import { searchClient } from '@algolia/client-search';

// Initialize the Algolia client
const appId = import.meta.env.VITE_ALGOLIA_APP_ID; // Replace with your actual app ID
console.log(appId)
const apiKey = import.meta.env.VITE_ALGOLIA_API_KEY; // Use Admin API Key for write operations
// const searchClient = algoliasearch(appId, apiKey);

const client = searchClient(appId, apiKey);



export const searchProducts = async (query) => {
  try {
    const response = await client.searchSingleIndex({
        indexName: 'Products',
        searchParams: { query},
      });

      console.table(response)
      return response
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
