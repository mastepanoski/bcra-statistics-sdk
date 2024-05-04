/**
 * BCRAStatisticsClient
 *
 * This class allows you to connect to the Statistics API of the Central Bank of Argentina (Banco Central de la República Argentina)
 *
 * @link https://www.bcra.gob.ar/BCRAyVos/catalogo-de-APIs-banco-central.asp
 */
import xior from "xior";
import errorRetryPlugin from "xior/plugins/error-retry";
import dedupePlugin from "xior/plugins/dedupe";
import throttlePlugin from "xior/plugins/throttle";
import errorCachePlugin from "xior/plugins/error-cache";

export const BASE_URL = "https://api.bcra.gob.ar/estadisticas/v1";

/**
 * Xior default settings
 */
xior.defaults.baseURL = BASE_URL;
xior.defaults.withCredentials = false;
xior.plugins.use(errorRetryPlugin());
xior.plugins.use(errorCachePlugin());
xior.plugins.use(dedupePlugin()); // Prevent same GET requests from occurring simultaneously.
xior.plugins.use(throttlePlugin()); // Throttle same `GET` request in 1000ms

export interface BCRAStatisticsResponse<T> {
  status: number;
  errorMessages?: string[];
  results?: T[];
}

export interface BCRAStatisticsMainVar {
  idVariable: number;
  cdSerie: number;
  descripcion: string;
  fecha: string;
  valor: string;
}

export interface BCRAStatisticsDataVar {
  idVariable: number;
  fecha: string;
  valor: string;
}

export class BCRAStatisticsClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all the published variables by BCRA.
   */
  public async getPrincipalVariables(): Promise<
    BCRAStatisticsResponse<BCRAStatisticsMainVar>
  > {
    const headers = {
      "Accept-Language": "es-AR",
      "Content-Language": "es-AR",
    };

    const response = await xior.get(`${this.baseUrl}/principalesvariables`, {
      headers,
    });

    return response.data;
  }

  /**
   * Get the values of the variable between dates.
   *
   * @param idVariable Variable ID
   * @param fechaDesde The starting date in the range (format yyyy-mm-dd)
   * @param fechaHasta The ending date in the range (format yyyy-mm-dd)
   */
  public async getVariableData(
    idVariable: number,
    fechaDesde: string,
    fechaHasta: string
  ): Promise<BCRAStatisticsResponse<BCRAStatisticsDataVar>> {
    const headers = {
      "Accept-Language": "es-AR",
      "Content-Language": "es-AR",
    };

   const response = await xior.get(
      `${this.baseUrl}/datosvariable/${idVariable}/${fechaDesde}/${fechaHasta}`,
      { headers }
    );

    return response.data;
  }
}
