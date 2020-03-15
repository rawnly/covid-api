import { NowRequest, NowResponse } from '@now/node'
import { fetchProvinceData } from '../../_util/agent'
import { cacheFunction } from '../../_util/cache'

export default async (req: NowRequest, res: NowResponse) => {
    try {
		const response = await cacheFunction('15m')(fetchProvinceData(req.query.province_name as string));
		return res.send(response);
	} catch (error) {
		return res.status(500).send(error);
	}
}