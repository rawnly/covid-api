import fetch from 'isomorphic-unfetch';
import groupBy from 'lodash/groupBy';
import isEqual from'lodash/isEqual'

import { ProvinceData, NationalData, RegionData, Dict } from './typings';

type ProvincesResponse = Dict<string, Dict<string, ProvinceData[]>>;
type RegionsResponse = Dict<string, RegionData[]>;
type NationalResponse = NationalData[];

const ENDPOINT = `https://api.github.com/repos/pcm-dpc/COVID-19/contents`;


const decodeBase64 = (base64: string) => Buffer.from(base64, 'base64').toString();

export const fetchRegionsData = async (): Promise<RegionsResponse> => {
	const response = await fetch(ENDPOINT + '/dati-json/dpc-covid19-ita-regioni.json');
	const data = await response.json();
	const content: RegionData[] = JSON.parse(decodeBase64(data.content));
	const groupedByRegion: RegionsResponse = groupBy(content, 'denominazione_regione');

	return groupedByRegion;
};

export const fetchRegionData = (regionName:string) => async (): Promise<ProvincesResponse> => {
	const apiResponse = await fetch(ENDPOINT + `/dati-json/dpc-covid19-ita-province.json`);
	const data = await apiResponse.json();

	let content: ProvinceData[] = JSON.parse(decodeBase64(data.content));
	content = content.filter((item) => item.denominazione_provincia !== 'In fase di definizione/aggiornamento');
	const groupedByRegion: any = groupBy(content, 'denominazione_regione');

	let response: any = {
		status: 404,
		title: 'Not Found',
		message: 'Region not found'
	};

	for (const region in groupedByRegion) {
		if (isEqual(region,regionName) && groupedByRegion.hasOwnProperty(region)) {
			response = groupBy(groupedByRegion[region], 'denominazione_provincia');
		}
	}

	return response;
};

export const fetchProvincesData = async (): Promise<ProvincesResponse> => {
	const response = await fetch(ENDPOINT + `/dati-json/dpc-covid19-ita-province.json`);
	const data = await response.json();

	let content: ProvinceData[] = JSON.parse(decodeBase64(data.content));
	content = content.filter((item) => item.denominazione_provincia !== 'In fase di definizione/aggiornamento');
	const groupedByRegion: any = groupBy(content, 'denominazione_regione');

	for (const region in groupedByRegion) {
		if (groupedByRegion.hasOwnProperty(region)) {
			groupedByRegion[region] = groupBy(groupedByRegion[region], 'denominazione_provincia');
		}
	}

	return groupedByRegion;
};

export const fetchNationalData = async (): Promise<NationalResponse> => {
	const response = await fetch(ENDPOINT + '/dati-json/dpc-covid19-ita-andamento-nazionale.json');

	const data = await response.json();

	return JSON.parse(new Buffer(data.content, 'base64').toString());
};
