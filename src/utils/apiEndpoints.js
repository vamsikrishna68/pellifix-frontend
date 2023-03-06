const baseUrl = 'https://api.pellifix.com'

export const API = {

    getEarnings: `${baseUrl}/cp/v1/employees/earnings?type=`,

    adminLogin: `${baseUrl}/cp/v1/auth/admin/login`,

    subOrdinateLogin: `${baseUrl}/cp/v1/auth/sub-ordinate/login`,
    associateLogin: `${baseUrl}/cp/v1/auth/associates/login`,
    customerLogin: `${baseUrl}/v1/customer/login`,

    subOrdinateUpdateProfile: `${baseUrl}/cp/v1/sub-ordinates/`,
    subOrdinateGetProfile: `${baseUrl}/cp/v1/sub-ordinates/`,

    associateProfile: `${baseUrl}/cp/v1/associates/`,

    associateForgotPassword: `${baseUrl}/cp/v1/auth/associates/password/reset`,
    subOrdinateForgotPassword: `${baseUrl}/cp/v1/auth/sub-ordinate/password/reset`,
    customerForgotPassword: `${baseUrl}/v1/customer/password/reset`,
    adminForgotPassowrd: `${baseUrl}/cp/v1/auth/admin/password/reset`,

    associateResetPassword: `${baseUrl}/cp/v1/auth/associates/password/update/`,
    subOrdinateResetPassword: `${baseUrl}/cp/v1/auth/sub-ordinate/password/update/`,
    customerResetPassword: `${baseUrl}/v1/customer/password/update/`,
    adminResetPassowrd: `${baseUrl}/cp/v1/auth/admin/password/update/`



}

