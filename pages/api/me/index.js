import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
    try {
        const r = await fetch('https://sv443.net/jokeapi/category/Any');
        res.status(200).json({r});
    } catch (error) {
        res.status(error.status || 500).end(error.message);
    }
};