/**
 * @author Anil Godara
 * @github anilgodara4239@yopmail.com
 * @create date 2024-10-25 11:34:28
 * @modify date 2024-10-25 11:34:28
 * @desc Enviroment File is created So we can cross check the status
 */

//   THIS FILE IS CREATED TO KEEP THE STRUCTURE OF THE ENVIRONMENT FILE  Or Check is added for Development Purpose
export const Environment = {
    api: import.meta.env.VITE_APP_API_URL || 'http://195.35.8.196:6091/',
    socketUrl: import.meta.env.VITE_APP_SOCKET_URL || 'http://195.35.8.196:9091',
    appUrl: import.meta.env.VITE_APP_URL || 'https://jambala-backend-dev.up.railway.app/',
    adminUserName: import.meta.env.VITE_APP_ADMIN_USERNAME || 'interlinkedloyaltynetwork',
    adminPassword: 'q$247=?Dz8?g2U0YW7j{',
    Roles: {
        ADMIN: 'admin',
        USER: 'user',
        Retailer: 'RE'
    }
}