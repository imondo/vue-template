/**
 * 1. 获取token
 * 2. 判断token是否超期 isPastDue
 * 3. token超期后，置空token，通过ResetToken重新获取token
 * 4. 重新赋值token
 */
import http from './http';
import store from './../store';
import CrossStorageClient from './../../public/cross-storage-master/dist/client.min';

class RefreshToken {
	constructor(iportal_fe) {
		if (!iportal_fe) {
			return;
		}
		this.isRefreshing = false;
		this.iportal_fe = iportal_fe;
		this.accessToken = iportal_fe.substr(iportal_fe.indexOf('://') + 3);
		if (!this.storage) {
			this.storage = new CrossStorageClient(this.iportal_fe + 'token.html');
		}
	}

	static getInstance(iportal_fe) {
		if (!RefreshToken.instance) {
			RefreshToken.instance = new RefreshToken(iportal_fe);
		}
		return RefreshToken.instance;
	}

	async init() {
		try {
			const token = await this.getToken(); // 获取token
			if (!token.refresh_token) {
				return token;
			}
			if (token.access_token) {
				const hasNo = await this.isPastDue(token.logTime); // 判断是否过期
				if (hasNo && !this.isRefreshing) {
					await this.delToken(); // 删除token
					this.isRefreshing = true;
					const newToken = await this.resetToken(token.refresh_token); // 获取新token
					this.isRefreshing = false;
					if (newToken) {
						if (newToken.access_token) {
							await this.setToken(newToken); // 设置新token
							return newToken;
						} else {
							return null;
						}
					} else {
						return null;
					}
				} else {
					return token;
				}
			}
		} catch (error) {}
	}

	// 获取用户中心token
	getToken() {
		return new Promise(resolve => {
			const { config } = store.state;
			if (config.isSameArea) {
				const localToken = localStorage.getItem(this.accessToken);
				resolve(JSON.parse(localToken));
			} else {
				if (localStorage.getItem(this.accessToken)) {
					const localToken = localStorage.getItem(this.accessToken);
					resolve(JSON.parse(localToken));
				} else {
					this.storage
						.onConnect()
						.then(() => {
							return this.storage.get(
								'access_token',
								'token_type',
								'refresh_token',
								'expires_in',
								'logTime',
								this.accessToken
							);
						})
						.then(res => {
							const [access_token, token_type, refresh_token, expires_in, logTime, taken_list] = res;
							const tokenObj = taken_list
								? JSON.parse(taken_list)
								: { access_token, token_type, refresh_token, expires_in, logTime: +logTime };
							this.setLoaclToken(tokenObj);
							resolve(tokenObj);
						});
				}
			}
		});
	}

	// 判断是否token超期
	async isPastDue(logTime) {
		// 判断token是否过期的方法
		return logTime <= Date.parse(new Date());
	}

	// 重新获取token
	async resetToken(refreshToken) {
		const token = await http.post(`auth/refresh_token`, { refreshToken });
		if (token) {
			const _token = this.setLogTime(token);
			return _token;
		} else {
			return false;
		}
	}

	async setToken(token) {
		const { config } = store.state;
		if (config.isSameArea) {
			this.setLoaclToken(token); // 设置本地新token
			return token;
		} else {
			try {
				this.setLoaclToken(token);
				await this.setAsyncToken(token); // 设置用户中心token
				return true;
			} catch (error) {
				return token;
			}
		}
	}

	async delToken() {
		const { config } = store.state;
		if (config.isSameArea) {
			this.delLocalToken(); // 删除本地token
			return true;
		} else {
			try {
				await this.delAsyncToken(); // 删除token
				return true;
			} catch (error) {}
			return true;
		}
	}

	// 设置用户中心token
	setAsyncToken(token) {
		return new Promise(resolve => {
			this.storage
				.onConnect()
				.then(() => this.storage.get('isRember'))
				.then(isRember => {
					if (isRember) {
						this.storage.clear();
						this.storage.set('isRember', isRember);
					} else {
						this.storage.clear();
					}
				})
				.then(() => {
					for (const key in token) {
						this.storage.set(key, token[key]);
					}
					const index = this.accessToken.lastIndexOf('/');
					const noSlash = this.accessToken.substr(0, index); // 去掉斜杠的域
					this.storage.set(this.accessToken, JSON.stringify(token));
					this.storage.set(noSlash, JSON.stringify(token));
					resolve();
				});
		});
	}

	// 删除用户中心token
	delAsyncToken() {
		return new Promise(resolve => {
			this.storage.onConnect().then(() => this.storage.get('isRember')).then(isRember => {
				if (isRember) {
					this.storage.clear();
					this.storage.set('isRember', isRember);
					resolve();
				} else {
					this.storage.clear();
					resolve();
				}
			});
		});
	}

	// 设置过期时间戳
	setLogTime(token) {
		token.logTime = Date.parse(new Date()) + token.expires_in * 1000;
		return token;
	}

	// 设置本地token
	setLoaclToken(token) {
		localStorage.setItem(this.accessToken, JSON.stringify(token));
	}

	// 删除本地token
	delLocalToken() {
		const isRember = localStorage.getItem('isRember');
		if (isRember) {
			localStorage.clear();
			localStorage.setItem('isRember', isRember);
		} else {
			localStorage.clear();
		}
	}
}

function refreshingFn() {
	const { config } = error.response;
	if (!isRefreshing) {
		isRefreshing = true;
		const refreshToken = RefreshToken.getInstance(store.state.config.webIportalURL);
		return refreshToken
			.init()
			.then(token => {
				if (token && token.refresh_token) {
					config.headers.Authorization = token.token_type + ' ' + token.access_token;
					config.url = config.url.substr(config.url.indexOf('api/') + 4);
					queueRequests.forEach(cb => cb(token));
					// 重试完清空这个队列
					queueRequests = [];
					return axios(config);
				} else {
					errorLogout('您没有权限访问此操作！', 403);
				}
			})
			.finally(() => {
				isRefreshing = false;
			});
	} else {
		return new Promise(resolve => {
			// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
			queueRequests.push(token => {
				config.headers.Authorization = token.token_type + ' ' + token.access_token;
				config.url = config.url.substr(config.url.indexOf('api/') + 4);
				resolve(axios(config));
			});
		});
	}
}

export default RefreshToken;
