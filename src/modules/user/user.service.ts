import bcrypt from 'bcryptjs'
import { generateCode } from '../../utils/generateCode'
import { generateJwtToken } from '../../utils/generateJwtToken'
import { sendEmail } from '../../utils/sendEmail'
import { verifyTokenTime } from '../../utils/verifyTokenTime'
import { Post } from '../post/post.model'
import { IChangePassword, IUser, IUserLogin, IUserResponse, IUserServiceResponse } from './user.interface'
import User from './user.model'

const signUpService = async (userData: IUser): Promise<IUserServiceResponse> => {
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
const signInService = async ({ email, password }: IUserLogin): Promise<IUserResponse> => {
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
const forgotPasswordService = async ({ email }: { email: string }): Promise<IUserResponse> => {
  const user = await User.findOne({ email })
  if (!user) {
    return {
      success: false,
      statusCode: 400,
      message: 'User not found'
    }
  }

  const resetToken: string = generateCode()
  const expireTime = Date.now() + 5 * 60 * 1000

  await User.findByIdAndUpdate(user._id, { resetToken, expireTime })
  await sendEmail({ email: user.email, name: user.name, resetToken })

  return {
    success: true,
    statusCode: 200,
    message: 'Password reset link sent to your email'
  }
}
const resetPasswordService = async ({
  resetToken,
  password
}: {
  resetToken: string
  password: string
}): Promise<IUserResponse> => {
  const user = await User.findOne({ resetToken })
  if (!user) {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid reset token'
    }
  }

  const tokenExpire = verifyTokenTime(+user.expireTime!)
  const tokenMatch = user.resetToken === resetToken

  if (tokenExpire || !tokenMatch) {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid reset token'
    }
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { password: hashPassword, resetToken: '', expireTime: '' },
    { new: true }
  )

  if (!updatedUser) {
    return {
      success: false,
      statusCode: 400,
      message: 'Failed to update password'
    }
  } else {
    return {
      success: true,
      statusCode: 200,
      message: 'Password updated successfully'
    }
  }
}
const changePasswordService = async (data: IChangePassword): Promise<IUserResponse> => {
  const { userId, oldPassword, newPassword } = data

  const user = await User.findById(userId)
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: 'User not found'
    }
  }
  const passwordMatch = await user.passwordMatch(oldPassword)
  if (!passwordMatch) {
    return {
      success: false,
      statusCode: 400,
      message: 'Password is incorrect'
    }
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(newPassword, salt)
  const updatedUser = await User.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true })
  if (!updatedUser) {
    return {
      success: false,
      statusCode: 400,
      message: 'Failed to update password'
    }
  } else {
    return {
      success: true,
      statusCode: 200,
      message: 'Password updated successfully'
    }
  }
}
const updateProfileService = async ({
  userId,
  userInfo
}: {
  userId: string
  userInfo: IUser
}): Promise<IUserResponse> => {
  const user = await User.findById(userId)
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: 'User not found'
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, userInfo, { new: true })
  if (!updatedUser) {
    return {
      success: false,
      statusCode: 400,
      message: 'Failed to update profile'
    }
  } else {
    return {
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: updatedUser
    }
  }
}
const getProfileService = async (userId: string): Promise<IUserResponse> => {
  const user = await User.findById(userId)
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: 'User not found'
    }
  }
  return {
    success: true,
    statusCode: 200,
    message: 'Profile fetched successfully',
    data: user
  }
}

const shouldUserProfileVerify = async (userId: string): Promise<IUserResponse> => {
  const user = await User.findById(userId)

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: 'User not found',
      data: user
    }
  }

  if (!user.shouldVerify) {
    return {
      success: false,
      statusCode: 400,
      message: 'Profile already verified',
      data: user
    }
  }

  const postWithLikes = await Post.findOne({ authorId: userId, likes: { $exists: true, $ne: [] } })

  if (postWithLikes) {
    return {
      success: false,
      statusCode: 400,
      message: 'Profile needs to be verified due to liked posts',
      data: user
    }
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Profile does not need verification',
    data: user
  }
}
export const userService = {
  signUpService,
  signInService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
  updateProfileService,
  getProfileService,
  shouldUserProfileVerify
}
