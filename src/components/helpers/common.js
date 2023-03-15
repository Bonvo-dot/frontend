import axios from "axios";

export async function getMetadataJSON(propertyMetadataUri) {
    const metadataResponse = await axios.get(propertyMetadataUri, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    });
    const metadataBlob = metadataResponse.data;
    const metadataJSON = JSON.parse(await metadataBlob.text());
    return metadataJSON;
}