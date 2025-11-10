const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const FREIGHTVIEW_API_KEY = process.env.FREIGHTVIEW_API_KEY || 'SKktZsCMbDgpftTm3U0QyxaY1KbhvAKfk5N9bU3elI5w7TK09ZWpVWGw';

// FreightView quote endpoint
app.post('/api/freight-quote', async (req, res) => {
    try {
        const { origin_zip, destination_zip, weight, height, freight_class, product_name } = req.body;
        
        // Create Basic Auth header (API key with empty password)
        const auth = Buffer.from(`${FREIGHTVIEW_API_KEY}:`).toString('base64');
        
        // Get today's date for pickup
        const today = new Date();
        const pickupDate = today.toISOString().split('T')[0];
        
        // Get freight quotes from v1.0 API
        const ratesResponse = await axios.post(
            'https://www.freightview.com/api/v1.0/rates',
            {
                pickupDate: pickupDate,
                originPostalCode: origin_zip,
                destPostalCode: destination_zip,
                items: [{
                    weight: weight,
                    freightClass: parseInt(freight_class) || 85,
                    length: 48,
                    width: 40,
                    height: height,
                    quantity: 1,
                    description: product_name || 'Furniture'
                }],
                accessorials: [
                    'LIFTGATE_DELIVERY',
                    'INSIDE_DELIVERY',
                    'RESIDENTIAL_DELIVERY'
                ]
            },
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
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
            parseFloat(rate.total) < parseFloat(min.total) ? rate : min
        );
        
        res.json({
            success: true,
            rates: rates,
            cheapest: {
                total_cost: cheapest.total,
                carrier_name: cheapest.carrierName || cheapest.carrier || 'Carrier',
                transit_days: cheapest.estimatedTransitDays || cheapest.transitDays || 'N/A',
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
    console.log('FreightView API key loaded:', !!FREIGHTVIEW_API_KEY);
});