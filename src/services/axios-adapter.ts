import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const APIClient = () => {
	const instance = axios.create({
		baseURL: API_URL,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	
	})


	instance.interceptors.response.use(
		res => res.data,
		async (err: AxiosError<{ statusCode: number }>) => {
			if (err.response?.data?.statusCode === 401) {
				if (typeof window !== 'undefined') {
					window.location.href = '/'
				}
			}

			if (err.response?.data?.statusCode === 403) {
				if (typeof window !== 'undefined') {
				
					window.location.href = '/restrict'
				}
			}

			if (err.response) {
				return Promise.reject(err.response.data)
			}
			if (err.request) {
				return Promise.reject(err.request)
			}

			return Promise.reject(err.message)
		},
	)

	return instance
}

const instance = APIClient()

export class Endpoint {
	private endpoint: string

	constructor(endpoint?: string) {
		this.endpoint = `${endpoint ?? ''}`
	}

	public get = async <T, R>(url?: string, config?: AxiosRequestConfig): Promise<R> =>
		await instance.get<T, R>(`${this.endpoint}${url ?? ''}`, config)

	public delete = async <T, R>(url?: string, config?: AxiosRequestConfig): Promise<R> =>
		await instance.delete<T, R>(`${this.endpoint}${url ?? ''}`, config)

	public post = async <T, R>(url?: string, data?: T, config?: AxiosRequestConfig): Promise<R> =>
		await instance.post<T, R>(`${this.endpoint}${url ?? ''}`, data, config)

	public put = async <T, R>(url?: string, data?: T, config?: AxiosRequestConfig): Promise<R> =>
		await instance.put<T, R>(`${this.endpoint}${url ?? ''}`, data, config)

	public patch = async <T, R>(url?: string, data?: T, config?: AxiosRequestConfig): Promise<R> =>
		await instance.patch<T, R>(`${this.endpoint}${url ?? ''}`, data, config)
}

export default instance