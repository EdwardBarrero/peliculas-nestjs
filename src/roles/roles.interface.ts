export enum PermitModulesEnum {
  Movies = 'MOVIES_MODULE',
  Genrs = 'GENRS_MODULE',
}

export enum PermitActionsEnum {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface IPermitModule {
  name: PermitModulesEnum;
  actions: PermitActionsEnum[];
}
