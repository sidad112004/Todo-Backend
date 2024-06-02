import ApiError from "../utilitis/ApiError.js"
import Asynchandler from "../utilitis/Asynchandler.js"
import { User } from "../models/user.model.js"
import ApiRespoance from "../utilitis/ApiRespoance.js"



const userregister = Asynchandler(async (req, res) => {

  const { username, password, fullname, email } = req.body

  if (username === "") {
    throw new ApiError(401, "username is required")
  }

  if (password === "") {
    throw new ApiError(401, "password is required")
  }

  if (fullname === "") {
    throw new ApiError(401, "fullname is required")
  }

  const user = await User.findOne({ username })

  if (user) {
    throw new ApiError(401, "username already exits")
  }

  const newuser = await User.create({
    username,
    password,
    fullname,
    email
  }
  )

  const createduser = await User.findById(newuser._id).select("-password -RefreshToken")

  if (!createduser) {
    throw new ApiError(400, "user is not created ")
  }

  return res
    .status(200)
    .json(
      new ApiRespoance(200, createduser, "user is created")
    )
}
)



const userlogin = Asynchandler(async (req, res) => {
  const { username, password } = await req.body
  const user = await User.findOne({ username })

  if (!user) {
    throw new ApiError(401, "username is not correct")
  }

  const passwordcorrect = await user.ispasswordcorrect(password)

  if (!passwordcorrect) {
    throw new ApiError(401, "password is invalid")
  }

  const RefreshToken = await user.genrateRefreshToken()

  user.RefreshToken = RefreshToken

  const loginduser = await User.findById(user._id).select("-password -RefreshToken")

  if (!loginduser) {
    throw new ApiError(400, "user is not logined")
  }
  const options = {
    httpOnly: true,
    secure: true

  }

  return res
    .status(200)
    .cookie("RefreshToken", RefreshToken, options)
    .json(
      new ApiRespoance(
        200,

        { loginduser }

        ,
        "user logged successfull"
      )
    )

})



const userlogout = Asynchandler(async (req, res) => {
  //middlware is working
  const user = await User.findById(req.user._id)

  if (!user) {
    throw new ApiError(400, "user is not found")
  }

  await User.updateOne({ _id: user._id }, { RefreshToken: undefined });

  const logoutuser = await User.findById(user._id).select("-password -RefreshToken")

  if (!logoutuser) {
    throw new ApiError(400, "logout user in not found")
  }
  const options = {
    httpOnly: true,
    secure: true
  }


  return res
    .status(200)
    .clearCookie("RefreshToken", options)
    .json(
      new ApiRespoance(
        200,
        logoutuser,
        "user logout"
      )
    )
})



export { userregister, userlogin, userlogout }