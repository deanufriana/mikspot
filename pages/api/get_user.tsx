import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../../configs/mikrotik'

export default (req: NextApiRequest, res: NextApiResponse) => {

    const { userProfile } = req.body
    console.log('conn', userProfile)
    const configs = []
    if (userProfile != 'All') configs.push(`?profile=${userProfile}`)
    conn.write("/ip/hotspot/user/print", configs)
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.status(401).json(err)
        })
}