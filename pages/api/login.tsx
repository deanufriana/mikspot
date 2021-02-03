// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../configs/mikrotik'

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {


    if (req.method == 'POST') {
      const { host, user, password } = req.body

      conn.host = host
      conn.user = user
      conn.password = password

      conn.connect()
        .then(() => {
          console.log('connect')
          res.status(200).json({ success: true })
        }).catch((err) => {
          console.log('err')
          res.status(401).json(JSON.stringify(err))
        })
    }
  })
}
