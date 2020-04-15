// import Http from '../../../utils/Http';

export default async (req, res) => {
    try {
        console.log(req.headers.cookie);
        // const r = await Http.get('/api/me');
        res.status(200).json({});
    } catch (error) {
        res.status(error.status || 500).end(error.message);
    }
};