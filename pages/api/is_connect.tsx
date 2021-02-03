import { conn } from '../../configs/mikrotik'

export default (req, res) => {
    if (req.method == 'POST') {
        res.json({ isconnect: conn.connected })
    }
}
