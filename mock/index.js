import Mock from 'mockjs';
import { param2Obj } from '../src/utils';
import list from './modules/list';
import user from './modules/user';
import tree from './modules/tree';

// mock数据集合
const mocks = [...list, ...user, ...tree];

const responeMock = (url, type = 'get', response) => {
	return {
		url,
		type,
		response(req, res) {
			res.json(Mock.mock(response));
		}
	};
};

export function mockXHR() {
	// mock patch
	// https://github.com/nuysoft/Mock/issues/300
	Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
	Mock.XHR.prototype.send = function() {
		if (this.custom.xhr) {
			this.custom.xhr.withCredentials = this.withCredentials || false;

			if (this.responseType) {
				this.custom.xhr.responseType = this.responseType;
			}
		}
		this.proxy_send(...arguments);
	};

	function XHR2ExpressReqWrap(respond) {
		return function(options) {
			let result = null;
			if (respond instanceof Function) {
				const { body, type, url } = options;
				// https://expressjs.com/en/4x/api.html#req
				result = respond({
					method: type,
					body: JSON.parse(body),
					query: param2Obj(url)
				});
			} else {
				result = respond;
			}
			return Mock.mock(result);
		};
	}

	for (const i of mocks) {
		Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
	}
}

export default mocks.map(m => {
	return responeMock(m.url, m.type, m.response);
});
