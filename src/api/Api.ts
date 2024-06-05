/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModifyProfileReq {
  name?: string;
  password?: string;
  studentId?: string;
  /** @format int32 */
  profileImg?: string;
  id?: string;
}

export interface BaseResponseString {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: string;
}

export interface PostSeoulmateReq {
  name?: string;
  password1?: string;
  password2?: string;
  studentId?: string;
  profileImg?: string;
  id?: string;
}

export interface BaseResponsePostSeoulmateRes {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: PostSeoulmateRes;
}

export interface PostSeoulmateRes {
  /** @format int32 */
  seoulmateIdx?: number;
}

export interface PostPreferReq {
  first?: string;
  firstList?: number[];
  second?: string;
  secondList?: number[];
  third?: string;
  thirdList?: number[];
  fourth?: string;
  fourthList?: number[];
  fifth?: string;
  fifthList?: number[];
  sixth?: string;
  sixthList?: number[];
  seventh?: string;
  seventhList?: number[];
}

export interface PostLoginReq {
  password?: string;
  id?: string;
}

export interface BaseResponsePostLoginRes {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: PostLoginRes;
}

export interface PostLoginRes {
  /** @format int32 */
  buddyIdx?: number;
  seoulmateIdx?: number;
  name?: string;
}

export interface PostInfoReq {
  language?: number[];
  personality?: number[];
  hobby?: number[];
  wanttodo?: number[];
  /** @format int32 */
  sex?: number;
  /** @format int32 */
  major?: number;
}

export interface Matching {
  /** @format int32 */
  seoulmateIdx?: number;
  buddyIdxs?: number[];
}

export interface PostBuddyReq {
  name?: string;
  password1?: string;
  password2?: string;
  studentId?: string;
  profileImg?: string;
  id?: string;
}

export interface BaseResponsePostBuddyRes {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: PostBuddyRes;
}

export interface PostBuddyRes {
  /** @format int32 */
  preferenceIdx?: number;
}

export interface PostBuddyInfoReq {
  language?: number[];
  personality?: number[];
  hobby?: number[];
  wanttodo?: number[];
  /** @format int32 */
  sex?: number;
  /** @format int32 */
  major?: number;
  /** @format int32 */
  continent?: number;
  /** @format int32 */
  motherTongue?: number;
}

export interface GetSeoulmateProfileRes {
  name?: string;
  password?: string;
  studentId?: string;
  /** @format int32 */
  sex?: number;
  major?: string;
  profileImg?: string;
  id?: string;
}

export interface BaseResponseGetStatusRes {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: GetStatusRes;
}

export interface GetStatusRes {
  /** @format int32 */
  state?: number;
}

export interface BaseResponseGetMatchingRes {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: GetMatchingRes;
}

export interface GetMatchingRes {
  seoulmateName?: string;
  seoulmateID?: string;
  seoulmateProfileImg?: string;
  buddyName?: string;
  buddyID?: string;
  buddyProfileImg?: string;
}

export interface BaseResponseListTeam {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: Team[];
}

export interface Buddy {
  /** @format int32 */
  buddyIdx?: number;
  name?: string;
  password?: string;
  studentId?: string;
  profileImg?: string;
  /** @format int32 */
  major?: number;
  /** @format int32 */
  sex?: number;
  /** @format int32 */
  continent?: number;
  /** @format int32 */
  motherTongue?: number;
  /** @format int32 */
  certified?: number;
  /** @format int32 */
  state?: number;
  id?: string;
}

export interface Seoulmate {
  /** @format int32 */
  seoulmateIdx?: number;
  name?: string;
  password?: string;
  studentId?: string;
  profileImg?: string;
  /** @format int32 */
  major?: number;
  /** @format int32 */
  sex?: number;
  /** @format int32 */
  certified?: number;
  /** @format int32 */
  state?: number;
  id?: string;
}

export interface Team {
  seoulmate?: Seoulmate;
  buddyList?: Buddy[];
}

export interface BaseResponseListGetMatchingRes {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  result?: GetMatchingRes[];
}

