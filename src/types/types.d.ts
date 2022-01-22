import type { MessageApi } from 'naive-ui';

declare global {
	interface Window {
		$message: MessageApi;
	}
}

// 分页参数  page_index 起始页数 page_size 分页大小
export interface pagesProp {
	page_index: number;
	page_size: number;
}
// 模糊查询参数 查询字段: 查询关键字
export interface querysProp {
	[x: string]: string;
}
// 排序参数 [key] 排序字段 : 'desc'-从大到小 | 'asc'-从小到大
export interface ordersProp {
	[x: string]: 'desc' | 'asc';
}
// 分页, 模糊查询, 排序 公共参数
export interface pqoParamsProp {
	pages?: pagesProp;
	querys?: querysProp;
	orders?: ordersProp;
}

export interface objProp {
	[x: string]: any;
}

export interface UserProps {
	id?: number;
	name?: string;
	phone?: string;
	admin?: 0 | 1 | 2 | 3 | 4 | 5;
	email?: string;
	avatar_url?: string;
	position?: string;
	sex?: 1 | 0 | -1;
	summary?: string;
	isFetched: boolean;
}
export type themeProp = 'light' | 'dark' | 'auto';
