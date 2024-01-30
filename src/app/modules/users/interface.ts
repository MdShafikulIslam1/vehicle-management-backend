export const user_fields_constant = ['name','email','phone','address','location']

export type IUserResponse ={
        id: string,
        name:string,
        email:string,
        password?:string,
        address:string,
        location:string,
        avatar:string | null,
        phone:string,
        role:string,
        createAt?:string,
        updatedAt?:string,
        vehicleProfiles?:string
}