import { request, gql } from 'graphql-request';

// request that gets products from mock shop 

export default async function getProducts() {
  const query = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            featuredImage {
              id
              url
            }
            variants(first: 3) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await request('https://mock.shop/api', query);
  const products = response.products.edges.map((product) => product.node);
  return products;
}