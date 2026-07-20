import { createSiteraClient, formatMoney } from '@sitera/sdk';

const client = createSiteraClient({
  siteId: "demo-site",
  businessId: "demo-business"
});

async function initApp() {
  const appDiv = document.getElementById('app');
  
  try {
    // Fetch business and product data in parallel
    const [business, products] = await Promise.all([
      client.business.get(),
      client.products.list({ limit: 5 })
    ]);

    let html = `
      <h1>${business.name}</h1>
      <p>${business.description || 'Welcome to our store!'}</p>
      <h2>Product List:</h2>
    `;

    products.forEach(product => {
      html += `
        <div class="card">
          <h3>${product.name}</h3>
          <p>Price: ${formatMoney(product.price).formatted}</p>
        </div>
      `;
    });

    appDiv.innerHTML = html;
  } catch (error) {
    console.error(error);
    appDiv.innerHTML = `<h1 style="color: red;">Failed to load data</h1><p>${error.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', initApp);
