// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** requireEmailCaptcha GET /api/account/captcha/email */
export async function requireEmailCaptchaUsingGET(
  params: {
    // query
    /** email */
    email: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/captcha/email', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** requirePhoneCaptcha GET /api/account/captcha/phone */
export async function requirePhoneCaptchaUsingGET(
  params: {
    // query
    /** phone */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/captcha/phone', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireCurrentUser GET /api/account/currentUser */
export async function acquireCurrentUserUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/account/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateCurrentUser PUT /api/account/currentUser */
export async function updateCurrentUserUsingPUT(
  params: {
    // query
    roles?: string[];
    userId?: number;
    userName?: string;
  },
  body: API.CurrentUserVo,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/currentUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** accountLoginByJson POST /api/account/login */
export async function accountLoginByJsonUsingPOST(
  body: API.LoginTo,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** emailLogin POST /api/account/login/email */
export async function emailLoginUsingPOST(
  params: {
    // query
    /** code */
    code: string;
    /** email */
    email: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/login/email', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** phoneLogin POST /api/account/login/phone */
export async function phoneLoginUsingPOST(
  params: {
    // query
    /** code */
    code: string;
    /** phone */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/login/phone', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** loginOut POST /api/account/loginOut */
export async function loginOutUsingPOST(
  params: {
    // query
    roles?: string[];
    userId?: number;
    userName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/account/loginOut', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
