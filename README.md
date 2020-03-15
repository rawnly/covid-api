# COVID API
Un semplice servizio REST per monitorare i dati forniti dal Ministero Della Salute

## Endpoints
- /api
    - Restituisce i dati a livello nazionale

- /api/regions
    - Restituisce i dati raggruppati per regione

- /api/regions/<nome_regione|codice_regione>
    - Dettaglio Regione
    
- /api/regions/<nome_regione|codice_regione>/province
    - Province raggruppate per regione

- /api/regions/<nome_regione|codice_regione>/province/<nome_provincia|codice_provincia|sigla_provincia>
    - Dettaglio Provincia

- /api/province
    - Dati province raggruppati per provincia

- /api/province/<nome_provincia|codice_provincia|sigla_provincia>
    - Dettaglio Provincia

## Nota
Le risposte hanno una cache di 15 minuti per questioni di performance.