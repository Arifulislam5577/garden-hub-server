import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'
import { IUser, IUserDocument, IUserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    img: { type: String, default: '' },
    resetToken: { type: String, default: '' },
    expireTime: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    shouldVerify: { type: Boolean, default: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password
        return ret
      }
    }
  }
)

userSchema.statics.isUserExist = async function (email: string) {
  const user = await this.findOne({ email })
  return !!user
}

userSchema.methods.passwordMatch = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
}

userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next()

  await this.hashPassword()
  next()
})

// Create the User model
const User = model<IUser, IUserModel>('User', userSchema)

export default User
