import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiHeaders,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiExtraModels,
  ApiUnauthorizedResponse,
  getSchemaPath,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { PaginatedDto } from '../dto/global.dto';

export function ApiAuthHeaders() {
  return applyDecorators(
    ApiHeaders([
      {
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ]),
  );
}

export function ApiProtectedResponse() {
  return applyDecorators(
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  );
}

export function ApiGetListResponse<TModel extends Type>(model: TModel) {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}

export function ApiGetListProtectedResponse<TModel extends Type>(
  model: TModel,
) {
  return applyDecorators(ApiProtectedResponse(), ApiGetListResponse(model));
}

export function ApiGetRetrieveRespose<TModel extends Type>(model: TModel) {
  return applyDecorators(
    ApiProtectedResponse(),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiOkResponse({ type: model }),
  );
}

export function ApiGetRetrieveProtectedRespose<TModel extends Type>(
  model: TModel,
) {
  return applyDecorators(ApiProtectedResponse(), ApiGetRetrieveRespose(model));
}

export function ApiPostResponse<TModel extends Type>(model: TModel) {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiCreatedResponse({ type: model }),
  );
}

export function ApiPostProtectedResponse<TModel extends Type>(model: TModel) {
  return applyDecorators(ApiProtectedResponse(), ApiPostResponse(model));
}

export function ApiPutResponse<TModel extends Type>(model: TModel) {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiOkResponse({ type: model }),
  );
}

export function ApiPutProtectedResponse<TModel extends Type>(model: TModel) {
  return applyDecorators(ApiProtectedResponse(), ApiPutResponse(model));
}

export function ApiDeleteResponse() {
  return applyDecorators(
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiNoContentResponse({ description: 'No Content' }),
  );
}

export function ApiDeleteProtectedResponse() {
  return applyDecorators(ApiProtectedResponse(), ApiDeleteResponse());
}
