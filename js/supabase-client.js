// ==========================================
// Shared Supabase client and fetching helpers
// ==========================================

(function() {
    // 1. Ensure supabase-js script is loaded
    function ensureSupabaseLoaded(callback) {
        if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient !== 'undefined') {
            callback();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            callback();
        };
        document.head.appendChild(script);
    }

    ensureSupabaseLoaded(() => {
        const config = window.SUPABASE_CONFIG;
        if (!config || !config.url) {
            console.error("Supabase connection is not configured. Please edit js/config.js with your project credentials.");
            // We no longer fallback to mock data. 
            // The app requires a real Supabase backend to function.
            alert("Database connection is missing. Please configure js/config.js with your Supabase credentials.");
            return;
        }

        try {
            const client = window.supabase.createClient(config.url, config.anonKey);
            // Export the initialized client to global window
            window.supabaseClient = client;
            exposeProductionHelpers(client);
        } catch (e) {
            console.error("Failed to initialize Supabase client:", e);
        }
    });

    // Expose helpers using the production client
    function exposeProductionHelpers(supabase) {
        window.ilika = {
            isConfigured: true,
            
            // Get business settings (address, hero details, tagline, email, phone)
            getBusinessInfo: async () => {
                const { data, error } = await supabase
                    .from('business_info')
                    .select('*')
                    .eq('id', 1)
                    .single();
                if (error) {
                    console.error("Error fetching BusinessInfo:", error);
                    return null;
                }
                return data;
            },

            // Get categories
            getCategories: async () => {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*')
                    .order('name', { ascending: true });
                if (error) {
                    console.error("Error fetching categories:", error);
                    return [];
                }
                return data;
            },

            // Get products with their associated images
            getProducts: async (options = {}) => {
                let query = supabase
                    .from('products')
                    .select(`
                        *,
                        categories (id, name),
                        product_images (*)
                    `)
                    .order('created_at', { ascending: false });

                if (options.featured === true) {
                    query = query.eq('featured', true);
                }
                if (options.categoryId) {
                    query = query.eq('category_id', options.categoryId);
                }

                const { data, error } = await query;
                if (error) {
                    console.error("Error fetching products:", error);
                    return [];
                }

                // If a search query is specified, perform client-side filter
                let results = data || [];
                if (options.searchQuery) {
                    const q = options.searchQuery.toLowerCase().trim();
                    results = results.filter(p => 
                        (p.name && p.name.toLowerCase().includes(q)) || 
                        (p.description && p.description.toLowerCase().includes(q))
                    );
                }

                // Sort images by position index
                results.forEach(p => {
                    if (p.product_images) {
                        p.product_images.sort((a, b) => a.position - b.position);
                    }
                });

                return results;
            }
        };

        // Dispatch initialized event
        document.dispatchEvent(new CustomEvent('ilika-init'));
    }
})();
