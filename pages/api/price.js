// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default async function handler(req, res) {
  try {
    const { body = {} } = req;

    const response = await axios({
      method: 'post',
      url: `${process.env.DIAMOND_API}/price`,
      data: { ...body },
    });

    res.status(200).json({ ...response.data });
  } catch (e) {
    console.log(e);

    if (e.response) {
      res.status(200).json({ success: false, msg: e.response.data.msg });
    }
  }
}
