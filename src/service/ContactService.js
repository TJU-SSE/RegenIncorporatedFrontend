import httpRequest from './httpRequest'
import backendUrl from '../config/backendUrl'
import env from '../config/env'
import CommonUtils from '../config/CommonUtils'

export default {
  async get (context) {
    try {
      let response = await httpRequest(context, backendUrl.CONTACT_GET, 'get')
      if (response.body.code === env.RESP_CODE.SUCCESS) {
        response.body.msg[0].social = JSON.parse(response.body.msg[0].social)
        response.body.msg[1].social = JSON.parse(response.body.msg[1].social)
      }
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async getAllWorkers (context, pageOffset, itemSize = env.PAGE_ITEM_SIZES.WORKERS) {
    try {
      let response = await httpRequest(context,
        `${backendUrl.WORKER_GET_ALL}?pageOffset=${pageOffset - 1}&itemSize=${itemSize}`, 'get')
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async getAllContactInfo (context) {
    try {
      let response = await httpRequest(context, backendUrl.CONTACT_GET_ALL, 'get')
      if (response.body.code === env.RESP_CODE.SUCCESS) {
        console.log('API测试', response.body)
        // response.body.msg[0].social = JSON.parse(response.body.msg[0].social)
        // response.body.msg[1].social = JSON.parse(response.body.msg[1].social)
        console.log('msg', response.body.msg)
      }
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
      let response = await httpRequest(context, backendUrl.CONTACT_UPDATE, 'post', {
        phone: postData.phone,
        photography: postData.photography,
        fax: postData.fax,
        address: postData.address,
        link: postData.link,
        social: JSON.stringify(postData.social),
        desc: postData.desc
      })
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async updateAll (context, postData) {
    try {
      console.log('过滤前', postData[0].social)
      postData[0].social = JSON.stringify(postData[0].social)
      postData[1].social = JSON.stringify(postData[1].social)
      console.log('过滤后', postData[0].social)
      var temp = { 'msg': postData }
      console.log('post_data', temp)
      let response = await httpRequest(context, backendUrl.CONTACT_UPDATE, 'post', temp)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async createWorker (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.WORKER_CREATE, 'post',
        CommonUtils.transformObjToFormData(postData), env.REQUIRE_HEAD_TYPE.FORM_DATA)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async sendContactForm (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.CONTACT_FORM, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async deleteWorker (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.WORKER_DELETE, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async updateWorker (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.WORKER_UPDATE, 'post', postData)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  },

  async updateWorkerImg (context, postData) {
    try {
      let response = await httpRequest(context, backendUrl.WORKER_UPDATE_IMG, 'post',
        CommonUtils.transformObjToFormData(postData), env.REQUIRE_HEAD_TYPE.FORM_DATA)
      return response.body
    } catch (exception) {
      return {
        code: env.RESP_CODE.FAIL,
        err: exception
      }
    }
  }
}
