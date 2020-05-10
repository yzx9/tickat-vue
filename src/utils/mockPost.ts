import { Post, PostType } from '@/models/Post'

const images = [
  'http://h1.ioliu.cn/bing/BarnOwlMigration_ZH-CN8579914070_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/AdelaideVineyard_ZH-CN8408417885_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/WildflowerWeek_ZH-CN4593499387_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/SiegeofCusco_ZH-CN9108219313_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/CordovanCourts_ZH-CN8989880218_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/LastJedi_ZH-CN8789881870_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/LaughingOwl_ZH-CN8548558025_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/KasbahRoses_ZH-CN8429310380_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/BurgAltdahn_ZH-CN8281669977_640x480.jpg?imageslim',
  'http://h1.ioliu.cn/bing/ArcticRedpoll_ZH-CN7968973967_640x480.jpg?imageslim'
]

const prefixInteger = (num: number, length: number) =>
  Array(length)
    .join('0')
    .concat(num.toString())
    .slice(-length)

export const mockPost = (start: number, length: number): Post[] =>
  [...Array(length)]
    .map((_, i) => start + i)
    .map(i => ({
      id: `post-${i}`,
      type: PostType.image,
      author: 'Yuan',
      avatar: `images/avatars/avatar-${prefixInteger(i, 2)}.png`,
      createTime: new Date(`2020/4/${i}`),
      content: `this is ${i}`,
      image: images[i % images.length],
      favorite: 1,
      comment: i * 100 + 12
    }))
