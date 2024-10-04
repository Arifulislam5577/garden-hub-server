import { generateJwtToken } from '../../utils/generateJwtToken'
import { IUser, IUserLogin, IUserLoginResponse, IUserServiceResponse } from './user.interface'
import User from './user.model'

export const signUpService = async (userData: IUser): Promise<IUserServiceResponse> => {
  const { email, ...restProps } = userData
  const isExist = await User.isUserExist(email)

  if (isExist) {
    return {
      success: false,
      statusCode: 400,
      message: 'User already exist',
      data: null
    }
  }
  const savedUser = await User.create({
    email,
    img: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
    ...restProps
  })
  return {
    success: true,
    statusCode: 201,
    message: 'Sign up successful',
    data: savedUser
  }
}

export const signInService = async ({ email, password }: IUserLogin): Promise<IUserLoginResponse> => {
  const user = await User.findOne({ email }).select('+password')

  if (user && (await user.passwordMatch(password))) {
    const token = generateJwtToken({ id: user._id, role: user.role })
    return {
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token: token,
      data: user
    }
  } else {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid email or password'
    }
  }
}

export const userService = {
  signUpService,
  signInService
}
