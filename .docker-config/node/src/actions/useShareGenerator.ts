export const sharePlatforms = {
    FACEBOOK: 'FACEBOOK',
    TWITTER: 'TWITTER',
    PINTEREST: 'PINTEREST',
    EMAIL: 'EMAIL',
    COPY_URL: 'COPY_URL'
};

/** Generates the shareable link for a page. Link should be off base url of the site
 * @param {string} link - link to be shared
 */
export const createShareForPlatform = (link: string, title: string, text: string, platform: 'FACEBOOK' | 'TWITTER' | 'LINKEDIN') => {

    const shareableText = generateShareableText(link, title, text);
    const shareableLink = generateSharePlatformLink(platform, shareableText);

    return shareableLink;
}

/** Generates the Zerochass url for the passed link
 * @param {string} link - link to be shared
 */
const createUrl = (link) => {
    console.log(`The root link`,process.env);
    return `${process.env.CANONICAL_ROOT}/${link}`;
}


const generateShareableText = (link: string, title: string, text: string) => {

    // Setup share items
    const url = createUrl(link);
    const companyName = `Zerochass`;
    const hashtags = ['Zerochass', 'WebDevelopment', 'SoftwareEngineering'];

    hashtags.push(`${companyName.split(' ').join('').split('-').join('')}`);

    return { url, title, companyName, hashtags, text };
}

/** Generates the sharing link for the specified platform
 * @param {string} platform - platform to share on
 * @param {object} shareObject - share object containing items needed for sharing
 */
const generateSharePlatformLink = (platform, { url, title, companyName, hashtags }) => {

    switch (platform) {
        case sharePlatforms.FACEBOOK: {
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        }

        case sharePlatforms.TWITTER: {
            const text = title.split(' ').join('+');
            const via = `zerochass`;
            return `https://twitter.com/intent/tweet?&text=${text}&via=${via}&url=${url}&hashtags=${hashtags.join()}`
        }

        case sharePlatforms.EMAIL: {
            const body = `${title} – ${url}`;

            return `mailto:?body=${body}&subject=${title}`;
        }

        case sharePlatforms.COPY_URL: {
            return url;
        }

        /* case sharePlatforms.PINTEREST: {
            return `http://pinterest.com/pin/create/link/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(imageUrl)}`
        } */

        default: return null;
    }
}

export const useShareGenerator = () => {

};