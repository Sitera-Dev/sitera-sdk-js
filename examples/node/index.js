import { createSiteraClient, formatMoney } from '@sitera/sdk';

const client = createSiteraClient({
  siteId: "demo-site",
  businessId: "demo-business",
  locale: "id-ID"
});

async function run() {
  try {
    console.log("Fetching business profile...");
    const business = await client.business.get();
    console.log(`Business Name: ${business.name}`);
    
    console.log("\nFetching products...");
    const products = await client.products.list({ limit: 3 });
    products.forEach(p => {
      console.log(`- ${p.name}: ${formatMoney(p.price).formatted}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
