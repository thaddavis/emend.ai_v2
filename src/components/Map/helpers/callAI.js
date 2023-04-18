import React from 'react'
import axios from 'axios'
import lowerCase from 'lodash/lowerCase'

export async function callAI(promptTemplate, prompt, cb) {
  //   debugger
  try {
    // const response = await axios.post(
    //   'https://us-central1-aiot-fit-xlab.cloudfunctions.net/emend',
    //   {
    //     token: 'emendrocks',
    //     prompt: prompt,
    //     action: lowerCase(promptTemplate),
    //   }
    // )
    // console.log('response', response)

    var data = JSON.stringify({
      action: 'gpt',
      token: 'emendrocks',
      prompt: prompt,
    })
    var config = {
      method: 'post',
      url: 'https://us-central1-aiot-fit-xlab.cloudfunctions.net/emend',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      data: data,
    }
    let res = await axios(config)

    console.log('res', res)
  } catch (e) {
    console.error(e)
  }
}
