// Which Supabase project the PUBLIC pages read from. Chosen at build time from Netlify's CONTEXT:
//   production (main branch -> antarshanti.co.in)  => production database
//   anything else (staging, feature branches, pull-request previews, local) => TEST database
// Publishable keys are safe to be public; row-level security protects the data.
const PROD = { url: 'https://kntohzyxzoucymrmriva.supabase.co', key: 'sb_publishable_llW9rx_MQwoEg-gVuWncDg_KtqkUH6G' };
const TEST = { url: 'https://rnofqxmfwqiogtlchkbp.supabase.co', key: 'sb_publishable_9QUwPjzZJ81Fk0d3trBO2w_yYuXnsQz' };

const context = process.env.CONTEXT || 'local';
module.exports = { context, isProduction: context === 'production', supabase: context === 'production' ? PROD : TEST };
