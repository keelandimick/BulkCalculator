const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Uber Freight API configuration
const UBER_FREIGHT_CLIENT_ID = process.env.UBER_FREIGHT_CLIENT_ID;
const UBER_FREIGHT_CLIENT_SECRET = process.env.UBER_FREIGHT_CLIENT_SECRET;
const UBER_FREIGHT_API_BASE = 'https://api.uber.com/v1/freight';

// OAuth token storage
let accessToken = null;
let tokenExpiry = null;

// Function to get OAuth access token
async function getAccessToken() {
    // Check if we have a valid token
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
        return accessToken;
    }
    
    console.log('Getting OAuth token from Uber...');
    
    try {
        // Use client credentials flow for server-to-server auth
        const formData = new URLSearchParams();
        formData.append('client_id', UBER_FREIGHT_CLIENT_ID);
        formData.append('client_secret', UBER_FREIGHT_CLIENT_SECRET);
        formData.append('grant_type', 'client_credentials');
        formData.append('scope', 'freight.loads'); // This scope needs to be granted by Frank
        
        const tokenResponse = await axios.post(
            'https://auth.uber.com/oauth/v2/token',
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        accessToken = tokenResponse.data.access_token;
        // Set expiry to 5 minutes before actual expiry
        const expiresIn = tokenResponse.data.expires_in || 3600;
        tokenExpiry = new Date(Date.now() + (expiresIn - 300) * 1000);
        
        console.log('OAuth token obtained successfully');
        return accessToken;
    } catch (error) {
        console.error('Failed to get OAuth token:', error.response?.data || error.message);
        throw new Error('Failed to authenticate with Uber - waiting for freight.loads scope approval');
    }
}

// Uber Freight quote endpoint
app.post('/api/freight-quote', async (req, res) => {
    try {
        const { origin_zip, destination_zip, weight, height, freight_class, product_name } = req.body;
        
        // For development/testing, return mock data
        // Uber Freight typically provides instant pricing
        console.log('Processing freight quote request:', {
            origin: origin_zip,
            destination: destination_zip,
            weight: weight,
            dimensions: { height }
        });
        
        // Try live API first, fall back to mock if not ready
        let useLiveAPI = false;
        if (UBER_FREIGHT_CLIENT_ID && UBER_FREIGHT_CLIENT_ID !== 'your_client_id_here') {
            try {
                // Test if we can get a token (this will fail if scope not granted)
                await getAccessToken();
                useLiveAPI = true;
                console.log('Using live Uber Freight API');
            } catch (error) {
                console.log('Live API not ready:', error.message);
                console.log('Using mock data until freight.loads scope is granted');
            }
        }
        
        if (!useLiveAPI) {
            // Mock response structure based on Uber Freight's instant pricing
            const baseRate = weight * 0.82; // Uber Freight typically competitive
            
            const mockRates = [
            {
                carrier: 'Uber Freight Network',
                service: 'Instant',
                total: baseRate.toFixed(2),
                transit_days: '2-3',
                scac: 'UBER',
                features: ['Real-time tracking', 'Instant booking', 'Digital POD']
            },
            {
                carrier: 'Partner Carrier - Priority',
                service: 'Express',
                total: (baseRate * 1.15).toFixed(2),
                transit_days: '1-2',
                scac: 'EXPR'
            },
            {
                carrier: 'Partner Carrier - Economy',
                service: 'Standard',
                total: (baseRate * 0.90).toFixed(2),
                transit_days: '3-5',
                scac: 'ECON'
            }
        ];
        
        const cheapest = mockRates.reduce((min, rate) => 
            parseFloat(rate.total) < parseFloat(min.total) ? rate : min
        );
        
            res.json({
                success: true,
                rates: mockRates,
                cheapest: {
                    total_cost: cheapest.total,
                    carrier_name: cheapest.carrier,
                    transit_days: cheapest.transit_days,
                    scac: cheapest.scac
                },
                note: 'Using mock data. Waiting for freight.loads scope approval from Uber.'
            });
            return;
        }
        
        // Live API implementation
        
        // Get OAuth token
        const token = await getAccessToken();
        
        // Prepare load request for Uber Freight
        const loadRequest = {
            pickup: {
                location: {
                    postal_code: origin_zip,
                    country_code: 'US'
                },
                window: {
                    start_time: new Date().toISOString(),
                    end_time: new Date(Date.now() + 86400000).toISOString() // +1 day
                }
            },
            delivery: {
                location: {
                    postal_code: destination_zip,
                    country_code: 'US'
                },
                window: {
                    start_time: new Date(Date.now() + 86400000).toISOString(), // +1 day
                    end_time: new Date(Date.now() + 259200000).toISOString() // +3 days
                }
            },
            commodities: [{
                description: product_name || 'General Freight',
                weight: {
                    value: weight,
                    unit: 'LB'
                },
                dimensions: {
                    length: 48,
                    width: 40,
                    height: height,
                    unit: 'IN'
                },
                quantity: 1,
                freight_class: freight_class || '85'
            }],
            equipment_type: 'DRY_VAN',
            accessorials: [
                'LIFTGATE_DELIVERY',
                'INSIDE_DELIVERY',
                'RESIDENTIAL'
            ]
        };
        
        // Get instant quote
        const quoteResponse = await axios.post(
            `${UBER_FREIGHT_API_BASE}/quotes`,
            loadRequest,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        
        // Process Uber Freight response
        const quotes = quoteResponse.data.quotes || [];
        
        if (quotes.length === 0) {
            throw new Error('No quotes available for this route');
        }
        
        // Format response
        const formattedRates = quotes.map(quote => ({
            carrier: quote.carrier_name || 'Uber Freight',
            service: quote.service_type || 'Standard',
            total: quote.total_price.amount,
            transit_days: quote.estimated_transit_days || 'N/A',
            scac: quote.scac || 'UBER',
            quote_id: quote.quote_id
        }));
        
        const cheapest = formattedRates.reduce((min, rate) => 
            parseFloat(rate.total) < parseFloat(min.total) ? rate : min
        );
        
        res.json({
            success: true,
            rates: formattedRates,
            cheapest: {
                total_cost: cheapest.total,
                carrier_name: cheapest.carrier,
                transit_days: cheapest.transit_days,
                scac: cheapest.scac,
                quote_id: cheapest.quote_id
            }
        });
        
    } catch (error) {
        console.error('Freight quote error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to get freight quote',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        service: 'freight-proxy',
        provider: 'Uber Freight',
        features: ['instant-pricing', 'real-time-tracking', 'digital-pod']
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Freight proxy server running on port ${PORT}`);
    console.log('Uber Freight API integration ready');
    console.log('To enable live quotes:');
    console.log('1. Sign up at https://developer.uberfreight.com');
    console.log('2. Create an app and get your Client ID and Secret');
    console.log('3. Add credentials to .env file');
});