import request from '../utils/request';

/**
 * 获取（用户管理）列表数据 GET
 * @returns 
 */
export const fetchUserData = () => {
    return request({
        url: './mock/user.json',
        method: 'get'
    });
};

/**
 * （用户管理）新增保存 POST
 */
export const AddUserData = (data) => {
    return request({
        url: '',
        method: 'post',
        data
    });
};

/**
 * （用户管理）修改保存 PATCH
 */
export const EditUserData = (data) => {
    return request({
        url: '',
        method: 'patch',
        data
    });
};

/**
 * （用户管理）删除 DELETE
 */
export const DeleteUserData = (data) => {
    return request({
        url: '',
        method: 'delete',
        data
    });
};

// --------------------------------


/**
 * 获取角色管理列表数据
 * @returns 
 */
export const fetchRoleData = () => {
    return request({
        url: './mock/role.json',
        method: 'get'
    });
};

// ----------------------------------

/**
 * 获取表单管理列表数据
 */
 export const fetchFormData = () => {
    return request({
        url: './mock/form.json',
        method: 'get'
    });
};


/**
 * 获取表单管理列表数据
 */
export const fetchFormSchemaData = () => {
    return request({
        url: './mock/formSchema.json',
        method: 'get'
    });
};