export interface GetBuddyProfileRes {
  name?: string;
  password?: string;
  profileImg?: string;
  nationality?: string;
  studentId?: string;
  id?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://13.124.56.183:8080',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title 24년도 1학기 캡스톤 에브리버디 API docs
 * @version 1.0.0
 * @baseUrl http://13.124.56.183:8080
 *
 * OCR API와 선호도 기반 알고리즘을 활용한 교환학생 플랫폼, ‘에브리버디’
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  seoulmates = {
    /**
     * @description 서울메이트 프로필을 수정하는 API
     *
     * @tags seoulmate-controller
     * @name ModifySeoulmateProfile
     * @summary 서울메이트 프로필 수정 API
     * @request PUT:/seoulmates/modify/{seoulmateIdx}
     */
    modifySeoulmateProfile: (
      seoulmateIdx: number,
      data: ModifyProfileReq,
      params: RequestParams = {},
    ) =>
      this.request<BaseResponseString, any>({
        path: `/seoulmates/modify/${seoulmateIdx}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 서울메이트 회원가입 API swagger 대문자 반영이 안됩니다! id(x) -> ID(o) !!
     *
     * @tags seoulmate-controller
     * @name CreateSeoulmate
     * @summary 서울메이트 sign-up API
     * @request POST:/seoulmates/sign-up
     */
    createSeoulmate: (data: PostSeoulmateReq, params: RequestParams = {}) =>
      this.request<BaseResponsePostSeoulmateRes, any>({
        path: `/seoulmates/sign-up`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags seoulmate-controller
     * @name SavePreference
     * @request POST:/seoulmates/preference/{seoulmateIdx}
     */
    savePreference: (
      seoulmateIdx: number,
      data: PostPreferReq,
      params: RequestParams = {},
    ) =>
      this.request<BaseResponseString, any>({
        path: `/seoulmates/preference/${seoulmateIdx}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 서울메이트 로그인 API swagger 대문자 반영이 안됩니다! id(x) -> ID(o) !!
     *
     * @tags seoulmate-controller
     * @name LoginSeoulmate
     * @summary 서울메이트 log-in API
     * @request POST:/seoulmates/log-in
     */
    loginSeoulmate: (data: PostLoginReq, params: RequestParams = {}) =>
      this.request<BaseResponsePostLoginRes, any>({
        path: `/seoulmates/log-in`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags seoulmate-controller
     * @name SaveInfo
     * @request POST:/seoulmates/info/{seoulmateIdx}
     */
    saveInfo: (
      seoulmateIdx: number,
      data: PostInfoReq,
      params: RequestParams = {},
    ) =>
      this.request<BaseResponseString, any>({
        path: `/seoulmates/info/${seoulmateIdx}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 서울메이트의 프로필을 조회하는 API
     *
     * @tags seoulmate-controller
     * @name GetSeoulmateProfile
     * @summary 서울메이트 프로필 조회 API
     * @request GET:/seoulmates/{seoulmateIdx}
     */
    getSeoulmateProfile: (seoulmateIdx: number, params: RequestParams = {}) =>
      this.request<GetSeoulmateProfileRes, any>({
        path: `/seoulmates/${seoulmateIdx}`,
        method: 'GET',
        ...params,
      }),
  };
  buddies = {
    /**
     * @description 버디 프로필을 수정하는 API
     *
     * @tags buddy-controller
     * @name ModifyBuddyProfile
     * @summary 버디 프로필 수정 API
     * @request PUT:/buddies/modify/{buddyIdx}
     */
    modifyBuddyProfile: (
      buddyIdx: number,
      data: ModifyProfileReq,
      params: RequestParams = {},
    ) =>
      this.request<BaseResponseString, any>({
        path: `/buddies/modify/${buddyIdx}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 버디) 회원가입 API
     *
     * @tags buddy-controller
     * @name CreateBuddy
     * @summary 버디 sign-up API
     * @request POST:/buddies/sign-up
     */
    createBuddy: (data: PostBuddyReq, params: RequestParams = {}) =>
      this.request<BaseResponsePostBuddyRes, any>({
        path: `/buddies/sign-up`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 버디 선호도반영 API
     *
     * @tags buddy-controller
     * @name SaveBuddyPreference
     * @summary 버디 선호도 반영 API
     * @request POST:/buddies/preference/{buddyIdx}
     */
    saveBuddyPreference: (
      buddyIdx: number,
      data: PostPreferReq,
      params: RequestParams = {},
    ) =>
      this.request<BaseResponseString, any>({
        path: `/buddies/preference/${buddyIdx}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 버디 로그인 API swagger 대문자 반영이 안됩니다! id(x) -> ID(o) !!
     *
     * @tags buddy-controller
     * @name LoginBuddy
     * @summary 버디 log-in API
     * @request POST:/buddies/log-in
     */
    loginBuddy: (data: PostLoginReq, params: RequestParams = {}) =>
      this.request<BaseResponsePostLoginRes, any>({
        path: `/buddies/log-in`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 버디 정보 입력 API
     *
     * @tags buddy-controller
     * @name SaveBuddyInfo
     * @summary 버디 정보 입력 API
     * @request POST:/buddies/info/{buddyIdx}
     */
    saveBuddyInfo: (
      buddyIdx: number,
      data: PostBuddyInfoReq,
      params: RequestParams = {},
    ) =>
      this.request<BaseResponseString, any>({
        path: `/buddies/info/${buddyIdx}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 버디의 프로필을 조회하는 API
     *
     * @tags buddy-controller
     * @name GetBuddyProfile
     * @summary 버디 프로필 조회 API
     * @request GET:/buddies/{buddyIdx}
     */
    getBuddyProfile: (buddyIdx: number, params: RequestParams = {}) =>
      this.request<GetBuddyProfileRes, any>({
        path: `/buddies/${buddyIdx}`,
        method: 'GET',
        ...params,
      }),
  };
  matchings = {
    /**
     * @description 매칭을 "드디어!" 시작합니다.
     *
     * @tags matching-controller
     * @name ApplyGaleShapley
     * @summary 매칭 시작하기!! API
     * @request POST:/matchings/start-matching
     */
    applyGaleShapley: (params: RequestParams = {}) =>
      this.request<BaseResponseString, any>({
        path: `/matchings/start-matching`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 전체 매칭 결과 저장 API 서울메이트 : 버디 = 1 : n명의 쌍으로 저장됩니다. 이 API를 호출하면, 매칭 상태를 나타내는 seoulmateIdx = 1 의 state 값이 0에서 1로 변경됩니다.
     *
     * @tags matching-controller
     * @name PostMatching
     * @summary 매칭 결과 저장 API
     * @request POST:/matchings/save
     */
    postMatching: (data: Matching[], params: RequestParams = {}) =>
      this.request<BaseResponseString, any>({
        path: `/matchings/save`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 매칭 상태를 조회합니다 ( 0: 매칭 전, 1: 매칭 완료 )
     *
     * @tags matching-controller
     * @name GetState
     * @summary 매칭 상태 조회 API
     * @request GET:/matchings/state
     */
    getState: (params: RequestParams = {}) =>
      this.request<BaseResponseGetStatusRes, any>({
        path: `/matchings/state`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 버디) 담당 서울메이트 조회 API
     *
     * @tags matching-controller
     * @name GetMatching
     * @summary 서울메이트 조회 API
     * @request GET:/matchings/seoulmate/{buddyIdx}
     */
    getMatching: (buddyIdx: number, params: RequestParams = {}) =>
      this.request<BaseResponseGetMatchingRes, any>({
        path: `/matchings/seoulmate/${buddyIdx}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 전체 매칭 결과 조회: 서울메이트 -> 버디들 순
     *
     * @tags matching-controller
     * @name GetEntire
     * @summary 전체 매칭 결과 조회 API
     * @request GET:/matchings/entire
     */
    getEntire: (params: RequestParams = {}) =>
      this.request<BaseResponseListTeam, any>({
        path: `/matchings/entire`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 설메) 담당 버디들 조회 API
     *
     * @tags matching-controller
     * @name GetMatchings
     * @summary 버디 조회 API
     * @request GET:/matchings/buddies/{seoulmateIdx}
     */
    getMatchings: (seoulmateIdx: number, params: RequestParams = {}) =>
      this.request<BaseResponseListGetMatchingRes, any>({
        path: `/matchings/buddies/${seoulmateIdx}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 매칭 상태를 변경합니다 ( 0: 매칭 전, 1: 매칭 완료 ) - seoulmateIdx = 1의 state를 임의로 사용. state 값 1 -> 0로 변경 - DROP matching TABLE && CREATE matching TABLE 두 가지 동작이 동시에 진행됩니다.
     *
     * @tags matching-controller
     * @name DeleteMatching
     * @summary 매칭 전 상태로 변경 API
     * @request DELETE:/matchings/delete
     */
    deleteMatching: (params: RequestParams = {}) =>
      this.request<BaseResponseString, any>({
        path: `/matchings/delete`,
        method: 'DELETE',
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags ocr-controller
     * @name ProxyToClovaApi
     * @request POST:/api/ocr
     */
    proxyToClovaApi: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/ocr`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  };
}
