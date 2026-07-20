import { createSiteraClient } from '@sitera/sdk';
import type { SiteraBusiness, SiteraProduct } from '@sitera/sdk';

const client = createSiteraClient({
  siteId: "demo-site",
  businessId: "demo-business",
  locale: "id-ID"
});

async function getBusinessData(): Promise<SiteraBusiness> {
  return await client.business.get();
}

async function getTopProducts(): Promise<SiteraProduct[]> {
  return await client.products.list({ limit: 5, featured: true });
}

async function main() {
  try {
    const [business, products] = await Promise.all([
      getBusinessData(),
      getTopProducts()
    ]);

    console.log(`Welcome to ${business.name}!`);
    console.log(`We have ${products.length} featured products.`);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
}

main();
