import fetch from '../../../src/utils/Fetch';
import response from '../../../src/utils/Response';

const handler = (req, res) => (
    new Promise((resolve, reject) => {
        req.fetch(`${process.env.API_DOMAIN_URL}/api/auth/resetPassword`)
            .then(response)
            .then((data) => {
                res.status(200).json(data);
                resolve();
            })
            .catch((error) => {
                error.then((data) => {
                    res.status(error.status || 500).json(data);
                    reject();
                });
            });
    })
);

export default fetch(handler);