export class LoggedInUserModel{
    constructor(
        public email:string="",
        public token:string="",
        public role:string="",
        approvalStatus: string = "pending" // Add a field for approval status with a default value of "pending"
        )
    {

    }
    
  }
