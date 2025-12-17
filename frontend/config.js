const config = {


    BASE_URL: "http://localhost:3000",
    GET_OTP : "/api/v1/send-otp",
    SIGNUP: "/api/v1/signup",
    LOGIN: "/api/v1/signin",
    GET_USER_INFO: "/api/v1/info",


    GET_ALL_PRODUCTS: "/api/v1/purchase/all",
    GET_PRUCHASE_BY_CATEGORY: "/api/v1/purchase/category",
    GET_SEARCH: "/api/v1/purchase/search",
    GET_DETAILS: "/api/v1/purchase/detail",
    UPLOAD_PURCHASE : "/api/v1/purchase/upload",
    GET_PURCHASE_BY_USER : "/api/v1/purchase/account",
    DELETE_PURCHASE_BY_ID : "/api/v1/purchase/delete",


    GET_ALL_FOUND: "/api/v1/found/all",
    GET_FOUND_BY_CATEGORY: "/api/v1/found/category",
    GET_FOUND_BY_SEARCH: "/api/v1/found/search",
    GET_FOUND_DETAILS: "/api/v1/found/detail",
    UPLOAD_FOUND : "/api/v1/found/upload",
    GET_FOUND_BY_USER : "/api/v1/found/account",
    DELETE_FOUND_BY_ID : "/api/v1/found/delete",


    GEN_PURCHASE_DESC : "/api/v1/purchase/generate-description",
    GEN_FOUND_DESC : "/api/v1/found/generate-description",
    
}

export default config;