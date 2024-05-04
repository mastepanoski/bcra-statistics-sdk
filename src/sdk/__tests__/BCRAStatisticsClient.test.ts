import { test, expect, describe, mock, jest, afterEach } from "bun:test";

import {
  BCRAStatisticsClient,
  type BCRAStatisticsDataVar,
  type BCRAStatisticsMainVar,
  type BCRAStatisticsResponse,
} from "../BCRAStatisticsClient";
import { mainVarsFixture } from "../__fixtures__/mainVars.fixture";
import { dataVarsFixture } from "../__fixtures__/dataVars.fixture";

describe("Testing BCRAStatisticsClient", () => {
  const mockPrincipalVariablesResponse: BCRAStatisticsResponse<BCRAStatisticsMainVar> =
    mainVarsFixture;
  const mockVariableDataResponse: BCRAStatisticsResponse<BCRAStatisticsDataVar> =
    dataVarsFixture;

  afterEach(() => jest.restoreAllMocks());

  test("getPrincipalVariables real connection works", async () => {
    const client = new BCRAStatisticsClient();
    const response = await client.getPrincipalVariables();

    expect(response).toHaveProperty('results');
  });  

  test("getVariableData real connection works", async () => {
    const client = new BCRAStatisticsClient();
    const response = await client.getPrincipalVariables();

    expect(response).toHaveProperty('results');    
  });  

  test("getPrincipalVariables fetches data successfully", async () => {
    mock.module("xior", () => ({
      default: {
        get: jest.fn(() => Promise.resolve( {
          data: mockPrincipalVariablesResponse,
        })),
      }
    }));    

    const client = new BCRAStatisticsClient();
    const response = await client.getPrincipalVariables();

    expect(response).toEqual(mockPrincipalVariablesResponse);
  });

  test("getVariableData fetches data successfully", async () => {
    mock.module("xior", () => ({
      default: {
        get: jest.fn(() => Promise.resolve( {
          data: mockVariableDataResponse ,
        })),
      }
    }));      

    const client = new BCRAStatisticsClient();
    const idVariable = 1;
    const fechaDesde = "2024-01-01";
    const fechaHasta = "2024-01-05";
    const response = await client.getVariableData(
      idVariable,
      fechaDesde,
      fechaHasta
    );

    expect(response).toEqual(mockVariableDataResponse);
  });
});

