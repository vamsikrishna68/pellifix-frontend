const baseUrl = 'https://api.pellifix.com'

export const API = {

    getEarnings: `${baseUrl}/cp/v1/employees/earnings?type=`,

    customerLogin: `${baseUrl}/v1/customer/login`,
    customerForgotPassword: `${baseUrl}/v1/customer/password/reset`,
    customerResetPassword: `${baseUrl}/v1/customer/password/update/`,

    associateProfile: `${baseUrl}/cp/v1/associates/`,
    associateForgotPassword: `${baseUrl}/cp/v1/auth/associates/password/reset`,
    associateResetPassword: `${baseUrl}/cp/v1/auth/associates/password/update/`,
    associateLogin: `${baseUrl}/cp/v1/auth/associates/login`,

    subOrdinateForgotPassword: `${baseUrl}/cp/v1/auth/sub-ordinate/password/reset`,
    subOrdinateResetPassword: `${baseUrl}/cp/v1/auth/sub-ordinate/password/update/`,
    subOrdinateUpdateProfile: `${baseUrl}/cp/v1/sub-ordinates/`,
    subOrdinateGetProfile: `${baseUrl}/cp/v1/sub-ordinates/`,
    subOrdinateLogin: `${baseUrl}/cp/v1/auth/sub-ordinate/login`,
    subordinatePaymentReferenceNumbers: `${baseUrl}/v1/razor/payment`,

    adminResetPassowrd: `${baseUrl}/cp/v1/auth/admin/password/update/`,
    adminForgotPassowrd: `${baseUrl}/cp/v1/auth/admin/password/reset`,
    adminLogin: `${baseUrl}/cp/v1/auth/admin/login`,
    createAssosiate:  `${baseUrl}/cp/v1/associates`,
    createSubordinate:  `${baseUrl}/cp/v1/sub-ordinates`

}

