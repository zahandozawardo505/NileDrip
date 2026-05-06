// JS/supabase-config.js
const SUPABASE_CONFIG = {
    URL: 'https://txmhchiryymmtxqevuip.supabase.co',
    KEY: 'Fof7bXUU5dvO2Wek'
};

let supabaseClient = null;

(function() {
    try {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);
            console.log("⚡ NileDrip Cloud Backend: Connected");
        } else {
            console.error("Supabase CDN script not loaded correctly.");
        }
    } catch (error) {
        console.error("Error during Supabase initialization:", error);
    }
})();
