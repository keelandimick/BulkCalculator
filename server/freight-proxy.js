const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const FREIGHTVIEW_CLIENT_ID = process.env.FREIGHTVIEW_CLIENT_ID || '691037df93290c107d289b99';
const FREIGHTVIEW_CLIENT_SECRET = process.env.FREIGHTVIEW_CLIENT_SECRET || 'Z8EsTovVJMC9MQ6m98q7sDq2uFmuUIWhJT5SMLBHYFgcvxCIvXatIMt';

// FreightView quote endpoint
app.post('/api/freight-quote', async (req, res) => {
    try {
        const { origin_zip, destination_zip, weight, height, freight_class, product_name } = req.body;
        
        // First get access token
        const tokenResponse = await axios.post(
            'https://api.freightview.com/v2.0/auth/token',
            {
                client_id: FREIGHTVIEW_CLIENT_ID,
                client_secret: FREIGHTVIEW_CLIENT_SECRET,
                grant_type: 'client_credentials'
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
        const accessToken = tokenResponse.data.access_token;
        
        // Prepare freight items
        const freightItems = [{
            weight: weight,
            length: 48, // Standard pallet
            width: 40,
            height: height,
            quantity: 1,
            description: product_name || 'Furniture',
            nmfc: weight < 150 ? '79580' : '79560',
            freight_class: freight_class,
            stackable: false,
            hazmat: false
        }];
        
        // Get freight quotes
        const ratesResponse = await axios.post(
            'https://api.freightview.com/v2.0/rates',
            {
                origin: {
                    postal_code: origin_zip,
                    country: 'US'
                },
                destination: {
                    postal_code: destination_zip,
                    country: 'US',
                    location_type: 'residential',
                    liftgate_required: true
                },
                items: freightItems,
                accessorials: [
                    'liftgate_delivery',
                    'inside_delivery',
                    'residential_delivery'
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const rates = ratesResponse.data.rates || [];
        
        if (rates.length === 0) {
            throw new Error('No freight rates available');
        }
        
        // Find cheapest rate
        const cheapest = rates.reduce((min, rate) => 
            parseFloat(rate.total_cost) < parseFloat(min.total_cost) ? rate : min
        );
        
        res.json({
            success: true,
            rates: rates,
            cheapest: {
                total_cost: cheapest.total_cost,
                carrier_name: cheapest.carrier_name || cheapest.scac || 'Carrier',
                transit_days: cheapest.transit_days || 'N/A',
                scac: cheapest.scac
            }
        });
        
    } catch (error) {
        console.error('Freight quote error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.message || error.message || 'Failed to get freight quote'
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Freight proxy server running on port ${PORT}`);
    console.log('FreightView credentials loaded:', !!FREIGHTVIEW_CLIENT_ID && !!FREIGHTVIEW_CLIENT_SECRET);
});