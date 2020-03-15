export interface ProvinceData {
	data: string;
	stato: string;
	codice_regione: number;
	denominazione_regione: string;
	codice_provincia: number;
	denominazione_provincia: string;
	sigla_provincia: string;
	lat: number;
	long: number;
	totale_casi: number;
}

export interface RegionData {
	data: string;
	stato: string;
	codice_regione: number;
	denominazione_regione: string;
	lat: number;
	long: number;
	ricoverati_con_sintomi: number;
	terapia_intensiva: number;
	totale_ospedalizzati: number;
	isolamento_domiciliare: number;
	totale_attualmente_positivi: number;
	nuovi_attualmente_positivi: number;
	dimessi_guariti: number;
	deceduti: number;
	totale_casi: number;
	tamponi: number;
}

export interface NationalData {
	data: Date;
	stato: string;
	ricoverati_con_sintomi: number;
	terapia_intensiva: number;
	totale_ospedalizzati: number;
	isolamento_domiciliare: number;
	totale_attualmente_positivi: number;
	nuovi_attualmente_positivi: number;
	dimessi_guariti: number;
	deceduti: number;
	totale_casi: number;
	tamponi: number;
}

export type Dict<K extends string | number, U> = { [key in K]: U };