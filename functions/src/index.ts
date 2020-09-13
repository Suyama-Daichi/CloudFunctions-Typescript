import * as functions from 'firebase-functions';
import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getAddress = functions.https.onRequest(async (request, response) => {
    const baseRequest = axios.create({
        baseURL: `https://zipcloud.ibsnet.co.jp/api`,
        responseType: 'json'
    });

    await baseRequest.get('search', {
        params: {
            zipcode: request.query.zipcode
        }
    })
        .then(res => {
            functions.logger.info((res.data), { structuredData: true });
            response.send((res.data));
        })
        .catch(e => {
            console.error(e);
            response.status(500).send({
                message: 'Error'
            });
        });
});
