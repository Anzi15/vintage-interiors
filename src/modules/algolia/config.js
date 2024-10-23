import { searchClient } from '@algolia/client-search';
import { getAllDocs } from '../firebase-modules/firestore';


const client = searchClient('N393D6S5U2', '71202aa7ba4d160de1b687f0ca8ab592');


export const processRecords = async () => {
  const productsData = await getAllDocs(
    "Products"
  )
  console.log(productsData)
  const response = await client.saveObjects({
    indexName: 'Products',
    objects: productsData.map(item => ({
      ...item,
      objectID: item.id // Ensure to set a unique identifier
    })),
  });
  console.log('Records saved:', response);
};
