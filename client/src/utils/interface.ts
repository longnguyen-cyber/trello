export interface IUser {
  name: string
  account: string
  avatar: string
}
export interface IBoard {
  id: string | number
  thumnail: string
  title: string
  user: string | IUser
}
export interface IParams {
  page: string
  slug: string
}
