import httpRequest from './httpRequest'
import backendUrl from '../config/backendUrl'
import env from '../config/env'

export default {
  async create (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.VIDEO_CREATE, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },
  async getSingle (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.VIDEO_GET_SINGLE + '/' + postData, 'get')
      if (response.body.code === env.RESP_CODE.SUCCESS) {
        return response.body
      }
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async getAll (context) {
    try {
      let response = await httpRequest(context, backendUrl.VIDEO_GET_ALL, 'get')
      if (response.body.code === env.RESP_CODE.SUCCESS) {
        response.body.msg.videos = response.body.msg.videos.map((video1) => {
          return {
            cover: video1.cover,
            id: video1.id,
            video: video1.video,
            desc: video1.desc,
            title: video1.title,
            intro: video1.intro,
            rank: video1.rank,
            isVideo: true
          }
        })
      }
      console.log(response.body.msg.videos)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async delete (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.VIDEO_DELETE, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async update (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.VIDEO_UPDATE, 'post',
        postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  }
}
