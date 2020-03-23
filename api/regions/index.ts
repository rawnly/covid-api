import { NowRequest, NowResponse } from '@now/node';
import { fetchRegionsData, fetchRegionsDataSimple } from '../_util/agent';
import { cacheFunction } from '../_util/cache';

export default async (req: NowRequest, res: NowResponse) => {
	try {
		let response: any = null;

		if (req.query.plain == 'true') {
			response = await cacheFunction('15m')(fetchRegionsDataSimple);
		} else {
			response = await cacheFunction('15m')(fetchRegionsData);
		}

		return res.send(response);
	} catch (error) {
		return res.status(500).send(error);
	}
};
