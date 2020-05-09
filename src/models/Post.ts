export type Post = {
  id: string
  type: PostType
  author: string
  avatar: string
  createTime: Date
  content: string
  image: string
  favorite: number
  comment: number
}

export enum PostType {
  text = 'text',
  image = 'image'
}
