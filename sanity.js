import sanityClient from "@sanity/client";
import imgUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    projectId: 'd9funzlh',
    dataset: 'production',
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imgUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;