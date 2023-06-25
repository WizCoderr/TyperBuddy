

interface Result<T> {
    type(account_id: string, type: any): unknown
    isError: boolean,
    result: T | null,
    error: string
}
function createResult<T>(result: T | null, isError: boolean = true, error: string = "") {
    return { isError: isError, result: result, error: error } as Result<T>
}

namespace Api {

    const apiURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'


    // ---------------------- Account ---------------------


    export async function signup(first: string, last: string, email: string, password: string) {
        let signupData = {
            first: first,
            last: last,
            email: email,
            password: password
        }
        return post<{ token: string }>("sign-up", "", signupData)
    }

    export async function signupVerify(token: string, otp: string) {
        let signupData = {
            token: token,
            otp: otp
        }
        return post<{ token: string }>("verify-signup", "", signupData)
    }

    export async function signupOtpResend(token: string) {
        let data = {
            token: token
        }
        return post<{ token: string }>("resend-verify-otp", "", data)
    }

    export async function signin(email: string, password: string) {
        let signinData = {
            email: email,
            password: password
        }
        return post<{ token: string }>("sign-in", "", signinData)
    }

    export async function resetPasswordRequest(email: string) {
        let data = {
            email: email
        }
        return post<{ email: string }>("forgot-password", "", data)
    }

    export async function resetPassword(token: string, password: string) {
        let data = {
            token: token,
            password: password
        }
        return post<{ email: string }>("reset-password", "", data)
    }


    // export async function getCategoryProducts(categoryId: number, limit: number) {
    //     return get<ProductData[]>("category-products", `categoryId=${categoryId}&limit=${limit}`)
    // }




    // export async function addCategory(adminId: string, categoryName: string, isSlide: boolean, imageUrl: string) {
    //     let categoryData = {
    //         adminId: adminId,
    //         name: categoryName,
    //         isSlide: isSlide,
    //         url: imageUrl

    //     }
    //     return post("admin/category", "", categoryData)
    // }


    // export async function updateProduct(adminId: string, data: ProductUpdate) {

    //     let updateData = {
    //         adminId: adminId,
    //         data: data
    //     }
    //     return put("admin/product", "", updateData)
    // }
















    async function get<T>(path: string, query: string) {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
        };

        // console.log(`${apiURL}/${path}?${query}`)

        try {
            const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
            if (res.ok) {
                // const data = JSON.parse() as T
                return createResult<T>(await res.json(), false)
            } else {
                return createResult<T>(null, true, await res.text())
            }
        } catch (error) {
            return createResult<T>(null, true, "fetch error")
        }
    }

    async function post<T>(path: string, query: string, body: any) {
        const requestOptions: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            redirect: "follow",
            body: JSON.stringify(body),
        };

        // console.log(`${apiURL}/${path}?${query}`)

        try {
            const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
            if (res.ok) {
                return createResult<T>(await res.json(), false)
            } else {
                return createResult(null, true, await res.text())
            }
        } catch (error) {
            return createResult<T>(null, true, "fetch error")
        }
    }

    async function put<T>(path: string, query: string, body: any) {
        const requestOptions: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            redirect: "follow",
            body: JSON.stringify(body),
        };

        // console.log(`${apiURL}/${path}?${query}`)

        try {
            const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
            if (res.ok) {
                return createResult<string>('', false)
            } else {
                return createResult(null, true, '')
            }
        } catch (error) {
            console.log(error)
            return createResult<T>(null, true, "fetch error")
        }
    }

}

export default Api