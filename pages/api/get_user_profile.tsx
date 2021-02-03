import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../configs/mikrotik'

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log('conn')
    const { parameter, value } = req.body
    conn.write("/ip/hotspot/user/profile/print")
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.status(401).json(err)
        })
}