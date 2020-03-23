import fetch from 'isomorphic-unfetch';
import groupBy from 'lodash/groupBy';
import first from 'lodash/first';
import last from 'lodash/last';
import isEqual from 'lodash/isEqual';

import { ProvinceData, NationalData, RegionData, Dict } from './typings';

type ProvincesResponse = Dict<string, Dict<string, ProvinceData[]>>;
type RegionsResponse = Dict<string, RegionData[]>;
type NationalResponse = NationalData[];

const ENDPOINT = `https://api.github.com/repos/pcm-dpc/COVID-19/contents`;

const decodeBase64 = (base64: string) => Buffer.from(base64, 'base64').toString();
const equals = (a: string, b: string): boolean => isEqual(a.trim().toLowerCase(), b.trim().toLowerCase());

export const fetchRegionsData = async (): Promise<RegionsResponse> => {
	const response = await fetch(ENDPOINT + '/dati-json/dpc-covid19-ita-regioni.json');
	const data = await response.json();
	const content: RegionData[] = JSON.parse(decodeBase64(data.content));
	const groupedByRegion: RegionsResponse = groupBy(content, 'denominazione_regione');

	return groupedByRegion;
};

export const fetchRegionsDataSimple = async () => {
	const response = await fetch(ENDPOINT + '/dati-json/dpc-covid19-ita-regioni.json');
	const data = await response.json();
	const content: RegionData[] = JSON.parse(decodeBase64(data.content));
	const groupedByRegion: RegionsResponse = groupBy(content, 'denominazione_regione');

	return Object.keys(groupedByRegion).map((k) =>
		first(groupedByRegion[k].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())),
	);
};

export const fetchRegionData = (regionName: string) => async (): Promise<ProvincesResponse> => {
	const apiResponse = await fetch(ENDPOINT + `/dati-json/dpc-covid19-ita-province.json`);
	const data = await apiResponse.json();

	let content: ProvinceData[] = JSON.parse(decodeBase64(data.content));
	content = content.filter((item) => item.denominazione_provincia !== 'In fase di definizione/aggiornamento');
	const regionData = content.filter(
		(el) => equals(el.denominazione_regione, regionName) || equals(`${el.codice_regione}`, regionName),
	);

	let response: any = {
		status: 404,
		title: 'Not Found',
		message: 'Region not found',
	};

	if (regionData.length) {
		response = regionData;
	}

	return response;
};

export const fetchProvinceData = (provinceName: string) => async (): Promise<ProvinceData[]> => {
	const response = await fetch(ENDPOINT + `/dati-json/dpc-covid19-ita-province.json`);
	const data = await response.json();

	return JSON.parse(decodeBase64(data.content)).filter(
		(el) =>
			equals(`${el.codice_provincia}`, provinceName) ||
			equals(el.sigla_provincia, provinceName) ||
			equals(el.denominazione_provincia, provinceName),
	);
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
