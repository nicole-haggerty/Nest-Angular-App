export interface Player {
    id: number,
    name: string,
    position: string,
    team: string,
    nationality: string,
  } 

  export enum TypeModal {
    create = 'Create',
    update = 'Update',
  }