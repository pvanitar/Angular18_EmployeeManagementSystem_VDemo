export interface IApiResponse{
  message:string;
  result: boolean;
  data: any;
}

export interface IParentDepartment{
    departmentId: number,
    departmentName: string,
    departmentLogo: string
  }

  export interface IChildDepartment{
    childDeptId: number,
    parentDeptId: number,
    departmentName: string
  }

