**bcra-statistics-sdk: A Node.js Package for Interacting with the BCRA Statistics API**

This package provides a convenient way for Node.js applications to interact with the Statistics API of the Central Bank of Argentina (Banco Central de la República Argentina, BCRA).

**Installation**

You can install the `bcra-statistics-sdk` package using one of the following package managers:

- **npm:**

```bash
npm install bcra-statistics-sdk
```

- **yarn:**

```bash
yarn add bcra-statistics-sdk
```

- **bun:**

```bash
bun add bcra-statistics-sdk
```

- **pnpm:**

```bash
pnpm add bcra-statistics-sdk
```

**Usage**

**CommonJS:**

```javascript
async function main() {
  const { BCRAStatisticsClient } = await import('bcra-statistics-sdk');

  const client = new BCRAStatisticsClient();

  // Get all published variables
  const principalVariablesResponse = await client.getPrincipalVariables();
  console.log('Principal Variables:', JSON.stringify(principalVariablesResponse));

  // Get data for a specific variable between dates
  const variableDataResponse = await client.getVariableData(1, '2024-01-01', '2024-05-01');
  console.log('Variable Data:', JSON.stringify(variableDataResponse));
}

main().catch(console.error);
```

**ESM and TypeScript:**

```javascript
import { BCRAStatisticsClient } from 'bcra-statistics-sdk';

const client = new BCRAStatisticsClient();

// ... (same usage as CommonJS)
```

**API Reference**

**Classes**

- **BCRAStatisticsClient:** This class provides methods for interacting with the BCRA Statistics API.

**Properties**

- **baseUrl (string):** The base URL of the BCRA Statistics API. Defaults to "[https://api.bcra.gob.ar/estadisticas/v1](https://api.bcra.gob.ar/estadisticas/v1)".

**Methods**

- **getPrincipalVariables(): Promise<BCRAStatisticsResponse<BCRAStatisticsMainVar>>:** Retrieves all the published variables from the BCRA. Returns a promise that resolves to an object with properties:
    - `status`: The HTTP status code of the response.
    - `errorMessages` (optional): An array of error messages if the request failed.
    - `results` (optional): An array of `BCRAStatisticsMainVar` objects if the request was successful.
- **getVariableData(idVariable: number, fechaDesde: string, fechaHasta: string): Promise<BCRAStatisticsResponse<BCRAStatisticsDataVar>>:** Retrieves the values of a specific variable between the specified dates.
    - `idVariable`: The ID of the variable to retrieve data for.
    - `fechaDesde`: The starting date in the range (format `yyyy-mm-dd`).
    - `fechaHasta`: The ending date in the range (format `yyyy-mm-dd`).
    - Returns a promise that resolves to an object with properties:
        - `status`: The HTTP status code of the response.
        - `errorMessages` (optional): An array of error messages if the request failed.
        - `results` (optional): An array of `BCRAStatisticsDataVar` objects if the request was successful.

**Interfaces**

- **BCRAStatisticsResponse<T>:** An interface representing the response structure of the BCRA Statistics API.
    - `status`: The HTTP status code of the response.
    - `errorMessages` (optional): An array of error messages if the request failed.
    - `results` (optional): An array of data objects of type `T` if the request was successful.
- **BCRAStatisticsMainVar:** An interface representing the structure of a variable object in the `getPrincipalVariables` response.
    - `idVariable`: The ID of the variable.
    - `cdSerie`: The series code of the variable.
    - `descripcion`: The description of the variable.
    - `fecha`: The date of the variable value.
    - `valor`: The value of the variable.
- **BCRAStatisticsDataVar:** An interface representing the structure of a variable data object in the `getVariableData` response.
    - `idVariable`: The ID of the variable.
    - `fecha`: