import httpRequest from './httpRequest'
import backendUrl from '../config/backendUrl'
import env from '../config/env'

export default {
  async create (context, postData) {
    try {
      console.log('postData', postData)
      let response = await httpRequest(context, backendUrl.PHOTO_CREATE, 'post', postData)
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
      console.log('postData', postData)
      let response = await httpRequest(context, backendUrl.PHOTO_DELETE, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },
  async deleteImg (context, postData) {
    try {
      console.log('postData', postData)
      let response = await httpRequest(context, backendUrl.PHOTO_DELETE_IMG, 'post', postData)
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
      console.log('postData', postData)
      let response = await httpRequest(context, backendUrl.PHOTO_UPDATE, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },
  async addphoto (context, postData) {
    try {
      console.log('postData', postData)
      let response = await httpRequest(context, backendUrl.PHOTO_ADD_PHOTO, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },
  async getItemById (context, id) {
    try {
      let response = await httpRequest(context, backendUrl.PHOTO_GET_BY_ID + '/' + id, 'get')
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
  async getInsideBanner (context) {
    try {
      let response = await httpRequest(context, backendUrl.PHOTO_GET_INSIDEBANNER, 'get')
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
  async getOutsideBanner (context) {
    try {
      let response = await httpRequest(context, backendUrl.PHOTO_GET_OUTSIDEBANNER, 'get')
      if (response.body.code === env.RESP_CODE.SUCCESS) {
        return response.body
      }
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  }
}
