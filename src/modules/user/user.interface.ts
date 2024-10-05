/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose'

export interface IUserServiceResponse {
  success: boolean
  statusCode: number
  message: string
  data?: Omit<IUser, 'password'> | null
}

export type IUserLogin = {
  email: string
  password: string
}

export interface IUserResponse {
  success: boolean
  statusCode: number
  message: string
  token?: string
  data?: IUser | null
}

export interface IUser {
  name: string
  address: string
  phone: string
  email: string
  isVerified: boolean
  password: string
  role: string
  img?: string
  expireTime?: string
  resetToken?: string
  isPaid?: boolean
}

export interface IChangePassword {
  userId: string
  oldPassword: string
  newPassword: string
}

export interface IUserMethods {
  passwordMatch(enteredPassword: string): Promise<boolean>
  hashPassword(): Promise<void>
  isUserExist(email: string): Promise<boolean>
}

export interface IUserModel extends Model<IUser, object, IUserMethods> {
  isUserExist(email: string): Promise<boolean>
}

export type IUserDocument = Document & IUser & IUserMethods
