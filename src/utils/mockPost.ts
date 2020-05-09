import { Post, PostType } from '@/models/Post'

const prefixInteger = (num: number, length: number) =>
  Array(length)
    .join('0')
    .concat(num.toString())
    .slice(-length)

export const mockPost = (start: number, length: number): Post[] =>
  [...Array(length)].map((_, i) => ({
    id: `post-${i}`,
    type: PostType.image,
    author: 'Yuan',
    avatar: `images/avatars/avatar-${prefixInteger(start + i, 2)}.png`,
    createTime: new Date(`2020/4/${start + i}`),
    content: `this is ${start + i}`,
    image: 'images/microphone-1209816_1920.jpg',
    favorite: 1,
    comment: (start + i) * 100 + 12
  }))
