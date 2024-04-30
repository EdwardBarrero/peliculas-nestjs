import { applyDecorators, Type, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiAuthHeaders,
  ApiGetListProtectedResponse,
  ApiGetListResponse,
  ApiGetRetrieveProtectedRespose,
  ApiGetRetrieveRespose,
  ApiPostResponse,
  ApiPostProtectedResponse,
  ApiPutProtectedResponse,
  ApiPutResponse,
  ApiDeleteProtectedResponse,
  ApiDeleteResponse,
} from './swagger.decorator';
import { Get, Post, Put, Delete } from '@nestjs/common';
import {
  PermitActionsEnum,
  PermitModulesEnum,
} from 'src/roles/roles.interface';
import { EndpointProtected, ModuleProtected } from './auth.decorator';

export function ControllerProtected(module: PermitModulesEnum, tag: string) {
  return applyDecorators(ControllerUnProtected(tag), ModuleProtected(module));
}

export function ControllerUnProtected(tag: string) {
  return applyDecorators(Controller(tag), ApiTags(tag));
}

export function GetList<TModel extends Type>(model: TModel, path?: string) {
  return applyDecorators(Get(path), ApiGetListResponse(model));
}

export function GetProtectedList<TModel extends Type>(
  model: TModel,
  path?: string,
) {
  return applyDecorators(
    Get(path),
    ApiAuthHeaders(),
    ApiGetListProtectedResponse(model),
    EndpointProtected(PermitActionsEnum.Read),
  );
}

export function GetRetrieve<TModel extends Type>(model: TModel, path: string) {
  return applyDecorators(Get(path), ApiGetRetrieveRespose(model));
}

export function GetProtectedRetrieve<TModel extends Type>(
  path: string,
  model: TModel,
) {
  return applyDecorators(
    Get(path),
    ApiAuthHeaders(),
    ApiGetRetrieveProtectedRespose(model),
    EndpointProtected(PermitActionsEnum.Read),
  );
}

export function CustomPost<TModel extends Type>(model: TModel) {
  return applyDecorators(Post(), ApiPostResponse(model));
}

export function PostProtected<TModel extends Type>(model: TModel) {
  return applyDecorators(
    Post(),
    ApiAuthHeaders(),
    ApiPostProtectedResponse(model),
    EndpointProtected(PermitActionsEnum.Create),
  );
}

export function CustomPut<TModel extends Type>(path: string, model: TModel) {
  return applyDecorators(Put(path), ApiPutResponse(model));
}

export function PutProtected<TModel extends Type>(path: string, model: TModel) {
  return applyDecorators(
    Put(path),
    ApiAuthHeaders(),
    ApiPutProtectedResponse(model),
    EndpointProtected(PermitActionsEnum.Update),
  );
}

export function CustomDelete(path: string) {
  return applyDecorators(Delete(path), ApiDeleteResponse());
}

export function DeleteProtected(path: string) {
  return applyDecorators(
    Delete(path),
    ApiAuthHeaders(),
    ApiDeleteProtectedResponse(),
    EndpointProtected(PermitActionsEnum.Delete),
  );
}
