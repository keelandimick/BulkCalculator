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
// Environment: 'sandbox' or 'production'
const UBER_FREIGHT_ENV = process.env.UBER_FREIGHT_ENV || 'production';
const UBER_FREIGHT_API_BASE = UBER_FREIGHT_ENV === 'sandbox'
    ? 'https://sandbox-api.uber.com'
    : 'https://api.uber.com';
const UBER_FREIGHT_CUSTOMER_ID = UBER_FREIGHT_ENV === 'sandbox'
    ? 'LTL-API-TEST'
    : process.env.UBER_FREIGHT_CUSTOMER_ID || 'LTL-API-TEST';

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

        // Generate unique quote_id with timestamp to avoid caching issues
        const uniqueQuoteId = `QUILL-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

        // Calculate timestamps (Unix format in seconds)
        const now = Math.floor(Date.now() / 1000);
        const pickupTime = now + 86400; // +1 day
        const deliveryTime = now + 259200; // +3 days

        // Build item details for stops
        const itemDetails = {
            package_count: {
                type: "PALLET",
                count: 1
            },
            name: product_name || "Furniture - General Freight",
            special_handling_types: ["STK"], // Stackable
            freight_class: freight_class || "85",
            weight: {
                amount: weight,
                unit: "LB"
            },
            dimensions: {
                length: 48,
                width: 40,
                height: height || 48,
                unit: "IN"
            }
        };

        // Prepare LTL quote request using official UberFreight v2 API format
        const quoteRequest = {
            quote_id: uniqueQuoteId,
            customer_id: UBER_FREIGHT_CUSTOMER_ID,
            shipping_modes: ["LTL"],
            requirements: {
                vehicle_type: "DRY"
            },
            stops: [
                {
                    sequence_number: 1,
                    type: "PICKUP",
                    mode: "LIVE",
                    facility: {
                        name: "Origin Warehouse",
                        address: {
                            line1: "",
                            city: "",
                            principal_subdivision: "",
                            postal_code: origin_zip,
                            country: "USA"
                        }
                    },
                    appointment: {
                        status: "NEEDED",
                        start_time_utc: pickupTime,
                        end_time_utc: pickupTime
                    },
                    items: [itemDetails]
                },
                {
                    sequence_number: 2,
                    type: "DROPOFF",
                    mode: "LIVE",
                    facility: {
                        name: "Destination",
                        address: {
                            line1: "",
                            city: "",
                            principal_subdivision: "",
                            postal_code: destination_zip,
                            country: "USA"
                        }
                    },
                    appointment: {
                        status: "NEEDED",
                        start_time_utc: deliveryTime,
                        end_time_utc: deliveryTime
                    },
                    items: [itemDetails]
                }
            ]
        };

        // Get instant quote from v2 API
        const apiUrl = `${UBER_FREIGHT_API_BASE}/v2/freight/loads/quotes`;
        console.log('API URL:', apiUrl);
        console.log('Request payload:', JSON.stringify(quoteRequest, null, 2));

        const quoteResponse = await axios.post(
            apiUrl,
            quoteRequest,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        
        // Process Uber Freight v2 API response
        const responseData = quoteResponse.data;

        console.log('Uber Freight API Response:', JSON.stringify(responseData, null, 2));

        // v2 API returns quotes in a different format
        const quotes = responseData.quotes || [];

        if (quotes.length === 0) {
            throw new Error('No quotes available for this route');
        }

        // Format response - v2 API structure
        const formattedRates = quotes.map(quote => ({
            carrier: quote.carrier?.name || 'Uber Freight Network',
            service: quote.service_level || 'Standard LTL',
            total: quote.all_in_rate?.amount || quote.total_cost,
            currency: quote.all_in_rate?.currency || 'USD',
            transit_days: quote.transit_time_days || 'N/A',
            scac: quote.carrier?.scac || 'UBER',
            quote_id: quote.quote_id || uniqueQuoteId,
            line_items: quote.line_items || []
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
            },
            quote_id: uniqueQuoteId
        });
        
    } catch (error) {
        console.error('Freight quote error:', error.message);
        console.error('Full error:', error.response?.data || error);
        res.status(500).json({
            success: false,
            error: 'Failed to get freight quote',
            message: error.message,
            details: error.response?.data || null
        });
    }
});

// Enhanced freight quote endpoint with full address support
app.post('/api/freight-quote-enhanced', async (req, res) => {
    try {
        const {
            origin, // { line1, city, state, postal_code, country }
            destination, // { line1, city, state, postal_code, country }
            items, // [{ name, weight, height, length, width, freight_class, pallet_count }]
            shipping_mode, // 'LTL', 'FTL', or 'IMDL'
            pickup_date, // Optional: Unix timestamp or ISO string
            accessorials // Optional: ['LIFTGATE', 'RESIDENTIAL', etc.]
        } = req.body;

        // Get OAuth token
        const token = await getAccessToken();

        const uniqueQuoteId = `QUILL-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

        // Calculate timestamps
        const now = Math.floor(Date.now() / 1000);
        const pickupTime = pickup_date ?
            (typeof pickup_date === 'string' ? Math.floor(new Date(pickup_date).getTime() / 1000) : pickup_date) :
            now + 86400;
        const deliveryTime = pickupTime + 172800; // +2 days from pickup

        // Map accessorials to special handling types
        const specialHandling = accessorials?.length ? accessorials : ["STK"];

        // Build items array
        const formattedItems = (items || [{ name: 'General Freight', weight: 100, pallet_count: 1 }]).map(item => ({
            package_count: {
                type: "PALLET",
                count: item.pallet_count || 1
            },
            name: item.name || "General Freight",
            special_handling_types: specialHandling,
            freight_class: item.freight_class || "85",
            weight: {
                amount: item.weight || 100,
                unit: "LB"
            },
            dimensions: {
                length: item.length || 48,
                width: item.width || 40,
                height: item.height || 48,
                unit: "IN"
            }
        }));

        const quoteRequest = {
            quote_id: uniqueQuoteId,
            customer_id: UBER_FREIGHT_CUSTOMER_ID,
            shipping_modes: [shipping_mode || "LTL"],
            requirements: {
                vehicle_type: "DRY"
            },
            stops: [
                {
                    sequence_number: 1,
                    type: "PICKUP",
                    mode: "LIVE",
                    facility: {
                        name: origin?.name || "Origin",
                        address: {
                            line1: origin?.line1 || "",
                            city: origin?.city || "",
                            principal_subdivision: origin?.state || "",
                            postal_code: origin?.postal_code || "",
                            country: origin?.country || "USA"
                        }
                    },
                    appointment: {
                        status: "NEEDED",
                        start_time_utc: pickupTime,
                        end_time_utc: pickupTime
                    },
                    items: formattedItems
                },
                {
                    sequence_number: 2,
                    type: "DROPOFF",
                    mode: "LIVE",
                    facility: {
                        name: destination?.name || "Destination",
                        address: {
                            line1: destination?.line1 || "",
                            city: destination?.city || "",
                            principal_subdivision: destination?.state || "",
                            postal_code: destination?.postal_code || "",
                            country: destination?.country || "USA"
                        }
                    },
                    appointment: {
                        status: "NEEDED",
                        start_time_utc: deliveryTime,
                        end_time_utc: deliveryTime
                    },
                    items: formattedItems
                }
            ]
        };

        console.log('Enhanced quote request:', JSON.stringify(quoteRequest, null, 2));

        const apiUrl = `${UBER_FREIGHT_API_BASE}/v2/freight/loads/quotes`;
        const quoteResponse = await axios.post(apiUrl, quoteRequest, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const quotes = quoteResponse.data.quotes || [];

        if (quotes.length === 0) {
            throw new Error('No quotes available for this route');
        }

        const formattedRates = quotes.map(quote => ({
            carrier: quote.carrier?.name || 'Uber Freight Network',
            service: quote.service_level || 'Standard',
            total: quote.all_in_rate?.amount || quote.total_cost,
            currency: quote.all_in_rate?.currency || 'USD',
            transit_days: quote.transit_time_days || 'N/A',
            scac: quote.carrier?.scac || 'UBER',
            quote_id: quote.quote_id || uniqueQuoteId
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
            },
            quote_id: uniqueQuoteId
        });

    } catch (error) {
        console.error('Enhanced freight quote error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to get freight quote',
            message: error.message,
            details: error.response?.data || null
        });
    }
});

// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'freight-proxy',
        provider: 'Uber Freight',
        api_version: 'v2',
        environment: UBER_FREIGHT_ENV,
        api_base: UBER_FREIGHT_API_BASE,
        customer_id: UBER_FREIGHT_CUSTOMER_ID,
        supported_modes: ['LTL', 'FTL', 'IMDL'],
        features: ['ltl-quotes', 'ftl-quotes', 'imdl-quotes', 'real-time-pricing', 'full-address-support']
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Freight Proxy Server - Uber Freight v2 API Integration`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${UBER_FREIGHT_ENV.toUpperCase()}`);
    console.log(`API Base URL: ${UBER_FREIGHT_API_BASE}`);
    console.log(`Customer ID: ${UBER_FREIGHT_CUSTOMER_ID}`);
    console.log(`API Version: v2`);
    console.log(`Supported Modes: LTL, FTL, IMDL`);
    console.log(`\nAvailable endpoints:`);
    console.log(`  POST /api/freight-quote          - Simple quote (zip-to-zip)`);
    console.log(`  POST /api/freight-quote-enhanced - Full address quote`);
    console.log(`  GET  /health                     - Health check`);
    console.log(`\nCredentials configured: ${UBER_FREIGHT_CLIENT_ID ? '✓' : '✗'}`);
    console.log(`${'='.repeat(60)}\n`);
});