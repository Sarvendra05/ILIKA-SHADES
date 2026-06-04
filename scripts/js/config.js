// ==========================================
// Supabase Configuration Credential Settings
// Credentials are loaded from .env via Vite
// ==========================================

window.SUPABASE_CONFIG = {
    url: __SUPABASE_URL__,
    anonKey: __SUPABASE_ANON_KEY__
};
