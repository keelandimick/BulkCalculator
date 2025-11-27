const axios = require('axios');

// Uber Freight API configuration from environment variables
const UBER_FREIGHT_CLIENT_ID = process.env.UBER_FREIGHT_CLIENT_ID;
const UBER_FREIGHT_CLIENT_SECRET = process.env.UBER_FREIGHT_CLIENT_SECRET;
const UBER_FREIGHT_ENV = process.env.UBER_FREIGHT_ENV || 'production';
const UBER_FREIGHT_API_BASE = UBER_FREIGHT_ENV === 'sandbox'
    ? 'https://sandbox-api.uber.com'
    : 'https://api.uber.com';
const UBER_FREIGHT_CUSTOMER_ID = UBER_FREIGHT_ENV === 'sandbox'
    ? 'LTL-API-TEST'
    : process.env.UBER_FREIGHT_CUSTOMER_ID || 'LTL-API-TEST';

// In-memory token cache (persists across warm function invocations)
let accessToken = null;
let tokenExpiry = null;

// Get OAuth access token
async function getAccessToken() {
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
        return accessToken;
    }

    console.log('Getting OAuth token from Uber...');

    const formData = new URLSearchParams();
    formData.append('client_id', UBER_FREIGHT_CLIENT_ID);
    formData.append('client_secret', UBER_FREIGHT_CLIENT_SECRET);
    formData.append('grant_type', 'client_credentials');
    formData.append('scope', 'freight.loads');

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
    const expiresIn = tokenResponse.data.expires_in || 3600;
    tokenExpiry = new Date(Date.now() + (expiresIn - 300) * 1000);

    console.log('OAuth token obtained successfully');
    return accessToken;
}

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Set CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    try {
        const { origin_zip, destination_zip, weight, height, freight_class, product_name } = req.body;

        console.log('Processing freight quote request:', {
            origin: origin_zip,
            destination: destination_zip,
            weight,
            height
        });

        // Check if credentials are configured
        let useLiveAPI = false;
        if (UBER_FREIGHT_CLIENT_ID && UBER_FREIGHT_CLIENT_ID !== 'your_client_id_here') {
            try {
                await getAccessToken();
                useLiveAPI = true;
                console.log('Using live Uber Freight API');
            } catch (error) {
                console.log('Live API not ready:', error.message);
            }
        }

        if (!useLiveAPI) {
            // Mock response until API is configured
            const baseRate = weight * 0.82;
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

            return res.status(200).json({
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
        }

        // Live API implementation using official UberFreight v2 format
        const token = await getAccessToken();
        const uniqueQuoteId = `QUILL-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

        // Unix timestamps (seconds)
        const now = Math.floor(Date.now() / 1000);
        const pickupTime = now + 86400; // +1 day
        const deliveryTime = now + 259200; // +3 days

        // Build item details
        const itemDetails = {
            package_count: {
                type: "PALLET",
                count: 1
            },
            name: product_name || "Furniture - General Freight",
            special_handling_types: ["STK"],
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

        // Official UberFreight v2 API format
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

        const apiUrl = `${UBER_FREIGHT_API_BASE}/v2/freight/loads/quotes`;
        console.log('API URL:', apiUrl);
        console.log('Request payload:', JSON.stringify(quoteRequest, null, 2));

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
            service: quote.service_level || 'Standard LTL',
            total: quote.all_in_rate?.amount || quote.total_cost,
            currency: quote.all_in_rate?.currency || 'USD',
            transit_days: quote.transit_time_days || 'N/A',
            scac: quote.carrier?.scac || 'UBER',
            quote_id: quote.quote_id || uniqueQuoteId
        }));

        const cheapest = formattedRates.reduce((min, rate) =>
            parseFloat(rate.total) < parseFloat(min.total) ? rate : min
        );

        return res.status(200).json({
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
        return res.status(500).json({
            success: false,
            error: 'Failed to get freight quote',
            message: error.message,
            details: error.response?.data || null
        });
    }
};
