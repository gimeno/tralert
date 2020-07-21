/**
 * The bundles here are configured so that each locale only requires loading a single webpack chunk.
 */

const bundles = {
    es: () => import(/* webpackChunkName: "es" */ './translations/es.json'),
    en: () => import(/* webpackChunkName: "en" */ './translations/en.json')
};

// generate whitelist for i18next
export const availableLocales = Object.keys(bundles);

export default bundles;
